"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Upload, ChevronRight, CheckCircle2, ArrowRight, 
  Image as ImageIcon, ExternalLink, X 
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function UploadChallengePage() {
  const [formData, setFormData] = useState({
    nama_tim: '',
    challenge_type: 'Brand Make Over',
    nama_produk: 'Abon Ikan',
    link_instagram: '',
    caption_singkat: ''
  });
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      if (selectedFile.size > 5 * 1024 * 1024) {
        setSubmitError('Ukuran file maksimal 5MB');
        return;
      }
      
      if (!selectedFile.type.startsWith('image/')) {
        setSubmitError('Hanya file gambar yang diperbolehkan');
        return;
      }

      setSubmitError('');
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const clearFile = () => {
    setFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setIsSubmitting(true);

    try {
      if (!formData.nama_tim.trim()) {
        throw new Error('Nama Tim wajib diisi');
      }

      if (!file) {
        throw new Error('Silakan upload gambar/foto hasil karya');
      }

      const supabase = createClient();
      if (!supabase) throw new Error('Koneksi database gagal');

      // 1. Upload Image (Try 'challenge-uploads' first, fallback to 'galeri' bucket)
      const extension = file.name.split('.').pop() || 'jpg';
      const filename = `${Date.now()}_${Math.random().toString(36).slice(2,8)}.${extension}`;
      
      let targetBucket = 'challenge-uploads';
      let filePath = filename;

      let { error: uploadError } = await supabase.storage
        .from(targetBucket)
        .upload(filePath, file, { cacheControl: '3600', upsert: true });

      // Fallback to 'galeri' bucket if 'challenge-uploads' is missing
      if (uploadError && (uploadError.message.toLowerCase().includes('not found') || uploadError.message.toLowerCase().includes('bucket'))) {
        targetBucket = 'galeri';
        filePath = `challenge/${filename}`;
        const fallbackRes = await supabase.storage
          .from(targetBucket)
          .upload(filePath, file, { cacheControl: '3600', upsert: true });
        uploadError = fallbackRes.error;
      }

      if (uploadError) throw new Error('Gagal mengupload gambar: ' + uploadError.message);

      // 2. Get Public URL
      const { data: urlData } = supabase.storage
        .from(targetBucket)
        .getPublicUrl(filePath);

      const publicUrl = urlData.publicUrl;

      // 3. Insert via Server API Handler (bypasses RLS & handles table fallbacks)
      const res = await fetch('/api/challenge/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nama_tim: formData.nama_tim,
          challenge_type: formData.challenge_type || 'Brand Make Over',
          nama_produk: formData.nama_produk || 'Abon Ikan',
          link_instagram: formData.link_instagram || '',
          caption_singkat: formData.caption_singkat || '',
          foto_bukti_url: publicUrl
        })
      });

      const submitRes = await res.json();
      if (!submitRes.success) {
        throw new Error(submitRes.message || 'Gagal menyimpan data ke database');
      }

      setIsSuccess(true);
    } catch (err: any) {
      setSubmitError(err.message || 'Terjadi kesalahan saat menyimpan data');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      nama_tim: '',
      challenge_type: '',
      nama_produk: '',
      link_instagram: '',
      caption_singkat: ''
    });
    clearFile();
    setIsSuccess(false);
  };



  return (
    <div className="min-h-screen bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-900 to-slate-900 pointer-events-none"></div>
      
      <div className="relative z-10 max-w-2xl mx-auto">
        <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8 font-medium">
          <Link href="/program-tawsec" className="hover:text-white transition-colors">Program TAWSEC</Link>
          <ChevronRight className="w-4 h-4" />
          <span>Pilar 3</span>
          <ChevronRight className="w-4 h-4" />
          <Link href="/program-tawsec/challenge" className="hover:text-white transition-colors">Challenge</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white">Upload</span>
        </nav>

        <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10">
          {isSuccess ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20"></div>
                <CheckCircle2 className="w-12 h-12 text-green-500 relative z-10" />
              </div>
              <h2 className="text-3xl font-serif font-black text-slate-900 mb-4">
                Upload Berhasil! 🎉
              </h2>
              <p className="text-slate-500 text-lg mb-10 max-w-md mx-auto">
                Karya tim kamu berhasil diunggah dan sudah bisa dilihat secara langsung di Live Showcase Wall.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/program-tawsec/challenge#live-wall"
                  className="inline-flex items-center justify-center gap-2 py-3 px-8 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold hover:shadow-lg hover:shadow-sky-500/30 transition-all"
                >
                  Lihat di Live Wall
                </Link>
                <button
                  onClick={resetForm}
                  className="inline-flex items-center justify-center gap-2 py-3 px-8 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-all"
                >
                  Upload Karya Lagi
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-10">
                <h1 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 mb-3">
                  Upload Hasil Karya Challenge
                </h1>
                <p className="text-slate-500">
                  Lengkapi form di bawah ini untuk menampilkan karya tim kamu di Live Showcase Wall TAWSEC.
                </p>
              </div>

              {submitError && (
                <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-xl font-medium">
                  {submitError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="nama_tim" className="block text-sm font-bold text-slate-700 mb-2">Nama Tim *</label>
                  <input
                    type="text"
                    id="nama_tim"
                    name="nama_tim"
                    value={formData.nama_tim}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all bg-slate-50 focus:bg-white"
                    placeholder="Contoh: Tim Inovator Muda"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="challenge_type" className="block text-sm font-bold text-slate-700 mb-2">Pilih Challenge *</label>
                    <select
                      id="challenge_type"
                      name="challenge_type"
                      value={formData.challenge_type}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all bg-slate-50 focus:bg-white"
                    >
                      <option value="" disabled>Pilih Kategori...</option>
                      <option value="Brand Make Over">Brand Make Over</option>
                      <option value="Video Promosi">Video Promosi</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="nama_produk" className="block text-sm font-bold text-slate-700 mb-2">Nama Produk *</label>
                    <select
                      id="nama_produk"
                      name="nama_produk"
                      value={formData.nama_produk}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all bg-slate-50 focus:bg-white"
                    >
                      <option value="" disabled>Pilih Produk...</option>
                      <option value="Abon Ikan">Abon Ikan</option>
                      <option value="Amplang">Amplang</option>
                      <option value="Tepung Tulang Ikan">Tepung Tulang Ikan</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="link_instagram" className="block text-sm font-bold text-slate-700 mb-2">Link Instagram / Medsos (Opsional)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <ExternalLink className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type="url"
                      id="link_instagram"
                      name="link_instagram"
                      value={formData.link_instagram}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all bg-slate-50 focus:bg-white"
                      placeholder="https://instagram.com/p/... (opsional)"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Upload Screenshot Bukti *</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-xl hover:border-sky-400 hover:bg-sky-50/50 transition-all group">
                    <div className="space-y-2 text-center w-full">
                      {previewUrl ? (
                        <div className="relative w-full aspect-video sm:aspect-[4/3] max-h-64 rounded-lg overflow-hidden bg-slate-100">
                          <Image src={previewUrl} alt="Preview" fill className="object-contain" />
                          <button
                            type="button"
                            onClick={clearFile}
                            className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full hover:bg-black/70 backdrop-blur-sm transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <ImageIcon className="w-8 h-8 text-sky-600" />
                          </div>
                          <div className="flex text-sm text-slate-600">
                            <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-bold text-sky-600 hover:text-sky-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sky-500">
                              <span>Upload file</span>
                              <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleFileChange} required />
                            </label>
                            <p className="pl-1">atau drag and drop</p>
                          </div>
                          <p className="text-xs text-slate-500 mt-2">PNG, JPG, GIF maksimal 5MB</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="caption_singkat" className="block text-sm font-bold text-slate-700 mb-2">
                    Caption Singkat (Opsional)
                  </label>
                  <textarea
                    id="caption_singkat"
                    name="caption_singkat"
                    value={formData.caption_singkat}
                    onChange={handleInputChange}
                    maxLength={280}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all bg-slate-50 focus:bg-white resize-none"
                    placeholder="Ceritakan sedikit tentang karya tim kamu..."
                  />
                  <div className="text-right text-xs text-slate-400 mt-1 font-medium">
                    {formData.caption_singkat.length} / 280
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-xl shadow-sm text-lg font-extrabold text-white bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Mengupload...
                      </>
                    ) : (
                      <>
                        <Upload className="w-6 h-6" />
                        Upload Karya Sekarang
                      </>
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

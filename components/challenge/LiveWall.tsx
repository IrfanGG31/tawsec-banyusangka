"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Upload, ExternalLink, Trophy, Sparkles, Image as ImageIcon } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

type Submission = {
  id: string;
  nama_tim: string;
  challenge_type: string;
  nama_produk: string;
  link_instagram: string;
  foto_bukti_url: string;
  caption_singkat: string | null;
  status: string;
  created_at: string;
  isNew?: boolean;
};

interface LiveWallProps {
  judul?: string;
  deskripsi?: string;
  formAktif?: boolean;
}

export default function LiveWall({ judul = "Live Showcase Wall", deskripsi = "Karya peserta Challenge Digitalisasi & Branding ditampilkan secara realtime.", formAktif = true }: LiveWallProps) {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    
    if (!supabase) {
      setLoading(false);
      return;
    }

    const fetchSubmissions = async () => {
      // 1. Try fetching from 'challenge_submissions' table
      const { data: tableData, error: tableError } = await supabase
        .from('challenge_submissions')
        .select('*')
        .eq('status', 'tampil')
        .order('created_at', { ascending: false });

      if (tableData && !tableError && tableData.length > 0) {
        setSubmissions(tableData as Submission[]);
        setLoading(false);
        return;
      }

      // 2. Fallback: Fetch from 'site_settings' (key: 'challenge_submissions_list')
      const { data: settingsData } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'challenge_submissions_list')
        .single();

      if (settingsData?.value && Array.isArray(settingsData.value)) {
        const list = (settingsData.value as Submission[]).filter(s => s.status !== 'disembunyikan');
        setSubmissions(list);
      } else if (tableData && !tableError) {
        setSubmissions(tableData as Submission[]);
      }
      setLoading(false);
    };

    fetchSubmissions();

    const channel = supabase
      .channel('live-wall-submissions')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'challenge_submissions' }, (payload) => {
        const newItem = payload.new as Submission;
        if (newItem.status === 'tampil') {
          setSubmissions(prev => [{ ...newItem, isNew: true }, ...prev]);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return (
      <div id="live-wall" className="py-20 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  return (
    <section id="live-wall" className="py-20 bg-slate-50 relative">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 to-indigo-900 rounded-3xl p-8 sm:p-12 mb-12 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-5xl font-serif font-black text-white mb-4">
              {judul}
            </h2>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              {deskripsi}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {formAktif && (
                <Link 
                  href="/program-tawsec/challenge/upload"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-sky-500/30 transition-all transform hover:-translate-y-1"
                >
                  <Upload className="w-5 h-5" />
                  Upload Hasil Karya Kamu
                </Link>
              )}
              
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium py-3 px-6 rounded-full">
                <Trophy className="w-5 h-5 text-amber-400" />
                <span>🎉 {submissions.length} karya sudah diupload!</span>
              </div>
            </div>
          </div>
        </div>

        {submissions.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-lg border border-slate-200">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ImageIcon className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2">Belum Ada Karya</h3>
            <p className="text-slate-500 max-w-md mx-auto">
              Jadilah yang pertama untuk mengunggah hasil karya terbaik tim kamu di sini!
            </p>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {submissions.map((sub) => (
              <div 
                key={sub.id} 
                className="break-inside-avoid bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-slate-100 group"
                style={sub.isNew ? { animation: 'fadeInUp 0.6s ease-out' } : undefined}
              >
                <div className="relative aspect-[4/5] w-full">
                  <Image 
                    src={sub.foto_bukti_url} 
                    alt={`Karya dari ${sub.nama_tim}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 left-4 z-10 flex gap-2">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full text-white shadow-md ${
                      sub.challenge_type === 'Brand Make Over' 
                        ? 'bg-sky-500' 
                        : 'bg-amber-500'
                    }`}>
                      {sub.challenge_type}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{sub.nama_tim}</h3>
                  <div className="flex items-center gap-1 text-sm font-medium text-slate-500 mb-4">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    Produk: <span className="text-slate-700">{sub.nama_produk}</span>
                  </div>
                  
                  {sub.caption_singkat && (
                    <p className="text-slate-600 text-sm mb-6 italic border-l-4 border-slate-200 pl-3">
                      "{sub.caption_singkat}"
                    </p>
                  )}
                  
                  {sub.link_instagram ? (
                    <a 
                      href={sub.link_instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full gap-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold py-2.5 px-4 rounded-xl transition-colors border border-slate-200"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Lihat di Instagram
                    </a>
                  ) : (
                    <div className="inline-flex items-center justify-center w-full gap-2 bg-sky-50 text-sky-700 font-semibold py-2 px-4 rounded-xl border border-sky-150 text-xs">
                      <Sparkles className="w-3.5 h-3.5 text-sky-500" />
                      Hasil Karya Peserta TAWSEC
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Upload, ExternalLink, Trophy, Sparkles, Image as ImageIcon, 
  Palette, Video, Play, Film, Layers, Volume2, VolumeX, Maximize2, Download 
} from 'lucide-react';
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

export default function LiveWall({ 
  judul = "Live Showcase Wall", 
  deskripsi = "Karya peserta Challenge Digitalisasi & Branding ditampilkan secara realtime.", 
  formAktif = true 
}: LiveWallProps) {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<'semua' | 'brand' | 'video'>('semua');
  const [unmutedVideos, setUnmutedVideos] = useState<Record<string, boolean>>({});

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

  const handleDownloadMedia = (url: string, filename: string) => {
    if (!url) return;
    fetch(url)
      .then(res => res.blob())
      .then(blob => {
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        const ext = url.split('.').pop()?.split('?')[0] || 'file';
        a.download = `${filename}.${ext}`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(blobUrl);
      })
      .catch(() => {
        window.open(url, '_blank');
      });
  };

  const brandSubmissions = submissions.filter(s => s.challenge_type === 'Brand Make Over');
  const videoSubmissions = submissions.filter(s => s.challenge_type === 'Video Promosi');

  const filteredSubmissions = activeCategory === 'brand' 
    ? brandSubmissions 
    : activeCategory === 'video' 
    ? videoSubmissions 
    : submissions;

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
        {/* Banner Section */}
        <div className="bg-gradient-to-r from-slate-950 via-navy-950 to-indigo-950 rounded-3xl p-8 sm:p-12 mb-10 text-center relative overflow-hidden shadow-2xl border border-indigo-900/40">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-400/40 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider mb-4">
              <Trophy className="w-4 h-4 text-amber-400" />
              Live Showcase Wall Karya Peserta
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-serif font-black text-white mb-4">
              {judul}
            </h2>
            <p className="text-base sm:text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              {deskripsi}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {formAktif && (
                <Link 
                  href="/program-tawsec/challenge/upload"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-extrabold py-3.5 px-8 rounded-2xl shadow-xl hover:shadow-sky-500/30 transition-all transform hover:-translate-y-0.5 active:scale-95 text-sm sm:text-base border border-sky-400/40"
                >
                  <Upload className="w-5 h-5" />
                  Upload Hasil Karya Kamu ↗
                </Link>
              )}
              
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold py-3.5 px-6 rounded-2xl text-xs sm:text-sm">
                <Trophy className="w-5 h-5 text-amber-400" />
                <span>🎉 {submissions.length} karya sudah diupload!</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2 Main Showcase Sections Selector / Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <button
            onClick={() => setActiveCategory('semua')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all border ${
              activeCategory === 'semua'
                ? 'bg-navy-900 text-white border-navy-800 shadow-lg scale-105'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-4 h-4 text-sky-500" />
            <span>Semua Karya ({submissions.length})</span>
          </button>

          <button
            onClick={() => setActiveCategory('brand')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all border ${
              activeCategory === 'brand'
                ? 'bg-sky-600 text-white border-sky-500 shadow-lg scale-105'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Palette className="w-4 h-4 text-sky-400" />
            <span>🎨 Section 1: Brand Make Over ({brandSubmissions.length})</span>
          </button>

          <button
            onClick={() => setActiveCategory('video')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all border ${
              activeCategory === 'video'
                ? 'bg-amber-600 text-white border-amber-500 shadow-lg scale-105'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Video className="w-4 h-4 text-amber-400" />
            <span>🎬 Section 2: Video Promosi &amp; Reels ({videoSubmissions.length})</span>
          </button>
        </div>

        {/* Submissions Grid */}
        {filteredSubmissions.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-md border border-slate-200">
            <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <ImageIcon className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-2xl font-serif font-black text-slate-900 mb-2">Belum Ada Karya di Kategori Ini</h3>
            <p className="text-slate-500 max-w-md mx-auto text-sm sm:text-base">
              Jadilah tim pertama yang mengunggah karya terbaik kamu di kategori ini!
            </p>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredSubmissions.map((sub) => {
              const isVideoCategory = sub.challenge_type === 'Video Promosi';
              const lowerUrl = (sub.foto_bukti_url || '').toLowerCase();
              const isVideoFile = lowerUrl.endsWith('.mp4') || lowerUrl.endsWith('.mov') || lowerUrl.endsWith('.webm') || lowerUrl.endsWith('.m4v') || lowerUrl.includes('/video/');

              return (
                <div 
                  key={sub.id} 
                  className={`break-inside-avoid bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border ${
                    isVideoCategory ? 'border-amber-200 hover:border-amber-400' : 'border-sky-200 hover:border-sky-400'
                  } group relative`}
                  style={sub.isNew ? { animation: 'fadeInUp 0.6s ease-out' } : undefined}
                >
                  {/* Image/Video Thumbnail Showcase */}
                  <div className={`relative w-full ${isVideoCategory || isVideoFile ? 'aspect-[9/16]' : 'aspect-[4/5]'} overflow-hidden bg-slate-950`}>
                    {isVideoFile ? (
                      <>
                        <video
                          id={`video-${sub.id}`}
                          src={sub.foto_bukti_url}
                          autoPlay
                          loop
                          muted={!unmutedVideos[sub.id]}
                          playsInline
                          controlsList="nodownload"
                          controls
                          className="w-full h-full object-cover"
                        />
                        {/* Interactive Sound Toggle Button */}
                        <button
                          type="button"
                          onClick={() => {
                            const isUnmuted = !!unmutedVideos[sub.id];
                            const videoEl = document.getElementById(`video-${sub.id}`) as HTMLVideoElement | null;
                            if (videoEl) {
                              videoEl.muted = isUnmuted;
                              if (!isUnmuted) {
                                videoEl.play().catch(() => {});
                              }
                            }
                            setUnmutedVideos(prev => ({ ...prev, [sub.id]: !isUnmuted }));
                          }}
                          className={`absolute bottom-16 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-xl backdrop-blur-md ${
                            unmutedVideos[sub.id]
                              ? 'bg-emerald-500 text-white border border-emerald-300 animate-pulse'
                              : 'bg-black/70 hover:bg-black/90 text-amber-300 border border-amber-400/40'
                          }`}
                        >
                          {unmutedVideos[sub.id] ? (
                            <>
                              <Volume2 className="w-3.5 h-3.5 text-white" />
                              <span>Suara Aktif</span>
                            </>
                          ) : (
                            <>
                              <VolumeX className="w-3.5 h-3.5 text-amber-400" />
                              <span>🔊 Nyalakan Suara</span>
                            </>
                          )}
                        </button>
                      </>
                    ) : (
                      <Image 
                        src={sub.foto_bukti_url} 
                        alt={`Karya dari ${sub.nama_tim}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                    {/* Reels Video Overlay Icon if image is used for Video Promosi */}
                    {isVideoCategory && !isVideoFile && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-16 h-16 rounded-full bg-amber-500/90 text-white flex items-center justify-center shadow-2xl border-2 border-white/80 group-hover:scale-110 transition-transform">
                          <Play className="w-8 h-8 fill-current translate-x-0.5" />
                        </div>
                      </div>
                    )}

                    {/* Top Header Badges */}
                    <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between gap-2">
                      <span className={`px-3.5 py-1.5 text-xs font-black rounded-full text-white shadow-md flex items-center gap-1.5 border ${
                        isVideoCategory 
                          ? 'bg-gradient-to-r from-amber-500 to-orange-600 border-amber-300/40' 
                          : 'bg-gradient-to-r from-sky-500 to-blue-600 border-sky-300/40'
                      }`}>
                        {isVideoCategory ? <Film className="w-3.5 h-3.5" /> : <Palette className="w-3.5 h-3.5" />}
                        {sub.challenge_type}
                      </span>

                      {isVideoCategory && (
                        <span className="px-2.5 py-1 text-[10px] font-extrabold rounded-full bg-black/60 backdrop-blur-md text-amber-300 border border-amber-400/40">
                          🎥 Reels 15-30s
                        </span>
                      )}
                    </div>

                    {/* Bottom Title Overlay on Image */}
                    <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-1">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>Studi Kasus: <strong>{sub.nama_produk}</strong></span>
                      </div>
                      <h3 className="text-xl font-serif font-black text-white leading-snug drop-shadow-md">
                        {sub.nama_tim}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Card Content & Details */}
                  <div className="p-6 space-y-4">
                    {sub.caption_singkat && (
                      <p className="text-slate-600 text-sm italic font-medium bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 leading-relaxed">
                        &ldquo;{sub.caption_singkat}&rdquo;
                      </p>
                    )}
                    
                    <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => handleDownloadMedia(sub.foto_bukti_url, `Karya_${sub.nama_tim.replace(/\s+/g, '_')}_${sub.nama_produk}`)}
                        className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-3 px-4 rounded-2xl transition-all shadow-md active:scale-95 text-xs sm:text-sm"
                      >
                        <Download className="w-4 h-4 text-emerald-200" />
                        Download File Karya ⬇️
                      </button>
                      
                      {sub.link_instagram && (
                        <a 
                          href={sub.link_instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-2xl transition-all text-xs shrink-0"
                          title="Buka Link Instagram / Medsos"
                        >
                          <ExternalLink className="w-4 h-4 text-sky-400" />
                          <span className="sm:hidden">Buka Link Medsos</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

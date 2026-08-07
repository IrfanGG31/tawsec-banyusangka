import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const { kode } = await request.json();
    if (!kode || typeof kode !== 'string') {
      return NextResponse.json({ valid: false, message: 'Kode akses wajib diisi.' }, { status: 400 });
    }

    // Try to get code from site_settings first (admin-controlled), fallback to env var
    let validCode = process.env.CHALLENGE_EVENT_CODE || 'TAWSEC2026';
    
    try {
      const supabase = await createServerSupabaseClient();
      if (supabase) {
        const { data } = await supabase.from('site_settings').select('value').eq('key', 'challenge').single();
        if (data?.value?.kode_akses_event) {
          validCode = data.value.kode_akses_event;
        }
      }
    } catch {
      // fallback to env var
    }

    const isValid = kode.trim().toUpperCase() === validCode.trim().toUpperCase();
    
    if (isValid) {
      return NextResponse.json({ valid: true });
    } else {
      return NextResponse.json({ valid: false, message: 'Kode akses salah. Tanyakan panitia TAWSEC.' }, { status: 401 });
    }
  } catch {
    return NextResponse.json({ valid: false, message: 'Terjadi kesalahan server.' }, { status: 500 });
  }
}

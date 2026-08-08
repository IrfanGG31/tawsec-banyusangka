import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nama_tim, challenge_type, nama_produk, link_instagram, caption_singkat, foto_bukti_url } = body;

    if (!nama_tim || !foto_bukti_url) {
      return NextResponse.json({ success: false, message: 'Nama tim dan foto bukti wajib diisi.' }, { status: 400 });
    }

    const newSubmission = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      nama_tim: nama_tim.trim(),
      challenge_type: challenge_type || 'Brand Make Over',
      nama_produk: nama_produk || 'Abon Ikan',
      link_instagram: link_instagram || '',
      caption_singkat: caption_singkat || '',
      foto_bukti_url: foto_bukti_url,
      status: 'tampil',
      created_at: new Date().toISOString()
    };

    // Use admin client if available to bypass RLS, otherwise fallback to server client
    const supabase = createAdminClient() || (await createServerSupabaseClient());

    if (!supabase) {
      return NextResponse.json({ success: false, message: 'Koneksi database gagal.' }, { status: 500 });
    }

    // 1. Try inserting to 'challenge_submissions' table
    const { error: insertError } = await supabase
      .from('challenge_submissions')
      .insert(newSubmission);

    if (!insertError) {
      return NextResponse.json({ success: true, submission: newSubmission });
    }

    // 2. Fallback: Save to 'site_settings' (key: 'challenge_submissions_list')
    const { data: existingSettings } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'challenge_submissions_list')
      .maybeSingle();

    const currentList = Array.isArray(existingSettings?.value) ? existingSettings.value : [];
    const updatedList = [newSubmission, ...currentList];

    const { error: settingsError } = await supabase
      .from('site_settings')
      .upsert({
        key: 'challenge_submissions_list',
        value: updatedList,
        updated_at: new Date().toISOString()
      }, { onConflict: 'key' });

    if (settingsError) {
      return NextResponse.json({ 
        success: false, 
        message: 'Gagal menyimpan ke database: ' + (insertError.message || settingsError.message) 
      }, { status: 500 });
    }

    return NextResponse.json({ success: true, submission: newSubmission, storage: 'site_settings' });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err?.message || 'Terjadi kesalahan server.' }, { status: 500 });
  }
}

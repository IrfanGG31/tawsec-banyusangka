import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { createServerSupabaseClient } from '@/lib/supabase/server';

type SubmissionItem = {
  id: string;
  nama_tim: string;
  challenge_type: string;
  nama_produk: string;
  link_instagram: string;
  foto_bukti_url: string;
  caption_singkat: string | null;
  status: 'tampil' | 'disembunyikan';
  created_at: string;
};

export async function GET() {
  try {
    const supabase = createAdminClient() || (await createServerSupabaseClient());
    if (!supabase) {
      return NextResponse.json({ success: false, items: [] });
    }

    let items: SubmissionItem[] = [];

    // 1. Try 'challenge_submissions' table
    const { data: tableData, error: tableError } = await supabase
      .from('challenge_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (tableData && !tableError) {
      items = tableData as SubmissionItem[];
    }

    // 2. Fetch from 'site_settings' key 'challenge_submissions_list'
    const { data: settingsData } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'challenge_submissions_list')
      .maybeSingle();

    if (settingsData?.value && Array.isArray(settingsData.value)) {
      const settingsList = settingsData.value as SubmissionItem[];
      
      // Combine & deduplicate by ID, preferring newest/settings list if table is empty
      if (items.length === 0) {
        items = settingsList;
      } else {
        const idMap = new Map<string, SubmissionItem>();
        items.forEach(i => idMap.set(i.id, i));
        settingsList.forEach(i => {
          if (!idMap.has(i.id)) {
            idMap.set(i.id, i);
          }
        });
        items = Array.from(idMap.values());
      }
    }

    return NextResponse.json({ success: true, items });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err?.message, items: [] });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, id, status, item } = body;

    const supabase = createAdminClient() || (await createServerSupabaseClient());
    if (!supabase) {
      return NextResponse.json({ success: false, message: 'Koneksi database gagal.' }, { status: 500 });
    }

    // Fetch current list from site_settings
    const { data: settingsData } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'challenge_submissions_list')
      .maybeSingle();

    let currentSettingsList: SubmissionItem[] = Array.isArray(settingsData?.value) ? settingsData.value : [];

    // Also fetch from table if exists
    const { data: tableData } = await supabase
      .from('challenge_submissions')
      .select('*');

    let currentTableList: SubmissionItem[] = Array.isArray(tableData) ? tableData : [];

    if (action === 'delete') {
      if (!id) return NextResponse.json({ success: false, message: 'ID wajib diisi.' }, { status: 400 });

      // Delete from table
      await supabase.from('challenge_submissions').delete().eq('id', id);

      // Delete from site_settings list
      const updatedList = currentSettingsList.filter(s => s.id !== id);
      await supabase.from('site_settings').upsert({
        key: 'challenge_submissions_list',
        value: updatedList,
        updated_at: new Date().toISOString()
      }, { onConflict: 'key' });

      return NextResponse.json({ success: true, message: 'Berhasil dihapus', items: updatedList });
    }

    if (action === 'toggle') {
      if (!id || !status) return NextResponse.json({ success: false, message: 'ID & status wajib.' }, { status: 400 });

      // Update table
      await supabase.from('challenge_submissions').update({ status }).eq('id', id);

      // Update site_settings list
      const updatedList = currentSettingsList.map(s => s.id === id ? { ...s, status } : s);
      await supabase.from('site_settings').upsert({
        key: 'challenge_submissions_list',
        value: updatedList,
        updated_at: new Date().toISOString()
      }, { onConflict: 'key' });

      return NextResponse.json({ success: true, message: 'Status diperbarui', items: updatedList });
    }

    if (action === 'save') {
      if (!item || !item.nama_tim) return NextResponse.json({ success: false, message: 'Data submission tidak lengkap.' }, { status: 400 });

      const itemToSave: SubmissionItem = {
        id: item.id || (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`),
        nama_tim: item.nama_tim.trim(),
        challenge_type: item.challenge_type || 'Brand Make Over',
        nama_produk: item.nama_produk || 'Abon Ikan',
        link_instagram: item.link_instagram || '',
        foto_bukti_url: item.foto_bukti_url || item.foto_url || '/images/challenge/brand-makeover-ref.jpg',
        caption_singkat: item.caption_singkat || '',
        status: item.status || 'tampil',
        created_at: item.created_at || new Date().toISOString()
      };

      // Upsert to table
      await supabase.from('challenge_submissions').upsert(itemToSave, { onConflict: 'id' });

      // Upsert to site_settings list
      const existsIndex = currentSettingsList.findIndex(s => s.id === itemToSave.id);
      let updatedList: SubmissionItem[];
      if (existsIndex >= 0) {
        updatedList = [...currentSettingsList];
        updatedList[existsIndex] = itemToSave;
      } else {
        updatedList = [itemToSave, ...currentSettingsList];
      }

      await supabase.from('site_settings').upsert({
        key: 'challenge_submissions_list',
        value: updatedList,
        updated_at: new Date().toISOString()
      }, { onConflict: 'key' });

      return NextResponse.json({ success: true, message: 'Berhasil disimpan', items: updatedList });
    }

    return NextResponse.json({ success: false, message: 'Aksi tidak dikenal.' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err?.message || 'Terjadi kesalahan server.' }, { status: 500 });
  }
}

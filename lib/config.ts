/**
 * Konfigurasi pusat untuk website TAWSEC Banyusangka
 * 
 * PROGRESS TRACKER:
 * Untuk mengaktifkan live-sync dari Google Sheets:
 * 1. Buka Google Sheets → File → Bagikan → Publikasikan ke web
 * 2. Pilih sheet → format CSV
 * 3. Copy URL → paste ke PROGRESS_SHEET_CSV_URL di bawah
 * 
 * Format kolom yang wajib ada di Google Sheets:
 * id | kategori | nama_kegiatan | status | persentase | tanggal_update | catatan
 * 
 * Nilai status yang valid: "Selesai" | "Dalam Proses" | "Belum Mulai"
 */
export const config = {
  /** URL CSV Google Sheets publik untuk Progress Tracker.
   *  Kosongkan ("") untuk pakai data fallback lokal saja. */
  PROGRESS_SHEET_CSV_URL: "",

  /** Nama tim/program untuk tampilan */
  NAMA_PROGRAM: "TAWSEC",
  NAMA_DESA: "Desa Banyusangka",
  TAHUN_PROGRAM: "2026",

  /** WhatsApp contact (format: 62xxx tanpa +) */
  WA_NUMBER: "6281234567890",

  /** Social media */
  INSTAGRAM_HANDLE: "@tawsec.banyusangka",
  INSTAGRAM_URL: "https://instagram.com/tawsec.banyusangka",
} as const;

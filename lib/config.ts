/**
 * Konfigurasi pusat untuk website TAWSEC Banyusangka
 */
export const config = {
  /** URL CSV Google Sheets publik untuk Progress Tracker (Backup Fallback).
   *  Kosongkan ("") jika menggunakan Database Supabase / Fallback Lokal. */
  PROGRESS_SHEET_CSV_URL: "",

  /** Nama tim/program untuk tampilan */
  NAMA_PROGRAM: "TAWSEC",
  NAMA_DESA: "Desa Banyusangka",
  TAHUN_PROGRAM: "2026",

  /** WhatsApp contact (format: 62xxx tanpa +) */
  WA_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6285852278026",

  /** Social media */
  INSTAGRAM_HANDLE: "@tawsec.banyusangka",
  INSTAGRAM_URL: "https://instagram.com/tawsec.banyusangka",
} as const;

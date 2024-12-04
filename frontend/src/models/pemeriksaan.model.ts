export interface Pemeriksaan {
  id_pemeriksaan?: number;
  nama_lengkap?: string;
  id_pasien?: number;
  nama_dokter?: string;
  id_dokter?: number;
  jenis_spesimen?: string;
  nama_layanan?: string;
  jenis_pemeriksaan?: string;
  tanggal_permintaan: Date;
  prioritas?: string;
  status_permintaan?: string;
  catatan_dokter: string;
}
export interface Spesimen {
  id_spesimen?: number;
  jenis_spesimen?: string;
  tanggal_pengambilan: Date;
  lokasi_pengambilan: string;
  tanggal_diterima: Date;
  status_spesimen?: string;
  catatan: string;
  id_pemeriksaan?: number;
  nama_lengkap?: string;
  nama_dokter?: string;
  tanggal_permintaan?: Date;
}
export interface Schedule {
  id?: number;
  id_jadwal?: number;
  id_pemeriksaan?: number;
  id_petugas?: number;
  id_dokter?: number;
  waktu_mulai: Date;
  waktu_selesai: Date;
  ruangan: string;
  status_jadwal?: string;
  pasien?: string;
  dokter?: string;
  petugas?: string;
}
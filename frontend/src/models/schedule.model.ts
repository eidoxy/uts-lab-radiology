export interface Schedule {
  id?: number;
  pasien: number;
  dokter: number;
  pemeriksaan_lab: number;
  pemeriksaan_radiologi: number;
  tanggal: string;
  petugas_lab: number;
}
import { RowDataPacket } from 'mysql2';

export interface Schedule {
  id_pemeriksaan_lab_dan_radiologi: number;
  id_petugas_lab: number;
  id_dokter: number;
  waktu_mulai: Date;
  waktu_selesai: Date;
  ruangan: string;
  status_jadwal: string;
  id_pasien: number;
}

export interface ScheduleQueryResult extends RowDataPacket {
  id_pemeriksaan_lab_dan_radiologi: number;
  id_petugas_lab: number;
  id_dokter: number;
  waktu_mulai: Date;
  waktu_selesai: Date;
  ruangan: string;
  status_jadwal: string;
  id_pasien: number;
}

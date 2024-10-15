import { RowDataPacket } from 'mysql2';

enum JenisKelamin {
  pria = 'pria',
  wanita = 'wanita'
}

enum StatusLisensi {
  active = 'active',
  inactive = 'inactive',
  suspended = 'suspended',
  revoked = 'revoked',
  expired = 'expired'
}

export interface Dokter {
  id_dokter: number;
  npi: string;
  nama_dokter: string;
  jenis_kelamin: JenisKelamin;
  tanggal_lahir: Date;
  telepon: string;
  email: string;
  password: string;
  spesialisasi: StatusLisensi;
  status_lisensi: string;
  tanggal_lisensi: Date;
  nama_lisensi: string;
  request_token: string;
}

export interface DokterQueryResult extends RowDataPacket {
  id_dokter: number;
  npi: string;
  nama_dokter: string;
  jenis_kelamin: string;
  tanggal_lahir: Date;
  telepon: string;
  email: string;
  password: string;
  spesialisasi: string;
  status_lisensi: string;
  tanggal_lisensi: Date;
  nama_lisensi: string;
  request_token: string;
}
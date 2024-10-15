import { RowDataPacket } from 'mysql2';

enum JenisKelamin {
  pria = 'pria',
  wanita = 'wanita'
}

enum Agama {
  islam = 'islam',
  kristen = 'kristen',
  katolik = 'katolik',
  hindu = 'hindu',
  budha = 'budha',
  konghucu = 'konghucu',
  lainnya = 'lainnya'
}

enum Ras {
  white = 'white',
  black = 'black',
  asian = 'asian',
  indian = 'indian',
  chinese = 'chinese',
  lainnya = 'lainnya'
}

enum StatusPernikahan {
  single = 'single',
  married = 'married',
  divorced = 'divorced',
  widowed = 'widowed'
}

enum KelompokEtnis {
  hispanic = 'hispanic',
  non_hispanic = 'non_hispanic',
  lainnya = 'lainnya'
}

enum StatusPasien {
  dead = 'dead',
  alive = 'alive',
  unknown = 'unknown'
}

export interface Pasien {
  id_pasien: number;
  nama_lengkap: string;
  nama_panggilan: string;
  tanggal_lahir: Date;
  tempat_lahir: string;
  jenis_kelamin: JenisKelamin;
  agama: Agama;
  ras: Ras;
  alamat: string;
  kode_negara: string;
  telepon: string;
  bahasa_utama: string;
  status_pernikahan: StatusPernikahan;
  no_rekening: string;
  no_sim: string;
  kelompok_etnis: KelompokEtnis;
  email: string;
  password: string;
  ktp: string;
  status_pasien: StatusPasien;
}

export interface PasienQueryResult extends RowDataPacket {
  id_pasien: number;
  nama_lengkap: string;
  nama_panggilan: string;
  tanggal_lahir: Date;
  tempat_lahir: string;
  jenis_kelamin: string;
  agama: string;
  ras: string;
  alamat: string;
  kode_negara: string;
  telepon: string;
  bahasa_utama: string;
  status_pernikahan: string;
  no_rekening: string;
  no_sim: string;
  kelompok_etnis: string;
  email: string;
  password: string;
  ktp: string;
  status_pasien: string;
}
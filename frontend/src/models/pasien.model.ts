export interface Pasien {
  id_pasien?: number;
  nama_lengkap: string;
  nama_panggilan: string;
  tanggal_lahir: Date;
  tempat_lahir: string;
  jenis_kelamin?: string;
  agama?: string;
  ras?: string;
  alamat: string;
  kode_negara: string;
  telepon: string;
  bahasa_utama: string;
  status_pernikahan?: string;
  no_rekening: string;
  no_sim: string;
  kelompok_etnis?: string;
  email: string;
  password: string;
  ktp: string;
  status_pasien?: string;
}
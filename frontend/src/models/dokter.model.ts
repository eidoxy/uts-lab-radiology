export interface Dokter {
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
import { useEffect, useState } from 'react';
import PocketBase from 'pocketbase';
import { Pasien } from '../models/pasien.model';

const CardFour = () => {
  const [data, setData] = useState<Pasien[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const pb = new PocketBase('https://rawat-jalan.pockethost.io');
      
      try {
        const records = await pb.collection('pasien').getFullList({
          sort: '-created',
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const dataPasien = records.map((record: any) => ({
          id_pasien: record.id,
          id_eksternal: record.id_eksternal,
          nama_lengkap: record.nama_lengkap,
          nama_panggilan: record.nama_panggilan,
          nama_ibu: record.nama_ibu,
          jenis_kelamin: record.jenis_kelamin,
          tanggal_lahir: record.tanggal_lahir,
          tempat_lahir: record.tempat_lahir,
          agama: record.agama,
          ras: record.ras,
          alamat: record.alamat,
          kode_negara: record.kode_negara,
          no_telp: record.no_telp,
          bahasa_utama: record.bahasa_utama,
          status_pernikahan: record.status_pernikahan,
          no_rekening: record.no_rekening,
          no_sim: record.no_sim,
          kelompok_etnis: record.kelompok_etnis,
          kelahiran_kembar: record.kelahiran_kembar,
          indikator_meninggal: record.indikator_meninggal,
          kewarganegaraan: record.kewarganegaraan,
          status_militer: record.status_militer,
          tanggal_meninggal: record.tanggal_meninggal,
        }));
        setData(dataPasien);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="fill-primary dark:fill-white"
          height="24px"
          width="24px"
          fill="#FFFFFF"
          viewBox="0 -960 960 960"
        >
          <path d="M0-240v-63q0-43 44-70t116-27q13 0 25 .5t23 2.5q-14 21-21 44t-7 48v65H0Zm240 0v-65q0-32 17.5-58.5T307-410q32-20 76.5-30t96.5-10q53 0 97.5 10t76.5 30q32 20 49 46.5t17 58.5v65H240Zm540 0v-65q0-26-6.5-49T754-397q11-2 22.5-2.5t23.5-.5q72 0 116 26.5t44 70.5v63H780Zm-455-80h311q-10-20-55.5-35T480-370q-55 0-100.5 15T325-320ZM160-440q-33 0-56.5-23.5T80-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T160-440Zm640 0q-33 0-56.5-23.5T720-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T800-440Zm-320-40q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-600q0 50-34.5 85T480-480Zm0-80q17 0 28.5-11.5T520-600q0-17-11.5-28.5T480-640q-17 0-28.5 11.5T440-600q0 17 11.5 28.5T480-560Zm1 240Zm-1-280Z" />
        </svg>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {loading ? (
              <div className="flex h-full bg-white dark:bg-boxdark">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
              </div>
            ) : (
              data.length
            )}
          </h4>
          <span className="text-sm font-medium">Total Pasien</span>
        </div>
      </div>
    </div>
  );
};

export default CardFour;

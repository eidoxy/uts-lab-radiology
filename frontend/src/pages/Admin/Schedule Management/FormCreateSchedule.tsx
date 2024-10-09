import { useState, ChangeEvent, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Breadcrumb from '../../../components/Breadcrumb';
import formatDate from '../../../utils/format';
import { Member } from '../../../models/member.model';
import { Schedule } from '../../../models/schedule.model';
import { BookDetail } from '../../../models/bookDetail.model';

const FormCreateSchedule = () => {
  const [schedule, setSchedule] = useState({
    pasien: [],
    dokter: [],
  });
  const [selectedPasien, setSelectedPasien] = useState('');
  const [selectedDokter, setSelectedDokter] = useState('');

  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState({
    id_pemeriksaan_lab: '',
    id_pemeriksaan_radiologi: '',
    waktu_mulai: new Date(),
    waktu_selesai: new Date(),
    id_petugas_lab: '',
  });

  const [userData, setUserData] = useState<any>([]);
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const userId: number = user ? user.id : 0;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/admin/${userId}`
        );
        if (response.status === 200) {
          setUserData(response.data.payload);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [memberResponse, doctorResponse] = await Promise.all([
          axios.get('http://localhost:3000/api/pasien'), // Pastikan endpoint ini mengembalikan data pasien
          axios.get('http://localhost:3000/api/dokter'), // Pastikan endpoint ini mengembalikan data dokter
        ]);

        if (
          memberResponse.status === 200 &&
          doctorResponse.status === 200
        ) {
          setSchedule({
            pasien: memberResponse.data.payload,
            dokter: doctorResponse.data.payload,
          });
        }
      } catch (error) {
        setError('An error occurred while fetching data.');
      }
    };

    fetchData();
  }, []);

  const handlePasienSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedPasien(e.target.value);
  };

  const handleDokterSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedDokter(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      ...inputValue,
      id_pasien: selectedPasien,
      id_dokter: selectedDokter,
      id_petugas_lab: userData.id, // Sesuaikan jika perlu
    };

    if (!data.waktu_mulai || !data.waktu_selesai) {
      return setError('Please select valid start and end times.');
    } else if (!data.id_pasien) {
      return setError('Please select a patient.');
    } else if (!data.id_dokter) {
      return setError('Please select a doctor.');
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/api/schedule-management/create', // Sesuaikan endpoint
        data
      );

      if (response.status === 201) {
        setError(null);
        return navigate('/admin/jadwal-pemeriksaan'); // Sesuaikan dengan halaman yang diinginkan
      } else {
        setError('An error occurred while creating the schedule.');
      }
    } catch (error) {
      setError('An error occurred while creating the schedule.');
    }
  };
  function handleInput(event: ChangeEvent<HTMLInputElement>): void {
    throw new Error('Function not implemented.');
  }

  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Form Create Schedule" />

        <div className="flex justify-center items-center">
          <div className="w-1/2 2xsm:w-3/4 justify-self-center justify-center justify-items-center content-center items-center self-center rounded-sm border border-stroke bg-white shadow-card dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Isi Form Dibawah Ini
              </h3>
            </div>
            <form
              id="form-upload"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <div className="p-6">
                {/* Select Pasien */}
                <div className="mb-5">
                  <div className="w-full">
                    <label
                      className="mb-2.5 block text-black dark:text-white"
                      htmlFor="selectedPasien"
                    >
                      Select Pasien
                    </label>
                    <select
                      name="selectedPasien"
                      id="selectedPasien"
                      value={selectedPasien}
                      onChange={handlePasienSelect} // Menggunakan handleMemberSelect untuk memilih pasien
                      className="w-full text-black-5 rounded border-2 border-stroke bg-whiten py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-black-4 dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      required
                    >
                      <option value="">Select Pasien</option>
                      {schedule.pasien.map((pasien) => (
                        <option key={pasien.id} value={pasien.id}>
                          {pasien.nama_lengkap}
                        </option>
                      ))}
                    </select>
                    {error && <p className="text-danger">{error}</p>}
                  </div>
                </div>

                {/* Select Dokter */}
                <div className="mb-5">
                  <div className="w-full">
                    <label
                      className="mb-2.5 block text-black dark:text-white"
                      htmlFor="selectedDokter"
                    >
                      Select Dokter
                    </label>
                    <select
                      name="selectedDokter"
                      id="selectedDokter"
                      value={selectedDokter}
                      onChange={handleDokterSelect}
                      className="w-full text-black-5 rounded border-2 border-stroke bg-whiten py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-black-4 dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      required
                    >
                      <option value="">Select Dokter</option>
                      {schedule.dokter.map((dokter) => (
                        <option
                          key={dokter.ID_Dokter}
                          value={dokter.ID_Dokter}
                        >
                          {dokter.Nama_Dokter} - {dokter.No_Telepon}{' '}
                          {/* Ganti dengan atribut yang sesuai */}
                        </option>
                      ))}
                    </select>
                    {error && <p className="text-danger">{error}</p>}
                  </div>
                </div>

                {/* Input Waktu Mulai */}
                <div className="mb-5">
                  <div className="w-full">
                    <label
                      className="mb-2.5 block text-black dark:text-white"
                      htmlFor="waktu_mulai"
                    >
                      Waktu Mulai
                    </label>
                    <input
                      type="datetime-local"
                      id="waktu_mulai"
                      name="waktu_mulai"
                      value={inputValue.waktu_mulai}
                      onChange={handleInput}
                      className="w-full text-black-5 rounded border-2 border-stroke bg-whiten py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-black-4 dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      required
                    />
                  </div>
                </div>

                {/* Input Waktu Selesai */}
                <div className="mb-5">
                  <div className="w-full">
                    <label
                      className="mb-2.5 block text-black dark:text-white"
                      htmlFor="waktu_selesai"
                    >
                      Waktu Selesai
                    </label>
                    <input
                      type="datetime-local"
                      id="waktu_selesai"
                      name="waktu_selesai"
                      value={inputValue.waktu_selesai}
                      onChange={handleInput}
                      className="w-full text-black-5 rounded border-2 border-stroke bg-whiten py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-black-4 dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      required
                    />
                  </div>
                </div>

                {/* Ruangan */}
                <div className="mb-5">
                  <div className="w-full">
                    <label
                      className="mb-2.5 block text-black dark:text-white"
                      htmlFor="ruangan"
                    >
                      Ruangan
                    </label>
                    <input
                      type="text"
                      id="ruangan"
                      name="ruangan"
                      value={inputValue.ruangan}
                      onChange={handleInput}
                      placeholder="Masukkan ruangan"
                      className="w-full text-black-5 rounded border-2 border-stroke bg-whiten py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-black-4 dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <NavLink
                    to="/admin/borrowing-management"
                    className="flex w-1/2 justify-center rounded text-danger border transition hover:text-white hover:bg-danger focus:outline-none dark:focus:outline-none dark:hover:bg-danger p-3 font-medium"
                  >
                    Cancel
                  </NavLink>
                  <button
                    type="submit"
                    className="flex w-1/2 justify-center rounded bg-primary p-3 font-medium text-white transition hover:bg-dark-blue"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormCreateSchedule;

import { useState, ChangeEvent, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Breadcrumb from '../../../components/Breadcrumb';
import formatDate from '../../../utils/format';
import { Schedule } from '../../../models/schedule.model';
import { Pemeriksaan } from '../../../models/pemeriksaan.model';
import { Petugas } from '../../../models/petugas.model';
import { Dokter } from '../../../models/dokter.model';

const FormCreateSchedule = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<Schedule>({
    waktu_mulai: new Date(),
    waktu_selesai: new Date(),
    ruangan: '',
  });
  const [schedule, setSchedule] = useState({
    pemeriksaan: [],
    petugas: [],
    dokter: [],
  });
  const [selectedPemeriksaan, setSelectedPemeriksaan] = useState('');
  const [selectedPetugas, setSelectedPetugas] = useState('');
  const [selectedDokter, setSelectedDokter] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pemeriksaanResponse, dokterResponse, petugasResponse] = await Promise.all([
          axios.get('https://wabw.chasterise.fun/api/pemeriksaan'),
          axios.get('https://wabw.chasterise.fun/api/dokter'),
          axios.get('https://wabw.chasterise.fun/api/petugas'),
        ]);

        if (
          pemeriksaanResponse.status === 200 &&
          petugasResponse.status === 200 &&
          dokterResponse.status === 200
        ) {
          setSchedule({
            pemeriksaan: pemeriksaanResponse.data.payload,
            petugas: petugasResponse.data.payload,
            dokter: dokterResponse.data.payload,
          });
        }
      } catch (error) {
        setError('An error occurred while fetching data.');
      }
    };

    fetchData();
  }, []);

  const handlePemeriksaanSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedPemeriksaan(e.target.value);
  };

  const handlePetugasSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedPetugas(e.target.value);
  };

  const handleDokterSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedDokter(e.target.value);
  };

  const handleStatusSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const waktuMulai = formatDate(inputValue.waktu_mulai);
    const waktuSelesai = formatDate(inputValue.waktu_selesai);

    if (!selectedPemeriksaan || !selectedPetugas || !selectedDokter || !selectedStatus) {
      return setError('Please select a valid option.');
    } else if (!inputValue.waktu_mulai || !inputValue.waktu_selesai) {
      return setError('Please select valid start and end times.');
    } else if (!inputValue.ruangan) {
      return setError('Please enter the room.');
    } else if (inputValue.waktu_mulai >= inputValue.waktu_selesai) {
      return setError('End time must be greater than start time.');
    } else if (inputValue.waktu_mulai < new Date()) {
      return setError('Start time must be greater than the current time.');
    } 

    const data = {
      ...inputValue,
      waktu_mulai: waktuMulai,
      waktu_selesai: waktuSelesai,
      id_pemeriksaan: selectedPemeriksaan,
      id_petugas: selectedPetugas,
      id_dokter: selectedDokter,
      status_jadwal: selectedStatus,
    };

    try {
      const response = await axios.post(
        'https://wabw.chasterise.fun/api/schedule/create',
        data,
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        setError(null);
        return navigate('/admin/schedule-management');
      } else {
        setError('An error occurred while creating the schedule.');
      }
    } catch (error) {
      setError('An error occurred while creating the schedule.');
    }
  };

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
                {/* Select Pemeriksaan */}
                <div className="mb-5">
                  <div className="w-full">
                    <label
                      className="mb-2.5 block text-black dark:text-white"
                      htmlFor="selectedPemeriksaan"
                    >
                      Select Pemeriksaan
                    </label>
                    <select
                      name="selectedPemeriksaan"
                      id="selectedPemeriksaan"
                      value={selectedPemeriksaan}
                      onChange={handlePemeriksaanSelect}
                      className="w-full text-black-5 rounded border-2 border-stroke bg-whiten py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-black-4 dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      required
                    >
                      <option value="">Select Pemeriksaan</option>
                      {schedule.pemeriksaan.map(
                        (pemeriksaan: Pemeriksaan) => (
                          <option
                            key={pemeriksaan.id_pemeriksaan}
                            value={pemeriksaan.id_pemeriksaan}
                          >
                            {pemeriksaan.nama_dokter} -{' '}
                            {formatDate(pemeriksaan.tanggal_permintaan)} -{' '}
                            {pemeriksaan.nama_layanan}
                          </option>
                        )
                      )}
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
                      {schedule.dokter.map((dokter: Dokter) => (
                        <option
                          key={dokter.id_dokter}
                          value={dokter.id_dokter}
                        >
                          {dokter.nama_dokter}
                        </option>
                      ))}
                    </select>
                    {error && <p className="text-danger">{error}</p>}
                  </div>
                </div>

                {/* Select Petugas */}
                <div className="mb-5">
                  <div className="w-full">
                    <label
                      className="mb-2.5 block text-black dark:text-white"
                      htmlFor="selectedPetugas"
                    >
                      Select Petugas
                    </label>
                    <select
                      name="selectedPetugas"
                      id="selectedPetugas"
                      value={selectedPetugas}
                      onChange={handlePetugasSelect}
                      className="w-full text-black-5 rounded border-2 border-stroke bg-whiten py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-black-4 dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      required
                    >
                      <option value="">Select Petugas</option>
                      {schedule.petugas.map((petugas: Petugas) => (
                        <option
                          key={petugas.id_petugas}
                          value={petugas.id_petugas}
                        >
                          {petugas.nama_petugas}
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
                      type="date"
                      id="waktu_mulai"
                      name="waktu_mulai"
                      value={formatDate(inputValue.waktu_mulai)}
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
                      type="date"
                      id="waktu_selesai"
                      name="waktu_selesai"
                      value={formatDate(inputValue.waktu_selesai)}
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

                {/* Status Jadwal */}
                <div className="mb-5">
                  <div className="w-full">
                    <label
                      className="mb-2.5 block text-black dark:text-white"
                      htmlFor="selectedStatus"
                    >
                      Status Jadwal
                    </label>
                    <select
                      name="selectedStatus"
                      id="selectedStatus"
                      value={selectedStatus}
                      onChange={handleStatusSelect}
                      className="w-full text-black-5 rounded border-2 border-stroke bg-whiten py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-black-4 dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      required
                    >
                      <option value="">Select Status</option>
                      <option value="pending">Pending</option>
                      <option value="proses">Proses</option>
                      <option value="selesai">Selesai</option>
                    </select>
                    {error && <p className="text-danger">{error}</p>}
                  </div>
                </div>

                <div className="flex gap-4">
                  <NavLink
                    to="/admin/schedule-management"
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

import { useState, ChangeEvent, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Breadcrumb from '../../../components/Breadcrumb';
import { Pemeriksaan } from '../../../models/pemeriksaan.model';
import { Pasien } from '../../../models/pasien.model';
import { Dokter } from '../../../models/dokter.model';
import { Layanan } from '../../../models/layanan.model';
import formatDate from '../../../utils/format';

const FormCreatePemeriksaan = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<Pemeriksaan>({
    tanggal_permintaan: new Date(),
    catatan_dokter: '',
  });

  const [pemeriksaan, setPemeriksaan] = useState({
    pasien: [],
    dokter: [],
    layanan: [],
    spesimen: [],
  });

  const [selectedPasien, setSelectedPasien] = useState('');
  const [selectedDokter, setSelectedDokter] = useState('');
  const [selectedLayanan, setSelectedLayanan] = useState('');
  const [selectedJenisPemeriksaan, setSelectedJenisPemeriksaan] = useState('');
  const [selectedPrioritas, setSelectedPrioritas] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          pasienResponse,
          dokterResponse,
          layananResponse,
          spesimenResponse,
        ] = await Promise.all([
          axios.get('https://wabw.chasterise.fun/api/pasien', {
            withCredentials: true,
          }),
          axios.get('https://wabw.chasterise.fun/api/dokter', {
            withCredentials: true,
          }),
          axios.get('https://wabw.chasterise.fun/api/layanan', {
            withCredentials: true,
          }),
          axios.get('https://wabw.chasterise.fun/api/spesimen', {
            withCredentials: true,
          }),
        ]);

        if (
          pasienResponse.status === 200 &&
          dokterResponse.status === 200 &&
          layananResponse.status === 200 &&
          spesimenResponse.status === 200
        ) {
          setPemeriksaan({
            pasien: pasienResponse.data.payload,
            dokter: dokterResponse.data.payload,
            layanan: layananResponse.data.payload,
            spesimen: spesimenResponse.data.payload,
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
  }

  const handleDokterSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedDokter(e.target.value);
  }

  const handleLayananSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedLayanan(e.target.value);
  }

  const handleJenisPemeriksaanSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedJenisPemeriksaan(e.target.value);
  }

  const handlePrioritasSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedPrioritas(e.target.value);
  }

  const handleStatusSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
  }
  
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formattedDate = formatDate(inputValue.tanggal_permintaan);

    const data = {
      ...inputValue,
      tanggal_permintaan: formattedDate,
      id_pasien: selectedPasien,
      id_dokter: selectedDokter,
      id_layanan: selectedLayanan,
      jenis_pemeriksaan: selectedJenisPemeriksaan,
      prioritas: selectedPrioritas,
      status_permintaan: selectedStatus,
    };

    try {
      const response = await axios.post(
        'https://wabw.chasterise.fun/api/pemeriksaan/create',
        data
      );

      if (response.status === 201) {
        setError(null);
        return navigate('/admin/pemeriksaan-management');
      } else {
        setError('An error occurred while creating the pemeriksaan.');
      }
    } catch (error) {
      setError('An error occurred while creating the pemeriksaan.');
    }
  };

  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Form Create Pemeriksaan" />

        <div className="flex justify-center items-center">
          <div className="w-1/2 2xsm:w-3/4 justify-self-center justify-center justify-items-center content-center items-center self-center rounded-sm border border-stroke bg-white shadow-card dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Form Create Pemeriksaan
              </h3>
            </div>
            <form
              id="form-upload"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <div className="p-6">
                <div className="mb-5">
                  <div className="w-full">
                    <label
                      className="mb-2.5 block text-black dark:text-white"
                      htmlFor="name"
                    >
                      Nama Pasien
                    </label>
                    <select
                      id="pasien"
                      name="pasien"
                      value={selectedPasien}
                      onChange={handlePasienSelect}
                      className="w-full text-black-5 rounded border-2 border-stroke bg-whiten py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-black-4 dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      required
                    >
                      <option value="">Select Pasien</option>
                      {pemeriksaan.pasien.map((pasien: Pasien) => (
                        <option
                          key={pasien.id_pasien}
                          value={pasien.id_pasien}
                        >
                          {pasien.nama_lengkap}
                        </option>
                      ))}
                    </select>
                    {error && <p className="text-danger">{error}</p>}
                  </div>
                </div>

                <div className="mb-5">
                  <div className="w-full">
                    <label
                      className="mb-2.5 block text-black dark:text-white"
                      htmlFor="name"
                    >
                      Nama Dokter
                    </label>
                    <select
                      id="dokter"
                      name="dokter"
                      value={selectedDokter}
                      onChange={handleDokterSelect}
                      className="w-full text-black-5 rounded border-2 border-stroke bg-whiten py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-black-4 dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      required
                    >
                      <option value="">Select Dokter</option>
                      {pemeriksaan.dokter.map((dokter: Dokter) => (
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

                <div className="mb-5">
                  <div className="w-full">
                    <label
                      className="mb-2.5 block text-black dark:text-white"
                      htmlFor="name"
                    >
                      Nama Layanan
                    </label>
                    <select
                      id="layanan"
                      name="layanan"
                      value={selectedLayanan}
                      onChange={handleLayananSelect}
                      className="w-full text-black-5 rounded border-2 border-stroke bg-whiten py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-black-4 dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      required
                    >
                      <option value="">Select Layanan</option>
                      {pemeriksaan.layanan.map((layanan: Layanan) => (
                        <option
                          key={layanan.id_layanan}
                          value={layanan.id_layanan}
                        >
                          {layanan.nama_layanan}
                        </option>
                      ))}
                    </select>
                    {error && <p className="text-danger">{error}</p>}
                  </div>
                </div>

                <div className="mb-5">
                  <div className="w-full">
                    <label
                      className="mb-2.5 block text-black dark:text-white"
                      htmlFor="name"
                    >
                      Jenis Pemeriksaan
                    </label>
                    <select
                      id="jenis_pemeriksaan"
                      name="jenis_pemeriksaan"
                      value={selectedJenisPemeriksaan}
                      onChange={handleJenisPemeriksaanSelect}
                      className="w-full text-black-5 rounded border-2 border-stroke bg-whiten py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-black-4 dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      required
                    >
                      <option value="">Select Jenis Pemeriksaan</option>
                      <option value="lab">lab</option>
                      <option value="radiologi">radiologi</option>
                    </select>
                    {error && <p className="text-danger">{error}</p>}
                  </div>
                </div>

                <div className="mb-5">
                  <div className="w-full">
                    <label
                      className="mb-2.5 block text-black dark:text-white"
                      htmlFor="name"
                    >
                      Tanggal Permintaan
                    </label>
                    <input
                      type="date"
                      id="tanggal_permintaan"
                      name="tanggal_permintaan"
                      value={formatDate(inputValue.tanggal_permintaan)}
                      onChange={handleInput}
                      placeholder="Tanggal Permintaan"
                      className="w-full text-black-5 rounded border-2 border-stroke bg-whiten py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-black-4 dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      required
                    />
                    {error && <p className="text-danger">{error}</p>}
                  </div>
                </div>

                <div className="mb-5">
                  <div className="w-full">
                    <label
                      className="mb-2.5 block text-black dark:text-white"
                      htmlFor="name"
                    >
                      Prioritas
                    </label>
                    <select
                      id="prioritas"
                      name="prioritas"
                      value={selectedPrioritas}
                      onChange={handlePrioritasSelect}
                      className="w-full text-black-5 rounded border-2 border-stroke bg-whiten py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-black-4 dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      required
                    >
                      <option value="">Select Prioritas</option>
                      <option value="emergency">emergency</option>
                      <option value="urgent">urgent</option>
                      <option value="normal">normal</option>
                    </select>
                    {error && <p className="text-danger">{error}</p>}
                  </div>
                </div>

                <div className="mb-5">
                  <div className="w-full">
                    <label
                      className="mb-2.5 block text-black dark:text-white"
                      htmlFor="name"
                    >
                      Status Permintaan
                    </label>
                    <select
                      id="status_permintaan"
                      name="status_permintaan"
                      value={selectedStatus}
                      onChange={handleStatusSelect}
                      className="w-full text-black-5 rounded border-2 border-stroke bg-whiten py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-black-4 dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      required
                    >
                      <option value="">Select Status Permintaan</option>
                      <option value="pending">pending</option>
                      <option value="proses">proses</option>
                      <option value="selesai">selessai</option>
                    </select>
                    {error && <p className="text-danger">{error}</p>}
                  </div>
                </div>

                <div className="flex gap-4">
                  <NavLink
                    to="/admin/pemeriksaan-management"
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

export default FormCreatePemeriksaan;

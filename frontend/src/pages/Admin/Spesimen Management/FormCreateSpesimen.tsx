import { useState, ChangeEvent, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Breadcrumb from '../../../components/Breadcrumb';
import { Spesimen } from '../../../models/spesimen.model';
import { Pemeriksaan } from '../../../models/pemeriksaan.model';
import formatDate from '../../../utils/format';

const FormCreateSpesimen = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<Spesimen>({
    tanggal_pengambilan: new Date(),
    lokasi_pengambilan: '',
    tanggal_diterima: new Date(),
    catatan: '',
  });
  const [dataPemeriksaan, setDataPemeriksaan] = useState<Pemeriksaan[]>([]);
  const [selectedPemeriksaan, setSelectedPemeriksaan] = useState('');
  const [selectedJenis, setSelectedJenis] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pemeriksaanResponse = await axios.get(
          'https://wabw.chasterise.fun/api/pemeriksaan',
          {
            withCredentials: true,
          }
        );

        if (pemeriksaanResponse.status === 200) {
          setDataPemeriksaan(pemeriksaanResponse.data.payload);
        } else {
          setError('An error occurred while fetching data.');
        }
      } catch (error) {
        setError('An error occurred while fetching data.');
      }
    };

    fetchData();
  }, []);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handlePemeriksaanSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedPemeriksaan(e.target.value);
  };

  const handleJenisSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedJenis(e.target.value);
  }

  const handleStatusSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(e.target.value);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedPemeriksaan) {
      return setError('Pemeriksaan must be selected.');
    }

    const formattedTanggalPengambilan = formatDate(inputValue.tanggal_pengambilan);
    const formattedTanggalDiterima = formatDate(inputValue.tanggal_diterima);

    try {
      const data = {
        id_pemeriksaan: selectedPemeriksaan,
        jenis_spesimen: selectedJenis,
        tanggal_pengambilan: formattedTanggalPengambilan,
        lokasi_pengambilan: inputValue.lokasi_pengambilan,
        tanggal_diterima: formattedTanggalDiterima,
        status_spesimen: selectedStatus,
        catatan: inputValue.catatan,
      };
      
      const response = await axios.post(
        'https://wabw.chasterise.fun/api/spesimen/create',
        data,
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        return navigate('/admin/spesimen-management');
      } else {
        setError('An error occurred while creating the spesimen.');
      }
    } catch (error) {
      setError('An error occurred while creating the spesimen.');
    }
  };

  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Form Create Spesimen" />

        <div className="flex justify-center items-center">
          <div className="w-1/2 2xsm:w-3/4 justify-self-center justify-center justify-items-center content-center items-center self-center rounded-sm border border-stroke bg-white shadow-card dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Form Create Spesimen
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
                      htmlFor="id_pemeriksaan"
                    >
                      Pemeriksaan
                    </label>
                    <select
                      id="id_pemeriksaan"
                      name="id_pemeriksaan"
                      value={selectedPemeriksaan}
                      onChange={handlePemeriksaanSelect}
                      className="w-full text-black-5 rounded border-2 border-stroke bg-whiten py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-black-4 dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      required
                    >
                      <option value="">Select Pemeriksaan</option>
                      {dataPemeriksaan.map((pemeriksaan) => (
                        <option
                          key={pemeriksaan.id_pemeriksaan}
                          value={pemeriksaan.id_pemeriksaan}
                        >
                          {pemeriksaan.nama_lengkap} -{' '}
                          {pemeriksaan.nama_dokter} -{' '}
                          {pemeriksaan.jenis_pemeriksaan}
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
                      htmlFor="jenis_spesimen"
                    >
                      Jenis Spesimen
                    </label>
                    <select
                      id="jenis_spesimen"
                      name="jenis_spesimen"
                      value={inputValue.jenis_spesimen}
                      onChange={handleJenisSelect}
                      className="w-full text-black-5 rounded border-2 border-stroke bg-whiten py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-black-4 dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      required
                    >
                      <option value="">Select Jenis Spesimen</option>
                      <option value="darah">Darah</option>
                      <option value="urine">Urine</option>
                      <option value="tinja">Tinja</option>
                      <option value="sputum">Sputum</option>
                      <option value="lainnya">Lainnya</option>
                    </select>
                    {error && <p className="text-danger">{error}</p>}
                  </div>
                </div>

                <div className="mb-5">
                  <div className="w-full">
                    <label
                      className="mb-2.5 block text-black dark:text-white"
                      htmlFor="tanggal_pengambilan"
                    >
                      Tanggal Pengambilan
                    </label>
                    <input
                      type="date"
                      id="tanggal_pengambilan"
                      name="tanggal_pengambilan"
                      value={formatDate(inputValue.tanggal_pengambilan)}
                      onChange={handleInput}
                      placeholder="Tanggal pengambilan"
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
                      htmlFor="lokasi_pengambilan"
                    >
                      Lokasi Pengambilan
                    </label>
                    <input
                      type="text"
                      id="lokasi_pengambilan"
                      name="lokasi_pengambilan"
                      value={inputValue.lokasi_pengambilan}
                      onChange={handleInput}
                      placeholder="Lokasi pengambilan"
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
                      htmlFor="tanggal_diterima"
                    >
                      Tanggal Diterima
                    </label>
                    <input
                      type="date"
                      id="tanggal_diterima"
                      name="tanggal_diterima"
                      value={formatDate(inputValue.tanggal_diterima)}
                      onChange={handleInput}
                      placeholder="Tanggal diterima"
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
                      htmlFor="status_spesimen"
                    >
                      Status Spesimen
                    </label>
                    <select
                      id="status_spesimen"
                      name="status_spesimen"
                      value={inputValue.status_spesimen}
                      onChange={handleStatusSelect}
                      className="w-full text-black-5 rounded border-2 border-stroke bg-whiten py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-black-4 dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      required
                    >
                      <option value="">Select Status</option>
                      <option value="diterima">Diterima</option>
                      <option value="diproses">Diproses</option>
                      <option value="selesai">Selesai</option>
                      <option value="rusak">Rusak</option>
                    </select>
                    {error && <p className="text-danger">{error}</p>}
                  </div>
                </div>

                <div className="mb-5">
                  <div className="w-full">
                    <label
                      className="mb-2.5 block text-black dark:text-white"
                      htmlFor="catatan"
                    >
                      Catatan
                    </label>
                    <input
                      type="text"
                      id="catatan"
                      name="catatan"
                      value={inputValue.catatan}
                      onChange={handleInput}
                      placeholder="Catatan"
                      className="w-full text-black-5 rounded border-2 border-stroke bg-whiten py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-black-4 dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    {error && <p className="text-danger">{error}</p>}
                  </div>
                </div>

                <div className="flex gap-4">
                  <NavLink
                    to="/admin/spesimen-management"
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

export default FormCreateSpesimen;

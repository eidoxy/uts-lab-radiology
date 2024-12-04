import { useState, ChangeEvent } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { formatDate } from '../../../utils/format';
import Breadcrumb from '../../../components/Breadcrumb';
import { Pasien } from '../../../models/pasien.model';

const FormCreatePasien = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<Pasien>({
    nama_lengkap: '',
    nama_panggilan: '',
    tanggal_lahir: new Date(),
    tempat_lahir: '',
    alamat: '',
    kode_negara: '',
    telepon: '',
    bahasa_utama: '',
    no_rekening: '',
    no_sim: '',
    email: '',
    password: '',
    ktp: '',
  });

  const [jenisKelamin, setJenisKelamin] = useState<string>('');
  const [agama, setAgama] = useState<string>('');
  const [ras, setRas] = useState<string>('');
  const [statusPernikahan, setStatusPernikahan] = useState<string>('');
  const [kelompokEtnis, setKelompokEtnis] = useState<string>('');
  const [statusPasien, setStatusPasien] = useState<string>('');

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleJenisKelaminSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setJenisKelamin(e.target.value);
  }

  const handleAgamaSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setAgama(e.target.value);
  }

  const handleRasSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setRas(e.target.value);
  }

  const handleStatusPernikahanSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatusPernikahan(e.target.value);
  }

  const handleKelompokEtnisSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setKelompokEtnis(e.target.value);
  }

  const handleStatusPasienSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatusPasien(e.target.value);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formattedDate = inputValue.tanggal_lahir ? formatDate(inputValue.tanggal_lahir) : '';

    const data = {
      ...inputValue,
      jenis_kelamin: jenisKelamin,
      agama: agama,
      ras: ras,
      status_pernikahan: statusPernikahan,
      kelompok_etnis: kelompokEtnis,
      status_pasien: statusPasien,
      tanggal_lahir: formattedDate
    }

    if (!data.jenis_kelamin) {
      return setError('Jenis Kelamin is required');
    } else if (!data.agama) {
      return setError('Agama is required');
    } else if (!data.ras) {
      return setError('Ras is required');
    } else if (!data.status_pernikahan) {
      return setError('Status Pernikahan is required');
    } else if (!data.kelompok_etnis) {
      return setError('Kelompok Etnis is required');
    } else if (!data.status_pasien) {
      return setError('Status Pasien is required');
    } else if (!data.nama_lengkap) {
      return setError('Nama Lengkap is required');
    } else if (!data.nama_panggilan) {
      return setError('Nama Panggilan is required');
    } else if (!data.tanggal_lahir) {
      return setError('Tanggal Lahir is required');
    } else if (!data.tempat_lahir) {
      return setError('Tempat Lahir is required');
    } else if (!data.alamat) {
      return setError('Alamat is required');
    } else if (!data.kode_negara) {
      return setError('Kode Negara is required');
    } else if (!data.telepon) {
      return setError('Telepon is required');
    } else if (!data.bahasa_utama) {
      return setError('Bahasa Utama is required');
    } else if (!data.no_rekening) {
      return setError('No Rekening is required');
    } else if (!data.no_sim) {
      return setError('No SIM is required');
    } else if (!data.email) {
      return setError('Email is required');
    } else if (!data.password) {
      return setError('Password is required');
    } else if (!data.ktp) {
      return setError('KTP is required');
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/api/pasien/create',
        data,
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        setError(null);
        return navigate('/admin/pasien-management');
      } else {
        setError('An error occurred while creating the pasien.');
      }
    } catch (error) {
      setError('An error occurred while creating the pasien.');
    }
  };

  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Form Create Pasien" />

        <div className="flex justify-center items-center">
          <div className="w-1/2 2xsm:w-3/4 justify-self-center justify-center justify-items-center content-center items-center self-center rounded-sm border border-stroke bg-white shadow-card dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Form Create Pasien
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
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      id="nama_lengkap"
                      name="nama_lengkap"
                      value={inputValue.nama_lengkap}
                      onChange={handleInput}
                      placeholder="Nama Lengkap"
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
                      Nama Panggilan
                    </label>
                    <input
                      type="text"
                      id="nama_panggilan"
                      name="nama_panggilan"
                      value={inputValue.nama_panggilan}
                      onChange={handleInput}
                      placeholder="Nama Panggilan"
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
                      Tanggal Lahir
                    </label>
                    <input
                      type="date"
                      id="tanggal_lahir"
                      name="tanggal_lahir"
                      value={inputValue.tanggal_lahir ? inputValue.tanggal_lahir.toString() : ''}
                      onChange={handleInput}
                      placeholder="Tanggal Lahir"
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
                      Tempat Lahir
                    </label>
                    <input
                      type="text"
                      id="tempat_lahir"
                      name="tempat_lahir"
                      value={inputValue.tempat_lahir}
                      onChange={handleInput}
                      placeholder="Tempat Lahir"
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
                      Jenis Kelamin
                    </label>
                    <select
                      name="jenis_kelamin"
                      id="jenis_kelamin"
                      value={inputValue.jenis_kelamin}
                      onChange={handleJenisKelaminSelect}
                      className="w-full text-black-5 rounded border-2 border-stroke bg-whiten py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-black-4 dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                      <option value="">Select Jenis Kelamin</option>
                      <option value="pria">Pria</option>
                      <option value="wanita">Wanita</option>
                    </select>
                  </div>
                </div>

                <div className="mb-5">
                  <div className="w-full">
                    <label
                      className="mb-2.5 block text-black dark:text-white"
                      htmlFor="name"
                    >
                      Agama
                    </label>
                    <select
                      name="agama"
                      id="agama"
                      value={inputValue.agama}
                      onChange={handleAgamaSelect}
                      className="w-full text-black-5 rounded border-2 border-stroke bg-whiten py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-black-4 dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                      <option value="">Select Agama</option>
                      <option value="islam">Islam</option>
                      <option value="kristen">Kristen</option>
                      <option value="katolik">Katolik</option>
                      <option value="hindu">Hindu</option>
                      <option value="budha">Budha</option>
                      <option value="konghucu">Konghucu</option>
                      <option value="lainnya">Lainnya</option>
                    </select>
                  </div>
                </div>

                <div className="mb-5">
                  <div className="w-full">
                    <label
                      className="mb-2.5 block text-black dark:text-white"
                      htmlFor="name"
                    >
                      Ras
                    </label>
                    <select
                      name="ras"
                      id="ras"
                      value={inputValue.ras}
                      onChange={handleRasSelect}
                      className="w-full text-black-5 rounded border-2 border-stroke bg-whiten py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-black-4 dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                      <option value="">Select Ras</option>
                      <option value="white">White</option>
                      <option value="black">Black</option>
                      <option value="asian">Asian</option>
                      <option value="indian">Indian</option>
                      <option value="chinese">Chinese</option>
                      <option value="lainnya">Lainnya</option>
                    </select>
                  </div>
                </div>

                <div className="mb-5">
                  <div className="w-full">
                    <label
                      className="mb-2.5 block text-black dark:text-white"
                      htmlFor="name"
                    >
                      Alamat
                    </label>
                    <input
                      type="text"
                      id="alamat"
                      name="alamat"
                      value={inputValue.alamat}
                      onChange={handleInput}
                      placeholder="Alamat"
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
                      Kode Negara
                    </label>
                    <input
                      type="text"
                      id="kode_negara"
                      name="kode_negara"
                      value={inputValue.kode_negara}
                      onChange={handleInput}
                      placeholder="Kode Negara"
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
                      Telepon
                    </label>
                    <input
                      type="text"
                      id="telepon"
                      name="telepon"
                      value={inputValue.telepon}
                      onChange={handleInput}
                      placeholder="Telepon"
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
                      Bahasa Utama
                    </label>
                    <input
                      type="text"
                      id="bahasa_utama"
                      name="bahasa_utama"
                      value={inputValue.bahasa_utama}
                      onChange={handleInput}
                      placeholder="Bahasa Utama"
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
                      Status Pernikahan
                    </label>
                    <select
                      name="status_pernikahan"
                      id="status_pernikahan"
                      value={inputValue.status_pernikahan}
                      onChange={handleStatusPernikahanSelect}
                      className="w-full text-black-5 rounded border-2 border-stroke bg-whiten py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-black-4 dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                      <option value="">Select Status Pernikahan</option>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                      <option value="divorced">Divorced</option>
                      <option value="widowed">Widowed</option>
                    </select>
                  </div>
                </div>

                <div className="mb-5">
                  <div className="w-full">
                    <label
                      className="mb-2.5 block text-black dark:text-white"
                      htmlFor="no_rekening"
                    >
                      No Rekening
                    </label>
                    <input
                      type="text"
                      id="no_rekening"
                      name="no_rekening"
                      value={inputValue.no_rekening}
                      onChange={handleInput}
                      placeholder="No Rekening"
                      className="w-full text-black-5 rounded border-2 border-stroke bg-whiten py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-black-4 dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    {error && <p className="text-danger">{error}</p>}
                  </div>
                </div>

                <div className="mb-5">
                  <div className="w-full">
                    <label
                      className="mb-2.5 block text-black dark:text-white"
                      htmlFor="no_sim"
                    >
                      No SIM
                    </label>
                    <input
                      type="text"
                      id="no_sim"
                      name="no_sim"
                      value={inputValue.no_sim}
                      onChange={handleInput}
                      placeholder="No SIM"
                      className="w-full text-black-5 rounded border-2 border-stroke bg-whiten py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-black-4 dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    {error && <p className="text-danger">{error}</p>}
                  </div>
                </div>

                <div className="mb-5">
                  <div className="w-full">
                    <label
                      className="mb-2.5 block text-black dark:text-white"
                      htmlFor="kelompok_etnis"
                    >
                      Kelompok Etnis
                    </label>
                    <select
                      name="kelompok_etnis"
                      id="kelompok_etnis"
                      value={inputValue.kelompok_etnis}
                      onChange={handleKelompokEtnisSelect}
                      className="w-full text-black-5 rounded border-2 border-stroke bg-whiten py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-black-4 dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                      <option value="">Select Kelompok Etnis</option>
                      <option value="hispanic">Hispanic</option>
                      <option value="non-hispanic">Non Hispanic</option>
                      <option value="lainnya">Lainnya</option>
                    </select>
                  </div>
                </div>

                <div className="mb-5">
                  <div className="w-full">
                    <label
                      className="mb-2.5 block text-black dark:text-white"
                      htmlFor="name"
                    >
                      email
                    </label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      value={inputValue.email}
                      onChange={handleInput}
                      placeholder="Email"
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
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={inputValue.password}
                      onChange={handleInput}
                      placeholder="Password"
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
                      htmlFor="ktp"
                    >
                      KTP
                    </label>
                    <input
                      type="text"
                      id="ktp"
                      name="ktp"
                      value={inputValue.ktp}
                      onChange={handleInput}
                      placeholder="KTP"
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
                      htmlFor="status_pasien"
                    >
                      Status Pasien
                    </label>
                    <select
                      name="status_pasien"
                      id="status_pasien"
                      value={inputValue.status_pasien}
                      onChange={handleStatusPasienSelect}
                      className="w-full text-black-5 rounded border-2 border-stroke bg-whiten py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-black-4 dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                      <option value="">Select Status Pasien</option>
                      <option value="dead">Dead</option>
                      <option value="alive">Alive</option>
                      <option value="unknown">Unknown</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-4">
                  <NavLink
                    to="/admin/admin-management"
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

export default FormCreatePasien;

import { useState, ChangeEvent } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Breadcrumb from '../../../components/Breadcrumb';
import { Dokter } from '../../../models/dokter.model';

const FormCreateDokter = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<Dokter>({
    npi: '',
    nama_dokter: '',
    tanggal_lahir: new Date(),
    telepon: '',
    email: '',
    password: '',
    spesialisasi: '',
    tanggal_lisensi: new Date(),
    nama_lisensi: '',
  });
  const [selectedJenisKelamin, setSelectedJenisKelamin] = useState('');
  const [selectedStatusLisensi, setSelectedStatusLisensi] = useState('');

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleJenisKelaminSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedJenisKelamin(e.target.value);
  }

  const handleStatusLisensiSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatusLisensi(e.target.value);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      ...inputValue,
      jenis_kelamin: selectedJenisKelamin,
      status_lisensi: selectedStatusLisensi,
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/api/dokter/create',
        data,
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        setError(null);
        return navigate('/admin/dokter-management');
      } else {
        setError('An error occurred while creating the dokter.');
      }
    } catch (error) {
      setError('An error occurred while creating the dokter.');
    }
  };

  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Form Create Dokter" />

        <div className="flex justify-center items-center">
          <div className="w-1/2 2xsm:w-3/4 justify-self-center justify-center justify-items-center content-center items-center self-center rounded-sm border border-stroke bg-white shadow-card dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Form Create Dokter
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
                      Nama
                    </label>
                    <input
                      type="text"
                      id="nama_dokter"
                      name="nama_dokter"
                      value={inputValue.nama_dokter}
                      onChange={handleInput}
                      placeholder="Nama"
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
                      NPI
                    </label>
                    <input
                      type="text"
                      id="npi"
                      name="npi"
                      value={inputValue.npi}
                      onChange={handleInput}
                      placeholder="NPI"
                      className="w-full text-black-5 rounded border-2 border-stroke bg-whiten py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-black-4 dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      required
                    />
                    {error && <p className="text-danger">{error}</p>}
                  </div>
                </div>

                {/* jenis kelamin */}
                <div className="mb-5">
                  <div className="w-full">
                    <label
                      className="mb-2.5 block text-black dark:text-white"
                      htmlFor="jenis_kelamin"
                    >
                      Jenis Kelamin
                    </label>
                    <select
                      id="jenis_kelamin"
                      name="jenis_kelamin"
                      value={selectedJenisKelamin}
                      onChange={handleJenisKelaminSelect}
                      className="w-full text-black-5 rounded border-2 border-stroke bg-whiten py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-black-4 dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                      <option value="pria">Pria</option>
                      <option value="wanita">Wanita</option>
                    </select>
                  </div>
                </div>

                {/* tanggal lahir */}
                <div className="mb-5">
                  <div className="w-full">
                    <label
                      className="mb-2.5 block text-black dark:text-white"
                      htmlFor="tanggal_lahir"
                    >
                      Tanggal Lahir
                    </label>
                    <input
                      type="date"
                      id="tanggal_lahir"
                      name="tanggal_lahir"
                      value={inputValue.tanggal_lahir.toString()}
                      onChange={handleInput}
                      placeholder="Tanggal Lahir"
                      className="w-full text-black-5 rounded border-2 border-stroke bg-whiten py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-black-4 dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      required
                    />
                    {error && <p className="text-danger">{error}</p>}
                  </div>
                </div>

                {/* telepon */}
                <div className="mb-5">
                  <div className="w-full">
                    <label
                      className="mb-2.5 block text-black dark:text-white"
                      htmlFor="telepon"
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
                      htmlFor="name"
                    >
                      Spesialisasi
                    </label>
                    <input
                      type="text"
                      id="spesialisasi"
                      name="spesialisasi"
                      value={inputValue.spesialisasi}
                      onChange={handleInput}
                      placeholder="Spesialisasi"
                      className="w-full text-black-5 rounded border-2 border-stroke bg-whiten py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-black-4 dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      required
                    />
                    {error && <p className="text-danger">{error}</p>}
                  </div>
                </div>

                {/* status lisensi */}
                <div className="mb-5">
                  <div className="w-full">
                    <label
                      className="mb-2.5 block text-black dark:text-white"
                      htmlFor="status_lisensi"
                    >
                      Status Lisensi
                    </label>
                    <select
                      id="status_lisensi"
                      name="status_lisensi"
                      value={selectedStatusLisensi}
                      onChange={handleStatusLisensiSelect}
                      className="w-full text-black-5 rounded border-2 border-stroke bg-whiten py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-black-4 dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="suspended">Suspended</option>
                      <option value="revoked">Revoked</option>
                    </select>
                  </div>
                </div>

                {/* tanggal lisensi */}
                <div className="mb-5">
                  <div className="w-full">
                    <label
                      className="mb-2.5 block text-black dark:text-white"
                      htmlFor="tanggal_lisensi"
                    >
                      Tanggal Lisensi
                    </label>
                    <input
                      type="date"
                      id="tanggal_lisensi"
                      name="tanggal_lisensi"
                      value={inputValue.tanggal_lisensi.toString()}
                      onChange={handleInput}
                      placeholder="Tanggal Lisensi"
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
                      Nama Lisensi
                    </label>
                    <input
                      type="text"
                      id="nama_lisensi"
                      name="nama_lisensi"
                      value={inputValue.nama_lisensi}
                      onChange={handleInput}
                      placeholder="Nama Lisensi"
                      className="w-full text-black-5 rounded border-2 border-stroke bg-whiten py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-black-4 dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      required
                    />
                    {error && <p className="text-danger">{error}</p>}
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

export default FormCreateDokter;

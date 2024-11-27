import { useState, ChangeEvent } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Breadcrumb from '../../../components/Breadcrumb';
import { Petugas } from '../../../models/petugas.model';

const FormCreatePetugas = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<Petugas>({
    nama_petugas: '',
    email: '',
    password: '',
    telepon: '',
  });
  const [selectedRole, setSelectedRole] = useState<string>('');

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleRoleSelected = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedRole(e.target.value);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputValue.nama_petugas === '') {
      return setError('Nama Petugas is required.');
    } else if (inputValue.email === '') {
      return setError('Email is required.');
    } else if (inputValue.password === '') {
      return setError('Password is required.');
    } else if (inputValue.telepon === '') {
      return setError('Phone is required.');
    }

    const data = {
      ...inputValue,
      role: selectedRole,
    }

    console.log("data: ", data);

    try {
      const response = await axios.post(
        'http://localhost:3000/api/petugas/create',
        data
      );

      if (response.status === 201) {
        setError(null);
        setInputValue({
          nama_petugas: '',
          email: '',
          password: '',
          telepon: '',
          role: '',
        });
        return navigate('/admin/petugas-management');
      } else {
        setError('An error occurred while creating the petugas.');
      }
    } catch (error) {
      setError('An error occurred while creating the petugas.');
    }
  };

  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Form Create Petugas" />

        <div className="flex justify-center items-center">
          <div className="w-1/2 2xsm:w-3/4 justify-self-center justify-center justify-items-center content-center items-center self-center rounded-sm border border-stroke bg-white shadow-card dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Form Create Petugas
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
                      Nama Petugas
                    </label>
                    <input
                      type="text"
                      id="nama_petugas"
                      name="nama_petugas"
                      value={inputValue.nama_petugas}
                      onChange={handleInput}
                      placeholder="Name"
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
                      Telepon
                    </label>
                    <input
                      type="text"
                      id="telepon"
                      name="telepon"
                      value={inputValue.telepon}
                      onChange={handleInput}
                      placeholder="No Telepon"
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
                      Role
                    </label>
                    <select
                      name="role"
                      id="role"
                      value={inputValue.role}
                      onChange={handleRoleSelected}
                      className="w-full text-black-5 rounded border-2 border-stroke bg-whiten py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-black-4 dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      required
                    >
                      <option value="">Select Role</option>
                      <option value="lab">Lab</option>
                      <option value="radiologi">Radiologi</option>
                      <option value="lainnya">Lainnya</option>
                    </select>
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

export default FormCreatePetugas;

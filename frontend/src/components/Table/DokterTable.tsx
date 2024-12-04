import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';

import Loader from '../../common/Loader';
import { Dokter } from '../../models/dokter.model';

const DokterTable = () => {
  const [data, setData] = useState<Dokter[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 5;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data.length / itemsPerPage);
  let currentPage = itemOffset / itemsPerPage;

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  useEffect(() => {
    const fetchDokter = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/dokter',
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          setData(response.data.payload);
        }
      } catch (error) {
        console.error('Error fetching dokter:', error);
      }
    };

    fetchDokter();
  }, []);

  // Invoke when user click to request another page.
  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
    currentPage = event.selected;
  };

  return (
    <div className=" rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <form>
        <div className="flex flex-auto mb-9 mt-2 items-center">
          <h3 className="text-2xl font-bold text-black dark:text-white mr-auto">
            Data Table
          </h3>
        </div>

        {/* To add table height */}
        <div className="max-w-full overflow-x-auto pb-5">
          {loading ? (
            <Loader />
          ) : (
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[20px] py-4 px-4 xl:px-8 xl:py-6">
                    <h5 className="text-sm font-medium uppercase xsm:text-base">
                      No
                    </h5>
                  </th>
                  <th className="min-w-[220px] py-4 px-4 xl:px-8 xl:py-6">
                    <h5 className="text-sm font-medium uppercase xsm:text-base">
                      Name
                    </h5>
                  </th>
                  <th className="min-w-[220px] py-4 px-4 xl:px-8 xl:py-6">
                    <h5 className="text-sm font-medium uppercase xsm:text-base">
                      Email
                    </h5>
                  </th>
                  <th className="min-w-[150px] py-4 px-4 xl:px-8 xl:py-6">
                    <h5 className="text-sm font-medium uppercase xsm:text-base">
                      Phone
                    </h5>
                  </th>
                  <th className="py-4 px-4 xl:px-8 xl:py-6">
                    <h5 className="text-sm font-medium uppercase xsm:text-base">
                      Action
                    </h5>
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((items: Dokter, id: number) => (
                  <tr key={id}>
                    <td className="border-b justify-center items-center border-[#eee] py-5 px-4 pl-5 dark:border-strokedark xl:px-8 xl:py-6 xl:pl-10">
                      <p className="text-black dark:text-white">
                        {currentPage * itemsPerPage + id + 1}
                      </p>
                    </td>
                    <td className="max-w-[80px] border-b justify-center items-center border-[#eee] py-5 px-4 pl-5 dark:border-strokedark xl:px-8 xl:py-6 xl:pl-10">
                      <p className="text-black dark:text-white">
                        {items.nama_dokter}
                      </p>
                    </td>
                    <td className="max-w-[200px]  border-b justify-center items-center border-[#eee] py-5 px-4 pl-5 dark:border-strokedark xl:px-8 xl:py-6 xl:pl-10">
                      <p className="overflow-ellipsis overflow-hidden text-black dark:text-white">
                        {items.email}
                      </p>
                    </td>
                    <td className="max-w-[200px]  border-b justify-center items-center border-[#eee] py-5 px-4 pl-5 dark:border-strokedark xl:px-8 xl:py-6 xl:pl-10">
                      <p className="overflow-ellipsis overflow-hidden text-black dark:text-white">
                        {items.telepon}
                      </p>
                    </td>
                    <td className="border-b justify-center items-center border-[#eee] py-5 px-4 pl-5 dark:border-strokedark xl:px-8 xl:py-6 xl:pl-10">
                      <div className="flex items-center space-x-3.5">
                        <button className="hover:text-primary transition">
                          <svg
                            className="fill-current"
                            width="18"
                            height="18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 576 512"
                          >
                            <path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" />
                          </svg>
                        </button>

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          containerClassName="inline-flex -space-x-px text-base h-10 my-5"
          pageLinkClassName="flex items-center justify-center px-4 h-10 ms-0 leading-tight border border-e-0 border-stroke transition hover:bg-primary hover:text-white dark:border-bodydark2 dark:hover:bg-primary dark:hover:text-white"
          previousLinkClassName="flex items-center justify-center px-4 h-10 ms-0 leading-tight border border-e-0 border-stroke transition rounded-s-lg hover:bg-primary hover:text-white dark:border-bodydark2 dark:hover:bg-primary dark:hover:text-white"
          nextLinkClassName="flex items-center justify-center px-4 h-10 leading-tight border border-stroke transition rounded-e-lg hover:bg-primary hover:text-white dark:border-bodydark2 dark:hover:bg-primary dark:hover:text-white"
          activeClassName="text-white border-green bg-primary dark:bg-primary dark:text-white"
        />
      </form>
    </div>
  );
};

export default DokterTable;

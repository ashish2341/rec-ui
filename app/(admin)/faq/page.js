"use client";
import Spinner from "@/components/common/loading";
import Pagination from "@/components/common/pagination";
import Popup from "@/components/common/popup";
import useFetch from "@/customHooks/useFetch";
import { API_BASE_URL } from "@/utils/constants";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { GetFaqApi } from "@/api-functions/faq/getFaq";
import { DeleteFaqApi } from "@/api-functions/faq/deleteFaq";
import CommonLoader from "@/components/common/commonLoader/commonLoader";
import SearchInput from "@/components/admin/debounceSearchInput";

export default function Faq() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [listData, setListData] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [page, setPage] = useState(1);
  const [searchData, setSearchData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAllFaq();
  }, [page, searchData]);

  const getAllFaq = async () => {
    setIsLoading(true);
    let faq = await GetFaqApi(page, searchData);
    if (faq?.resData?.success == true) {
      setListData(faq?.resData);
      setIsLoading(false);
      return false;
    } else {
      toast.error(faq.errMessage);
      setIsLoading(false);
      return false;
    }
  };
  const searchInputChange = (e) => {
    setSearchData(e);
  };
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  const handleDelete = async () => {
    // Perform delete operation
    let res = await DeleteFaqApi(deleteId);
    if (res?.resData?.success == true) {
      getAllFaq();
      setDeleteId("");
      setIsPopupOpen(false);
      toast.success(res?.resData?.message);
      return false;
    } else {
      toast.error(res?.errMessage);
      return false;
    }
  };

  const handleCancel = () => {
    setDeleteId("");
    setIsPopupOpen(false);
  };
  const deleteFaqModal = async (id) => {
    setDeleteId(id);
    setIsPopupOpen(true);
  };
  return (
    <section>
      {isLoading && <CommonLoader />}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <h1 className="text-2xl text-black-600 underline mb-3 font-bold">
          FAQ
        </h1>
        <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
          <div>
            <Link href={"/faq/addFaq"}>
              {" "}
              <button
                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                type="button"
              >
                + Add FAQ
              </button>
            </Link>
          </div>
        
          <div>
            <SearchInput
             setSearchData={searchInputChange} 
             />
             </div>
           
        </div>
        {listData ? (
          listData?.data?.length > 0 ? (
            <div>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Question
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Answer
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {listData?.data?.map((item, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item.Subject}
                      </td>
                      <td className="px-6 py-4">{item.Answer}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Link
                            href={`/faq/${item._id}`}
                             className="font-bold text-lg text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            <i className="bi bi-pencil-square"></i>
                          </Link>
                          {/* <Link
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      <i className="bi bi-eye-fill"></i>
                    </Link> */}
                          <Link
                            href="#"
                            className="font-medium text-lg text-red-600 dark:text-red-500 hover:underline"
                          >
                            <i
                              onClick={() => deleteFaqModal(item._id)}
                              className="bi bi-trash-fill"
                            ></i>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                data={listData}
                pageNo={handlePageChange}
                pageVal={page}
              />
            </div>
          ) : (
            <h1 className={`bigNotFound`}>No Data Found</h1>
          )
        ) : null}
      </div>

      <Popup
        isOpen={isPopupOpen}
        title="Are you sure you want to delete this FAQ ?"
        confirmLabel="Yes, I'm sure"
        cancelLabel="No, cancel"
        onConfirm={handleDelete}
        onCancel={handleCancel}
      />
    </section>
  );
}

"use client";
import { deleteAminity } from "@/api-functions/amenity/deleteAmenity";
import { getAminity } from "@/api-functions/amenity/getAmenity";
import Spinner from "@/components/common/loading";
import Pagination from "@/components/common/pagination";
import Popup from "@/components/common/popup";
import useFetch from "@/customHooks/useFetch";
import { API_BASE_URL } from "@/utils/constants";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function Amenity() {
  // const { data: listData, loading, error } = useFetch(`${API_BASE_URL}/aminity/allAminity?page=1&pageSize=10`);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [listData, setListData] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [page, setPage] = useState(1);
  const [searchData, setSearchData] = useState("");

  useEffect(() => {
    getAllAmenity();
  }, [page, searchData]);
  const getAllAmenity = async () => {
    let amenities = await getAminity(page, searchData);
    if (amenities?.resData?.success == true) {
      setListData(amenities?.resData);
      toast.success(amenities?.resData?.message);
      return false;
    } else {
      toast.error(amenities?.errMessage);
      return false;
    }
  };
  const handleDelete = async () => {
    // Perform delete operation
    let res = await deleteAminity(deleteId);
    if (res?.resData?.success == true) {
      getAllAmenity();
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
  const deleteAmenity = async (id) => {
    setDeleteId(id);
    setIsPopupOpen(true);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  const searchInputChange = (e) => {
    setSearchData(e.target.value);
  };
  return (
    <section>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-3">
        <h1 className="text-2xl text-black-600 underline mb-3 font-bold">
          Amenity
        </h1>
        <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
          <Link href="/amenity/addAmenity">
            <div>
              <button
                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                type="button"
              >
                + Add Amenity
              </button>
            </div>
          </Link>
          {listData?.data?.length > 0 ? (
            <div className="relative">
              <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for users"
                onChange={searchInputChange}
              />
            </div>
          ) : null}
        </div>
        {listData ? (
          listData?.data?.length > 0 ? (
            <div>
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Amenity
                    </th>
                    <th scope="col" className="px-6 py-3">
                      IsEnabled
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Icon
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
                        {item.Aminity}
                      </td>
                      <td className="px-6 py-4 text-blue-600 dark:text-blue-500">
                        <i
                          className={` ${
                            item.IsEnabled
                              ? "bi bi-hand-thumbs-up-fill text-green-600	"
                              : "bi bi-hand-thumbs-down-fill text-red-500"
                          } `}
                          style={{ fontSize: "24px" }}
                        ></i>
                      </td>
                      <td className="px-6 py-4">
                        {" "}
                        <img
                          className="imageCircle"
                          src={item.Icon}
                          width={100}
                          height={100}
                        />
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Link
                            href={`/amenity/${item._id}`}
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            <i className="bi bi-pencil-square"></i>
                          </Link>
                          {/* <i className="bi bi-eye-fill"></i> */}
                          <i
                            onClick={() => deleteAmenity(item._id)}
                            className="bi bi-trash-fill"
                          ></i>
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
        title="Are you sure you want to delete this amenity?"
        confirmLabel="Yes, I'm sure"
        cancelLabel="No, cancel"
        onConfirm={handleDelete}
        onCancel={handleCancel}
      />
    </section>
  );
}

"use client";

import Link from "next/link";
import Spinner from "@/components/common/loading";
import Pagination from "@/components/common/pagination";
import Popup from "@/components/common/popup";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { GetPropertyApi } from "@/api-functions/property/getProperty";
import { DeleteProperty } from "@/api-functions/property/deleteProperty";
import Cookies from "js-cookie";
import { GetPropertyBybuilderApi } from "@/api-functions/property/getPropertyBybuilder";
import styles from "./builder.module.css"
import LoadingSideImg from "@/components/common/sideImgLoader";
import PropertyListCard from "@/components/common/propertyListCard/listCard";
export default function Property() {
  const roleData = Cookies.get("roles") ?? "";
  const name = Cookies.get("name");
  const roles = roleData && JSON.parse(roleData);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [listData, setListData] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [page, setPage] = useState(1);
  const [searchData, setSearchData] = useState("");
  console.log("listData", listData);

  useEffect(() => {
    if (roles.includes("Admin")) {
      console.log("admin function called");
      getAllProperties();
    } else {
      console.log("buillder function called");
      getAllPropertiesByBuilder();
    }
    // getAllProperties();
  }, [page, searchData]);
  const getAllProperties = async () => {
    let properties = await GetPropertyApi(page, searchData);
    if (properties?.resData?.success == true) {
      setListData(properties?.resData);
      toast.success(properties?.resData?.message);
      return false;
    } else {
      toast.error(properties.errMessage);
      return false;
    }
  };
  const getAllPropertiesByBuilder = async () => {
    let properties = await GetPropertyBybuilderApi(page, searchData);
    if (properties?.resData?.success == true) {
      setListData(properties?.resData);
      toast.success(properties?.resData?.message);
      return false;
    } else {
      toast.error(properties.errMessage);
      return false;
    }
  };
  const searchInputChange = (e) => {
    setSearchData(e.target.value);
  };
  const handlePageChange = (newPage) => {
    console.log(newPage);
    setPage(newPage);
  };
  const handleDelete = async () => {
    // Perform delete operation
    let res = await DeleteProperty(deleteId);
    console.log(" property delete res", res);
    if (res?.resData?.success == true) {
      if (roles.includes("Admin")) {
        console.log("admin function called");
        getAllProperties();
      } else {
        console.log("buillder function called");
        getAllPropertiesByBuilder();
      }
      setDeleteId("");
      setIsPopupOpen(false);
      toast.success(res?.resData?.message);
      return false;
    } else {
      toast.error(res.errMessage);
      return false;
    }
  };

  const handleCancel = () => {
    setDeleteId("");
    setIsPopupOpen(false);
  };
  const deletePropertyModal = async (id) => {
    setDeleteId(id);
    setIsPopupOpen(true);
  };
  return (
    <section>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <h1 className="text-2xl text-black-600 underline mb-3 font-bold">
          Property
        </h1>
        <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
          <div>
            <Link href={"/property/addProperty"}>
              {" "}
              <button
                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                type="button"
              >
                + Add Property
              </button>
            </Link>
          </div>
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
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
              placeholder="Search for property"
              onChange={searchInputChange}
            />
          </div>
        </div>
        {roles.includes("Admin") && ( <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Property Title
              </th>
              <th scope="col" className="px-6 py-3">
                Property For
              </th>
              <th scope="col" className="px-6 py-3">
                Facing
              </th>
              <th scope="col" className="px-6 py-3">
                Total Price
              </th>
              {roles.includes("Admin") && (
                <th scope="col" className="px-6 py-3">
                  Is Enabled
                </th>
              )}
              {roles.includes("Admin") && (
                <th scope="col" className="px-6 py-3">
                  Is Featured
                </th>
              )}
              {roles.includes("Developer") && (
                <th scope="col" className="px-6 py-3">
                  Review Status
                </th>
              )}
              {roles.includes("Admin") && (
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {listData?.data?.map((item, index) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.Title}
                </th>
                <td className="px-6 py-4">{item?.ProeprtyFor}</td>
                <td className="px-6 py-4">{item?.Facing[0]?.Facing}</td>
                <td className="px-6 py-4">{item?.TotalPrice?.DisplayValue}</td>
                {roles.includes("Admin") && (
                  <td className="px-6 py-4 text-blue-600 dark:text-blue-500">
                    <i
                      className={` ${
                        item?.IsEnabled
                          ? "bi bi-hand-thumbs-up-fill text-green-600	"
                          : "bi bi-hand-thumbs-down-fill text-red-500"
                      } `}
                      style={{ fontSize: "24px" }}
                    ></i>
                  </td>
                )}
                {roles.includes("Admin") && (
                  <td className="px-6 py-4 text-blue-600 dark:text-blue-500">
                    <i
                      className={` ${
                        item.IsFeatured
                          ? "bi bi-hand-thumbs-up-fill text-green-600	"
                          : "bi bi-hand-thumbs-down-fill text-red-500"
                      } `}
                      style={{ fontSize: "24px" }}
                    ></i>
                  </td>
                )}
                {roles.includes("Developer") && (
                  <td className="px-6 py-4 text-black-600 dark:text-black-500 ">
                    {item?.IsEnabled ? (
                      <span>Completed</span>
                    ) : (
                      <span>Pending</span>
                    )}
                  </td>
                )}
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    {roles.includes("Admin") && (
                      <Link
                        href={`/property/${item._id}`}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        <i className="bi bi-pencil-square"></i>
                      </Link>
                    )}

                    {/* <Link
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      <i className="bi bi-eye-fill"></i>
                    </Link> */}
                    {roles.includes("Admin") && (
                      <Link
                        href="#"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        <i
                          onClick={() => deletePropertyModal(item._id)}
                          className="bi bi-trash-fill"
                        ></i>
                      </Link>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>) }
       {roles.includes("Developer") && ( listData ? (
                listData?.data?.length > 0 ? (
                  listData?.data?.map((cardData,index) => (
                    <div key={cardData._id}>
                      <PropertyListCard item={cardData} />
                    </div>
                  ))
                ) : (
                  <h1 className={`${styles.noDataHead}`}>No Data Found</h1>
                )
              ) : (
                <div className={`mb-3 ml-3 ${styles.GeneralDetailsBox}`}>
                <LoadingSideImg />
              </div>
              ))}
      </div>
      {roles.includes("Admin") && (<Pagination data={listData} pageNo={handlePageChange} pageVal={page} />)}
      
      <Popup
        isOpen={isPopupOpen}
        title="Are you sure you want to delete this Testimonial ?"
        confirmLabel="Yes, I'm sure"
        cancelLabel="No, cancel"
        onConfirm={handleDelete}
        onCancel={handleCancel}
      />
    </section>
  );
}

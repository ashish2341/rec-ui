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
import { GetReviewPropertyApi } from "@/api-functions/property/getReviewProperties";
import CommonLoader from "@/components/common/commonLoader/commonLoader";
import SearchInput from "@/components/admin/debounceSearchInput";

export default function ReviewProperty(params) {
  const roleData = Cookies.get("roles") ?? "";
  const name = Cookies.get("name");
  const roles = roleData && JSON.parse(roleData);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [listData, setListData] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [page, setPage] = useState(1);
  const [searchData, setSearchData] = useState("");
  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {
    getAllReviewProperties();
  }, [page, searchData, params]);
  const getAllReviewProperties = async () => {
    setIsLoading(true)
    let properties = await GetReviewPropertyApi(searchData);
    if (properties?.resData?.success == true) {
      setListData(properties?.resData);
      toast.success(properties?.resData?.message);
      setIsLoading(false)
      return false;
    } else {
      toast.error(properties.errMessage);
      setIsLoading(false)
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
    setIsLoading(true)
    let res = await DeleteProperty(deleteId);

    if (res?.resData?.success == true) {
      setIsPopupOpen(false);
      toast.success(res?.resData?.message);
      setIsLoading(false)
      getAllReviewProperties;
      setDeleteId("");
      return false;
    } else {
      toast.error(res.errMessage);
      setIsLoading(false)
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
      {isLoading && <CommonLoader />}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <h1 className="text-2xl text-black-600 underline mb-3 font-bold">
          Review Property
        </h1>

        <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-end mr-2 pb-4">
          <div>
            <SearchInput
              setSearchData={searchInputChange}
            />
          </div>
        </div>


        {listData ? (
          listData?.data?.length > 0 ? (
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Property Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Property SubType
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Facing
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total Price
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Is Enabled
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Is Featured
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Property Score
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {listData?.data?.map((item, index) => (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.Title}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.PropertySubtype.Name}
                    </td>
                    <td className="px-6 py-4">{item?.Facing[0]?.Facing}</td>
                    <td className="px-6 py-4">
                      {item?.TotalPrice?.DisplayValue}
                    </td>

                    <td className="px-6 py-4 text-blue-600 dark:text-blue-500">
                      <i
                        className={` ${item?.IsEnabled
                            ? "bi bi-hand-thumbs-up-fill text-green-600	"
                            : "bi bi-hand-thumbs-down-fill text-red-500"
                          } `}
                        style={{ fontSize: "24px" }}
                      ></i>
                    </td>

                    <td className="px-6 py-4 text-blue-600 dark:text-blue-500">
                      <i
                        className={` ${item.IsFeatured
                            ? "bi bi-hand-thumbs-up-fill text-green-600	"
                            : "bi bi-hand-thumbs-down-fill text-red-500"
                          } `}
                        style={{ fontSize: "24px" }}
                      ></i>
                    </td>
                    <td className="px-6 py-4">
                      {item?.CompletePercentage ? (
                        <span>{item?.CompletePercentage} %</span>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {roles.includes("Admin") && (
                          <Link
                            href={`/reviewProperty/${item._id}`}
                            className="font-bold text-lg text-blue-600 dark:text-blue-500 hover:underline"
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
                            className="font-medium text-lg text-red-600 dark:text-red-500 hover:underline"
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
            </table>
          ) : (
            <h1 className={`bigNotFound`}>No Data Found</h1>
          )
        ) : null}
      </div>
      {listData?.data?.length > 0 ? (
        <Pagination data={listData} pageNo={handlePageChange} pageVal={page} />
      ) : null}

      <Popup
        isOpen={isPopupOpen}
        title="Are you sure you want to delete this Property ?"
        confirmLabel="Yes, I'm sure"
        cancelLabel="No, cancel"
        onConfirm={handleDelete}
        onCancel={handleCancel}
      />
    </section>
  );
}

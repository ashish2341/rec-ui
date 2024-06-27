"use client"

import Link from "next/link";
import Spinner from "@/components/common/loading";
import Pagination from "@/components/common/pagination";
import Popup from "@/components/common/popup";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { GetProjectyApi } from "@/api-functions/project/getProject";
import { DeleteProjectApi } from "@/api-functions/project/deleteProject";
import SearchInput from "@/components/admin/debounceSearchInput";

export default function Property() {

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [listData, setListData] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [page, setPage] = useState(1);
  const [searchData,setSearchData]=useState("")
  console.log("listData",listData)
  useEffect(() => {
    getAllProjects();
  }, [page,searchData]);
  const getAllProjects = async () => {
    let projects = await GetProjectyApi(page,searchData);
    if (projects?.resData?.success == true) {
      setListData(projects?.resData);
      toast.success(projects?.resData?.message);
      return false;
    } else {
      toast.error(projects.errMessage);
      return false;
    }
  };
  const searchInputChange=(e)=>{
    setSearchData(e)
  }
  const handlePageChange = (newPage) => {
    console.log(newPage)
    setPage(newPage);
  };
  const handleDelete = async () => {
    // Perform delete operation
    let res = await DeleteProjectApi(deleteId);
    console.log(" property delete res", res);
    if (res?.resData?.success == true) {
      getAllProjects();
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
       Project 
      </h1>
        <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
          <div>
            <Link href={"/project/addProject"}>
              {" "}
              <button
                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                type="button"
              >
                + Add Project
              </button>
            </Link>
          </div>
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div>
            <SearchInput
             setSearchData={searchInputChange} 
             />
             </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Project name
              </th>
              <th scope="col" className="px-6 py-3">
                Project Status
              </th>
              <th scope="col" className="px-6 py-3">
                Facing
              </th>
              <th scope="col" className="px-6 py-3">
                Is Enabled
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
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
              <td className="px-6 py-4">{item.ProjectStatus}</td>
              <td className="px-6 py-4">{item.Facing[0]}</td>
             
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
                <div className="flex items-center space-x-2">
                  <Link
                    href={`/project/${item._id}`}
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    <i className="bi bi-pencil-square"></i>
                  </Link>
                  {/* <Link href="#"
                   className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    <i className="bi bi-eye-fill"></i>
                  </Link> */}
                  <Link href="#"
                   className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    <i 
                    onClick={() => deletePropertyModal(item._id)}
                    className="bi bi-trash-fill"></i>
                  </Link>
                </div>
              </td>
              </tr>))}
          
          </tbody>
        </table>
        
      </div>
      <Pagination 
         data={listData}
         pageNo={handlePageChange}
         pageVal={page}
         />
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

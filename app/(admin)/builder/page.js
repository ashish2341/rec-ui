"use client"
import Link from "next/link";
import Pagination from "@/components/common/pagination";
import Popup from "@/components/common/popup";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { GetBuilderApi } from "@/api-functions/builder/getBuilder";
import { DeleteBuilderApi } from "@/api-functions/builder/deleteBuilder";
import { imgApiUrl } from "@/utils/constants";
import CommonLoader from "@/components/common/commonLoader/commonLoader";
import QRCode from "qrcode";
import { jsPDF } from "jspdf";


export default function Builder(params) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [listData, setListData] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [page, setPage] = useState(1);
  const [searchData, setSearchData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const todayBuilder = params.searchParams.todayBuilder;

  useEffect(() => {
    getAllBuilder();
  }, [page, searchData, params]);

  const searchInputChange = (e) => {
    setSearchData(e.target.value);
  };
  
  const getAllBuilder = async () => {
    setIsLoading(true);
    let builder = await GetBuilderApi(page, searchData, todayBuilder);
    if (builder?.resData?.success == true) {
      setListData(builder?.resData);
      setIsLoading(false);
      return false;
    } else {
      toast.error(builder?.errMessage);
      setIsLoading(false);
      return false;
    }
  };
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  const handleDelete = async () => {
    // Perform delete operation
    let res = await DeleteBuilderApi(deleteId);
    if (res?.resData?.success == true) {
      getAllBuilder();
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
  const deleteBuilderModal = async (id) => {
    setDeleteId(id);
    setIsPopupOpen(true);

  };

  console.log(listData);
  const generatePDF = async () => {
    const doc = new jsPDF();
    let yOffset = 20; // Initial Y offset
    const qrSize = 100; // Size of the QR code
    const pageHeight = doc.internal.pageSize.height; // Page height
    const xOffset = (doc.internal.pageSize.width - qrSize) / 2; // Center alignment for X
  
    for (let i = 0; i < listData?.data?.length; i++) {
      const id = listData.data[i]._id;
      const name = listData.data[i].Name;
      const url = "http://recadmin-001-site2.etempurl.com/builderFE/" + id;

      // Create a canvas element to draw the QR code
      const qrCanvas = document.createElement("canvas");
      await QRCode.toCanvas(qrCanvas, url, { width: qrSize });
  
      // Convert canvas to JPEG image (base64 format)
      const qrImage = qrCanvas.toDataURL("image/png", 1.0);
  
      // Add the QR code image to the PDF document
      doc.addImage(qrImage, "JPEG", xOffset, yOffset, qrSize, qrSize);
  
      // Add the URL text below the QR code (centered)
      doc.text(name, doc.internal.pageSize.width / 2, yOffset + qrSize + 10, { align: "center" });
  
      // Increase Y offset for the next QR code and text
      yOffset += qrSize + 40;
  
      // Check if there's enough space for the next QR code
      if (yOffset + qrSize + 20 > pageHeight) {
        doc.addPage();
        yOffset = 20; // Reset Y offset for new page
      }
    }
  
    // Save the PDF document with all QR codes
    doc.save("coupons.pdf");
  };
  

  return (
    <section>
      {isLoading && <CommonLoader />}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <h1 className="text-2xl text-black-600 underline mb-3 font-bold">
       Builder
      </h1>
        <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
          <div>
            <Link href={"/builder/addBuilder"}>
              {" "}
              <button
                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                type="button"
              >
                + Add Builder
              </button>
            </Link>
          </div>
          <div className="flex justify-between">
          <div>
          <button
                className="py-2.5 ml-2 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                type="button"
                onClick={generatePDF}
              >
                Generate QRCode
              </button>
          </div>
            <div className="relative inset-y-0 left-8 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
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
              className="block p-1 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search builder"
              onChange={searchInputChange}
            />
          </div>
          
         
        </div>
        {(listData ? (
          listData?.data?.length > 0 ? (
        <div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
               Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              {/* <th scope="col" className="px-6 py-3">
              Establish Date
              </th> */}
              <th scope="col" className="px-6 py-3">
               Logo
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
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                 {item.Name}
                </td>
                <td className="px-6 py-4">{item?.EmailId}</td>
                {/* <td className="px-6 py-4">{item?.EstablishDate?.slice(0,10)}</td> */}
                <td className="px-6 py-4 text-blue-600 dark:text-blue-500">
                  {item.logo ? ( <img
                    // className="imageCircle"
                   
                    src={`${imgApiUrl}/${item.logo}`}
                    width={100}
                    height={100}
                    
                  />):(<p className="text-sm text-gray-500 font-bold">No Logo Upload</p>)}
                 
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Link
                      href={`/builder/${item._id}`}
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
                       onClick={() => deleteBuilderModal(item._id)} 
                      className="bi bi-trash-fill"></i>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination data={listData} pageNo={handlePageChange} pageVal={page} />
        </div>
        ) : (
          <h1 className={`bigNotFound`}>No Data Found</h1>
        )
      ) : null)}
      <Popup
        isOpen={isPopupOpen}
        title="Are you sure you want to delete this Builder ?"
        confirmLabel="Yes, I'm sure"
        cancelLabel="No, cancel"
        onConfirm={handleDelete}
        onCancel={handleCancel}
      />
      </div>
    </section>
  );
}

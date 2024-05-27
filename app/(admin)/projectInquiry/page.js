"use client";
import Spinner from "@/components/common/loading";
import Pagination from "@/components/common/pagination";
import Popup from "@/components/common/popup";
import useFetch from "@/customHooks/useFetch";
import { API_BASE_URL } from "@/utils/constants";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ExportToExcel } from "@/components/common/exportToCsv";
import { GetEnquiryApi } from "@/api-functions/enquiry/getEnquiry";
import { DeletProjectEnquiryApi } from "@/api-functions/enquiry/deleteEnquiry";
import { GetEnquiryByBuilderApi } from "@/api-functions/enquiry/getEnquiryByBuilder";
import Cookies from "js-cookie";
import "flowbite/dist/flowbite.min.css";
import SendInquiryModal from "@/components/common/sendInquiryModal/sendInquiryModal";
export default function ProjectInquiry() {
  const roleData = Cookies.get("roles") ?? "";
  const name = Cookies.get("name");
  const roles = roleData && JSON.parse(roleData);

  const inquiryItem = [
    "Project",
    "Property",
    "Astrology",
    "ContactUs",
    "Builder",
  ];
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupOpenforInquiry, setIsPopupOpenforInquiry] = useState(false);
  const [listData, setListData] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [page, setPage] = useState(1);
  const [searchData, setSearchData] = useState("");
  const [filterData, setFilterData] = useState("");
  const [typeOnButton, setTypeOnButton] = useState("Property");
  const [AllowedUserList, setAllowedUserList] = useState([]);
  const [isSubmitClicked, setIsSubmitClicked] = useState(0);
  const [inquiryId, setInquiryId] = useState("");
  useEffect(() => {
    initFlowbite(); // Call initCarousels() when component mounts
  }, []);
  useEffect(() => {
    if (roles.includes("Admin")) {
      console.log("admin function called");
      getAllEnquiry(typeOnButton);
    } else {
      console.log("buillder function called");
      getAllEnquiryByBuilder(filterData);
    }
  }, [page, searchData, isSubmitClicked]);

  const getAllEnquiry = async (filterType) => {
    console.log("filterType", filterType);
    let enquiries = await GetEnquiryApi(page, searchData, filterType);
    if (enquiries?.resData?.success == true) {
      setListData(enquiries?.resData);
      toast.success(enquiries?.resData?.message);
      return false;
    } else {
      toast.error(enquiries.errMessage);
      return false;
    }
  };
  const getAllEnquiryByBuilder = async (filterType) => {
    console.log("filterType", filterType);
    let enquiries = await GetEnquiryByBuilderApi(page, searchData, filterType);
    if (enquiries?.resData?.success == true) {
      setListData(enquiries?.resData);
      toast.success(enquiries?.resData?.message);
      return false;
    } else {
      toast.error(enquiries.errMessage);
      return false;
    }
  };
  const searchInputChange = (e) => {
    setSearchData(e.target.value);
  };
  const handleDelete = async () => {
    // Perform delete operation
    let res = await DeletProjectEnquiryApi(deleteId);
    console.log("res", res);
    if (res?.resData?.success == true) {
      if (roles.includes("Admin")) {
        console.log("admin function called");
        getAllEnquiry();
      } else {
        console.log("buillder function called");
        getAllEnquiryByBuilder();
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
  const deleteInquiryModel = async (id) => {
    setDeleteId(id);
    setIsPopupOpen(true);
  };

  const handlePageChange = (newPage) => {
    console.log(newPage);
    setPage(newPage);
  };

  const enquiryType = (filterType) => {
    setTypeOnButton(filterType);
    console.log("enquiryType filterType", filterType);
    getAllEnquiry(filterType);
  };
  function maskEmail(email) {
    if (!email) return "";
    console.log("email",email)
    const [localPart, domain] = email.split("@");
    console.log("localPart",localPart)
    console.log("domain",domain)
    const visiblePart = localPart.length!=1 ? localPart.slice(0, 2) :localPart.slice(0, 1); // Get the first 2 characters
    console.log("visiblePart",visiblePart)
    const maskedLocalPart = localPart.length!=1 ?"*".repeat(localPart.length - 2) :"*".repeat(localPart.length - 1); // Mask the rest of the local part
    console.log("maskedLocalPart",maskedLocalPart)
    const maskedDomain = "*".repeat(domain.length); // Mask the entire domain part
    console.log("maskedDomain",maskedDomain)
    return `${visiblePart}${maskedLocalPart}@${maskedDomain}`;
  }
  function maskNumber(number) {
    if (!number) return "";
    const visiblePart = number.slice(0, 2); // Get the first 2 characters
    const maskedPart = "*".repeat(number.length - 2); // Mask the rest
    return `${visiblePart}${maskedPart}`;
  }

  const openInquiryModal = (AllowedUserListArray, id) => {
    setIsPopupOpenforInquiry(true);
    setAllowedUserList(AllowedUserListArray);
    setInquiryId(id);
  };
  const handleInquiryModalCancel = () => {
    setIsPopupOpenforInquiry(false);
  };

  return (
    <section>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-3">
        <h1 className="text-2xl text-black-600 underline mb-3 font-bold">
          Project Inquiry
        </h1>
        {/* <div id="date-rangepicker" className="flex items-center mb-5">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
              </svg>
            </div>
            <input
              name="start"
              type="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Select date start"
            />
          </div>
          <span className="mx-4 text-gray-500">to</span>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
              </svg>
            </div>
            <input
              name="end"
              type="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Select date end"
            />
          </div>
        </div> */}

        <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
          <div className="flex">
            {listData ? (
              <ExportToExcel
                apiData={listData.data}
                fileName={"AlertAttendanceData"}
              />
            ) : null}
            {roles.includes("Admin") && (
              <li className="me-2  list-none">
                <button
                  id="dropdownPossessionButton"
                  data-dropdown-toggle="dropdownPossession"
                  className="text-black bg-white rounded-lg border border-gray-200  hover:bg-gray-100 hover:text-blue-700 focus:ring-gray-100  focus:ring-4 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-white-600 dark:hover:bg-white-700 dark:focus:ring-white-800"
                  type="button"
                >
                  {" "}
                  {typeOnButton && typeOnButton }
                  <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                <div
                  id="dropdownPossession"
                  className="z-10 hidden bg-gray-200 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                >
                  <ul
                    className="p-2 text-sm text-gray-700 dark:text-gray-200 list-none"
                    aria-labelledby="dropdownPossessionButton"
                  >
                    {inquiryItem.map((item) => (
                      <li onClick={() => enquiryType(item)}>
                        <Link
                          href=""
                          className="block px-4 py-2 hover:bg-white hover:text-black dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            )}
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
              placeholder="Search for Inquiry"
              onChange={searchInputChange}
            />
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {/* {roles.includes("Admin") && (
                <th scope="col" className="px-6 py-3">
                  Enquiry Type
                </th>
              )} */}
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Mobile No.
              </th>
              {typeOnButton != "Project" &&
              typeOnButton != "ContactUs" &&
              typeOnButton != "Astrology" ? (
                <th scope="col" className="px-6 py-3">
                  Property Name
                </th>
              ) : null}
              {typeOnButton != "Project" &&
              typeOnButton != "ContactUs" &&
              typeOnButton != "Astrology" ? (
                <th scope="col" className="px-6 py-3">
                  Property URL
                </th>
              ) : null}
              {typeOnButton == "Project" || typeOnButton == "ContactUs" ? (
                <th scope="col" className="px-6 py-3">
                  Message
                </th>
              ) : null}

              <th scope="col" className="px-6 py-3">
                enquiry Date
              </th>

              {roles.includes("Admin") && (
                <th scope="col" className="px-6 py-3">
                  Action Taken
                </th>
              )}

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
                {/* {roles.includes("Admin") && (
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item?.EnquiryType}
                  </td>
                )} */}
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item?.Name}
                </td>
                {roles.includes("Admin") ? (
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item?.Email}
                  </td>
                ) : (
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item?.IsVisiable || !item?.DeveloperId
                      ? maskEmail(item?.Email)
                      : item?.Email}
                  </td>
                )}

                {roles.includes("Developer") ? (
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item?.IsVisiable
                      ? maskNumber(item?.MolileNumber)
                      : item?.MolileNumber}
                  </td>
                ) : (
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item?.MolileNumber}
                  </td>
                )}
                {typeOnButton != "Project" &&
                typeOnButton != "ContactUs" &&
                typeOnButton != "Astrology" ? (
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item?.PropertyId?.Titile}
                  </td>
                ) : null}
                {typeOnButton != "Project" &&
                typeOnButton != "ContactUs" &&
                typeOnButton != "Astrology" ? (
                  <Link
                    href={`/propertyDetail/${item?.PropertyId?._id}`}
                    legacyBehavior
                  >
                    <a target="_blank" rel="noopener noreferrer">
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-blue-500 whitespace-nowrap dark:text-white"
                      >
                        URL
                      </td>
                    </a>
                  </Link>
                ) : null}
                {typeOnButton == "Project" || typeOnButton == "ContactUs" ? (
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item?.Message}
                  </td>
                ) : null}

                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item?.EnquiryDate.slice(0, 10)}
                </td>
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

                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Link
                      //  href={`/amenity/${item._id}`}
                      href={""}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      <i className="bi bi-eye-fill"></i>
                    </Link>
                    {roles.includes("Admin") && (
                      <Link
                        href=""
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        <i
                          onClick={() => deleteInquiryModel(item?._id)}
                          className="bi bi-trash-fill"
                        ></i>
                      </Link>
                    )}

                    {roles.includes("Admin") && !item?.DeveloperId ? (
                      <Link
                        href=""
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        <i
                          onClick={() =>
                            openInquiryModal(item?.AllowedUser, item?._id)
                          }
                          className="bi bi-send-fill"
                        ></i>
                      </Link>
                    ) : null}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination data={listData} pageNo={handlePageChange} pageVal={page} />
      </div>

      <Popup
        isOpen={isPopupOpen}
        title="Are you sure you want to delete this amenity?"
        confirmLabel="Yes, I'm sure"
        cancelLabel="No, cancel"
        onConfirm={handleDelete}
        onCancel={handleCancel}
      />
      {isPopupOpenforInquiry && (
        <SendInquiryModal
          isOpen={isPopupOpenforInquiry}
          title="Are you sure you want to delete this Testimonial ?"
          confirmLabel="Yes, I'm sure"
          cancelLabel="No, cancel"
          onConfirm={handleDelete}
          onCancel={handleInquiryModalCancel}
          AllowedUsers={AllowedUserList}
          setIsSubmitClicked={setIsSubmitClicked}
          selectedInquiryId={inquiryId}
          setIsPopupOpenforInquiry={setIsPopupOpenforInquiry}
        />
      )}
    </section>
  );
}

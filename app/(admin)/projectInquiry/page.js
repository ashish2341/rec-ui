"use client";
import Spinner from "@/components/common/loading";
import Pagination from "@/components/common/pagination";
import Popup from "@/components/common/popup";
import useFetch from "@/customHooks/useFetch";
import { API_BASE_URL } from "@/utils/constants";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ExportToExcel } from "@/components/common/exportToCsv";
import { GetEnquiryApi } from "@/api-functions/enquiry/getEnquiry";
import { DeletProjectEnquiryApi } from "@/api-functions/enquiry/deleteEnquiry";
import { GetEnquiryByBuilderApi } from "@/api-functions/enquiry/getEnquiryByBuilder";
import Cookies from "js-cookie";
import "flowbite/dist/flowbite.min.css";
import SendInquiryModal from "@/components/common/sendInquiryModal/sendInquiryModal";
import DateRange from "@/components/common/dateRange/dateRange";
import CommonLoader from "@/components/common/commonLoader/commonLoader";
import SearchInput from "@/components/admin/debounceSearchInput";

export default function ProjectInquiry(params) {
  const roleData = Cookies.get("roles") ?? "";
  const name = Cookies.get("name");
  const loginUserId = Cookies.get("userId");
  const roles = roleData && JSON.parse(roleData);

  const inquiryItem = ["All", "Project", "Property", "Astrology", "ContactUs"];
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupOpenforInquiry, setIsPopupOpenforInquiry] = useState(false);
  const [listData, setListData] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [page, setPage] = useState(1);
  const [searchData, setSearchData] = useState("");
  const [filterData, setFilterData] = useState("");
  const typedash = params?.searchParams?.type;
  const [typeOnButton, setTypeOnButton] = useState(typedash ? typedash : "");
  const [AllowedUserList, setAllowedUserList] = useState([]);
  const [isSubmitClicked, setIsSubmitClicked] = useState(0);
  const [inquiryId, setInquiryId] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [adminExcelData, setadminExcelData] = useState([]);
  const [builderExcelData, setBuilderExcelData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsDropdownOpen(false);
    }
  };
  useEffect(() => {
    // Attach event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);
    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    initFlowbite(); // Call initCarousels() when component mounts
  }, []);
  useEffect(() => {
    if (roles.includes("Admin")) {
      getAllEnquiry(typeOnButton);
    } else {
      if (typeOnButton) {
        setTypeOnButton("");
      }
      getAllEnquiryByBuilder(typeOnButton);
    }
  }, [page, searchData, isSubmitClicked, isDeleted, params]);

  useEffect(() => {
    if (fromDate && toDate) {
      getAllEnquiry(typeOnButton);
    }
  }, [fromDate, toDate]);
  const getAllEnquiry = async (filterType) => {
    setIsLoading(true);
    const todayEnquiry = params.searchParams.todayEnquiry;
    let enquiries = await GetEnquiryApi(
      page,
      searchData,
      filterType,
      fromDate,
      toDate,
      todayEnquiry
    );
    if (enquiries?.resData?.success == true) {
      setListData(enquiries?.resData);
      setIsLoading(false);
      return false;
    } else {
      toast.error(enquiries?.errMessage);
      setIsLoading(false);
      return false;
    }
  };

  const getAllEnquiryByBuilder = async (filterType) => {
    setIsLoading(true);
    const todayEnquiry = params.searchParams.todayEnquiry;
    let enquiries = await GetEnquiryByBuilderApi(
      page,
      searchData,
      filterType,
      todayEnquiry
    );
    if (enquiries?.resData?.success == true) {
      setListData(enquiries?.resData);
      setIsLoading(false);
      return false;
    } else {
      toast.error(enquiries?.errMessage);
      setIsLoading(false);
      return false;
    }
  };
  const searchInputChange = (e) => {
    setSearchData(e);
  };
  const handleDelete = async () => {
    // Perform delete operation
    let res = await DeletProjectEnquiryApi(deleteId);
    if (res?.resData?.success == true) {
      if (roles.includes("Admin")) {
        setIsDeleted(true);
      } else {
        getAllEnquiryByBuilder();
      }
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
  const deleteInquiryModel = async (id) => {
    setDeleteId(id);
    setIsPopupOpen(true);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const enquiryType = (filterType) => {
    setTypeOnButton(filterType);
    if (filterType === "All") {
      getAllEnquiry();
    } else {
      getAllEnquiry(filterType);
    }

    setIsDropdownOpen(false);
  };
  function maskEmail(email) {
    if (!email) return "";
    const [localPart, domain] = email.split("@");
    const visiblePart =
      localPart.length != 1 ? localPart.slice(0, 2) : localPart.slice(0, 1); // Get the first 2 characters
    const maskedLocalPart =
      localPart.length != 1
        ? "*".repeat(localPart.length - 2)
        : "*".repeat(localPart.length - 1); // Mask the rest of the local part
    const maskedDomain = "*".repeat(domain.length); // Mask the entire domain part
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

  const IsInquiryVisiable = (inquiry) => {
    return inquiry?.AllowedUser?.find((item) => item?.UserId == loginUserId)
      ?.Status;
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    if (listData.data) {
      if (roles.includes("Admin")) {
        const keysToSelect = [
          "Email",
          "EnquiryDate",
          "EnquiryType",
          "Message",
          "MolileNumber",
          "Name",
        ];
        const filterCsvData = (data, keys) => {
          return data.map((item) => {
            let newItem = {};
            keys.forEach((key) => {
              if (item.hasOwnProperty(key)) {
                newItem[key] = item[key];
              }
            });

            return newItem;
          });
        };

        setadminExcelData(filterCsvData(listData.data, keysToSelect));
      } else {
        const keysToSelect = [
          "Email",
          "EnquiryDate",
          "EnquiryType",
          "Message",
          "MolileNumber",
          "Name",
        ];
        function filterCsvDataforbuilder(data, keys) {
          return data.map((item) => {
            let newItem = {};
            keys.forEach((key) => {
              if (item.hasOwnProperty(key)) {
                // Check if there's an action to be performed on this key
                if (!IsInquiryVisiable(item) && key === "MolileNumber") {
                  newItem[key] = maskNumber(item?.MolileNumber);
                } else if (!IsInquiryVisiable(item) && key === "Email") {
                  newItem[key] = maskEmail(item?.Email);
                } else {
                  newItem[key] = item[key];
                }
              }
            });

            return newItem;
          });
        }
        setBuilderExcelData(
          filterCsvDataforbuilder(listData.data, keysToSelect)
        );
      }
    }
  }, [listData]);

  return (
    <section>
      {isLoading && <CommonLoader />}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-3">
        <h1 className="text-2xl text-black-600 underline mb-3 font-bold">
          Project Enquiry
        </h1>

        {roles.includes("Admin") && (
          <DateRange
            setFromDate={setFromDate}
            setToDate={setToDate}
            startDate={fromDate}
            endDate={toDate}
          />
        )}

        <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
          <div className="flex">
            {roles.includes("Admin") ? (
              <ExportToExcel
                apiData={adminExcelData}
                fileName={"EnquiryData"}
              />
            ) : (
              <ExportToExcel
                apiData={builderExcelData}
                fileName={"EnquiryData"}
              />
            )}

            {roles.includes("Admin") && (
              <li className="me-2 list-none relative">
                {" "}
                {/* Ensure relative positioning */}
                <button
                  ref={buttonRef}
                  id="dropdownPossessionButton"
                  onClick={toggleDropdown}
                  className="text-black bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-gray-100 focus:ring-4 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-white-600 dark:hover:bg-white-700 dark:focus:ring-white-800"
                  type="button"
                >
                  {typeOnButton ? typeOnButton : "All"}
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
                  ref={dropdownRef}
                  id="dropdownPossession"
                  className={`z-10 ${
                    isDropdownOpen ? "block" : "hidden"
                  } absolute top-full mt-2 bg-white divide-y divide-white rounded-lg shadow w-44 dark:bg-white`}
                >
                  <ul
                    className="p-2 text-sm text-gray-700 dark:text-gray-200 list-none"
                    aria-labelledby="dropdownPossessionButton"
                  >
                    {inquiryItem.map((item, index) => (
                      <li key={index} onClick={() => enquiryType(item)}>
                        <Link
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-200 hover:text-black dark:hover:bg-gray-600 dark:hover:text-gray-200"
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
          <div>
            <SearchInput setSearchData={searchInputChange} />
          </div>
        </div>

        {listData ? (
          <div>
            {" "}
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  {/* {roles.includes("Admin") && (
                <th scope="col" className="px-6 py-3">
                  Enquiry Type
                </th>
              )} */}

                  <th scope="col" className="px-6 py-3">
                    Enquiry Type
                  </th>

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
                    Enquiry Date
                  </th>

                  {roles.includes("Admin") && (
                    <th scope="col" className="px-6 py-3">
                      Action Taken
                    </th>
                  )}
                  {roles.includes("Admin") && (
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  )}
                </tr>
              </thead>
              {listData?.data?.length > 0 ? (
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
                        {item?.EnquiryType}
                      </td>

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
                          {IsInquiryVisiable(item)
                            ? item?.Email
                            : maskEmail(item?.Email)}
                        </td>
                      )}

                      {roles.includes("Developer") ? (
                        <td
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {IsInquiryVisiable(item)
                            ? item?.MolileNumber
                            : maskNumber(item?.MolileNumber)}
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
                          {roles.includes("Developer") &&
                          item?.EnquiryType != "Property" ? (
                            <span>-</span>
                          ) : item?.PropertyId?.Title ? (
                            item?.PropertyId?.Title
                          ) : (
                            "-"
                          )}
                        </td>
                      ) : null}
                      {typeOnButton != "Project" &&
                      typeOnButton != "ContactUs" &&
                      typeOnButton != "Astrology" ? (
                        roles.includes("Developer") &&
                        item?.EnquiryType != "Property" ? (
                          <td
                            scope="row"
                            className="px-6 py-4 font-medium text-black-500 whitespace-nowrap dark:text-white"
                          >
                            -
                          </td>
                        ) : (
                          <Link
                            href={`/propertyDetail/${item?.PropertyId?._id}`}
                            legacyBehavior
                          >
                            <a target="_blank" rel="noopener noreferrer">
                              <td
                                scope="row"
                                className="px-6 py-4 font-medium text-blue-500 whitespace-nowrap dark:text-white"
                              >
                                {item?.PropertyId?._id ? "URL" : "-"}
                              </td>
                            </a>
                          </Link>
                        )
                      ) : null}
                      {typeOnButton == "Project" ||
                      typeOnButton == "ContactUs" ? (
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
                              item?.IsActionTaken
                                ? "bi bi-hand-thumbs-up-fill text-green-600	"
                                : "bi bi-hand-thumbs-down-fill text-red-500"
                            } `}
                            style={{ fontSize: "24px" }}
                          ></i>
                        </td>
                      )}
                      {roles.includes("Admin") && (
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            {/* <Link
                        //  href={`/amenity/${item._id}`}
                               href={""}
                               className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                           >
                                <i className="bi bi-eye-fill"></i>
                                 </Link> */}
                            {roles.includes("Admin") && (
                              <Link
                                href=""
                                className="font-medium text-lg text-red-600 dark:text-red-500 hover:underline"
                              >
                                <i
                                  onClick={() => deleteInquiryModel(item?._id)}
                                  className="bi bi-trash-fill"
                                ></i>
                              </Link>
                            )}

                            {roles.includes("Admin") ? (
                              <Link
                                href=""
                                className="font-bold text-lg text-blue-600 dark:text-blue-500 hover:underline"
                              >
                                <i
                                  onClick={() =>
                                    openInquiryModal(
                                      item?.AllowedUser,
                                      item?._id
                                    )
                                  }
                                  className="bi bi-send-fill"
                                ></i>
                              </Link>
                            ) : null}
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              ) : null}
            </table>
            {listData?.data?.length === 0 && (
              <div className="mt-4 mb-4 ">
                <h1 className={` bigNotFound`}>No Data Found</h1>
              </div>
            )}
            <Pagination
              data={listData}
              pageNo={handlePageChange}
              pageVal={page}
            />
          </div>
        ) : (
          roles.includes("Developer") && (
            <div className="my-20">
              <h1 className={` bigNotFound`}>No Data Found</h1>
            </div>
          )
        )}
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
          title="Are you sure you want to delete this Enquiry ?"
          confirmLabel="Yes, I'm sure"
          cancelLabel="No, cancel"
          onConfirm={handleDelete}
          onCancel={handleInquiryModalCancel}
          AllowedUsers={AllowedUserList}
          setIsSubmitClicked={setIsSubmitClicked}
          selectedInquiryId={inquiryId}
          setIsPopupOpenforInquiry={setIsPopupOpenforInquiry}
          setIsLoading={setIsLoading}
        />
      )}
    </section>
  );
}

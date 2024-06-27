import React, { useEffect, useState } from "react";
import Pagination from "@/components/common/pagination";
import { GetUserApi } from "@/api-functions/user/getUsers";
import { UpdateInquiryApi } from "@/api-functions/enquiry/updateInquiry";
import { ToastContainer, toast } from "react-toastify";
import styles from "./sendinquiry.module.css";
import { add } from "date-fns";
import CommonLoader from "../commonLoader/commonLoader";

export default function SendInquiryModal({
  isOpen,
  title,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
  AllowedUsers,
  setIsSubmitClicked,
  selectedInquiryId,
  setIsPopupOpenforInquiry,
  setIsLoading
}) {
  if (!isOpen) return null;
  const [page, setPage] = useState(1);
  const [userLlistData, setUserLlistData] = useState([]);
  const [addedUSerList, setAddedUSerList] = useState(
    AllowedUsers?.map((item) => item.UserId)
  );
  const [allowedUSerList, setAllowedUSerList] = useState(
    AllowedUsers?.map((item) => item.UserId)
  );
  const [searchData, setSearchData] = useState("");
  const [activeTab, setActiveTab] = useState("send");

  const sendUserList = userLlistData?.data?.filter((item) =>
    allowedUSerList.includes(item._id)
  );
  const unsendUserList = userLlistData?.data?.filter(
    (item) => !allowedUSerList.includes(item._id)
  );
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  useEffect(() => {
    getAllUser();
  }, [page, searchData]);
  const getAllUser = async () => {
    setIsLoading(true);
    let users = await GetUserApi(page, searchData);
    if (users?.resData?.success == true) {
      setUserLlistData(users?.resData);
      setIsLoading(false);
      return false;
    } else {
      toast.error(users?.errMessage);
      setIsLoading(false);
      return false;
    }
  };
  const searchInputChange = (e) => {
    setSearchData(e.target.value);
  };
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  const handleUserCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setAddedUSerList([...addedUSerList, value]);
    } else {
      setAddedUSerList(addedUSerList.filter((item) => item !== value));
    }
  };
  const sendInquiry = async () => {
    setIsLoading(true);
    const payload = {
      AllowedUser: addedUSerList,
    };
    const id = selectedInquiryId;
    let res = await UpdateInquiryApi(payload, id);
    if (res?.resData?.success == true) {
      toast.success("Inquiry sent Successfully");
      setIsPopupOpenforInquiry(false);
      setIsSubmitClicked((prev) => prev + 1);
      setIsLoading(false);
    } else {
      toast.error(res.errMessage);
      setIsLoading(false);
      return false;
    }
  };
  const selectAllHandle = (e) => {
    if (e.target.checked) {
      const allUserId = userLlistData?.data?.map((u) => u._id);
      setAddedUSerList(allUserId);
    } else {
      setAddedUSerList([]);
    }
  };
  const UnselectAllHandle = (e) => {
    if (e.target.checked) {
      const allUserId = sendUserList?.map((u) => u._id);
      setAddedUSerList(allUserId);
    } else {
      setAddedUSerList([]);
    }
  };
  return (
    <div
      id="popup-modal"
      tabIndex="-1"
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full inset-0 h-full bg-black bg-opacity-50"
    >
      <div className={`relative p-4 mx-auto  ${styles.inquiryModal}`}>
        <div className="relative bg-white rounded-lg shadow-md">
          <button
            onClick={onCancel}
            type="button"
            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="popup-modal"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>

          <div className="p-4 md:p-5 text-center">
            <div className="flex justify-center items-center h-full w-full mb-5">
              <div className="relative w-1/2">
                <div className="absolute inset-y-0 left-0 flex items-center ps-3 pointer-events-none">
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
                  className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-100 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search for user"
                  onChange={searchInputChange}
                />
              </div>
            </div>
            {activeTab == "send" ? (
              sendUserList && sendUserList.length > 0 ? (
                <div className="flex justify-end">
                  <input
                    id={`UnselectAll`}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={UnselectAllHandle}
                    checked={
                      sendUserList?.length === addedUSerList?.length &&
                      sendUserList?.length > 0
                    }
                  />
                  <label
                    htmlFor={`selectAll`}
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Unselect All
                  </label>
                </div>
              ) : null
            ) : unsendUserList && unsendUserList.length > 0 ? (
              <div className="flex justify-end">
                <input
                  id={`selectAll`}
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onChange={selectAllHandle}
                  checked={
                    userLlistData?.data?.length === addedUSerList?.length &&
                    unsendUserList?.length > 0
                  }
                />
                <label
                  htmlFor={`selectAll`}
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Select All
                </label>
              </div>
            ) : null}

            <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
              <ul
                className="flex flex-wrap -mb-px text-sm font-medium text-center"
                id="default-tab"
                role="tablist"
              >
                <li className="me-2" role="presentation">
                  <button
                    className={`inline-block p-4 border-b-2 rounded-t-lg ${
                      activeTab === "send"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                    }`}
                    id="send-tab"
                    type="button"
                    role="tab"
                    aria-controls="send"
                    aria-selected={activeTab === "send"}
                    onClick={() => handleTabClick("send")}
                  >
                    Send
                  </button>
                </li>
                <li className="me-2" role="presentation">
                  <button
                    className={`inline-block p-4 border-b-2 rounded-t-lg ${
                      activeTab === "UnSend"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                    }`}
                    id="UnSend-tab"
                    type="button"
                    role="tab"
                    aria-controls="UnSend"
                    aria-selected={activeTab === "UnSend"}
                    onClick={() => handleTabClick("UnSend")}
                  >
                    Unsend
                  </button>
                </li>
              </ul>
              <div id="default-tab-content">
                <div
                  id="send"
                  className={`p-4 ${activeTab === "send" ? "" : "hidden"}`}
                >
                  {sendUserList?.length > 0 ? (
                    <div className="flex flex-wrap justify-start">
                      {sendUserList?.map((useritem) => (
                        <div
                          key={useritem._id}
                          className={`flex items-center ${styles.usercheckbox}  me-4`}
                        >
                          <input
                            id={`user-${useritem._id}`}
                            type="checkbox"
                            value={useritem._id}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            onChange={handleUserCheckboxChange}
                            checked={addedUSerList.includes(useritem._id)}
                          />
                          <label
                            htmlFor={`user-${useritem.id}`}
                            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            {useritem.FirstName}
                          </label>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <h1 className={`noDataHead`}>No Data Found</h1>
                  )}
                </div>
                <div
                  id="UnSend"
                  className={`p-4 ${activeTab === "UnSend" ? "" : "hidden"}`}
                >
                  {unsendUserList?.length > 0 ? (
                    <div className="flex flex-wrap justify-start">
                      {unsendUserList?.map((useritem) => (
                        <div
                          key={useritem._id}
                          className={`flex items-center ${styles.usercheckbox}  me-4`}
                        >
                          <input
                            id={`user-${useritem._id}`}
                            type="checkbox"
                            value={useritem._id}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            onChange={handleUserCheckboxChange}
                            checked={addedUSerList.includes(useritem._id)}
                          />
                          <label
                            htmlFor={`user-${useritem.id}`}
                            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            {useritem.FirstName}
                          </label>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <h1 className={`noDataHead`}>No Data Found</h1>
                  )}
                </div>
              </div>
            </div>

            <Pagination
              data={userLlistData}
              pageNo={handlePageChange}
              pageVal={page}
            />
            <button
              onClick={sendInquiry}
              // data-modal-hide="popup-modal"
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

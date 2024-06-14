import React, { useEffect, useState } from "react";
import Pagination from "@/components/common/pagination";
import { GetUserApi } from "@/api-functions/user/getUsers";
import { UpdateInquiryApi } from "@/api-functions/enquiry/updateInquiry";
import { ToastContainer, toast } from "react-toastify";
import { Modal } from "flowbite-react";
import { addEnquiry } from "@/api-functions/enquiry/addEnquiry";
// import { add } from "date-fns";
export default function ContactModal({ isOpen, setDynamicState }) {
  if (!isOpen) return null;
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactMolileNumber, setcontactPhone] = useState("");
  const [contactEnquiryData, setcontactEnquiryData] = useState("");
  const [contactEnquiryType, setcontactEnquiryType] = useState("ContactUs");
  const currentDate = new Date().toISOString().slice(0, 10);
  const handlecontactNameChange = (e) => {
    setContactName(e.target.value);
    setcontactEnquiryData(currentDate);
  };
  const handlecontactEmailChange = (e) => {
    setContactEmail(e.target.value);
  };
  const handlecontactPhoneChange = (e) => {
    setcontactPhone(e.target.value);
  };
  const handlecontactMessageChange = (e) => {
    setContactMessage(e.target.value);
  };

  const addcontactEnquiryData = async () => {
    if (contactName === "") {
      toast.error("Name  is required");
      return false;
    }
    if (contactEmail === "") {
      toast.error("Email is required");
      return false;
    }
    if (contactMessage === "") {
      toast.error("Message is required");
      return false;
    }
    if (contactMolileNumber === "") {
      toast.error("Number is required");
      return false;
    }
    if (!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(contactMolileNumber)) {
      toast.error("Please enter a valid 10-digit mobile number");
      return false;
    }
    let contactpayload = {
      Name: contactName,
      Email: contactEmail,
      Message: contactMessage,
      MolileNumber: contactMolileNumber,
      EnquiryDate: contactEnquiryData,
      EnquiryType: contactEnquiryType,
    };
    let res = await addEnquiry(contactpayload);
    if (res?.resData?.success == true) {
      toast.success(res?.resData?.message);
      setDynamicState(false);
    } else {
      toast.error(res.errMessage);
      return false;
    }
  };
  return (
    <>
      <Modal
        dismissible
        className={`bg-transparent/[.8] `}
        size="lg"
        show={isOpen}
        onClose={() => setDynamicState(false)}
      >
        <Modal.Header className="p-2 flex items-center justify-center bg-gray-100">
          <h1 className="mt-2 font-bold text-gray-700 dark:text-gray-800">
            Ask For Detail
          </h1>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className="mb-6 mt-3">
              <label className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white required">
                Your Name
              </label>
              <input
                type="text"
                value={contactName}
                onChange={handlecontactNameChange}
                id="Name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white required">
                Your Email
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={handlecontactEmailChange}
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white required">
                Your Phone
              </label>
              <input
                type="text"
                value={contactMolileNumber}
                onChange={handlecontactPhoneChange}
                id="Phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white required">
                Your Message
              </label>
              <textarea
                type="text"
                value={contactMessage}
                onChange={handlecontactMessageChange}
                id="Message"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className={`  text-white rounded-md bg-blue-700 h-12 w-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm w-full sm:w-auto px-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
            type="button"
            onClick={addcontactEnquiryData}
          >
            Send
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

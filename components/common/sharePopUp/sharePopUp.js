import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Modal } from "flowbite-react";
import { PROD_URL } from "@/utils/constants";
// import { add } from "date-fns";
export function SharePopUp({ isOpenvalue, setValueDynamicState,propertyIdForUrl }) {

  const [copied, setCopied] = useState(false);
  if (!isOpenvalue) return null;
  const copyURL = () => {
    const finalUrl=`${PROD_URL}/propertyDetail/${propertyIdForUrl}`
    navigator.clipboard.writeText(finalUrl);
    setCopied(true)
    toast.success("URL Copied");
    setValueDynamicState(false);
    setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
  };

  const handleRedirect = () => {
    window.open("https://www.facebook.com/", "_blank");
    setValueDynamicState(false);
  };

  const handleRedirectTwitter = () => {
    window.open("https://twitter.com/", "_blank");
    setValueDynamicState(false);
  };
  return (
    <>
      <Modal
        dismissible
        className={`bg-transparent/[.8]  `}
        size="lg"
        show={isOpenvalue}
        onClose={() => setValueDynamicState(false)}
      >
        <Modal.Header className="p-2 flex items-center justify-center bg-gray-100">
          <h1 className="font-bold text-gray-700 dark:text-gray-800">
          Share With Your Friends
          </h1>
          </Modal.Header>
        <Modal.Body className="p-3">
          <div className="flex items-center p-3 md:p-5  border-gray-200 rounded-b dark:border-gray-600">
          <button
            onClick={copyURL}
              type="button"
              className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2"
            >
             <i className="bi bi-link-45deg mr-2"></i>
              Copy URL
            </button>
            <button
            onClick={handleRedirect}
              type="button"
              className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2"
            >
              <svg
                className="w-4 h-4 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 8 19"
              >
                <path
                  fill-rule="evenodd"
                  d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                  clip-rule="evenodd"
                />
              </svg>
              Facebook
            </button>
            <button
            onClick={handleRedirectTwitter}
            
              type="button"
              className="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2"
            >
              <svg
                className="w-4 h-4 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 17"
              >
                <path
                  fill-rule="evenodd"
                  d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                  clip-rule="evenodd"
                />
              </svg>
               Twitter
            </button>
          
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <button
            className={`  text-white rounded-md bg-blue-700 h-12 w-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm w-full sm:w-auto px-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
            type="button"
            onClick={addcontactEnquiryData}
          >
            Send
          </button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}

// import { useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import styles from "./sharePopUp.module.css"
// export const SharePopUp = ({ shareModalValue, setStateValue }) => {
//   const [copied, setCopied] = useState(false);
//   console.log("shareModalValue", shareModalValue);
//   const copyURL = () => {
//     navigator.clipboard.writeText(window.location.href);
//     setCopied(true);
//     toast.success("URL Copied");
//     setStateValue(false);
//     setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
//   };

//   const handleRedirect = () => {
//     window.open("https://www.facebook.com/", "_blank");
//     setStateValue(false);
//   };

//   const handleRedirectTwitter = () => {
//     window.open("https://twitter.com/", "_blank");
//     setStateValue(false);
//   };

//   return (
//     <>
//       <div
//         id="dropdownPossession"
//         className={`z-10 ${
//             shareModalValue ? "block" : "hidden"
//         } absolute top-full bg-gray-200 divide-y divide-gray-100 rounded-lg shadow w-36 dark:bg-gray-700 ${styles.shareDropDown}`}
//       >
//         <ul
//           className="p-2 text-sm text-gray-700 dark:text-gray-200 list-none"
//           aria-labelledby="dropdownPossessionButton"
//         >
//           <li
//             onClick={copyURL}
//             className="block px-4 py-2 hover:bg-white hover:text-black dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
//           >
//             <i className="bi bi-link-45deg mr-2"></i> Copy Url
//           </li>
//           <li
//             onClick={handleRedirect}
//             className="block px-4 py-2 hover:bg-white hover:text-black dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
//           >
//             <i className="bi bi-facebook mr-2"></i>Facebook
//           </li>
//           <li
//             onClick={handleRedirectTwitter}
//             className="block px-4 py-2 hover:bg-white hover:text-black dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
//           >
//             <i className="bi bi-twitter mr-2"></i>Twitter
//           </li>
//         </ul>
//       </div>
//     </>
//   );
// };

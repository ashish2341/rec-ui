"use client";
import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import { API_BASE_URL_FOR_MASTER } from "@/utils/constants";
import useFetch from "@/customHooks/useFetch";
import { ImageString } from "@/api-functions/auth/authAction";
import { GetBuilderApi } from "@/api-functions/builder/getBuilder";
import Cookies from "js-cookie";
import { FormatNumber } from "@/utils/commonHelperFn";
import Styles from "../propertypage.module.css";
import ContinueButton from "@/components/common/propertyContinueButton/continueButton";

export default function PartSix({
  valueForNextfromSix,
  valueForNextPagefromSix,
  setPropertyBackvalue
}) {
  // fetching Data for byBank
  const { data: byBankData } = useFetch(`${API_BASE_URL_FOR_MASTER}/banks`);
  const defaultOption = [{ value: "", label: "no data found" }];

  const [byBank, setByBank] = useState([]);
  const [loanSince, setLoanSince] = useState("");
  const [loanTill, setLoanTill] = useState("");
  const [isLoanable, setIsLoanable] = useState("");
  const [isAlreadyLoaned, setIsAlreadyLoaned] = useState("");
  useEffect(() => {
    // Retrieve data from localStorage
    const sessionStoragePropertyData = JSON.parse(
      sessionStorage.getItem("propertyData")
    );
    console.log(
      "localStorageData from localstorage",
      sessionStoragePropertyData.Facing
    );
    // Update state values if data exists in localStorage
    if (sessionStoragePropertyData) {
      console.log(
        "if function called sessionStoragePropertyData.PropertyFor ",
        sessionStoragePropertyData.ProeprtyFor
      );
      console.log(
        "sessionStoragePropertyData?.Brochure",
        sessionStoragePropertyData?.Brochure
      );

      // Loan Details
      setIsLoanable(
        sessionStoragePropertyData?.IsLoanable === true
          ? true
          : sessionStoragePropertyData?.IsLoanable === undefined
          ? null
          : false
      );
      setIsAlreadyLoaned(
        sessionStoragePropertyData?.IsAlreadyLoaned === true
          ? true
          : sessionStoragePropertyData?.IsAlreadyLoaned === undefined
          ? null
          : false
      );

      setByBank(sessionStoragePropertyData?.LoanDetails?.ByBank || []);
      setLoanSince(sessionStoragePropertyData?.LoanDetails?.LoanSince || "");
      setLoanTill(sessionStoragePropertyData?.LoanDetails?.LoanTill || "");
    }
  }, []);

  const handleIsLoanable = (e) => {
    setIsLoanable(e.target.value === "true");
  };

  const handleIsAlreadyLoaned = (e) => {
    setIsAlreadyLoaned(e.target.value === "true");
  };

  const checkRequiredFields = () => {
    const requiredFields = [
      byBank,
      loanSince,
      loanTill,
      isLoanable,
      isAlreadyLoaned,
    ];

    // Check if any required field is empty
    const isEmpty = requiredFields.some(
      (field) => field === "" || field === null || field === undefined
    );

    return !isEmpty;
  };
  const SubmitForm = () => {
    const allFieldsFilled = checkRequiredFields();
    if (allFieldsFilled) {
      const LoanDetails = {
        ByBank: byBank,
        LoanSince: loanSince,
        LoanTill: loanTill,
      };
      const sixthPropertyData = {
        IsLoanable: isLoanable,
        IsAlreadyLoaned: isAlreadyLoaned,
        LoanDetails: LoanDetails,
       
      };
      console.log("sixthPropertyData", sixthPropertyData);
      const localStorageData = JSON.parse(
        sessionStorage.getItem("propertyData")
      );
      const newProjectData = { ...localStorageData, ...sixthPropertyData };
      sessionStorage.setItem("propertyData", JSON.stringify(newProjectData));
      valueForNextfromSix(valueForNextPagefromSix + 1);
      setPropertyBackvalue(prev=>prev-1)
    } else {
      toast.error("Please fill in all required fields!");
    }
    
  };

  const handleBankClick = (item) => {
    console.log("Clicked item:", item);
    setByBank((prev) => {
      const isSelected = prev.some(
        (selectedItem) => selectedItem._id === item._id
      );
      console.log("Is selected:", isSelected);
      if (isSelected) {
        return prev.filter((selectedItem) => selectedItem._id !== item._id);
      } else {
        return [...prev, item];
      }
    });
  };
  console.log("bank names", byBank);
  return (
    <>
    <div className={`flex justify-end ${Styles.continueBtn}`} >
    <ContinueButton modalSubmit={SubmitForm} />
    </div>
      <div className="grid gap-4 mb-4 sm:grid-cols-2">
        {/*   Is Loanable */}
        <div>
          <label
            htmlFor="isLoanable"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
          >
            Is Loanable
          </label>
          <input
            type="radio"
            name="isLoanable"
            id="isLoanable"
            value="true"
            required=""
            checked={isLoanable == true}
            onChange={handleIsLoanable}
          />
          <label htmlFor="isLoanable" className="mr-3 ml-2">
            Yes
          </label>
          <input
            type="radio"
            name="isLoanable"
            id="isLoanable"
            value="false"
            required=""
            onChange={handleIsLoanable}
            checked={isLoanable == false}
            className="form-radio h-5 w-5 text-red-600"
          />
          <label htmlFor="isLoanable" className="ml-2">
            No
          </label>
        </div>
        {/*    Is Already Loaned */}
        <div>
          <label
            htmlFor="isAlreadyLoaned"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
          >
            Is Already Loaned
          </label>
          <input
            type="radio"
            name="isAlreadyLoaned"
            id="isAlreadyLoaned"
            value="true"
            required=""
            onChange={handleIsAlreadyLoaned}
            checked={isAlreadyLoaned == true}
          />
          <label htmlFor="isAlreadyLoaned" className="mr-3 ml-2">
            Yes
          </label>
          <input
            type="radio"
            name="isAlreadyLoaned"
            id="isAlreadyLoaned"
            value="false"
            required=""
            onChange={handleIsAlreadyLoaned}
            className="form-radio h-5 w-5 text-red-600"
            checked={isAlreadyLoaned == false}
          />
          <label htmlFor="isAlreadyLoaned" className="ml-2">
            No
          </label>
        </div>
        
        {/*    Loan Since */}
        <div>
          <label
            htmlFor="loanSince"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
          >
            Loan Since
          </label>
          <input
            type="date"
            name="LoanSince"
            id="loanSince"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Loan Since Date"
            value={loanSince}
            onChange={(e) => setLoanSince(e.target.value)}
          />
        </div>
        {/*   Loan Till */}
        <div>
          <label
            htmlFor="loanTill"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
          >
            Loan Till
          </label>
          <input
            type="date"
            name="LoanTill"
            id="loanTill"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Loan Till Date"
            value={loanTill}
            onChange={(e) => setLoanTill(e.target.value)}
          />
        </div>
      </div>
      <div className="grid gap-4 mb-4 sm:grid-cols-1">

 {/*    By Bank */}
 <div>
          <label
            htmlFor="byBank"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
          >
            By Bank
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Bank"
            required=""
            value={byBank.map((item) => {
              return item.BankName;
            })}
            disabled
          />
          {byBankData ? (
            <div
              className={`flex flex-wrap space-x-2 mt-4 ${
                byBankData?.data?.length > 5 ? `${Styles.scrollable}` : ""
              }`}
            >
              {byBankData?.data?.map((item) => (
                <button
                  key={item._id}
                  onClick={() => handleBankClick(item)}
                  className={`rounded text-white px-4 py-2 ${
                    Styles.optionButton
                  } ${
                    byBank.some((selectedItem) => selectedItem._id === item._id)
                      ? "bg-[#2a4acb] border-2 border-[#2a4acb]"
                      : "bg-[#6592d3] border-2 border-[#6592d3]"
                  }`}
                >
                  <img
                    src={item.BankImage}
                    alt=""
                    className="w-6 h-6 mr-2 inline-block"
                  />
                  {item.BankName}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap space-x-2">
             <h1 className={`${Styles.noDataHead}`}>No Data Found</h1>
            </div>
          )}
        </div>
      </div>
     
     
    </>
  );
}

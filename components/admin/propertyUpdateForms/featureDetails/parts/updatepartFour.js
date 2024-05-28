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
import Styles from "../featurepage.module.css";
import ContinueButton from "@/components/common/propertyContinueButton/continueButton";
export default function PartFour({ setPropertyPageValue }) {
  const [fittingValues, setFittingValues] = useState({
    Electrical: "",
    Toilets: "",
    Kitchen: "",
    Doors: "",
    Windows: "",
    Others: "",
  });

  useEffect(()=>{
    // Retrieve data from localStorage
    const sessionStoragePropertyData = JSON.parse(
      sessionStorage.getItem("EditPropertyData")
    );
    console.log(
      "localStorageData from localstorage",
      sessionStoragePropertyData
    );
    // Update state values if data exists in localStorage
    if (sessionStoragePropertyData) {
    setFittingValues({
      Electrical: sessionStoragePropertyData?.Fitting?.Electrical || "",
      Toilets: sessionStoragePropertyData?.Fitting?.Toilets || "",
      Kitchen: sessionStoragePropertyData?.Fitting?.Kitchen || "",
      Doors: sessionStoragePropertyData?.Fitting?.Doors || "",
      Windows: sessionStoragePropertyData?.Fitting?.Windows || "",
      Others: sessionStoragePropertyData?.Fitting?.Others || "",
    });
  }
  },[])

  const handleFittingChange = (field, value) => {
    setFittingValues((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };
  const SubmitForm = () => {
    let fittingErrors = {};
     // Validate fitting fields
     Object.keys(fittingValues).forEach((field) => {
      if (fittingValues[field].trim() === "") {
        fittingErrors[field] = "Please fill all required fields of fitting";
      }
    });
    if (Object.keys(fittingErrors).length != 0) {
      toast.error("Please fill all required fields of fitting.");
      return false;
    }
    const fittingData = {
   
      Fitting: fittingValues,
    
    };
    console.log("fittingData", fittingData);
    const localStorageData = JSON.parse(sessionStorage.getItem("EditPropertyData"));
    const newProjectData = { ...localStorageData, ...fittingData };
    sessionStorage.setItem("EditPropertyData", JSON.stringify(newProjectData));
      setPropertyPageValue((prev) => prev + 1);
   
  };
  return (
    <>
    <div className={`flex justify-end ${Styles.continueBtn}`} >
    <ContinueButton modalSubmit={SubmitForm} />
    </div>
    <div className={`${Styles.featurebox} container mx-auto px-4 py-8`}>
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4"> Fitting Details</h2>
          <div className="grid gap-4 mb-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="Electrical"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Electrical
              </label>
              <input
                type="text"
                name="Electrical"
                id="Electrical"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Electrical"
                value={fittingValues.Electrical}
                onChange={(e) =>
                  handleFittingChange("Electrical", e.target.value)
                }
              />
            </div>
            <div>
              <label
                htmlFor="Toilets"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Toilets
              </label>
              <input
                type="text"
                name="Toilets"
                id="Toilets"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Toilets"
                value={fittingValues.Toilets}
                onChange={(e) => handleFittingChange("Toilets", e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="Kitchen"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Kitchen
              </label>
              <input
                type="text"
                name="Kitchen"
                id="Kitchen"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Kitchen"
                value={fittingValues.Kitchen}
                onChange={(e) => handleFittingChange("Kitchen", e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="Doors"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Doors
              </label>
              <input
                type="text"
                name="Doors"
                id="Doors"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Doors"
                value={fittingValues.Doors}
                onChange={(e) => handleFittingChange("Doors", e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="Windows"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Windows
              </label>
              <input
                type="text"
                name="Windows"
                id="Windows"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Windows"
                value={fittingValues.Windows}
                onChange={(e) => handleFittingChange("Windows", e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="Others"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Others
              </label>
              <input
                type="text"
                name="Others"
                id="Others"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Others"
                value={fittingValues.Others}
                onChange={(e) => handleFittingChange("Others", e.target.value)}
              />
            </div>
          </div>
        </div>

    </div>
    </>
  );
}

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
export default function PartThree({ setPropertyPageValue }) {
  const [floorAndCounterValues, setFloorAndCounterValues] = useState({
    Dining: "",
    MasterBedroom: "",
    OtherBedroom: "",
    Kitchen: "",
    Toilets: "",
    Balcony: "",
  });

  useEffect(() => {
    // Retrieve data from localStorage
    const sessionStoragePropertyData = JSON.parse(
      sessionStorage.getItem("propertyData")
    );
    console.log(
      "localStorageData from localstorage",
      sessionStoragePropertyData
    );
    // Update state values if data exists in localStorage
    if (sessionStoragePropertyData) {
 
      setFloorAndCounterValues({
        Dining: sessionStoragePropertyData?.FloorAndCounter?.Dining || "",
        MasterBedroom: sessionStoragePropertyData?.FloorAndCounter?.MasterBedroom || "",
        OtherBedroom:sessionStoragePropertyData?.FloorAndCounter?.OtherBedroom || "",
        Kitchen: sessionStoragePropertyData?.FloorAndCounter?.Kitchen || "",
        Toilets: sessionStoragePropertyData?.FloorAndCounter?.Toilets || "", 
        Balcony: sessionStoragePropertyData?.FloorAndCounter?.Balcony || "",
        })
       
           
       
    }
  }, []);

  const handleFloorChange = (field, value) => {
    setFloorAndCounterValues((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };
  const SubmitForm = () => {
    let floorAndCounterErrors = {};

     // Validate floorAndCounter fields
     Object.keys(floorAndCounterValues).forEach(field => {
      if (floorAndCounterValues[field].trim() === '') {
        floorAndCounterErrors[field] = 'Please fill all required fields of floor & Counter';
      }
    });

    if (Object.keys(floorAndCounterErrors).length != 0) {
      toast.error("Please fill all required fields of floor & Counter.");
      return false;
    }

    const flooeAndCounterData = {
    
      FloorAndCounter:floorAndCounterValues,
   

    };
    console.log("flooeAndCounterData", flooeAndCounterData);
    const localStorageData = JSON.parse(sessionStorage.getItem("propertyData"));
    const newProjectData = { ...localStorageData, ...flooeAndCounterData };
    sessionStorage.setItem("propertyData", JSON.stringify(newProjectData));
      setPropertyPageValue((prev) => prev + 1);
    
  };
  return (
    <>
    <div className={`flex justify-end ${Styles.continueBtn}`} >
    <ContinueButton modalSubmit={SubmitForm} />
    </div>
    <div className={`${Styles.featurebox} container mx-auto px-4 py-8`}>
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {" "}
            Floor and Counter Details
          </h2>
          <div className="grid gap-4 mb-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="Dining"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Dining
              </label>
              <input
                type="text"
                name="Dining"
                id="Dining"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Dining"
                value={floorAndCounterValues.Dining}
                onChange={(e) => handleFloorChange("Dining", e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="MasterBedroom"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Master Bedroom
              </label>
              <input
                type="text"
                name="MasterBedroom"
                id="MasterBedroom"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Master Bedroom"
                value={floorAndCounterValues.MasterBedroom}
                onChange={(e) =>
                  handleFloorChange("MasterBedroom", e.target.value)
                }
              />
            </div>

            <div>
              <label
                htmlFor="OtherBedroom"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Other Bedroom
              </label>
              <input
                type="text"
                name="OtherBedroom"
                id="OtherBedroom"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Other Bedroom"
                value={floorAndCounterValues.OtherBedroom}
                onChange={(e) =>
                  handleFloorChange("OtherBedroom", e.target.value)
                }
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
                value={floorAndCounterValues.Kitchen}
                onChange={(e) => handleFloorChange("Kitchen", e.target.value)}
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
                value={floorAndCounterValues.Toilets}
                onChange={(e) => handleFloorChange("Toilets", e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="Balcony"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Balcony
              </label>
              <input
                type="text"
                name="Balcony"
                id="Balcony"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Balcony"
                value={floorAndCounterValues.Balcony}
                onChange={(e) => handleFloorChange("Balcony", e.target.value)}
              />
            </div>
          </div>
        </div>

    </div>
    
      
    </>
  );
}

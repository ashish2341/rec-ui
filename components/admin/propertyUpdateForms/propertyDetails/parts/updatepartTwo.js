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

export default function PartTwo({ setPropertyPageValue }) {
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [floorNumber, setFloorNumber] = useState("");
  const [totalFloors, setTotalFloors] = useState("");
  const [floorsAllowed, setFloorsAllowed] = useState("");
  const [balconies, setBalconies] = useState("");
  const [bathroomarray, setBathroomarray] = useState([1, 2, 3, 4, 5]);
  const [bedRoomarray, setBedRoomarray] = useState([1, 2, 3, 4, 5]);
  const [balconiesarray, setBalconiesarray] = useState([1, 2, 3, 4, 5]);

  useEffect(() => {
    // Retrieve data from localStorage
    const sessionStoragePropertyData = JSON.parse(
      sessionStorage.getItem("EditPropertyData")
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

      setBedrooms(sessionStoragePropertyData?.Bedrooms || "");
      setBathrooms(sessionStoragePropertyData?.Bathrooms || "");

      setFloorNumber(sessionStoragePropertyData?.FloorNumber || "");
      setTotalFloors(sessionStoragePropertyData?.TotalFloors || "");

      setFloorsAllowed(sessionStoragePropertyData?.FloorsAllowed || "");

      setBalconies(sessionStoragePropertyData?.Balconies || "");
    }
  }, []);
  const checkRequiredFields = () => {
    const requiredFields = [
      bathrooms,
      bedrooms,
      balconies,
      floorNumber,
      floorsAllowed,
      totalFloors,
     
    ];

    // Check if any required field is empty
    const isEmpty = requiredFields.some(
      (field) => field === "" || field === null || field === undefined
    );

    return !isEmpty;
  };
  const SubmitForm = () => {
    const allFieldsFilled = checkRequiredFields();
    console.log("floorNumber",floorNumber)
    console.log("floorsAllowed",floorsAllowed)
    console.log("totalFloors",totalFloors)
    if (allFieldsFilled) {

      const secondPropertyData={
        Bedrooms: bedrooms,
        Bathrooms: bathrooms,
        FloorNumber:parseInt(floorNumber),
        TotalFloors: parseInt(totalFloors),
        FloorsAllowed: parseInt(floorsAllowed),
        Balconies: balconies,
      }

      console.log("secondPropertyData",secondPropertyData)
      const localStorageData = JSON.parse(
        sessionStorage.getItem("EditPropertyData")
      );
      const newProjectData = { ...localStorageData, ...secondPropertyData };
      sessionStorage.setItem("EditPropertyData", JSON.stringify(newProjectData));
      setPropertyPageValue((prev) => prev + 1);
    }else{
      toast.error("Please fill in all required fields!");
    }
   
  };
  return (
    <>
    <div className={`flex justify-end ${Styles.continueBtn}`} >
    <ContinueButton modalSubmit={SubmitForm} />
    </div>
      <div className="grid gap-4 mb-4 sm:grid-cols-2">
        {/* Bedrooms */}
        <div>
          <label
            htmlFor="bedrooms"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
          >
            Bedrooms
          </label>

          <input
            type="number"
            name="bedrooms"
            id="bedrooms"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Number of Bedrooms"
            value={bedrooms}
            disabled
          />
          <div
            className={`flex flex-wrap space-x-2 mt-4 ${
              bedRoomarray.length > 8 ? `${Styles.scrollable}` : ""
            }`}
          >
            {bedRoomarray.map((item, index) => (
              <button
                key={index}
                onClick={() => setBedrooms(item)}
                className={` rounded text-white px-4 py-2 ${
                  Styles.optionButton
                } ${
                  bedrooms == item
                    ? "bg-[#2a4acb] border-2 border-[#2a4acb]"
                    : "bg-[#6592d3]  border-2 border-[#6592d3]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        {/* Bathrooms */}
        <div>
          <label
            htmlFor="bathrooms"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
          >
            Bathrooms
          </label>
          <input
            type="number"
            name="bathrooms"
            id="bathrooms"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Number of Bathrooms"
            value={bathrooms}
            // onChange={(e) => setBathrooms(e.target.value)}
            disabled
          />
          <div
            className={`flex flex-wrap space-x-2 mt-4 ${
              bathroomarray.length > 8 ? `${Styles.scrollable}` : ""
            }`}
          >
            {bathroomarray.map((item, index) => (
              <button
                key={index}
                onClick={() => setBathrooms(item)}
                className={` rounded text-white px-4 py-2 ${
                  Styles.optionButton
                } ${
                  bathrooms == item
                    ? "bg-[#2a4acb] border-2 border-[#2a4acb]"
                    : "bg-[#6592d3]  border-2 border-[#6592d3]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        {/* Balconies */}
        <div>
          <label
            htmlFor="balconies"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
          >
            Balconies
          </label>
          <input
            type="number"
            name="balconies"
            id="balconies"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Number of Balconies"
            value={balconies}
            // onChange={(e) => setBalconies(e.target.value)}
            disabled
          />
          <div
            className={`flex flex-wrap space-x-2 mt-4 ${
              balconiesarray.length > 8 ? `${Styles.scrollable}` : ""
            }`}
          >
            {balconiesarray.map((item, index) => (
              <button
                key={index}
                onClick={() => setBalconies(item)}
                className={` rounded text-white px-4 py-2 ${
                  Styles.optionButton
                } ${
                  balconies == item
                    ? "bg-[#2a4acb] border-2 border-[#2a4acb]"
                    : "bg-[#6592d3]  border-2 border-[#6592d3]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        {/* FloorNumber */}
        <div>
          <label
            htmlFor="floorNumber"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
          >
            Floor Number
          </label>
          <input
            type="number"
            name="floorNumber"
            id="floorNumber"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Floor Number"
            value={floorNumber}
            onChange={(e) => setFloorNumber(e.target.value)}
          />
        </div>

        {/* TotalFloors */}
        <div>
          <label
            htmlFor="totalFloors"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
          >
            Total Floors
          </label>
          <input
            type="number"
            name="totalFloors"
            id="totalFloors"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Total Floors"
            value={totalFloors}
            onChange={(e) => setTotalFloors(e.target.value)}
          />
        </div>

        {/* FloorsAllowed */}
        <div>
          <label
            htmlFor="floorsAllowed"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
          >
            Floors Allowed
          </label>
          <input
            type="number"
            name="floorsAllowed"
            id="floorsAllowed"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Floors Allowed"
            value={floorsAllowed}
            onChange={(e) => setFloorsAllowed(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}

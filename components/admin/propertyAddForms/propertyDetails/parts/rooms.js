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
import ApiButtons from "@/components/common/admin/propertyapiButtons/ApiButtons";
import PropertyBigButtons from "@/components/common/admin/propertyBigButton/propertyBigButtons";

export default function RoomDetailPage({ setPropertyPageValue }) {
  const sessionStoragePropertyData = JSON.parse(
    sessionStorage.getItem("propertyData")
  );
  const propertTypWithSubTypeValue =
    sessionStoragePropertyData?.PropertyTypeWithSubtype.Name || "";
  const propertTypeValue = sessionStoragePropertyData?.PropertyType || "";
  const PropertyForValue = sessionStoragePropertyData?.PropertyFor || "";
  // fetching Data for bhkTypeData
  const { data: bhkTypeData } = useFetch(`${API_BASE_URL_FOR_MASTER}/bhkType`);
  // console.log("bhkTypeData", bhkTypeData);
  const [bhkType, setBhkType] = useState("");
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

      setBedrooms(sessionStoragePropertyData?.Bedrooms || "");
      setBathrooms(sessionStoragePropertyData?.Bathrooms || "");
      setFloorNumber(sessionStoragePropertyData?.FloorNumber || "");
      setTotalFloors(sessionStoragePropertyData?.TotalFloors || "");
      setBhkType(sessionStoragePropertyData?.BhkType || "");
    }
  }, []);
  const checkRequiredFields = () => {
    if (propertTypeValue == "Residential") {
      var requiredFields = [
        bhkType,
        bedrooms,
        bathrooms,
        floorNumber,
        totalFloors,
      ];
    } else {
      var requiredFields = [floorNumber, totalFloors];
    }

    // Check if any required field is empty
    const isEmpty = requiredFields.some(
      (field) => field === "" || field === null || field === undefined
    );

    return !isEmpty;
  };
  const SubmitForm = () => {
    const allFieldsFilled = true;
    if (allFieldsFilled) {
      const secondPropertyData = {
        FloorNumber: parseInt(floorNumber),
        TotalFloors: parseInt(totalFloors),
      };
      if (propertTypeValue == "Residential") {
        secondPropertyData.BhkType = bhkType;
        secondPropertyData.Bedrooms = bedrooms;
        secondPropertyData.Bathrooms = bathrooms;
      }
      console.log("secondPropertyData", secondPropertyData);
      const localStorageData = JSON.parse(
        sessionStorage.getItem("propertyData")
      );
      const newProjectData = { ...localStorageData, ...secondPropertyData };
      sessionStorage.setItem("propertyData", JSON.stringify(newProjectData));
      setPropertyPageValue((prev) => prev + 1);
    } else {
      toast.error("Please fill in all required fields!");
    }
  };
  return (
    <>
      <div className={`flex justify-end ${Styles.continueBtn}`}>
        <ContinueButton modalSubmit={SubmitForm} />
      </div>
      <div className="grid gap-4 mb-4 sm:grid-cols-2">
        {/* FloorNumber */}
        <div>
          <label
            htmlFor="floorNumber"
            className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white required"
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
            className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white required"
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
      </div>
      <div className="grid gap-4 mb-4 sm:grid-cols-1">
        {propertTypeValue == "Residential" && (
          <>
            {/* BhkType */}
            {bhkTypeData && (
              <ApiButtons
                itemArray={bhkTypeData}
                stateItem={bhkType}
                labelName={"Bhk Type"}
                ValueName={"Type"}
                changeState={setBhkType}
              />
            )}

            {/* Bedrooms */}

            <PropertyBigButtons
              labelName={"Bedrooms"}
              itemArray={bedRoomarray}
              activeBtnvalue={bedrooms}
              changeState={setBedrooms}
            />

            {/* Bathrooms */}
            <PropertyBigButtons
              labelName={"Bathrooms"}
              itemArray={bathroomarray}
              activeBtnvalue={bathrooms}
              changeState={setBathrooms}
            />
          </>
        )}
      </div>
     
    </>
  );
}

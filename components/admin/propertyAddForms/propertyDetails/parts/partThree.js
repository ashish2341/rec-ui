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
export default function PartThree({ setPropertyPageValue }) {
  // fetching Data for fencingsData
  const { data: fencingsData } = useFetch(
    `${API_BASE_URL_FOR_MASTER}/fencings`
  );
  // console.log("fencingsData", fencingsData);

  // fetching Data for flooringsData
  const { data: flooringsData } = useFetch(
    `${API_BASE_URL_FOR_MASTER}/floorings`
  );
  // console.log("flooringsData", flooringsData);

  // fetching Data for furnishedesData
  const { data: furnishedesData } = useFetch(
    `${API_BASE_URL_FOR_MASTER}/furnishedes`
  );
  console.log("furnishedesData", furnishedesData);

  // fetching Data for builtAreaTypesData
  const { data: builtAreaTypesData } = useFetch(
    `${API_BASE_URL_FOR_MASTER}/builtAreaTypes`
  );
  // console.log("builtAreaTypesData", builtAreaTypesData);

  // fetching Data for areaUnitData
  const { data: areaUnitData } = useFetch(
    `${API_BASE_URL_FOR_MASTER}/areaunits`
  );
  // console.log("areaUnitData", areaUnitData);

  const [fencing, setFencing] = useState("");
  const [flooring, setFlooring] = useState("");
  const [furnished, setFurnished] = useState("");
  const [landArea, setLandArea] = useState("");
  const [coveredArea, setCoveredArea] = useState("");
  const [carpetArea, setCarpetArea] = useState("");
  const [areaUnits, setAreaUnits] = useState("");
  const [builtAreaType, setBuiltAreaType] = useState("");

  const defaultOption = [{ value: "", label: "no data found" }];
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

      setFencing(sessionStoragePropertyData?.Fencing || "");
      setFlooring(sessionStoragePropertyData?.Flooring || "");
      setFurnished(sessionStoragePropertyData?.Furnished || "");
      setBuiltAreaType(sessionStoragePropertyData?.BuiltAreaType || "");
      setLandArea(sessionStoragePropertyData?.LandArea || "");
      setCoveredArea(sessionStoragePropertyData?.CoveredArea || "");
      setCarpetArea(sessionStoragePropertyData?.CarpetArea || "");
      setAreaUnits(sessionStoragePropertyData?.AreaUnits || "");
    }
  }, []);

  const checkRequiredFields = () => {
    const requiredFields = [
      fencing,
      flooring,
      furnished,
      builtAreaType,
      landArea,
      coveredArea,
      carpetArea,
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
      const thirdPropertyData = {
        Fencing: fencing,
        Flooring: flooring,
        Furnished: furnished,
        BuiltAreaType: builtAreaType,
        LandArea: parseInt(landArea),
        CoveredArea:parseInt( coveredArea),
        CarpetArea: parseInt(carpetArea),
        AreaUnits: areaUnits,
      };
      console.log("thirdPropertyData", thirdPropertyData);
      const localStorageData = JSON.parse(
        sessionStorage.getItem("propertyData")
      );
      const newProjectData = { ...localStorageData, ...thirdPropertyData };
      sessionStorage.setItem("propertyData", JSON.stringify(newProjectData));
      setPropertyPageValue((prev) => prev + 1);
    } else {
      toast.error("Please fill in all required fields!");
    }
  };
  return (
    <>
    <div className={`flex justify-end ${Styles.continueBtn}`} >
    <ContinueButton modalSubmit={SubmitForm} />
    </div>
      <div className="grid gap-4 mb-4 sm:grid-cols-2">
        {/* Fencing */}
        <div>
          <label
            htmlFor="fencing"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
          >
            Fencing
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Fencing"
            required=""
            value={fencing.Fencing}
            disabled={true}
          />
          {fencingsData ? (
            <div
              className={`flex flex-wrap space-x-2 mt-4 ${
                fencingsData?.data?.length > 8 ? `${Styles.scrollable}` : ""
              }`}
            >
              {fencingsData?.data?.map((item) => (
                <button
                  key={item._id}
                  onClick={() =>
                    setFencing({
                      _id: item._id,
                      Fencing: item.Fencing,
                    })
                  }
                  className={` rounded text-white px-4 py-2 ${
                    Styles.optionButton
                  } ${
                    fencing._id === item._id
                      ? "bg-[#2a4acb] border-2 border-[#2a4acb]"
                      : "bg-[#6592d3]  border-2 border-[#6592d3]"
                  }`}
                >
                  {item.Fencing}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap space-x-2">
              {defaultOption.map((item, index) => (
                <button
                  key={index}
                  // onClick={() => handleFacingClick(item.value)}
                  className={` rounded text-white w-full  ${Styles.optionButton} bg-[#6592d3] }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Flooring */}
        <div>
          <label
            htmlFor="flooring"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
          >
            Flooring
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Flooring"
            required=""
            value={flooring.Flooring}
            disabled={true}
          />
          {flooringsData ? (
            <div
              className={`flex flex-wrap space-x-2 mt-4 ${
                flooringsData?.data?.length > 8 ? `${Styles.scrollable}` : ""
              }`}
            >
              {flooringsData?.data?.map((item) => (
                <button
                  key={item._id}
                  onClick={() =>
                    setFlooring({
                      _id: item._id,
                      Flooring: item.Flooring,
                    })
                  }
                  className={` rounded text-white px-4 py-2 ${
                    Styles.optionButton
                  } ${
                    flooring._id === item._id
                      ? "bg-[#2a4acb] border-2 border-[#2a4acb]"
                      : "bg-[#6592d3]  border-2 border-[#6592d3]"
                  }`}
                >
                  {item.Flooring}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap space-x-2">
              {defaultOption.map((item, index) => (
                <button
                  key={index}
                  // onClick={() => handleFacingClick(item.value)}
                  className={` rounded text-white w-full  ${Styles.optionButton} bg-[#6592d3] }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Furnished */}
        <div>
          <label
            htmlFor="furnished"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
          >
            Furnished
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Furnished"
            required=""
            value={furnished.Furnished}
            disabled={true}
          />
          {furnishedesData ? (
            <div
              className={`flex flex-wrap space-x-2 mt-4 ${
                furnishedesData?.data?.length > 8 ? `${Styles.scrollable}` : ""
              }`}
            >
              {furnishedesData?.data?.map((item) => (
                <button
                  key={item._id}
                  onClick={() =>
                    setFurnished({
                      _id: item._id,
                      Furnished: item.Furnished,
                    })
                  }
                  className={` rounded text-white px-4 py-2 ${
                    Styles.optionButton
                  } ${
                    furnished._id === item._id
                      ? "bg-[#2a4acb] border-2 border-[#2a4acb]"
                      : "bg-[#6592d3]  border-2 border-[#6592d3]"
                  }`}
                >
                  {item.Furnished}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap space-x-2">
              {defaultOption.map((item, index) => (
                <button
                  key={index}
                  // onClick={() => handleFacingClick(item.value)}
                  className={` rounded text-white w-full  ${Styles.optionButton} bg-[#6592d3] }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* BuiltAreaType */}
        <div>
          <label
            htmlFor="builtAreaType"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
          >
            Built Area Type
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Built Area Type"
            required=""
            value={builtAreaType.Type}
            disabled={true}
          />
          {builtAreaTypesData ? (
            <div
              className={`flex flex-wrap space-x-2 mt-4 ${
                builtAreaTypesData?.data?.length > 8
                  ? `${Styles.scrollable}`
                  : ""
              }`}
            >
              {builtAreaTypesData?.data?.map((item) => (
                <button
                  key={item._id}
                  onClick={() =>
                    setBuiltAreaType({
                      _id: item._id,
                      Type: item.Type,
                    })
                  }
                  className={` rounded text-white px-4 py-2 ${
                    Styles.optionButton
                  } ${
                    builtAreaType._id === item._id
                      ? "bg-[#2a4acb] border-2 border-[#2a4acb]"
                      : "bg-[#6592d3]  border-2 border-[#6592d3]"
                  }`}
                >
                  {item.Type}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap space-x-2">
              {defaultOption.map((item, index) => (
                <button
                  key={index}
                  // onClick={() => handleFacingClick(item.value)}
                  className={` rounded text-white w-full  ${Styles.optionButton} bg-[#6592d3] }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
        {/* LandArea */}
        <div>
          <label
            htmlFor="landArea"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
          >
            Land Area
          </label>
          <input
            type="number"
            name="landArea"
            id="landArea"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Land Area"
            value={landArea}
            onChange={(e) => setLandArea(e.target.value)}
          />
        </div>

        {/* CoveredArea */}
        <div>
          <label
            htmlFor="coveredArea"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
          >
            Covered Area
          </label>
          <input
            type="number"
            name="coveredArea"
            id="coveredArea"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Covered Area"
            value={coveredArea}
            onChange={(e) => setCoveredArea(e.target.value)}
          />
        </div>

        {/* CarpetArea */}
        <div>
          <label
            htmlFor="carpetArea"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
          >
            Carpet Area
          </label>
          <input
            type="number"
            name="carpetArea"
            id="carpetArea"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Carpet Area"
            value={carpetArea}
            onChange={(e) => setCarpetArea(e.target.value)}
          />
        </div>
        {/*  Area Unit */}
        <div>
          <label
            htmlFor="areaUnit"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
          >
            Area Unit
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Area Unit"
            required=""
            value={areaUnits.Unit}
            disabled={true}
          />
          {areaUnitData ? (
            <div
              className={`flex flex-wrap space-x-2 mt-4 ${
                areaUnitData?.data?.length > 8 ? `${Styles.scrollable}` : ""
              }`}
            >
              {areaUnitData?.data?.map((item) => (
                <button
                  key={item._id}
                  onClick={() =>
                    setAreaUnits({
                      _id: item._id,
                      Unit: item.Unit,
                    })
                  }
                  className={` rounded text-white px-4 py-2 ${
                    Styles.optionButton
                  } ${
                    areaUnits._id === item._id
                      ? "bg-[#2a4acb] border-2 border-[#2a4acb]"
                      : "bg-[#6592d3]  border-2 border-[#6592d3]"
                  }`}
                >
                  {item.Unit}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap space-x-2">
              {defaultOption.map((item, index) => (
                <button
                  key={index}
                  // onClick={() => handleFacingClick(item.value)}
                  className={` rounded text-white w-full  ${Styles.optionButton} bg-[#6592d3] }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        
        </div>
      </div>
      
    </>
  );
}

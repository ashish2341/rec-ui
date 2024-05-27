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

export default function PartFive({
  valueForNextfromSix,
  valueForNextPagefromSix,
}) {
  const [wallAndCeilingValues, setWallAndCeilingValues] = useState({
    Interior: "",
    Exterior: "",
    Kitchen: "",
    Toilets: "",
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
      setWallAndCeilingValues({
        Interior: sessionStoragePropertyData?.WallAndCeiling?.Interior || "",
        Exterior: sessionStoragePropertyData?.WallAndCeiling?.Exterior || "",
        Kitchen: sessionStoragePropertyData?.WallAndCeiling?.Kitchen || "",
        Toilets: sessionStoragePropertyData?.WallAndCeiling?.Toilets || "",
      });
    }
  }, []);
  const handleWallAndCeilingChange = (field, value) => {
    setWallAndCeilingValues((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };
  const SubmitForm = () => {
    let wallAndCeilingErrors = {};

    // Validate wallAndCeiling fields
    Object.keys(wallAndCeilingValues).forEach(field => {
      if (wallAndCeilingValues[field].trim() === '') {
        wallAndCeilingErrors[field] = 'Please fill all required fields of wall & Ceiling';
      }
    });

    if (Object.keys(wallAndCeilingErrors).length != 0) {
      toast.error("Please fill all required fields of wall & Ceiling.");
      return false;
    }
    const wallAndCeilingData = {
      
      WallAndCeiling:wallAndCeilingValues

    };
    console.log("wallAndCeilingData", wallAndCeilingData);
    const localStorageData = JSON.parse(sessionStorage.getItem("propertyData"));
    const newProjectData = { ...localStorageData, ...wallAndCeilingData };
    sessionStorage.setItem("propertyData", JSON.stringify(newProjectData));
      valueForNextfromSix(valueForNextPagefromSix + 1);
  };

  return (
    <>
      <div className={`flex justify-end ${Styles.continueBtn}`}>
        <ContinueButton modalSubmit={SubmitForm} />
      </div>

      <div className={`${Styles.featurebox} container mx-auto px-4 py-8`}>
        {/*  WallAndCeiling */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {" "}
            Wall and Ceiling Details
          </h2>
          <div className="grid gap-4 mb-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="Interior"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Interior
              </label>
              <input
                type="text"
                name="Interior"
                id="Interior"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Interior"
                value={wallAndCeilingValues.Interior}
                onChange={(e) =>
                  handleWallAndCeilingChange("Interior", e.target.value)
                }
              />
            </div>
            <div>
              <label
                htmlFor="Exterior"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Exterior
              </label>
              <input
                type="text"
                name="Exterior"
                id="Exterior"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Exterior"
                value={wallAndCeilingValues.Exterior}
                onChange={(e) =>
                  handleWallAndCeilingChange("Exterior", e.target.value)
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
                value={wallAndCeilingValues.Kitchen}
                onChange={(e) =>
                  handleWallAndCeilingChange("Kitchen", e.target.value)
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
                value={wallAndCeilingValues.Toilets}
                onChange={(e) =>
                  handleWallAndCeilingChange("Toilets", e.target.value)
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

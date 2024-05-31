"use client";

import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Styles from "../propertyAdd.module.css";
import PropertyBigButtons from "@/components/common/admin/propertyBigButton/propertyBigButtons";
export default function BasicDetailsForm({ valueForNext, valueForNextPage,activeButton,setBasisPagebuttonvalue }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [highlight, setHighlight] = useState("");
  // const [lokkingButton,setLookingButtton]=useState
  useEffect(() => {
    const sessionStoragePropertyData = JSON.parse(
      sessionStorage.getItem("propertyData")
    );

    console.log(
      "localStorageData from localstorage",
      sessionStoragePropertyData
    );
    if (sessionStoragePropertyData) {
      setTitle(sessionStoragePropertyData?.Titile || "");
      setDescription(sessionStoragePropertyData?.Description || "");
      setHighlight(sessionStoragePropertyData?.Highlight || "");
    }
  }, []);

  const SubmitForm = () => {
    // if (title === "") {
    //   toast.error("Title  is required.");
    //   return false;
    // }
    // if (description === "") {
    //   toast.error("Description is required.");
    //   return false;
    // }
    // if (highlight === "") {
    //   toast.error("Highlight is required.");
    //   return false;
    // }
    // const basicDetailsData = {
    //   Titile: title.trim(),
    //   Description: description.trim(),
    //   Highlight: highlight.trim(),
    // };
    // const updatedProjectData = {
    //   ...JSON.parse(sessionStorage.getItem("propertyData")),
    //   ...basicDetailsData,
    // };
    // sessionStorage.setItem("propertyData", JSON.stringify(updatedProjectData));

    valueForNext(valueForNextPage + 1);
  };

  const handelTitleChange = (event) => {
    setTitle(() => event.target.value);
  };
  const handelDescriptionChange = (event) => {
    setDescription(() => event.target.value);
  };
  const handelHighlightChange = (event) => {
    setHighlight(() => event.target.value);
  };

const activeBtnValue=(value)=>{
  setBasisPagebuttonvalue(value)
}
const propertyTypeArray=["Residential","Commercial"]
const lookingToArray=["Rent","Sale"]
  return (
    <>
      <div>
        <div className="flex justify-end w-full">
          <button
            onClick={SubmitForm}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5"
          >
            Next
          </button>
        </div>
        <form>
          <div className="grid gap-4 mb-4 sm:grid-cols-1">
            <div className="mb-4">
              <label
                htmlFor="PropertyType"
                className="block mb-2 text-lg font-medium font-bold text-gray-900 dark:text-white required"
              >
                Property Type
              </label>
              <PropertyBigButtons buttonArray={propertyTypeArray} activeButtonvalue={activeButton} handelValue={activeBtnValue}/>
            </div>
            <div className="mb-4">
            <label
                htmlFor="LookingTo"
                className="block mb-2 text-lg font-medium font-bold text-gray-900 dark:text-white required"
              >
                Looking To
              </label>
              <PropertyBigButtons buttonArray={lookingToArray} activeButtonvalue={activeButton} handelValue={activeBtnValue}/>
            </div>
            <div>
              <label
                htmlFor="highlight"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Highlight
              </label>
              <textarea
                type="text"
                name="highlight"
                id="highlight"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                value={highlight}
                onChange={handelHighlightChange}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

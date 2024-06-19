"use client";
import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import { API_BASE_URL_FOR_MASTER,currentPage } from "@/utils/constants";
import useFetch from "@/customHooks/useFetch";
import { ImageString } from "@/api-functions/auth/authAction";
import { GetBuilderApi } from "@/api-functions/builder/getBuilder";
import Cookies from "js-cookie";
import { FormatNumber } from "@/utils/commonHelperFn";
import Styles from "../propertypage.module.css";
import ContinueButton from "@/components/common/propertyContinueButton/continueButton";
import NextButton from "@/components/common/admin/nextButton/nextButton";
import EditedTag from "@/components/common/admin/editedTag/editedTag";

export default function FacilitiesPage({
  valueForNextfromSix,
  valueForNextPagefromSix,
  setPropertyBackvalue,editedKeysfromMain,
  pageNamefromMain,
}) {
  const sessionStoragePropertyData = JSON.parse(
    sessionStorage.getItem("EditPropertyData")
  );
  const propertTypWithSubTypeValue =
    sessionStoragePropertyData?.PropertySubtype.Name || "";
  const propertTypeValue = sessionStoragePropertyData?.ProeprtyType || "";
  const PropertyForValue = sessionStoragePropertyData?.ProeprtyFor || "";
  // fetching Data for byBank
  const { data: byBankData } = useFetch(`${API_BASE_URL_FOR_MASTER}/banks`);
  const defaultOption = [{ value: "", label: "no data found" }];

  const [stairCase, setStairCase] = useState("");
  const [passengerLifts, setPassengerLifts] = useState("");
  const [serviceLifts, setServiceLifts] = useState("");
  const [publicParking, setPublicParking] = useState("");
  const [privateParking, setPrivateParking] = useState("");
  const [publicWashroom, setPublicWashroom] = useState("");
  const [privateWashroom, setPrivateWashroom] = useState("");
  useEffect(() => {
    // Retrieve data from localStorage
    const sessionStoragePropertyData = JSON.parse(
      sessionStorage.getItem("EditPropertyData")
    );

    // Update state values if data exists in localStorage
    if (sessionStoragePropertyData) {
      setPassengerLifts(sessionStoragePropertyData?.passengerLifts || null);
      setPrivateParking(sessionStoragePropertyData?.PrivateParking || null);
      setPrivateWashroom(sessionStoragePropertyData?.PrivateWashroom || null);
      setPublicParking(sessionStoragePropertyData?.PublicParking || null);
      setServiceLifts(sessionStoragePropertyData?.ServiceLifts || null);
      setStairCase(sessionStoragePropertyData?.Staircase  || null);
      setPublicWashroom(sessionStoragePropertyData?.PublicWashroom || null);
    }
  }, []);

  const checkRequiredFields = () => {
    if (propertTypWithSubTypeValue == "Office") {
      var requiredFields = [passengerLifts, serviceLifts];
    }
    if (
      propertTypeValue == "Commercial" &&
      propertTypWithSubTypeValue != "Office"
    ) {
      var requiredFields = [publicWashroom, privateWashroom];
    }
    // Check if any required field is empty
    const isEmpty = requiredFields.some(
      (field) => field === "" || field === null || field === undefined
    );

    return !isEmpty;
  };
  const SubmitForm = () => {
    const allFieldsFilled = checkRequiredFields();
    
    if (allFieldsFilled) {
      const sixthPropertyData = {
        PublicParking: publicParking ? publicParking :null,
        PrivateParking: privateParking ? privateParking :null,
        PublicWashroom: publicWashroom ? publicWashroom :null,
        PrivateWashroom: privateWashroom ? privateWashroom :null,
      };
      if (propertTypWithSubTypeValue == "Office") {
        (sixthPropertyData.PublicWashroom = null),
          (sixthPropertyData.PrivateWashroom = null),
          (sixthPropertyData.Staircase = stairCase ? stairCase :null),
          (sixthPropertyData.ServiceLifts = serviceLifts ? serviceLifts :null),
          (sixthPropertyData.passengerLifts = passengerLifts ? passengerLifts :null);
      }
    
      console.log("sixthPropertyData", sixthPropertyData);
      const localStorageData = JSON.parse(
        sessionStorage.getItem("EditPropertyData")
      );
      const newProjectData = { ...localStorageData, ...sixthPropertyData };
      sessionStorage.setItem("EditPropertyData", JSON.stringify(newProjectData));
      valueForNextfromSix(valueForNextPagefromSix + 1);
      setPropertyBackvalue((prev) => prev - 1);
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
  return (
    <>
      

      {propertTypWithSubTypeValue == "Office" && (
        <>
          <h3 className="block mb-2 text-md font-lg underline font-bold text-gray-500 dark:text-white">
            LIFTS & STAIRCASES
          </h3>
          <div className="grid gap-4 mb-8 sm:grid-cols-2">
            {/*     No. of StairCase */}
            <div>
              <label
                htmlFor="loanSince"
                className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white"
              >
                No. of StairCase
                { (editedKeysfromMain?.includes("Staircase") && pageNamefromMain===currentPage) && (<EditedTag/>) } 

              </label>
              <input
                type="number"
                name="stairCase"
                id="stairCase"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="No. of StairCase"
                value={stairCase}
                onChange={(e) => setStairCase(e.target.value)}
              />
            </div>
            {/*    Passengers Lifts */}
            <div>
              <label
                htmlFor="passengerLifts"
                className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white required"
              >
                Passengers Lifts
                { (editedKeysfromMain?.includes("passengerLifts") && pageNamefromMain===currentPage) && (<EditedTag/>) } 

              </label>
              <input
                type="number"
                name="passengerLifts"
                id="passengerLifts"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=" Passengers Lifts"
                value={passengerLifts}
                onChange={(e) => setPassengerLifts(e.target.value)}
              />
            </div>
            {/*    Passengers Lifts */}
            <div>
              <label
                htmlFor="loanTill"
                className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white required"
              >
                Service Lifts
                { (editedKeysfromMain?.includes("ServiceLifts") && pageNamefromMain===currentPage) && (<EditedTag/>) } 

              </label>
              <input
                type="number"
                name="serviceLifts"
                id="serviceLifts"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=" Service Lifts"
                value={serviceLifts}
                onChange={(e) => setServiceLifts(e.target.value)}
              />
            </div>
          </div>
        </>
      )}

      {propertTypeValue == "Commercial" &&
        propertTypWithSubTypeValue != "Plot" && (
          <>
            <h3 className="block mb-2 text-md font-lg underline font-bold text-gray-500 dark:text-white">
              PARKING
            </h3>
            <div className="grid gap-4 mb-8 sm:grid-cols-2">
              {/*    publicParking */}
              <div>
                <label
                  htmlFor="publicParking"
                  className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white"
                >
                  Public Parking
                  { (editedKeysfromMain?.includes("PublicParking") && pageNamefromMain===currentPage) && (<EditedTag/>) } 

                </label>
                <input
                  type="number"
                  name="publicParking"
                  id="publicParking"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Public Parking"
                  value={publicParking}
                  onChange={(e) => setPublicParking(e.target.value)}
                />
              </div>
              {/*    privateParking */}
              <div>
                <label
                  htmlFor="privateParking"
                  className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white"
                >
                  Private Parking
                  { (editedKeysfromMain?.includes("PrivateParking") && pageNamefromMain===currentPage) && (<EditedTag/>) } 

                </label>
                <input
                  type="number"
                  name="privateParking"
                  id="privateParking"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=" Private Parking"
                  value={privateParking}
                  onChange={(e) => setPrivateParking(e.target.value)}
                />
              </div>
            </div>
            {propertTypWithSubTypeValue != "Office" && (
              <>
                <h3 className="block mb-2 text-md font-lgv underline font-bold text-gray-500 dark:text-white">
                  WASHROOM
                </h3>
                <div className="grid gap-4 mb-8 sm:grid-cols-2">
                  {/*     Public Washroom */}
                  <div>
                    <label
                      htmlFor="publicWashroom"
                      className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white required"
                    >
                      Public Washroom
                      { (editedKeysfromMain?.includes("PublicWashroom") && pageNamefromMain===currentPage) && (<EditedTag/>) } 

                    </label>
                    <input
                      type="number"
                      name="publicWashroom"
                      id="publicWashroom"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder=" Public Washroom"
                      value={publicWashroom}
                      onChange={(e) => setPublicWashroom(e.target.value)}
                    />
                  </div>
                  {/*     Private Washroom */}
                  <div>
                    <label
                      htmlFor="privateParking"
                      className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white required"
                    >
                      Private Washroom
                      { (editedKeysfromMain?.includes("PrivateWashroom") && pageNamefromMain===currentPage) && (<EditedTag/>) } 

                    </label>
                    <input
                      type="number"
                      name="privateWashroom"
                      id="privateWashroom"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="  Private Washroom"
                      value={privateWashroom}
                      onChange={(e) => setPrivateWashroom(e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}
          </>
        )}
                <NextButton onSubmit={SubmitForm} butonSubName={"add Amenity Details"}/>

    </>
  );
}

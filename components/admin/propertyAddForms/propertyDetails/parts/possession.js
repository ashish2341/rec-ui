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

export default function PossessionDetailsPage({
  setPropertyPageValue,
  valueForNextfromSix,
  valueForNextPagefromSix,
  setPropertyBackvalue,
}) {
  // fetching Data for posessionStatusData
  const { data: posessionStatusData } = useFetch(
    `${API_BASE_URL_FOR_MASTER}/possession`
  );
  console.log("posessionStatusData", posessionStatusData);

  const sessionStoragePropertyData = JSON.parse(
    sessionStorage.getItem("propertyData")
  );
  const propertTypWithSubTypeValue =
    sessionStoragePropertyData?.PropertyTypeWithSubtype.Name || "";
  const propertTypeValue = sessionStoragePropertyData?.PropertyType || "";
  const PropertyForValue = sessionStoragePropertyData?.PropertyFor || "";
  const PropertyStatusValue = sessionStoragePropertyData?.PropertyStatus || "";

  const [posessionStatus, setPosessionStatus] = useState("");
  const [posessionDate, setPosessionDate] = useState("");
  const [brochure, setBrochure] = useState("");
  const brochureInputRef = useRef(null);
  const [ageofProperty, setAgeOfProperty] = useState("");

  let possessionStatusArray = { data: "" };
  if (posessionStatusData && propertTypWithSubTypeValue == "Plot") {
    possessionStatusArray.data = posessionStatusData?.data?.filter(
      (item) => item.Type == "Plot"
    );
  } else {
    possessionStatusArray.data = posessionStatusData?.data?.filter(
      (item) => item.Type != "Plot"
    );
  }

  console.log("possessionStatusArray", possessionStatusArray);
  useEffect(() => {
    // Retrieve data from localStorage
    const sessionStoragePropertyData = JSON.parse(
      sessionStorage.getItem("propertyData")
    );

    // Update state values if data exists in localStorage
    if (sessionStoragePropertyData) {
      setPosessionStatus(sessionStoragePropertyData?.PosessionStatus || "");
      setPosessionDate(sessionStoragePropertyData?.PosessionDate || "");
      setBrochure(sessionStoragePropertyData?.Brochure || "");
      setAgeOfProperty(sessionStoragePropertyData?.AgeOfProperty || "");
    }
  }, []);
  const handleDocumentChange = async (event) => {
    const acceptedFileTypes = [
      "application/pdf",
      "application/doc",
      "application/.docx",
      "application/ .txt",
    ];

    const file = event.target.files[0]; // Get the first file only
    const formData = new FormData();
    formData.append("profilePic", file);
    console.log("image File", file);

    // Check file type
    if (!acceptedFileTypes.includes(file.type)) {
      toast.error(
        "Invalid image type. Please upload only JPEG or PNG or JPG files."
      );
      if (brochureInputRef.current) {
        brochureInputRef.current.value = "";
      }
    } else {
      let res = await ImageString(formData);
      console.log("image resPonse Data=>", res);
      if (res.successMessage) {
        // router.push("/dashboard");
        console.log("Image Response", res.successMessage.imageUrl);
        setBrochure(res.successMessage.imageUrl);
      } else {
        toast.error(res.errMessage);
        return;
      }
    }
  };

  const checkRequiredFields = () => {
    var requiredFields = [posessionStatus, posessionDate, brochure];
    if (sessionStoragePropertyData?.PropertyStatus && PropertyStatusValue.Status != "Under Contruction") {
      var requiredFields = [
        posessionStatus,
        posessionDate,
        brochure,
        ageofProperty,
      ];
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
      const fifthPropertyData = {
        PosessionStatus: posessionStatus,
        PosessionDate: posessionDate,
        Brochure: brochure,
      };
      if (PropertyStatusValue.Status != "Under Contruction") {
        fifthPropertyData.AgeOfProperty = ageofProperty;
      }
      console.log("fifthPropertyData", fifthPropertyData);
      const localStorageData = JSON.parse(
        sessionStorage.getItem("propertyData")
      );
      const newProjectData = { ...localStorageData, ...fifthPropertyData };
      sessionStorage.setItem("propertyData", JSON.stringify(newProjectData));
      console.log("propertTypeValue", propertTypeValue);
      if (
        propertTypeValue == "Commercial" &&
        propertTypWithSubTypeValue != "Plot"
      ) {
        setPropertyPageValue((prev) => prev + 1);
      } else {
        valueForNextfromSix(valueForNextPagefromSix + 1);
        setPropertyBackvalue((prev) => prev - 1);
      }
    } else {
      toast.error("Please fill in all required fields!");
    }
  };

  return (
    <>
      <div className={`flex justify-end ${Styles.continueBtn}`}>
        <ContinueButton modalSubmit={SubmitForm} />
      </div>
      <div className="grid gap-4 mb-4 sm:grid-cols-1">
        {/* Posession Status*/}
        {possessionStatusArray &&
          posessionStatusData &&
          propertTypWithSubTypeValue &&
          propertTypWithSubTypeValue == "Plot" && (
            <ApiButtons
              itemArray={possessionStatusArray}
              stateItem={posessionStatus}
              labelName={"Possession Status"}
              ValueName={"Possession"}
              changeState={setPosessionStatus}
            />
          )}
        {/* {posessionStatus == "Infuture" && (
          <div>
            <label
              htmlFor="posessionDate"
              className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white required"
            >
              Posession Date
            </label>
            <input
              type="date"
              name="posessionDate"
              id="posessionDate"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={posessionDate}
              onChange={(e) => setPosessionDate(e.target.value)}
            />
          </div>
        )} */}
        {possessionStatusArray &&
          posessionStatusData &&
          propertTypWithSubTypeValue != "Plot" && (
            <ApiButtons
              itemArray={possessionStatusArray}
              stateItem={posessionStatus}
              labelName={"Possession Status"}
              ValueName={"Possession"}
              changeState={setPosessionStatus}
            />
          )}

        {/* PosessionDate */}

        <div className="grid gap-4 mb-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="posessionDate"
              className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white required"
            >
              Available From
            </label>
            <input
              type="date"
              name="posessionDate"
              id="posessionDate"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={posessionDate}
              onChange={(e) => setPosessionDate(e.target.value)}
            />
          </div>
          {PropertyStatusValue &&
            PropertyStatusValue?.Status != "Under Contruction" &&
            propertTypWithSubTypeValue &&
            propertTypWithSubTypeValue != "Plot" && (
              <div>
                <label
                  htmlFor="ageofProperty"
                  className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white required"
                >
                  Age of Property
                </label>
                <input
                  type="number"
                  name="ageofProperty"
                  id="ageofProperty"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Age of Property"
                  value={ageofProperty}
                  onChange={(e) => setAgeOfProperty(e.target.value)}
                />
              </div>
            )}
        </div>

        {/* Brochure */}
        <div>
          <label
            htmlFor="document"
            className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white required"
          >
            Brochure
          </label>
          <input
            type="file"
            name="Document"
            id="document"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            multiple // Allow multiple file selection
            accept=".pdf, .doc, .docx, .txt" // Specify accepted file types
            onChange={handleDocumentChange}
            ref={brochureInputRef}
          />
          <div>
            {brochure ? (
              <div>
                <div className="ml-2 mt-3 underline font-bold">
                  <h3>Selected Brochure</h3>
                </div>
                <div className="flex flex-wrap relative mt-3">
                  <div className="mr-4 mb-4 relative">
                    <iframe
                      src={brochure}
                      className="h-48 w-64 border border-black rounded-lg"
                    />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

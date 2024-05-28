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
import styles from "../propertypage.module.css"
export default function PartOne({
  setPropertyPageValue,
  setPropertyBackvalue,
}) {
  const roleData = Cookies.get("roles") ?? "";
  const name = Cookies.get("name");
  const roles = roleData && JSON.parse(roleData);
  const userId = Cookies.get("userId");
  // fetching Data for facing
  const {
    data: facingData,
    loading,
    error,
  } = useFetch(`${API_BASE_URL_FOR_MASTER}/facing`);
  // console.log("facingData", facingData);

  // fetching Data for propertyTypeData
  const { data: propertyTypeData } = useFetch(
    `${API_BASE_URL_FOR_MASTER}/propertyWithSubTypes`
  );
  // console.log("propertyTypeData", propertyTypeData);

  const [facing, setFacing] = useState("");
  const [isEnabled, setIsEnabled] = useState("");
  const [isExclusive, setIsExclusive] = useState("");
  const [isFeatured, setIsFeatured] = useState("");
  const [isNew, setIsNew] = useState("");
  const [reraNumber, setReraNumber] = useState("");
  const [propertyFor, setPropertyFor] = useState("");
  const [propertyTypeWithSubtype, setPropertyTypeWithSubtype] = useState("");
  const [builderData, setBuilderData] = useState("");
  const [builderName, setBuilderName] = useState("");

  const defaultOption = [{ value: "", label: "no data found" }];
  const propertyForData = [
    { name: "Rent", value: "Rent" },
    { name: "Sale", value: "Sale" },
    { name: "Lease", value: "Lease" },
  ];
  useEffect(() => {
    getAllBuilder();
  }, []);

  const getAllBuilder = async () => {
    let builder = await GetBuilderApi();
    if (builder?.resData?.success == true) {
      setBuilderData(builder?.resData);
      toast.success(builder?.resData?.message);
      return false;
    } else {
      toast.error(builder?.errMessage);
      return false;
    }
  };
  useEffect(() => {
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
      console.log(
        "sessionStoragePropertyData?.Facing  ",
        sessionStoragePropertyData?.Facing.map((item)=>{
          return item
        })
      );
      console.log(
        "sessionStoragePropertyData?.Brochure",
        sessionStoragePropertyData?.Brochure
      );
      // setPropertyType(sessionStoragePropertyData.PropertyType || "");
      setFacing(sessionStoragePropertyData?.Facing || []);
      setPropertyFor(sessionStoragePropertyData?.ProeprtyFor || "");
      setIsExclusive(
        sessionStoragePropertyData?.IsExclusive === true
          ? true
          : sessionStoragePropertyData?.IsExclusive === undefined
          ? null
          : false
      );

      setIsNew(
        sessionStoragePropertyData?.IsNew === true
          ? true
          : sessionStoragePropertyData?.IsNew === undefined
          ? null
          : false
      );

      if (roles.includes("Admin")) {
        setIsEnabled(
          sessionStoragePropertyData?.IsEnabled === true
            ? true
            : sessionStoragePropertyData?.IsEnabled === undefined
            ? true
            : false
        );
        setIsFeatured(
          sessionStoragePropertyData?.IsFeatured === true
            ? true
            : sessionStoragePropertyData?.IsFeatured === undefined
            ? null
            : false
        );
         setBuilderName(sessionStoragePropertyData?.Builder || "");
      } else {
        setIsEnabled(
          sessionStoragePropertyData?.IsEnabled === false
            ? false
            : sessionStoragePropertyData?.IsEnabled === undefined
            ? false
            : false
        );
        setIsFeatured(
          sessionStoragePropertyData?.IsFeatured === false
            ? false
            : sessionStoragePropertyData?.IsFeatured === undefined
            ? false
            : false
        );
        // setBuilderName(sessionStoragePropertyData?.Builder || "");
      }
    }
    setReraNumber(sessionStoragePropertyData?.ReraNumber || "");
    setPropertyTypeWithSubtype(
      sessionStoragePropertyData?.PropertyType || ""
    );
  }, []);
  const handelIsEnabled = (e) => {
    console.log("Is Enabled:", e.target.value === "true");
    setIsEnabled(e.target.value === "true");
  };

  const handelIsFeatured = (e) => {
    console.log("Is Featured:", e.target.value === "true");
    setIsFeatured(e.target.value === "true");
  };

  const handelIsNew = (e) => {
    console.log("Is New:", e.target.value === "true");
    setIsNew(e.target.value === "true");
  };

  const handelIsExclusive = (e) => {
    console.log("Is Exclusive:", e.target.value === "true");
    setIsExclusive(e.target.value === "true");
  };

  const handlePropertyClick = (value) => {
    setPropertyFor(value);
  };
  const handleFacingClick = (value, label) => {
    setFacing([{ _id: value, Facing: label }]);
  };
  const handelReraNumber = (e) => {
    console.log("Rera Number:", e.target.value);
    setReraNumber(e.target.value);
  };
  const checkRequiredFields = () => {
    const requiredFields = [
      facing,
      isExclusive,
      isNew,
      reraNumber,
      propertyFor,
      propertyTypeWithSubtype,
      // builderName
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
      const firstPropertyData = {
        Facing: facing,
        IsEnabled: isEnabled,
        IsExclusive: isExclusive,
        IsFeatured: isFeatured,
        IsNew: isNew,
        ProeprtyFor: propertyFor,
        PropertyType: propertyTypeWithSubtype,
        ReraNumber: reraNumber,
        
      };
      if (roles.includes("Admin")) {
        firstPropertyData.Builder = builderName;
      }
      console.log("firstPropertyData", firstPropertyData);
      const localStorageData = JSON.parse(
        sessionStorage.getItem("EditPropertyData")
      );
      const newProjectData = { ...localStorageData, ...firstPropertyData };
      sessionStorage.setItem("EditPropertyData", JSON.stringify(newProjectData));
      setPropertyPageValue((prev) => prev + 1);
      setPropertyBackvalue((prev) => prev + 1);
    } else {
      toast.error("Please fill in all required fields!");
    }
  };
  return (
    <>
    <div className={`flex justify-end `} >
    <ContinueButton modalSubmit={SubmitForm} />
    </div>
    
      <div className="grid gap-4 mb-4 sm:grid-cols-2">
        {/*  Property For */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required">
            Property For
          </label>
          <div
            className={`flex flex-wrap space-x-2 ${
              propertyForData.length > 8 ? `${Styles.scrollable}` : ""
            }`}
          >
            {propertyForData.map((property) => (
              <button
                key={property.value}
                onClick={() => handlePropertyClick(property.value)}
                className={` rounded text-white px-4 py-2 ${
                  Styles.optionButton
                } ${
                  propertyFor === property.value
                    ? "bg-[#2a4acb] border-2 border-[#2a4acb]"
                    : "bg-[#6592d3]  border-2 border-[#6592d3]"
                }`}
              >
                {property.name}
              </button>
            ))}
          </div>
        </div>
        {/*Facing  */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required">
            Facing
          </label>
          {facingData ? (
            <div
              className={`flex flex-wrap space-x-2 ${
                facingData?.data?.length > 8 ? `${Styles.scrollable}` : ""
              }`}
            >
              {facingData?.data?.map((item) => (
                <button
                  key={item._id}
                  onClick={() => handleFacingClick(item._id, item.Facing)}
                  className={` rounded text-white px-4 py-2 ${
                    Styles.optionButton
                  } ${
                    facing.some(
                      (selectedItem) => selectedItem._id === item._id
                    )
                      ? "bg-[#2a4acb] border-2 border-[#2a4acb]"
                      : "bg-[#6592d3]  border-2 border-[#6592d3]"
                  }`}
                >
                  {item.Facing}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap space-x-2">
             <h1 className={`${styles.noDataHead}`}>No Data Found</h1>
            </div>
          )}
        </div>
        

        {/* Is Enabled */}
        {roles.includes("Admin") && (
          <div>
            <label
              htmlFor="isEnabled"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
            >
              Is Enabled
            </label>
            <input
              type="radio"
              name="isEnabled"
              id="isEnabled"
              value="true"
              required=""
              checked={isEnabled == true}
              onChange={handelIsEnabled}
            />
            <label htmlFor="isEnabled" className="mr-3 ml-2">
              Yes
            </label>
            <input
              type="radio"
              name="isEnabled"
              id="isEnabled"
              value="false"
              required=""
              checked={isEnabled == false}
              onChange={handelIsEnabled}
              className="form-radio h-5 w-5 text-red-600"
            />
            <label htmlFor="isEnabled" className="ml-2">
              No
            </label>
          </div>
        )}

        {/*  Is Exclusive*/}
        <div>
          <label
            htmlFor="isExclusive"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
          >
            Is Exclusive
          </label>
          <input
            type="radio"
            name="isExclusive"
            id="isExclusive"
            value="true"
            required=""
            checked={isExclusive == true}
            onChange={handelIsExclusive}
          />
          <label htmlFor="isExclusive" className="mr-3 ml-2">
            Yes
          </label>
          <input
            type="radio"
            name="isExclusive"
            id="isExclusive"
            value="false"
            required=""
            checked={isExclusive == false}
            onChange={handelIsExclusive}
            className="form-radio h-5 w-5 text-red-600"
          />
          <label htmlFor="isExclusive" className="ml-2">
            No
          </label>
        </div>
        {/*  Is Featured*/}
        {roles.includes("Admin") && (
          <div>
            <label
              htmlFor="isFeatured"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
            >
              Is Featured
            </label>
            <input
              type="radio"
              name="isFeatured"
              id="isFeatured"
              value="true"
              required=""
              checked={isFeatured == true}
              onChange={handelIsFeatured}
            />
            <label htmlFor="isFeatured" className="mr-3 ml-2">
              Yes
            </label>
            <input
              type="radio"
              name="isFeatured"
              id="isFeatured"
              value="false"
              required=""
              checked={isFeatured == false}
              onChange={handelIsFeatured}
              className="form-radio h-5 w-5 text-red-600"
            />
            <label htmlFor="isFeatured" className="ml-2">
              No
            </label>
          </div>
        )}

        {/*  Is New*/}
        <div>
          <label
            htmlFor="isNew"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
          >
            Is New
          </label>
          <input
            type="radio"
            name="isNew"
            id="isNew"
            value="true"
            required=""
            checked={isNew == true}
            onChange={handelIsNew}
          />
          <label htmlFor="isNew" className="mr-3 ml-2">
            Yes
          </label>
          <input
            type="radio"
            name="isNew"
            id="isNew"
            value="false"
            required=""
            checked={isNew == false}
            onChange={handelIsNew}
            className="form-radio h-5 w-5 text-red-600"
          />
          <label htmlFor="isNew" className="ml-2">
            No
          </label>
        </div>
        {/*Rera Number  */}
        <div>
          <label
            htmlFor="reraNumber"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
          >
            Rera Number
          </label>
          <input
            type="text"
            name="reraNumber"
            id="reraNumber"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="RERA Number"
            required=""
            value={reraNumber}
            onChange={handelReraNumber}
          />
        </div>

        {/* Property with subtypes */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required">
            Property Type
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Property Type"
            required=""
            value={propertyTypeWithSubtype.Type}
            disabled={true}
          />
          {propertyTypeData ? (
            <div
              className={`flex flex-wrap space-x-2 mt-4 ${
                propertyTypeData?.data?.length > 8 ? `${Styles.scrollable}` : ""
              }`}
            >
              {propertyTypeData?.data?.map((item) => (
                <button
                  key={item._id}
                  onClick={() =>
                    setPropertyTypeWithSubtype({
                      _id: item._id,
                      Type: item.Type,
                    })
                  }
                  className={` rounded text-white px-4 py-2 ${
                    Styles.optionButton
                  } ${
                    propertyTypeWithSubtype._id === item._id
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
             <h1 className={`${styles.noDataHead}`}>No Data Found</h1>
            </div>
          )}
        </div>
        {/* BuilderData */}
        {roles.includes("Admin") && (
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required">
              Builder Name
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Builder Name"
              required=""
              value={builderName.Name}
              disabled={true}
            />
            {builderData ? (
              <div
                className={`flex flex-wrap space-x-2 mt-4 ${
                  builderData?.data?.length > 8
                    ? `${Styles.scrollable}`
                    : ""
                }`}
              >
                {builderData?.data?.map((item) => (
                  <button
                    key={item._id}
                    onClick={() =>
                      setBuilderName({
                        _id: item._id,
                        Name: item.Name,
                      })
                    }
                    className={` rounded text-white px-4 py-2 ${
                      Styles.optionButton
                    } ${
                      builderName._id === item._id
                        ? "bg-[#2a4acb] border-2 border-[#2a4acb]"
                        : "bg-[#6592d3]  border-2 border-[#6592d3]"
                    }`}
                  >
                    {item.Name}
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap space-x-2">
              <h1 className={`${styles.noDataHead}`}>No Data Found</h1>
             </div>
            )}
          </div>
        )}
      </div>
      
    </>
  );
}

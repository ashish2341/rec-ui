"use client";

import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Styles from "../propertyAdd.module.css";
import PropertyBigButtons from "@/components/common/admin/propertyBigButton/propertyBigButtons";
import ApiButtons from "@/components/common/admin/propertyapiButtons/ApiButtons";
import { API_BASE_URL_FOR_MASTER } from "@/utils/constants";
import useFetch from "@/customHooks/useFetch";
import Cookies from "js-cookie";
export default function BasicDetailsForm({ valueForNext, valueForNextPage }) {
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
  const { data: propertySubTypeData } = useFetch(
    `${API_BASE_URL_FOR_MASTER}/propertyWithSubTypes`
  );


 
  const [propertyTypeWithSubtype, setPropertyTypeWithSubtype] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [Propertyfor, setPropertyfor] = useState("Sell");
  const [facing, setFacing] = useState("");
  const [isEnabled, setIsEnabled] = useState( true );
  const [isFeatured, setIsFeatured] = useState( true);
  const [propertTypWithSubTypeValue, setPropertTypWithSubTypeValue] = useState("");

  const propertyTypeArray = ["Residential", "Commercial"];
  const lookingToArray = ["Sell"];
  const IsEnabledArray = [true, false];
  const IsFeaturedArray = [true, false];
  let propertySubTypeArray ={data:""};
  if(propertySubTypeData){
    const newpropertySubTypeArray=propertySubTypeData?.data?.filter(item=>item.Type=="Residential")
    
  }
  
  if (propertySubTypeData &&
    Propertyfor &&
    propertyType &&
    Propertyfor == "Sell" &&
    propertyType == "Residential"
  ) {
    propertySubTypeArray.data=propertySubTypeData?.data?.filter(item=>item.Type=="Residential")
   
  }
  if (propertySubTypeData &&
    Propertyfor.length > 0 &&
    propertyType.length > 0 &&
    (Propertyfor == "Rent" || Propertyfor == "Sell") &&
    propertyType == "Commercial"
  ) {
    propertySubTypeArray.data=propertySubTypeData?.data?.filter(item=>item.Type=="Commercial")
    
  }
  
  useEffect(()=>{
   
    if(propertyTypeWithSubtype.Name != propertTypWithSubTypeValue ){
      setTitle("");
      setDescription("");
      setFacing("");
      if (roles.includes("Admin")) {
        setIsEnabled(true)
        setIsFeatured(true)
      }
    }
  },[propertyTypeWithSubtype])
  useEffect(() => {
    const sessionStoragePropertyData = JSON.parse(
      sessionStorage.getItem("propertyData")
    );

    if (sessionStoragePropertyData) {
   
      setPropertyTypeWithSubtype(
        sessionStoragePropertyData?.PropertyTypeWithSubtype || ""
      );
      setTitle(sessionStoragePropertyData?.Titile || "");
      setDescription(sessionStoragePropertyData?.Description || "");
      setPropertyType(sessionStoragePropertyData?.PropertyType || "");
      setPropertyfor(sessionStoragePropertyData?.PropertyFor || "Sell");
      setPropertTypWithSubTypeValue(
        sessionStoragePropertyData?.PropertyTypeWithSubtype?.Name || ""
      );
      setFacing(sessionStoragePropertyData?.Facing || "");
      if (roles.includes("Admin")) {
        setIsEnabled(
          sessionStoragePropertyData?.IsEnabled === true
            ? true
            : sessionStoragePropertyData?.IsEnabled === undefined
            ? true
            : sessionStoragePropertyData?.IsEnabled === ""
            ? true
            : false
        );
        setIsFeatured(
          sessionStoragePropertyData?.IsFeatured === true
            ? true
            : sessionStoragePropertyData?.IsFeatured === undefined
            ? true
            : sessionStoragePropertyData?.IsFeatured === ""
            ? true
            : false
        );
      } else {
        setIsEnabled(
          sessionStoragePropertyData?.IsEnabled === true
          ? true
          : sessionStoragePropertyData?.IsEnabled === undefined
          ? false
          : sessionStoragePropertyData?.IsEnabled === ""
          ? false
          : false
        );
        setIsFeatured(
          sessionStoragePropertyData?.IsFeatured === true
          ? true
          : sessionStoragePropertyData?.IsFeatured === undefined
          ? false
          : sessionStoragePropertyData?.IsFeatured === ""
          ? false
          : false
        );
      }
    }
  }, []);
  const checkRequiredFields = () => {
    var requiredFields = [
      title,
      description,
      propertyType,
      Propertyfor,
      facing,
      isEnabled,
      isFeatured,
      propertyTypeWithSubtype,
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
      const basicDetailsData = {
        Titile: title,
        Description: description,
        PropertyType: propertyType,
        PropertyFor: Propertyfor,
        Facing: facing,
        IsEnabled: isEnabled,
        IsFeatured: isFeatured,
        PropertyTypeWithSubtype: propertyTypeWithSubtype,
      };
      if(roles.includes("Developer")){
        basicDetailsData. IsEnabled= false,
        basicDetailsData. IsFeatured= false;
      }
      if((propertTypWithSubTypeValue )&& (propertTypWithSubTypeValue != propertyTypeWithSubtype?.Name)){
            sessionStorage.removeItem("propertyData")
      }
      
      const updatedProjectData = {
        ...JSON.parse(sessionStorage.getItem("propertyData")),
        ...basicDetailsData,
      };
      sessionStorage.setItem(
        "propertyData",
        JSON.stringify(updatedProjectData)
      );

      valueForNext(valueForNextPage + 1);
    } else {
      toast.error("Please fill in all required fields!");
    }
  };

  const handelTitleChange = (event) => {
    setTitle(() => event.target.value);
  };
  const handelDescriptionChange = (event) => {
    setDescription(() => event.target.value);
  };
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
            <div className="grid gap-4 sm:grid-cols-2">
              <PropertyBigButtons
                labelName={"Property Type"}
                itemArray={propertyTypeArray}
                activeBtnvalue={propertyType}
                changeState={setPropertyType}
              />

              <PropertyBigButtons
                labelName={"Looking To"}
                itemArray={lookingToArray}
                activeBtnvalue={Propertyfor}
                changeState={setPropertyfor}
              />
            </div>

            {propertySubTypeArray?.data?.length > 0 && (
              
                <ApiButtons
                  itemArray={propertySubTypeArray}
                  stateItem={propertyTypeWithSubtype}
                  labelName={"Property SubType"}
                  ValueName={"Name"}
                  changeState={setPropertyTypeWithSubtype}
                />
            )}
            <div>
              <label
                htmlFor="title"
                className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white required"
              >
                Property Name
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Property Name"
                required=""
                value={title}
                onChange={handelTitleChange}
              />
            </div>
            {/*Facing  */}
            {facingData && (
              <ApiButtons
                itemArray={facingData}
                stateItem={facing}
                labelName={"Facing"}
                ValueName={"Facing"}
                changeState={setFacing}
              />
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Is Enabled */}

              {roles.includes("Admin") && (
                <PropertyBigButtons
                  labelName={"Is Enabled"}
                  itemArray={IsEnabledArray}
                  activeBtnvalue={isEnabled}
                  changeState={setIsEnabled}
                />
              )}

              {/*  Is Featured*/}
              {roles.includes("Admin") && (
                <PropertyBigButtons
                  labelName={"Is Featured"}
                  itemArray={IsFeaturedArray}
                  activeBtnvalue={isFeatured}
                  changeState={setIsFeatured}
                />
              )}
            </div>
            <div>
              <label
                htmlFor="description"
                className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white required"
              >
                Description
              </label>
              <textarea
                type="text"
                name="description"
                id="description"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                value={description}
                onChange={handelDescriptionChange}
                rows={5}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

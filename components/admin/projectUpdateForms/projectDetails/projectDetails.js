"use client";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import { API_BASE_URL_FOR_MASTER } from "@/utils/constants";
import useFetch from "@/customHooks/useFetch";

export default function ProjectDetailsForm({ valueForNext, valueForNextPage }) {

  const {
    data: facingData,
    loading,
    error,
  } = useFetch(`${API_BASE_URL_FOR_MASTER}/facing`);
  console.log("facingData", facingData);

  // fetching Data for propertyTypeData
  const { data: propertyTypeData } = useFetch(
    `${API_BASE_URL_FOR_MASTER}/propertyWithSubTypes`
  );
  console.log("propertyTypeData", propertyTypeData);

  // // fetching Data for areaUnitData
  // const { data: areaUnitData } = useFetch(
  //   `${API_BASE_URL_FOR_MASTER}/areaunits`
  // );
  // console.log("areaUnitData", areaUnitData);

  // fetching Data for projectStatusData
  const { data: projectStatusData } = useFetch(
    `${API_BASE_URL_FOR_MASTER}/propertyStatus`
  );
  console.log("propertyStatusData", projectStatusData);
  const defaultOption = [{ value: "", label: "no data found" }];



  const [propertyType, setPropertyType] = useState("");
  const [facing, setFacing] = useState("");
  const [isEnabled, setIsEnabled] = useState(null);
  const [isExclusive, setIsExclusive] = useState(null);
  const [isFeatured, setIsFeatured] = useState(null);
  const [isNew, setIsNew] = useState(null);
  const [availableUnits, setAvailableUnits] = useState("");
  const [reraNumber, setReraNumber] = useState("");
  const [projectStatus, setProjectStatus] = useState("");
  console.log("isEnabled", isEnabled);

  useEffect(() => {
    // Retrieve data from localStorage
    const sessionStorageProjectData = JSON.parse(
      sessionStorage.getItem("EditProjectData")
    );
    console.log("localStorageData from localstorage", sessionStorageProjectData);
    // Update state values if data exists in localStorage
    if (sessionStorageProjectData) {
      console.log("if function called ", sessionStorageProjectData.isEnabled);
      setPropertyType(sessionStorageProjectData.propertyType || "");
      setFacing(sessionStorageProjectData.Facing || "");
      setIsEnabled(
        sessionStorageProjectData.IsEnabled === true
          ? true
          : sessionStorageProjectData.IsEnabled === undefined
          ? null
          : false
      );
      setIsExclusive(
        sessionStorageProjectData.IsExclusive === true
          ? true
          : sessionStorageProjectData.IsExclusive === undefined
          ? null
          : false
      );
      setIsFeatured(
        sessionStorageProjectData.IsFeatured === true
          ? true
          : sessionStorageProjectData.IsFeatured === undefined
          ? null
          : false
      );
      setIsNew(
        sessionStorageProjectData.IsNew === true
          ? true
          : sessionStorageProjectData.IsNew === undefined
          ? null
          : false
      );
      setAvailableUnits(sessionStorageProjectData.AvailableUnits || "");
      setReraNumber(sessionStorageProjectData.ReraNumber || "");
      setProjectStatus(sessionStorageProjectData.projectStatus || "");
    }
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

  const handelAvailableUnits = (e) => {
    console.log("Available Units:", e.target.value);
    setAvailableUnits(e.target.value);
  };

  const handelReraNumber = (e) => {
    console.log("Rera Number:", e.target.value);
    setReraNumber(e.target.value);
  };

  const handelProjectStatus = (e) => {
    console.log("Project Status:", e.target.value);
    setProjectStatus(e.target.value);
  };
  const SubmitForm = () => {
    if (propertyType === "") {
      toast.error("Property Type  is required.");
      return false;
    }
    if (facing === "") {
      toast.error("Facing is required.");
      return false;
    }

    if (isEnabled === "") {
      toast.error("IsEnabled  is required.");
      return false;
    }
    if (isExclusive === "") {
      toast.error("IsExclusive is required.");
      return false;
    }
    console.log("isFeatured", isFeatured);
    if (isFeatured === "") {
      toast.error("IsFeatured  is required.");
      return false;
    }
    if (isNew === "") {
      toast.error("IsNew is required.");
      return false;
    }
    if (availableUnits === "") {
      toast.error("Available Units  is required.");
      return false;
    }
    if (reraNumber === "") {
      toast.error("Rera Number is required.");
      return false;
    }
    if (projectStatus === "") {
      toast.error("Project Status is required.");
      return false;
    }
    const projectDetailsData = {
      PropertyTypes: propertyType.trim(),
      Facing: facing.trim(),
      IsEnabled: isEnabled,
      IsExclusive: isExclusive,
      IsFeatured: isFeatured,
      IsNew: isNew,
      availableUnits: availableUnits,
      ReraNumber: facing.trim(),
      ProjectStatus: projectStatus.trim(),
    };
    console.log("projectDetailsData", projectDetailsData);
    const localStorageData = JSON.parse(sessionStorage.getItem("EditProjectData"));
    const newProjectData = { ...localStorageData, ...projectDetailsData };
    sessionStorage.setItem("EditProjectData", JSON.stringify(newProjectData));
    valueForNext(valueForNextPage + 1);
  };

  return (
    <>
      <div>
        <form>
          <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white">
            Project Details
          </h3>
          <div className="grid gap-4 mb-4 sm:grid-cols-2">
            {/* Property Type */}
            <div>
              <label
                htmlFor="propertyTypeWithSubtype"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Project Type
              </label>
              {propertyTypeData ? (
                <Select
                  options={propertyTypeData.data.map((element) => ({
                    value: element._id,
                    label: element.Type,
                  }))}
                  placeholder="Select One"
                  onChange={setPropertyType}
                  required={true}
                  value={propertyType}
                />
              ) : (
                <Select
                  options={defaultOption.map((element) => ({
                    value: element.value,
                    label: element.label,
                  }))}
                  placeholder="Select One"
                  required={true}
                />
              )}
            </div>
            {/*Facing  */}

            <div>
              <label
                htmlFor="facing"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Facing
              </label>
              {facingData ? (
                <Select
                  options={facingData.data.map((element) => ({
                    value: element._id,
                    label: element.Facing,
                  }))}
                  placeholder="Select One"
                  onChange={setFacing}
                  required={true}
                  value={facing? (facing.map((item)=>({
                   
                    value: item._id,
                    label: item.Facing,

                  }))):(facing)}
                />
              ) : (
                <Select
                  options={defaultOption.map((element) => ({
                    value: element.value,
                    label: element.label,
                  }))}
                  placeholder="Select One"
                  required={true}
                />
              )}
            </div>
            {/*  Is Enabled */}
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
              <label htmlFor="isEnabled" className="mr-3">
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
              <label htmlFor="isEnabled">No</label>
            </div>
            {/*  Is Exclusive */}
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
              <label htmlFor="isExclusive" className="mr-3">
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
              <label htmlFor="isExclusive">No</label>
            </div>
            {/*  Is Featured */}
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
              <label htmlFor="isFeatured" className="mr-3">
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
              <label htmlFor="isFeatured">No</label>
            </div>
            {/*  Is New */}
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
              <label htmlFor="isNew" className="mr-3">
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
              <label htmlFor="isNew">No</label>
            </div>
            {/* availabelUnit */}
            {/* <div>
              <label
                htmlFor="availabelUnit"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Availabel Unit
              </label>
              {areaUnitData ? (
                <Select
                  options={areaUnitData.data.map((element) => ({
                    value: element._id,
                    label: element.Unit,
                  }))}
                  placeholder="Select One"
                  onChange={setAvailableUnits}
                  required={true}
                  value={availableUnits}
                />
              ) : (
                <Select
                  options={defaultOption.map((element) => ({
                    value: element.value,
                    label: element.label,
                  }))}
                  placeholder="Select One"
                  required={true}
                />
              )}
            </div> */}
            
            <div>
              <label
                htmlFor="availableUnits"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Available Units
              </label>
              <input
                type="number"
                name="availableUnits"
                id="availableUnits"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Number of Units"
                required=""
                value={availableUnits}
                onChange={handelAvailableUnits}
              />
            </div>

            {/* Rera number */}
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

            {/* PropertyStatus */}

            <div>
              <label
                htmlFor="projectStatus"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Project Status
              </label>
              {projectStatusData ? (
                <Select
                  options={projectStatusData.data.map((element) => ({
                    value: element._id,
                    label: element.Status,
                  }))}
                  placeholder="Select One"
                  onChange={setProjectStatus}
                  required={true}
                  value={projectStatus}
                />
              ) : (
                <Select
                  options={defaultOption.map((element) => ({
                    value: element.value,
                    label: element.label,
                  }))}
                  placeholder="Select One"
                  required={true}
                />
              )}
            </div>
          </div>
        </form>
        <div>
          <button
            onClick={SubmitForm}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

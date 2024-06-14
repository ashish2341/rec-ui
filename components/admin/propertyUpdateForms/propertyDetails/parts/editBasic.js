"use client";
import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import {
  API_BASE_URL_FOR_MASTER,
  ZoneTypeArray,
  suitableArray,
  LocationhubArrayforOffice,
  LocationhubArrayforall,
} from "@/utils/constants";
import useFetch from "@/customHooks/useFetch";
import { ImageString } from "@/api-functions/auth/authAction";
import { GetBuilderApi } from "@/api-functions/builder/getBuilder";
import Cookies from "js-cookie";
import { FormatNumber } from "@/utils/commonHelperFn";
import Styles from "../propertypage.module.css";
import ContinueButton from "@/components/common/propertyContinueButton/continueButton";
import PropertyBigButtons from "@/components/common/admin/propertyBigButton/propertyBigButtons";
import ApiButtons from "@/components/common/admin/propertyapiButtons/ApiButtons";
import TextInput from "@/components/common/admin/textInput/textInput";
export default function BasicPage({
  setPropertyPageValue,
  setPropertyBackvalue,
}) {
  const roleData = Cookies.get("roles") ?? "";
  const name = Cookies.get("name");
  const roles = roleData && JSON.parse(roleData);
  const userId = Cookies.get("userId");

  // fetching Data for propertyOwnerShipData
  const { data: propertyOwnerShipData } = useFetch(
    `${API_BASE_URL_FOR_MASTER}/propertyOwnerShip`
  );
  // console.log("propertyOwnerShipData", propertyOwnerShipData);

  // fetching Data for propertyStatusData
  const { data: propertyStatusData } = useFetch(
    `${API_BASE_URL_FOR_MASTER}/propertyStatus`
  );
  // console.log("propertyStatusData", propertyStatusData);

  // console.log("propertyTypeData", propertyTypeData);
  const sessionStoragePropertyData = JSON.parse(
    sessionStorage.getItem("EditPropertyData")
  );
  const propertTypWithSubTypeValue =
    sessionStoragePropertyData?.PropertySubtype.Name || "";
  const propertTypeValue = sessionStoragePropertyData?.ProeprtyType || "";
  const PropertyForValue = sessionStoragePropertyData?.ProeprtyFor || "";
  const [builderData, setBuilderData] = useState("");
  const [builderName, setBuilderName] = useState("");
  const [ownershipType, setOwnershipType] = useState("");
  const [propertyStatus, setPropertyStatus] = useState("");
  const [suitableFor, setSuitableFor] = useState("");
  const [zoneType, setZoneType] = useState("");
  const [locationHub, setLocationHub] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [customLocationHub, setCustomLocationHub] = useState("");
  const [customSuitable, setCustomSuitable] = useState("");
  const [customZoneType, setCustomZoneType] = useState("");
  const [ageofPropertyData, setAgeOfPropertyData] = useState("");
  const defaultOption = [{ value: "", label: "no data found" }];

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
  console.log("builderName", builderName);
  useEffect(() => {
    // Retrieve data from localStorage
    const sessionStoragePropertyData = JSON.parse(
      sessionStorage.getItem("EditPropertyData")
    );

    // Update state values if data exists in localStorage
    if (sessionStoragePropertyData) {
      setOwnerName(sessionStoragePropertyData?.OwnerName || "");
      setOwnershipType(sessionStoragePropertyData?.OwnershipType || "");
      setPropertyStatus(sessionStoragePropertyData?.PropertyStatus || "");
      setZoneType(sessionStoragePropertyData?.ZoneType || "");
      setLocationHub(sessionStoragePropertyData?.LocationHub || "");
      setSuitableFor(sessionStoragePropertyData?.SuitableFor || "");
      setCustomZoneType(sessionStoragePropertyData?.CustomZoneType || "");
      setCustomLocationHub(sessionStoragePropertyData?.CustomLocationHub || "");
      setCustomSuitable(sessionStoragePropertyData?.CustomSuitable || "");
      setAgeOfPropertyData(sessionStoragePropertyData?.AgeofProperty || "");

      if (roles.includes("Admin")) {
        setBuilderName(sessionStoragePropertyData?.Builder || "");
      }
    }
  }, []);

  const checkRequiredFields = () => {
    if (
      propertTypeValue == "Residential" &&
      propertTypWithSubTypeValue != "Plot"
    ) {
      var requiredFields = [ownershipType, propertyStatus];
    }
    if (
      propertTypeValue == "Residential" &&
      propertTypWithSubTypeValue == "Plot"
    ) {
      var requiredFields = [ownershipType, ownerName];
    }

    if (
      propertTypeValue == "Commercial" &&
      (propertTypWithSubTypeValue == "Office" ||
        propertTypWithSubTypeValue == "Warehouse")
    ) {
      var requiredFields = [
        zoneType,
        locationHub,
        ownershipType,
        propertyStatus,
      ];
    }
    if (
      propertTypeValue == "Commercial" &&
      propertTypWithSubTypeValue == "Warehouse"
    ) {
      var requiredFields = [
        zoneType,
        locationHub,
        ownershipType,
        propertyStatus,
        ownerName,
      ];
    }
    if (
      propertTypeValue == "Commercial" &&
      (propertTypWithSubTypeValue == "Retail Shop" ||
        propertTypWithSubTypeValue == "Showroom")
    ) {
      var requiredFields = [
        suitableFor,
        locationHub,
        ownershipType,
        propertyStatus,
        ownerName,
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
      if (zoneType == "Others" && customZoneType == "") {
        toast.error("Please fill in all required fields!");
        return false;
      }
      if (locationHub == "Others" && customLocationHub == "") {
        toast.error("Please fill in all required fields!");
        return false;
      }
      if (suitableFor == "Others" && customSuitable == "") {
        toast.error("Please fill in all required fields!");
        return false;
      }
      const firstPropertyData = {
        OwnershipType: ownershipType,
      };
      if (
        propertTypeValue == "Residential" &&
        propertTypWithSubTypeValue != "Plot"
      ) {
        firstPropertyData.PropertyStatus = propertyStatus;
      }
      if (
        propertTypeValue == "Residential" &&
        propertTypWithSubTypeValue == "Plot"
      ) {
        firstPropertyData.OwnerName = ownerName;
      }
      if (
        propertTypeValue == "Commercial" &&
        (propertTypWithSubTypeValue == "Office" ||
          propertTypWithSubTypeValue == "Warehouse")
      ) {
        firstPropertyData.ZoneType = zoneType;
        firstPropertyData.LocationHub = locationHub;
        firstPropertyData.PropertyStatus = propertyStatus;
        if (propertTypWithSubTypeValue == "Warehouse") {
          firstPropertyData.OwnerName = ownerName;
        }
        if (zoneType == "Others") {
          firstPropertyData.CustomZoneType = customZoneType;
        }
        if (locationHub == "Others") {
          firstPropertyData.CustomLocationHub = customLocationHub;
        }
        if (zoneType !== "Others" && customZoneType) {
          firstPropertyData.CustomZoneType = "";
        }
        if (locationHub !== "Others" && customLocationHub) {
          firstPropertyData.CustomLocationHub = "";
        }
      }
      if (
        propertTypeValue == "Commercial" &&
        (propertTypWithSubTypeValue == "Retail Shop" ||
          propertTypWithSubTypeValue == "Showroom")
      ) {
        firstPropertyData.OwnerName = ownerName;
        firstPropertyData.PropertyStatus = propertyStatus;
        firstPropertyData.SuitableFor = suitableFor;
        firstPropertyData.LocationHub = locationHub;
        if (suitableFor == "Others") {
          firstPropertyData.CustomSuitable = customSuitable;
        }
        if (locationHub == "Others") {
          firstPropertyData.CustomLocationHub = customLocationHub;
        }
        if (suitableFor !== "Others" && customSuitable) {
          firstPropertyData.CustomSuitable = "";
        }
        if (locationHub !== "Others" && customLocationHub) {
          firstPropertyData.CustomLocationHub = "";
        }
      }
      if (
        propertyStatus.Status === "Under Contruction" &&
        (ageofPropertyData) &&
        propertTypWithSubTypeValue !== "Plot"
      ) {
        firstPropertyData.AgeofProperty = null;
      }

      if (roles.includes("Admin") && propertTypWithSubTypeValue != "Plot") {
        firstPropertyData.Builder = builderName;
      }
      console.log("firstPropertyData", firstPropertyData);
      const localStorageData = JSON.parse(
        sessionStorage.getItem("EditPropertyData")
      );
      const newProjectData = { ...localStorageData, ...firstPropertyData };
      sessionStorage.setItem(
        "EditPropertyData",
        JSON.stringify(newProjectData)
      );

      setPropertyPageValue((prev) => prev + 1);

      setPropertyBackvalue((prev) => prev + 1);
    } else {
      toast.error("Please fill in all required fields!");
    }
  };

  return (
    <>
      <div className="grid gap-4 mb-4 sm:grid-cols-1">
        {/* BuilderData */}
        {roles.includes("Admin") && propertTypWithSubTypeValue != "Plot" ? (
          <div className="mb-2">
            <label
              htmlFor="builder"
              className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white "
            >
              Builder Name
            </label>
            {builderData ? (
              <Select
                options={builderData.data.map((element) => ({
                  value: element._id,
                  label: element.Name,
                }))}
                placeholder="Select One"
                onChange={(e) =>
                  setBuilderName({
                    _id: e.value,
                    Name: e.label,
                  })
                }
                required={true}
                value={{ value: builderName._id, label: builderName.Name }}
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
        ) : null}
        {propertTypWithSubTypeValue &&
          propertTypeValue &&
          propertTypeValue == "Commercial" &&
          propertTypWithSubTypeValue != "Office" && (
            <TextInput
              labelName={"Owner Name"}
              inputValue={ownerName}
              dynamicState={setOwnerName}
            />
          )}
        {/* Zone type */}
        {propertTypWithSubTypeValue &&
          propertTypeValue &&
          propertTypeValue == "Commercial" &&
          propertTypWithSubTypeValue != "Retail Shop" &&
          propertTypWithSubTypeValue != "Showroom" && (
            <>
              {" "}
              <PropertyBigButtons
                labelName={"Zone Type"}
                itemArray={ZoneTypeArray}
                activeBtnvalue={zoneType}
                changeState={setZoneType}
              />
              {zoneType == "Others" && (
                <TextInput
                  labelName={" Write your Zone Type"}
                  inputValue={customZoneType}
                  dynamicState={setCustomZoneType}
                />
              )}
            </>
          )}
        {/* Suitable For */}
        {propertTypWithSubTypeValue &&
          (propertTypWithSubTypeValue == "Retail Shop" ||
            propertTypWithSubTypeValue == "Showroom") && (
            <>
              <PropertyBigButtons
                labelName={"Suitable For"}
                itemArray={suitableArray}
                activeBtnvalue={suitableFor}
                changeState={setSuitableFor}
              />
              {suitableFor == "Others" && (
                <TextInput
                  labelName={"Write your Suitable For"}
                  inputValue={customSuitable}
                  dynamicState={setCustomSuitable}
                />
              )}
            </>
          )}
        {/* Location hub */}
        {propertTypWithSubTypeValue &&
          propertTypWithSubTypeValue == "Office" &&
          propertTypeValue == "Commercial" && (
            <>
              <PropertyBigButtons
                labelName={"Location Hub"}
                itemArray={LocationhubArrayforOffice}
                activeBtnvalue={locationHub}
                changeState={setLocationHub}
              />
              {locationHub == "Others" && (
                <TextInput
                  labelName={"Write your Location Hub"}
                  inputValue={customLocationHub}
                  dynamicState={setCustomLocationHub}
                />
              )}
            </>
          )}
        {propertTypWithSubTypeValue &&
          propertTypeValue &&
          propertTypWithSubTypeValue != "Office" &&
          propertTypWithSubTypeValue != "Plot" &&
          propertTypeValue == "Commercial" && (
            <>
              {" "}
              <PropertyBigButtons
                labelName={"Location Hub"}
                itemArray={LocationhubArrayforall}
                activeBtnvalue={locationHub}
                changeState={setLocationHub}
              />
              {locationHub == "Others" && (
                <TextInput
                  labelName={"Write your Location Hub"}
                  inputValue={customLocationHub}
                  dynamicState={setCustomLocationHub}
                />
              )}
            </>
          )}
      </div>
      {propertTypWithSubTypeValue == "Plot" && (
        <TextInput
          labelName={"Owner Name"}
          inputValue={ownerName}
          dynamicState={setOwnerName}
        />
      )}
      <div className="grid gap-4 mb-4 sm:grid-cols-1">
        {/*OwnerShipType  */}
        {propertyOwnerShipData && (
          <ApiButtons
            itemArray={propertyOwnerShipData}
            stateItem={ownershipType}
            labelName={"OwnerShip Type"}
            ValueName={"Ownership"}
            changeState={setOwnershipType}
          />
        )}

        {/*Property Status  */}
        {propertTypWithSubTypeValue != "Plot" && propertyStatusData && (
          <ApiButtons
            itemArray={propertyStatusData}
            stateItem={propertyStatus}
            labelName={"Property Condition"}
            ValueName={"Status"}
            changeState={setPropertyStatus}
          />
        )}
        {propertTypWithSubTypeValue != "Plot" ? (
          <ContinueButton
            modalSubmit={SubmitForm}
            butonSubName={"add Room Details"}
          />
        ) : (
          <ContinueButton
            modalSubmit={SubmitForm}
            butonSubName={"add Area Details"}
          />
        )}
      </div>
    </>
  );
}

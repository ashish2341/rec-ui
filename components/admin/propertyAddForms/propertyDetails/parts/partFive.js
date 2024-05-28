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

export default function PartFive({ setPropertyPageValue }) {
  // fetching Data for bhkTypeData
  const { data: bhkTypeData } = useFetch(`${API_BASE_URL_FOR_MASTER}/bhkType`);
  // console.log("bhkTypeData", bhkTypeData);

  // fetching Data for posessionStatusData
  const { data: posessionStatusData } = useFetch(
    `${API_BASE_URL_FOR_MASTER}/possession`
  );
  //  console.log("posessionStatusData", posessionStatusData);

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

  // fetching Data for preferencesData
  const { data: preferencesData } = useFetch(
    `${API_BASE_URL_FOR_MASTER}/preferences`
  );
  // console.log("preferencesData", preferencesData);

  // fetching Data for soilsData
  const { data: soilsData } = useFetch(`${API_BASE_URL_FOR_MASTER}/soils`);
  // console.log("soilsData", soilsData);

  const surveillanceData = [
    { name: "camera", value: "camera" },
    { name: "security", value: "security" },
    { name: "watchman", value: "watchman" },
  ];
  const defaultOption = [{ value: "", label: "no data found" }];

  const [posessionStatus, setPosessionStatus] = useState("");
  const [posessionDate, setPosessionDate] = useState("");
  const [isInterestedInJoinedVenture, setIsInterestedInJoinedVenture] =
    useState("");
  const [isSingleProperty, setIsSingleProperty] = useState("");
  const [soil, setSoil] = useState("");
  const [ownershipType, setOwnershipType] = useState("");
  const [propertyStatus, setPropertyStatus] = useState("");
  const [isSold, setIsSold] = useState("");
  const [preferences, setPreferences] = useState([]);
  const [surveillance, setSurveillance] = useState([]);
  const [brochure, setBrochure] = useState("");
  const brochureInputRef = useRef(null);
  const [bhkType, setBhkType] = useState("");

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

      setPosessionStatus(sessionStoragePropertyData?.PosessionStatus || "");
      setPosessionDate(sessionStoragePropertyData?.PosessionDate || "");
      setIsSingleProperty(
        sessionStoragePropertyData?.IsSingleProperty === true
          ? true
          : sessionStoragePropertyData?.IsSingleProperty === undefined
          ? null
          : false
      );
      setIsInterestedInJoinedVenture(
        sessionStoragePropertyData?.IsInterstedInJoinedVenture === true
          ? true
          : sessionStoragePropertyData?.IsInterstedInJoinedVenture === undefined
          ? null
          : false
      );
      setSoil(sessionStoragePropertyData?.Soil || "");
      setOwnershipType(sessionStoragePropertyData?.OwnershipType || "");
      setPropertyStatus(sessionStoragePropertyData?.PropertyStatus || "");
      setIsSold(
        sessionStoragePropertyData?.IsSold === true
          ? true
          : sessionStoragePropertyData?.IsSold === undefined
          ? null
          : false
      );
      setPreferences(sessionStoragePropertyData?.Preferences || []);
      setSurveillance(sessionStoragePropertyData?.Surveillance || []);

      setBhkType(sessionStoragePropertyData?.BhkType || "");
      setBrochure(sessionStoragePropertyData?.Brochure || "");
    }
  }, []);

  const handleIsSingleProperty = (e) => {
    console.log("handleIsSingleProperty", e.target.value);
    setIsSingleProperty(e.target.value === "true");
  };

  const handleIsInterestedInJoinedVenture = (e) => {
    console.log("handleIsInterestedInJoinedVenture", e.target.value);
    setIsInterestedInJoinedVenture(e.target.value === "true");
  };
  const handleIsSold = (e) => {
    setIsSold(e.target.value === "true");
  };

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

  const handleSurveillanceClick = (item) => {
    console.log("Clicked item:", item);
    setSurveillance((prev) => {
      const isSelected = prev.some(
        (selectedItem) => selectedItem.value === item.value
      );
      console.log("Is selected:", isSelected);
      if (isSelected) {
        return prev.filter((selectedItem) => selectedItem.value !== item.value);
      } else {
        return [...prev, item];
      }
    });
  };
  const handlePreferenceClick = (item) => {
    console.log("Clicked item:", item);
    setPreferences((prev) => {
      const isSelected = prev.some(
        (selectedItem) => selectedItem.value === item.value
      );
      console.log("Is selected:", isSelected);
      if (isSelected) {
        return prev.filter((selectedItem) => selectedItem.value !== item.value);
      } else {
        return [...prev, item];
      }
    });
  };

  const checkRequiredFields = () => {
    const requiredFields = [
      posessionStatus,
      posessionDate,
      isInterestedInJoinedVenture,
      isSingleProperty,
      soil,
      ownershipType,
      propertyStatus,
      isSold,
      preferences,
      surveillance,
      brochure,
      bhkType,
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
      const fifthPropertyData = {
        PosessionStatus: posessionStatus,
        PosessionDate: posessionDate,
        IsSingleProperty: isSingleProperty,
        IsInterstedInJoinedVenture: isInterestedInJoinedVenture,
        Soil: soil,
        OwnershipType: ownershipType,
        PropertyStatus: propertyStatus,
        IsSold: isSold,
        Preferences: preferences,
        Surveillance: surveillance,
        BhkType: bhkType,
        Brochure: brochure,
       
      };
      console.log("fifthPropertyData", fifthPropertyData);
      const localStorageData = JSON.parse(
        sessionStorage.getItem("propertyData")
      );
      const newProjectData = { ...localStorageData, ...fifthPropertyData };
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
        {/* is single property */}
        <div>
          <label
            htmlFor="isSingleProperty"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
          >
            Is Single Property
          </label>
          <input
            type="radio"
            name="isSingleProperty"
            id="isSingleProperty"
            value="true"
            required=""
            checked={isSingleProperty == true}
            onChange={handleIsSingleProperty}
          />
          <label htmlFor="isSingleProperty" className="mr-3 ml-2">
            Yes
          </label>
          <input
            type="radio"
            name="isSingleProperty"
            id="isSingleProperty"
            value="false"
            required=""
            checked={isSingleProperty == false}
            onChange={handleIsSingleProperty}
            className="form-radio h-5 w-5 text-red-600"
          />
          <label htmlFor="isSingleProperty" className="ml-2">
            No
          </label>
        </div>
        {/* PosessionDate */}
        <div>
          <label
            htmlFor="posessionDate"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
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
        {/* Posession Status*/}
        <div>
          <label
            htmlFor="posessionStatus"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
          >
            Possession Status
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Possession Status"
            required=""
            value={posessionStatus.Possession}
            disabled={true}
          />
          {posessionStatusData ? (
            <div
              className={`flex flex-wrap space-x-2 mt-4 ${
                posessionStatusData?.data?.length > 8
                  ? `${Styles.scrollable}`
                  : ""
              }`}
            >
              {posessionStatusData?.data?.map((item) => (
                <button
                  key={item._id}
                  onClick={() =>
                    setPosessionStatus({
                      _id: item._id,
                      Possession: item.Possession,
                    })
                  }
                  className={` rounded text-white px-4 py-2 ${
                    Styles.optionButton
                  } ${
                    posessionStatus._id === item._id
                      ? "bg-[#2a4acb] border-2 border-[#2a4acb]"
                      : "bg-[#6592d3]  border-2 border-[#6592d3]"
                  }`}
                >
                  {item.Possession}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap space-x-2">
             <h1 className={`${Styles.noDataHead}`}>No Data Found</h1>
            </div>
          )}
        </div>
        {/* Soil */}

        <div>
          <label
            htmlFor="soil"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
          >
            Soil
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Soil"
            required=""
            value={soil.Soil}
            disabled={true}
          />
          {soilsData ? (
            <div
              className={`flex flex-wrap space-x-2 mt-4 ${
                soilsData?.data?.length > 8 ? `${Styles.scrollable}` : ""
              }`}
            >
              {soilsData?.data?.map((item) => (
                <button
                  key={item._id}
                  onClick={() =>
                    setSoil({
                      _id: item._id,
                      Soil: item.Soil,
                    })
                  }
                  className={` rounded text-white px-4 py-2 ${
                    Styles.optionButton
                  } ${
                    soil._id === item._id
                      ? "bg-[#2a4acb] border-2 border-[#2a4acb]"
                      : "bg-[#6592d3]  border-2 border-[#6592d3]"
                  }`}
                >
                  {item.Soil}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap space-x-2">
             <h1 className={`${Styles.noDataHead}`}>No Data Found</h1>
            </div>
          )}
        </div>
        {/* OwnershipType */}

        <div>
          <label
            htmlFor="ownershipType"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
          >
            Ownership type
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Ownership type"
            required=""
            value={ownershipType.Ownership}
            disabled={true}
          />
          {propertyOwnerShipData ? (
            <div
              className={`flex flex-wrap space-x-2 mt-4 ${
                propertyOwnerShipData?.data?.length > 8
                  ? `${Styles.scrollable}`
                  : ""
              }`}
            >
              {propertyOwnerShipData?.data?.map((item) => (
                <button
                  key={item._id}
                  onClick={() =>
                    setOwnershipType({
                      _id: item._id,
                      Ownership: item.Ownership,
                    })
                  }
                  className={` rounded text-white px-4 py-2 ${
                    Styles.optionButton
                  } ${
                    ownershipType._id === item._id
                      ? "bg-[#2a4acb] border-2 border-[#2a4acb]"
                      : "bg-[#6592d3]  border-2 border-[#6592d3]"
                  }`}
                >
                  {item.Ownership}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap space-x-2">
             <h1 className={`${Styles.noDataHead}`}>No Data Found</h1>
            </div>
          )}
        </div>

        {/* PropertyStatus */}

        <div>
          <label
            htmlFor="propertyStatus"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
          >
            Property Status
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder=" Property Status"
            required=""
            value={propertyStatus.Status}
            disabled={true}
          />
          {propertyStatusData ? (
            <div
              className={`flex flex-wrap space-x-2 mt-4 ${
                propertyStatusData?.data?.length > 8
                  ? `${Styles.scrollable}`
                  : ""
              }`}
            >
              {propertyStatusData?.data?.map((item) => (
                <button
                  key={item._id}
                  onClick={() =>
                    setPropertyStatus({
                      _id: item._id,
                      Status: item.Status,
                    })
                  }
                  className={` rounded text-white px-4 py-2 ${
                    Styles.optionButton
                  } ${
                    propertyStatus._id === item._id
                      ? "bg-[#2a4acb] border-2 border-[#2a4acb]"
                      : "bg-[#6592d3]  border-2 border-[#6592d3]"
                  }`}
                >
                  {item.Status}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap space-x-2">
             <h1 className={`${Styles.noDataHead}`}>No Data Found</h1>
            </div>
          )}
        </div>

        {/* is Sold */}
        <div>
          <label
            htmlFor="isSold"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
          >
            Is Sold
          </label>
          <input
            type="radio"
            name="isSold"
            id="isSold"
            value="true"
            required=""
            checked={isSold == true}
            onChange={handleIsSold}
          />
          <label htmlFor="isSold" className="mr-3 ml-2">
            Yes
          </label>
          <input
            type="radio"
            name="isSold"
            id="isSold"
            value="false"
            required=""
            onChange={handleIsSold}
            checked={isSold == false}
            className="form-radio h-5 w-5 text-red-600"
          />
          <label htmlFor="isSold" className="ml-2">
            No
          </label>
        </div>
        {/* Is Interested In Joined Venture */}
        <div>
          <label
            htmlFor="isInterestedInJoinedVenture"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
          >
            Is Interested In Joined Venture
          </label>
          <input
            type="radio"
            name="isInterestedInJoinedVenture"
            id="isInterestedInJoinedVenture"
            value="true"
            required=""
            checked={isInterestedInJoinedVenture == true}
            onChange={handleIsInterestedInJoinedVenture}
          />
          <label htmlFor="isInterestedInJoinedVenture" className="mr-3 ml-3">
            Yes
          </label>
          <input
            type="radio"
            name="isInterestedInJoinedVenture"
            id="isInterestedInJoinedVenture"
            value="false"
            required=""
            checked={isInterestedInJoinedVenture == false}
            onChange={handleIsInterestedInJoinedVenture}
            className="form-radio h-5 w-5 text-red-600"
          />
          <label htmlFor="isInterestedInJoinedVenture" className=" ml-2">
            No
          </label>
        </div>
        {/* Surveillance */}
        <div>
          <label
            htmlFor="surveillance"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
          >
            Surveillance
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Surveillance"
            required=""
            value={surveillance.map((item) => {
              return item.name;
            })}
            disabled={true}
          />
          {surveillanceData ? (
            <div
              className={`flex flex-wrap space-x-2 mt-4 ${
                surveillanceData?.length > 8 ? "scrollable" : ""
              }`}
            >
              {surveillanceData?.map((item) => (
                <button
                  key={item.value}
                  onClick={() => handleSurveillanceClick(item)}
                  className={`rounded text-white px-4 py-2 ${
                    Styles.optionButton
                  } ${
                    surveillance.some(
                      (selectedItem) => selectedItem.value === item.value
                    )
                      ? "bg-[#2a4acb] border-2 border-[#2a4acb]"
                      : "bg-[#6592d3] border-2 border-[#6592d3]"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap space-x-2">
             <h1 className={`${Styles.noDataHead}`}>No Data Found</h1>
            </div>
          )}
        </div>
        {/* BhkType */}
        <div>
          <label
            htmlFor="bhkType"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
          >
            Bhk Type
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Bhk Type"
            required=""
            value={bhkType.Type}
            disabled={true}
          />
          {bhkTypeData ? (
            <div
              className={`flex flex-wrap space-x-2 mt-4 ${
                bhkTypeData?.data?.length > 8 ? `${Styles.scrollable}` : ""
              }`}
            >
              {bhkTypeData?.data?.map((item) => (
                <button
                  key={item._id}
                  onClick={() =>
                    setBhkType({
                      _id: item._id,
                      Type: item.Type,
                    })
                  }
                  className={` rounded text-white px-4 py-2 ${
                    Styles.optionButton
                  } ${
                    bhkType._id === item._id
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
             <h1 className={`${Styles.noDataHead}`}>No Data Found</h1>
            </div>
          )}
        </div>
        {/* Preferences */}

        <div>
          <label
            htmlFor="preferences"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
          >
            Preferences
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Preferences"
            required=""
            value={preferences.map((item) => {
              return item.Preference;
            })}
            disabled
          />
          {preferencesData ? (
            <div
              className={`flex flex-wrap space-x-2 mt-4 ${
                preferencesData?.data?.length > 8 ? `${Styles.scrollable}` : ""
              }`}
            >
              {preferencesData?.data?.map((item) => (
                <button
                  key={item._id}
                  onClick={() => handlePreferenceClick(item)}
                  className={`rounded text-white px-4 py-2 ${
                    Styles.optionButton
                  } ${
                    preferences.some(
                      (selectedItem) => selectedItem.value === item.value
                    )
                      ? "bg-[#2a4acb] border-2 border-[#2a4acb]"
                      : "bg-[#6592d3] border-2 border-[#6592d3]"
                  }`}
                >
                  {item.Preference}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap space-x-2">
             <h1 className={`${Styles.noDataHead}`}>No Data Found</h1>
            </div>
          )}
        </div>

        {/* Brochure */}
        <div>
          <label
            htmlFor="document"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
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

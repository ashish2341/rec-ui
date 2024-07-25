"use client";
import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import {
  API_BASE_URL_FOR_MASTER,
  staticAreaUnitArray,
  wallTypesArray,
  fencingArray,
  flooringArray,currentPage,setInsidePropertyPageNameArray
} from "@/utils/constants";
import useFetch from "@/customHooks/useFetch";
import { ImageString } from "@/api-functions/auth/authAction";
import { GetBuilderApi } from "@/api-functions/builder/getBuilder";
import Cookies from "js-cookie";
import { FormatNumber } from "@/utils/commonHelperFn";
import Styles from "../propertypage.module.css";
import ContinueButton from "@/components/common/propertyContinueButton/continueButton";
import ApiButtons from "@/components/common/admin/propertyapiButtons/ApiButtons";
import PropertyBigButtons from "@/components/common/admin/propertyBigButton/propertyBigButtons";
import TextInput from "@/components/common/admin/textInput/textInput";
import EditedTag from "@/components/common/admin/editedTag/editedTag";
export default function AreaDetailPage({ setPropertyPageValue,editedKeysfromMain,
  pageNamefromMain,valueForNextfromSix ,changedSubtypeValue,setInsidePropertyPageNameArray}) {
  // fetching Data for furnishedesData
  const { data: furnishedesData } = useFetch(
    `${API_BASE_URL_FOR_MASTER}/furnishedes`
  );


  const sessionStoragePropertyData = JSON.parse(
    sessionStorage.getItem("EditPropertyData")
  );
  const propertTypWithSubTypeValue =
    sessionStoragePropertyData?.PropertySubtype.Name || "";
  const propertTypeValue = sessionStoragePropertyData?.ProeprtyType || "";
  const PropertyForValue = sessionStoragePropertyData?.ProeprtyFor || "";
  const [fittingValues, setFittingValues] = useState({
    Electrical: "",
    Toilets: "",
    Kitchen: "",
    Doors: "",
    Windows: "",
  });

  const [fencing, setFencing] = useState("");
  const [flooring, setFlooring] = useState("");
  const [furnished, setFurnished] = useState("");
  const [landArea, setLandArea] = useState("");
  const [carpetArea, setCarpetArea] = useState("");
  const [areaUnits, setAreaUnits] = useState("");
  const [builtAreaType, setBuiltAreaType] = useState("");
  const [builtUpArea, setBuiltUpArea] = useState("");
  const [plotArea, setPlotArea] = useState("");
  const [plotLength, setPlotLength] = useState("");
  const [plotwidth, setPlotWidth] = useState("");
  const [wallType, setWallType] = useState("");
  const [cellingHeight, setCellingHeight] = useState("");
  const [entranceWidth, setEntranceWidth] = useState("");
  const [landAreaUnit, setLandAreaUnit] = useState("");
  const [customWallType, setCustomWallType] = useState("");
  const [customFencing, setCustomFencing] = useState("");
  const [customFlooring, setCustomFlooring] = useState("");

  useEffect(() => {
    // Retrieve data from localStorage
    const sessionStoragePropertyData = JSON.parse(
      sessionStorage.getItem("EditPropertyData")
    );
   
    // Update state values if data exists in localStorage
    if (sessionStoragePropertyData) {
      setFittingValues({
        Electrical: sessionStoragePropertyData?.Fitting?.Electrical || "",
        Toilets: sessionStoragePropertyData?.Fitting?.Toilets || "",
        Kitchen: sessionStoragePropertyData?.Fitting?.Kitchen || "",
        Doors: sessionStoragePropertyData?.Fitting?.Doors || "",
        Windows: sessionStoragePropertyData?.Fitting?.Windows || "",
      });
      setEntranceWidth(sessionStoragePropertyData?.EntranceWidth || null);
      setWallType(sessionStoragePropertyData?.WallType || "");
      setCellingHeight(sessionStoragePropertyData?.CellingHeight || null);
      setFencing(sessionStoragePropertyData?.Fencing || "");
      setFlooring(sessionStoragePropertyData?.Flooring || "");
      setFurnished(sessionStoragePropertyData?.Furnished || "");
      setLandArea(sessionStoragePropertyData?.LandArea || null);
      setCarpetArea(sessionStoragePropertyData?.CarpetArea || null);
      setBuiltUpArea(sessionStoragePropertyData?.BuiltUpArea || null);
      setCustomFencing(sessionStoragePropertyData?.CustomFencing || "");
      setCustomFlooring(sessionStoragePropertyData?.CustomFlooring || "");
      setCustomWallType(sessionStoragePropertyData?.CustomWallType || "");
      setAreaUnits({
        value: sessionStoragePropertyData?.AreaUnits || "Sq-ft",
        label: sessionStoragePropertyData?.AreaUnits || "Sq-ft",
      });
      setPlotArea(sessionStoragePropertyData?.PlotArea || null);
      setPlotLength(sessionStoragePropertyData?.PlotLength || null);
      setPlotWidth(sessionStoragePropertyData?.Plotwidth || null);
      setLandAreaUnit({
        value: sessionStoragePropertyData?.LandAreaUnit || "Sq-ft",
        label: sessionStoragePropertyData?.LandAreaUnit || "Sq-ft",
      });
    }
  }, []);
  const handleFittingChange = (field, value) => {
    setFittingValues((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };
  const checkRequiredFields = () => {
    if (
      propertTypWithSubTypeValue != "Plot" &&
      (propertTypeValue == "Residential" || propertTypeValue == "Commercial")
    ) {
      var requiredFields = [
        fencing,
        flooring,
        furnished,
        builtUpArea,
        landArea,
      ];
      if (fencing === "Other") {
        requiredFields.push(customFencing);
      }
      if (flooring === "Other") {
        requiredFields.push(customFlooring);
      }
    }
    if (propertTypWithSubTypeValue == "Plot") {
      var requiredFields = [plotArea, plotLength, plotwidth, areaUnits];
    }
    if (
      propertTypeValue == "Commercial" &&
      propertTypWithSubTypeValue == "Office"
    ) {
      var requiredFields = [
        fencing,
        flooring,
        furnished,
        builtUpArea,
        wallType,
        landArea,
      ];
      if (wallType === "Other") {
        requiredFields.push(customWallType);
      }
      if (fencing === "Other") {
        requiredFields.push(customFencing);
      }
      if (flooring === "Other") {
        requiredFields.push(customFlooring);
      }
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
      const thirdPropertyData = {};
      if (propertTypWithSubTypeValue != "Plot") {
        (thirdPropertyData.Fencing = fencing),
          (thirdPropertyData.Flooring = flooring),
          (thirdPropertyData.Furnished = furnished),
          (thirdPropertyData.BuiltUpArea = builtUpArea ? builtUpArea :null),
          (thirdPropertyData.LandArea = landArea ? parseInt(landArea) : null),
          (thirdPropertyData.LandAreaUnit = landAreaUnit
            ? landAreaUnit.value
            : ""),
          (thirdPropertyData.CarpetArea = carpetArea
            ? parseInt(carpetArea)
            : null),
          (thirdPropertyData.Fitting = fittingValues ? fittingValues : "");
        thirdPropertyData.CellingHeight = cellingHeight ? cellingHeight :null;
        thirdPropertyData.EntranceWidth = entranceWidth? entranceWidth :null;
        if (fencing === "Other") {
          thirdPropertyData.CustomFencing = customFencing;
        }
        if (flooring === "Other") {
          thirdPropertyData.CustomFlooring = customFlooring;
        }
        if (fencing !== "Other" && customFencing) {
          thirdPropertyData.CustomFencing = "";
        }
        if (flooring !== "Other" && customFlooring) {
          thirdPropertyData.CustomFlooring = "";
        }
      }
      if (propertTypWithSubTypeValue == "Plot") {
        (thirdPropertyData.PlotArea = plotArea ? plotArea :null ),
          (thirdPropertyData.AreaUnits = areaUnits.value ),
          (thirdPropertyData.PlotLength = plotLength ? plotLength :null),
          (thirdPropertyData.Plotwidth = plotwidth ? plotwidth :null);
      }
      if (propertTypWithSubTypeValue == "Office") {
        thirdPropertyData.WallType = wallType;
        if (wallType === "Other") {
          thirdPropertyData.CustomWallType = customWallType;
        }
        if (wallType !== "Other" && customWallType) {
          thirdPropertyData.CustomWallType = "";
        }
      }

      const localStorageData = JSON.parse(
        sessionStorage.getItem("EditPropertyData")
      );
      const newProjectData = { ...localStorageData, ...thirdPropertyData };
      sessionStorage.setItem(
        "EditPropertyData",
        JSON.stringify(newProjectData)
      );
      setInsidePropertyPageNameArray(prev => {
        // Check if the newPage already exists in the array
        if (!prev.includes("Area")) {
          return [...prev, "Area"];
        }
        return prev; // If it already exists, return the previous state
      });
      if ( changedSubtypeValue) {
        setPropertyPageValue((prev) => prev + 1);
        
      } else {
        setPropertyPageValue((prev) => prev + 1);
      }
    } else {
      toast.error("Please fill in all required fields!");
    }
  };
  return (
    <>
      <div className="grid gap-4 mb-4 sm:grid-cols-2">
        {propertTypWithSubTypeValue && propertTypWithSubTypeValue == "Plot" && (
          <>
            {/* Plot Area */}
            <div className="w-full mx-auto">
              <div>
                <label
                  for="search-dropdown"
                  className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white required"
                >
                  Plot Area
                  { (editedKeysfromMain?.includes("PlotArea") && pageNamefromMain===currentPage) && (<EditedTag/>) } 

                </label>
                <div className="relative w-full">
                  <input
                    type="number"
                    name="plotArea"
                    id="plotArea"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Plot Area"
                    value={plotArea}
                    onChange={(e) => setPlotArea(e.target.value)}
                  />
                  <div className="absolute top-0 end-0 text-sm font-medium h-full text-black  rounded-e-lg border-none m-0.5 ">
                    <Select
                      options={staticAreaUnitArray.map((element) => ({
                        value: element.value,
                        label: element.label,
                      }))}
                      value={areaUnits}
                      onChange={(e) =>
                        setAreaUnits({ value: e.value, label: e.label })
                      }
                      placeholder="Select Unit"
                    />
                  </div>
                </div>
              </div>
            </div>
           

            {/* Plot Width */}
            <div>
              <label
                htmlFor="plotwidth"
                className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white required"
              >
                Width
                { (editedKeysfromMain?.includes("Plotwidth") && pageNamefromMain===currentPage) && (<EditedTag/>) } 

              </label>
              <input
                type="number"
                name="plotwidth"
                id="plotwidth"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Plot Width"
                value={plotwidth}
                onChange={(e) => setPlotWidth(e.target.value)}
              />
            </div>
            {/* Plot Length */}
            <div>
              <label
                htmlFor="length"
                className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white required"
              >
                Length
                { (editedKeysfromMain?.includes("PlotLength") && pageNamefromMain===currentPage) && (<EditedTag/>) } 

              </label>
              <input
                type="number"
                name="plotLength"
                id="plotLength"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Plot Length"
                value={plotLength}
                onChange={(e) => setPlotLength(e.target.value)}
              />
            </div>
          </>
        )}
      </div>

      {propertTypWithSubTypeValue != "Plot" && (
        <>
          {" "}
          {/* Construction walls */}
          {propertTypWithSubTypeValue == "Office" && (
            <>
              <PropertyBigButtons
                labelName={"Wall Type"}
                itemArray={wallTypesArray}
                activeBtnvalue={wallType}
                changeState={setWallType}
                changedKeyArray={editedKeysfromMain}
                showPageName={pageNamefromMain}
                currentPageName={currentPage}
                specifiedKey={"WallType"}
              />
              {wallType === "Other" && (
                <TextInput
                  labelName={" Write your Wall Type"}
                  inputValue={customWallType}
                  dynamicState={setCustomWallType}
                  changedKeyArray={editedKeysfromMain}
                  showPageName={pageNamefromMain}
                  currentPageName={currentPage}
                  specifiedKey={"CustomWallType"}
                />
              )}
            </>
          )}
          {/* Fencing */}
          {fencingArray && (
            <>
              <PropertyBigButtons
                labelName={"Fencing"}
                itemArray={fencingArray}
                activeBtnvalue={fencing}
                changeState={setFencing}
                changedKeyArray={editedKeysfromMain}
                showPageName={pageNamefromMain}
                currentPageName={currentPage}
                specifiedKey={"Fencing"}
              />
              {fencing === "Other" && (
                <TextInput
                  labelName={"Fencing Type"}
                  inputValue={customFencing}
                  dynamicState={setCustomFencing}
                  changedKeyArray={editedKeysfromMain}
                  showPageName={pageNamefromMain}
                  currentPageName={currentPage}
                  specifiedKey={"CustomFencing"}
                />
              )}
            </>
          )}
          {/* Flooring */}
          {flooringArray && (
            <>
              <PropertyBigButtons
                labelName={"Flooring"}
                itemArray={flooringArray}
                activeBtnvalue={flooring}
                changeState={setFlooring}
                changedKeyArray={editedKeysfromMain}
                showPageName={pageNamefromMain}
                currentPageName={currentPage}
                specifiedKey={"Flooring"}
              />
              {flooring == "Other" && (
                <TextInput
                  labelName={"Flooring Type"}
                  inputValue={customFlooring}
                  dynamicState={setCustomFlooring}
                  changedKeyArray={editedKeysfromMain}
                  showPageName={pageNamefromMain}
                  currentPageName={currentPage}
                  specifiedKey={"CustomFlooring"}
                />
              )}
            </>
          )}
          {/* Furnished */}
          {furnishedesData && (
            <ApiButtons
              itemArray={furnishedesData}
              stateItem={furnished}
              labelName={"Furnished"}
              ValueName={"Furnished"}
              changeState={setFurnished}
              changedKeyArray={editedKeysfromMain}
              showPageName={pageNamefromMain}
              currentPageName={currentPage}
              specifiedKey={"Furnished"}
            />
          )}
          
          <div className="grid gap-4 mb-4 sm:grid-cols-2">
            {/* land area and unit */}
          <div className="w-full mx-auto">
            <div>
              <label
                for="search-dropdown"
                className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white required"
              >
                Land Area
                { (editedKeysfromMain?.includes("LandArea") || editedKeysfromMain?.includes("LandAreaUnit") ) && pageNamefromMain===currentPage && (<EditedTag/>) } 

              </label>
              <div className="relative w-full">
                <input
                  type="number"
                  name="landArea"
                  id="landArea"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Land Area"
                  value={landArea}
                  onChange={(e) => setLandArea(e.target.value)}
                />
                <div className="absolute top-0 end-0 text-sm font-medium h-full text-black  rounded-e-lg border-none m-0.5 ">
                  <Select
                    options={staticAreaUnitArray.map((element) => ({
                      value: element.value,
                      label: element.label,
                    }))}
                    value={landAreaUnit}
                    onChange={(e) =>
                      setLandAreaUnit({ value: e.value, label: e.label })
                    }
                    placeholder="Select Unit"
                  />
                </div>
              </div>
            </div>
          </div>
            {/* Builtup ARea */}
            <div>
              <label
                htmlFor="builtUpArea"
                className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white required"
              >
                Built Up Area
                { (editedKeysfromMain?.includes("BuiltUpArea") && pageNamefromMain===currentPage) && (<EditedTag/>) } 

              </label>
              <input
                type="number"
                name="builtUpArea"
                id="builtUpArea"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Built Up Area"
                value={builtUpArea}
                onChange={(e) => setBuiltUpArea(e.target.value)}
              />
            </div>
            {/* CarpetArea */}
            <div>
              <label
                htmlFor="carpetArea"
                className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white "
              >
                Carpet Area
                { (editedKeysfromMain?.includes("CarpetArea") && pageNamefromMain===currentPage) && (<EditedTag/>) } 

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
            {/* Entrance width in feet */}
            <div>
              <label
                htmlFor="entranceWidth"
                className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white "
              >
                Entrance width in feet
                { (editedKeysfromMain?.includes("EntranceWidth") && pageNamefromMain===currentPage) && (<EditedTag/>) } 

              </label>
              <input
                type="number"
                name="entranceWidth"
                id="entranceWidth"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Entrance width in feet"
                value={entranceWidth}
                onChange={(e) => setEntranceWidth(e.target.value)}
              />
            </div>

            {/* cellingHeight */}
            <div>
              <label
                htmlFor="cellingHeight"
                className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white "
              >
                Celling height in feet
                { (editedKeysfromMain?.includes("CellingHeight") && pageNamefromMain===currentPage) && (<EditedTag/>) } 

              </label>
              <input
                type="number"
                name="cellingHeight"
                id="cellingHeight"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Celling height in feet"
                value={cellingHeight}
                onChange={(e) => setCellingHeight(e.target.value)}
              />
            </div>
          </div>
         
        </>
      )}

      {propertTypWithSubTypeValue &&
        propertTypeValue &&
        propertTypWithSubTypeValue != "Plot" &&
        propertTypeValue == "Residential" && (
          <>
            <h2 className="block mb-2 text-xl mt-12 font-lg underline font-bold text-gray-500 dark:text-white">
              {" "}
              Fitting Details
            </h2>
            <div className="grid gap-4 mb-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="Electrical"
                  className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white"
                >
                  Electrical
                  { (editedKeysfromMain?.includes("Fitting.Electrical") && pageNamefromMain===currentPage) && (<EditedTag/>) } 

                </label>
                <input
                  type="text"
                  name="Electrical"
                  id="Electrical"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Electrical"
                  value={fittingValues.Electrical}
                  onChange={(e) =>
                    handleFittingChange("Electrical", e.target.value)
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="Toilets"
                  className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white"
                >
                  Toilets
                  { (editedKeysfromMain?.includes("Fitting.Toilets") && pageNamefromMain===currentPage) && (<EditedTag/>) } 

                </label>
                <input
                  type="text"
                  name="Toilets"
                  id="Toilets"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Toilets"
                  value={fittingValues.Toilets}
                  onChange={(e) =>
                    handleFittingChange("Toilets", e.target.value)
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="Kitchen"
                  className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white"
                >
                  Kitchen
                  { (editedKeysfromMain?.includes("Fitting.Kitchen") && pageNamefromMain===currentPage) && (<EditedTag/>) } 

                </label>
                <input
                  type="text"
                  name="Kitchen"
                  id="Kitchen"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Kitchen"
                  value={fittingValues.Kitchen}
                  onChange={(e) =>
                    handleFittingChange("Kitchen", e.target.value)
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="Doors"
                  className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white"
                >
                  Doors
                  { (editedKeysfromMain?.includes("Fitting.Doors") && pageNamefromMain===currentPage) && (<EditedTag/>) } 

                </label>
                <input
                  type="text"
                  name="Doors"
                  id="Doors"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Doors"
                  value={fittingValues.Doors}
                  onChange={(e) => handleFittingChange("Doors", e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="Windows"
                  className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white"
                >
                  Windows
                  { (editedKeysfromMain?.includes("Fitting.Windows") && pageNamefromMain===currentPage) && (<EditedTag/>) } 

                </label>
                <input
                  type="text"
                  name="Windows"
                  id="Windows"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Windows"
                  value={fittingValues.Windows}
                  onChange={(e) =>
                    handleFittingChange("Windows", e.target.value)
                  }
                />
              </div>
            </div>
          </>
        )}
      <ContinueButton
        modalSubmit={SubmitForm}
        butonSubName={"add Financial Details"}
      />
    </>
  );
}

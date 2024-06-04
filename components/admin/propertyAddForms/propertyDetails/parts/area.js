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
export default function AreaDetailPage({ setPropertyPageValue }) {
  // fetching Data for fencingsData
  const { data: fencingsData } = useFetch(
    `${API_BASE_URL_FOR_MASTER}/fencings`
  );
  // console.log("fencingsData", fencingsData);

  // fetching Data for flooringsData
  const { data: flooringsData } = useFetch(
    `${API_BASE_URL_FOR_MASTER}/floorings`
  );
  // console.log("flooringsData", flooringsData);

  // fetching Data for furnishedesData
  const { data: furnishedesData } = useFetch(
    `${API_BASE_URL_FOR_MASTER}/furnishedes`
  );
  console.log("furnishedesData", furnishedesData);

 

  // fetching Data for areaUnitData
  const { data: areaUnitData } = useFetch(
    `${API_BASE_URL_FOR_MASTER}/areaunits`
  );
  // console.log("areaUnitData", areaUnitData);
  const sessionStoragePropertyData = JSON.parse(
    sessionStorage.getItem("propertyData")
  );
  const propertTypWithSubTypeValue =
    sessionStoragePropertyData?.PropertyTypeWithSubtype.Name || "";
  const propertTypeValue = sessionStoragePropertyData?.PropertyType || "";
  const PropertyForValue = sessionStoragePropertyData?.PropertyFor || "";
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
  const wallTypesArray = [
    "No walls",
    "Brick walls",
    "Cenented walls",
    "Plastered walls",
  ];
  const defaultOption = [{ value: "", label: "no data found" }];
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
      setFittingValues({
        Electrical: sessionStoragePropertyData?.Fitting?.Electrical || "",
        Toilets: sessionStoragePropertyData?.Fitting?.Toilets || "",
        Kitchen: sessionStoragePropertyData?.Fitting?.Kitchen || "",
        Doors: sessionStoragePropertyData?.Fitting?.Doors || "",
        Windows: sessionStoragePropertyData?.Fitting?.Windows || "",
      });
      setEntranceWidth(sessionStoragePropertyData?.EntranceWidth || "");
      setWallType(
        sessionStoragePropertyData?.WallType || ""
      );
      setCellingHeight(sessionStoragePropertyData?.CellingHeight || "");
      setFencing(sessionStoragePropertyData?.Fencing || "");
      setFlooring(sessionStoragePropertyData?.Flooring || "");
      setFurnished(sessionStoragePropertyData?.Furnished || "");
      setBuiltAreaType(sessionStoragePropertyData?.BuiltAreaType || "");
      setLandArea(sessionStoragePropertyData?.LandArea || "");
      setCarpetArea(sessionStoragePropertyData?.CarpetArea || "");
      setBuiltUpArea(sessionStoragePropertyData?.BuiltUpArea || "");

      setAreaUnits(sessionStoragePropertyData?.PlotAreaData?.AreaUnits || "");
      setPlotArea(sessionStoragePropertyData?.PlotAreaData?.PlotArea);
      setPlotLength(sessionStoragePropertyData?.PlotAreaData?.PlotLength);
      setPlotWidth(sessionStoragePropertyData?.PlotAreaData?.PlotWidth);
    }
  }, []);
  const handleFittingChange = (field, value) => {
    setFittingValues((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };
  const checkRequiredFields = () => {
    if (propertTypWithSubTypeValue != "Plot" && (propertTypeValue=="Residential" || propertTypeValue=="Commercial")) {
      var requiredFields = [
        fencing,
        flooring,
        furnished,
        builtUpArea,
      ];
     
    } if(propertTypWithSubTypeValue == "Plot") {
      var requiredFields = [plotArea, plotLength, plotwidth];
    }
if(propertTypeValue=="Commercial" && propertTypWithSubTypeValue == "Office" ){
  var requiredFields = [
    fencing,
    flooring,
    furnished,
    builtUpArea,
    wallType
  ];
}
if (
  propertTypWithSubTypeValue == "Retail Shop" ||
  propertTypWithSubTypeValue == "Showroom"
){
  var requiredFields = [
    fencing,
    flooring,
    furnished,
    builtUpArea,
    entranceWidth,
    cellingHeight
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
      const thirdPropertyData = {
        Fencing: fencing,
        Flooring: flooring,
        Furnished: furnished,
        BuiltUpArea: builtUpArea,
        LandArea: parseInt(landArea),
        CarpetArea: parseInt(carpetArea),
        Fitting: fittingValues,
      };
      if (propertTypWithSubTypeValue == "Plot") {
        (thirdPropertyData.Fencing = ""),
          (thirdPropertyData.Flooring = ""),
          (thirdPropertyData.Furnished = ""),
          (thirdPropertyData.BuiltUpArea = ""),
          (thirdPropertyData.LandArea = ""),
          (thirdPropertyData.CarpetArea = ""),
          (thirdPropertyData.PlotAreaData = {
            PlotArea: plotArea,
            AreaUnits: areaUnits,
            PlotLength: plotLength,
            PlotWidth: plotwidth,
          });
      }
      if (propertTypWithSubTypeValue == "Office") {
        thirdPropertyData.WallType = wallType;
      }
      if (
        propertTypWithSubTypeValue == "Retail Shop" ||
        propertTypWithSubTypeValue == "Showroom"
      ) {
        thirdPropertyData.CellingHeight = cellingHeight;
        thirdPropertyData.EntranceWidth = entranceWidth;
      }
      console.log("thirdPropertyData", thirdPropertyData);
      const localStorageData = JSON.parse(
        sessionStorage.getItem("propertyData")
      );
      const newProjectData = { ...localStorageData, ...thirdPropertyData };
      sessionStorage.setItem("propertyData", JSON.stringify(newProjectData));
      setPropertyPageValue((prev) => prev + 1);
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
        {propertTypWithSubTypeValue && propertTypWithSubTypeValue == "Plot" && (
          <>
            {/* Plot Area */}
            <div>
              <label
                htmlFor="plotArea"
                className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white required"
              >
                Plot Area
              </label>
              <input
                type="number"
                name="plotArea"
                id="plotArea"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Plot Area"
                value={plotArea}
                onChange={(e) => setPlotArea(e.target.value)}
              />
            </div>
            {/*  Area Unit */}
            {areaUnitData && (
              <ApiButtons
                itemArray={areaUnitData}
                stateItem={areaUnits}
                labelName={"Area Unit"}
                ValueName={"Unit"}
                changeState={setAreaUnits}
              />
            )}

            {/* Plot Width */}
            <div>
              <label
                htmlFor="plotwidth"
                className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white required"
              >
                Width
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

        {/* BuiltAreaType */}
        {/* <div>
          <label
            htmlFor="builtAreaType"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
          >
            Built Area Type
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Built Area Type"
            required=""
            value={builtAreaType.Type}
            disabled={true}
          />
          {builtAreaTypesData ? (
            <div
              className={`flex flex-wrap space-x-2 mt-4 ${
                builtAreaTypesData?.data?.length > 8
                  ? `${Styles.scrollable}`
                  : ""
              }`}
            >
              {builtAreaTypesData?.data?.map((item) => (
                <button
                  key={item._id}
                  onClick={() =>
                    setBuiltAreaType({
                      _id: item._id,
                      Type: item.Type,
                    })
                  }
                  className={` rounded text-white px-4 py-2 ${
                    Styles.optionButton
                  } ${
                    builtAreaType._id === item._id
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
        </div> */}

        {/*  Area Unit */}
        {/* <div>
          <label
            htmlFor="areaUnit"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
          >
            Area Unit
          </label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Area Unit"
            required=""
            value={areaUnits.Unit}
            disabled={true}
          />
          {areaUnitData ? (
            <div
              className={`flex flex-wrap space-x-2 mt-4 ${
                areaUnitData?.data?.length > 8 ? `${Styles.scrollable}` : ""
              }`}
            >
              {areaUnitData?.data?.map((item) => (
                <button
                  key={item._id}
                  onClick={() =>
                    setAreaUnits({
                      _id: item._id,
                      Unit: item.Unit,
                    })
                  }
                  className={` rounded text-white px-4 py-2 ${
                    Styles.optionButton
                  } ${
                    areaUnits._id === item._id
                      ? "bg-[#2a4acb] border-2 border-[#2a4acb]"
                      : "bg-[#6592d3]  border-2 border-[#6592d3]"
                  }`}
                >
                  {item.Unit}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap space-x-2">
             <h1 className={`${Styles.noDataHead}`}>No Data Found</h1>
            </div>
          )}
        
        </div> */}
      </div>

      {propertTypWithSubTypeValue != "Plot" && (
        <>
          {" "}
          {/* Construction walls */}
          {propertTypWithSubTypeValue == "Office" && (
            <PropertyBigButtons
              labelName={"Wall Type"}
              itemArray={wallTypesArray}
              activeBtnvalue={wallType}
              changeState={setWallType}
            />
          )}
          {/* Fencing */}
          {fencingsData && (
            <ApiButtons
              itemArray={fencingsData}
              stateItem={fencing}
              labelName={"Fencing"}
              ValueName={"Fencing"}
              changeState={setFencing}
            />
          )}
          {/* Flooring */}
          {flooringsData && (
            <ApiButtons
              itemArray={flooringsData}
              stateItem={flooring}
              labelName={"Flooring"}
              ValueName={"Flooring"}
              changeState={setFlooring}
            />
          )}
          {/* Furnished */}
          {furnishedesData && (
            <ApiButtons
              itemArray={furnishedesData}
              stateItem={furnished}
              labelName={"Furnished"}
              ValueName={"Furnished"}
              changeState={setFurnished}
            />
          )}
          <div className="grid gap-4 mb-4 sm:grid-cols-2">
            {/* Builtup ARea */}
            <div>
              <label
                htmlFor="builtUpArea"
                className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white required"
              >
                Built Up Area
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
            {/* LandArea */}
            <div>
              <label
                htmlFor="landArea"
                className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white "
              >
                Land Area
              </label>
              <input
                type="number"
                name="landArea"
                id="landArea"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Land Area"
                value={landArea}
                onChange={(e) => setLandArea(e.target.value)}
              />
            </div>

           

            {/* CarpetArea */}
            <div>
              <label
                htmlFor="carpetArea"
                className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white "
              >
                Carpet Area
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
          </div>
        </>
      )}

      {(propertTypWithSubTypeValue == "Retail Shop" ||
        propertTypWithSubTypeValue == "Showroom") && (
        <>
          <div className="grid gap-4 mb-4 sm:grid-cols-2">
            {/* LandArea */}
            <div>
              <label
                htmlFor="entranceWidth"
                className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white required"
              >
                Entrance width in feet
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
                className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white required"
              >
                Celling height in feet
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
       {(propertTypWithSubTypeValue && propertTypeValue) &&
              (propertTypWithSubTypeValue != "Plot" && propertTypeValue=="Residential") && (
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
                      </label>
                      <input
                        type="text"
                        name="Doors"
                        id="Doors"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Doors"
                        value={fittingValues.Doors}
                        onChange={(e) =>
                          handleFittingChange("Doors", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="Windows"
                        className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white"
                      >
                        Windows
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
    </>
  );
}

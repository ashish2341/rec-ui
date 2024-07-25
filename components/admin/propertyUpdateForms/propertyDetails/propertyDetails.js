"use client";
import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import ButtonStepper from "@/components/common/buttonSteeper/buttonstepper";
import BasicPage from "./parts/editBasic";
import PossessionDetailsPage from "./parts/editPossession";
import FinancialDetailsPage from "./parts/editFinancial";
import AreaDetailPage from "./parts/editArea";
import RoomDetailPage from "./parts/editRooms";
import FacilitiesPage from "./parts/editFacilities";
export default function PropertyDetailsForm({
  setPropertyBackvalue,
  valueForNext,
  valueForNextPage,
  setPageValueInsidePropertyForm,
  editedKeys,
  pageName,
  setFormPageNumberArray,
  insidepropertyPagesName,
  setSubTypeChangedValue,
  subTypechangesValue,
  setInsidePropertyPageNameArray,
  setPageStatusArray,
  pageStatusData,
}) {
  const roleData = Cookies.get("roles") ?? "";
  const name = Cookies.get("name");
  const roles = roleData && JSON.parse(roleData);
  const userId = Cookies.get("userId");
  const sessionStoragePropertyData = JSON.parse(
    sessionStorage.getItem("EditPropertyData")
  );
  const propertTypWithSubTypeValue =
    sessionStoragePropertyData?.PropertySubtype?.Name || "";
  const propertTypeValue = sessionStoragePropertyData?.ProeprtyType || "";
  const PropertyForValue = sessionStoragePropertyData?.ProeprtyFor || "";

  const [propertyPageValue, setPropertyPageValue] = useState(1);
  useEffect(() => {
    setPageValueInsidePropertyForm(propertyPageValue);
  }, [propertyPageValue]);
  const handelBack = (value) => {
    setPropertyPageValue(propertyPageValue - 1);

    if (propertyPageValue == 2) {
      setPropertyBackvalue((prev) => prev - 1);
    }
  };
  const handelvalueForNextfromSix = (value) => {
    valueForNext(value);
  };
  let stepperArray = "";
  if (propertTypeValue == "Commercial") {
    stepperArray = [
      { name: "Basic", number: 1, matchName: "Basic" },
      { name: "Rooms", number: 2, matchName: "Rooms" },
      { name: "Area", number: 3, matchName: "Area" },
      { name: "Financial", number: 4, matchName: "Financial" },
      { name: "Possession", number: 5, matchName: "Possession" },
      { name: "Facilities", number: 6, matchName: "Facilities" },
    ];
  }
  if (propertTypWithSubTypeValue && propertTypWithSubTypeValue == "Plot") {
    stepperArray = [
      { name: "Basic", number: 1 ,matchName:"Basic" },
      { name: "Area", number: 2 ,matchName:"Area"},
      { name: "Financial", number: 3 ,matchName:"Financial"},
      { name: "Possession", number: 4 ,matchName:"Possession"},
      // {name:"Loan",number:6}
    ];
  }
  if (
    propertTypeValue &&
    propertTypeValue == "Residential" &&
    propertTypWithSubTypeValue != "Plot"
  ) {
    stepperArray = [
      { name: "Basic", number: 1 ,matchName:"Basic" },
      { name: "Rooms", number: 2 ,matchName:"Rooms"},
      { name: "Area", number: 3 ,matchName:"Area" },
      { name: "Financial", number: 4 ,matchName:"Financial"},
      { name: "Possession", number: 5 ,matchName:"Possession"},
      // {name:"Loan",number:6}
    ];
  }
  return (
    <>
      <div className="mb-5 ">
        {stepperArray && (
          <ButtonStepper
            setPropertyPageValue={setPropertyPageValue}
            forStepper={stepperArray}
            forpageValue={propertyPageValue}
            type={"update"}
            pageNameArray={insidepropertyPagesName}
          />
        )}
      </div>

      {/* {propertyPageValue > 1 ? (
        <button
          onClick={handelBack}
          type="button"
          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border-2 border-black hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-black dark:hover:text-white dark:hover:bg-gray-700"
        >
          <span>
            <i className="bi bi-arrow-left"></i>
          </span>{" "}
          Back
        </button>
      ) : null} */}
      {propertTypeValue &&
        propertTypeValue == "Residential" &&
        propertTypWithSubTypeValue != "Plot" && (
          <>
            {propertyPageValue == 1 && (
              <BasicPage
                setPropertyPageValue={setPropertyPageValue}
                setPropertyBackvalue={setPropertyBackvalue}
                editedKeysfromMain={editedKeys}
                pageNamefromMain={pageName}
                valueForNextfromSix={handelvalueForNextfromSix}
                changedSubtypeValue={subTypechangesValue}
                setInsidePropertyPageNameArray={setInsidePropertyPageNameArray}
              />
            )}
            {propertyPageValue == 2 ? (
              <RoomDetailPage
                setPropertyPageValue={setPropertyPageValue}
                editedKeysfromMain={editedKeys}
                pageNamefromMain={pageName}
                valueForNextfromSix={handelvalueForNextfromSix}
                changedSubtypeValue={subTypechangesValue}
                setInsidePropertyPageNameArray={setInsidePropertyPageNameArray}
              />
            ) : null}
            {propertyPageValue == 3 ? (
              <AreaDetailPage
                setPropertyPageValue={setPropertyPageValue}
                editedKeysfromMain={editedKeys}
                pageNamefromMain={pageName}
                valueForNextfromSix={handelvalueForNextfromSix}
                changedSubtypeValue={subTypechangesValue}
                setInsidePropertyPageNameArray={setInsidePropertyPageNameArray}
              />
            ) : null}
            {propertyPageValue == 4 && (
              <FinancialDetailsPage
                setPropertyPageValue={setPropertyPageValue}
                editedKeysfromMain={editedKeys}
                pageNamefromMain={pageName}
                valueForNextfromSix={handelvalueForNextfromSix}
                changedSubtypeValue={subTypechangesValue}
                setInsidePropertyPageNameArray={setInsidePropertyPageNameArray}
              />
            )}
            {propertyPageValue == 5 && (
              <PossessionDetailsPage
                valueForNextfromSix={handelvalueForNextfromSix}
                valueForNextPagefromSix={valueForNextPage}
                setPropertyBackvalue={setPropertyBackvalue}
                editedKeysfromMain={editedKeys}
                pageNamefromMain={pageName}
                changedSubtypeValue={subTypechangesValue}
                setSubTypeChangedValue={setSubTypeChangedValue}
                setFormPageNumberArray={setFormPageNumberArray}
                setInsidePropertyPageNameArray={setInsidePropertyPageNameArray}
                setPageStatusArray={setPageStatusArray}
                mainFormPageStatusData={pageStatusData}
              />
            )}
            {/* {propertyPageValue == 6 && (
            <PartSix
              valueForNextfromSix={handelvalueForNextfromSix}
              valueForNextPagefromSix={valueForNextPage}
              setPropertyBackvalue={setPropertyBackvalue}
            />
          )} */}
          </>
        )}
      {propertTypeValue &&
        propertTypeValue == "Commercial" &&
        propertTypWithSubTypeValue != "Plot" && (
          <>
            {propertyPageValue == 1 && (
              <BasicPage
                setPropertyPageValue={setPropertyPageValue}
                setPropertyBackvalue={setPropertyBackvalue}
                editedKeysfromMain={editedKeys}
                pageNamefromMain={pageName}
                valueForNextfromSix={handelvalueForNextfromSix}
                changedSubtypeValue={subTypechangesValue}
                setInsidePropertyPageNameArray={setInsidePropertyPageNameArray}
              />
            )}
            {propertyPageValue == 2 ? (
              <RoomDetailPage
                setPropertyPageValue={setPropertyPageValue}
                editedKeysfromMain={editedKeys}
                pageNamefromMain={pageName}
                valueForNextfromSix={handelvalueForNextfromSix}
                changedSubtypeValue={subTypechangesValue}
                setInsidePropertyPageNameArray={setInsidePropertyPageNameArray}
              />
            ) : null}
            {propertyPageValue == 3 ? (
              <AreaDetailPage
                setPropertyPageValue={setPropertyPageValue}
                editedKeysfromMain={editedKeys}
                pageNamefromMain={pageName}
                valueForNextfromSix={handelvalueForNextfromSix}
                changedSubtypeValue={subTypechangesValue}
                setInsidePropertyPageNameArray={setInsidePropertyPageNameArray}
              />
            ) : null}
            {propertyPageValue == 4 && (
              <FinancialDetailsPage
                setPropertyPageValue={setPropertyPageValue}
                editedKeysfromMain={editedKeys}
                pageNamefromMain={pageName}
                valueForNextfromSix={handelvalueForNextfromSix}
                changedSubtypeValue={subTypechangesValue}
                setInsidePropertyPageNameArray={setInsidePropertyPageNameArray}
              />
            )}
            {propertyPageValue == 5 && (
              <PossessionDetailsPage
                setPropertyPageValue={setPropertyPageValue}
                valueForNextfromSix={handelvalueForNextfromSix}
                valueForNextPagefromSix={valueForNextPage}
                setPropertyBackvalue={setPropertyBackvalue}
                editedKeysfromMain={editedKeys}
                pageNamefromMain={pageName}
                changedSubtypeValue={subTypechangesValue}
                setFormPageNumberArray={setFormPageNumberArray}
                setInsidePropertyPageNameArray={setInsidePropertyPageNameArray}
                setPageStatusArray={setPageStatusArray}
                mainFormPageStatusData={pageStatusData}
              />
            )}
            {propertyPageValue == 6 && (
              <FacilitiesPage
                valueForNextfromSix={handelvalueForNextfromSix}
                valueForNextPagefromSix={valueForNextPage}
                setPropertyBackvalue={setPropertyBackvalue}
                editedKeysfromMain={editedKeys}
                pageNamefromMain={pageName}
                changedSubtypeValue={subTypechangesValue}
                setFormPageNumberArray={setFormPageNumberArray}
                setInsidePropertyPageNameArray={setInsidePropertyPageNameArray}
                setPageStatusArray={setPageStatusArray}
                mainFormPageStatusData={pageStatusData}
              />
            )}
          </>
        )}
      {propertTypWithSubTypeValue && propertTypWithSubTypeValue == "Plot" && (
        <>
          {propertyPageValue == 1 && (
            <BasicPage
              setPropertyPageValue={setPropertyPageValue}
              setPropertyBackvalue={setPropertyBackvalue}
              editedKeysfromMain={editedKeys}
              pageNamefromMain={pageName}
              valueForNextfromSix={handelvalueForNextfromSix}
              changedSubtypeValue={subTypechangesValue}
              setInsidePropertyPageNameArray={setInsidePropertyPageNameArray}
            />
          )}

          {propertyPageValue == 2 ? (
            <AreaDetailPage
              setPropertyPageValue={setPropertyPageValue}
              editedKeysfromMain={editedKeys}
              pageNamefromMain={pageName}
              valueForNextfromSix={handelvalueForNextfromSix}
              changedSubtypeValue={subTypechangesValue}
              setInsidePropertyPageNameArray={setInsidePropertyPageNameArray}
            />
          ) : null}
          {propertyPageValue == 3 && (
            <FinancialDetailsPage
              setPropertyPageValue={setPropertyPageValue}
              editedKeysfromMain={editedKeys}
              pageNamefromMain={pageName}
              valueForNextfromSix={handelvalueForNextfromSix}
              changedSubtypeValue={subTypechangesValue}
              setInsidePropertyPageNameArray={setInsidePropertyPageNameArray}
            />
          )}
          {propertyPageValue == 4 && (
            <PossessionDetailsPage
              valueForNextfromSix={handelvalueForNextfromSix}
              valueForNextPagefromSix={valueForNextPage}
              setPropertyBackvalue={setPropertyBackvalue}
              editedKeysfromMain={editedKeys}
              pageNamefromMain={pageName}
              changedSubtypeValue={subTypechangesValue}
              setFormPageNumberArray={setFormPageNumberArray}
              setInsidePropertyPageNameArray={setInsidePropertyPageNameArray}
              setPageStatusArray={setPageStatusArray}
              mainFormPageStatusData={pageStatusData}
            />
          )}
          {/* {propertyPageValue == 5 && (
            <PartSix
              valueForNextfromSix={handelvalueForNextfromSix}
              valueForNextPagefromSix={valueForNextPage}
              setPropertyBackvalue={setPropertyBackvalue}
            />
          )} */}
        </>
      )}
    </>
  );
}

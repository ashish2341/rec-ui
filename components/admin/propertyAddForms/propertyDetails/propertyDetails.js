"use client";
import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import PartOne from "./parts/Basic";
import PartTwo from "./parts/rooms";
import PartThree from "./parts/area";
import PartFour from "./parts/financial";
import PartFive from "./parts/possession";
import PartSix from "./parts/facilities";
import ButtonStepper from "@/components/common/buttonSteeper/buttonstepper";
import BasicPage from "./parts/Basic";
import PossessionDetailsPage from "./parts/possession";
import FinancialDetailsPage from "./parts/financial";
import AreaDetailPage from "./parts/area";
import RoomDetailPage from "./parts/rooms";
import FacilitiesPage from "./parts/facilities";
export default function PropertyDetailsForm({
  setPropertyBackvalue,
  valueForNext,
  valueForNextPage,
  setPageValueInsidePropertyForm,
  setFormPageNumberArray,
  setInsidePropertyPageNameArray,insidePropertyNames,setPageStatusArray,pageStatusData
}) {
  const roleData = Cookies.get("roles") ?? "";
  const name = Cookies.get("name");
  const roles = roleData && JSON.parse(roleData);
  const userId = Cookies.get("userId");
  const sessionStoragePropertyData = JSON.parse(
    sessionStorage.getItem("propertyData")
  );
  const propertTypWithSubTypeValue =
    sessionStoragePropertyData?.PropertySubtype.Name || "";
  const propertTypeValue = sessionStoragePropertyData?.ProeprtyType || "";
  const PropertyForValue = sessionStoragePropertyData?.ProeprtyFor || "";

  const [propertyPageValue, setPropertyPageValue] = useState(1);


  useEffect(() => {
   
    setPageValueInsidePropertyForm(propertyPageValue);
    sessionStorage.setItem(
      "insidepropertyPageArray",
      JSON.stringify(insidePropertyNames)
    );
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
      { name: "Basic", number: 1 ,matchName:"Basic" },
      { name: "Rooms", number: 2 ,matchName:"Rooms"},
      { name: "Area", number: 3 ,matchName:"Area" },
      { name: "Financial", number: 4 ,matchName:"Financial"},
      { name: "Possession", number: 5 ,matchName:"Possession"},
      { name: "Facilities", number: 6 ,matchName:"Facilities"},
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
        <ButtonStepper
          setPropertyPageValue={setPropertyPageValue}
          forStepper={stepperArray}
          forpageValue={propertyPageValue}
          pageNameArray={insidePropertyNames}
        />
      </div>
      {propertTypeValue &&
        propertTypeValue == "Residential" &&
        propertTypWithSubTypeValue != "Plot" && (
          <>
            {propertyPageValue == 1 && (
              <BasicPage
                setPropertyPageValue={setPropertyPageValue}
                setPropertyBackvalue={setPropertyBackvalue}
                setInsidePropertyPageNameArray={setInsidePropertyPageNameArray}
              />
            )}
            {propertyPageValue == 2 ? (
              <RoomDetailPage
                setPropertyPageValue={setPropertyPageValue}
                setInsidePropertyPageNameArray={setInsidePropertyPageNameArray}
              />
            ) : null}
            {propertyPageValue == 3 ? (
              <AreaDetailPage
                setPropertyPageValue={setPropertyPageValue}
                setInsidePropertyPageNameArray={setInsidePropertyPageNameArray}
              />
            ) : null}
            {propertyPageValue == 4 && (
              <FinancialDetailsPage
                setPropertyPageValue={setPropertyPageValue}
                setInsidePropertyPageNameArray={setInsidePropertyPageNameArray}
              />
            )}
            {propertyPageValue == 5 && (
              <PossessionDetailsPage
                valueForNextfromSix={handelvalueForNextfromSix}
                valueForNextPagefromSix={valueForNextPage}
                setPropertyBackvalue={setPropertyBackvalue}
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
                setInsidePropertyPageNameArray={setInsidePropertyPageNameArray}
              />
            )}
            {propertyPageValue == 2 ? (
              <RoomDetailPage
                setPropertyPageValue={setPropertyPageValue}
                setInsidePropertyPageNameArray={setInsidePropertyPageNameArray}
              />
            ) : null}
            {propertyPageValue == 3 ? (
              <AreaDetailPage
                setPropertyPageValue={setPropertyPageValue}
                setInsidePropertyPageNameArray={setInsidePropertyPageNameArray}
              />
            ) : null}
            {propertyPageValue == 4 && (
              <FinancialDetailsPage
                setPropertyPageValue={setPropertyPageValue}
                setInsidePropertyPageNameArray={setInsidePropertyPageNameArray}
              />
            )}
            {propertyPageValue == 5 && (
              <PossessionDetailsPage
                setPropertyPageValue={setPropertyPageValue}
                valueForNextfromSix={handelvalueForNextfromSix}
                valueForNextPagefromSix={valueForNextPage}
                setPropertyBackvalue={setPropertyBackvalue}
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
              setInsidePropertyPageNameArray={setInsidePropertyPageNameArray}
            />
          )}

          {propertyPageValue == 2 ? (
            <AreaDetailPage
              setPropertyPageValue={setPropertyPageValue}
              setInsidePropertyPageNameArray={setInsidePropertyPageNameArray}
            />
          ) : null}
          {propertyPageValue == 3 && (
            <FinancialDetailsPage
              setPropertyPageValue={setPropertyPageValue}
              setInsidePropertyPageNameArray={setInsidePropertyPageNameArray}
            />
          )}
          {propertyPageValue == 4 && (
            <PossessionDetailsPage
              valueForNextfromSix={handelvalueForNextfromSix}
              valueForNextPagefromSix={valueForNextPage}
              setPropertyBackvalue={setPropertyBackvalue}
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

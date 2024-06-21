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
      { name: "Basic", number: 1 },
      { name: "Rooms", number: 2 },
      { name: "Area", number: 3 },
      { name: "Financial", number: 4 },
      { name: "Possession", number: 5 },
      { name: "Facilities", number: 6 },
    ];
  }
  if (propertTypWithSubTypeValue && propertTypWithSubTypeValue == "Plot") {
    stepperArray = [
      { name: "Basic", number: 1 },
      { name: "Area", number: 2 },
      { name: "Financial", number: 3 },
      { name: "Possession", number: 4 },
      // {name:"Loan",number:6}
    ];
  }
  if (
    propertTypeValue &&
    propertTypeValue == "Residential" &&
    propertTypWithSubTypeValue != "Plot"
  ) {
    stepperArray = [
      { name: "Basic", number: 1 },
      { name: "Rooms", number: 2 },
      { name: "Area", number: 3 },
      { name: "Financial", number: 4 },
      { name: "Possession", number: 5 },
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
              />
            )}
            {propertyPageValue == 2 ? (
              <RoomDetailPage setPropertyPageValue={setPropertyPageValue} />
            ) : null}
            {propertyPageValue == 3 ? (
              <AreaDetailPage setPropertyPageValue={setPropertyPageValue} />
            ) : null}
            {propertyPageValue == 4 && (
              <FinancialDetailsPage
                setPropertyPageValue={setPropertyPageValue}
              />
            )}
            {propertyPageValue == 5 && (
              <PossessionDetailsPage
                valueForNextfromSix={handelvalueForNextfromSix}
                valueForNextPagefromSix={valueForNextPage}
                setPropertyBackvalue={setPropertyBackvalue}
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
              />
            )}
            {propertyPageValue == 2 ? (
              <RoomDetailPage setPropertyPageValue={setPropertyPageValue} />
            ) : null}
            {propertyPageValue == 3 ? (
              <AreaDetailPage setPropertyPageValue={setPropertyPageValue} />
            ) : null}
            {propertyPageValue == 4 && (
              <FinancialDetailsPage
                setPropertyPageValue={setPropertyPageValue}
              />
            )}
            {propertyPageValue == 5 && (
              <PossessionDetailsPage
                setPropertyPageValue={setPropertyPageValue}
                valueForNextfromSix={handelvalueForNextfromSix}
                valueForNextPagefromSix={valueForNextPage}
                setPropertyBackvalue={setPropertyBackvalue}
              />
            )}
            {propertyPageValue == 6 && (
              <FacilitiesPage
                valueForNextfromSix={handelvalueForNextfromSix}
                valueForNextPagefromSix={valueForNextPage}
                setPropertyBackvalue={setPropertyBackvalue}
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
            />
          )}

          {propertyPageValue == 2 ? (
            <AreaDetailPage setPropertyPageValue={setPropertyPageValue} />
          ) : null}
          {propertyPageValue == 3 && (
            <FinancialDetailsPage setPropertyPageValue={setPropertyPageValue} />
          )}
          {propertyPageValue == 4 && (
            <PossessionDetailsPage
              valueForNextfromSix={handelvalueForNextfromSix}
              valueForNextPagefromSix={valueForNextPage}
              setPropertyBackvalue={setPropertyBackvalue}
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

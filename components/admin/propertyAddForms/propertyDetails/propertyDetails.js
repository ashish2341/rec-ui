"use client";
import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import PartOne from "./parts/partOne";
import PartTwo from "./parts/partTwo";
import PartThree from "./parts/partThree";
import PartFour from "./parts/partFour";
import PartFive from "./parts/partFive";
import PartSix from "./parts/partSIx";
import ButtonStepper from "@/components/common/buttonSteeper/buttonstepper";
export default function PropertyDetailsForm({
  setPropertyBackvalue,
  valueForNext,
  valueForNextPage,
}) {
  const roleData = Cookies.get("roles") ?? "";
  const name = Cookies.get("name");
  const roles = roleData && JSON.parse(roleData);
  const userId = Cookies.get("userId");

  const [propertyPageValue, setPropertyPageValue] = useState(1);

  const handelBack = (value) => {
    setPropertyPageValue(propertyPageValue - 1);
    if (propertyPageValue == 2) {
      setPropertyBackvalue((prev) => prev - 1);
    }
  };
  const handelvalueForNextfromSix = (value) => {
    console.log("handelvalueForNextfromSix value", value);
    valueForNext(value);
  };
  const stepperArray = [
    
      {name:"Basic",number:1},
      {name:"Rooms",number:2},
      {name:"Area",number:3},
      {name:"Price",number:4},
      {name:"Status",number:5},
      {name:"Loan",number:6}
  ];
  return (
    <>
    
      <h3 className="mb-4 text-lg font-medium leading-none underline text-gray-900 dark:text-white">
        Property Details{" "}
      </h3>
      <div className="mb-5 "> 
      <ButtonStepper forStepper={stepperArray} forpageValue={propertyPageValue}/>
      </div>
     
      {propertyPageValue > 1 ? (
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
      ) : null}

      {propertyPageValue == 1 && (
        <PartOne
          setPropertyPageValue={setPropertyPageValue}
          setPropertyBackvalue={setPropertyBackvalue}
        />
      )}
      {propertyPageValue == 2 && (
        <PartTwo setPropertyPageValue={setPropertyPageValue} />
      )}
      {propertyPageValue == 3 && (
        <PartThree setPropertyPageValue={setPropertyPageValue} />
      )}
      {propertyPageValue == 4 && (
        <PartFour setPropertyPageValue={setPropertyPageValue} />
      )}
      {propertyPageValue == 5 && (
        <PartFive setPropertyPageValue={setPropertyPageValue} />
      )}
      {propertyPageValue == 6 && (
        <PartSix
          valueForNextfromSix={handelvalueForNextfromSix}
          valueForNextPagefromSix={valueForNextPage}
          setPropertyBackvalue={setPropertyBackvalue}
        />
      )}
    </>
  );
}

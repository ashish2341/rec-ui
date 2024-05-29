import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { API_BASE_URL_FOR_MASTER } from "@/utils/constants";
import useFetch from "@/customHooks/useFetch";
import ButtonStepper from "@/components/common/buttonSteeper/buttonstepper";
import PartOne from "./parts/partOne";
import PartTwo from "./parts/partTwo";
import PartThree from "./parts/partThree";
import PartFour from "./parts/partFour";
import PartFive from "./parts/partFive";


export default function FeaturesDetailsForm({
  onAmenitiesChange,
  onFeaturesChange,
  valueForNext,
  valueForNextPage,
  setPropertyBackvalue,
}) {


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
    {name:"Aminities",number:1},
    {name:"Features",number:2},
    {name:"Floors",number:3},
    {name:"Fitting",number:4},
    {name:"Walls",number:5}
  ];
  return (
    <>
      <h3 className="mb-4 text-lg font-medium leading-none underline text-gray-900 dark:text-white">
        Feature Details{" "}
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
        <PartFive
          valueForNextfromSix={handelvalueForNextfromSix}
          valueForNextPagefromSix={valueForNextPage}
        />
      )}
    
    </>
  );
}

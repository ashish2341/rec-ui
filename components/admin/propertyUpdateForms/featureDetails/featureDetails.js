import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { API_BASE_URL_FOR_MASTER } from "@/utils/constants";
import useFetch from "@/customHooks/useFetch";
import ButtonStepper from "@/components/common/buttonSteeper/buttonstepper";
import AmenityPage from "./parts/Amenities";
import FeaturePage from "./parts/Features";

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
    { name: "Aminities", number: 1 },
    { name: "Features", number: 2 },
  ];
  return (
    <>
      <div className="mb-5 ">
        <ButtonStepper
          forStepper={stepperArray}
          forpageValue={propertyPageValue}
          setPropertyPageValue={setPropertyPageValue}
        />
      </div>

     

      {propertyPageValue == 1 && (
        <AmenityPage
          setPropertyPageValue={setPropertyPageValue}
          setPropertyBackvalue={setPropertyBackvalue}
        />
      )}
      {propertyPageValue == 2 && (
        <FeaturePage
          valueForNextfromSix={handelvalueForNextfromSix}
          valueForNextPagefromSix={valueForNextPage}
        />
      )}
      {/* {propertyPageValue == 3 && (
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
      )} */}
    </>
  );
}

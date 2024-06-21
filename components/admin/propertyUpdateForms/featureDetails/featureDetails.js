import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { API_BASE_URL_FOR_MASTER,currentPage } from "@/utils/constants";
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
editedKeys, pageName
}) {
  const [propertyPageValue, setPropertyPageValue] = useState(1);

  const handelBack = (value) => {
    setPropertyPageValue(propertyPageValue - 1);
    if (propertyPageValue == 2) {
      setPropertyBackvalue((prev) => prev - 1);
    }
  };
  const handelvalueForNextfromSix = (value) => {
    valueForNext(value);
  };
  const stepperArray = [
    { name: "Amenities", number: 1 },
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
          editedKeysfromMain={editedKeys}
                pageNamefromMain={pageName}
        />
      )}
      {propertyPageValue == 2 && (
        <FeaturePage
          valueForNextfromSix={handelvalueForNextfromSix}
          valueForNextPagefromSix={valueForNextPage}
          editedKeysfromMain={editedKeys}
                pageNamefromMain={pageName}
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

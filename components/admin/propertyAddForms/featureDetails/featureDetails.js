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
  setPropertyBackvalue,setFormPageNumberArray,setFeaturesPageNameArray,
  featuresPageNames,setPageStatusArray,pageStatusData
}) {
  const [propertyPageValue, setPropertyPageValue] = useState(1);
  useEffect(() => {
    
    sessionStorage.setItem(
      "featurespropertyPageArray",
      JSON.stringify(featuresPageNames)
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
  const stepperArray = [
    { name: "Amenities", number: 1 ,matchName:"Amenities" },
    { name: "Features", number: 2 ,matchName:"Features" },
  ];
  return (
    <>
      <div className="mb-5 ">
        <ButtonStepper
          forStepper={stepperArray}
          forpageValue={propertyPageValue}
          setPropertyPageValue={setPropertyPageValue}
          pageNameArray={featuresPageNames}
        />
      </div>

      

      {propertyPageValue == 1 && (
        <AmenityPage
          setPropertyPageValue={setPropertyPageValue}
          setPropertyBackvalue={setPropertyBackvalue}
          setFeaturesPageNameArray={setFeaturesPageNameArray}
        />
      )}
      {propertyPageValue == 2 && (
        <FeaturePage
          valueForNextfromSix={handelvalueForNextfromSix}
          valueForNextPagefromSix={valueForNextPage}
          setFormPageNumberArray={setFormPageNumberArray}
          setFeaturesPageNameArray={setFeaturesPageNameArray}
          setPageStatusArray={setPageStatusArray}
                mainFormPageStatusData={pageStatusData}
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

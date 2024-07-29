"use client";
import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { API_BASE_URL_FOR_MASTER } from "@/utils/constants";
import useFetch from "@/customHooks/useFetch";
import Cookies from "js-cookie";
import Styles from "../featurepage.module.css";
import ContinueButton from "@/components/common/propertyContinueButton/continueButton";
import ArrayButtons from "@/components/common/admin/arrayButtons/arrayButtons";
import NextButton from "@/components/common/admin/nextButton/nextButton";
import LoaderForMedia from "@/components/common/admin/loaderforMedia/loaderForMedia";
import { UpdateStepsStatus ,findNextStep } from "@/utils/commonHelperFn";

export default function FeaturePage({
  valueForNextfromSix,
  valueForNextPagefromSix,setFormPageNumberArray,setFeaturesPageNameArray,setPageStatusArray,
  mainFormPageStatusData
}) {
  // fetching Data for Features
  const { data: featuresData ,loading: DataLoading, } = useFetch(
    `${API_BASE_URL_FOR_MASTER}/features`
  );

  const [selectedFeatures, setSelectedFeatures] = useState([]);
  useEffect(() => {
    // Retrieve data from localStorage
    const sessionStoragePropertyData = JSON.parse(
      sessionStorage.getItem("propertyData")
    );

    // Update state values if data exists in localStorage
    if (sessionStoragePropertyData) {
      setSelectedFeatures(sessionStoragePropertyData?.Features || []);
    }
  }, []);

  const handlefeatureChange = (itemId) => {
    setSelectedFeatures((prev) => {
      const isSelected = prev.some(
        (selectedItemId) => selectedItemId === itemId
      );
      if (isSelected) {
        return prev.filter((selectedItemId) => selectedItemId !== itemId);
      } else {
        return [...prev, itemId];
      }
    });
  };
  const SubmitForm = () => {
    // if (selectedFeatures.length == 0) {
    //   toast.error("Please select a Feature.");
    //   return false;
    // }
    const featureData = {
      Features: selectedFeatures,
    };

    const localStorageData = JSON.parse(sessionStorage.getItem("propertyData"));
    const newProjectData = { ...localStorageData, ...featureData };
    sessionStorage.setItem("propertyData", JSON.stringify(newProjectData));
   
    setFormPageNumberArray(prev => {
      // Check if the newPage already exists in the array
      if (!prev.includes("Amenity/Feature")) {
        return [...prev, "Amenity/Feature"];
      }
      return prev; // If it already exists, return the previous state
    });
    setFeaturesPageNameArray(prev => {
      // Check if the newPage already exists in the array
      if (!prev.includes("Features")) {
        return [...prev, "Features"];
      }
      return prev; // If it already exists, return the previous state
    });
    setPageStatusArray(UpdateStepsStatus(mainFormPageStatusData,valueForNextPagefromSix))
      const finalIndexValue=findNextStep(mainFormPageStatusData,valueForNextPagefromSix)
      if(finalIndexValue.finalIndex <= valueForNextPagefromSix && finalIndexValue.currentStepStatus===false){
        valueForNextfromSix(finalIndexValue.finalIndex + 1);
      }else{
        
        valueForNextfromSix(finalIndexValue.finalIndex);
      }
      
    // valueForNextfromSix(valueForNextPagefromSix + 1);
  };
  return (
    <>{DataLoading && <LoaderForMedia />}
      {featuresData && (
        <>
          <ArrayButtons
            itemArray={featuresData}
            selectItems={selectedFeatures}
            labelName={"Feature"}
            buttonName={"Feature"}
            setValueinState={setSelectedFeatures}
          />
          <NextButton
            onSubmit={SubmitForm}
            butonSubName={"add Images & Video Details"}
          />
        </>
      )}
    </>
  );
}

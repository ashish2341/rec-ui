"use client";
import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { API_BASE_URL_FOR_MASTER,currentPage } from "@/utils/constants";
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
  valueForNextPagefromSix,editedKeysfromMain,
  pageNamefromMain,valueForFaqPage, changedSubtypeValue,
  setFeaturesPageNameArray,
  setFormPageNumberArray,setPageStatusArray,
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
      sessionStorage.getItem("EditPropertyData")
    );
   
    // Update state values if data exists in localStorage
    if (sessionStoragePropertyData) {
      setSelectedFeatures(sessionStoragePropertyData?.Features?.map((item) => {
        return item._id ? item._id :item ;
      }) || []);
    }
  }, []);

  const SubmitForm = () => {
    // if (selectedFeatures.length == 0) {
    //   toast.error("Please select a Feature.");
    //   return false;
    // }
    const featureData = {
      Features: selectedFeatures,
    };
    const localStorageData = JSON.parse(
      sessionStorage.getItem("EditPropertyData")
    );
    const newProjectData = { ...localStorageData, ...featureData };
    sessionStorage.setItem("EditPropertyData", JSON.stringify(newProjectData));
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
  };
  return (
    <>
    {DataLoading && <LoaderForMedia />}
      {featuresData && selectedFeatures && ( 
        <> <ArrayButtons
        itemArray={featuresData}
        selectItems={selectedFeatures}
        labelName={"Feature"}
        buttonName={"Feature"}
        setValueinState={setSelectedFeatures}
        changedKeyArray={editedKeysfromMain}
        showPageName={pageNamefromMain}
        currentPageName={currentPage}
        specifiedKey={"Features"}
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

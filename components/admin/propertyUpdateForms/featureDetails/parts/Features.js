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

export default function FeaturePage({
  valueForNextfromSix,
  valueForNextPagefromSix,
}) {
  // fetching Data for Features
  const { data: featuresData } = useFetch(
    `${API_BASE_URL_FOR_MASTER}/features`
  );
  console.log("featuresData", featuresData);

  const [selectedFeatures, setSelectedFeatures] = useState([]);
  useEffect(() => {
    // Retrieve data from localStorage
    const sessionStoragePropertyData = JSON.parse(
      sessionStorage.getItem("EditPropertyData")
    );
    console.log(
      "localStorageData from localstorage",
      sessionStoragePropertyData
    );
    // Update state values if data exists in localStorage
    if (sessionStoragePropertyData) {
      setSelectedFeatures(sessionStoragePropertyData?.Features?.map((item) => {
        return item._id ? item._id :item ;
      }) || []);
    }
  }, []);

  const SubmitForm = () => {
    if (selectedFeatures.length == 0) {
      toast.error("Please select a Feature.");
      return false;
    }
    const featureData = {
      Features: selectedFeatures,
    };
    console.log("featureData", featureData);
    const localStorageData = JSON.parse(
      sessionStorage.getItem("EditPropertyData")
    );
    const newProjectData = { ...localStorageData, ...featureData };
    sessionStorage.setItem("EditPropertyData", JSON.stringify(newProjectData));
    valueForNextfromSix(valueForNextPagefromSix + 1);
  };
  return (
    <>
      {featuresData && selectedFeatures && ( 
        <> <ArrayButtons
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

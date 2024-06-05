"use client";
import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { API_BASE_URL_FOR_MASTER } from "@/utils/constants";
import useFetch from "@/customHooks/useFetch";
import Cookies from "js-cookie";
import Styles from "../featurepage.module.css";
import ContinueButton from "@/components/common/propertyContinueButton/continueButton";
import ArrayButtons from "@/components/common/admin/arrayButtons/arrayButtons";

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
      sessionStorage.getItem("propertyData")
    );
    console.log(
      "localStorageData from localstorage",
      sessionStoragePropertyData
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
    if (selectedFeatures.length == 0) {
      toast.error("Please select a Amenity.");
      return false;
    }
    const featureData = {
      Features: selectedFeatures,
    };
    console.log("featureData", featureData);
    const localStorageData = JSON.parse(sessionStorage.getItem("propertyData"));
    const newProjectData = { ...localStorageData, ...featureData };
    sessionStorage.setItem("propertyData", JSON.stringify(newProjectData));
    valueForNextfromSix(valueForNextPagefromSix + 1);
  };
  return (
    <>
      <div className={`flex justify-end ${Styles.continueBtn}`}>
        <ContinueButton modalSubmit={SubmitForm} />
      </div>
      <ArrayButtons
        itemArray={featuresData}
        selectItems={selectedFeatures}
        labelName={"Feature"}
        buttonName={"Feature"}
        setValueinState={setSelectedFeatures}
      />
    </>
  );
}

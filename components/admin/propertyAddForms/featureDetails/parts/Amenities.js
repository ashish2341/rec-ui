"use client";
import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { API_BASE_URL_FOR_MASTER } from "@/utils/constants";
import useFetch from "@/customHooks/useFetch";
import Cookies from "js-cookie";
import Styles from "../featurepage.module.css";
import ContinueButton from "@/components/common/propertyContinueButton/continueButton";
import ArrayButtons from "@/components/common/admin/arrayButtons/arrayButtons";
import LoaderForMedia from "@/components/common/admin/loaderforMedia/loaderForMedia";
export default function AmenityPage({
  setPropertyPageValue,
  setPropertyBackvalue,setFeaturesPageNameArray
}) {
  const roleData = Cookies.get("roles") ?? "";
  const name = Cookies.get("name");
  const roles = roleData && JSON.parse(roleData);
  const userId = Cookies.get("userId");
  // fetching Data for Amenities
  const { data: aminitiesData ,loading: DataLoading,} = useFetch(
    `${API_BASE_URL_FOR_MASTER}/aminities`
  );

  const [selectedAmenities, setSelectedAmenities] = useState([]);
  useEffect(() => {
    // Retrieve data from localStorage
    const sessionStoragePropertyData = JSON.parse(
      sessionStorage.getItem("propertyData")
    );

    // Update state values if data exists in localStorage
    if (sessionStoragePropertyData) {
      setSelectedAmenities(sessionStoragePropertyData?.Aminities || []);
    }
  }, []);

  const SubmitForm = () => {
    // if (selectedAmenities.length == 0) {
    //   toast.error("Please select a Amenity.");
    //   return false;
    // }
    const AmenityData = {
      Aminities: selectedAmenities,
    };

    const localStorageData = JSON.parse(sessionStorage.getItem("propertyData"));
    const newProjectData = { ...localStorageData, ...AmenityData };
    sessionStorage.setItem("propertyData", JSON.stringify(newProjectData));
    
    setFeaturesPageNameArray(prev => {
      // Check if the newPage already exists in the array
      if (!prev.includes("Amenities")) {
        return [...prev, "Amenities"];
      }
      return prev; // If it already exists, return the previous state
    });
    setPropertyPageValue((prev) => prev + 1);
    setPropertyBackvalue((prev) => prev + 1);
  };
  return (
    <>{DataLoading && <LoaderForMedia />}
      {aminitiesData && (
        <>
          <ArrayButtons
            itemArray={aminitiesData}
            selectItems={selectedAmenities}
            labelName={"Amenity"}
            buttonName={"Aminity"}
            setValueinState={setSelectedAmenities}
          />
          <ContinueButton
            modalSubmit={SubmitForm}
            butonSubName={"add Feature Details"}
          />
        </>
      )}
    </>
  );
}

"use client";
import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { API_BASE_URL_FOR_MASTER } from "@/utils/constants";
import useFetch from "@/customHooks/useFetch";
import Cookies from "js-cookie";
import ContinueButton from "@/components/common/propertyContinueButton/continueButton";
import ArrayButtons from "@/components/common/admin/arrayButtons/arrayButtons";
export default function AmenityPage({
  setPropertyPageValue,
  setPropertyBackvalue,
}) {
  const roleData = Cookies.get("roles") ?? "";
  const name = Cookies.get("name");
  const roles = roleData && JSON.parse(roleData);
  const userId = Cookies.get("userId");
  // fetching Data for Amenities
  const { data: aminitiesData } = useFetch(
    `${API_BASE_URL_FOR_MASTER}/aminities`
  );
  console.log("aminitiesData", aminitiesData);

  const [selectedAmenities, setSelectedAmenities] = useState([]);

  useEffect(() => {
    // Retrieve data from localStorage
    const sessionStoragePropertyData = JSON.parse(
      sessionStorage.getItem("EditPropertyData")
    );
    console.log("sessionStoragePropertyData ", sessionStoragePropertyData);
    // Update state values if data exists in localStorage
    if (sessionStoragePropertyData) {
      console.log(
        "sessionStoragePropertyData Aminities ",
        sessionStoragePropertyData?.Aminities
      );
      setSelectedAmenities(sessionStoragePropertyData?.Aminities || []);
    }
  }, []);

  console.log("selectedAminities", selectedAmenities);
  const SubmitForm = () => {
    if (selectedAmenities.length == 0) {
      toast.error("Please select a Amenity.");
      return false;
    }
    const AmenityData = {
      Aminities: selectedAmenities,
    };
    console.log("AmenityData", AmenityData);
    const localStorageData = JSON.parse(
      sessionStorage.getItem("EditPropertyData")
    );
    const newProjectData = { ...localStorageData, ...AmenityData };
    sessionStorage.setItem("EditPropertyData", JSON.stringify(newProjectData));
    setPropertyPageValue((prev) => prev + 1);
    setPropertyBackvalue((prev) => prev + 1);
  };
  return (
    <>
      <div className={`flex justify-end `}>
        <ContinueButton modalSubmit={SubmitForm} />
      </div>
      {aminitiesData && selectedAmenities && (
        <ArrayButtons
          itemArray={aminitiesData}
          selectItems={selectedAmenities}
          labelName={"Amenity"}
          buttonName={"Aminity"}
          setValueinState={setSelectedAmenities}
        />
      )}
    </>
  );
}

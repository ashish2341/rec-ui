"use client";
import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { API_BASE_URL_FOR_MASTER } from "@/utils/constants";
import useFetch from "@/customHooks/useFetch";
import Cookies from "js-cookie";
import Styles from "../featurepage.module.css";
import ContinueButton from "@/components/common/propertyContinueButton/continueButton";
export default function PartOne({
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
      setSelectedAmenities(
        sessionStoragePropertyData?.Aminities || []
      );
    }
  }, []);
  const handleAmenityChange = (itemId) => {
    setSelectedAmenities((prev) => {
      const isSelected = prev.some(
        (selectedItem) => selectedItem._id === itemId
      );
      if (isSelected) {
        return prev.filter((selectedItem) => selectedItem._id !== itemId);
      } else {
        return [...prev,{_id:itemId} ];
      }
    });
  };
  console.log("selectedAminities",selectedAmenities)
  const SubmitForm = () => {
    if (selectedAmenities.length == 0) {
      toast.error("Please select a Amenity.");
      return false;
    }
    console.log("selectedAminities inside Submit",selectedAmenities)
    const AmenityData = {
      
      Aminities: selectedAmenities,

    };
    console.log("AmenityData", AmenityData);
     const localStorageData = JSON.parse(sessionStorage.getItem("EditPropertyData"));
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

      <div className="container mx-auto px-4 py-8">
        {/* Amenity Box */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Amenity</h2>
          {aminitiesData && selectedAmenities ? (
            <div>
              {aminitiesData ? (
                <div
                  className={`flex flex-wrap space-x-2 mt-4 ${
                    aminitiesData?.data.length > 20 ? "scrollable" : ""
                  }`}
                >
                  {aminitiesData?.data.map((item) => (
                    <button
                      key={item._id}
                      onClick={() => handleAmenityChange(item._id)}
                      className={`rounded text-white px-4 py-2 ${
                        Styles.optionButton
                      } ${
                        selectedAmenities.some(
                          (selectedItem) => selectedItem._id === item._id
                        )
                          ? "bg-[#2a4acb] border-2 border-[#2a4acb]"
                          : "bg-[#6592d3] border-2 border-[#6592d3]"
                      }`}
                    >
                      {item.Aminity}
                    </button>
                  ))}
                </div>
              ) : (
                null
              )}
            </div>
          ) : 
          null}
        </div>
      </div>
    </>
  );
}

"use client";
import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { API_BASE_URL_FOR_MASTER } from "@/utils/constants";
import useFetch from "@/customHooks/useFetch";
import Cookies from "js-cookie";
import Styles from "../featurepage.module.css";
import ContinueButton from "@/components/common/propertyContinueButton/continueButton";

export default function PartTwo({ setPropertyPageValue }) {

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
   
      setSelectedFeatures(
        sessionStoragePropertyData?.Features || []
      );     
       
    }
  }, []);

  const handlefeatureChange = (itemId) => {
    setSelectedFeatures((prev) => {
      const isSelected = prev.some(
        (selectedItem) => selectedItem._id === itemId
      );
      if (isSelected) {
        return prev.filter((selectedItem) => selectedItem._id === itemId);
      } else {
        return [...prev,{_id:itemId}];
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
    const localStorageData = JSON.parse(sessionStorage.getItem("EditPropertyData"));
    const newProjectData = { ...localStorageData, ...featureData };
    sessionStorage.setItem("EditPropertyData", JSON.stringify(newProjectData));
      setPropertyPageValue((prev) => prev + 1);
    
   
  };
  return (
    <>
     <div className={`flex justify-end ${Styles.continueBtn}`}>
        <ContinueButton modalSubmit={SubmitForm} />
      </div>

      <div className={`${Styles.featurebox} container mx-auto px-4 py-8`}>
        {/* Amenity Box */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Feature</h2>
          {featuresData && selectedFeatures ? (
            <div>
              {featuresData ? (
                <div
                  className={`flex flex-wrap space-x-2 mt-4 ${
                    featuresData?.data.length > 20 ? "scrollable" : ""
                  }`}
                >
                  {featuresData?.data.map((item) => (
                    <button
                      key={item._id}
                      onClick={() => handlefeatureChange(item._id)}
                      className={`rounded text-white px-4 py-2 ${
                        Styles.optionButton
                      } ${
                        selectedFeatures.some(
                          (selectedItem) => selectedItem._id === item._id
                        )
                          ? "bg-[#2a4acb] border-2 border-[#2a4acb]"
                          : "bg-[#6592d3] border-2 border-[#6592d3]"
                      }`}
                    >
                      {item.Feature}
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

"use client";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import { API_BASE_URL_FOR_MASTER } from "@/utils/constants";
import useFetch from "@/customHooks/useFetch";
import Styles from "../propertyDetails/propertypage.module.css"
import NextButton from "@/components/common/admin/nextButton/nextButton"
import { UpdateStepsStatus ,findNextStep } from "@/utils/commonHelperFn";
export default function LocationDetailsForm({
  valueForNext,
  valueForNextPage,setFormPageNumberArray,setPageStatusArray,pageStatusData
}) {
  // fetching Data for Area
  const { data: areaData } = useFetch(`${API_BASE_URL_FOR_MASTER}/areas`);


  const defaultOption = [{ value: "", label: "no data found" }];
  const CityArray = [{ value: "Jaipur", label: "Jaipur" }];
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pincode, setPincode] = useState("");
  const [area, setArea] = useState("");
  // const [locationDetails, setLocationDetails] = useState({
  //   Latitude: "",
  //   Longitude: "",
  // });
  useEffect(() => {

    
    // Retrieve data from localStorage
    const sessionStoragePropertyData = JSON.parse(
      sessionStorage.getItem("propertyData")
    );
  
    // Update state values if data exists in localStorage
    if (sessionStoragePropertyData) {
      setCity({value:sessionStoragePropertyData?.City || "" ,label:sessionStoragePropertyData?.City || "" }  );
      setState(sessionStoragePropertyData?.State || "");
      setCountry(sessionStoragePropertyData?.Country || "");
      setAddress(sessionStoragePropertyData?.Address || "");
      setLandmark(sessionStoragePropertyData?.Landmark || "");
      setPincode(sessionStoragePropertyData?.PinCode || "");
      // setLocationDetails({
      //   Latitude: sessionStoragePropertyData?.Location?.Latitude || "",
      //   Longitude: sessionStoragePropertyData?.Location?.Longitude || "",
      // });
      setArea(sessionStoragePropertyData.Area || "");
    }
  }, []);

  const handleCityChange = (event) => {
    
    setCity(event.target.value);
  };

  const handleStateChange = (event) => {
   
    setState(event.target.value);
  };

  const handleCountryChange = (event) => {
  
    setCountry(event.target.value);
  };

  const handleAddressChange = (event) => {
    
     setAddress(event.target.value);
  };

  const handleLandmarkChange = (event) => {

    setLandmark(event.target.value);
  };

  const handlePincodeChange = (event) => {
   
    setPincode(event.target.value);
  };

  // const handleLocationChange = (e) => {
  //   const { name, value } = e.target;
  //   console.log("name", name);
  //   console.log("value", value);
  //   setLocationDetails({ ...locationDetails, [name]: value });
  // };

  const SubmitForm = () => {
    if (address === "") {
      toast.error("Address is required.");
      return false;
    }
    if (area === "") {
      toast.error("Area  is required.");
      return false;
    }

    if (city === "") {
      toast.error("City is required.");
      return false;
    }

    const locationDetailsData = {
      City: city.value.trim(),
      Address: address.trim(),
      // Location: locationDetails,
      Area: area,
    };
    
    const localStorageData = JSON.parse(sessionStorage.getItem("propertyData"));
    const newProjectData = { ...localStorageData, ...locationDetailsData };
    sessionStorage.setItem("propertyData", JSON.stringify(newProjectData));
    
    setFormPageNumberArray(prev => {
      // Check if the newPage already exists in the array
      if (!prev.includes("Location details")) {
        return [...prev, "Location details"];
      }
      return prev; // If it already exists, return the previous state
    });
    setPageStatusArray(UpdateStepsStatus(pageStatusData,valueForNextPage))
      const finalIndexValue=findNextStep(pageStatusData,valueForNextPage)
      if(finalIndexValue.finalIndex <= valueForNextPage && finalIndexValue.currentStepStatus===false){
        valueForNext(finalIndexValue.finalIndex + 1);
      }else{
        
        valueForNext(finalIndexValue.finalIndex);
      }
    // valueForNext(valueForNextPage + 1);
  };

  return (
    <>
      <div>
     
        <form>
          <div className="grid gap-4 mb-4 sm:grid-cols-1">
            <div>
              <label
                htmlFor="address"
                className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white required"              >
                Locality
              </label>
              <textarea
                type="text"
                name="address"
                id="address"
                value={address}
                onChange={handleAddressChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Locality"
                required=""
              />
            </div>
        
            <div>
              <label
                htmlFor="area"
                className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white required"              >
              
                Area
              </label>
              {areaData ? (
                <Select
                  options={areaData.data.map((element) => ({
                    value: element._id,
                    label: element.Area,
                  }))}
                  placeholder="Select One"
                  onChange={(e)=>setArea({
                    _id:e.value,Area:e.label
                  })}
                  required={true}
                  value={{value:area._id,label:area.Area}}
                />
              ) : (
                <Select
                  options={defaultOption.map((element) => ({
                    value: element.value,
                    label: element.label,
                  }))}
                  placeholder="Select One"
                  required={true}
                />
              )}
            </div>
            <div>
              <label
                htmlFor="city"
                className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white required"              >
                City
              </label>
              <Select
                  options={CityArray.map((element) => ({
                    value: element.value,
                    label: element.label,
                  }))}
                  placeholder="Select One"
                  onChange={(e) =>
                    setCity({
                      value: e.value,
                      label: e.label,
                    })
                  }
                  required={true}
                  value={city}
                 
                />
              {/* <input
                type="text"
                name="city"
                id="city"
                value={city}
                onChange={handleCityChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="City"
                required=""
              /> */}
            </div>
            
          </div>
         
        </form>
        <NextButton onSubmit={SubmitForm} butonSubName={"add Property Details"}/>
      </div>
      
    </>
  );
}

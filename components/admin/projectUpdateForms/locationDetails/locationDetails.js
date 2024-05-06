"use client";
import { useState,useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";


export default function LocationDetailsForm({valueForNext,valueForNextPage}) {
    const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pincode, setPincode] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  



  useEffect(() => {
    // Retrieve data from localStorage
    const localStorageProjectData = JSON.parse(localStorage.getItem('projectData'));
    console.log("localStorageData from localstorage",localStorageProjectData)
    // Update state values if data exists in localStorage
    if (localStorageProjectData) {
      setCity(localStorageProjectData.city || "");
      setState(localStorageProjectData.state || "");
      setCountry(localStorageProjectData.country || "");
      setAddress(localStorageProjectData.address || "");
      setLandmark(localStorageProjectData.landmark || "");
      setPincode(localStorageProjectData.pincode || "");
      setLatitude(localStorageProjectData.latitude || "");
      setLongitude(localStorageProjectData.longitude || "");
    }
  }, []);

  const handleCityChange = (event) => {
    console.log("City changed:", event.target.value);
    setCity(event.target.value);
  };
  
  const handleStateChange = (event) => {
    console.log("State changed:", event.target.value);
    setState(event.target.value);
  };
  
  const handleCountryChange = (event) => {
    console.log("Country changed:", event.target.value);
    setCountry(event.target.value);
  };
  
  const handleAddressChange = (event) => {
    console.log("Address changed:", event.target.value);
    setAddress(event.target.value);
  };
  
  const handleLandmarkChange = (event) => {
    console.log("Landmark changed:", event.target.value);
    setLandmark(event.target.value);
  };
  
  const handlePincodeChange = (event) => {
    console.log("Pincode changed:", event.target.value);
    setPincode(event.target.value);
  };
  
  const handleLatitudeChange = (event) => {
    console.log("Latitude changed:", event.target.value);
    setLatitude(event.target.value);
  };
  
  const handleLongitudeChange = (event) => {
    console.log("Longitude changed:", event.target.value);
    setLongitude(event.target.value);
  };


  const SubmitForm=()=>{
    if (city === "") {
      toast.error("City is required.");
      return false;
    }
    if (state === "") {
        toast.error("State is required.");
      return false;
    }
    if (country === "") {
      toast.error("Country is required.");
      return false;
    }
    if (address === "") {
        toast.error("Address is required.");
      return false;
    }
    if (landmark === "") {
      toast.error("Landmark is required.");
      return false;
    }
    if (pincode === "") {
      toast.error("Pincode  is required.");
      return false;
    }
    if (!/^\d{6}$/.test(pincode)) {
      toast.error("Pincode number must be 6 digits long");
      return false;
    }
    if (latitude === "") {
        toast.error("Latitude is required.");
      return false;
    }
    if (longitude === "") {
      toast.error("Longitude  is required.");
      return false;
    }
    const locationDetailsData = {
      city: city.trim(),
      state: state.trim(),
      country: country.trim(),
      address: address.trim(),
      landmark: landmark.trim(),
      pincode: pincode.trim(),
      latitude: latitude.trim(),
      longitude: longitude.trim(),
    };
    console.log("locationDetailsData",locationDetailsData)
    const localStorageData=JSON.parse(localStorage.getItem('projectData'));
    const newProjectData = { ...localStorageData, ...locationDetailsData };
    localStorage.setItem('projectData', JSON.stringify(newProjectData));
      valueForNext(valueForNextPage+1)
  }
  

  return (
    <>
      <div>
      <form>
      <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white">
        Location Details
      </h3>
      <div className="grid gap-4 mb-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="city"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
          >
            City
          </label>
          <input
            type="text"
            name="city"
            id="city"
            value={city}
            onChange={handleCityChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="City"
            required=""
          />
        </div>

        <div>
          <label
            htmlFor="state"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
          >
            State
          </label>
          <input
            type="text"
            name="state"
            id="state"
            value={state}
            onChange={handleStateChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="State"
            required=""
          />
        </div>

        <div>
          <label
            htmlFor="country"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
          >
            Country
          </label>
          <input
            type="text"
            name="country"
            id="country"
            value={country}
            onChange={handleCountryChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Country"
            required=""
          />
        </div>

        <div>
          <label
            htmlFor="address"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
          >
            Address
          </label>
          <input
            type="text"
            name="address"
            id="address"
            value={address}
            onChange={handleAddressChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Address"
            required=""
          />
        </div>

        <div>
          <label
            htmlFor="landmark"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
          >
            Landmark
          </label>
          <input
            type="text"
            name="landmark"
            id="landmark"
            value={landmark}
            onChange={handleLandmarkChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Landmark"
            required=""
          />
        </div>

        <div>
          <label
            htmlFor="pincode"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
          >
            PinCode
          </label>
          <input
            type="number"
            name="pincode"
            id="pincode"
            value={pincode}
            onChange={handlePincodeChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="PinCode"
            required=""
          />
        </div>

        <div>
          <label
            htmlFor="latitude"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
          >
            Latitude
          </label>
          <input
            type="text"
            name="latitude"
            id="latitude"
            value={latitude}
            onChange={handleLatitudeChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Latitude"
            required=""
          />
        </div>

        <div>
          <label
            htmlFor="longitude"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
          >
            Longitude
          </label>
          <input
            type="text"
            name="longitude"
            id="longitude"
            value={longitude}
            onChange={handleLongitudeChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Longitude"
            required=""
          />
        </div>
      </div>
    </form>
    <div>
            <button
              onClick={SubmitForm}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5"
            >
              Next
            </button>
          </div>
      </div>
    </>
  );
}

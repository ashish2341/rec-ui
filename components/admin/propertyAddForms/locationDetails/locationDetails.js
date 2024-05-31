"use client";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import { API_BASE_URL_FOR_MASTER } from "@/utils/constants";
import useFetch from "@/customHooks/useFetch";
import Styles from "../propertyDetails/propertypage.module.css"
export default function LocationDetailsForm({
  valueForNext,
  valueForNextPage,
}) {
  // fetching Data for Area
  const { data: areaData } = useFetch(`${API_BASE_URL_FOR_MASTER}/areas`);
  console.log("areaData", areaData);

  const defaultOption = [{ value: "", label: "no data found" }];

  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pincode, setPincode] = useState("");
  const [area, setArea] = useState("");
  const [locationDetails, setLocationDetails] = useState({
    Latitude: "",
    Longitude: "",
  });

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
      setCity(sessionStoragePropertyData?.City || "");
      setState(sessionStoragePropertyData?.State || "");
      setCountry(sessionStoragePropertyData?.Country || "");
      setAddress(sessionStoragePropertyData?.Address || "");
      setLandmark(sessionStoragePropertyData?.Landmark || "");
      setPincode(sessionStoragePropertyData?.PinCode || "");
      setLocationDetails({
        Latitude: sessionStoragePropertyData?.Location?.Latitude || "",
        Longitude: sessionStoragePropertyData?.Location?.Longitude || "",
      });
      setArea(sessionStoragePropertyData.Area || "");
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

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    console.log("name", name);
    console.log("value", value);
    setLocationDetails({ ...locationDetails, [name]: value });
  };

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
    if (state === "") {
      toast.error("State is required.");
      return false;
    }
    if (country === "") {
      toast.error("Country is required.");
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

    const locationDetailsData = {
      City: city.trim(),
      State: state.trim(),
      Country: country.trim(),
      Address: address.trim(),
      Landmark: landmark.trim(),
      PinCode: pincode.trim(),
      Location: locationDetails,
      Area: area,
    };
    console.log("locationDetailsData", locationDetailsData);
    const localStorageData = JSON.parse(sessionStorage.getItem("propertyData"));
    const newProjectData = { ...localStorageData, ...locationDetailsData };
    sessionStorage.setItem("propertyData", JSON.stringify(newProjectData));
    valueForNext(valueForNextPage + 1);
  };

  return (
    <>
      <div>
      <div className="flex justify-end  mb-4  mr-4 ml-[25rem]">
            <button
              onClick={SubmitForm}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5"
            >
              Next
            </button>
          </div>
        <form>
          <div className="grid gap-4 mb-4 sm:grid-cols-2">
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
                htmlFor="area"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Area
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Property Type"
                required=""
                value={area.Area}
                disabled={true}
              />
              {areaData ? (
                <div
                  className={`flex flex-wrap space-x-2 mt-4 ${
                    areaData?.data?.length > 8
                      ? `${Styles.scrollable}`
                      : ""
                  }`}
                >
                  {areaData?.data?.map((item) => (
                    <button
                      key={item._id}
                      onClick={(event) => {
                        event.preventDefault();  // Prevent the default form submission behavior
                        setArea({
                          _id: item._id,
                          Area: item.Area,
                        });
                      }}
                      className={` rounded text-white px-4 py-2 ${
                        Styles.optionButton
                      } ${
                        area._id === item._id
                          ? "bg-[#2a4acb] border-2 border-[#2a4acb]"
                          : "bg-[#6592d3]  border-2 border-[#6592d3]"
                      }`}
                    >
                      {item.Area}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap space-x-2">
             <h1 className={`${Styles.noDataHead}`}>No Data Found</h1>
            </div>
              )}
             
            </div>
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
                type="number"
                name="Latitude"
                id="latitude"
                value={locationDetails.Latitude}
                onChange={handleLocationChange}
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
                type="number"
                name="Longitude"
                id="longitude"
                value={locationDetails.Longitude}
                onChange={handleLocationChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Longitude"
                required=""
              />
            </div>
          </div>
         
        </form>
        
      </div>
      
    </>
  );
}

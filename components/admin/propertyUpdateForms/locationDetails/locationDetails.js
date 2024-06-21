"use client";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import { API_BASE_URL_FOR_MASTER, currentPage } from "@/utils/constants";
import useFetch from "@/customHooks/useFetch";
import Styles from "../propertyDetails/propertypage.module.css";
import NextButton from "@/components/common/admin/nextButton/nextButton";
import EditedTag from "@/components/common/admin/editedTag/editedTag";
export default function LocationDetailsForm({
  valueForNext,
  valueForNextPage,
  editedKeys,
  pageName,
}) {
  // fetching Data for Area
  const { data: areaData } = useFetch(`${API_BASE_URL_FOR_MASTER}/areas`);

  const defaultOption = [{ value: "", label: "no data found" }];

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
      sessionStorage.getItem("EditPropertyData")
    );

    // Update state values if data exists in localStorage
    if (sessionStoragePropertyData) {
      setCity(sessionStoragePropertyData?.City || "");
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
      City: city.trim(),
      Address: address.trim(),
      // Location: locationDetails,
      Area: area,
    };
    const localStorageData = JSON.parse(
      sessionStorage.getItem("EditPropertyData")
    );
    const newProjectData = { ...localStorageData, ...locationDetailsData };
    sessionStorage.setItem("EditPropertyData", JSON.stringify(newProjectData));
    valueForNext(valueForNextPage + 1);
  };

  return (
    <>
      <div>
        <form>
          <div className="grid gap-4 mb-4 sm:grid-cols-1">
            <div>
              <label
                htmlFor="address"
                className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white required"
              >
                Locality
                {editedKeys?.includes("Address") &&
                  pageName === currentPage && <EditedTag />}
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
                className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white required"
              >
                Area
                {editedKeys?.includes("Area") && pageName === currentPage && (
                  <EditedTag />
                )}
              </label>
              {areaData ? (
                <Select
                  options={areaData.data.map((element) => ({
                    value: element._id,
                    label: element.Area,
                  }))}
                  placeholder="Select One"
                  onChange={(e) =>
                    setArea({
                      _id: e.value,
                      Area: e.label,
                    })
                  }
                  required={true}
                  value={{ value: area._id, label: area.Area }}
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
                className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white required"
              >
                City
                {editedKeys?.includes("City") && pageName === currentPage && (
                  <EditedTag />
                )}
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
            {/* <div>
              <label
                htmlFor="latitude"
                className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white required" 
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
                className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white required"              >
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
            </div> */}
          </div>
        </form>
        <NextButton
          onSubmit={SubmitForm}
          butonSubName={"add Property Details"}
        />
      </div>
    </>
  );
}

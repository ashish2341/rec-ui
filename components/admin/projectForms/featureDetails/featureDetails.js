import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { API_BASE_URL_FOR_MASTER } from "@/utils/constants";
import useFetch from "@/customHooks/useFetch";

export default function FeaturesDetailsForm({
  onAmenitiesChange,
  onFeaturesChange,
  valueForNext,
  valueForNextPage,
}) {
  // fetching Data for Amenities
  const { data: aminitiesData } = useFetch(
    `${API_BASE_URL_FOR_MASTER}/aminities`
  );
  console.log("aminitiesData", aminitiesData);

  // fetching Data for Features
  const { data: featuresData } = useFetch(
    `${API_BASE_URL_FOR_MASTER}/features`
  );
  console.log("featuresData", featuresData);

  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);


  useEffect(() => {
    // Retrieve data from localStorage
    const localStorageProjectData = JSON.parse(
      sessionStorage.getItem("projectData")
    );
    console.log("localStorageData from localstorage", localStorageProjectData);
    // Update state values if data exists in localStorage
    if (localStorageProjectData) {
      setSelectedAmenities(localStorageProjectData?.Aminities || "");
      setSelectedFeatures(localStorageProjectData?.Features || "");
    }
  }, []);

  const SubmitForm = () => {
    if (selectedAmenities.length == 0) {
      toast.error("Please select a Amenity.");
      return false;
    }
    if (selectedFeatures.length == 0) {
      toast.error("Please select a Feature.");
      return false;
    }
    const featureAmenityData = {
      Features: selectedFeatures,
      Aminities: selectedAmenities,
    };
    console.log("featureAmenityData", featureAmenityData);
    const localStorageData = JSON.parse(sessionStorage.getItem("projectData"));
    const newProjectData = { ...localStorageData, ...featureAmenityData };
    sessionStorage.setItem("projectData", JSON.stringify(newProjectData));
    valueForNext(valueForNextPage + 1);
  };

  const handleAmenityCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedAmenities([...selectedAmenities, value]);
    } else {
      setSelectedAmenities(selectedAmenities.filter((item) => item !== value));
    }
    onAmenitiesChange(selectedAmenities);
  };

  const handleFeatureCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedFeatures([...selectedFeatures, value]);
    } else {
      setSelectedFeatures(selectedFeatures.filter((item) => item !== value));
    }
    onFeaturesChange(selectedFeatures);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {/* Amenity Box */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Amenity</h2>
          {aminitiesData?(  <div className="flex flex-wrap">
            {aminitiesData.data.map((amenity) => (
              <div
                key={amenity._id}
                className="flex items-center amenityFeatureCheckbox me-4"
              >
                <input
                  id={`amenity-${amenity._id}`}
                  type="checkbox"
                  value={amenity._id}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onChange={handleAmenityCheckboxChange}
                  checked={selectedAmenities.includes(amenity._id)}
                />
                <label
                  htmlFor={`amenity-${amenity.id}`}
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  {amenity.Aminity}
                </label>
              </div>
            ))}
          </div>):(null)}
        
        </div>

        {/* Feature Box */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Feature</h2>
          {featuresData?( <div className="flex flex-wrap">
            {featuresData.data.map((featureItem) => (
              <div
                key={featureItem._id}
                className="flex items-center amenityFeatureCheckbox me-4"
              >
                <input
                  id={`feature-${featureItem._id}`}
                  type="checkbox"
                  value={featureItem._id}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onChange={handleFeatureCheckboxChange}
                  checked={selectedFeatures.includes(featureItem._id)}
                />
                <label
                  htmlFor={`feature-${featureItem._id}`}
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  {featureItem.Feature}
                </label>
              </div>
            ))}
          </div>):(null)}
         
        </div>
      </div>
      <div>
        <button
          onClick={SubmitForm}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5"
        >
          Next
        </button>
      </div>
    </>
  );
}

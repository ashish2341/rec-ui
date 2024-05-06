import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function FeaturesDetailsForm({
  onAmenitiesChange,
  onFeaturesChange,
  valueForNext,
  valueForNextPage,
}) {
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const amenities = [
    { id: 1, name: "Amenity 1", value: "amenity-1", checked: false },
    { id: 2, name: "Amenity 2", value: "amenity-2", checked: true },
    { id: 3, name: "Amenity 3", value: "amenity-3", checked: false },
    
  ];
  const features = [
    { id: 1, name: 'Feature 1', value: 'feature-1' },
    { id: 2, name: 'Feature 2', value: 'feature-2' },
    { id: 3, name: 'Feature 3', value: 'feature-3' },
  ];

  useEffect(() => {
    // Retrieve data from localStorage
    const localStorageProjectData = JSON.parse(
      localStorage.getItem("projectData")
    );
    console.log("localStorageData from localstorage", localStorageProjectData);
    // Update state values if data exists in localStorage
    if (localStorageProjectData) {
      setSelectedAmenities(localStorageProjectData.amenity || "");
      setSelectedFeatures(localStorageProjectData.features || "");
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
      features: selectedFeatures,
      amenity: selectedAmenities,
    };
    console.log("featureAmenityData", featureAmenityData);
    const localStorageData = JSON.parse(localStorage.getItem("projectData"));
    const newProjectData = { ...localStorageData, ...featureAmenityData };
    localStorage.setItem("projectData", JSON.stringify(newProjectData));
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
          <div className="flex flex-wrap">
      {amenities.map((amenity) => (
        <div key={amenity.id} className="flex items-center amenityFeatureCheckbox me-4">
          <input
            id={`amenity-${amenity.id}`}
            type="checkbox"
            value={amenity.value}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            onChange={handleAmenityCheckboxChange}
            checked={selectedAmenities.includes(amenity.value)}
          />
          <label
            htmlFor={`amenity-${amenity.id}`}
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            {amenity.name}
          </label>
        </div>
      ))}
    </div>
        </div>

        {/* Feature Box */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Feature</h2>
          <div className="flex flex-wrap">
      {features.map((feature) => (
        <div key={feature.id} className="flex items-center amenityFeatureCheckbox me-4">
          <input
            id={`feature-${feature.id}`}
            type="checkbox"
            value={feature.value}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            onChange={handleFeatureCheckboxChange}
            checked={selectedFeatures.includes(feature.value)}
          />
          <label
            htmlFor={`feature-${feature.id}`}
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            {feature.name}
          </label>
        </div>
      ))}
    </div>
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

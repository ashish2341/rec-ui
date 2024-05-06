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
  const [floorAndCounterValues, setFloorAndCounterValues] = useState({
    Dining: "",
    MasterBedroom: "",
    OtherBedroom: "",
    Kitchen: "",
    Toilets: "",
    Balcony: "",
  });

  const [fittingValues, setFittingValues] = useState({
    Electrical: "",
    Toilets: "",
    Kitchen: "",
    Doors: "",
    Windows: "",
    Others: "",
  });

  const [wallAndCeilingValues, setWallAndCeilingValues] = useState({
    Interior: "",
    Exterior: "",
    Kitchen: "",
    Toilets: "",
  });

  // fetching Data for Amenities
  const { data: aminitiesData } = useFetch(
    `${API_BASE_URL_FOR_MASTER}/aminities`
  );
  console.log("aminitiesData", aminitiesData);

  // fetching Data for Features
  const { data: featuresData } = useFetch(
    `${API_BASE_URL_FOR_MASTER}/features`
  );
  // console.log("featuresData", featuresData);

  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

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
        sessionStoragePropertyData?.Aminities.map((item) => {
          return { _id: item._id };
        })
      );
      setSelectedAmenities(
        sessionStoragePropertyData?.Aminities.map((item) => {
          return item._id;
        }) || ""
      );
      setSelectedFeatures(
        sessionStoragePropertyData?.Features.map((item) => {
          return item._id;
        }) || ""
      );
      setFloorAndCounterValues({
        Dining: sessionStoragePropertyData?.FloorAndCounter?.Dining || "",
        MasterBedroom:
          sessionStoragePropertyData?.FloorAndCounter?.MasterBedroom || "",
        OtherBedroom:
          sessionStoragePropertyData?.FloorAndCounter?.OtherBedroom || "",
        Kitchen: sessionStoragePropertyData?.FloorAndCounter?.Kitchen || "",
        Toilets: sessionStoragePropertyData?.FloorAndCounter?.Toilets || "",
        Balcony: sessionStoragePropertyData?.FloorAndCounter?.Balcony || "",
      });
      setFittingValues({
        Electrical: sessionStoragePropertyData?.Fitting?.Electrical || "",
        Toilets: sessionStoragePropertyData?.Fitting?.Toilets || "",
        Kitchen: sessionStoragePropertyData?.Fitting?.Kitchen || "",
        Doors: sessionStoragePropertyData?.Fitting?.Doors || "",
        Windows: sessionStoragePropertyData?.Fitting?.Windows || "",
        Others: sessionStoragePropertyData?.Fitting?.Others || "",
      });

      setWallAndCeilingValues({
        Interior: sessionStoragePropertyData?.WallAndCeiling?.Interior || "",
        Exterior: sessionStoragePropertyData?.WallAndCeiling?.Exterior || "",
        Kitchen: sessionStoragePropertyData?.WallAndCeiling?.Kitchen || "",
        Toilets: sessionStoragePropertyData?.WallAndCeiling?.Toilets || "",
      });
    }
  }, []);
  const handleFloorChange = (field, value) => {
    setFloorAndCounterValues((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleFittingChange = (field, value) => {
    setFittingValues((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleWallAndCeilingChange = (field, value) => {
    setWallAndCeilingValues((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };
  const SubmitForm = () => {
    if (selectedAmenities.length == 0) {
      toast.error("Please select a Amenity.");
      return false;
    }
    if (selectedFeatures.length == 0) {
      toast.error("Please select a Feature.");
      return false;
    }
    let floorAndCounterErrors = {};
    let fittingErrors = {};
    let wallAndCeilingErrors = {};

    // Validate floorAndCounter fields
    Object.keys(floorAndCounterValues).forEach((field) => {
      if (floorAndCounterValues[field].trim() === "") {
        floorAndCounterErrors[field] =
          "Please fill all required fields of floor & Counter";
      }
    });

    // Validate fitting fields
    Object.keys(fittingValues).forEach((field) => {
      if (fittingValues[field].trim() === "") {
        fittingErrors[field] = "Please fill all required fields of fitting";
      }
    });

    // Validate wallAndCeiling fields
    Object.keys(wallAndCeilingValues).forEach((field) => {
      if (wallAndCeilingValues[field].trim() === "") {
        wallAndCeilingErrors[field] =
          "Please fill all required fields of wall & Ceiling";
      }
    });

    if (Object.keys(floorAndCounterErrors).length != 0) {
      toast.error("Please fill all required fields of floor & Counter.");
      return false;
    }
    if (Object.keys(fittingErrors).length != 0) {
      toast.error("Please fill all required fields of fitting.");
      return false;
    }
    if (Object.keys(wallAndCeilingErrors).length != 0) {
      toast.error("Please fill all required fields of wall & Ceiling.");
      return false;
    }

    const featureAmenityData = {
      Features: selectedFeatures?.map((id) => {
        return { _id: id };
      }),
      Aminities: selectedAmenities?.map((id) => {
        return { _id: id };
      }),
      FloorAndCounter: floorAndCounterValues,
      Fitting: fittingValues,
      WallAndCeiling: wallAndCeilingValues,
    };
    console.log("featureAmenityData", featureAmenityData);
    const sessionStorageData = JSON.parse(sessionStorage.getItem("EditPropertyData"));
    const newProjectData = { ...sessionStorageData, ...featureAmenityData };
    sessionStorage.setItem("EditPropertyData", JSON.stringify(newProjectData));
    valueForNext(valueForNextPage + 1);
  };

  const handleAmenityCheckboxChange = (event) => {
    console.log("handleAmenityCheckboxChange", event.target);
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
          {aminitiesData && selectedAmenities ? (
            <div className="flex flex-wrap">
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
            </div>
          ) : null}
        </div>

        {/* Feature Box */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Feature</h2>
          {featuresData ? (
            <div className="flex flex-wrap">
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
                    // checked={selectedFeatures.some(selectedFeatures => selectedFeatures._id === featureItem._id)}
                  />
                  <label
                    htmlFor={`feature-${featureItem._id}`}
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    {featureItem.Feature}
                  </label>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        {/*  FloorAndCounter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {" "}
            Floor and Counter Details
          </h2>
          <div className="grid gap-4 mb-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="Dining"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Dining
              </label>
              <input
                type="text"
                name="Dining"
                id="Dining"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Dining"
                value={floorAndCounterValues.Dining}
                onChange={(e) => handleFloorChange("Dining", e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="MasterBedroom"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Master Bedroom
              </label>
              <input
                type="text"
                name="MasterBedroom"
                id="MasterBedroom"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Master Bedroom"
                value={floorAndCounterValues.MasterBedroom}
                onChange={(e) =>
                  handleFloorChange("MasterBedroom", e.target.value)
                }
              />
            </div>

            <div>
              <label
                htmlFor="OtherBedroom"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Other Bedroom
              </label>
              <input
                type="text"
                name="OtherBedroom"
                id="OtherBedroom"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Other Bedroom"
                value={floorAndCounterValues.OtherBedroom}
                onChange={(e) =>
                  handleFloorChange("OtherBedroom", e.target.value)
                }
              />
            </div>
            <div>
              <label
                htmlFor="Kitchen"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Kitchen
              </label>
              <input
                type="text"
                name="Kitchen"
                id="Kitchen"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Kitchen"
                value={floorAndCounterValues.Kitchen}
                onChange={(e) => handleFloorChange("Kitchen", e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="Toilets"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Toilets
              </label>
              <input
                type="text"
                name="Toilets"
                id="Toilets"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Toilets"
                value={floorAndCounterValues.Toilets}
                onChange={(e) => handleFloorChange("Toilets", e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="Balcony"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Balcony
              </label>
              <input
                type="text"
                name="Balcony"
                id="Balcony"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Balcony"
                value={floorAndCounterValues.Balcony}
                onChange={(e) => handleFloorChange("Balcony", e.target.value)}
              />
            </div>
          </div>
        </div>
        {/*  Fitting */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4"> Fitting Details</h2>
          <div className="grid gap-4 mb-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="Electrical"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Electrical
              </label>
              <input
                type="text"
                name="Electrical"
                id="Electrical"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Electrical"
                value={fittingValues.Electrical}
                onChange={(e) =>
                  handleFittingChange("Electrical", e.target.value)
                }
              />
            </div>
            <div>
              <label
                htmlFor="Toilets"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Toilets
              </label>
              <input
                type="text"
                name="Toilets"
                id="Toilets"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Toilets"
                value={fittingValues.Toilets}
                onChange={(e) => handleFittingChange("Toilets", e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="Kitchen"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Kitchen
              </label>
              <input
                type="text"
                name="Kitchen"
                id="Kitchen"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Kitchen"
                value={fittingValues.Kitchen}
                onChange={(e) => handleFittingChange("Kitchen", e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="Doors"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Doors
              </label>
              <input
                type="text"
                name="Doors"
                id="Doors"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Doors"
                value={fittingValues.Doors}
                onChange={(e) => handleFittingChange("Doors", e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="Windows"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Windows
              </label>
              <input
                type="text"
                name="Windows"
                id="Windows"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Windows"
                value={fittingValues.Windows}
                onChange={(e) => handleFittingChange("Windows", e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="Others"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Others
              </label>
              <input
                type="text"
                name="Others"
                id="Others"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Others"
                value={fittingValues.Others}
                onChange={(e) => handleFittingChange("Others", e.target.value)}
              />
            </div>
          </div>
        </div>
        {/*  WallAndCeiling */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {" "}
            Wall and Ceiling Details
          </h2>
          <div className="grid gap-4 mb-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="Interior"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Interior
              </label>
              <input
                type="text"
                name="Interior"
                id="Interior"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Interior"
                value={wallAndCeilingValues.Interior}
                onChange={(e) =>
                  handleWallAndCeilingChange("Interior", e.target.value)
                }
              />
            </div>
            <div>
              <label
                htmlFor="Exterior"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Exterior
              </label>
              <input
                type="text"
                name="Exterior"
                id="Exterior"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Exterior"
                value={wallAndCeilingValues.Exterior}
                onChange={(e) =>
                  handleWallAndCeilingChange("Exterior", e.target.value)
                }
              />
            </div>
            <div>
              <label
                htmlFor="Kitchen"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Kitchen
              </label>
              <input
                type="text"
                name="Kitchen"
                id="Kitchen"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Kitchen"
                value={wallAndCeilingValues.Kitchen}
                onChange={(e) =>
                  handleWallAndCeilingChange("Kitchen", e.target.value)
                }
              />
            </div>
            <div>
              <label
                htmlFor="Toilets"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Toilets
              </label>
              <input
                type="text"
                name="Toilets"
                id="Toilets"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Toilets"
                value={wallAndCeilingValues.Toilets}
                onChange={(e) =>
                  handleWallAndCeilingChange("Toilets", e.target.value)
                }
              />
            </div>
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

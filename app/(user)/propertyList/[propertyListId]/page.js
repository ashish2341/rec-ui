"use client";
import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import Spinner from "@/components/common/loading";
import React, { useEffect, useState } from "react";
import styles from "./propertyList.module.css";
import { initFlowbite } from "flowbite";
import Slider from "react-slick";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import ReadMore from "@/components/common/readMore";
import Accordion from "@/components/common/accodion";
import { API_BASE_URL_FOR_MASTER, API_BASE_URL } from "@/utils/constants";
import useFetch from "@/customHooks/useFetch";
import DropdownComponent from "@/components/common/listDropdown";
import { GetPropertyByQueryApi } from "@/api-functions/property/getPropertyByQuery";
import { ToastContainer, toast } from "react-toastify";
import { GetPropertyApi } from "@/api-functions/property/getProperty";
import SkeletonLoader from "@/components/common/loader";
import { split } from "postcss/lib/list";
import { AbbreviatedNumberParser } from "../../../../utils/commonHelperFn";
const PropertyListPage = (params) => {
  // fetching Data for facing
  const {
    data: facingData,
    loading,
    error,
  } = useFetch(`${API_BASE_URL_FOR_MASTER}/facing`);

  // fetching Data for propertyTypeData
  const { data: propertyTypeData } = useFetch(
    `${API_BASE_URL_FOR_MASTER}/propertyWithSubTypes`
  );
  // console.log("propertyTypeData",propertyTypeData)
  // fetching Data for bhkTypeData
  const { data: bhkTypeData } = useFetch(`${API_BASE_URL_FOR_MASTER}/bhkType`);
  // console.log("bhkTypeData",bhkTypeData)
  // fetching Data for propertyStatusData
  const { data: propertyStatusData } = useFetch(
    `${API_BASE_URL_FOR_MASTER}/propertyStatus`
  );
  // console.log("propertyStatusData",propertyStatusData)
  // fetching Data for preferencesData
  const { data: preferencesData } = useFetch(
    `${API_BASE_URL_FOR_MASTER}/preferences`
  );
  // console.log("",)
  // fetching Data for Area
  const { data: areaData } = useFetch(`${API_BASE_URL_FOR_MASTER}/areas`);
  // console.log("areaData",areaData)
  // fetching Data for posessionStatusData
  const { data: posessionStatusData } = useFetch(
    `${API_BASE_URL_FOR_MASTER}/possession`
  );
  // console.log("posessionStatusData",posessionStatusData)
  // fetching Data for featureData
  const { data: featureData } = useFetch(
    `${API_BASE_URL}/feature/allFeature?page=1&pageSize=10&search=`
  );
  // console.log("featureData",featureData)
  //using params
  // console.log("params", params);

  const {
    searchData,
    facingId,
    facingLabel,
    areaId,
    areaLabel,
    propertyTypeID,
    propertyTypeLabel,
    budgetData,
    budgetLabel,
  } = params.searchParams;
  //  console.log("budgetData",budgetData)
  if (budgetData) {
    var budgetStr = budgetData.split(",");
    var parsedNumbers = AbbreviatedNumberParser(budgetStr);
  }

  const [payload, setPayload] = useState({
    facing: facingId ? [{ id: facingId, label: facingLabel }] : [],
    areaType: areaId ? [{ id: areaId, label: areaLabel }] : [],
    propertyType: propertyTypeID
      ? [{ id: propertyTypeID, label: propertyTypeLabel }]
      : [],
    bhkType: [],
    propertyStatus: [],
    posessionStatus: [],
    budget: budgetData ? [{ id: parsedNumbers, label: budgetStr }] : [],
    feature: [],
    landArea: [],
    bathroom: [],
    search: searchData ? searchData : "",
    isFeatured: true,
  });
  console.log("Outeside payload", payload);
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("general");
  const [direction, setDirection] = useState("west");
  const [listData, setListData] = useState("");
  const [numToShow, setNumToShow] = useState(2);
  const [listDataForShow, setListDataForShow] = useState("");
  const [resetBtnValue, setResetBtnValue] = useState(false);

  const bathroomArray = [
    { value: 1, label: "One" },
    { value: 2, label: "Two" },
    { value: 3, label: "Three" },
    { value: 4, label: "Four" },
    { value: 5, label: "Five" },
  ];
  const landAreaArray = [
    { value: 1, label: "One" },
    { value: 2, label: "Two" },
    { value: 3, label: "Three" },
    { value: 4, label: "Four" },
    { value: 5, label: "Five" },
  ];
  const RangeTypeArray = [
    { value1: 1000000, value2: 3000000, label: "10 L- 30 L" },
    { value1: 3000000, value2: 6000000, label: " 30 L- 60 L" },
    { value1: 6000000, value2: 10000000, label: "60 L- 1 Cr" },
    { value1: 10000000, value2: 20000000, label: "1 Cr- 2 Cr" },
  ];
  useEffect(() => {
    if (payload) {
        const payloadWithId = extractIDsAndUpdateData(payload);
        // console.log("payloadWithId", payloadWithId);
        payloadWithId.budget = payloadWithId.budget.flat();
        getAllFilterProperties(payloadWithId);

        // Check if any array in payload has data
        let hasData = false;
        for (const key in payloadWithId) {
            if (Array.isArray(payloadWithId[key]) && payloadWithId[key].length > 0) {
                hasData = true;
                break;
            }
        }

        // Set resetBtnValue based on whether any array has data
        setResetBtnValue(hasData);
    }
}, [payload]);

  function extractIDsAndUpdateData(data) {
    const newData = { ...data }; // Create a shallow copy of the original object
    for (const key in newData) {
      if (Array.isArray(newData[key])) {
        newData[key] = newData[key].map((item) =>
          typeof item === "object" ? item.id : item
        );
      }
    }
    return newData;
  }
  // console.log("item",item.id)
  const longText =
    "Nestled within the vibrant streets of Jaipur, Rajasthan, lies a hidden gem – an enchanting Haveli that embodies the essence of royal living. This majestic property seamlessly blends traditional Rajasthani architecture with modern comforts, offering a truly unique retreat for those seeking an authentic cultural experience.";

  ("As you step through the ornate entrance, you are greeted by a courtyard adorned with intricately carved pillars and lush greenery. The Haveli boasts spacious living areas adorned with handcrafted furniture, vibrant textiles, and exquisite artwork, creating an ambiance of timeless elegance.");

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };
  useEffect(() => {
    initFlowbite(); // Call initCarousels() when component mounts
  }, []);
  var settings = {
    dots: false,
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const getAllFilterProperties = async (payloadData) => {
    let properties = await GetPropertyByQueryApi(payloadData);
    if (properties?.resData?.success == true) {
      setListData(properties?.resData.data);
      setListDataForShow(properties?.resData?.data.slice(0, 2));
      return false;
    } else {
      toast.error(properties?.errMessage);
      return false;
    }
  };

  const showMoreItems = () => {
    const newNumToShow = numToShow + 2;
    setListDataForShow(listData.slice(0, newNumToShow));
    setNumToShow(newNumToShow);
  };

  const showLessItems = () => {
    const newNumToShow = numToShow - 2;
    setListDataForShow(listData.slice(0, newNumToShow));
    setNumToShow(newNumToShow);
  };

  const handleCheckBoxChange = (event) => {
    const { name, checked } = event.target;
    const valueObject = JSON.parse(event.target.value);
    const { id, label } = valueObject;
    setPayload((prevPayload) => ({
      ...prevPayload,
      [name]: checked
        ? [...prevPayload[name], { id, label }]
        : prevPayload[name].filter((item) => item.id !== id),
    }));
  
    if (checked == true) {
      setResetBtnValue(true);
    } else {
      setResetBtnValue(false);
    }
  };

  const handleRangeCheckBoxChange = (event) => {
    const { value, checked } = event.target;

    // Parse the value string into an array of numbers
    const [value1, value2] = JSON.parse(value);

    // Create a new object representing the range selection
    const rangeSelection = {
      id: [value1, value2],
      label: event.target.nextSibling.textContent.trim(), // Extract label from next sibling
    };

    // Check if the range selection already exists in payload.budget
    const existingIndex = payload.budget.findIndex(
      (range) => range.id[0] === value1 && range.id[1] === value2
    );

    // If the range selection already exists, remove it, otherwise add it
    if (existingIndex !== -1) {
      setPayload((prevPayload) => ({
        ...prevPayload,
        budget: [
          ...prevPayload.budget.slice(0, existingIndex),
          ...prevPayload.budget.slice(existingIndex + 1),
        ],
      }));
    } else {
      setPayload((prevPayload) => ({
        ...prevPayload,
        budget: [...prevPayload.budget, rangeSelection],
      }));
    }
    console.log(" checked", checked);
    if (checked == true) {
      setResetBtnValue(true);
    } else {
      setResetBtnValue(false);
    }
  };

  const handleRemoveBadge = (id) => {
    console.log("handleRemoveBadge id", id);
    console.log("handleRemoveBadge before payload", payload);

    setPayload((prevFilters) => {
      // Modify the state based on the previous state
      const updatedFilters = { ...prevFilters };
      for (const key in updatedFilters) {
        if (Array.isArray(updatedFilters[key])) {
          updatedFilters[key] = updatedFilters[key].filter((item) => {
            if (Array.isArray(item.id) && Array.isArray(id)) {
              return JSON.stringify(item.id) !== JSON.stringify(id);
            } else {
              return item.id !== id;
            }
          });
        }
      }
      console.log("updatedFilters", updatedFilters);
      let keyWithSingleObject = null; // Variable to store the key with exactly one object in its array

      for (let key in payload) {
        if (
          Array.isArray(payload[key]) &&
          payload[key].length === 1
        ) {
          if (keyWithSingleObject === null) {
            keyWithSingleObject = key; // Store the key if it meets the condition for the first time
          } else {
            keyWithSingleObject = null; // Reset the variable if another key with single object is found
            break; // Exit the loop since there are multiple keys with single object
          }
        }
      }

      if (keyWithSingleObject !== null) {
        resetSelectItem(); // Perform action if exactly one key with one object is found
      }
      // Return the modified state
      return updatedFilters;
    });
  };

  const resetSelectItem = () => {
    setPayload({
      facing: [],
      areaType: [],
      propertyType: [],
      bhkType: [],
      propertyStatus: [],
      posessionStatus: [],
      budget: [],
      feature: [],
      landArea: [],
      bathroom: [],
      search: "",
      isFeatured: true,
    });
    setResetBtnValue(false);
  };
  return (
    <>
      <Navbar />
      <div className={`${styles.forSticky}`}>
        <div className={`${styles.heroSection} heroSection `}>
          <div className="text-sm font-medium text-center text-black-500 border-black-900 dark:text-gray-400 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px ml-3">
              {/* Facing */}

              <li className="me-2 mt-3">
                <button
                  id="dropdownFacinggButton"
                  data-dropdown-toggle="dropdownFacingg"
                  className="text-black bg-white border border-black hover:bg-white-800 focus:ring-4 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm px-2 py-2 text-center inline-flex items-center dark:bg-white-600 dark:hover:bg-white-700 dark:focus:ring-white-800"
                  type="button"
                >
                  Facing
                  <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <div
                  id="dropdownFacingg"
                  className="z-10 hidden bg-gray-200 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                >
                  <ul
                    className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownFacinggButton"
                  >
                    {facingData ? (
                      facingData?.data?.map((item, index) => (
                        <li key={index}>
                          <div className="flex items-center p-2 rounded hover:bg-white dark:hover:bg-gray-600">
                            <input
                              id={`checkbox-item-${index}`}
                              type="checkbox"
                              value={JSON.stringify({
                                id: item._id,
                                label: item.Facing,
                              })}
                              checked={payload.facing.some(
                                (obj) => obj.id === item._id
                              )}
                              name="facing"
                              onChange={handleCheckBoxChange}
                              className="w-4 h-4 text-blue-600 bg-white-100 border-white-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                              htmlFor={`checkbox-item-${index}`}
                              className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                            >
                              {item.Facing}
                            </label>
                          </div>
                        </li>
                      ))
                    ) : (
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-white dark:hover:bg-gray-200 dark:hover:text-white"
                        >
                          No data found
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </li>

              {/* Property type */}
              <li className="me-2 mt-3">
                <button
                  id="dropdownPropertyTypeButton"
                  data-dropdown-toggle="dropdownPropertyType"
                  className="text-black bg-white border border-black hover:bg-white-800 focus:ring-4 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm px-2 py-2 text-center inline-flex items-center dark:bg-white-600 dark:hover:bg-white-700 dark:focus:ring-white-800"
                  type="button"
                >
                  Property Type
                  <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <div
                  id="dropdownPropertyType"
                  className="z-10 hidden bg-gray-200 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                >
                  <ul
                    className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownPropertyTypeButton"
                  >
                    {propertyTypeData ? (
                      propertyTypeData?.data?.map((item, index) => (
                        <li key={index}>
                          <div className="flex items-center p-2 rounded hover:bg-white dark:hover:bg-gray-600">
                            <input
                              id={`checkbox-item-${index}`}
                              type="checkbox"
                              name="propertyType"
                              value={JSON.stringify({
                                id: item._id,
                                label: item.Type,
                              })}
                              checked={payload.propertyType.some(
                                (obj) => obj.id === item._id
                              )}
                              onChange={handleCheckBoxChange}
                              className="w-4 h-4 text-blue-600 bg-white-100 border-white-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                              htmlFor={`checkbox-item-${index}`}
                              className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                            >
                              {item.Type}
                            </label>
                          </div>
                        </li>
                      ))
                    ) : (
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-white dark:hover:bg-gray-200 dark:hover:text-white"
                        >
                          No data found
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </li>
              {/* Area type */}
              <li className="me-2 mt-3">
                <button
                  id="dropdownAreTypeButton"
                  data-dropdown-toggle="dropdownAreType"
                  className="text-black bg-white border border-black hover:bg-white-800 focus:ring-4 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm px-2 py-2 text-center inline-flex items-center dark:bg-white-600 dark:hover:bg-white-700 dark:focus:ring-white-800"
                  type="button"
                >
                  Location
                  <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                <div
                  id="dropdownAreType"
                  className="z-10 hidden bg-gray-200 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                >
                  <ul
                    className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownAreTypeButton"
                  >
                    {areaData?.data?.length > 0 ? (
                      areaData?.data?.map((item, index) => (
                        <li key={index}>
                          <div className="flex items-center p-2 rounded hover:bg-white dark:hover:bg-gray-600">
                            <input
                              id={`checkbox-item-${index}`}
                              type="checkbox"
                              name="areaType"
                              value={JSON.stringify({
                                id: item._id,
                                label: item.Area,
                              })}
                              checked={payload.areaType.some(
                                (obj) => obj.id === item._id
                              )}
                              onChange={handleCheckBoxChange}
                              className="w-4 h-4 text-blue-600 bg-white-100 border-white-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                              htmlFor={`checkbox-item-${index}`}
                              className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                            >
                              {item.Area}
                            </label>
                          </div>
                        </li>
                      ))
                    ) : (
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-white dark:hover:bg-gray-200 dark:hover:text-white"
                        >
                          No data found
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </li>
              {/* Range type */}
              <li className="me-2 mt-3">
                <button
                  id="dropdownRangeTypeButton"
                  data-dropdown-toggle="dropdownRangeType"
                  className="text-black bg-white border border-black hover:bg-white-800 focus:ring-4 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm px-2 py-2 text-center inline-flex items-center dark:bg-white-600 dark:hover:bg-white-700 dark:focus:ring-white-800"
                  type="button"
                >
                  Range Type
                  <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                <div
                  id="dropdownRangeType"
                  className="z-10 hidden bg-gray-200 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                >
                  <ul
                    className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownRangeTypeButton"
                  >
                    {RangeTypeArray.map((item, index) => (
                      <li key={index}>
                        <div className="flex items-center p-2 rounded hover:bg-white dark:hover:bg-gray-600">
                          <input
                            id={`checkbox-item-${index}`}
                            type="checkbox"
                            value={`[${item.value1} ,${item.value2}]`}
                            onChange={handleRangeCheckBoxChange}
                            name="budget"
                            className="w-4 h-4 text-blue-600 bg-white-100 border-white-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            checked={payload.budget.some(
                              (obj) =>
                                obj.id[0] === item.value1 &&
                                obj.id[1] === item.value2
                            )}
                          />
                          <label
                            htmlFor={`checkbox-item-${index}`}
                            className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                          >
                            {item.label}
                          </label>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>

              {/* Bhk type */}
              <li className="me-2 mt-3">
                <button
                  id="BhkTypeButton"
                  data-dropdown-toggle="BhkType"
                  // data-dropdown-delay="500"
                  // data-dropdown-trigger="hover"
                  className="text-black bg-white border border-black hover:bg-white-800 focus:ring-4 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm px-2 py-2 text-center inline-flex items-center dark:bg-white-600 dark:hover:bg-white-700 dark:focus:ring-white-800"
                  type="button"
                >
                  Bhk Type
                  <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <div
                  id="BhkType"
                  className="z-10 hidden bg-gray-200 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                >
                  <ul
                    className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="BhkTypeButton"
                  >
                    {bhkTypeData ? (
                      bhkTypeData?.data?.map((item, index) => (
                        <li key={index}>
                          <div className="flex items-center p-2 rounded hover:bg-white dark:hover:bg-gray-600">
                            <input
                              id={`checkbox-item-${index}`}
                              type="checkbox"
                              value={JSON.stringify({
                                id: item._id,
                                label: item.Type,
                              })}
                              checked={payload.bhkType.some(
                                (obj) => obj.id === item._id
                              )}
                              name="bhkType"
                              onChange={handleCheckBoxChange}
                              className="w-4 h-4 text-blue-600 bg-white-100 border-white-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                              htmlFor={`checkbox-item-${index}`}
                              className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                            >
                              {item.Type}
                            </label>
                          </div>
                        </li>
                      ))
                    ) : (
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-white dark:hover:bg-gray-200 dark:hover:text-white"
                        >
                          No data found
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </li>
              {/* Property Status */}
              <li className="me-2 mt-3">
                <button
                  id="dropdownStatusButton"
                  data-dropdown-toggle="dropdownStatus"
                  className="text-black bg-white border border-black hover:bg-white-800 focus:ring-4 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm px-2 py-2 text-center inline-flex items-center dark:bg-white-600 dark:hover:bg-white-700 dark:focus:ring-white-800"
                  type="button"
                >
                  Property Status
                  <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                <div
                  id="dropdownStatus"
                  className="z-10 hidden bg-gray-200 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                >
                  <ul
                    className="p-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownStatusButton"
                  >
                    {propertyStatusData ? (
                      propertyStatusData?.data?.map((item, index) => (
                        <li key={index}>
                          <div className="flex items-center p-2 rounded hover:bg-white dark:hover:bg-gray-600">
                            <input
                              id={`checkbox-item-${index}`}
                              type="checkbox"
                              value={JSON.stringify({
                                id: item._id,
                                label: item.Status,
                              })}
                              checked={payload.propertyStatus.some(
                                (obj) => obj.id === item._id
                              )}
                              name="propertyStatus"
                              onChange={handleCheckBoxChange}
                              className="w-4  h-4 text-blue-600 bg-white-100 border-white-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                              htmlFor={`checkbox-item-${index}`}
                              className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                            >
                              {item.Status}
                            </label>
                          </div>
                        </li>
                      ))
                    ) : (
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-white dark:hover:bg-gray-200 dark:hover:text-white"
                        >
                          No data found
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </li>
              {/* Possession Status   */}
              <li className="me-2 mt-3">
                <button
                  id="dropdownPossessionButton"
                  data-dropdown-toggle="dropdownPossession"
                  className="text-black bg-white border border-black hover:bg-white-800 focus:ring-4 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm px-2 py-2 text-center inline-flex items-center dark:bg-white-600 dark:hover:bg-white-700 dark:focus:ring-white-800"
                  type="button"
                >
                  Possession Status
                  <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                <div
                  id="dropdownPossession"
                  className="z-10 hidden bg-gray-200 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                >
                  <ul
                    className="p-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownPossessionButton"
                  >
                    {posessionStatusData ? (
                      posessionStatusData?.data?.map((item, index) => (
                        <li key={index}>
                          <div className="flex items-center p-2 rounded hover:bg-white dark:hover:bg-gray-600">
                            <input
                              id={`checkbox-item-${index}`}
                              type="checkbox"
                              value={JSON.stringify({
                                id: item._id,
                                label: item.Possession,
                              })}
                              checked={payload.posessionStatus.some(
                                (obj) => obj.id === item._id
                              )}
                              name="posessionStatus"
                              onChange={handleCheckBoxChange}
                              className="w-4 h-4 text-blue-600 bg-white-100 border-white-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            />
                            <label
                              htmlFor={`checkbox-item-${index}`}
                              className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                            >
                              {item.Possession}
                            </label>
                          </div>
                        </li>
                      ))
                    ) : (
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 hover:bg-white dark:hover:bg-gray-200 dark:hover:text-white"
                        >
                          No data found
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </li>
              {/* More Filter */}
              <li className="me-2 mt-3">
                <button
                  id="multiLevelDropdownButton"
                  data-dropdown-toggle="multi-dropdown"
                  className="text-black bg-white border border-black hover:bg-white-800 focus:ring-4 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm px-2 py-2 text-center inline-flex items-center dark:bg-white-600 dark:hover:bg-white-700 dark:focus:ring-white-800"
                  type="button"
                >
                  More Filter
                  <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                <div
                  id="multi-dropdown"
                  className="z-10 hidden bg-gray-200 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                >
                  <ul
                    className="p-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="multiLevelDropdownButton"
                  >
                    {/* Feature */}
                    <li>
                      <button
                        id="doubleDropdownButton"
                        data-dropdown-toggle="doubleDropdown"
                        data-dropdown-placement="right-start"
                        type="button"
                        className="flex items-center justify-between w-full px-4 py-2 hover:bg-white dark:hover:bg-white dark:text-white"
                      >
                        Feature
                        <svg
                          className="w-2.5 h-2.5 ms-3 rtl:rotate-180"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 6 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 9 4-4-4-4"
                          />
                        </svg>
                      </button>
                      <div
                        id="doubleDropdown"
                        className="z-10 hidden bg-gray-200 divide-y divide-gray-100 rounded-lg shadow w-96 dark:bg-gray-700"
                      >
                        <ul
                          // className="p-2 text-sm text-gray-700 dark:text-gray-200 flex flex-wrap"
                          className="grid gap-1  p-2 md:grid-cols-2"
                          aria-labelledby="doubleDropdownButton"
                        >
                          {featureData ? (
                            featureData.data.map((item, index) => (
                              <li key={index} className="w-1/3 mb-2">
                                {" "}
                                {/* Ensure each item takes 1/3 of the width */}
                                <div className="flex items-center p-1 rounded hover:bg-white dark:hover:bg-gray-600">
                                  <input
                                    id={`checkbox-item-${index}`}
                                    type="checkbox"
                                    value={JSON.stringify({
                                      id: item._id,
                                      label: item.Feature,
                                    })}
                                    checked={payload.feature.some(
                                      (obj) => obj.id === item._id
                                    )}
                                    name="feature"
                                    onChange={handleCheckBoxChange}
                                    className="w-4 h-4 text-blue-600 bg-white-100 border-white-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                  />
                                  <label
                                    htmlFor={`checkbox-item-${index}`}
                                    className="w-full  text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                                  >
                                    {item.Feature}
                                  </label>
                                </div>
                              </li>
                            ))
                          ) : (
                            <li>
                              <a
                                href="#"
                                className="block px-4 py-2 hover:bg-white dark:hover:bg-gray-200 dark:hover:text-white"
                              >
                                No data found
                              </a>
                            </li>
                          )}
                        </ul>
                      </div>
                    </li>
                    {/* Bathroom */}
                    <li>
                      <button
                        id="bathroomDropdownButton"
                        data-dropdown-toggle="bathroomDropdown"
                        data-dropdown-placement="right-start"
                        type="button"
                        className="flex items-center justify-between w-full px-4 py-2 hover:bg-white dark:hover:bg-white dark:text-white"
                      >
                        Bathroom
                        <svg
                          className="w-2.5 h-2.5 ms-3 rtl:rotate-180"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 6 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 9 4-4-4-4"
                          />
                        </svg>
                      </button>
                      <div
                        id="bathroomDropdown"
                        className="z-10 hidden bg-gray-200 divide-y divide-gray-100 rounded-lg shadow w-96 dark:bg-gray-700"
                      >
                        <ul
                          // className="p-2 text-sm text-gray-700 dark:text-gray-200 flex flex-wrap"
                          className="grid gap-1  p-2 md:grid-cols-2"
                          aria-labelledby="bathroomDropdownButton"
                        >
                          {bathroomArray ? (
                            bathroomArray.map((item, index) => (
                              <li key={index} className="w-1/3 mb-2">
                                {" "}
                                {/* Ensure each item takes 1/3 of the width */}
                                <div className="flex items-center p-1 rounded hover:bg-white dark:hover:bg-gray-600">
                                  <input
                                    id={`checkbox-item-${index}`}
                                    type="checkbox"
                                    value={JSON.stringify({
                                      id: item.value,
                                      label: item.label,
                                    })}
                                    checked={payload.bathroom.some(
                                      (obj) => obj.id === item.value
                                    )}
                                    name="bathroom"
                                    onChange={handleCheckBoxChange}
                                    className="w-4 h-4 text-blue-600 bg-white-100 border-white-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                  />
                                  <label
                                    htmlFor={`checkbox-item-${index}`}
                                    className="w-full  text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                                  >
                                    {item.label}
                                  </label>
                                </div>
                              </li>
                            ))
                          ) : (
                            <li>
                              <a
                                href="#"
                                className="block px-4 py-2 hover:bg-white dark:hover:bg-gray-200 dark:hover:text-white"
                              >
                                No data found
                              </a>
                            </li>
                          )}
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={` ${styles.divideDetailPage} divideDetailPage`}>
        <div className={` ${styles.divideDetailPageLeft}`}>
          {/* GeneralDetail */}
          <div
            id="general"
            className={`${styles.generalDetails} GeneralDetails`}
          >
            <div className="flex ml-3">
              {Object.values(payload).some((array) => array.length > 0) && (
                <div className="flex">
                  {Object.entries(payload).map(
                    ([key, value]) =>
                      value.length > 0 &&
                      Array.isArray(value) ? (
                        <div key={key}>
                          {value.map((item, index) =>
                            Array.isArray(item.label) ? (
                              item.label.map((labelItem, labelIndex) => (
                                <div
                                  key={item.id}
                                  id={`badge-dismiss-${item.id}`}
                                  className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-blue-800 bg-blue-100 rounded dark:bg-blue-900 dark:text-blue-300"
                                >
                                  <span>{labelItem}</span>
                                  {/* Add margin between label item and cross button */}
                                  <button
                                    type="button"
                                    className="inline-flex items-center p-1 ms-2 me-1 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300"
                                    onClick={() => handleRemoveBadge(item.id)}
                                    aria-label="Remove"
                                  >
                                    <svg
                                      className="w-2 h-2"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 14 14"
                                    >
                                      <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              ))
                            ) : (
                              <div
                                key={item.id}
                                id={`badge-dismiss-${item.id}`}
                                className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-blue-800 bg-blue-100 rounded dark:bg-blue-900 dark:text-blue-300"
                              >
                                <span>{item.label || item}</span>
                                {/* Add margin between label item and cross button */}
                                <button
                                  type="button"
                                  className="inline-flex items-center p-1 ms-2 me-1 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300"
                                  onClick={() => handleRemoveBadge(item.id)}
                                  aria-label="Remove"
                                >
                                  <svg
                                    className="w-2 h-2"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                  >
                                    <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                  </svg>
                                </button>
                              </div>
                            )
                          )}
                        </div>
                      ):(null)
                  )}
                  {resetBtnValue && (
                    <button
                      onClick={resetSelectItem}
                      type="button"
                      className={`mx-auto text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-1 text-center  me-2 mb-2`}
                    >
                      Reset
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="GeneralDetailsMain">
              {listData && listDataForShow ? (
                <h2 className={`${styles.GeneralDetailsMainHead}`}>
                  {listDataForShow.length - (listDataForShow.length - 1)} -{" "}
                  {listDataForShow.length} of {listData.length}
                </h2>
              ) : (
                <h2 className={`${styles.GeneralDetailsMainHead}`}>
                  No Data Found
                </h2>
              )}

              <div
                className={` flex justify-between  ${styles.GeneralDetailsSecondSection}`}
              >
                <h1
                  className={` flex-grow  ${styles.GeneralDetailsSecondHead}`}
                >
                  Ready to Move-In Projects in Rajasthan.
                </h1>
                <div className="flex">
                  <div>
                    <li className="me-2 mt-2 list-none">
                      <button
                        id="dropdownSortByButton"
                        data-dropdown-toggle="dropdownSortBy"
                        data-dropdown-delay="500"
                        data-dropdown-trigger="hover"
                        className={`text-black bg-lightgrey border border-black hover:bg-lightgrey-800 focus:ring-4 focus:outline-none focus:ring-lightgrey-300 font-medium rounded-lg text-sm px-2 py-2 text-center inline-flex items-center dark:bg-lightgrey-600 dark:hover:bg-lightgrey-700 dark:focus:ring-lightgrey-800 ${styles.GeneralDetailsSortDropdown}`}
                        type="button"
                      >
                        Sort By
                        <svg
                          className="w-2.5 h-2.5 ms-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 10 6"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 4 4 4-4"
                          />
                        </svg>
                      </button>

                      <div
                        id="dropdownSortBy"
                        className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                      >
                        <ul
                          className="py-2 text-sm text-gray-700 dark:text-gray-200"
                          aria-labelledby="dropdownSortByButton"
                        >
                          <li>
                            <a
                              href="#"
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              By High Price
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              By Low Price
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              A - Z
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Z - A
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </div>
                </div>
              </div>
              <div className=" mx-auto mb-2 ml-3">
                <ReadMore text={longText} maxLength={100} />
              </div>
              {listDataForShow ? (
                listDataForShow.map((item, index) => (
                  <div
                    key={index}
                    className={`mb-3 ml-3 ${styles.GeneralDetailsBox}`}
                  >
                    <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                      <div className="flex-shrink-0 h-full">
                        <Link href={`/propertyDetail/${item._id}`}>
                          <img
                            className={` object-cover w-full rounded-t-lg h-full h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg ml-3 ${styles.cardMainImg}`}
                            src={item?.Images[0].URL}
                            alt=""
                          />
                        </Link>
                      </div>

                      <div
                        className={`flex flex-col justify-between leading-normal ml-3 w-full mr-3 mt-3 mb-3 ${styles.cardContent}`}
                      >
                        <Link href={`/propertyDetail/${item._id}`}>
                          {" "}
                          <div className="flex justify-between ">
                            <h5
                              className={`mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white ${styles.price}`}
                            >
                              {/* <span className="px-2">₹</span> */}₹{" "}
                              <span>{item.TotalPrice.DisplayValue}</span>
                            </h5>
                            {/* <div className="flex ">
                            <div
                              className={` mr-3 ${styles.GeneralDetailsBoxIcon}`}
                            >
                              {" "}
                              <i className="bi bi-share"></i>
                            </div>
                            <div
                              className={`ml-3 ${styles.GeneralDetailsBoxIcon}`}
                            >
                              {" "}
                              <i className="bi bi-heart"></i>
                            </div>
                          </div> */}
                          </div>
                          <div className="flex flex-row  leading-normal ">
                            <p className="mb-3 font-bold text-black-700 dark:text-black-800 ">
                              {item.Titile}
                            </p>
                            {/* <button
                            type="button"
                            className={`text-white-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-2 ml-2 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 ${styles.cardStarBtn}`}
                          >
                            <span>4</span>{" "}
                            <span>
                              <i className="bi bi-star-fill"></i>
                            </span>
                          </button> */}

                            <button
                              type="button"
                              className={`text-white-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-2 ml-2 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 ${styles.cardStarBtn}`}
                            >
                              {item?.Facing[0].Facing}
                            </button>
                          </div>
                          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            <i className="bi bi-geo-alt-fill"></i>
                            <span className={`ml-1 ${styles.textCapitalized}`}>
                              {item.Address}
                            </span>{" "}
                            <span className={`ml-1 ${styles.textCapitalized}`}>
                              {item.Country}
                            </span>
                          </p>
                          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                            <span className="mb-3 font-bold text-gray-700 dark:text-gray-400">
                              {item.BhkType.Type}
                            </span>{" "}
                            for {item.ProeprtyFor} in {item.Area.Area},
                            {item.State}
                          </p>
                        </Link>
                        <div className="">
                          <Accordion listData={[item]} />
                        </div>
                        <div className="mt-2 ">
                          <ReadMore text={item.Description} maxLength={100} />
                        </div>
                        <div className="flex flex-col md:flex-row justify-between items-center leading-normal mt-3">
                          <div className="flex items-center mb-2 md:mb-0">
                            <img
                              className={`${styles.cardImage} w-10 h-10 md:w-auto md:h-auto`}
                              src="/img/demo_building_logo.png"
                              alt=""
                            />
                            <div className="flex flex-col ml-2">
                              <h3 className="font-bold text-sm md:text-base">
                                Demo Pvt.Ltd
                              </h3>
                              <p className="text-gray-900 text-xs md:text-sm">
                                Seller
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col md:flex-row justify-between">
                            <button
                              type="button"
                              className={`text-white-600 hover:bg-gray-200 hover:border-green-600 border-2 border-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-xs md:text-sm px-3 py-1.5 md:px-5 md:py-2.5 text-center mb-2 md:mb-0 me-2 ${styles.cardLastBtn}`}
                            >
                              <span className="mr-2">
                                <i className="bi bi-download"></i>
                              </span>{" "}
                              Brochure
                            </button>
                            <button
                              type="button"
                              className={`text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-xs md:text-sm px-3 py-1.5 md:px-5 md:py-2.5 text-center mb-2 md:mb-0 ${styles.cardLastBtn}`}
                            >
                              <span className="mr-1">
                                <i className="bi bi-telephone"></i>
                              </span>
                              Contact Sellers
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <SkeletonLoader />
              )}
            </div>
          </div>
          {listData.length > 2 &&
          listData.length != numToShow &&
          listData.length != listDataForShow.length ? (
            <div className="flex justify-center">
              <div>
                <button
                  onClick={showMoreItems}
                  type="button"
                  className={`mx-auto text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3 me-2 mb-2`}
                >
                  Show More Properties
                </button>
              </div>
            </div>
          ) : listDataForShow.length > 2 ||
            (numToShow != listData.length &&
              listData.length > 0 &&
              listData.length != listDataForShow.length) ? (
            <div className="flex justify-center">
              <div>
                <button
                  onClick={showLessItems}
                  type="button"
                  className={`mx-auto text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3 me-2 mb-2`}
                >
                  Show Less Properties
                </button>
              </div>
            </div>
          ) : null}
        </div>

        <div className={` ${styles.divideDetailPageRight}`}></div>
      </div>

      <Footer />
    </>
  );
};

export default PropertyListPage;

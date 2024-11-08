import styles from "./page.module.css"
import { useEffect, useRef, useState } from "react";
import useFetch from "@/customHooks/useFetch";
import { API_BASE_URL, API_BASE_URL_FOR_MASTER } from "@/utils/constants";
import Link from "next/link";

const SearchBar = (props) => {
  const [search, setSearch] = useState("");
  const [loactionValue, setLocationValue] = useState("")
  const [loactionDisplayValue, setLocationDisplayValue] = useState("")
  const [budgetValue, setBudgetValue] = useState("")
  const [budgetDisplayValue, setBudgetDisplayValue] = useState("")
  const [propertyValue, setPropertyValue] = useState("")
  const [propertyDisplayValue, setPropertyDisplayValue] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownOpenP, setIsDropdownOpenP] = useState(false);
  const [isDropdownOpenB, setIsDropdownOpenB] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownRefBudget = useRef(null);
  const dropdownRefProperty = useRef(null);

  const { data: propertyTypeData } = useFetch(
    `${API_BASE_URL_FOR_MASTER}/propertyWithSubTypes`
  );

  const { data: areaData } = useFetch(`${API_BASE_URL_FOR_MASTER}/areas`);

  const RangeTypeArray = [
    { value1: 1000000, value2: 3000000, label: "10 L- 30 L" },
    { value1: 3000000, value2: 6000000, label: " 30 L- 60 L" },
    { value1: 6000000, value2: 10000000, label: "60 L- 1 Cr" },
    { value1: 10000000, value2: 20000000, label: "1 Cr- 2 Cr" },
    { value1: 20000000, value2: 50000000, label: "2 Cr- 5 Cr" },
  ];

  const handleLocationChange = (e) => {
    setLocationValue(e.target.value);
    setLocationDisplayValue(e.target.innerText)
    setIsDropdownOpen(false);
  }
  const handleButtonClick = () => {
    setIsDropdownOpen(true);
  };
  const handleBudgetButtonClick = () => {
    setIsDropdownOpenB(true);
  };
  const handlePropertyButtonClick = () => {
    setIsDropdownOpenP(true);
  };
  const handleBudgetChange = (e) => {
    setBudgetValue(e.target.value);
    setBudgetDisplayValue(e.target.innerText)
    setIsDropdownOpenB(false);
  }
  const handlePropertyChange = (e) => {
    setPropertyValue(e.target.value);
    setPropertyDisplayValue(e.target.innerText);
    setIsDropdownOpenP(false);
  }

  const {
    data: propertyByAllPropertiesProperty,
    loading: propertyByAllPropertiesLoading,
    error: propertyByAllPropertiesError,
  } = useFetch(`${API_BASE_URL}/properties/allProperties?page=1&pageSize=5&search=${search}`);
  const handleSearch = (e) => {
    setSearch(e.target.value)
    setPayload({
      areaType: loactionValue ? [loactionValue] : [],
      propertyType: propertyValue ? [propertyValue] : [],
      budget: budgetValue ? [budgetValue] : []
    });
  }

  const [payload, setPayload] = useState({});

  // setPayload({
  //   areaType: loactionValue ? [loactionValue] : [],
  //   propertyType: propertyValue ? [propertyValue] : [],
  //   budget: budgetValue ? [budgetValue] : []
  // });


  return (
    <>
      <div className={`${styles.crousalItemSearchMain}`}>
        <div className="flex">
          <label
            htmlFor="search-dropdown"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Property
          </label>

          <div className="relative w-full">
            <input
              type="search"
              value={search}
              onChange={handleSearch}
              id="search-dropdown"
              className={` ${styles.crousalItemSearchInput} block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-md border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500`}
              placeholder="Search for property"
              required
            />
            <button
              id="buy-dropdown-button"
              data-dropdown-toggle="buy-dropdown"
              onClick={handleBudgetButtonClick}
              aria-haspopup="true"
              aria-expanded={isDropdownOpenB ? "true" : "false"}
              className={`absolute top-0 ${styles.crousalSearchBuyType}
                          flex-shrink-0 z-10 inline-flex items-center mr-3 py-2.5 pr-8 pl-4 text-sm font-bold text-center text-gray-600 bg-gray-100 border border-gray-300`}
              type="button"
            >
              {
                budgetValue ? budgetDisplayValue : "Budget"
              }
              <svg
                className="w-2.5 h-2.5 ms-2.5"
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
              //ref={dropdownRefBudget}
              id="buy-dropdown"
              className={`z-10 ${isDropdownOpenB ? 'block' : 'hidden'} ${styles.buydropDownList}  overflow-y-scroll bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
              style={{ maxHeight: "200px", width: "15%"}}
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="buy-dropdown-button"
              >
                {RangeTypeArray.map((item, index) => (
                  <li key={index}>
                    <button
                      onClick={handleBudgetChange}
                      type="button"
                      value={`${item.label}`}
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <button
              id="budget-dropdown-button"
              onClick={handleButtonClick}
              aria-haspopup="true"
              aria-expanded={isDropdownOpen ? "true" : "false"}
              data-dropdown-toggle="budget-dropdown"
              className={`absolute top-0 ${styles.crousalSearchBudgetType}
                          flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-bold text-center text-gray-600 bg-gray-100 border border-gray-300 `}
              type="button"
            >
              {loactionValue ? loactionDisplayValue : "Location"}
              <svg
                className="w-2.5 h-2.5 ms-2.5"
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
              id="budget-dropdown"
              className={`z-10 ${isDropdownOpen ? 'block' : 'hidden'} overflow-y-scroll bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
              style={{ maxHeight: "200px", width: "15%" }} // Adjust the max height as per your requirement
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="budget-dropdown-button"
              >
                {/* Render all items in the list */}
                {areaData ? (
                  areaData?.data?.map((item, index) => (
                    <li key={index}>
                      <button
                        type="button"
                        value={item._id}
                        onClick={handleLocationChange}
                        className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        {item.Area}
                      </button>
                    </li>
                  ))
                ) : null}
              </ul>
            </div>

            <button
              id="dropdown-button"
              data-dropdown-toggle="dropdown"
              onClick={handlePropertyButtonClick}
              aria-haspopup="true"
              aria-expanded={isDropdownOpenP ? "true" : "false"}
              className={`absolute top-0 ${styles.crousalSearchPropertyType}
                        flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-bold text-center text-gray-600 bg-gray-100 border border-gray-300`}
              type="button"
            >
              {
                propertyValue ? propertyDisplayValue : "Property"
              }
              <svg
                className="w-2.5 h-2.5 ms-2.5"
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
              //ref={dropdownRefProperty}
              id="dropdown"
              className={`z-10 ${isDropdownOpenP ? 'block' : 'hidden'} overflow-y-scroll bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
              style={{ maxHeight: "200px", width: "17%" }}
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdown-button"
              >
                {propertyTypeData ? (
                  propertyTypeData?.data?.map((item, index) => (
                    <li key={index}>
                      <button
                        value={item._id}
                        onClick={handlePropertyChange}
                        type="button"
                        className="inline-flex text-nowrap w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        {item.Name}
                      </button>
                    </li>
                  ))) : null}
              </ul>
            </div>
            <Link
              href={`/propertyList/property?${search && `searchData=${search}`}${budgetValue && `&budgetData=${budgetValue}`}${propertyValue && `&propertyTypeID=${propertyValue}`}${propertyDisplayValue && `&propertyTypeLabel=${propertyDisplayValue}`}${loactionValue && `&areaId=${loactionValue}`}${loactionDisplayValue && `&areaLabel=${loactionDisplayValue}`}`}
            >
              <button
                type="button"
                className={`${styles.crousalItemSearchButton} absolute top-0 end-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md m-0 text-sm px-3.5 py-4.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}
              >
                Search
              </button>
            </Link>
            <button
              type="submit"
              className={`${styles.crousalItemSearchIcon} absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-md border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default SearchBar;

import styles from "./page.module.css"
import { useEffect, useRef, useState } from "react";
import useFetch from "@/customHooks/useFetch";
import { API_BASE_URL, API_BASE_URL_FOR_MASTER } from "@/utils/constants";

const SearchBar = () => {
  const [search, setSearch] = useState("");

  const {
    data: propertyByAllPropertiesProperty,
    loading: propertyByAllPropertiesLoading,
    error: propertyByAllPropertiesError,
  } = useFetch(`${API_BASE_URL}/properties/allProperties?page=1&pageSize=5&search=${search}`);
  console.log("propertyByAllPropertiesProperty",propertyByAllPropertiesProperty)
  const handleSearch = (e) => {
    setSearch(e.target.value)
  }
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
                          className={` ${styles.crousalItemSearchInput} block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-md border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500`}
                          placeholder="Search for property"
                          required
                        />
                        <button
                          id="buy-dropdown-button"
                          data-dropdown-toggle="buy-dropdown"
                          className={`absolute top-0 ${styles.crousalSearchBuyType}  
                          flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-600 bg-gray-100 border border-gray-300 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600`}
                          type="button"
                        >
                          Buy{" "}
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
                          id="buy-dropdown"
                          className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                        >
                          <ul
                            className="py-2 text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby="buy-dropdown-button"
                          >
                            <li>
                              <button
                                type="button"
                                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                Mockups
                              </button>
                            </li>
                            <li>
                              <button
                                type="button"
                                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                Templates
                              </button>
                            </li>
                            <li>
                              <button
                                type="button"
                                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                Design
                              </button>
                            </li>
                            <li>
                              <button
                                type="button"
                                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                Logos
                              </button>
                            </li>
                          </ul>
                        </div>
                        <button
                          id="budget-dropdown-button"
                          data-dropdown-toggle="budget-dropdown"
                          className={`absolute top-0 ${styles.crousalSearchBudgetType}  
                        flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-600 bg-gray-100 border border-gray-300 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600`}
                          type="button"
                        >
                          Budget{" "}
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
                          className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                        >
                          <ul
                            className="py-2 text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby="budget-dropdown-button"
                          >
                            <li>
                              <button
                                type="button"
                                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                Mockups
                              </button>
                            </li>
                            <li>
                              <button
                                type="button"
                                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                Templates
                              </button>
                            </li>
                            <li>
                              <button
                                type="button"
                                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                Design
                              </button>
                            </li>
                            <li>
                              <button
                                type="button"
                                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                Logos
                              </button>
                            </li>
                          </ul>
                        </div>
                        <button
                          id="dropdown-button"
                          data-dropdown-toggle="dropdown"
                          className={`absolute top-0 ${styles.crousalSearchPropertyType}  
                        flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-600 bg-gray-100 border border-gray-300 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600`}
                          type="button"
                        >
                          Property Type{" "}
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
                          id="dropdown"
                          className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                        >
                          <ul
                            className="py-2 text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby="dropdown-button"
                          >
                            <li>
                              <button
                                type="button"
                                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                Mockups
                              </button>
                            </li>
                            <li>
                              <button
                                type="button"
                                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                Templates
                              </button>
                            </li>
                            <li>
                              <button
                                type="button"
                                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                Design
                              </button>
                            </li>
                            <li>
                              <button
                                type="button"
                                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                              >
                                Logos
                              </button>
                            </li>
                          </ul>
                        </div>
                        <button
                          type="button"
                          className={`${styles.crousalItemSearchButton} absolute top-0 end-0 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-2.5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}
                        >
                          Search
                        </button>
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
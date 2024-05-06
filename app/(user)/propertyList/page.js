"use client";
import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import React, { useEffect, useState } from "react";
import styles from "./propertyList.module.css";
import { initFlowbite } from "flowbite";
import Slider from "react-slick";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const PropertyListPage = () => {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState("general");

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

  return (
    <>
      <Navbar />
      <div className={`${styles.forSticky}`}>
        <div className={`${styles.heroSection} heroSection `}>
          <div className="text-sm font-medium text-center text-black-500 border-black-900 dark:text-gray-400 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px">
              {/* <li className="me-2 mt-3">
              <button
                id="dropdownDelayButton"
                data-dropdown-toggle="dropdownDelay"
                data-dropdown-delay="500"
                data-dropdown-trigger="hover"
                class="text-black bg-white border border-black hover:bg-white-800 focus:ring-4 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-white-600 dark:hover:bg-white-700 dark:focus:ring-white-800"
                type="button"
              >
                Dropdown hover{" "}
                <svg
                  class="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              
              <div
                id="dropdownDelay"
                class="z-10  bg-white divide-y divide-gray-100 w-full rounded-lg shadow w-44 dark:bg-gray-700 "
              >
                <div  class="relative mb-6">
                  <label for="labels-range-input" class="sr-only">
                    Labels range
                  </label>
                  <input
                    id="labels-range-input"
                    type="range"
                    value="1000"
                    min="100"
                    max="1500"
                    class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                  <span class="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">
                    Min ($100)
                  </span>
                  <span class="text-sm text-gray-500 dark:text-gray-400 absolute start-1/3 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                    $500
                  </span>
                  <span class="text-sm text-gray-500 dark:text-gray-400 absolute start-2/3 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">
                    $1000
                  </span>
                  <span class="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">
                    Max ($1500)
                  </span>
                </div>
              </div>
            </li> */}
              <li className="me-2 mt-3">
                <button
                  id="dropdownPropertyTypeButton"
                  data-dropdown-toggle="dropdownPropertyType"
                  data-dropdown-delay="500"
                  data-dropdown-trigger="hover"
                  class="text-black bg-white border border-black hover:bg-white-800 focus:ring-4 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-white-600 dark:hover:bg-white-700 dark:focus:ring-white-800"
                  type="button"
                >
                  Property Type
                  <svg
                    class="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                <div
                  id="dropdownPropertyType"
                  class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                >
                  <ul
                    class="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownPropertyTypeButton"
                  >
                    <li>
                      <a
                        href="#"
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Earnings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="me-2 mt-3">
                <button
                  id="dropdownFacingButton"
                  data-dropdown-toggle="dropdownFacing"
                  data-dropdown-delay="500"
                  data-dropdown-trigger="hover"
                  class="text-black bg-white border border-black hover:bg-white-800 focus:ring-4 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-white-600 dark:hover:bg-white-700 dark:focus:ring-white-800"
                  type="button"
                >
                  Facing
                  <svg
                    class="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                <div
                  id="dropdownFacing"
                  class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                >
                  <ul
                    class="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownFacingButton"
                  >
                    <li>
                      <a
                        href="#"
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Earnings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="me-2 mt-3">
                <button
                  id="dropdownAreTypeButton"
                  data-dropdown-toggle="dropdownAreType"
                  data-dropdown-delay="500"
                  data-dropdown-trigger="hover"
                  class="text-black bg-white border border-black hover:bg-white-800 focus:ring-4 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-white-600 dark:hover:bg-white-700 dark:focus:ring-white-800"
                  type="button"
                >
                  Area Type
                  <svg
                    class="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                <div
                  id="dropdownAreType"
                  class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                >
                  <ul
                    class="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownAreTypeButton"
                  >
                    <li>
                      <a
                        href="#"
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Earnings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Sign out
                      </a>
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
            <div className="GeneralDetailsMain">
              <h2 className={`${styles.GeneralDetailsMainHead}`}>
                Showing 1 - 30 of 111
              </h2>
              <div
                className={` flex justify-between  ${styles.GeneralDetailsSecondSection}`}
              >
                <h1
                  className={` flex-grow  ${styles.GeneralDetailsSecondHead}`}
                >
                  Ready to Move-In Projects in Dehradun
                </h1>
                <div className="flex">
                  <h2 className={`flex-grow ${styles.GeneralDetailsMainHead}`}>
                    Sort by:
                  </h2>
                  <div>
                    <li className="me-2 mt-2">
                      <button
                        id="dropdownSortByButton"
                        data-dropdown-toggle="dropdownSortBy"
                        data-dropdown-delay="500"
                        data-dropdown-trigger="hover"
                        className={`text-black bg-lightgrey border border-black hover:bg-lightgrey-800 focus:ring-4 focus:outline-none focus:ring-lightgrey-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-lightgrey-600 dark:hover:bg-lightgrey-700 dark:focus:ring-lightgrey-800 ${styles.GeneralDetailsSortDropdown}`}
                        type="button"
                      >
                        Area Type
                        <svg
                          class="w-2.5 h-2.5 ms-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 10 6"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m1 1 4 4 4-4"
                          />
                        </svg>
                      </button>

                      <div
                        id="dropdownSortBy"
                        class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                      >
                        <ul
                          class="py-2 text-sm text-gray-700 dark:text-gray-200"
                          aria-labelledby="dropdownSortByButton"
                        >
                          <li>
                            <a
                              href="#"
                              class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Dashboard
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Settings
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Earnings
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Sign out
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </div>
                </div>
              </div>

              <div className={`${styles.GeneralDetailsBox}`}>
                <div class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                  <div class="flex-shrink-0 h-full">
                    <img
                      class="object-cover w-full rounded-t-lg h-full h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                      src="/img/black-wallpaper-1.jpg"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col justify-between leading-normal ml-3 w-full mr-3 mt-3 mb-3">
                    <div className="flex justify-between ">
                      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {/* <span class="px-2">₹</span> */}₹ 1 Cr - 1.08 Cr
                      </h5>
                      <div className="flex ">
                        <div
                          className={` mr-3 ${styles.GeneralDetailsBoxIcon}`}
                        >
                          {" "}
                          <i class="bi bi-share"></i>
                        </div>
                        <div className={`ml-3 ${styles.GeneralDetailsBoxIcon}`}>
                          {" "}
                          <i class="bi bi-heart"></i>
                        </div>
                      </div>
                    </div>

                    <div class="flex flex-row justify-around leading-normal ">
                      <p class="mb-3 font-bold text-black-700 dark:text-black-800 ">
                        Kwality Joy Homes
                      </p>
                      <button
                        type="button"
                        className={`text-white-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-2 ml-2 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 ${styles.cardStarBtn}`}
                      >
                        <span>4</span>{" "}
                        <span>
                          <i class="bi bi-star-fill"></i>
                        </span>
                      </button>

                      <button
                        type="button"
                        className={`text-gray-900  from-teal-200 to-lime-200 hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none px-3 focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm  text-center me-2 mb-2 ${styles.cardSecondbtn}`}
                      >
                        RERA
                      </button>
                    </div>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      Marketed by TCH
                    </p>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      <span class="mb-3 font-bold text-gray-700 dark:text-gray-400">
                        3Bhk Flat
                      </span>{" "}
                      for sale in Chukkuwala,Dehradun
                    </p>
                    <div className={`${styles.heroSectionBottomBox}`}>
                      <div className="">
                        <h6 className={`${styles.heroSectionBottomBoxHead}`}>
                          Jaipur Apartment
                        </h6>
                        <p className={`${styles.heroSectionBottomBoxText}`}>
                          {" "}
                          <i className="bi bi-geo-alt-fill"></i>Ajmer Road, Nh-8
                          , Jaipur
                        </p>
                      </div>
                      <div className={`${styles.heroSectionVL}`}></div>
                      <div>
                        <h2 className={`${styles.heroSectionBottomBoxHead}`}>
                          Price
                        </h2>
                        <p className={`${styles.heroSectionBottomBoxText}`}>
                          {" "}
                          22.9 L - 28.9 L
                        </p>
                      </div>
                      <div className={`${styles.heroSectionVL}`}></div>
                      <div>
                        <h2 className={`${styles.heroSectionBottomBoxHead}`}>
                          Area Range
                        </h2>
                        <p className={`${styles.heroSectionBottomBoxText}`}>
                          {" "}
                          200 sq-yrd
                        </p>
                      </div>
                      <div className={`${styles.heroSectionVL}`}></div>
                      <div>
                        <h2 className={`${styles.heroSectionBottomBoxHead}`}>
                          Project Type
                        </h2>
                        <p className={`${styles.heroSectionBottomBoxText}`}>
                          {" "}
                          Plot
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row justify-between leading-normal mt-3">
                      <div className="flex">
                        <div>
                          <img
                            className={`${styles.cardImage}`}
                            src="/img/demo_building_logo.png"
                            alt=""
                          />
                        </div>
                        <div className="flex flex-col ml-2">
                          <h3 className="font-bold">Demo Pvt.Ltd</h3>
                          <p className="text-gray-900">Seller</p>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <button
                          type="button"
                          className={`text-white-600 hover:bg-gray-200 hover:border-green-600 border-2 border-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${styles.cardLastBtn}`}
                        >
                          <span className="mr-2">
                            <i class="bi bi-download"></i>
                          </span>{" "}
                          Brochure
                        </button>

                        <button
                          type="button"
                          className={`text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${styles.cardLastBtn}`}
                        >
                          <span className="mr-1">
                            <i class="bi bi-telephone"></i>
                          </span>
                          Contact Sellers
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col items-center bg-white border border-gray-200 mt-3 rounded-lg shadow md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                  <div class="flex-shrink-0 h-full">
                    <img
                      class="object-cover w-full rounded-t-lg h-full h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                      src="/img/black-wallpaper-1.jpg"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col justify-between leading-normal ml-3 w-full mr-3 mt-3 mb-3">
                    <div className="flex justify-between ">
                      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {/* <span class="px-2">₹</span> */}₹ 1 Cr - 1.08 Cr
                      </h5>
                      <div className="flex ">
                        <div
                          className={` mr-3 ${styles.GeneralDetailsBoxIcon}`}
                        >
                          {" "}
                          <i class="bi bi-share"></i>
                        </div>
                        <div className={`ml-3 ${styles.GeneralDetailsBoxIcon}`}>
                          {" "}
                          <i class="bi bi-heart"></i>
                        </div>
                      </div>
                    </div>

                    <div class="flex flex-row justify-around leading-normal ">
                      <p class="mb-3 font-bold text-black-700 dark:text-black-800 ">
                        Kwality Joy Homes
                      </p>
                      <button
                        type="button"
                        className={`text-white-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-2 ml-2 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 ${styles.cardStarBtn}`}
                      >
                        <span>4</span>{" "}
                        <span>
                          <i class="bi bi-star-fill"></i>
                        </span>
                      </button>

                      <button
                        type="button"
                        className={`text-gray-900  from-teal-200 to-lime-200 hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none px-3 focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm  text-center me-2 mb-2 ${styles.cardSecondbtn}`}
                      >
                        RERA
                      </button>
                    </div>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      Marketed by TCH
                    </p>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      <span class="mb-3 font-bold text-gray-700 dark:text-gray-400">
                        3Bhk Flat
                      </span>{" "}
                      for sale in Chukkuwala,Dehradun
                    </p>
                    <div className={`${styles.heroSectionBottomBox}`}>
                      <div className="">
                        <h6 className={`${styles.heroSectionBottomBoxHead}`}>
                          Jaipur Apartment
                        </h6>
                        <p className={`${styles.heroSectionBottomBoxText}`}>
                          {" "}
                          <i className="bi bi-geo-alt-fill"></i>Ajmer Road, Nh-8
                          , Jaipur
                        </p>
                      </div>
                      <div className={`${styles.heroSectionVL}`}></div>
                      <div>
                        <h2 className={`${styles.heroSectionBottomBoxHead}`}>
                          Price
                        </h2>
                        <p className={`${styles.heroSectionBottomBoxText}`}>
                          {" "}
                          22.9 L - 28.9 L
                        </p>
                      </div>
                      <div className={`${styles.heroSectionVL}`}></div>
                      <div>
                        <h2 className={`${styles.heroSectionBottomBoxHead}`}>
                          Area Range
                        </h2>
                        <p className={`${styles.heroSectionBottomBoxText}`}>
                          {" "}
                          200 sq-yrd
                        </p>
                      </div>
                      <div className={`${styles.heroSectionVL}`}></div>
                      <div>
                        <h2 className={`${styles.heroSectionBottomBoxHead}`}>
                          Project Type
                        </h2>
                        <p className={`${styles.heroSectionBottomBoxText}`}>
                          {" "}
                          Plot
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row justify-between leading-normal mt-3">
                      <div className="flex">
                        <div>
                          <img
                            className={`${styles.cardImage}`}
                            src="/img/demo_building_logo.png"
                            alt=""
                          />
                        </div>
                        <div className="flex flex-col ml-2">
                          <h3 className="font-bold">Demo Pvt.Ltd</h3>
                          <p className="text-gray-900">Seller</p>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <button
                          type="button"
                          className={`text-white-600 hover:bg-gray-200 hover:border-green-600 border-2 border-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${styles.cardLastBtn}`}
                        >
                          <span className="mr-2">
                            <i class="bi bi-download"></i>
                          </span>{" "}
                          Brochure
                        </button>

                        <button
                          type="button"
                          className={`text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${styles.cardLastBtn}`}
                        >
                          <span className="mr-1">
                            <i class="bi bi-telephone"></i>
                          </span>
                          Contact Sellers
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="flex flex-col items-center mt-3 bg-white border border-gray-200 rounded-lg shadow md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                  <div class="flex-shrink-0 h-full">
                    <img
                      class="object-cover w-full rounded-t-lg h-full h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                      src="/img/black-wallpaper-1.jpg"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col justify-between leading-normal ml-3 w-full mr-3 mt-3 mb-3">
                    <div className="flex justify-between ">
                      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {/* <span class="px-2">₹</span> */}₹ 1 Cr - 1.08 Cr
                      </h5>
                      <div className="flex ">
                        <div
                          className={` mr-3 ${styles.GeneralDetailsBoxIcon}`}
                        >
                          {" "}
                          <i class="bi bi-share"></i>
                        </div>
                        <div className={`ml-3 ${styles.GeneralDetailsBoxIcon}`}>
                          {" "}
                          <i class="bi bi-heart"></i>
                        </div>
                      </div>
                    </div>

                    <div class="flex flex-row justify-around leading-normal ">
                      <p class="mb-3 font-bold text-black-700 dark:text-black-800 ">
                        Kwality Joy Homes
                      </p>
                      <button
                        type="button"
                        className={`text-white-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-2 ml-2 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 ${styles.cardStarBtn}`}
                      >
                        <span>4</span>{" "}
                        <span>
                          <i class="bi bi-star-fill"></i>
                        </span>
                      </button>

                      <button
                        type="button"
                        className={`text-gray-900  from-teal-200 to-lime-200 hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none px-3 focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm  text-center me-2 mb-2 ${styles.cardSecondbtn}`}
                      >
                        RERA
                      </button>
                    </div>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      Marketed by TCH
                    </p>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      <span class="mb-3 font-bold text-gray-700 dark:text-gray-400">
                        3Bhk Flat
                      </span>{" "}
                      for sale in Chukkuwala,Dehradun
                    </p>
                    <div className={`${styles.heroSectionBottomBox}`}>
                      <div className="">
                        <h6 className={`${styles.heroSectionBottomBoxHead}`}>
                          Jaipur Apartment
                        </h6>
                        <p className={`${styles.heroSectionBottomBoxText}`}>
                          {" "}
                          <i className="bi bi-geo-alt-fill"></i>Ajmer Road, Nh-8
                          , Jaipur
                        </p>
                      </div>
                      <div className={`${styles.heroSectionVL}`}></div>
                      <div>
                        <h2 className={`${styles.heroSectionBottomBoxHead}`}>
                          Price
                        </h2>
                        <p className={`${styles.heroSectionBottomBoxText}`}>
                          {" "}
                          22.9 L - 28.9 L
                        </p>
                      </div>
                      <div className={`${styles.heroSectionVL}`}></div>
                      <div>
                        <h2 className={`${styles.heroSectionBottomBoxHead}`}>
                          Area Range
                        </h2>
                        <p className={`${styles.heroSectionBottomBoxText}`}>
                          {" "}
                          200 sq-yrd
                        </p>
                      </div>
                      <div className={`${styles.heroSectionVL}`}></div>
                      <div>
                        <h2 className={`${styles.heroSectionBottomBoxHead}`}>
                          Project Type
                        </h2>
                        <p className={`${styles.heroSectionBottomBoxText}`}>
                          {" "}
                          Plot
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row justify-between leading-normal mt-3">
                      <div className="flex">
                        <div>
                          <img
                            className={`${styles.cardImage}`}
                            src="/img/demo_building_logo.png"
                            alt=""
                          />
                        </div>
                        <div className="flex flex-col ml-2">
                          <h3 className="font-bold">Demo Pvt.Ltd</h3>
                          <p className="text-gray-900">Seller</p>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <button
                          type="button"
                          className={`text-white-600 hover:bg-gray-200 hover:border-green-600 border-2 border-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${styles.cardLastBtn}`}
                        >
                          <span className="mr-2">
                            <i class="bi bi-download"></i>
                          </span>{" "}
                          Brochure
                        </button>

                        <button
                          type="button"
                          className={`text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${styles.cardLastBtn}`}
                        >
                          <span className="mr-1">
                            <i class="bi bi-telephone"></i>
                          </span>
                          Contact Sellers
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              
              </div>
            </div>
          </div>
        </div>
        <div className={` ${styles.divideDetailPageRight}`}></div>
      </div>

      {/* <div className={`${styles.detailSectionBar} detailSectionBar `}>
        <div className="text-sm font-medium text-center text-black-500  border-black-900 dark:text-gray-400 dark:border-gray-700">
          <div class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img
              class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
              src="/img/black-wallpaper-1.jpg"
              alt=""
            />
            <div class="flex flex-col justify-between p-4 leading-normal">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Noteworthy technology acquisitions 2021
              </h5>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order.
              </p>
            </div>
          </div>
        </div>
        <div className="text-sm font-medium text-center text-black-500  border-black-900 dark:text-gray-400 dark:border-gray-700">
          <div>
            <a
              href="#"
              class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <img
                class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                src="/img/black-wallpaper-1.jpg"
                alt=""
              />
              <div class="flex flex-col justify-between p-4 leading-normal">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Noteworthy technology acquisitions 2021
                </h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Here are the biggest enterprise technology acquisitions of
                  2021 so far, in reverse chronological order.
                </p>
              </div>
            </a>
          </div>
        </div>
      </div> */}

      <Footer />
    </>
  );
};

export default PropertyListPage;

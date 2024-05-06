"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";
import { useEffect, useRef, useState } from "react";
// import Home from "./(user)/home/page";
import { initFlowbite } from "flowbite";
import React from "react";
import Slider from "react-slick";
// import { Accordion } from "flowbite-react";
//import { CustomFlowbiteTheme } from "flowbite-react";
import { Accordion } from "flowbite-react";
import { Card } from "flowbite-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useFetch from "@/customHooks/useFetch";
import { API_BASE_URL } from "@/utils/constants";
import { addEnquiry } from "@/api-functions/enquiry/addEnquiry";
import { toast } from "react-toastify";
import MultipleItems from "@/components/common/ImageSlider";
import Link from "next/link";
import MultiCarousel from "@/components/common/carousel";

export default function Home() {
 
  
   
 
  const slider = useRef(null);
  const sliderTestimonial = useRef(null);
  const populerPropertiesslider = useRef(null);
  const [Name, setName] = useState("");
  const [Dob, setDob] = useState("");
  const [Email, setEmail] = useState("");
  const [Message, setMessage] = useState("");
  const [MolileNumber, setPhone] = useState("");
  const [EnquiryData, setEnquiryData] = useState("");
  const [EnquiryType, setEnquiryType] = useState("");

  const {
    data: propertyByAreaData,
    loading,
    error,
  } = useFetch(`${API_BASE_URL}/properties/propertyByArea`);
  console.log("propertyByAreaData", propertyByAreaData);
  const {
    data: propertyByapartmentType,
    loading: apartmentTypeLoading,
    error: apartmentTypeError,
  } = useFetch(`${API_BASE_URL}/properties/propertyByType`);
  const {
    data: propertyByPopularProperty,
    loading: popularPropertiesLoading,
    error: popularPropertiesError,
  } = useFetch(`${API_BASE_URL}/properties/popularProperty`);
  console.log("propertyByAreaData",propertyByPopularProperty)
  const {
    data: testimonialData,
    loading: testimonialDataLoading,
    error: testimonialDataError,
  } = useFetch(`${API_BASE_URL}/testimonial/allTestimonial?page=1&pageSize=5`);
  const {
    data: faqData,
    loading: faqLoading,
    error: faqError,
  } = useFetch(`${API_BASE_URL}/faq/allFAQ?page=1&pageSize=5`);
  console.log("faqData",faqData)
  const {
    data: blogData,
    loading:blogDataLoading,
    error:blogDataError,
  } = useFetch(`${API_BASE_URL}/blog/allblog?page=1&pageSize=5`);
  
  console.log("blogData",blogData);
  const ShowPopularProperties = () => {
     
    return propertyByPopularProperty?.data?.map((item,index) => (
            
      <div key={index} className="mr-3"  >
        <Card
    className="max-w-sm"
    imgAlt="Meaningful alt text for an image that is not purely decorative"
    imgSrc={item.Images[0].URL}
  >
     <Link href={`/propertyDetail/${item._id}`}>
        
        <div className="p-4">
          <div className={` ${styles.populerPropertiesLocationMain} flex`}>
            <i className="bi bi-geo-alt-fill"></i>
            <p className={`text-gray-700`}>{item.Address}</p>
          </div>
          <h2 className={` ${styles.populerPropertiesBoxHead}`}>
            {item.Titile}
          </h2>
          <div className={` ${styles.populerPropertiesBoxDetail} flex`}>
            <div className="flex">
            <i className="fa fa-bed"></i>
              <p className={` ${styles.populerPropertiesBoxText}`}>
              {item.Bedrooms} Bed Room
              </p>
            </div>
            <div className="flex">
              <i className="fa fa-bath"></i>
              <p className={` ${styles.populerPropertiesBoxText}`}>
              {item.Bathrooms} Baths
              </p>
            </div>
            <div className="flex">
              <i className="fa fa-area-chart"></i>

              <p className={` ${styles.populerPropertiesBoxText}`}>
                {item.LandArea} Land Area
              </p>
            </div>
          </div>
          <div className={`${styles.populerPropertiesBoxPriceMain}`}>
            <p className={`${styles.populerPropertiesBoxPrice}`}>
            {item.TotalPrice} L
            </p>
            <Link href={`/propertyDetail/${item._id}`} >
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
                
              >
                More Details
              </button>
            </Link>
          </div>
        </div>
        </Link>
  </Card>
        
      </div>
      ))
    
  }
  const addEnquiryData = async () => {
    if (Name === "") {
      toast.error("Name  is required");
      return false;
    }
    if (Email === "") {
      toast.error("Email is required");
      return false;
    }
    if (Message === "") {
      toast.error("Message is required");
      return false;
    }
    if (EnquiryData === ""){
      toast.error("Date is required");
      return false;
    }
    if (EnquiryType === ""){
      toast.error("Type is required");
      return false;
    }
    if (MolileNumber === ""){
      toast.error("Number is required");
      return false;
    }
    let payload = { Name, Email, Message, MolileNumber, EnquiryData, EnquiryType };
    let res = await addEnquiry(payload)
    console.log('payload',res)
     if(res?.resData?.success == true){
       toast.success(res?.resData?.message);
       setName("");
       setPhone("");
       setMessage("");
       setEnquiryData("");
       setEnquiryType("");
       setEmail("");
      }else{
        toast.error(res.errMessage);
        return false;
      }
    console.log(payload);
  }
  const toggleExpansion = () => {
    setExpanded(!expanded);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };
  const handleEnquiryType = (e) => {
    setEnquiryType(e.target.value);
  };
  const handleEnquiryData = (e) => {
    setEnquiryData(e.target.value);
  };
  const handleDob = (value) => {
    setDob(() => value.target.value);
  };
  var totalSlides = propertyByapartmentType?.data?.length;
  var slidesToShow = totalSlides < 5 ? totalSlides : 5;
  

  var settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: slidesToShow >= 3 ? 3 : slidesToShow,
          slidesToScroll: slidesToShow >= 3 ? 3 : 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: slidesToShow >= 2 ? 2 : slidesToShow,
          slidesToScroll: slidesToShow >= 2 ? 2 : 1,
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
  console.log(settings);
  var settingsTestimonials = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  useEffect(() => {
    initFlowbite(); // Call initCarousels() when component mounts
  }, []);

  return (
    <main className={styles.main}>
      
      <Navbar />
      <div
        id="controls-carousel"
        className={`${styles.banner} relative w-full`}
        data-carousel="static"
      >
        <div className="relative h-full overflow-hidden rounded-lg">
          <div
            className="crousalItem hidden duration-700 ease-in-out"
            data-carousel-item="active"
          >
            <div className={`${styles.crousalItemContentMain}`}>
              <div className={`${styles.crousalItemLeftMain}`}>
                <div className={`${styles.crousalItemLeftContent}`}>
                  <h2 className={`${styles.crousalItemLeftMainHeading}`}>
                    Looking for a home is always easier
                  </h2>
                  <p className={`${styles.crousalItemLeftMainPara}`}>
                  Welcome to REC.com, your trusted partner in the journey of 
                  finding the perfect home. At REC.com, 
                  we understand that finding the right home is more than just a 
                  transaction - it's about finding a place where memories are made, 
                  dreams are realized, and futures are built.
                  </p>
                  <div className={`${styles.crousalItemAdvMain} flex`}>
                    <div className={`${styles.crousalItemAdvContent}`}>
                      <h2 className={`${styles.crousalItemAdvNumber}`}>
                        1500+
                      </h2>
                      <p className={`${styles.crousalItemAdvText}`}>
                        Premium Product
                      </p>
                    </div>
                    <div className={`${styles.crousalItemAdvContent}`}>
                      <h2 className={`${styles.crousalItemAdvNumber}`}>
                        5500+
                      </h2>
                      <p className={`${styles.crousalItemAdvText}`}>
                        Happy Customer
                      </p>
                    </div>
                  </div>
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
                </div>
              </div>
              <div className={`${styles.crousalItemRightMain}`}>
                <img
                  src="/img/Hero.jpeg"
                  className={`${styles.crousalItemLeftImage} block`}
                  alt="...a"
                />
              </div>
            </div>
          </div>
          <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <img
              src="/img/Hero.jpeg"
              className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt="...a"
            />
          </div>
          <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <img
              src="/img/Hero.jpeg"
              className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt="...a"
            />
          </div>
          <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <img
              src="/img/Hero.jpeg"
              className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt="...a"
            />
          </div>
        </div>
        <button
          type="button"
          className={` ${styles.crousalItemLeftArrowBtn} absolute bottom-0 h-16 z-30 flex items-end justify-center px-4 cursor-pointer group focus:outline-none`}
          data-carousel-prev
        >
          <span
            className={` ${styles.crousalItemLeftArrowSpan} inline-flex items-end justify-center dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none `}
          >
            <i
              className={` ${styles.crousalItemArrowIcon} bi bi-arrow-left `}
            ></i>
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button
          type="button"
          className={`  absolute bottom-0 end-0 z-30 flex items-end justify-center h-16 px-4 cursor-pointer group focus:outline-none`}
          data-carousel-next
        >
          <span
            className={` ${styles.crousalItemRightArrowSpan} inline-flex items-end justify-center dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none `}
          >
            <i
              className={` ${styles.crousalItemArrowIconRight} bi bi-arrow-right `}
            ></i>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>
      
      <div className="campassDirection flex flex-wrap">
        <div className={styles.campassMain}>
          <img
            src="/img/campassOutline.png"
            className={` ${styles.outerCampass} block`}
            alt="..."
          />
          <img
            src="/img/2807736_18111-removebg-preview-removebg-preview.png"
            className={` ${styles.innerCampass} block`}
            alt="..."
          />
        </div>
        <div className={`${styles.campassMainRight}`}>
          <div>
            <h2 className={`${styles.campassMainRightHead}`}>
              Properties by <span className="blueText">दिशा</span>
            </h2>
            <p className={`${styles.campassMainRightText}`}>
              Navigate Your Search: Properties by Direction
            </p>
          </div>
          <div className={`${styles.campassRightBoxMain} flex flex-wrap`}>
            <div
              className={` ${styles.campassRightBox} border-gray-300 rounded-md`}
            >
                <Link href="/propertyList">
                <div>
                  <div>
                    <img
                      className={` ${styles.campassRightBoxImg}`}
                      src="/img/EastImage.jpeg"
                      alt=""
                    />
                  </div>
                </div>
                <div>
                  <h2 className={` ${styles.campassRightBoxHead}`}>EAST</h2>
                  <p className={` ${styles.campassRightBoxText}`}>
                    Lorem ipsum dolor, sit amet consectetur
                  </p>
                </div>
                </Link>
            </div>
            <div
              className={` ${styles.campassRightBox} border-gray-300 rounded-md`}
            >
              <Link href="/propertyList">
                <div >
                  <div>
                    <img
                      className={` ${styles.campassRightBoxImg}`}
                      src="/img/WestImage.jpeg"
                      alt=""
                    />
                  </div>
                </div>
                <div>
                  <h2 className={` ${styles.campassRightBoxHead}`}>West</h2>
                  <p className={` ${styles.campassRightBoxText}`}>
                    Lorem ipsum dolor, sit amet consectetur
                  </p>
                </div>
              </Link>
            </div>
            <div
              className={` ${styles.campassRightBox} border-gray-300 rounded-md`}
            >
              <Link href="/propertyList">
              <div>
                <div>
                  <img
                    className={` ${styles.campassRightBoxImg}`}
                    src="/img/NorthImage.jpeg"
                    alt=""
                  />
                </div>
              </div>
              <div>
                <h2 className={` ${styles.campassRightBoxHead}`}>NORTH</h2>
                <p className={` ${styles.campassRightBoxText}`}>
                  Lorem ipsum dolor, sit amet consectetur
                </p>
              </div>
              </Link>
            </div>
            <div
              className={` ${styles.campassRightBox} border-gray-300 rounded-md`}
            >
              <Link href="/propertyList">
              <div>
                <div>
                  <img
                    className={` ${styles.campassRightBoxImg}`}
                    src="/img/SouthImage.jpeg"
                    alt=""
                  />
                </div>
              </div>
              <div>
                <h2 className={` ${styles.campassRightBoxHead}`}>SOUTH</h2>
                <p className={` ${styles.campassRightBoxText}`}>
                  Lorem ipsum dolor, sit amet consectetur
                </p>
              </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.propertiesByAreaMain} propertiesByArea`}>
        <div>
          <h2 className={`${styles.propertiesByAreaMainHead}`}>
            Properties by <span className="blueText">Area</span>
          </h2>
          <div className={`${styles.propertiesByAreaMainTextMain}`}>
            <p className={`${styles.propertiesByAreaMainText}`}>
              Find Your Perfect Property by Area
            </p>
            <a
              href="#"
              className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              View More
              <svg
                className="w-4 h-4 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18 14v4.833A1.166 1.166 0 0 1 16.833 20H5.167A1.167 1.167 0 0 1 4 18.833V7.167A1.166 1.166 0 0 1 5.167 6h4.618m4.447-2H20v5.768m-7.889 2.121 7.778-7.778"
                />
              </svg>
            </a>
          </div>
        </div>
        {propertyByAreaData ? (
        <div className={` ${styles.propertiesByAreaBoxMain} flex flex-wrap `}>
          {propertyByAreaData?.data?.map((item,index) => (
            
          <div key={index}
            className={` ${styles.propertiesByAreaBox} border border-gray-300 rounded-md`}
          >
            <Link href={`/propertyDetail`}>
            <div>
              <div>
                <img
                  className={` ${styles.propertiesByAreaBoxImg} rounded-md`}
                  src={item?.areaInfo?.AreaImage}
                  alt=""
                />
              </div>
            </div>
            <div className="p-0">
              <div className={` ${styles.populerPropertiesLocationMain} flex`}>
                <h1 className={` ${styles.propertiesByAreaBoxHead}`}>{item?.areaInfo?.Area}</h1>
              </div>
              <p className={`${styles.smallText}text-gray-900`} href="/">{item?.propertiesCount} properties</p>
            </div>
            </Link>
          </div>
          ))}
          </div>
        ) : null}
      </div>

      <div className={`${styles.apartmentTypeMain} apartmentType`}>
        <div>
          <h2 className={`${styles.apartmentTypeMainHead}`}>
            Explore <span className="blueText">Apartment Type</span>
          </h2>
          <div className={`${styles.apartmentTypeMainTextMain}`}>
            <p className={`${styles.apartmentTypeMainText}`}>
              Discover Your Ideal Apartment Style
            </p>
            <div className="flex flex-wrap">
              <button
                type="button"
                onClick={() => slider?.current?.slickPrev()}
                className={` ${styles.apartmentTypeLeftArrowBtn}  z-30 flex justify-center px-4 cursor-pointer group focus:outline-none`}
              >
                <span
                  className={` ${styles.apartmentTypeLeftArrowSpan} inline-flex justify-center dark:bg-gray-800/30  dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none `}
                >
                  <i
                    className={` ${styles.apartmentTypeArrowIcon} bi bi-arrow-left `}
                  ></i>
                  <span className="sr-only">Previous</span>
                </span>
              </button>
              <button
                type="button"
                onClick={() => slider?.current?.slickNext()}
                className={`z-30 flex justify-center cursor-pointer group focus:outline-none`}
                data-carousel-next
              >
                <span
                  className={` ${styles.apartmentTypeRightArrowSpan} inline-flex justify-center dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none `}
                >
                  <i
                    className={` ${styles.apartmentTypeArrowIconRight} bi bi-arrow-right `}
                  ></i>
                  <span className="sr-only">Next</span>
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className={`flex`} >
        { propertyByapartmentType?.data?.map((item,index) => (
          <Link href="/" >
            <div 
              className="p-1"
            >
              <div key={index} className={` ${styles.apartmentTypeBox} border-gray-300 rounded-md`}>
              <div>
                <div>
                  <img
                    className={` ${styles.apartmentTypeBoxImg}`}
                    src={item?.areaInfo?.PropImage}
                    alt=""
                  />
                </div>
              </div>
              <div>
                <h2 className={` ${styles.apartmentTypeBoxHead}`}>{item?.areaInfo?.Type}</h2>
                <p className={` ${styles.apartmentTypeBoxText}`}>
                  {item?.propertiesCount} Properties
                </p>
              </div>
              </div>
            </div>
            </Link> 
          ))}
        </div>
      </div>

        

      <div className={`${styles.buyingOptionWithZodic}`}>
        <div className={`${styles.buyingWithZodicMain}`}>
          <div className={`${styles.buyingZodicLeft}`}>
            <div>
              <h2 className={`${styles.buyingZodicHead}`}>
                Let's Find The Right Buying Option With{" "}
                <span className="blueText">Zodic</span>
              </h2>
              <p className={`${styles.buyingZodicText}`}>
              Unlock the door to your dream home with Zodic.
              Let's embark on this journey together and discover your perfect home. 
              Welcome to Zodic, where dreams come true.
              </p>
            </div>
            <div className={`${styles.buyingZodicInputMain}`}>
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    // value={Name}
                    // onChange={handleName}
                    id="first_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="John"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="last_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Dob
                  </label>
                  <input
                    type="date"
                    value={Dob}
                    onChange={handleDob}
                    id="last_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Dob"
                    required
                  />
                </div>
              </div>
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
              >
                Get Start
              </button>
            </div>
          </div>
          <div className={`${styles.buyingZodicRight}`}>
            <img src="/img/bestBuyImg.png" alt="" />
          </div>
        </div>
      </div>

      <div className={`${styles.populerPropertiesMain} populerProperties`}>
        <div>
          <h2 className={`${styles.propertiesByAreaMainHead}`}>
            Discover Populer Properties <span className="blueText"></span>
          </h2>
          <div className={`${styles.propertiesByAreaMainTextMain}`}>
            <p className={`${styles.propertiesByAreaMainText}`}>
              Exclusive showcase of top projects
            </p>
            <a
              href="#"
              className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              See all properties
              <svg
                className="w-4 h-4 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18 14v4.833A1.166 1.166 0 0 1 16.833 20H5.167A1.167 1.167 0 0 1 4 18.833V7.167A1.166 1.166 0 0 1 5.167 6h4.618m4.447-2H20v5.768m-7.889 2.121 7.778-7.778"
                />
              </svg>
            </a>
          </div>
        </div>
        <div className={` ${styles.populerPropertiesBoxMain} flex flex-wrap `}>
          {propertyByPopularProperty?.data?.map((item,index) => (
            
          <div key={index}
            className={` ${styles.populerPropertiesBox} border border-gray-300 rounded-md`}
          >
            <Link href={`/propertyDetail/${item._id}`}>
             <div>
               <div>
                 <img
                   className={` ${styles.populerPropertiesBoxImg} rounded-md`}
                   src={item.Images[0].URL}
                  alt=""
                />
              </div>
            </div>
            <div className="p-4">
              <div className={` ${styles.populerPropertiesLocationMain} flex`}>
                <i className="bi bi-geo-alt-fill"></i>
                <p className={`text-gray-700`}>{item.Address}</p>
              </div>
              <h2 className={` ${styles.populerPropertiesBoxHead}`}>
                {item.Titile}
              </h2>
              <div className={` ${styles.populerPropertiesBoxDetail} flex`}>
                <div className="flex">
                <i className="fa fa-bed"></i>
                  <p className={` ${styles.populerPropertiesBoxText} ml-4`}>
                  {item.Bedrooms} Bed Room
                  </p>
                </div>
                <div className="flex">
                  <i className="fa fa-bath"></i>
                  <p className={` ${styles.populerPropertiesBoxText}`}>
                  {item.Bathrooms} Baths
                  </p>
                </div>
                <div className="flex">
                  <i className="fa fa-area-chart"></i>

                  <p className={` ${styles.populerPropertiesBoxText}`}>
                    {item.LandArea} Land Area
                  </p>
                </div>
              </div>
              <div className={`${styles.populerPropertiesBoxPriceMain}`}>
                <p className={`${styles.populerPropertiesBoxPrice}`}>
                {item.TotalPrice} 
                </p>
                <Link href={`/propertyDetail/${item._id}`} >
                  <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                    
                  >
                    More Details
                  </button>
                </Link>
              </div>
            </div>
            </Link>
          </div>
          ))}
     
        {/* {
           propertyByPopularProperty?.data?.length>0 &&  <MultiCarousel UI={ShowPopularProperties} />
        } */}
        </div>
      </div>

      <div className={` ${styles.agentMain} agent`}>
        <div className={` ${styles.agentLeftMain}`}>
          <img
            className={` ${styles.agentImage}`}
            src="/img/sadhguru.jpg"
            alt=""
          />
        </div>
        <div className={`${styles.agentRightMain}`}>
          <div>
            <h2 className={`${styles.agentRightMainHead}`}>
              Trusted By Best Exclusive <span className="blueText">Astrologer</span>
            </h2>
            <p className={`${styles.agentRightMainText}`}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio ad
              in eius debitis tenetur!
            </p>
          </div>
          <div className={`${styles.agentRightMainContentMain}`}>
            <div className="flex">
              <i className="bi bi-geo-alt-fill"></i>
              <div className={`${styles.agentRightMainContent}`}>
                <h2 className={`${styles.agentRightMainContentHead}`}>
                  John Doe
                </h2>
                <p className={`${styles.agentRightMainContentText}`}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit
                  magnam nihil explicabo harum iure? Incidunt!
                </p>
              </div>
            </div>
            <div className="flex mt-4">
              <i className="bi bi-geo-alt-fill"></i>
              <div className={`${styles.agentRightMainContent}`}>
                <h2 className={`${styles.agentRightMainContentHead}`}>
                  John Doe
                </h2>
                <p className={`${styles.agentRightMainContentText}`}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit
                  magnam nihil explicabo harum iure? Incidunt!
                </p>
              </div>
            </div>
            <div className="flex mt-4">
              <i className="bi bi-geo-alt-fill"></i>
              <div className={`${styles.agentRightMainContent}`}>
                <h2 className={`${styles.agentRightMainContentHead}`}>
                  John Doe
                </h2>
                <p className={`${styles.agentRightMainContentText}`}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit
                  magnam nihil explicabo harum iure? Incidunt!
                </p>
              </div>
            </div>
          </div>
          <button
            className={` ${styles.agentRightMainContenBtn} text-white bg-blue-700 h-12 w-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
            type="button"
          >
            See more
            <svg
              className="w-4 h-4 ms-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18 14v4.833A1.166 1.166 0 0 1 16.833 20H5.167A1.167 1.167 0 0 1 4 18.833V7.167A1.166 1.166 0 0 1 5.167 6h4.618m4.447-2H20v5.768m-7.889 2.121 7.778-7.778"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className={` ${styles.faq} faq`}>
        <div className={` ${styles.faqMain}`}>
          <h2 className={` ${styles.faqHead}`}>Frequently Asked Question</h2>
          <p className={` ${styles.testimoniaText}`}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis,
            iusto!
          </p>
        </div>
        <div className={`${styles.faqLeftRightMain}`}>
          <div className={` ${styles.faqLeft}`}>
            <Accordion collapseAll className="border-none">
              {faqData?.data?.map((item, index) => (
                <Accordion.Panel key={index}>
                  <Accordion.Title
                    className={` ${styles.faqItemMain} rounded-t-md text-white bg-blue-700 hover:bg-blue-700
                      focus:border-none focus:ring-grey-0 focus:ring-0`}
                  >
                    {item?.Subject}
                  </Accordion.Title>
                  <Accordion.Content className="bg-blue-700 text-white">
                    <p className=" mb-2 text-white dark:text-white-400">
                      {item?.Answer}
                    </p>
                  </Accordion.Content>
                </Accordion.Panel>
              ))}
            </Accordion>
          </div>
          <div className={` ${styles.faqRight}`}>
            <div>
              <h2 className={`${styles.faqRightHead}`}>
                Ask a different question
              </h2>
              <div>
              <div className="mb-6">
                    <input
                      type="text"
                      value={Name}
                      onChange={handleNameChange}
                      id="Name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Name"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <input
                      type="email"
                      value={Email}
                      onChange={handleEmailChange}
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <input
                      type="text"
                      value={MolileNumber}
                      onChange={handlePhoneChange}
                      id="Phone"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Phone"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <textarea
                      type="text"
                      value={Message}
                      onChange={handleMessageChange}
                      id="Message"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Message"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <input
                      type="date"
                      value={EnquiryData}
                      onChange={handleEnquiryData}
                      id="Message"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="message"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <select
                      id="enquiryType"
                      name="enquiryType"
                      value={EnquiryType}
                      onChange={handleEnquiryType}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="">Select Enquiry Type</option>
                      <option value="Project">Project</option>
                      <option value="Property">Property</option>
                      <option value="Astrology">Astrology</option>
                    </select>
                  </div>
                  <button
                    className={` ${styles.agentRightMainContenBtn} text-white bg-blue-700 h-12 w-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                    type="button"
                    onClick={addEnquiryData}
                    > 
                    Send
                  </button>
                </div>
            </div>
          </div>
        </div>
      </div>

      <div className={` ${styles.testimonial} testimonial`}>
        <div className={` ${styles.testimonialMain} `}>
          <h2 className={` ${styles.testimonialHead} `}>
            What <span className="blueText">Clients</span> Say About Us
          </h2>
          <p className={` ${styles.testimoniaText} `}>
            Testimonials from Our Satisfied Customers
          </p>
        </div>
        <Slider ref={sliderTestimonial} {...settingsTestimonials}>
          {testimonialData?.data?.map((item, index) => (
            <div key={index} className={`${styles.testimonialcontent} flex`}>
              <div className={`${styles.testimonialLeft}`}>
                <div>
                  <h2 className={`${styles.testimonialLeftHead}`}>
                    {item.MemberName}
                  </h2>
                  <p className={`${styles.testimonialLeftText}`}>
                    {item.Description}
                  </p>
                  <div>
                    <div className="flex items-center">
                      <svg
                        className="w-4 h-4 text-yellow-300 ms-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 text-yellow-300 ms-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 text-yellow-300 ms-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 text-yellow-300 ms-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    </div>
                    <div className="flex mt-4">
                      <button
                        type="button"
                        onClick={() => sliderTestimonial?.current?.slickPrev()}
                        className={` ${styles.apartmentTypeLeftArrowBtn}  z-30 flex justify-center px-4 cursor-pointer group focus:outline-none`}
                      >
                        <span
                          className={` ${styles.apartmentTypeLeftArrowSpan} inline-flex justify-center dark:bg-gray-800/30  dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none `}
                        >
                          <i
                            className={` ${styles.apartmentTypeArrowIcon} bi bi-arrow-left `}
                          ></i>
                          <span className="sr-only">Previous</span>
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => sliderTestimonial?.current?.slickNext()}
                        className={`z-30 flex justify-center cursor-pointer group focus:outline-none`}
                        data-carousel-next
                      >
                        <span
                          className={` ${styles.apartmentTypeRightArrowSpan} inline-flex justify-center dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none `}
                        >
                          <i
                            className={` ${styles.apartmentTypeArrowIconRight} bi bi-arrow-right `}
                          ></i>
                          <span className="sr-only">Next</span>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${styles.testimonialRight}`}>
                <img src={item.Image} alt="" />
              </div>
            </div>
          ))}
          {/* <div className={`${styles.testimonialcontent} flex`}>
            <div className={`${styles.testimonialLeft}`}>
              <div>
                <h2 className={`${styles.testimonialLeftHead}`}>
                  Oliver Benjamin
                </h2>
                <p className={`${styles.testimonialLeftText}`}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Magni aperiam labore maiores autem harum vitae fugiat a
                  tempore. Beatae voluptate ut, unde laborum enim blanditiis,
                  praesentium laudantium cupiditate autem consequuntur totam
                  repellendus! Ipsum atque molestiae nulla maiores fugiat
                  commodi nesciunt.
                </p>
                <div>
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 text-yellow-300 ms-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-300 ms-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-300 ms-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-300 ms-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                  </div>
                  <div className="flex mt-4">
                    <button
                      type="button"
                      onClick={() => sliderTestimonial?.current?.slickPrev()}
                      className={` ${styles.apartmentTypeLeftArrowBtn}  z-30 flex justify-center px-4 cursor-pointer group focus:outline-none`}
                    >
                      <span
                        className={` ${styles.apartmentTypeLeftArrowSpan} inline-flex justify-center dark:bg-gray-800/30  dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none `}
                      >
                        <i
                          className={` ${styles.apartmentTypeArrowIcon} bi bi-arrow-left `}
                        ></i>
                        <span className="sr-only">Previous</span>
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => sliderTestimonial?.current?.slickNext()}
                      className={`z-30 flex justify-center cursor-pointer group focus:outline-none`}
                      data-carousel-next
                    >
                      <span
                        className={` ${styles.apartmentTypeRightArrowSpan} inline-flex justify-center dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none `}
                      >
                        <i
                          className={` ${styles.apartmentTypeArrowIconRight} bi bi-arrow-right `}
                        ></i>
                        <span className="sr-only">Next</span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className={`${styles.testimonialRight}`}>
              <img src="/img/house-middleclass.jpg" alt="" />
            </div>
          </div>
          <div className={`${styles.testimonialcontent} flex`}>
            <div className={`${styles.testimonialLeft}`}>
              <div>
                <h2 className={`${styles.testimonialLeftHead}`}>
                  Oliver Benjamin
                </h2>
                <p className={`${styles.testimonialLeftText}`}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Magni aperiam labore maiores autem harum vitae fugiat a
                  tempore. Beatae voluptate ut, unde laborum enim blanditiis,
                  praesentium laudantium cupiditate autem consequuntur totam
                  repellendus! Ipsum atque molestiae nulla maiores fugiat
                  commodi nesciunt.
                </p>
                <div>
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 text-yellow-300 ms-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-300 ms-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-300 ms-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-300 ms-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                  </div>
                  <div className="flex mt-4">
                    <button
                      type="button"
                      onClick={() => sliderTestimonial?.current?.slickPrev()}
                      className={` ${styles.apartmentTypeLeftArrowBtn}  z-30 flex justify-center px-4 cursor-pointer group focus:outline-none`}
                    >
                      <span
                        className={` ${styles.apartmentTypeLeftArrowSpan} inline-flex justify-center dark:bg-gray-800/30  dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none `}
                      >
                        <i
                          className={` ${styles.apartmentTypeArrowIcon} bi bi-arrow-left `}
                        ></i>
                        <span className="sr-only">Previous</span>
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => sliderTestimonial?.current?.slickNext()}
                      className={`z-30 flex justify-center cursor-pointer group focus:outline-none`}
                      data-carousel-next
                    >
                      <span
                        className={` ${styles.apartmentTypeRightArrowSpan} inline-flex justify-center dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none `}
                      >
                        <i
                          className={` ${styles.apartmentTypeArrowIconRight} bi bi-arrow-right `}
                        ></i>
                        <span className="sr-only">Next</span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className={`${styles.testimonialRight}`}>
              <img src="/img/house-middleclass.jpg" alt="" />
            </div>
          </div> */}
        </Slider>
      </div>

      <div className={`${styles.populerPropertiesMain} blogs`}>
        <div>
          <h2 className={`${styles.propertiesByAreaMainHead}`}>
            From Our <span className="blueText">Blogs</span>
          </h2>
          <div className={`${styles.propertiesByAreaMainTextMain}`}>
            <p className={`${styles.propertiesByAreaMainText}`}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </p>
            <a
              href="#"
              className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              See all Blogs
              <svg
                className="w-4 h-4 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18 14v4.833A1.166 1.166 0 0 1 16.833 20H5.167A1.167 1.167 0 0 1 4 18.833V7.167A1.166 1.166 0 0 1 5.167 6h4.618m4.447-2H20v5.768m-7.889 2.121 7.778-7.778"
                />
              </svg>
            </a>
          </div>
        </div>
        
        
        <div className="flex flex-wrap">
          <div
            className={` ${styles.populerPropertiesBox} border border-gray-300 rounded-md`}
          >
            <div>
              <div>
                <img
                  className={` ${styles.populerPropertiesBoxImg} rounded-md`}
                  src="/img/black-wallpaper-1.jpg"
                  alt=""
                />
              </div>
            </div>
            <div className="p-4">
              <div className={` ${styles.populerPropertiesLocationMain} flex`}>
                <p className={`text-gray-700`}>Business</p>
              </div>
              <h2 className={` ${styles.populerPropertiesBoxHead}`}>
                lorem ipsum dolor sit am
              </h2>

              <p className={` ${styles.blogContentText}`}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed,
                incidunt quia! Possimus, corporis reiciendis!
              </p>
            </div>
          </div>
          <div
            className={` ${styles.populerPropertiesBox} border border-gray-300 rounded-md`}
          >
            <div>
              <div>
                <img
                  className={` ${styles.populerPropertiesBoxImg} rounded-md`}
                  src="/img/black-wallpaper-1.jpg"
                  alt=""
                />
              </div>
            </div>
            <div className="p-4">
              <div className={` ${styles.populerPropertiesLocationMain} flex`}>
                <p className={`text-gray-700`}>Business</p>
              </div>
              <h2 className={` ${styles.populerPropertiesBoxHead}`}>
                lorem ipsum dolor sit am
              </h2>

              <p className={` ${styles.blogContentText}`}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed,
                incidunt quia! Possimus, corporis reiciendis!
              </p>
            </div>
          </div>
          <div
            className={` ${styles.populerPropertiesBox} border border-gray-300 rounded-md`}
          >
            <div>
              <div>
                <img
                  className={` ${styles.populerPropertiesBoxImg} rounded-md`}
                  src="/img/black-wallpaper-1.jpg"
                  alt=""
                />
              </div>
            </div>
            <div className="p-4">
              <div className={` ${styles.populerPropertiesLocationMain} flex`}>
                <p className={`text-gray-700`}>Business</p>
              </div>
              <h2 className={` ${styles.populerPropertiesBoxHead}`}>
                lorem ipsum dolor sit am
              </h2>

              <p className={` ${styles.blogContentText}`}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed,
                incidunt quia! Possimus, corporis reiciendis!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={` ${styles.dream} dream`}>
        <div className={` ${styles.dreamMain} `}>
          <div className={`${styles.blogContentMain}`}>
            <h2 className={`${styles.blogContentHead}`}>Get Your Dream Home</h2>
            <p className={`${styles.blogContentText}`}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
              facilis quaerat aperiam odit id voluptates maxime veritatis
              pariatur, qui tempora quasi est, ea ut dolor.
            </p>
            <button
              className={` ${styles.blogMainContenBtn} text-blue bg-white-700 h-12 w-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
              type="button"
            >
              Get Started
              <svg
                className="w-4 h-4 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18 14v4.833A1.166 1.166 0 0 1 16.833 20H5.167A1.167 1.167 0 0 1 4 18.833V7.167A1.166 1.166 0 0 1 5.167 6h4.618m4.447-2H20v5.768m-7.889 2.121 7.778-7.778"
                />
              </svg>
            </button>
          </div>
          <div className={`${styles.dreamRight} relative`}>
            <img
              className={`${styles.blogContentImg} absolute bottom-0`}
              src="/img/buiding.png"
              alt="a"
            />
          </div>
        </div>
      </div>
      <Footer />
       
    </main>
  );
}

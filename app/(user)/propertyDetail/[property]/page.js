"use client";
import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import React, { useEffect, useState, useRef } from "react";
import styles from "./propertyDetail.module.css";
import { initFlowbite } from "flowbite";
import { Button, Popover } from "flowbite-react";
import Slider from "react-slick";
import Link from 'next/link';
import useFetch from "@/customHooks/useFetch";
import { useRouter } from "next/navigation";
import { DayPicker } from 'react-day-picker';
//import { getAminityById } from "@/api-functions/amenity/getAmenityByID";
import { ToastContainer, toast } from "react-toastify";
import 'react-day-picker/dist/style.css';
import { GetPropertyById } from "@/api-functions/property/getPropertyById";
import { API_BASE_URL } from "@/utils/constants";
import { addEnquiry } from "@/api-functions/enquiry/addEnquiry";
import { Input } from "postcss";
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";
import MultiCarousel from "@/components/common/carousel";
import Spinner from "@/components/common/loading";
import SkeletonLoader from "@/components/common/loader";
import LoadingText from "@/components/common/textloader";
import LoadingImg from "@/components/common/loadingImg";

const PropertyDetail = ({params}) => {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [Name, setName] = useState("");
  const [isLoading,setIsLoading]=useState(true)
  const [Email, setEmail] = useState("");
  const [Message, setMessage] = useState("m");
  const [MolileNumber, setPhone] = useState("");
  const [EnquiryData, setEnquiryData] = useState("");
  const [EnquiryType, setEnquiryType] = useState("Property");
  const [listData, setListData] = useState(false);
  const [listPropertiesData, setListPropertiesData] = useState(false);
  const [listImageData, setListImageData] = useState(false);
  const [videoData, setVideoData] = useState(false);
  const [loanDetails, setLoanDetailseData] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [aminityData, setAminityData] = useState(false);
  const [BrochureData, setBrochureData] = useState("")
  
  const [page, setPage] = useState(1);
  const [activeSection, setActiveSection] = useState("general");

  const addEnquiryData = async () => {
    if (Name === "") {
      toast.error("Name  is required");
      return false;
    }
    if (Email === "") {
      toast.error("Email is required");
      return false;
    }
    if (EnquiryData === ""){
      toast.error("Date is required");
      return false;
    }
    if (MolileNumber === ""){
      toast.error("Number is required");
      return false;
    }
    let payload = { Name, Email, Message, MolileNumber, EnquiryData, EnquiryType };
    let res = await addEnquiry(payload)
     if(res?.resData?.success == true){
       toast.success(res?.resData?.message);
       setName("");
       setPhone("");
       setEnquiryData("");
       setEmail("");
      }else{
        toast.error(res.errMessage);
        return false;
      }
    console.log("payload",payload);
  }
  const formatArea = (area) => {
    return parseFloat(area).toFixed(2);
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
  const handleEnquiryData = (date) => {
    setEnquiryData(date);
  };

  console.log("EnquiryData",EnquiryData)

  useEffect(() => {
    initFlowbite();
  }, []);

  useEffect(() => {
    GetPropertyId();
  });

  const {
    data: listDataConst,
    loading:popularPropertiesLoading,
    error:popularPropertiesError,
  } = useFetch(`${API_BASE_URL}/properties/similarProperty/${params?.property}`);
  console.log("listDataConst",listDataConst);

  const ShowPopularProperties = () => {
    return isLoading ? (
      <SkeletonLoader />
    ) : (
      listDataConst?.data?.map((item,index) => (
            
        <div key={index} className="mr-3"  >
          <img
                className={` ${styles.cardImgTop}`}
                src={item.Images[0].URL}
                alt="Nothing"
              ></img>
          <Link href={`/propertyDetail/${item._id}`}>
          <div className={` ${styles.cardImgBottom}`}>
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
                <p className={` ${styles.populerPropertiesBoxText} ml-1`}>
                {item.Bedrooms} Bed Room
                </p>
              </div>
              <div className="flex">
                <i className="fa fa-bath"></i>
                <p className={` ${styles.populerPropertiesBoxText} ml-1 `}>
                {item.Bathrooms} Baths
                </p>
              </div>
              <div className="flex">
                <i className="fa fa-area-chart"></i>
  
                <p className={` ${styles.populerPropertiesBoxText} ml-1`}>
                  {item.LandArea} Land Area
                </p>
              </div>
            </div>
            <div className={`${styles.populerPropertiesBoxPriceMain}`}>
              <p className={`${styles.populerPropertiesBoxPrice}`}>
              {item.TotalPrice?.DisplayValue} 
              </p>
              <Link href={`/propertyDetail/${item._id}`} >
                <button
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm sm:w-auto px-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button"
                  
                >
                  More Details
                </button>
              </Link>
            </div>
          </div>
          </Link>
        </div>
        ))
    )
  }

  const GetPropertyId = async () => {
    let properties = await GetPropertyById(params?.property);
    if (properties?.resData?.success == true) {
      setListPropertiesData(properties?.resData?.data);
      setListImageData(properties?.resData?.data?.Images);
      setLoanDetailseData(properties?.resData?.data?.LoanDetails);
      setVideoData(properties?.resData?.data?.Videos);
      setAminityData(properties?.resData?.data?.Aminities);
      setBrochureData(properties?.resData?.data?.Brochure);
      console.log("BrochureData",BrochureData)
      setIsLoading(false);
      toast.success(properties?.resData?.message);
      return false;
    } else {
      toast.error(properties?.errMessage);
      return false;
    }
  };

    const handleDownload = () => {
      // Construct the URL of the file
      const fileUrl = BrochureData; // Adjust the file path as needed
  
      // Create an anchor element
      const anchor = document.createElement('a');
      anchor.href = fileUrl;
      anchor.download = 'example.pdf';
      anchor.rel = 'noopener noreferrer'; // Set the download attribute
  
      // Simulate a click event to trigger the download
      anchor.click();
  
      // Clean up
      anchor.remove();
    };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleRedirect = () => {
    window.open('https://www.facebook.com/', '_blank');
    setIsPopoverOpen(false);
  };

  const handleRedirectTwitter = () => {
    window.open('https://twitter.com/', '_blank');
    setIsPopoverOpen(false);
  };

  const ShowBank = () => {
    return isLoading ? (
      <SkeletonLoader />
    ) : ( loanDetails?.ByBank?.map((item,index) => (
      <div key={index} className={` ${styles.bankBoxMain} border-gray-300 rounded-md`}>
        <div className={` ${styles.bankBoxBank}`}>
          <div>
            <img
              className={` ${styles.bankBoxImg}`}
              src={item.BankImage}
              alt=""
            />
          </div>
        </div>
        <div>
          <h2 className={` ${styles.bankBoxHead}`}>{item.BankName}</h2>
        </div>
      </div>
    ))
  )
  }

  const copyURL = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success("URL Copied");
    setIsPopoverOpen(false);
    setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
  };


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
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const mapSrc = `https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${listPropertiesData?.Location?.Latitude},${listPropertiesData?.Location?.Longitude}&t=&z=14&ie=UTF8&iwloc=B&output=embed`;

  useEffect(() => {
    const handleScroll = () => {
      const nav = document.getElementById("nav");
      const pages = document.querySelectorAll(".page");
      const scrollPosition = window.scrollY;

      pages.forEach((page) => {
        const pageTop = page.offsetTop - nav.offsetHeight;
        const pageBottom = pageTop + page.offsetHeight;

        if (scrollPosition >= pageTop && scrollPosition < pageBottom) {
          const activeLink = document.querySelector(`a[href="#${page.id}"]`);
          if (activeLink) {
            activeLink.classList.add("activeNavbar");
          }
        } else {
          const activeLink = document.querySelector(`a[href="#${page.id}"]`);
          if (activeLink) {
            activeLink.classList.remove("activeNavbar");
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  console.log("listPropertiesData?.data?.Surveillance",listPropertiesData.Surveillance)
  
  return (
    <>
      {/* {isLoading && <Spinner />} */}
      <Navbar />
      <div className={`${styles.heroSection} heroSection`}>
        <div className={`${styles.heroSectionMain}`}>
          <div className={`${styles.heroSectionCrousalMain}`}>
            <div
              id="controls-carousel"
              className="relative w-full"
              data-carousel="static"
            >
              <div  className="relative h-56 overflow-hidden rounded-lg md:h-96">
              {listPropertiesData ?
                listPropertiesData?.Images?.map((item,index) => (
                <div
                  key={index}
                  className=" duration-700 ease-linear"
                  data-carousel-item
                >
                   <img className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" src={item.URL} alt="" />
                </div>
                )): <LoadingImg />}
              </div>
              <button
                type="button"
                className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                data-carousel-prev
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg
                    className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
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
                      d="M5 1 1 5l4 4"
                    />
                  </svg>
                  <span className="sr-only">Previous</span>
                </span>
              </button>
              <button
                type="button"
                className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                data-carousel-next
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg
                    className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
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
                  <span className="sr-only">Next</span>
                </span>
              </button>
            </div>
          </div>
          <div className={`${styles.heroSectionLeftImgMain}`}>
            {
              listPropertiesData ? <img src={listPropertiesData?.Area?.AreaImage} alt="" /> : <LoadingImg />
            }
          </div>
          {listPropertiesData ?
          listPropertiesData?.Videos?.map((videoDatas) => (
          <div key={videoDatas._id} className={`${styles.heroSectionLeftVideoMain}`}>
            <video
              controls
              className="h-48 w-64 border border-black rounded-lg"
            >
              <source
                src={videoDatas.URL}
                type="video/mp4"
              />
            </video>
          </div>
          )): <LoadingImg />}
        </div>
        <div className={`${styles.heroSectionBottomMain}`}>
          <div className={`${styles.heroSectionBottomBox}`}>
            <div className={`${styles.BottomBoxcontenet}`}>
              <h2 className={`${styles.heroSectionBottomBoxHead}`}>
                {listPropertiesData.Titile}
              </h2>
              <p className={`${styles.heroSectionBottomBoxText}`}>
                {" "}
                <i className="bi bi-geo-alt-fill"></i>{listPropertiesData.Address}
              </p>
            </div>
            <div className={`${styles.heroSectionVL}`}></div>
            <div className={`${styles.BottomBoxcontenet}`}>
              <h2 className={`${styles.heroSectionBottomBoxHead}`}>Price</h2>
              <p className={`${styles.heroSectionBottomBoxText}`}>
                {" "}
                {listPropertiesData.TotalPrice?.DisplayValue} 
              </p>
            </div>
            <div className={`${styles.heroSectionVL}`}></div>
            <div className={`${styles.BottomBoxcontenet}`}>
              <h2 className={`${styles.heroSectionBottomBoxHead}`}>
                Facing
              </h2>
              {listPropertiesData?.Facing?.map((item,index) => (
              <p key={index} className={`${styles.heroSectionBottomBoxText}`}>
                {" "}
                {item.Facing}
              </p>
              ))}
            </div>
            <div className={`${styles.heroSectionVL}`}></div>
            <div className={`${styles.BottomBoxcontenet}`}>
              <h2 className={`${styles.heroSectionBottomBoxHead}`}>
                Project Type
              </h2>
              <p className={`${styles.heroSectionBottomBoxText}`}>{listPropertiesData?.PropertyType?.Type}</p>
            </div>
            <div className={`${styles.heroSectionVL}`}></div>
            <div className={`${styles.BottomBoxcontenet}`}>
              <h2 className={`${styles.heroSectionBottomBoxHead}`}>
                Posession Status
              </h2>
              <p className={`${styles.heroSectionBottomBoxText}`}>{listPropertiesData?.PosessionStatus?.Possession}</p>
            </div>
          </div>
        </div>
      </div>
    
      <div className={`${styles.detailSectionBar} detailSectionBar`}>
        <div className="text-sm font-medium text-center text-black-500 border-b border-black-900 dark:text-gray-400 dark:border-gray-700 content" id="nav">
          <ul className="flex flex-nowrap overflow-x-auto -mb-px">
            <li className="me-2">
              <Link
                href="#general"
                className="nonActiveBar">
                General
              </Link>
            </li>
            <li className="me-2">
              <Link
                href="#configure"
                className="nonActiveBar"        >
                Configuration
              </Link>
            </li>
            <li className="me-2">
              <Link
                href="#overview"
                className="nonActiveBar"
              >
                Overview
              </Link>
            </li>
            <li className="me-2">
              <Link
                href="#amenities"
                className="nonActiveBar"
              >
                Amenities
              </Link>
            </li>
            <li className="me-2">
              <Link
                href="#bank"
                className="nonActiveBar"
              >
                Bank Offers
              </Link>
            </li>
            <li className="me-2">
              <Link
                href="#specifications"
                className="nonActiveBar"
              >
                Specifications
              </Link>
            </li>
            <li className="me-2">
              <Link
                href="#location"
                className="nonActiveBar"
              >
                Location
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className={` ${styles.divideDetailPage} divideDetailPage`}>
        <div className={` ${styles.divideDetailPageLeft}`}>
          {/* GeneralDetail */}
            <div id="general" className={`${styles.generalDetails} GeneralDetails page`}>
              <div className="GeneralDetailsMain">
                <h2 className={`${styles.GeneralDetailsMainHead}`}>
                  GENERAL DETAILS
                </h2>
                  <div className={`${styles.GeneralDetailsBox}`}>
                  
                  <div className="flex flex-wrap justify-between">
                    <div>
                      <p className={`${styles.GeneralDetailsBoxName}`}>Price:</p>
                      <p className={`${styles.GeneralDetailsBoxValue}`}>
                      {(listPropertiesData.TotalPrice?.DisplayValue)}
                      </p>
                    </div>
                    <div>
                      <p className={`${styles.GeneralDetailsBoxName}`}> Area:</p>
                      <p className={`${styles.GeneralDetailsBoxValue}`}>
                        {formatArea(listPropertiesData?.AreaUnits?.InSquareMeter * 10.763)} sq.ft.
                      </p>
                    </div>
                    <div>
                      <p className={`${styles.GeneralDetailsBoxName}`}>Rooms:</p>
                      <p className={`${styles.GeneralDetailsBoxValue}`}>{listPropertiesData.Bedrooms}</p>
                    </div>
                    <div>
                      <p className={`${styles.GeneralDetailsBoxName}`}>Floor:</p>
                      <p className={`${styles.GeneralDetailsBoxValue}`}>{listPropertiesData.TotalFloors}</p>
                    </div>
                  </div>

                  {listPropertiesData ? (
                  <div>
                    <h2 className={`${styles.GeneralDetailsBoxBottomHead}`}>
                      Modern building in the hear of tribeca!
                    </h2>
                    <p className={`${styles.GeneralDetailsBoxBottomText}`}>
                      {listPropertiesData.Description}
                    </p>
                  </div>
                  ) : <LoadingText/> }
                  

                  {expanded && (
                    <div className={`${styles.GeneralDetailsBoxMoreContent}`}>
                      <p>{listPropertiesData.Highlight}</p>
                    </div>
                  )}
                  <div
                    className={`${styles.GeneralDetailsBoxBottomSeeMore}`}
                    onClick={toggleExpansion}
                  >
                    {expanded ? "- See less" : "+ See more"}
                  </div>
                </div>
              </div>
            </div>

          {/* configure */}
          <div id="configure" className={`${styles.configure} configure page`}>
            <div className="configureMain">
              <h2 className={`${styles.configureMainHead}`}>
                CONFIGURATION AND FLOOR PLAN
              </h2>
              <div className={`${styles.configureBox}`}>
                <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
                  <ul
                    className="flex flex-wrap -mb-px text-sm font-medium text-center"
                    id="default-tab"
                    data-tabs-toggle="#default-tab-content"
                    role="tablist"
                  >
                    <li className="me-2" role="presentation">
                      <button
                        className="inline-block p-4 border-b-2 rounded-t-lg"
                        id="profile-tab"
                        data-tabs-target="#profile"
                        type="button"
                        role="tab"
                        aria-controls="profile"
                        aria-selected="false"
                      >
                        {listPropertiesData?.BhkType?.Type}
                      </button>
                    </li>
                    <li className="me-2" role="presentation">
                      <button
                        className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                        id="dashboard-tab"
                        data-tabs-target="#dashboard"
                        type="button"
                        role="tab"
                        aria-controls="dashboard"
                        aria-selected="false"
                      >
                        Floor Plan
                      </button>
                    </li>
                    <li className="me-2" role="presentation">
                      <button
                        className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                        id="generall-tab"
                        data-tabs-target="#generall"
                        type="button"
                        role="tab"
                        aria-controls="generall"
                        aria-selected="false"
                      >
                        General
                      </button>
                    </li>
                  </ul>
                </div>
                <div id="default-tab-content">
                  <div
                    className="hidden p-4 rounded-lg dark:bg-gray-800"
                    id="profile"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                  >
                    <div className="flex">
                      <ol className={`${styles.configureOl}`}>
                        <li className={`${styles.configureLiHead}`}>Legend</li>
                        <li>{listPropertiesData.CarpetArea} Carpet Area</li>
                        <li>{listPropertiesData.Balconies} Balcony</li>
                        <li>{listPropertiesData.Bathrooms} Bathroom</li>
                        <li>Scalable area - {formatArea(listPropertiesData?.AreaUnits?.InSquareMeter * 10.763)} sq.ft.</li>
                      </ol>
                      <div className={`${styles.configureImg}`}>
                          <img src="/img/Map.jpeg" alt="" />
                      </div>
                    </div>
                  </div>
                  <div
                    className="hidden p-4 rounded-lg dark:bg-gray-800"
                    id="dashboard"
                    role="tabpanel"
                    aria-labelledby="dashboard-tab"
                  >
                    <div className={`${styles.configureFloorPlanImg}`}>
                      <img src="/img/Map.jpeg" alt="" />
                    </div>
                  </div>
                  <div
                    className="hidden p-4 rounded-lg dark:bg-gray-800"
                    id="generall"
                    role="tabpanel"
                    aria-labelledby="generall-tab"
                  > Surveillance
                    <div className={`${styles.configureFloorPlanImg}`}>
                    {/* {listPropertiesData.Surveillance.map((item,index) =>(
                      <div key={index}>
                        <p>{item}</p>
                      </div>
                    ))} */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* overview */}
          <div id="overview" className={`${styles.overview} overview page`}>
            
              <div className="overviewMain">
              <h2 className={`${styles.overviewMainHead}`}>OVERVIEW</h2>
              <div className={`${styles.overviewBox}`}>
              {listPropertiesData ? (
                <div className={`${styles.overviewBoxMain}`}>
                  <div className={`${styles.overviewBoxMainContent}`}>
                    <h2 className={`${styles.overviewBoxMainContentHead}`}>
                      Project Area
                    </h2>
                    <p className={`${styles.overviewBoxMainContentText}`}>
                      {listPropertiesData.LandArea} Acres
                    </p>
                  </div>
                  <div className={`${styles.overviewBoxMainContent}`}>
                    <h2 className={`${styles.overviewBoxMainContentHead}`}>
                      Size
                    </h2>
                    <p className={`${styles.overviewBoxMainContentText}`}>
                      {formatArea(listPropertiesData?.AreaUnits?.InSquareMeter * 10.763)} sq.ft.
                    </p>
                  </div>
                  <div className={`${styles.overviewBoxMainContent}`}>
                    <h2 className={`${styles.overviewBoxMainContentHead}`}>
                      Avg. Price
                    </h2>
                    <p className={`${styles.overviewBoxMainContentText}`}>
                      {listPropertiesData.PricePerSquareFeet} k/sq.ft.
                    </p>
                  </div>
                  <div className={`${styles.overviewBoxMainContent}`}>
                    <h2 className={`${styles.overviewBoxMainContentHead}`}>
                    Posession Date 
                    </h2>
                    <p className={`${styles.overviewBoxMainContentText}`}>
                     {formatDate(listPropertiesData.PosessionDate)}
                    </p>
                  </div>
                  <div className={`${styles.overviewBoxMainContent}`}>
                    <h2 className={`${styles.overviewBoxMainContentHead}`}>
                    Property For
                    </h2>
                    <p className={`${styles.overviewBoxMainContentText}`}>
                      {listPropertiesData.ProeprtyFor}
                    </p>
                  </div>
                  <div className={`${styles.overviewBoxMainContent}`}>
                    <h2 className={`${styles.overviewBoxMainContentHead}`}>
                    Flooring
                    </h2>
                    <p className={`${styles.overviewBoxMainContentText}`}>
                    {listPropertiesData?.Flooring?.Flooring}
                    </p>
                  </div>
                  <div className={`${styles.overviewBoxMainContent}`}>
                    <h2 className={`${styles.overviewBoxMainContentHead}`}>
                    Furnished
                    </h2>
                    <p className={`${styles.overviewBoxMainContentText}`}>
                    {listPropertiesData?.Furnished?.Furnished}
                    </p>
                  </div>
                  <div className={`${styles.overviewBoxMainContent}`}>
                    <h2 className={`${styles.overviewBoxMainContentHead}`}>
                    RERA Number
                    </h2>
                    <p className={`${styles.overviewBoxMainContentText}`}>
                    {listPropertiesData?.ReraNumber}
                    </p>
                  </div>
                </div>
                ) : <LoadingText/>
              }
                <div className={`${styles.overviewBoxBottomMain}`}>
                <Link href="/contactus">
                  <button 
                    type="button"  
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-6 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Ask For Detail
                  </button>
                </Link>
                {/* <button type="button" onClick={copyURL} className="text-grey border border-gray-600 bg-white-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-6 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Share</button> */}
                <Popover
                  aria-labelledby="default-popover"
                  content={
                    <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
                      <div className="px-3 py-2">
                        <button 
                          onClick={copyURL}
                          className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                         <i class="bi bi-link-45deg mr-2"></i> Copy Url
                        </button>
                        <button 
                          onClick={handleRedirect}
                          className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          <i class="bi bi-facebook mr-2"></i>Facebook
                        </button>
                        <button 
                          onClick={handleRedirectTwitter}
                          className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          <i class="bi bi-twitter mr-2"></i>Twitter
                        </button>
                      </div>
                    </div>
                  }
                  isOpen={isPopoverOpen} 
                  onClose={() => setIsPopoverOpen(false)}
                >
                  <button
                    type="button" 
                    className="text-grey border border-gray-600 bg-white-700 
                    hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
                    font-medium rounded-md text-sm px-6 py-3 text-center dark:bg-blue-600 
                    dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
                    onClick={() => setIsPopoverOpen(true)}
                  >
                    Share
                  </button>
                </Popover>
                <button type="button" onClick={handleDownload} className="text-grey border border-gray-600 bg-white-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-6 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Download Brochure</button>
                </div>
              </div>
            </div>
          </div>

          {/* amenities */}
          <div id="amenities" className={`${styles.amenities} amenities page`}>
            <div className="amenitiesMain">
              <h2 className={`${styles.amenitiesMainHead}`}>AMENITIES & FEATURES</h2>
              <div className={`${styles.amenitiesBox}`}>
              <Accordion className="border-none">
                <AccordionPanel>
                <AccordionTitle>Aminities</AccordionTitle>
                {listPropertiesData ? (
                  <AccordionContent className={`${styles.AccordionContent}`}>
                    {listPropertiesData?.Aminities?.map((item, index) => (
                      <div key={index} className="p-4">
                        <img
                          className={`${styles.amenitiesIconBox}`}
                          src={item.Icon}
                          width="22"
                          height="22"
                         />
                         <p className="wrap text-center">
                         {item.Aminity}
                         </p>
                      </div>
                    ))}
                </AccordionContent>
                ) : <LoadingText/>}
                </AccordionPanel>
                <AccordionPanel>
                <AccordionTitle>Features</AccordionTitle>
                <AccordionContent className={`${styles.AccordionContent}`}>
                    {listPropertiesData?.Features?.map((item, index) => (
                      <div key={index} className="p-4 justify-between">
                        <img
                          className={`${styles.amenitiesIconBox}`}
                          src={item.Icon}
                          width="22"
                          height="22"
                         />
                         <p className="wrap text-center">
                         {item.Feature}
                         </p>
                      </div>
                    ))}
                </AccordionContent>
                </AccordionPanel>
              </Accordion>
              </div>
            </div>
          </div>

          {/* bank */}
          <div id="bank" className={`${styles.bank} bank page`}>
          <div className="bankMain">
            <h2 className={`${styles.bankMainHead}`}>BANK LOAN OFFERS</h2>
            <div className={`${styles.bankBox}`}>
          {/* <Slider  {...settings} className={`${styles.sliderr}`}> */}
          {}
          {
            loanDetails?.ByBank?.length>0 ? <MultiCarousel UI={ShowBank} /> : <SkeletonLoader />
          }
          {/*  </Slider> */}
              </div>
              </div>
          </div>
          
          {/* Specifications */}
            <div id="specifications" className={` ${styles.faq} faq mt-16 page`}>
              <div className={` ${styles.faqMain}`}>
                <h2 className={`${styles.amenitiesMainHead}`}>SPECIFICATIONS</h2>
              </div>
              <div className={`${styles.amenitiesBox}`}>
                <div className={` ${styles.faqLeft}`}>
                <Accordion className="border-none">
                <AccordionPanel>
                <AccordionTitle>Floor & Counter</AccordionTitle>
                {listPropertiesData ? (
                  <AccordionContent className={`${styles.AccordionContent}`}>
                  <div className="mr-6 p-4">
                    <span className="mb-2 text-gray-500 dark:text-gray-400 text-sm">Dining</span>
                    <p className="">{listPropertiesData?.FloorAndCounter?.Dining}</p>
                  </div>
                  <div className="mr-6 p-4">
                    <span className="mb-2 text-gray-500 dark:text-gray-400 text-sm">Master Bedroom</span>
                    <p className="">{listPropertiesData?.FloorAndCounter?.MasterBedroom}</p>
                  </div>
                  <div className="mr-6 p-4">
                  <span className="mb-2 text-gray-500 dark:text-gray-400 text-sm">Other Bedroom</span>
                  <p className="">{listPropertiesData?.FloorAndCounter?.OtherBedroom}</p>
                  </div>
                  <div className="mr-6 p-4">
                  <span className="mb-2 text-gray-500 dark:text-gray-400 text-sm">Kitchen</span>
                  <p className="">{listPropertiesData?.FloorAndCounter?.Kitchen}</p>
                  </div>
                  <div className="mr-6 p-4">
                  <span className="mb-2 text-gray-500 dark:text-gray-400 text-sm">Balcony</span>
                  <p className="">{listPropertiesData?.FloorAndCounter?.Balcony}</p>
                  </div>
                  <div className="mr-6 p-4">
                  <span className="mb-2 text-gray-500 dark:text-gray-400 text-sm">Toilets</span>
                  <p className="">{listPropertiesData?.FloorAndCounter?.Toilets}</p>
                  </div>
                </AccordionContent>
                ) : <LoadingText/>}
                </AccordionPanel>
                <AccordionPanel>
                  <AccordionTitle>Fitting</AccordionTitle>
                  {listPropertiesData ? (
                  <AccordionContent className={`${styles.AccordionContent}`}>
                  <div className="mr-6 p-4">
                    <span className="mb-2 text-gray-500 dark:text-gray-400 text-sm">Electrical</span>                    
                    <p className="">{listPropertiesData?.Fitting?.Electrical}</p>
                  </div>
                  <div className="mr-6 p-4">
                    <span className="mb-2 text-gray-500 dark:text-gray-400 text-sm">Toilets</span>                    
                    <p className="">{listPropertiesData?.Fitting?.Toilets}</p>
                  </div>
                  <div className="mr-6 p-4">
                    <span className="mb-2 text-gray-500 dark:text-gray-400 text-sm">Kitchen</span>                    
                    <p className="">{listPropertiesData?.Fitting?.Kitchen}</p>
                  </div>
                  <div className="mr-6 p-4">
                    <span className="mb-2 text-gray-500 dark:text-gray-400 text-sm">Doors</span>                    
                    <p className="">{listPropertiesData?.Fitting?.Doors}</p>
                  </div>
                  <div className="mr-6 p-4">
                    <span className="mb-2 text-gray-500 dark:text-gray-400 text-sm">Windows</span>                    
                    <p className="">{listPropertiesData?.Fitting?.Windows}</p>
                  </div>
                  <div className="mr-6 p-4">
                    <span className="mb-2 text-gray-500 dark:text-gray-400 text-sm">Others</span>                    
                    <p className="">{listPropertiesData?.Fitting?.Others}</p>
                  </div>
                  </AccordionContent>
                  ) : <LoadingText/>}
                </AccordionPanel>
                <AccordionPanel>
                  <AccordionTitle>Wall & Ceiling</AccordionTitle>
                  {listPropertiesData ? (
                  <AccordionContent className={`${styles.AccordionContent}`}>
                  <div className="mr-6 p-4">
                    <span className="mb-2 text-gray-500 dark:text-gray-400 text-sm">Interior</span>                    
                    <p className="">{listPropertiesData?.WallAndCeiling?.Interior}</p>
                  </div>
                  <div className="mr-6 p-4">
                    <span className="mb-2 text-gray-500 dark:text-gray-400 text-sm">Exterior</span>                    
                    <p className="">{listPropertiesData?.WallAndCeiling?.Exterior}</p>
                  </div>
                  <div className="mr-6 p-4">
                    <span className="mb-2 text-gray-500 dark:text-gray-400 text-sm">Kitchen</span>                    
                    <p className="">{listPropertiesData?.WallAndCeiling?.Kitchen}</p>
                  </div>
                  <div className="mr-6 p-4">
                    <span className="mb-2 text-gray-500 dark:text-gray-400 text-sm">Toilets</span>                    
                    <p className="">{listPropertiesData?.WallAndCeiling?.Toilets}</p>
                  </div>
                  </AccordionContent>
                  ) : <LoadingText/>}
                </AccordionPanel>
                </Accordion>
                </div>
              </div>
            </div>

          {/* location */}
          <div id="location" className={`${styles.location} location page`}>
            <div className="locationMain">
              <h2 className={`${styles.locationMainHead}`}>LOCATION</h2>
              <div className={`${styles.locationBox}`}>
              <div >
              {listPropertiesData ? (
                <iframe
                width="600"
                height="300"
                frameBorder="0"
                className={styles.locationMapSize}
                src={mapSrc}
                allowFullScreen
              ></iframe>
              ) : <LoadingImg />}

              </div>
              </div>
              </div>
              </div>

          {/* FAQ */}
          <div className={`${styles.amenities} amenities mb-4`}>
            <div className={` ${styles.faq} faq`}>
              <div className={` ${styles.faqMain}`}>
                <h2 className={`${styles.amenitiesMainHead}`}>Frequently Asked Question</h2>
              </div>
              <div className={`${styles.amenitiesBox}`}>
                <div className={` ${styles.faqLeft}`}>
                  <Accordion collapseAll className="border-none">
                    {listPropertiesData?.Faq?.map((item, index) => (
                      <Accordion.Panel key={index}>
                        <Accordion.Title
                          className={` ${styles.faqItemMain} rounded-t-md text-black bg-white-700 hover:bg-white-700
                            focus:border-none focus:ring-grey-0 focus:ring-0`}
                        >
                          {item?.Question}
                        </Accordion.Title>
                        <Accordion.Content className="bg-white-700 text-black">
                          <p className=" mb-2 text-black dark:text-white-400">
                            {item?.Answer}
                          </p>
                        </Accordion.Content>
                      </Accordion.Panel>
                    ))}
                  </Accordion>
                </div>
              </div>
            </div>
          </div>          
        </div>
        
        <div className={` ${styles.divideDetailPageRight}`}>
          <div id="general" className={`${styles.formDetails} mb-4`}>
              <div className="GeneralDetailsMain">
                <h2 className={`${styles.GeneralDetailsMainHead}`}>
                  GET A GUIDED TOUR
                </h2>
                <div className={`${styles.GeneralDetailsBox}`}>
                <div className="mb-5 mt-3">
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
                  <div className="mb-5">
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
                  <div className="mb-5">
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
                  {/* <div className="mb-6">
                    <textarea
                      type="text"
                      value={Message}
                      onChange={handleMessageChange}
                      id="Message"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Message"
                      required
                    />
                  </div> */}
                  <div className={`mb-5`}>
                    <DayPicker
                      mode="single"
                      selected={EnquiryData}
                      onSelect={handleEnquiryData}
                      className={`${styles.rdp}`}
                      modifiersStyles={{
                        selected: {
                          backgroundColor: 'gray',
                          color: 'white',
                        },
                        today: {
                          color: 'white',
                          backgroundColor: '#2a4ac8',
                        },
                      }}
                    />
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
       {/* Similar */}
       {listDataConst?.count > 0 ?
      <div className={`${styles.similarMainType}`}>
      <div id="similar" className={`${styles.similar} similar`}>
        <div className="similarMain">
          <h2 className={`${styles.similarMainHead}`}>SIMILAR PROPERTIES</h2>
          <div className={` ${styles.populerPropertiesBoxMain} flex flex-wrap mt-4 mb-6 `}>
          {
            listDataConst?.data?.length>0 ?  <MultiCarousel UI={ShowPopularProperties} /> : <SkeletonLoader />
          }  
        </div>
        </div>
      </div>
      </div>
      : null }
      <Footer />
    </>
  );
};

export default PropertyDetail;

"use client";
import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import React, { useEffect, useState, useRef } from "react";
import styles from "./propertyDetail.module.css";
import { initFlowbite } from "flowbite";
import { Button, Popover } from "flowbite-react";
import Slider from "react-slick";
import Link from "next/link";
import useFetch from "@/customHooks/useFetch";
import { useRouter } from "next/navigation";
import { DayPicker } from "react-day-picker";
//import { getAminityById } from "@/api-functions/amenity/getAmenityByID";
import { ToastContainer, toast } from "react-toastify";
import "react-day-picker/dist/style.css";
import { GetPropertyById } from "@/api-functions/property/getPropertyById";
import { API_BASE_URL, imgApiUrl } from "@/utils/constants";
import { addEnquiry } from "@/api-functions/enquiry/addEnquiry";
import { Input } from "postcss";
import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
} from "flowbite-react";
import { Modal } from "flowbite-react";
import MultiCarousel from "@/components/common/carousel";
import Spinner from "@/components/common/loading";
import SkeletonLoader from "@/components/common/loader";
import LoadingText from "@/components/common/textloader";
import LoadingImg from "@/components/common/loadingImg";
import LoadingBigImg from "@/components/common/loadingBigImg";
import PersonalLoanCalculator from "@/components/common/emiCalculator";
import { Carousel } from "flowbite-react";
import ReadMore from "@/components/common/readMore";
import CommonLoader from "@/components/common/commonLoader/commonLoader";

const PropertyDetail = ({ params }) => {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [Name, setName] = useState("");
  // const [IsEnquiryVisiable, setIsEnquiryVisiable] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [Email, setEmail] = useState("");
  const [Message, setMessage] = useState("test");
  const [MolileNumber, setPhone] = useState("");
  const [EnquiryData, setEnquiryData] = useState();
  const [EnquiryDataShow, setEnquiryDataShow] = useState();
  const [EnquiryType, setEnquiryType] = useState("Property");
  const [listData, setListData] = useState(false);
  const [listPropertiesData, setListPropertiesData] = useState(false);
  const [listImageData, setListImageData] = useState(false);
  const [videoData, setVideoData] = useState(false);
  const [loanDetails, setLoanDetailseData] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [aminityData, setAminityData] = useState(false);
  const [BrochureData, setBrochureData] = useState("");
  const [PaymentPlanData, setPaymentPlanData] = useState("");
  const [floorPlanData, setFloorPlanData] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const [page, setPage] = useState(1);
  const [activeSection, setActiveSection] = useState("general");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactMolileNumber, setcontactPhone] = useState("");
  const [contactEnquiryData, setcontactEnquiryData] = useState("");
  const [contactEnquiryType, setcontactEnquiryType] = useState("ContactUs");
  const menuRef = useRef(null);
  const [loaderIsLoading, setLoaderIsLoading] = useState(false);
  const currentDate = new Date().toISOString().slice(0, 10);

  const addcontactEnquiryData = async () => {
    if (contactName === "") {
      toast.error("Name  is required");
      return false;
    }
    if (contactEmail === "") {
      toast.error("Email is required");
      return false;
    }
    if (contactMessage === "") {
      toast.error("Message is required");
      return false;
    }
    if (contactMolileNumber === "") {
      toast.error("Number is required");
      return false;
    }
    if (!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(contactMolileNumber)) {
      toast.error("Please enter a valid 10-digit mobile number");
      return false;
    }
    let contactpayload = {
      Name: contactName,
      Email: contactEmail,
      Message: contactMessage,
      MolileNumber: contactMolileNumber,
      EnquiryDate: contactEnquiryData,
      EnquiryType: contactEnquiryType,
    };
    let res = await addEnquiry(contactpayload);
    if (res?.resData?.success == true) {
      toast.success(res?.resData?.message);
      setContactName("");
      setcontactPhone("");
      setContactMessage("");
      setContactEmail("");
      setOpenModal(false);
    } else {
      toast.error(res.errMessage);
      return false;
    }
  };

  const handlecontactNameChange = (e) => {
    setContactName(e.target.value);
    setcontactEnquiryData(currentDate);
  };
  const handlecontactEmailChange = (e) => {
    setContactEmail(e.target.value);
  };
  const handlecontactPhoneChange = (e) => {
    setcontactPhone(e.target.value);
  };
  const handlecontactMessageChange = (e) => {
    setContactMessage(e.target.value);
  };

  const modalButton = (e) => {
    setOpenModal(true);
  };

  const addEnquiryData = async () => {
    if (Name === "") {
      toast.error("Name  is required");
      return false;
    }
    if (Email === "") {
      toast.error("Email is required");
      return false;
    }
    if (EnquiryData === "") {
      toast.error("Date is required");
      return false;
    }
    if (MolileNumber === "") {
      toast.error("Number is required");
      return false;
    }
    if (!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(MolileNumber)) {
      toast.error("Please enter a valid 10-digit mobile number");
      return false;
    }
    let payload = {
      Name,
      Email,
      Message,
      MolileNumber,
      EnquiryDate: EnquiryDataShow,
      EnquiryType,
      DeveloperId: listPropertiesData?.Builder?._id,
      PropertyId: listPropertiesData?._id,
    };
    let res = await addEnquiry(payload);
    if (res?.resData?.success == true) {
      toast.success(res?.resData?.message);
      setName("");
      setPhone("");
      setEnquiryData("");
      setEnquiryDataShow("");
      setEmail("");
    } else {
      toast.error(res.errMessage);
      return false;
    }
  };
  const formatArea = (area) => {
    return parseFloat(area).toFixed(2);
  };
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

  const validateMobileNumber = (inputMobileNumber) => {
    return /^\d{10}$/.test(inputMobileNumber);
  };
  const handleEnquiryData = (date) => {
    const selectedDate = new Date(date);
    selectedDate.setDate(selectedDate.getDate() + 1);
    setEnquiryDataShow(selectedDate);
    setEnquiryData(date);
  };

  useEffect(() => {
    initFlowbite();
    GetPropertyId();
  }, [EnquiryData]);

  const {
    data: listDataConst,
    loading: popularPropertiesLoading,
    error: popularPropertiesError,
  } = useFetch(
    `${API_BASE_URL}/properties/similarProperty/${params?.property}`
  );

  const ShowPopularProperties = () => {
    return isLoading ? (
      <SkeletonLoader />
    ) : (
      listDataConst?.data?.map((item, index) => (
        <Link key={index} href={`/propertyDetail/${item._id}`}>
          <div className={`cursor-pointer ${styles.cardBoxPopularTop}`}>
            <img
              className={` ${styles.cardImgTop}`}
              src={
                !item.Images[0].URL.includes("https")
                  ? `${imgApiUrl}/${item.Images[0].URL}`
                  : item.Images[0].URL
              }
              // src={`${imgApiUrl}/${item.Images[0].URL}`}
              alt="Nothing"
            ></img>

            <div className={` ${styles.cardImgBottom}`}>
              <div className={` ${styles.populerPropertiesLocationMain} flex`}>
                <i className="bi bi-geo-alt-fill"></i>

                <p className={`text-gray-700 ml-1`}>{item?.Area?.Area}</p>
              </div>

              <div className="flex justify-between">
                <h2
                  className={`text-black font-bold ${styles.populerPropertiesBoxHead}`}
                >
                  {item.Title}
                </h2>
                {/* {item.Facing ? (
                  <div className={` ${styles.populerPropertiesBoxDetail} flex`}>
                    {item?.Facing[0].Facing}
                  </div>
                ) : (
                  <div className={` ${styles.populerPropertiesBoxDetail} flex`}>
                    {item.ProeprtyType}
                  </div>
                )} */}
              </div>

              <div className={`${styles.populerPropertiesBoxPriceMain}`}>
                <p className={`text-md ${styles.populerPropertiesBoxPrice}`}>
                  {item.TotalPrice?.DisplayValue}
                </p>
                {/* <p className={`font-bold${styles.populerPropertiesBoxPrice}`}>
                  {item?.ProeprtyFor}
                </p> */}
              </div>
              <div className="flex justify-between mt-2">
                <p className={`text-gray-500 text-sm font-semibold`}>
                  {item?.PropertySubtype?.Name}
                </p>

                <Link href={`/propertyDetail/${item._id}`}>
                  <button
                    className={`${styles.popularPropertyMoreBtn} text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm sm:w-auto px-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                    type="button"
                  >
                    <span className={`${styles.btnNameforLap}`}>
                      {" "}
                      More Details
                    </span>
                    <span className={`${styles.btnNameforTab}`}> More </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </Link>
      ))
      // listDataConst?.data?.map((item, index) => (
      //   <div key={index} className={`mr-3 ${styles.cardBoxPopularTop}`}>
      //     <img
      //       className={` ${styles.cardImgTop}`}
      //       src={`${imgApiUrl}/${item.Images[0].URL}`}
      //       alt="Nothing"
      //     ></img>
      //     <Link href={`/propertyDetail/${item._id}`}>
      //       <div className={` ${styles.cardImgBottom}`}>
      //         <div className={` ${styles.populerPropertiesLocationMain} flex`}>
      //           <i className="bi bi-geo-alt-fill"></i>
      //           <p className={`text-gray-700 ml-1`}>{item?.Area?.Area}</p>
      //         </div>
      //         <div className="flex justify-between">
      //           <h2 className={` ${styles.populerPropertiesBoxHead}`}>
      //             {item.Title}
      //           </h2>
      //           {item.Facing ? (
      //             <div className={` ${styles.populerPropertiesBoxDetail} flex`}>
      //               {item?.Facing[0].Facing}
      //             </div>
      //           ) : (
      //             <div className={` ${styles.populerPropertiesBoxDetail} flex`}>
      //               {item.ProeprtyType}
      //             </div>
      //           )}
      //         </div>

      //         <div className={`${styles.populerPropertiesBoxPriceMain}`}>
      //           <p className={`${styles.populerPropertiesBoxPrice}`}>
      //             {item.TotalPrice?.DisplayValue}
      //           </p>
      //           <p className={`font-bold${styles.populerPropertiesBoxPrice}`}>
      //             {item?.ProeprtyFor}
      //           </p>
      //         </div>
      //         <div className="flex justify-between mt-2">
      //           <p className={`font-bold${styles.populerPropertiesBoxPrice}`}>
      //             {item?.ProeprtyType}
      //           </p>
      //           <Link href={`/propertyDetail/${item._id}`}>
      //             <button
      //               className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm sm:w-auto px-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      //               type="button"
      //             >
      //               More Details
      //             </button>
      //           </Link>
      //         </div>
      //       </div>
      //     </Link>
      //   </div>
      // ))
    );
  };

  const GetPropertyId = async () => {
    setLoaderIsLoading(true);
    let properties = await GetPropertyById(params?.property);
    if (properties?.resData?.success == true) {
      setListPropertiesData(properties?.resData?.data);
      setListImageData(properties?.resData?.data?.Images);
      setLoanDetailseData(properties?.resData?.data?.LoanDetails);
      setVideoData(properties?.resData?.data?.Videos);
      setAminityData(properties?.resData?.data?.Aminities);
      setBrochureData(properties?.resData?.data?.Brochure);
      setPaymentPlanData(properties?.resData?.data?.PaymentPlan);
      setFloorPlanData(properties?.resData?.data?.FloorPlan);
      setLoaderIsLoading(false);
      setIsLoading(false);
      toast.success(properties?.resData?.message);
      return false;
    } else {
      toast.error(properties?.errMessage);
      setLoaderIsLoading(false);
      return false;
    }
  };

  const handleDownload = () => {
    // Construct the URL of the file
    const fileUrl = BrochureData; // Adjust the file path as needed

    // Create an anchor element
    const anchor = document.createElement("a");
    anchor.href = fileUrl;
    anchor.download = "Brochure.pdf";
    anchor.rel = "noopener noreferrer"; // Set the download attribute

    document.body.appendChild(anchor);

    // Simulate a click event to trigger the download
    anchor.click();

    // Clean up
    anchor.remove();
  };

  const handleDownloadPlan = () => {
    // Construct the URL of the file
    const fileUrl = PaymentPlanData; // Adjust the file path as needed

    // Create an anchor element
    const anchor = document.createElement("a");
    anchor.href = fileUrl;
    anchor.download = "PaymentPlan.pdf";
    anchor.rel = "noopener noreferrer"; // Set the download attribute

    // Simulate a click event to trigger the download
    anchor.click();

    // Clean up
    anchor.remove();
  };

  const handleDownloadFloorPlan = () => {
    // Construct the URL of the file
    const fileUrl = floorPlanData; // Adjust the file path as needed

    // Create an anchor element
    const anchor = document.createElement("a");
    anchor.href = fileUrl;
    anchor.download = "FloorPlan.pdf";
    anchor.rel = "noopener noreferrer"; // Set the download attribute

    // Simulate a click event to trigger the download
    anchor.click();

    // Clean up
    anchor.remove();
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleRedirect = () => {
    window.open("https://www.facebook.com/", "_blank");
    setIsPopoverOpen(false);
  };

  const handleRedirectTwitter = () => {
    window.open("https://twitter.com/", "_blank");
    setIsPopoverOpen(false);
  };

  const ShowBank = () => {
    return isLoading ? (
      <SkeletonLoader />
    ) : (
      loanDetails?.ByBank?.map((item, index) => (
        <div
          key={index}
          className={` ${styles.bankBoxMain} border-gray-300 rounded-md`}
        >
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
    );
  };

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

  const mapSrc = `https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${listPropertiesData?.Location?.Latitude},${listPropertiesData?.Location?.Longitude}&t=&z=14&ie=UTF8&iwloc=B&output=embed`;

  useEffect(() => {
    const handleScroll = () => {
      const nav = document.getElementById("nav");
      const pages = document.querySelectorAll(".page");
      const scrollPosition = window.scrollY;

      pages.forEach((page) => {
        const pageTop = page.offsetTop - nav.offsetHeight - 100;
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
  useEffect(() => {
    const handleScroll = (e) => {
      e.preventDefault();
      const targetId = e.currentTarget.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      window.scrollTo({
        top: targetElement.offsetTop - menuRef.current.offsetHeight - 90,
        behavior: "smooth",
      });
    };

    const anchors = menuRef.current.querySelectorAll("a");
    anchors.forEach((anchor) => {
      anchor.addEventListener("click", handleScroll);
    });

    return () => {
      anchors.forEach((anchor) => {
        anchor.removeEventListener("click", handleScroll);
      });
    };
  }, []);
  function convertSystem(number) {
    if (number >= 10000000) {
      return (number / 10000000).toFixed(2) + "Cr";
    } else if (number >= 100000) {
      return (number / 100000).toFixed(2) + "L";
    } else if (number >= 1000) {
      return (number / 1000).toFixed(2) + "K";
    } else {
      return number.toString();
    }
  }
  const isImage = (url) => {
    return url ? url.match(/\.(jpeg|jpg|png)$/) : "";
  };
  const checkIfAllEmpty = (obj) => {
    const allEmpty = Object.values(obj).every((value) => value === "");

    // If all values are empty, return null
    return allEmpty ? true : false;

    // Check if all values in the object are empty strings
  };
  return (
    <>
      {loaderIsLoading && <CommonLoader />}
      <Navbar />
      <div className={`${styles.heroSection} heroSection`}>
        <div className={`${styles.heroSectionMain}`}>
          <div className={`${styles.heroSectionCrousalMain}`}>
            <div
              className={`grid h-56 grid-cols-1 gap-4 sm:h-96 xl:h-96 1xl:h-80 ${styles.leftCarousel}`}
            >
              {listPropertiesData ? (
                <Carousel indicators={false} slide={false} swipeable>
                  {listPropertiesData?.Images?.map((itemurl, index) => (
                    <img
                      className="h-full"
                      key={index}
                      src={`${imgApiUrl}/${itemurl?.URL}`}
                      alt="..."
                    />
                  ))}
                </Carousel>
              ) : (
                <LoadingBigImg />
              )}
            </div>
          </div>
          <div className={`${styles.heroSectionLeftImgMain}`}>
            {listPropertiesData ? (
              <img src={listPropertiesData?.Area?.AreaImage} alt="" />
            ) : (
              <LoadingImg />
            )}
          </div>
          {videoData ? (
            videoData == "" ? (
              <div className={`block ${styles.heroSectionNoLeftVideoMain}`}>
                <img
                  src={`${imgApiUrl}/${listPropertiesData?.Images[1].URL}`}
                  alt="..."
                />
              </div>
            ) : (
              listPropertiesData?.Videos?.map((videoDatas) => (
                <div
                  key={videoDatas._id}
                  className={`${styles.heroSectionLeftVideoMain}`}
                >
                  <video
                    controls
                    autoPlay
                    className="h-48 w-64 border border-black rounded-lg"
                  >
                    <source
                      src={`${imgApiUrl}/${videoDatas.URL}`}
                      type="video/mp4"
                    />
                  </video>
                </div>
              ))
            )
          ) : (
            <LoadingImg />
          )}
        </div>
      </div>

      <div
        className={`${styles.detailSectionBar} detailSectionBar`}
        id="nav"
        ref={menuRef}
      >
        <div className="text-md font-bold text-center text-black-500 border-b border-black-900 dark:text-gray-400 dark:border-gray-700 content">
          <ul className="flex flex-nowrap overflow-x-auto -mb-px">
            <li className="me-2">
              <Link href="#general" className="nonActiveBar">
                General
              </Link>
            </li>
            <li className="me-2">
              <Link href="#configure" className="nonActiveBar">
                Configuration
              </Link>
            </li>
            <li className="me-2">
              <Link href="#overview" className="nonActiveBar">
                Overview
              </Link>
            </li>

            <li className="me-2">
              <Link href="#amenities" className="nonActiveBar">
                Amenities
              </Link>
            </li>

            {/*
            <li className="me-2">
              <Link href="#bank" className="nonActiveBar">
                Bank Offers
              </Link>
            </li>
            */}
            {(listPropertiesData &&
              listPropertiesData?.ProeprtyType == "Commercial") ||
              ((listPropertiesData?.Fitting &&
                checkIfAllEmpty(listPropertiesData?.Fitting)) ||
              listPropertiesData?.PropertySubtype?.Name === "Plot" ? null : (
                <li className="me-2">
                  <Link href="#specifications" className="nonActiveBar">
                    Specifications
                  </Link>
                </li>
              ))}

            {/*
            <li className="me-2">
              <Link href="#location" className="nonActiveBar">
                Location
              </Link>
            </li>
            */}
            <li className="me-2">
              <Link href="#faq" className="nonActiveBar">
                FAQ
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className={` ${styles.divideDetailPage} divideDetailPage`}>
        <div className={` ${styles.divideDetailPageLeft}`}>
          {listPropertiesData ? (
            <div
              // id="general"
              className={`${styles.generalDetails} GeneralDetails page`}
            >
              <div
                className={`${styles.BottomBoxcontenet} flex justify-between`}
              >
                <div>
                  <h2 className={`${styles.heroSectionBottomBoxHead} text-2xl`}>
                    {listPropertiesData.Title}
                  </h2>
                  <p className={`flex ${styles.heroSectionBottomBoxText}`}>
                    {" "}
                    <i className="bi bi-geo-alt-fill"></i>
                    <span className={`ml-1`}>
                      {listPropertiesData?.Address}
                    </span>
                  </p>
                </div>
                {listPropertiesData.Builder ? (
                  <Link href={`/builderFE/${listPropertiesData.Builder._id}`}>
                    <div className={`flex`}>
                      <div>
                        <img
                          className="mr-2"
                          height="50"
                          width="50"
                          src={
                            listPropertiesData?.Builder?.Logo
                              ? `${imgApiUrl}/${listPropertiesData?.Builder?.Logo}`
                              : "https://tse2.explicit.bing.net/th?id=OIP.9AeFX9VvFYTXrL5IwhGhYwHaHa&pid=Api&P=0&h=180"
                          }
                        />
                      </div>
                      <h2
                        className={`${styles.heroSectionBottomBoxHead} text-2xl mt-1`}
                      >
                        {listPropertiesData.Builder
                          ? listPropertiesData?.Builder.Name
                          : null}
                      </h2>
                    </div>
                  </Link>
                ) : (
                  <div className="flex">
                    <div>
                      <img
                        className="mr-2 mr-4"
                        height="90"
                        width="90"
                        src="../img/recLogoPng2.png"
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className={`${styles.heroSectionBottomMain}`}>
                <div className={`${styles.heroSectionBottomBox}`}>
                  <div className={`text-center ${styles.BottomBoxcontenet}`}>
                    <h2 className={`${styles.heroSectionBottomBoxHead}`}>
                      Price
                    </h2>
                    <p className={`${styles.heroSectionBottomBoxText}`}>
                      {" "}
                      {listPropertiesData.TotalPrice?.DisplayValue}
                    </p>
                  </div>
                  <div className={`${styles.heroSectionVL}`}></div>
                  <div className={`text-center  ${styles.BottomBoxcontenet}`}>
                    <h2 className={`${styles.heroSectionBottomBoxHead}`}>
                      Facing
                    </h2>
                    {listPropertiesData?.Facing?.map((item, index) => (
                      <p
                        key={index}
                        className={`${styles.heroSectionBottomBoxText}`}
                      >
                        {" "}
                        {item.Facing}
                      </p>
                    ))}
                  </div>
                  <div className={`${styles.heroSectionVL}`}></div>
                  <div className={`text-center  ${styles.BottomBoxcontenet}`}>
                    <h2 className={` ${styles.heroSectionBottomBoxHead}`}>
                      Property Type
                    </h2>
                    <p className={`${styles.heroSectionBottomBoxText}`}>
                      {listPropertiesData?.ProeprtyType}
                    </p>
                  </div>
                  <div className={`${styles.heroSectionVL}`}></div>
                  <div className={`text-center  ${styles.BottomBoxcontenet}`}>
                    <h2 className={`${styles.heroSectionBottomBoxHead}`}>
                      Property Subtype
                    </h2>
                    <p className={`${styles.heroSectionBottomBoxText}`}>
                      {listPropertiesData?.PropertySubtype?.Name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <LoadingText />
          )}
          {/* GeneralDetail */}
          <div
            id="general"
            className={`${styles.generalDetails} GeneralDetails page`}
          >
            <div className="GeneralDetailsMain">
              <h2 className={`${styles.GeneralDetailsMainHead}`}>
                {listPropertiesData.Title} General Details
              </h2>
              <div className={`${styles.GeneralDetailsBox}`}>
                <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-4 lg:grid-cols-4 gap-4 justify-center items-center">
                  {listPropertiesData?.PropertySubtype?.Name === "Plot" && (
                    <>
                      <div className="mb-2">
                        <p className={`${styles.GeneralDetailsBoxName}`}>
                          Plot Area:
                        </p>
                        <p className={`${styles.GeneralDetailsBoxValue}`}>
                          {listPropertiesData.PlotArea}{" "}
                          {listPropertiesData.AreaUnits}
                        </p>
                      </div>
                      <div className="mb-2">
                        <p className={`${styles.GeneralDetailsBoxName}`}>
                          Plot Length:
                        </p>
                        <p className={`${styles.GeneralDetailsBoxValue}`}>
                          {listPropertiesData.PlotLength} ft.
                        </p>
                      </div>
                      <div className="mb-2">
                        <p className={`${styles.GeneralDetailsBoxName}`}>
                          Plot Width:
                        </p>
                        <p className={`${styles.GeneralDetailsBoxValue}`}>
                          {listPropertiesData.Plotwidth} ft.
                        </p>
                      </div>
                    </>
                  )}
                  {listPropertiesData?.PropertySubtype?.Name !== "Plot" && (
                    <>
                      <div className="mb-2">
                        <p className={`${styles.GeneralDetailsBoxName}`}>
                          Built Up Area:
                        </p>
                        <p className={`${styles.GeneralDetailsBoxValue}`}>
                          {listPropertiesData.BuiltUpArea}{" "}
                          {listPropertiesData.LandAreaUnit}
                        </p>
                      </div>
                      <div className="mb-2">
                        <p className={`${styles.GeneralDetailsBoxName}`}>
                          Floor Number:
                        </p>
                        <p className={`${styles.GeneralDetailsBoxValue}`}>
                          {listPropertiesData.FloorNumber}
                        </p>
                      </div>
                      <div className="mb-2">
                        <p className={`${styles.GeneralDetailsBoxName}`}>
                          Total Floor:
                        </p>
                        <p className={`${styles.GeneralDetailsBoxValue}`}>
                          {listPropertiesData.TotalFloors}
                        </p>
                      </div>
                    </>
                  )}
                  <div className="mb-2">
                    <p className={`${styles.GeneralDetailsBoxName}`}>
                      Is Negotiable:
                    </p>
                    <p className={`${styles.GeneralDetailsBoxValue}`}>
                      {listPropertiesData?.IsNegotiable ? "Yes" : "No"}
                    </p>
                  </div>
                </div>

                {listPropertiesData ? (
                  <div>
                    <h2 className={`${styles.GeneralDetailsBoxBottomHead}`}>
                      Modern building in the hear of tribeca!
                    </h2>
                    <p className={`${styles.GeneralDetailsBoxBottomText}`}>
                      <ReadMore
                        text={listPropertiesData.Description}
                        maxLength={300}
                      />
                    </p>
                  </div>
                ) : (
                  <LoadingText />
                )}
              </div>
            </div>
          </div>

          {/* configure */}
          <div id="configure" className={`${styles.configure} configure page`}>
            <div className="configureMain">
              <h2 className={`${styles.configureMainHead}`}>
                {listPropertiesData.Title} Configuration And Floor Plan
              </h2>
              <div className={`${styles.configureBox}`}>
                <div
                  className={`mb-4 border-b border-gray-200 dark:border-gray-700`}
                >
                  <ul
                    className={`flex flex-wrap -mb-px text-sm font-medium text-center ${styles.configureBoxSize}`}
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
                        {listPropertiesData?.PropertySubtype
                          ? listPropertiesData?.PropertySubtype?.Name
                          : listPropertiesData?.BhkType?.Type}
                      </button>
                    </li>
                    {listPropertiesData?.FloorPlan ? (
                      <li className="me-2" role="presentation">
                        <button
                          className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                          id="floorplan-tab"
                          data-tabs-target="#floorplan"
                          type="button"
                          role="tab"
                          aria-controls="floorplan"
                          aria-selected="false"
                        >
                          Floor Plan
                        </button>
                      </li>
                    ) : (
                      <li
                        className={`${styles.displayNone}`}
                        role="presentation"
                      >
                        <button
                          className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                          id="floorplan-tab"
                          data-tabs-target="#floorplan"
                          type="button"
                          role="tab"
                          aria-controls="floorplan"
                          aria-selected="false"
                        >
                          {" "}
                          Plan
                        </button>
                      </li>
                    )}
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
                        Brochure
                      </button>
                    </li>

                    {listPropertiesData?.PaymentPlan ? (
                      <li className="me-2" role="presentation">
                        <button
                          className="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                          id="Payment-tab"
                          data-tabs-target="#Payment"
                          type="button"
                          role="tab"
                          aria-controls="Payment"
                          aria-selected="false"
                        >
                          Payment Plan
                        </button>
                      </li>
                    ) : (
                      <li
                        className={`${styles.displayNone}`}
                        role="presentation"
                      >
                        <button
                          className={`${styles.displayNone}`}
                          id="Payment-tab"
                          data-tabs-target="#Payment"
                          type="button"
                          role="tab"
                          aria-controls="Payment"
                          aria-selected="false"
                        >
                          Plan
                        </button>
                      </li>
                    )}

                    {listPropertiesData?.ProeprtyType ===
                    "Residential" ? null : (
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
                          Facilities
                        </button>
                      </li>
                    )}
                  </ul>
                </div>
                <div id="default-tab-content">
                  {/* profile */}
                  <div
                    className="hidden p-4 rounded-lg dark:bg-gray-800"
                    id="profile"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                  >
                    {listPropertiesData ? (
                      <div
                        className={`${styles.generalContent} grid md:grid-cols-2 gap-4 justify-center items-center`}
                      >
                        {listPropertiesData?.PropertySubtype?.Name !==
                          "Plot" && (
                          <>
                            <div className="">
                              <h1 className="font-semibold mr-2">Fencing </h1>
                              {listPropertiesData?.Fencing === "Other" ? (
                                <p className="text-gray-500 font-semibold">
                                  {listPropertiesData?.CustomFencing}
                                </p>
                              ) : (
                                <p className="text-gray-500 font-semibold">
                                  {listPropertiesData?.Fencing}
                                </p>
                              )}
                            </div>
                            <div className="">
                              <h1 className="font-semibold mr-2">Flooring</h1>
                              {listPropertiesData?.Flooring === "Other" ? (
                                <p className="text-gray-500 font-semibold">
                                  {listPropertiesData?.CustomFlooring}
                                </p>
                              ) : (
                                <p className="text-gray-500 font-semibold">
                                  {listPropertiesData?.Flooring}
                                </p>
                              )}
                            </div>

                            {listPropertiesData?.PropertySubtype?.Name ===
                              "Office" &&
                              listPropertiesData?.WallType && (
                                <div className="">
                                  <h1 className="font-semibold mr-2">
                                    Wall Type
                                  </h1>
                                  {listPropertiesData?.WallType === "Other" ? (
                                    <p className="text-gray-500 font-semibold">
                                      {listPropertiesData?.CustomWallType}
                                    </p>
                                  ) : (
                                    <p className="text-gray-500 font-semibold">
                                      {listPropertiesData?.WallType}
                                    </p>
                                  )}
                                </div>
                              )}

                            {(listPropertiesData?.PropertySubtype?.Name ===
                              "Office" ||
                              listPropertiesData?.PropertySubtype?.Name ===
                                "Warehouse") &&
                              listPropertiesData?.ZoneType && (
                                <div className="">
                                  <h1 className="font-semibold mr-2">
                                    Zone Type
                                  </h1>
                                  {listPropertiesData?.ZoneType === "Others" ? (
                                    <p className="text-gray-500 font-semibold">
                                      {listPropertiesData?.CustomZoneType}
                                    </p>
                                  ) : (
                                    <p className="text-gray-500 font-semibold">
                                      {listPropertiesData?.ZoneType}
                                    </p>
                                  )}
                                </div>
                              )}

                            {(listPropertiesData?.PropertySubtype?.Name ===
                              "Retail Shop" ||
                              listPropertiesData?.PropertySubtype?.Name ===
                                "Showroom") &&
                              listPropertiesData?.SuitableFor && (
                                <div className="">
                                  <h1 className="font-semibold mr-2">
                                    Suitable for
                                  </h1>
                                  {listPropertiesData?.SuitableFor ===
                                  "Others" ? (
                                    <p>{listPropertiesData?.CustomSuitable}</p>
                                  ) : (
                                    <p className="text-gray-500 font-semibold">
                                      {listPropertiesData?.SuitableFor}
                                    </p>
                                  )}
                                </div>
                              )}

                            {listPropertiesData?.ProeprtyType ===
                              "Commercial" &&
                              listPropertiesData?.LocationHub && (
                                <div className="">
                                  <h1 className="font-semibold mr-2">
                                    Suitable for
                                  </h1>
                                  {listPropertiesData?.LocationHub ===
                                  "Others" ? (
                                    <p className="text-gray-500 font-semibold">
                                      {listPropertiesData?.CustomLocationHub}
                                    </p>
                                  ) : (
                                    <p className="text-gray-500 font-semibold">
                                      {listPropertiesData?.LocationHub}
                                    </p>
                                  )}
                                </div>
                              )}
                          </>
                        )}
                        {listPropertiesData?.ProeprtyType === "Commercial" &&
                          listPropertiesData?.PropertySubtype?.Name !==
                            "Office" && (
                            <div className="">
                              <h1 className="font-semibold mr-2">
                                Owner Name{" "}
                              </h1>
                              {listPropertiesData?.OwnerName ? (
                                <p className="text-gray-500 font-semibold">
                                  {listPropertiesData?.OwnerName}
                                </p>
                              ) : null}
                            </div>
                          )}
                        {listPropertiesData?.PropertySubtype?.Name ===
                          "Plot" && (
                          <div className="">
                            <h1 className="font-semibold mr-2">Owner Name </h1>
                            {listPropertiesData?.OwnerName ? (
                              <p className="text-gray-500 font-semibold">
                                {listPropertiesData?.OwnerName}
                              </p>
                            ) : null}
                          </div>
                        )}
                      </div>
                    ) : (
                      <LoadingText />
                    )}{" "}
                  </div>
                  {/* floor plan */}
                  <div
                    className="hidden p-4 rounded-lg dark:bg-gray-800"
                    id="floorplan"
                    role="tabpanel"
                    aria-labelledby="floorplan-tab"
                  >
                    {listPropertiesData && listPropertiesData?.FloorPlan ? (
                      <div className={`${styles.configureFloorPlanImg}`}>
                        <h1 className="text-lg text-black underline font-bold mb-2">
                          Floor Plan
                        </h1>
                        <div>
                          {isImage(floorPlanData) ? (
                            <>
                              <img
                                src={
                                  !floorPlanData.includes("https")
                                    ? `${imgApiUrl}/${floorPlanData}`
                                    : floorPlanData
                                }
                                //  src={`${imgApiUrl}/${floorPlanData}`}
                                className="h-48 w-64 border border-black rounded-lg"
                                alt="Selected Floor Plan"
                              />
                            </>
                          ) : (
                            <>
                              <iframe
                                src={
                                  !floorPlanData.includes("https")
                                    ? `${imgApiUrl}/${floorPlanData}`
                                    : floorPlanData
                                }
                                //  src={`${imgApiUrl}/${floorPlanData}`}
                                className="h-48 w-64 border border-black rounded-lg"
                                alt="Selected Floor Plan"
                              />
                              <div className="mt-4">
                                <button
                                  type="button"
                                  onClick={handleDownloadFloorPlan}
                                  className="text-grey border border-gray-600 bg-white-700 hover:text-white focus:text-white hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-6 py-3 text-center dark:bg-blue-500 dark:hover:bg-blue-500 dark:focus:ring-blue-500"
                                >
                                  Download Plan
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    ) : (
                      <h1 className={` ${styles.noDataHead}`}>No Brochure</h1>
                    )}
                  </div>
                  {/* brochure tab */}
                  <div
                    className="hidden p-4 rounded-lg dark:bg-gray-800"
                    id="dashboard"
                    role="tabpanel"
                    aria-labelledby="dashboard-tab"
                  >
                    {listPropertiesData && listPropertiesData?.Brochure ? (
                      <div className={`${styles.configureFloorPlanImg}`}>
                        <h1 className="text-lg text-black underline font-bold mb-2">
                          Brochure{" "}
                        </h1>
                        <div>
                          <iframe
                            src={
                              !BrochureData.includes("https")
                                ? `${imgApiUrl}/${BrochureData}`
                                : BrochureData
                            }
                            // src={`${imgApiUrl}/${BrochureData}`}
                            className="h-48 w-64 border border-black rounded-lg"
                          />
                        </div>
                        <div className="mt-4">
                          <button
                            type="button"
                            onClick={handleDownload}
                            className="text-grey border border-gray-600 bg-white-700 hover:text-white focus:text-white hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-6 py-3 text-center dark:bg-blue-500 dark:hover:bg-blue-500 dark:focus:ring-blue-500"
                          >
                            Download Brochure
                          </button>
                        </div>
                      </div>
                    ) : (
                      <h1 className={` ${styles.noDataHead}`}>No Brochure</h1>
                    )}
                  </div>
                  {/* payment tab */}

                  <div
                    className="hidden p-4 rounded-lg dark:bg-gray-800"
                    id="Payment"
                    role="tabpanel"
                    aria-labelledby="Payment-tab"
                  >
                    <div className={`${styles.configureFloorPlanImg}`}>
                      <h1 className="text-lg text-black underline font-bold mb-2">
                        Payment Plan
                      </h1>
                      <div>
                        {isImage(PaymentPlanData) ? (
                          <>
                            <img
                              src={
                                !PaymentPlanData.includes("https")
                                  ? `${imgApiUrl}/${PaymentPlanData}`
                                  : PaymentPlanData
                              }
                              className="h-48 w-64 border border-black rounded-lg"
                              alt="Selected Payment Plan"
                            />
                          </>
                        ) : (
                          <>
                            <iframe
                              src={
                                !PaymentPlanData.includes("https")
                                  ? `${imgApiUrl}/${PaymentPlanData}`
                                  : PaymentPlanData
                              }
                              className="h-48 w-64 border border-black rounded-lg"
                              alt="Selected Payment Plan"
                            />
                            <div className="mt-4">
                              <button
                                type="button"
                                onClick={handleDownloadPlan}
                                className="text-grey border border-gray-600 bg-white-700 hover:text-white focus:text-white hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-6 py-3 text-center dark:bg-blue-500 dark:hover:bg-blue-500 dark:focus:ring-blue-500"
                              >
                                Download Plan
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* facilities tab */}
                  <div
                    className="hidden p-4 rounded-lg dark:bg-gray-800"
                    id="generall"
                    role="tabpanel"
                    aria-labelledby="generall-tab"
                  >
                    {listPropertiesData ? (
                      <div
                        className={`${styles.generalContent} grid md:grid-cols-2 gap-4 justify-center items-center`}
                      >
                        {listPropertiesData?.ProeprtyType === "Commercial" ? (
                          <>
                            <div className="">
                              <h1 className="font-semibold mr-2">
                                Tax & Govt. Charge
                              </h1>
                              {listPropertiesData?.TaxCharge ? (
                                <p className="text-gray-500 font-semibold">
                                  Included
                                </p>
                              ) : (
                                <p className="text-gray-500 font-semibold">
                                  Not included
                                </p>
                              )}
                            </div>
                            {listPropertiesData?.PropertySubtype?.Name ===
                              "Office" && (
                              <div className="">
                                <h1 className="font-semibold mr-2">
                                  DG & UPS charge
                                </h1>
                                {listPropertiesData?.DgUpsCharge ? (
                                  <p className="text-gray-500 font-semibold">
                                    Included
                                  </p>
                                ) : (
                                  <p className="text-gray-500 font-semibold">
                                    Not included
                                  </p>
                                )}
                              </div>
                            )}
                            <div className="">
                              <h1 className="font-semibold mr-2">Pre-Rented</h1>
                              {listPropertiesData?.LeasedOrRented ? (
                                <p className="text-gray-500 font-semibold">
                                  Yes
                                </p>
                              ) : (
                                <p className="text-gray-500 font-semibold">
                                  No
                                </p>
                              )}
                            </div>
                            {listPropertiesData?.LeasedOrRented ? (
                              <>
                                {" "}
                                <div className="">
                                  <h1 className="font-semibold mr-2">
                                    Rent per Month
                                  </h1>
                                  {listPropertiesData?.CurentRent ? (
                                    <p className="text-gray-500 font-semibold">
                                      {listPropertiesData?.CurentRent}
                                    </p>
                                  ) : (
                                    <p className="text-gray-500 font-semibold">
                                      -
                                    </p>
                                  )}
                                </div>
                                <div className="">
                                  <h1 className="font-semibold mr-2">
                                    Lease Years
                                  </h1>
                                  {listPropertiesData?.LeaseYears ? (
                                    <p className="text-gray-500 font-semibold">
                                      {listPropertiesData?.LeaseYears}
                                    </p>
                                  ) : (
                                    <p className="text-gray-500 font-semibold">
                                      -
                                    </p>
                                  )}
                                </div>
                              </>
                            ) : (
                              <div className="">
                                <h1 className="font-semibold mr-2">
                                  Expected Return
                                </h1>
                                {listPropertiesData?.ExpectedReturn ? (
                                  <p className="text-gray-500 font-semibold">
                                    {listPropertiesData?.ExpectedReturn}
                                  </p>
                                ) : (
                                  <p className="text-gray-500 font-semibold">
                                    -
                                  </p>
                                )}
                              </div>
                            )}
                            <div className="">
                              <h1 className="font-semibold mr-2">
                                Public Parking{" "}
                              </h1>
                              {listPropertiesData?.PublicParking ? (
                                <p className="text-gray-500 font-semibold">
                                  {listPropertiesData?.PublicParking}
                                </p>
                              ) : (
                                <p className="text-gray-500 font-semibold">-</p>
                              )}
                            </div>
                            <div className="">
                              <h1 className="font-semibold mr-2">
                                Private Parking
                              </h1>
                              {listPropertiesData?.PrivateParking ? (
                                <p className="text-gray-500 font-semibold">
                                  {listPropertiesData?.PrivateParking}
                                </p>
                              ) : (
                                <p className="text-gray-500 font-semibold">-</p>
                              )}
                            </div>

                            {listPropertiesData?.PropertySubtype?.Name ===
                            "Office" ? (
                              <>
                                <div className="">
                                  <h1 className="font-semibold mr-2">
                                    DG & UPS charge
                                  </h1>
                                  {listPropertiesData?.DgUpsCharge ? (
                                    <p className="text-gray-500 font-semibold">
                                      Included
                                    </p>
                                  ) : (
                                    <p className="text-gray-500 font-semibold">
                                      Not included
                                    </p>
                                  )}
                                </div>
                                <div className="">
                                  <h1 className="font-semibold mr-2">
                                    No. of StairCase
                                  </h1>
                                  {listPropertiesData?.Staircase ? (
                                    <p className="text-gray-500 font-semibold">
                                      {listPropertiesData?.Staircase}
                                    </p>
                                  ) : (
                                    <p className="text-gray-500 font-semibold">
                                      -
                                    </p>
                                  )}
                                </div>
                                <div className="">
                                  <h1 className="font-semibold mr-2">
                                    Passengers Lift
                                  </h1>
                                  {listPropertiesData?.passengerLifts ? (
                                    <p className="text-gray-500 font-semibold">
                                      {listPropertiesData?.passengerLifts}
                                    </p>
                                  ) : (
                                    <p className="text-gray-500 font-semibold">
                                      -
                                    </p>
                                  )}
                                </div>
                                <div className="">
                                  <h1 className="font-semibold mr-2">
                                    Service Lift
                                  </h1>
                                  {listPropertiesData?.ServiceLifts ? (
                                    <p className="text-gray-500 font-semibold">
                                      {listPropertiesData?.ServiceLifts}
                                    </p>
                                  ) : (
                                    <p className="text-gray-500 font-semibold">
                                      -
                                    </p>
                                  )}
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="">
                                  <h1 className="font-semibold mr-2">
                                    Public Washroom
                                  </h1>
                                  {listPropertiesData?.PublicWashroom ? (
                                    <p className="text-gray-500 font-semibold">
                                      {listPropertiesData?.PublicWashroom}
                                    </p>
                                  ) : (
                                    <p className="text-gray-500 font-semibold">
                                      -
                                    </p>
                                  )}
                                </div>
                                <div className="">
                                  <h1 className="font-semibold mr-2">
                                    Private Washroom
                                  </h1>
                                  {listPropertiesData?.PrivateWashroom ? (
                                    <p className="text-gray-500 font-semibold">
                                      {listPropertiesData?.PrivateWashroom}
                                    </p>
                                  ) : (
                                    <p className="text-gray-500 font-semibold">
                                      -
                                    </p>
                                  )}
                                </div>
                              </>
                            )}
                          </>
                        ) : (
                          <div className="">
                            <h1 className="font-semibold mr-2">Owner Name </h1>
                            {listPropertiesData?.OwnerName ? (
                              <p className="text-gray-500 font-semibold">
                                {listPropertiesData?.OwnerName}
                              </p>
                            ) : null}
                          </div>
                        )}
                      </div>
                    ) : (
                      <LoadingText />
                    )}{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* overview */}
          <div id="overview" className={`${styles.overview} overview page`}>
            <div className="overviewMain">
              <h2 className={`${styles.overviewMainHead}`}>
                {listPropertiesData.Title} Overview
              </h2>
              <div className={`${styles.overviewBox}`}>
                {listPropertiesData ? (
                  <div className={`${styles.overviewBoxMain}`}>
                    {listPropertiesData?.PropertySubtype?.Name !== "Plot" ? (
                      <>
                        <div className={`${styles.overviewBoxMainContent}`}>
                          <h2
                            className={`${styles.overviewBoxMainContentHead}`}
                          >
                            Land Area
                          </h2>
                          <p className={`${styles.overviewBoxMainContentText}`}>
                            {listPropertiesData.LandArea}{" "}
                            {listPropertiesData.LandAreaUnit}
                          </p>
                        </div>
                        <div className={`${styles.overviewBoxMainContent}`}>
                          <h2
                            className={`${styles.overviewBoxMainContentHead}`}
                          >
                            Carpet Area
                          </h2>
                          {listPropertiesData.CarpetArea ? (
                            <p
                              className={`${styles.overviewBoxMainContentText}`}
                            >
                              {listPropertiesData.CarpetArea}{" "}
                              {listPropertiesData.LandAreaUnit}
                            </p>
                          ) : (
                            "-"
                          )}
                        </div>
                        <div className={`${styles.overviewBoxMainContent}`}>
                          <h2
                            className={`${styles.overviewBoxMainContentHead}`}
                          >
                            Entrance Width
                          </h2>
                          {listPropertiesData.EntranceWidth ? (
                            <p
                              className={`${styles.overviewBoxMainContentText}`}
                            >
                              {listPropertiesData.EntranceWidth}.ft
                            </p>
                          ) : (
                            "-"
                          )}
                        </div>
                        <div className={`${styles.overviewBoxMainContent}`}>
                          <h2
                            className={`${styles.overviewBoxMainContentHead}`}
                          >
                            Celling height
                          </h2>
                          {listPropertiesData.CellingHeight ? (
                            <p
                              className={`${styles.overviewBoxMainContentText}`}
                            >
                              {listPropertiesData.CellingHeight}.ft
                            </p>
                          ) : (
                            "-"
                          )}
                        </div>
                        <div className={`${styles.overviewBoxMainContent}`}>
                          <h2
                            className={`${styles.overviewBoxMainContentHead}`}
                          >
                            Age of Property
                          </h2>
                          {listPropertiesData.AgeofProperty ? (
                            <p
                              className={`${styles.overviewBoxMainContentText}`}
                            >
                              {listPropertiesData.AgeofProperty}
                            </p>
                          ) : (
                            "-"
                          )}
                        </div>
                      </>
                    ) : null}
                    {/*
                    <div className={`${styles.overviewBoxMainContent}`}>
                      <h2 className={`${styles.overviewBoxMainContentHead}`}>
                        Size
                      </h2>
                      <p className={`${styles.overviewBoxMainContentText}`}>
                      {
                        listPropertiesData?.AreaUnits?.InSquareMeter
                    }{" "}{listPropertiesData?.AreaUnits?.Unit}
                      </p>
                    </div>
                    */}
                    {/* {listPropertiesData?.CurentRent ? (
                      <div className={`${styles.overviewBoxMainContent}`}>
                        <h2 className={`${styles.overviewBoxMainContentHead}`}>
                          Avg. Price
                        </h2>
                        <p className={`${styles.overviewBoxMainContentText}`}>
                          {convertSystem(listPropertiesData.CurentRent)} per
                          month
                        </p>
                      </div>
                    ) : null} */}
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
                    {listPropertiesData?.PropertyStatus?.Status ? (
                      <div className={`${styles.overviewBoxMainContent}`}>
                        <h2 className={`${styles.overviewBoxMainContentHead}`}>
                          Property Status
                        </h2>
                        <p className={`${styles.overviewBoxMainContentText}`}>
                          {listPropertiesData?.PropertyStatus?.Status}
                        </p>
                      </div>
                    ) : null}
                    <div className={`${styles.overviewBoxMainContent}`}>
                      <h2 className={`${styles.overviewBoxMainContentHead}`}>
                        Ownership Type
                      </h2>
                      <p className={`${styles.overviewBoxMainContentText}`}>
                        {listPropertiesData?.OwnershipType?.Ownership}
                      </p>
                    </div>
                    {listPropertiesData?.Furnished?.Furnished ? (
                      <div className={`${styles.overviewBoxMainContent}`}>
                        <h2 className={`${styles.overviewBoxMainContentHead}`}>
                          Furnished
                        </h2>
                        <p className={`${styles.overviewBoxMainContentText}`}>
                          {listPropertiesData?.Furnished?.Furnished}
                        </p>
                      </div>
                    ) : null}
                    <div className={`${styles.overviewBoxMainContent}`}>
                      <h2 className={`${styles.overviewBoxMainContentHead}`}>
                        Possession Status
                      </h2>
                      <p className={`${styles.overviewBoxMainContentText}`}>
                        {listPropertiesData?.PosessionStatus?.Possession}
                      </p>
                    </div>
                    {/*
                    <div className={`${styles.overviewBoxMainContent}`}>
                      <h2 className={`${styles.overviewBoxMainContentHead}`}>
                        RERA Number
                      </h2>
                      <p className={`${styles.overviewBoxMainContentText}`}>
                        {listPropertiesData?.ReraNumber}
                      </p>
                    </div>
                    */}
                  </div>
                ) : (
                  <LoadingText />
                )}
                <div className={`${styles.overviewBoxBottomMain}`}>
                  <button
                    type="button"
                    onClick={modalButton}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-6 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Ask For Detail
                  </button>
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
                            <i className="bi bi-link-45deg mr-2"></i> Copy Url
                          </button>
                          <button
                            onClick={handleRedirect}
                            className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            <i className="bi bi-facebook mr-2"></i>Facebook
                          </button>
                          <button
                            onClick={handleRedirectTwitter}
                            className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            <i className="bi bi-twitter mr-2"></i>Twitter
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
                </div>
              </div>
            </div>
          </div>

          {/* amenities */}

          <div id="amenities" className={`${styles.amenities} amenities page`}>
            <div className="amenitiesMain">
              <h2 className={`${styles.amenitiesMainHead}`}>
                {listPropertiesData.Title} Amenities & Features
              </h2>
              <div className={`${styles.amenitiesBox}`}>
                <Accordion className="border-none">
                  <AccordionPanel>
                    <AccordionTitle>Amenities</AccordionTitle>

                    <AccordionContent className={` ${styles.AccordionContent}`}>
                      {listPropertiesData &&
                      listPropertiesData?.Aminities.length > 0 ? (
                        <div
                          className={`grid gap-4 mb-4 sm:grid-cols-5 md:grid-cols-4  ${styles.AccordionContentInner}`}
                        >
                          {listPropertiesData?.Aminities?.map((item, index) => (
                            <div key={index} className=" p-4">
                              <img
                                className={`${styles.amenitiesIconBox}`}
                                src={
                                  !item.Icon.includes("https")
                                    ? `${imgApiUrl}/${item.Icon}`
                                    : item.Icon
                                }
                                width="22"
                                height="22"
                              />
                              <p className="wrap text-center text-sm pt-2">
                                {item.Aminity}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <h1 className={` ${styles.noDataHead}`}>
                          No Amenities
                        </h1>
                      )}
                    </AccordionContent>
                  </AccordionPanel>

                  <AccordionPanel>
                    <AccordionTitle>Features</AccordionTitle>

                    <AccordionContent className={`${styles.AccordionContent}`}>
                      {listPropertiesData &&
                      listPropertiesData?.Features.length > 0 ? (
                        <div
                          className={`grid gap-4 mb-4 sm:grid-cols-5 md:grid-cols-4  ${styles.AccordionContentInner2}`}
                        >
                          {listPropertiesData?.Features?.map((item, index) => (
                            <div key={index} className="p-4 justify-between">
                              <img
                                className={`${styles.amenitiesIconBox}`}
                                src={
                                  !item.Icon.includes("https")
                                    ? `${imgApiUrl}/${item.Icon}`
                                    : item.Icon
                                }
                                width="22"
                                height="22"
                              />
                              <p className="wrap text-center text-sm pt-2">
                                {item.Feature}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <h1 className={` ${styles.noDataHead}`}>No Features</h1>
                      )}
                    </AccordionContent>
                  </AccordionPanel>
                </Accordion>
              </div>
            </div>
          </div>

          {/* bank */}
          {/*

          <div id="bank" className={`${styles.bank} bank page`}>
            <div className="bankMain">
              <h2 className={`${styles.bankMainHead}`}>BANK LOAN OFFERS</h2>
              <div className={`${styles.bankBox}`}>
                {loanDetails?.ByBank?.length > 0 ? (
                  <MultiCarousel UI={ShowBank} />
                ) : (
                  <SkeletonLoader />
                )}
              </div>
            </div>
          </div>
          */}

          {/* Specifications */}
          {listPropertiesData?.ProeprtyType == "Residential" &&
          listPropertiesData?.PropertySubtype?.Name !== "Plot" ? (
            listPropertiesData?.Fitting?.Electrical == "" &&
            listPropertiesData?.Fitting?.Toilets == "" &&
            listPropertiesData?.Fitting?.Kitchen == "" &&
            listPropertiesData?.Fitting?.Doors == "" &&
            listPropertiesData?.Fitting?.Windows == "" ? null : (
              <div
                id="specifications"
                className={` ${styles.faq} faq mt-16 page`}
              >
                <div className={` ${styles.faqMain}`}>
                  <h2 className={`${styles.amenitiesMainHead}`}>
                    {listPropertiesData.Title} Specifications
                  </h2>
                </div>
                <div className={`${styles.amenitiesBox}`}>
                  <div className={` ${styles.faqLeft}`}>
                    <Accordion className="border-none">
                      {/*<AccordionPanel>
                    <AccordionTitle>Floor & Counter</AccordionTitle>
                    {listPropertiesData ? (
                      <AccordionContent
                        className={`${styles.AccordionContent}`}
                      >
                        <div className="mr-6 p-4">
                          <span className="mb-2 text-gray-500 dark:text-gray-400 text-sm">
                            Dining
                          </span>
                          <p className="">
                            {listPropertiesData?.FloorAndCounter?.Dining}
                          </p>
                        </div>
                        <div className="mr-6 p-4">
                          <span className="mb-2 text-gray-500 dark:text-gray-400 text-sm">
                            Master Bedroom
                          </span>
                          <p className="">
                            {listPropertiesData?.FloorAndCounter?.MasterBedroom}
                          </p>
                        </div>
                        <div className="mr-6 p-4">
                          <span className="mb-2 text-gray-500 dark:text-gray-400 text-sm">
                            Other Bedroom
                          </span>
                          <p className="">
                            {listPropertiesData?.FloorAndCounter?.OtherBedroom}
                          </p>
                        </div>
                        <div className="mr-6 p-4">
                          <span className="mb-2 text-gray-500 dark:text-gray-400 text-sm">
                            Kitchen
                          </span>
                          <p className="">
                            {listPropertiesData?.FloorAndCounter?.Kitchen}
                          </p>
                        </div>
                        <div className="mr-6 p-4">
                          <span className="mb-2 text-gray-500 dark:text-gray-400 text-sm">
                            Balcony
                          </span>
                          <p className="">
                            {listPropertiesData?.FloorAndCounter?.Balcony}
                          </p>
                        </div>
                        <div className="mr-6 p-4">
                          <span className="mb-2 text-gray-500 dark:text-gray-400 text-sm">
                            Toilets
                          </span>
                          <p className="">
                            {listPropertiesData?.FloorAndCounter?.Toilets}
                          </p>
                        </div>
                      </AccordionContent>
                    ) : (
                      <LoadingText />
                    )}
                  </AccordionPanel>  */}
                      <AccordionPanel>
                        <AccordionTitle>Fitting</AccordionTitle>
                        {listPropertiesData ? (
                          <AccordionContent
                            className={`${styles.AccordionContent}`}
                          >
                            {listPropertiesData?.Fitting ? (
                              <div className="grid grid-cols-3 gap-2">
                                {listPropertiesData?.Fitting?.Electrical ? (
                                  <div className="mr-6 p-4">
                                    <span className="mb-2 text-gray-500 dark:text-gray-400 text-sm">
                                      Electrical
                                    </span>
                                    <p className="">
                                      {listPropertiesData?.Fitting?.Electrical}
                                    </p>
                                  </div>
                                ) : null}
                                {listPropertiesData?.Fitting?.Toilets ? (
                                  <div className="mr-6 p-4">
                                    <span className="mb-2 text-gray-500 dark:text-gray-400 text-sm">
                                      Toilets
                                    </span>
                                    <p className="">
                                      {listPropertiesData?.Fitting?.Toilets}
                                    </p>
                                  </div>
                                ) : null}
                                {listPropertiesData?.Fitting?.Kitchen ? (
                                  <div className="mr-6 p-4">
                                    <span className="mb-2 text-gray-500 dark:text-gray-400 text-sm">
                                      Kitchen
                                    </span>
                                    <p className="">
                                      {listPropertiesData?.Fitting?.Kitchen}
                                    </p>
                                  </div>
                                ) : null}
                                {listPropertiesData?.Fitting?.Doors ? (
                                  <div className="mr-6 p-4">
                                    <span className="mb-2 text-gray-500 dark:text-gray-400 text-sm">
                                      Doors
                                    </span>
                                    <p className="">
                                      {listPropertiesData?.Fitting?.Doors}
                                    </p>
                                  </div>
                                ) : null}
                                {listPropertiesData?.Fitting?.Windows ? (
                                  <div className="mr-6 p-4">
                                    <span className="mb-2 text-gray-500 dark:text-gray-400 text-sm">
                                      Windows
                                    </span>
                                    <p className="">
                                      {listPropertiesData?.Fitting?.Windows}
                                    </p>
                                  </div>
                                ) : null}
                              </div>
                            ) : (
                              <h1 className={` ${styles.noDataHead}`}>
                                No Data Found
                              </h1>
                            )}
                          </AccordionContent>
                        ) : (
                          <LoadingText />
                        )}
                      </AccordionPanel>
                      {/*<AccordionPanel>
                    <AccordionTitle>Wall & Ceiling</AccordionTitle>
                    {listPropertiesData ? (
                      <AccordionContent
                        className={`${styles.AccordionContent}`}
                      >
                        <div className="mr-6 p-4">
                          <span className="mb-2 text-gray-500 dark:text-gray-400 text-sm">
                            Interior
                          </span>
                          <p className="">
                            {listPropertiesData?.WallAndCeiling?.Interior}
                          </p>
                        </div>
                        <div className="mr-6 p-4">
                          <span className="mb-2 text-gray-500 dark:text-gray-400 text-sm">
                            Exterior
                          </span>
                          <p className="">
                            {listPropertiesData?.WallAndCeiling?.Exterior}
                          </p>
                        </div>
                        <div className="mr-6 p-4">
                          <span className="mb-2 text-gray-500 dark:text-gray-400 text-sm">
                            Kitchen
                          </span>
                          <p className="">
                            {listPropertiesData?.WallAndCeiling?.Kitchen}
                          </p>
                        </div>
                        <div className="mr-6 p-4">
                          <span className="mb-2 text-gray-500 dark:text-gray-400 text-sm">
                            Toilets
                          </span>
                          <p className="">
                            {listPropertiesData?.WallAndCeiling?.Toilets}
                          </p>
                        </div>
                      </AccordionContent>
                    ) : (
                      <LoadingText />
                    )}
                  </AccordionPanel> */}
                    </Accordion>
                  </div>
                </div>
              </div>
            )
          ) : null}
          {/* location
          <div id="location" className={`${styles.location} location page`}>
            <div className="locationMain">
              <h2 className={`${styles.locationMainHead}`}>LOCATION</h2>
              <div className={`${styles.locationBox}`}>
                <div>
                  {listPropertiesData ? (
                    <iframe
                      width="600"
                      height="300"
                      frameBorder="0"
                      className={styles.locationMapSize}
                      src={mapSrc}
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <LoadingImg />
                  )}
                </div>
              </div>
            </div>
          </div>
          */}
          {/* FAQ */}
          <div id="faq" className={`${styles.amenities} amenities mb-4 page`}>
            <div className={` ${styles.faq} faq`}>
              <div className={` ${styles.faqMain}`}>
                <h2 className={`${styles.amenitiesMainHead}`}>
                  {listPropertiesData.Title} Frequently Asked Question
                </h2>
              </div>
              <div className={`${styles.amenitiesBox}`}>
                {listPropertiesData?.Faq ? (
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
                ) : (
                  <div className={`${styles.loaderfaqSize}`}>
                    <LoadingText className={`${styles.loaderfaqSize}`} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={` ${styles.divideDetailPageRight}`}>
          <div className="GeneralDetailsMain">
            <h2 className={`${styles.GeneralDetailsMainHead}`}>
              EMI CALCULATOR
            </h2>
            <PersonalLoanCalculator />
          </div>
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
                <div className={`mb-5`}>
                  <DayPicker
                    mode="single"
                    selected={EnquiryData}
                    onDayClick={handleEnquiryData}
                    className={`${styles.rdp}`}
                    modifiers={{
                      disabled: { before: new Date() }, // Disable dates before today
                    }}
                    modifiersStyles={{
                      selected: {
                        backgroundColor: "gray",
                        color: "white",
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
      {listDataConst && listDataConst?.data.length > 0 ? (
        <div className={`${styles.similarMainType}`}>
          <div id="similar" className={`${styles.similar} similar`}>
            <div className="similarMain">
              <h2 className={`${styles.similarMainHead}`}>
                SIMILAR PROPERTIES
              </h2>
              <div
                className={` ${styles.populerPropertiesBoxMain} flex flex-wrap mt-4 mb-6 `}
              >
                {listDataConst?.data?.length > 0 ? (
                  <MultiCarousel UI={ShowPopularProperties} />
                ) : (
                  <SkeletonLoader />
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {/* <div>
      <PersonalLoanCalculator/>
      </div> */}
      <Footer />
      {listPropertiesData.Builder ? (
        <Link href={`/builderFE/${listPropertiesData.Builder._id}`}>
          <button className={styles.stickyButton}>
            <img
              className={styles.buttonImage}
              src={
                listPropertiesData?.Builder?.Logo
                  ? `${imgApiUrl}/${listPropertiesData?.Builder?.Logo}`
                  : "https://tse2.explicit.bing.net/th?id=OIP.9AeFX9VvFYTXrL5IwhGhYwHaHa&pid=Api&P=0&h=180"
              }
              alt="Button Image"
            />
          </button>
        </Link>
      ) : null}

      <Modal
        dismissible
        className={`bg-transparent/[.8] `}
        size="lg"
        show={openModal}
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header>Ask For Detail</Modal.Header>
        <Modal.Body>
          <div className={`${styles.contactLeftFormData}`}>
            <div className="mb-6 mt-3">
              <label>Your Name</label>
              <input
                type="text"
                value={contactName}
                onChange={handlecontactNameChange}
                id="Name"
                className="bg-gray-50 border rounded-md border-blue-700 text-gray-900 text-sm focus:ring-blue-700 focus:border-blue-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label>Your Email</label>
              <input
                type="email"
                value={contactEmail}
                onChange={handlecontactEmailChange}
                id="email"
                className="bg-gray-50 border rounded-md border-blue-700 text-gray-900 text-sm focus:ring-blue-700 focus:border-blue-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label>Your Phone</label>
              <input
                type="text"
                value={contactMolileNumber}
                onChange={handlecontactPhoneChange}
                id="Phone"
                className="bg-gray-50 border rounded-md border-blue-700 text-gray-900 text-sm  focus:ring-blue-700 focus:border-blue-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label>Your Message</label>
              <textarea
                type="text"
                value={contactMessage}
                onChange={handlecontactMessageChange}
                id="Message"
                className="bg-gray-50 border rounded-md border-blue-700 text-gray-900 text-sm focus:ring-blue-700 focus:border-blue-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className={` ${styles.agentRightMainContenBtn} text-white rounded-md bg-blue-700 h-12 w-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm w-full sm:w-auto px-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
            type="button"
            onClick={addcontactEnquiryData}
          >
            Send
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PropertyDetail;

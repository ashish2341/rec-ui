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
import { Avatar, Blockquote } from "flowbite-react";
import { Card } from "flowbite-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useFetch from "@/customHooks/useFetch";
import { API_BASE_URL, API_BASE_URL_FOR_MASTER } from "@/utils/constants";
import { addEnquiry } from "@/api-functions/enquiry/addEnquiry";
import { toast } from "react-toastify";
import MultipleItems from "@/components/common/ImageSlider";
import Link from "next/link";
import MultiCarousel from "@/components/common/carousel";
import { Button, Modal } from "flowbite-react";
import Spinner from "@/components/common/loading";
import SkeletonLoader from "@/components/common/loader";
import SearchBar from "./search";
import LoadingImg from "@/components/common/loadingImg";

export default function Home() {
 
  
   
 
  const slider = useRef(null);
  const sliderTestimonial = useRef(null);
  const populerPropertiesslider = useRef(null);
  const [Name, setName] = useState("");
  const [ZodiacName, setZodaicName] = useState("");
  const [Dob, setDob] = useState("");
  const [search, setSearch] = useState("");
  const [Email, setEmail] = useState("");
  const [Message, setMessage] = useState("");
  const [MolileNumber, setPhone] = useState("");
  const [EnquiryData, setEnquiryData] = useState("");
  const [EnquiryType, setEnquiryType] = useState("Project");
  const [openModal, setOpenModal] = useState(false);
  const [isLoading,setIsLoading]=useState(true)


  const facingImage = [
    "/img/EastImage.jpeg",
    "/img/WestImage.jpeg",
    "/img/NorthImage.jpeg",
    "/img/SouthImage.jpeg",
  ];

  const facingSubHeading =[
    "Eastward Bound: Discover Homes with the Rising Sun",
    "Twilight Haven: Western-Facing Residences",
    "Northern Comforts: Find Your Haven in Homes Facing North",
    "Southern Serenity: Seek Solace in Homes Facing South"
  ]

 // fetching Data for facing
  const {
    data: facingData,
    loading: facingDataLoading,
    error: facingDataError,
  } = useFetch(`${API_BASE_URL_FOR_MASTER}/facing`);
  console.log("facingData", facingData);

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
  console.log("propertyByType",propertyByapartmentType)
  const {
    data: propertyByPopularProperty,
    loading: popularPropertiesLoading,
    error: popularPropertiesError,
  } = useFetch(`${API_BASE_URL}/properties/popularProperty`);
  const {
    data: propertyByAllPropertiesProperty,
    loading: propertyByAllPropertiesLoading,
    error: propertyByAllPropertiesError,
  } = useFetch(`${API_BASE_URL}/properties/allProperties?page=1&pageSize=5&search=${search}`);
  const {
    data: propertyByZodaicProperty,
    loading: propertyByZodaicLoading,
    error: propertyByZodaicError,
  } = useFetch(`${API_BASE_URL}/properties/zodiac/${Dob}`);
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

  const {
    data: blogData,
    loading:blogDataLoading,
    error:blogDataError,
  } = useFetch(`${API_BASE_URL}/blog/allblog?page=1&pageSize=5`);

  const {
    data: bannerData,
    loading:bannerDataLoading,
    error:bannerDataError,
  } = useFetch(`${API_BASE_URL}/banner/allbanner?page=1&pageSize=5`);
  console.log("bannerData",bannerData);
  const ShowApartmentProperties = () => {
     
    return propertyByapartmentType?.data?.map((item,index) => (
      <Link key={index}  href={`/propertyList/propertyTypeId=${item._id}`} >
        <div 
          className="p-1"
        >
          <div className={` ${styles.apartmentTypeBox} border-gray-300 rounded-md`}>
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
      ))
    
  }

  const ShowPopularProperties = () => {
    return propertyByPopularProperty?.data?.map((item,index) => (
            
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
  }

  const currentDate = new Date().toISOString().slice(0, 10);
  console.log("currentDate",currentDate);
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
    if (MolileNumber === ""){
      toast.error("Number is required");
      return false;
    }
    setEnquiryData(currentDate);
    let payload = { Name, Email, Message, MolileNumber, EnquiryData, EnquiryType };
    let res = await addEnquiry(payload)
    console.log('payload',res)
     if(res?.resData?.success == true){
       toast.success("Your Query Is being Generated");
       setName("");
       setPhone("");
       setMessage("");
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
  const handleDob = (value) => {
    setDob(() => value.target.value);
  };
  const handleSearch = (e) => {
    setSearch(e.target.value)
  }
  const handleZodiacName = (e) => {
    setZodaicName(e.target.value)
  }
  const resetValue = () => {
    if(Dob=="" || ZodiacName==""){
      toast.error("Please fill Dob & Name Field.")
      return false
    }
    setOpenModal(true);
  };

  const onResetValue =() => {
    setOpenModal(false);
    setZodaicName("")
    setDob("")
  }
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
      {/* {isLoading && <Spinner />} */}
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
                  <SearchBar />
                </div>
              </div>
              <div className={`${styles.crousalItemRightMain}`}>
                {bannerData ?
                  <img
                  src={bannerData?.data[0].Url}
                  className={`${styles.crousalItemLeftImage} block`}
                  alt="...a"
                /> : <Spinner />
                }
              </div>
            </div>
          </div>
          <div className="hidden duration-700 ease-in-out" data-carousel-item>
          <SearchBar />
            <img
              src={bannerData?.data[1].Url}
              className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt="...a"
            />
          </div>
          <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <img
              src={bannerData?.data[2].Url}
              className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt="...a"
            />
          </div>
          <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <img
              src={bannerData?.data[3].Url}
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
             {facingData
              ? facingData.data.slice(0, 4).map((item,index) => (
                
                <Link key={index} href={`/propertyList/facingId=${item._id}`}>
                  <div
                    className={` ${styles.campassRightBox} border-gray-300 rounded-md`}
                  >
                      <div>
                        <div>
                          <img
                            className={` ${styles.campassRightBoxImg}`}
                            src={facingImage[index]}
                            alt=""
                          />
                        </div>
                      </div>
                      <div>
                        <h2 className={` ${styles.campassRightBoxHead}`}>
                          {item.Facing}
                        </h2>
                        <p className={` ${styles.campassRightBoxText}`}>
                          {facingSubHeading[index]}
                        </p>
                      </div>
                    
                  </div>
                  </Link>
                ))
              : <SkeletonLoader />}
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
            {/* <a
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
            </a> */}
          </div>
        </div>
        {propertyByAreaData ? (
        <div className={` ${styles.propertiesByAreaBoxMain} flex flex-wrap `}>
          {propertyByAreaData?.data?.map((item,index) => (
            
          <div key={index}
            className={` ${styles.propertiesByAreaBox} border border-gray-300 rounded-md`}
          >
            <Link href={`/propertyList/areaTypeId=${item._id}`}>
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
        ) : <SkeletonLoader />}
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
            {/* <div className="flex flex-wrap">
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
            </div> */}
          </div>
        </div>
        <div className={`flex`} >
        {/* { propertyByapartmentType?.data?.map((item,index) => (
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
          ))} */}
          {
           propertyByapartmentType?.data?.length>0 ? <MultiCarousel UI={ShowApartmentProperties} /> : <SkeletonLoader />
          }
          
        </div>
      </div>

        

      <div className={`${styles.buyingOptionWithZodic}`}>
        <div className={`${styles.buyingWithZodicMain}`}>
          <div className={`${styles.buyingZodicLeft}`}>
            <div>
              <h2 className={`${styles.buyingZodicHead}`}>
                Let's Find The Right Buying Option With{" "}
                <span className="blueText">Zodiac</span>
              </h2>
              <p className={`${styles.buyingZodicText}`}>
              Unlock the door to your dream home with Zodiac.
              Let's embark on this journey together and discover your perfect home. 
              Welcome to Zodiac, where dreams come true.
              </p>
            </div>
            <div className={`${styles.buyingZodicInputMain}`}>
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    value={ZodiacName}
                    onChange={handleZodiacName}
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
                    Date Of Birth
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
                onClick={resetValue}
              >
                Get Started
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
            Discover Popular <span className="blueText">Properties</span>
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
        <div className={` ${styles.populerPropertiesBoxMain} flex flex-wrap mt-4 `}>
          {
           propertyByPopularProperty?.data?.length>0 ? <MultiCarousel UI={ShowPopularProperties} /> : <SkeletonLoader />
          }     
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
            Exploring Essentials: Frequently Posed Inquiries
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
            <div key={index} className={`${styles.testimonialcontent} flex justify-center`}>
              <div className={`${styles.testimonialLeft}`}>
                <div className={`${styles.testimonialLeftBoxDetails}`}>
                  <img
                    height="100"
                    width="150"
                    className={` ${styles.testimonialImg}  mb-3`}
                    src="../img/black-wallpaper-1.jpg"
                    alt="test"
                  />
                  <h2 className={`${styles.testimonialLeftHead} justify-center`}>
                    {item.MemberName}
                  </h2>
                  <div className="flex justify-center">
                  <p className={`${styles.testimonialLeftText}`}>
                    {item.Description}
                  </p>
                  </div>
                  <div>
                    <div className={`${styles.testimonialStars} flex justify-center`}>
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
                    <div className="flex mt-4 justify-center">
                    <button
                        type="button"
                        onClick={() => sliderTestimonial?.current?.slickPrev()}
                        className={` ${styles.apartmentTypeLeftArrowBtn}  z-30 flex justify-center px-4 cursor-pointer group focus:outline-none`}
                      >
                          <i
                            className={` ${styles.apartmentTypeArrowIcon} bi bi-arrow-left `}
                          ></i>
                          <span className="sr-only">Previous</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => sliderTestimonial?.current?.slickNext()}
                        className={` ${styles.apartmentTypeLeftArrowBtn}  z-30 flex justify-center px-4 cursor-pointer group focus:outline-none`}
                        data-carousel-next
                      >
                          <i
                            className={` ${styles.apartmentTypeArrowIcon} bi bi-arrow-right `}
                          ></i>
                          <span className="sr-only">Next</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
        
        
        {blogData ? (
          <div className="flex flex-wrap">
          {blogData?.data?.map((item, index) => (
            <div
             key={index}
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
                  <p className={`text-gray-700`}>{item?.BlogType?.Type}</p>
                </div>
                <h2 className={` ${styles.populerPropertiesBoxHead}`}>
                  {item.Title}
                </h2>
  
                <p className={` ${styles.blogContentText}`}>
                 {item.Description}
                </p>
              </div>
            </div>
          ))}
          </div>
        ) : <SkeletonLoader />}
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
       <Modal dismissible className="bg-transparent/[.5]" show={openModal} onClose={onResetValue}>
        <Modal.Header>Properties by <span className="blueText">Zodiac</span></Modal.Header>
        <Modal.Body>
          <div className={`${styles.ModalContent}`}>
            <div>
              <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400 m-2"><span>Name : </span>{ZodiacName}</p>
              <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400 m-2"><span>Date of birth : </span>{Dob}</p>
            </div>
            <div>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 m-2"><span>Direction : </span>{propertyByZodaicProperty?.data?.Facing?.Facing}</p>
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 m-2"><span>Zodiac Sign : </span>{propertyByZodaicProperty?.data?.rashi}</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-small rounded-lg text-sm w-full sm:w-auto px-2.5 py-0.75 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
            onClick={onResetValue}
            href={`/propertyList/facingId=${propertyByZodaicProperty?.data?.Facing?._id}`}
          >
            Show Properties
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
}

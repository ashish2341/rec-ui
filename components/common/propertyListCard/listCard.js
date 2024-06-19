import React, { useEffect, useState } from "react";
import styles from "../../../app/(user)/propertyList/[propertyListId]/propertyList.module.css";
import Link from "next/link";
import ReadMore from "@/components/common/readMore";
import Accordion from "@/components/common/accodion";
import { Carousel } from "flowbite-react";
import { SharePopUp } from "../sharePopUp/sharePopUp";
import ContactModal from "../contactModel/contactModal";
import { API_BASE_URL,imgApiUrl } from "@/utils/constants";

const PropertyListCard = ({ item }) => {
  const [isPopoverOpenforShare, setIsPopoverOpenforShare] = useState(false);
  const [valueforContactModal, setValueforContactModal] = useState(false);
  const [propertyId,setPropertyId]=useState("")
  const handleDownload = (BrochureUrl) => {
    // Construct the URL of the file
    const fileUrl = BrochureUrl; // Adjust the file path as needed

    // Create an anchor element
    const anchor = document.createElement("a");
    anchor.href = fileUrl;
    anchor.download = "Brochure.pdf";
    anchor.rel = "noopener noreferrer"; // Set the download attribute

    // Simulate a click event to trigger the download
    anchor.click();

    // Clean up
    anchor.remove();
  };
  const openContactModal=()=>{
    setValueforContactModal(!valueforContactModal)
   
  }
  const openShareModal=(id)=>{
    setIsPopoverOpenforShare(!isPopoverOpenforShare)
    setPropertyId(id)
  
  }
  return (
    <>
      <div className={`mb-3 ml-3 mr-3 ${styles.GeneralDetailsBox}`}>
        <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <div className={`flex w-full ${styles.cardContent}`}>
            <div className={`w-full ${styles.leftCardContent}`}>
              <div
                className={`${styles.listPropertyImgOuter} grid h-30 grid-cols-1 gap-4 sm:h-30 xl:h-30 1xl:h-96`}
              >
                <Carousel indicators={false} slide={false}>
                  {item?.Images?.map((itemurl, index) => (
                    <Link key={index} href={`/propertyDetail/${item._id}`}>
                      <img
                        className={`${styles.listPropertyImg}`}
                        key={index}
                        src={`${imgApiUrl}/${itemurl?.URL}`}
                        alt="..."
                      />
                    </Link>
                  ))}
                </Carousel>
              </div>
            </div>
            <div
              className={`flex  flex-col leading-normal ml-2 w-full mr-2 mt-4 mb-2 ${styles.middleCardContent}`}
            >
              {" "}
              <div className={`flex justify-between mb-2`}>
                <Link href={`/propertyDetail/${item._id}`}>
                  <div
                    className={`flex flex-row  leading-normal ${styles.firstcontent}`}
                  >
                    <p
                      className={`  font-bold text-black-700 dark:text-black-800 ${styles.itemTitle}`}
                    >
                      {item?.Title}
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
                      className={`text-white-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-2 ml-2 me-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 ${styles.cardStarBtn}`}
                    >
                      {item?.Facing[0].Facing}
                    </button>
                  </div>
                </Link>
                <div className="flex ">
                  <div className={` mr-3 font-bold text-lg text-blue-600 dark:text-blue-500 hover:underline ${styles.GeneralDetailsBoxIcon}`}>
                    {" "}
                    <i
                       onClick={()=>openShareModal(item?._id) }
                      className="bi bi-share"
                    ></i>
                  </div>
                  {/* <div
                              className={`ml-3 ${styles.GeneralDetailsBoxIcon}`}
                            >
                              {" "}
                              <i className="bi bi-heart"></i>
                            </div> */}
                </div>
              </div>
              <Link href={`/propertyDetail/${item._id}`}>
                <p className="mb-2 flex font-medium text-gray-700 dark:text-gray-400">
                  <i className="bi bi-geo-alt-fill"></i>
                  <span className={`ml-1 ${styles.textCapitalized}`}>
                    <ReadMore text={item?.Address} maxLength={20} />
                  </span>
                </p>
                <p className="mb-4 font-medium text-gray-700 dark:text-gray-400">
                  <span className=" mr-2 font-bold text-gray-700 dark:text-gray-400">
                    {item?.ProeprtyType == "Commercial"
                      ? item?.PropertySubtype?.Name
                      : item?.PropertySubtype?.Name === "Plot"
                      ? item?.PropertySubtype?.Name
                      :  (<span>{item?.BhkType?.Type} {item?.PropertySubtype?.Name}</span>)} 
                  </span>
                  for<span className=""> {item?.ProeprtyFor}</span> in <span>{item?.Area?.Area}</span> 
                </p>
              </Link>
              <div className="mb-4">
                <Accordion listData={[item]} />
              </div>
              <Link href={`/propertyDetail/${item?._id}`}></Link>
              <div className=" ">
                <ReadMore text={item?.Description} maxLength={65} />
              </div>
              <Link href={`/propertyDetail/${item?._id}`}>
                <div className="flex flex-col md:flex-row justify-between items-center leading-normal mt-3"></div>
              </Link>
            </div>
            <div
              className={`flex flex-col items-center h-auto  ${styles.rightCardContent}`}
            >
              <Link href={`/propertyDetail/${item?._id}`}>
                <div>
                  <h5
                    className={` text-2xl font-bold tracking-tight text-gray-900 dark:text-white ${styles.price}`}
                  >
                    {/* <span className="px-2">₹</span> */}₹{" "}
                    <span>{item?.TotalPrice?.DisplayValue}</span>
                  </h5>
                </div>
              </Link>

              <div
                className={`flex flex-col justify-between items-center mt-5 `}
              >
                <button
                  onClick={() => handleDownload(item?.Brochure)}
                  type="button"
                  className={`text-white-600 mb-4 hover:bg-gray-200 hover:border-green-600 border-2 border-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-xs md:text-sm px-3 py-1.5 md:px-5 ml-1 md:py-2.5 text-center me-2 ${styles.cardLastBrochureBtn}`}
                >
                  <span className="mr-2">
                    <i className="bi bi-download"></i>
                  </span>
                  Brochure
                </button>
                <button
                onClick={openContactModal}
                  type="button"
                  className={`text-white  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-xs md:text-sm px-3 py-1.5 md:px-5 md:py-2.5 text-center ${styles.cardLastBtn}`}
                >
                  <span className="mr-1">
                    <i className="bi bi-telephone"></i>
                  </span>
                  Contact Sellers
                </button>
              </div>
              <Link href={`/propertyDetail/${item._id}`}>
                <div className="flex items-center mt-5 mb-2 md:mb-0">
                  <img
                    className={`${styles.cardImage} w-10 h-10 md:w-auto md:h-auto rounded-full`}
                 
                    src={`${imgApiUrl}/${item?.Builder?.Logo}`}
                    alt=""
                  />

                  <div className="flex flex-col ml-2">
                    <h3 className="font-bold text-sm md:text-base">
                      {item?.Builder?.Name}
                    </h3>
                    <p className="text-gray-900 text-xs md:text-sm">Seller</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
     <ContactModal isOpen={valueforContactModal} setDynamicState={setValueforContactModal}/>
     <SharePopUp isOpenvalue={isPopoverOpenforShare} setValueDynamicState={setIsPopoverOpenforShare} propertyIdForUrl={propertyId}/>
    </>
  );
};

export default PropertyListCard;

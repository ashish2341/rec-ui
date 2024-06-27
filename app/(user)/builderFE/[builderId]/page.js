"use client";
import { BreadCrumbs } from "@/components/common/breadcrumb";
import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import React, { useEffect, useState, useRef } from "react";
import styles from "./builder.module.css";
import { Dropdown } from "flowbite-react";
import {
  API_BASE_URL,
  API_BASE_URL_FOR_MASTER,
  imgApiUrl,
} from "@/utils/constants";
import useFetch from "@/customHooks/useFetch";
import Link from "next/link";
import ReadMore from "@/components/common/readMore";
import LoadingSideImg from "@/components/common/sideImgLoader";
import { addEnquiry } from "@/api-functions/enquiry/addEnquiry";
import SkeletonLoader from "@/components/common/loader";
import { toast } from "react-toastify";
import { GetBuilderById } from "@/api-functions/builder/getBuilderById";
import CommonLoader from "@/components/common/commonLoader/commonLoader";
const BuilderHomePage = (params) => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Message, setMessage] = useState("");
  const [MolileNumber, setPhone] = useState("");
  const [EnquiryData, setEnquiryData] = useState("");
  const [EnquiryType, setEnquiryType] = useState("ContactUs");
  const [loaderIsLoading, setLoaderIsLoading] = useState(false);
  const [developData, setDevelopData] = useState("");
  const currentDate = new Date().toISOString().slice(0, 10);

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
    if (MolileNumber === "") {
      toast.error("Number is required");
      return false;
    }

    let payload = {
      Name,
      Email,
      Message,
      MolileNumber,
      EnquiryDate: EnquiryData,
      EnquiryType,
    };
    let res = await addEnquiry(payload);
    if (res?.resData?.success == true) {
      toast.success(res?.resData?.message);
      setName("");
      setPhone("");
      setMessage("");
      setEmail("");
    } else {
      toast.error(res.errMessage);
      return false;
    }
    console.log(payload);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setEnquiryData(currentDate);
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
  // const {
  //   data: developData,
  //   loading: developLoading,
  //   error: developError,
  // } = useFetch(
  //   `${API_BASE_URL}/developer/developer/${params?.params?.builderId}`
  // );
  useEffect(() => {
    getBuilderDatabyId();
  }, []);
  const getBuilderDatabyId = async () => {
    setLoaderIsLoading(true);
    const id = params?.params?.builderId;
    let builder = await GetBuilderById(id);
    if (builder?.resData?.success == true) {
      setDevelopData(builder?.resData);
      setLoaderIsLoading(false);
    } else {
      toast.error(builder?.errMessage);
      setLoaderIsLoading(false);
    }
  };

  const date = new Date(developData?.data?.EstablishDate);
  const year = date.getFullYear();
  useEffect(() => {
    initFlowbite();
  }, []);
  return (
    <>
      {loaderIsLoading && <CommonLoader />}
      <Navbar />
      <div className={` ${styles.divideDetailPage} divideDetailPage`}>
        {/* <div className={` ${styles.builderTop} mb-5`}>
          <BreadCrumbs />
        </div> */}
        <div className={` ${styles.secondContent} mb-4 flex justify-between `}>
          <div>
            <h1 className={`${styles.propertiesByAreaMainHead}`}>
              Residential Projects by {developData?.data?.Name}
            </h1>
          </div>
        </div>
      </div>
      <div className={` ${styles.builderDetailPage}`}>
        <div className={` ${styles.builderDetailPageLeft}`}>
          {developData ? (
            <div className={` ${styles.builderBox} mb-4`}>
              <div className={` ${styles.builderInputField}`}>
                <div>
                  {developData?.data?.Logo ? (
                    <img
                      width="180"
                      height="180"
                      className={` ${styles.builderLogoImg}`}
                      src={`${imgApiUrl}/${developData?.data?.Logo}`}
                    />
                  ) : (
                    <img
                      width="180"
                      height="180"
                      className={` ${styles.builderLogoImg}`}
                      src="https://tse2.explicit.bing.net/th?id=OIP.9AeFX9VvFYTXrL5IwhGhYwHaHa&pid=Api&P=0&h=180"
                    />
                  )}
                </div>
                <div className={` ${styles.builderAfterImg}`}>
                  <div className="text-md font-semibold blueText text-nowrap mt-2">
                    {developData?.data?.Name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Joined in {year}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                    {developData?.data?.Description}
                  </div>
                  {developData ? (
                    <div
                      className={` ${styles.builderSocialIcon} text-gray-700 mt-2`}
                    >
                      <Link
                        href={
                          developData?.data?.SocialMediaProfileLinks?.Facebook
                            ? developData?.data?.SocialMediaProfileLinks
                                ?.Facebook
                            : ""
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="bi bi-facebook"></i>
                      </Link>
                      <Link
                        href={
                          developData?.data?.SocialMediaProfileLinks?.Instagram
                            ? developData?.data?.SocialMediaProfileLinks
                                ?.Instagram
                            : ""
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="bi bi-instagram ml-3"></i>
                      </Link>
                      <Link
                        href={
                          developData?.data?.SocialMediaProfileLinks?.LinkedIn
                            ? developData?.data?.SocialMediaProfileLinks
                                ?.LinkedIn
                            : ""
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="bi bi-linkedin ml-3"></i>
                      </Link>
                      <Link
                        href={
                          developData?.data?.SocialMediaProfileLinks?.Twitter
                            ? developData?.data?.SocialMediaProfileLinks
                                ?.Twitter
                            : ""
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="bi bi-twitter ml-3"></i>
                      </Link>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          ) : (
            <div className={` ${styles.loaderImg}`}>
              <SkeletonLoader />
            </div>
          )}
          <div className={` ${styles.builderBox} mb-4`}>
            <h1 className="ml-6 mt-4 font-semibold">Contact Builder</h1>
            <div className={` ${styles.builderHunter} p-4`}>
              <div className="mb-6 mt-3">
                <input
                  type="text"
                  value={Name}
                  onChange={handleNameChange}
                  id="Name"
                  placeholder="Name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-gray-400 focus:border-gray-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-6">
                <input
                  type="email"
                  value={Email}
                  onChange={handleEmailChange}
                  id="email"
                  placeholder="Email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-gray-400 focus:border-gray-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  value={MolileNumber}
                  onChange={handlePhoneChange}
                  id="Phone"
                  placeholder="Phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-gray-400 focus:border-gray-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-6">
                <textarea
                  type="text"
                  value={Message}
                  onChange={handleMessageChange}
                  id="Message"
                  placeholder="Message"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-gray-400 focus:border-gray-400 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <button
                className={` ${styles.agentRightMainContenBtn} text-white bg-blue-700 h-12 w-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm w-full sm:w-auto px-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                type="button"
                onClick={addEnquiryData}
              >
                Send
              </button>
            </div>
          </div>
          <div className={` ${styles.builderBox} mb-4`}>
            <iframe
              className={` ${styles.builderMapDetails}`}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227749.05321034128!2d75.62574624184872!3d26.885115144905566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4adf4c57e281%3A0xce1c63a0cf22e09!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1715061916080!5m2!1sen!2sin"
            ></iframe>
          </div>
        </div>
        <div className={` ${styles.builderDetailPageRight}`}>
          {developData ? (
            developData?.data?.properties.length > 0 ? (
              developData?.data?.properties.map((item, index) => (
                <div
                  key={index}
                  className={` ${styles.builderRightMainBox} flex mb-6 p-4 `}
                >
                  <Link
                    href={`/propertyDetail/${item._id}`}
                    className={` ${styles.builderRightImg} mr-3`}
                  >
                    <img src={`${imgApiUrl}/${item.Images[0].URL}`}  className="h-full rounded-lg " alt="property Image"/>
                  </Link>
                  <div className={` ${styles.builderRightBox}`}>
                    <div className={` ${styles.cardImgBottom}`}>
                      <Link href={`/propertyDetail/${item._id}`}>
                        <div
                          className={` ${styles.populerPropertiesLocationMain} flex text-md pt-4`}
                        >
                          <i className="bi bi-geo-alt-fill"></i>
                          <p className={`text-gray-700`}>Jaipur</p>
                        </div>
                        <div className="flex justify-between">
                          <h2
                            className={` ${styles.populerPropertiesBoxHead} font-semibold text-2xl pt-2`}
                          >
                            {item?.Title}
                          </h2>
                          <div
                            className={` ${styles.populerPropertiesBoxDetail} flex mt-2 text-gray-500 font-bold`}
                          >
                            {item?.ProeprtyType}
                          </div>
                        </div>
                      </Link>

                      <h2
                        className={` ${styles.populerPropertiesBoxHead} text-sm pt-2`}
                      >
                        <ReadMore text={item?.Description} maxLength={100} />
                      </h2>
                      <Link href={`/propertyDetail/${item._id}`}>
                        {" "}
                        <div
                          className={`${styles.populerPropertiesBoxPriceMain} flex mt-2 justify-between`}
                        >
                          <div>
                            <p
                              className={`font-bold text-gray-500 ${styles.populerPropertiesBoxPrice}`}
                            >
                              {item?.TotalPrice?.DisplayValue}
                            </p>
                          </div>
                          <div>
                            <Link href={`/propertyDetail/${item._id}`}>
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
                  </div>
                </div>
              ))
            ) : (
              <h1 className={` ${styles.bigNotFound}`}>No Properties Found</h1>
            )
          ) : (
            <LoadingSideImg />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BuilderHomePage;

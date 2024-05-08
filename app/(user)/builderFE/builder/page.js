"use client";
import { BreadCrumbs } from "@/components/common/breadcrumb";
import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import React, { useEffect, useState, useRef } from "react";
import styles from "./builder.module.css"
import { Dropdown } from "flowbite-react";
import { API_BASE_URL, API_BASE_URL_FOR_MASTER } from "@/utils/constants";
import useFetch from "@/customHooks/useFetch";
import { Avatar } from "flowbite-react";
import { Card } from "flowbite-react";
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";
import Link from "next/link";

const BuilderHomePage = () => {
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Message, setMessage] = useState("");
    const [MolileNumber, setPhone] = useState("");
    const [EnquiryData, setEnquiryData] = useState("");
    const [EnquiryType, setEnquiryType] = useState("ContactUs");

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
        if (MolileNumber === ""){
          toast.error("Number is required");
          return false;
        }
        setEnquiryData(currentDate);
        let payload = { Name, Email, Message, MolileNumber, EnquiryData, EnquiryType };
        let res = await addEnquiry(payload);
         if(res?.resData?.success == true){
           toast.success(res?.resData?.message);
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
    const { data: areaData } = useFetch(`${API_BASE_URL_FOR_MASTER}/areas`);
    const {
        data: developData,
        loading: developLoading,
        error: developError,
      } = useFetch(`${API_BASE_URL}/develop/allDeveloper?page=1&pageSize=5`);

      console.log("developData",developData);
    return(
        <>
        <Navbar />
            <div className={` ${styles.divideDetailPage} divideDetailPage`}>
                <div className={` ${styles.builderTop} mb-5`}>
                    <BreadCrumbs />
                   
                </div>
                <div className={` ${styles.secondContent} mb-4 flex justify-between `}>
                    <div>
                    <h1 className={`${styles.propertiesByAreaMainHead}`}>Residential Projects by Signature Global Builders Pvt.Ltd.</h1>
                    </div>
          
                <div className={` ${styles.builderDetailDropDown} flex`}>
                            <h2>Sort by :</h2>
                            <Dropdown label="" dismissOnClick={false} renderTrigger={() => <span> My custom trigger</span>}>
                                <Dropdown.Item>Dashboard</Dropdown.Item>
                                <Dropdown.Item>Settings</Dropdown.Item>
                                <Dropdown.Item>Earnings</Dropdown.Item>
                                <Dropdown.Item>Sign out</Dropdown.Item>
                            </Dropdown>
                        </div>
                </div>
               
            </div>
            <div className={` ${styles.builderDetailPage}`}>
                <div className={` ${styles.builderDetailPageLeft}`}>
                    <div className={` ${styles.builderBox} mb-4`} >
                        <div className={` ${styles.builderInputField}`}>
                            <div>
                                <img 
                                    width="180"
                                    height="180"
                                    className={` ${styles.builderLogoImg}`}
                                    src="../../../img/contactusImg1.jpg"
                                />
                            </div>
                            <div className="text-md font-semibold blueText text-nowrap mt-2">Signature Global Builder Pvt. Ltd.</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">Joined in August 2014</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec 
                                justo nec felis consectetur commodo vitae eget elit. 
                                Proin nec justo eget ipsum cursus aliquet. Vestibulum non fermentum 
                                enim. Sed vel eros nec elit viverra fermentum. 
                            </div>
                            <div className={` ${styles.builderSocialIcon} text-gray-700 mt-2`}>
                                <i class="bi bi-facebook"></i>
                                <i class="bi bi-instagram ml-3"></i>
                                <i class="bi bi-linkedin ml-3"></i>
                                <i class="bi bi-twitter ml-3"></i>
                            </div>
                        </div>
                    </div>
                    <div className={` ${styles.builderBox} mb-4`} >
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
                    <div className={` ${styles.builderBox} mb-4`} >
                    <iframe 
                        className={` ${styles.builderMapDetails}`}
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227749.05321034128!2d75.62574624184872!3d26.885115144905566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4adf4c57e281%3A0xce1c63a0cf22e09!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1715061916080!5m2!1sen!2sin" 
                        width="305" height="200"
                        allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
                    </div>
                </div>
                <div className={` ${styles.builderDetailPageRight}`}>
                    <div className="mr-3">
                        <img
                            src="../../../img/contactusImg1.jpg"
                            className={` ${styles.builderRightImg}`}
                        />
                        <div>
                            <div className={` ${styles.cardImgBottom}`}>
                                <div className={` ${styles.populerPropertiesLocationMain} flex`}>
                                <i className="bi bi-geo-alt-fill"></i>
                                <p className={`text-gray-700`}>Addres</p>
                                </div>
                                <h2 className={` ${styles.populerPropertiesBoxHead}`}>
                                Title
                                </h2>
                                <div className={` ${styles.populerPropertiesBoxDetail} flex`}>
                                <div className="flex">
                                <i className="fa fa-bed"></i>
                                    <p className={` ${styles.populerPropertiesBoxText} ml-1`}>
                                    Bed Room
                                    </p>
                                </div>
                                <div className="flex">
                                    <i className="fa fa-bath"></i>
                                    <p className={` ${styles.populerPropertiesBoxText} ml-1`}>
                                    Baths
                                    </p>
                                </div>
                                <div className="flex">
                                    <i className="fa fa-area-chart"></i>
                    
                                    <p className={` ${styles.populerPropertiesBoxText} ml-1`}>
                                     Land Area
                                    </p>
                                </div>
                                </div>
                                <div className={`${styles.populerPropertiesBoxPriceMain}`}>
                                <p className={`${styles.populerPropertiesBoxPrice}`}>
                                TotalPrice
                                </p>
                                <Link href={`/propertyDetail/`} >
                                    <button
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm sm:w-auto px-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    type="button"
                                    
                                    >
                                    More Details
                                    </button>
                                </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mr-3">
                        <img
                            src="../../../img/contactusImg1.jpg"
                            className={` ${styles.builderRightImg}`}
                        />
                        <div>
                            <div className={` ${styles.cardImgBottom}`}>
                                <div className={` ${styles.populerPropertiesLocationMain} flex`}>
                                <i className="bi bi-geo-alt-fill"></i>
                                <p className={`text-gray-700`}>Address</p>
                                </div>
                                <h2 className={` ${styles.populerPropertiesBoxHead}`}>
                                Title
                                </h2>
                                <div className={` ${styles.populerPropertiesBoxDetail} flex`}>
                                <div className="flex">
                                <i className="fa fa-bed"></i>
                                    <p className={` ${styles.populerPropertiesBoxText} ml-1`}>
                                    Bed Room
                                    </p>
                                </div>
                                <div className="flex">
                                    <i className="fa fa-bath"></i>
                                    <p className={` ${styles.populerPropertiesBoxText} ml-1 `}>
                                    Baths
                                    </p>
                                </div>
                                <div className="flex">
                                    <i className="fa fa-area-chart"></i>
                    
                                    <p className={` ${styles.populerPropertiesBoxText} ml-1`}>
                                     Land Area
                                    </p>
                                </div>
                                </div>
                                <div className={`${styles.populerPropertiesBoxPriceMain}`}>
                                <p className={`${styles.populerPropertiesBoxPrice}`}>
                                TotalPrice
                                </p>
                                <Link href={`/propertyDetail/`} >
                                    <button
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm sm:w-auto px-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    type="button"
                                    
                                    >
                                    More Details
                                    </button>
                                </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <img
                            src="../../../img/contactusImg1.jpg"
                            className={` ${styles.builderRightImg}`}
                        />
                        <div>
                            <div className={` ${styles.cardImgBottom}`}>
                                <div className={` ${styles.populerPropertiesLocationMain} flex`}>
                                <i className="bi bi-geo-alt-fill"></i>
                                <p className={`text-gray-700`}>Address</p>
                                </div>
                                <h2 className={` ${styles.populerPropertiesBoxHead}`}>
                                Title
                                </h2>
                                <div className={` ${styles.populerPropertiesBoxDetail} flex`}>
                                <div className="flex">
                                <i className="fa fa-bed"></i>
                                    <p className={` ${styles.populerPropertiesBoxText} ml-1`}>
                                    Bed Room
                                    </p>
                                </div>
                                <div className="flex">
                                    <i className="fa fa-bath"></i>
                                    <p className={` ${styles.populerPropertiesBoxText} ml-1 `}>
                                    Baths
                                    </p>
                                </div>
                                <div className="flex">
                                    <i className="fa fa-area-chart"></i>
                    
                                    <p className={` ${styles.populerPropertiesBoxText} ml-1`}>
                                     Land Area
                                    </p>
                                </div>
                                </div>
                                <div className={`${styles.populerPropertiesBoxPriceMain}`}>
                                <p className={`${styles.populerPropertiesBoxPrice}`}>
                                TotalPrice
                                </p>
                                <Link href={`/propertyDetail/`} >
                                    <button
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm sm:w-auto px-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    type="button"
                                    
                                    >
                                    More Details
                                    </button>
                                </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <Footer />
        </>
    )
}

export default BuilderHomePage;
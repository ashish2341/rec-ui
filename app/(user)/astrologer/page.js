"use client"
import Navbar from "@/components/common/navbar";
import styles from "./astrologer.module.css"
import React, { useState } from "react";
import { DayPicker } from 'react-day-picker';
import { Blockquote } from "flowbite-react";
import Footer from "@/components/common/footer";
import { addEnquiry } from "@/api-functions/enquiry/addEnquiry";
import { toast } from "react-toastify";


const AstrologerPage = () => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Message, setMessage] = useState("m");
  const [MolileNumber, setPhone] = useState("");
  const [EnquiryData, setEnquiryData] = useState("");
  const [EnquiryType, setEnquiryType] = useState("Astrology");

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
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  const handleEnquiryData = (e) => {
    setEnquiryData(e.target.value);
  };
    return (

        <>
            <Navbar />
            <div className={`${styles.backGroundyellow}`}>
            <div className={`${styles.buyingOptionWithZodic}`}>
                    <div className={`${styles.buyingWithZodicMain}`}>
                    <div className={`${styles.buyingZodicLeft} mt-2`}>
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
                                    <button 
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Chat with Astrologer
                                    </button>
                                </div>
                                <div>
                                    <button
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Talk with Astrologer
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.buyingZodicRight}`}>
                        <img src="/img/bestBuyImg.png" alt="" />
                    </div>
                    </div>
            </div>
            </div>
            <div className={` ${styles.astroDetails} mb-4`}>
                <div className={` ${styles.astroLeft}`}>
                    <div>
                        <img src="../../../img/download (2).jpeg" className={` ${styles.astroLeftUpImg}`} />
                        <h1 className="text-4xl font-semibold  mt-6 mb-3">Lorem ipsum dolor sit amet</h1>
                        <p className=" text-gray-500 mb-2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                        <p className=" text-gray-500 ">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                        <Blockquote className="my-4 text-md border-l-4 border-blue-500 bg-gray-50 p-4 dark:border-blue-500 dark:bg-gray-800">
                            "Flowbite is just awesome. It contains tons of predesigned components and pages starting from login screen to
                            complex dashboard. Perfect choice for your next SaaS application."
                        </Blockquote>
                        <div className="flex mb-4">
                            <div className="pr-2">
                                <img src="../../../img/OIP.jpeg" />
                            </div>
                            <div className="pl-4">
                                <p className=" text-gray-500 ">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                </p>
                                <ul className={` ${styles.astroList}`} >
                                    <li>Lorem ipsum dolor sit amet</li>
                                    <li>Lorem ipsum dolor sit amet</li>
                                    <li>Lorem ipsum dolor sit amet</li>
                                    <li>Lorem ipsum dolor sit amet</li>
                                </ul>
                            </div>
                        </div>
                        <div className=" text-gray-500 mb-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </div>
                        <div className=" text-gray-500 ">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </div>
                    </div>
                </div>
                <div className={` ${styles.divideDetailPageRight}`}>
                    <div id="general" className={`${styles.formDetails} mb-4`}>
                        <div className="GeneralDetailsMain">
                            <h2 className={`${styles.GeneralDetailsMainHead}`}>
                            CONTACT OUR ASTROLOGER
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
                                {/* <DayPicker
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
                                /> */}
                                <input 
                                    type="date"
                                    value={EnquiryData}
                                    onChange={handleEnquiryData}
                                    id="Phone"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Phone"
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
            <Footer />
        </>
    )
}

export default AstrologerPage;
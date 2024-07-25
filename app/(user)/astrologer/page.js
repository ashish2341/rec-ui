"use client"
import Navbar from "@/components/common/navbar";
import styles from "./astrologer.module.css"
import React, { useEffect, useState } from "react";
import { DayPicker } from 'react-day-picker';
import { Blockquote } from "flowbite-react";
import Footer from "@/components/common/footer";
import { addEnquiry } from "@/api-functions/enquiry/addEnquiry";
import { toast } from "react-toastify";
import CommonLoader from "@/components/common/commonLoader/commonLoader";
import { Link } from "react-scroll";


const AstrologerPage = () => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Message, setMessage] = useState("m");
  const [MolileNumber, setPhone] = useState("");
  const [EnquiryData, setEnquiryData] = useState("");
  const [EnquiryType, setEnquiryType] = useState("Astrology");
  const [loaderIsLoading, setLoaderIsLoading] = useState(false);

  useEffect(() => {
    setLoaderIsLoading(true);
    setTimeout(() => {
      setLoaderIsLoading(false);
    }, 2000);
  }, []);
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
    if (!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(MolileNumber)) {
      toast.error('Please enter a valid 10-digit mobile number');
      return false;
    }
    let payload = { Name, Email, Message, MolileNumber, EnquiryDate:EnquiryData, EnquiryType };
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
        {loaderIsLoading && <CommonLoader />}
            <Navbar />
            <div className={`${styles.backGroundyellow}`}>
            <div className={`${styles.buyingOptionWithZodic}`}>
                    <div className={`${styles.buyingWithZodicMain}`}>
                    <div className={`${styles.buyingZodicLeft} mt-10`}>
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
                            <div className={`${styles.zodaicButtons} grid gap-6 mb-6 md:grid-cols-2`}>
                                <Link href={"contact"}>
                                    <button
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Chat with Astrologer
                                    </button>
                                </Link>
                                {/* <div>
                                    <button
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Talk with Astrologer
                                    </button>
                                </div> */}
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
                        <h1 className="text-4xl font-semibold  mt-6 mb-3">Title</h1>
                        <p className=" text-gray-500 mb-2">
                        In the intricate dance of the cosmos, every moment is imbued with unique energies that shape our lives in profound ways. When it comes to the significant decision of buying property, consulting an experienced astrologer can provide invaluable insights into aligning your investment with celestial influences. Let's explore the role of an astrologer in the realm of property buying.
                        </p>
                        <p className=" text-gray-500 ">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                        <Blockquote className="my-4 text-md border-l-4 border-blue-500 bg-gray-50 p-4 dark:border-blue-500 dark:bg-gray-800">
                            "The Role of an Astrologer in Property Buying: Navigating Cosmic Energies for Real Estate Success"
                        </Blockquote>
                        <div className="flex mb-4">
                            <div className="pr-2">
                                <img src="../../../img/OIP.jpeg" />
                            </div>
                            <div className="pl-4">
                                <p className=" text-gray-500 ">
                                    Let's explore the role of an astrologer in the realm of property buying.
                                </p>
                                <ul className={` ${styles.astroList}`} >
                                    <li>Cosmic Guidance</li>
                                    <li>Astrological Compatibility</li>
                                    <li>Timing Considerations</li>
                                    <li>Remedial Measures</li>
                                </ul>
                            </div>
                        </div>
                        <div className=" text-gray-500 mb-4">
                        In the cosmic tapestry of life, the wisdom of astrology
                        illuminates our path and empowers us to make informed decisions
                        that resonate with our soul's purpose. When embarking on the
                        journey of property buying, enlisting the expertise of an astrologer can make all the difference.
                        </div>
                        <div className=" text-gray-500 ">
                        By navigating the celestial currents with wisdom and foresight, you can embark on a real estate journey that aligns with the stars and leads to lasting fulfillment.
                        </div>
                    </div>
                </div>
                <div className={` ${styles.divideDetailPageRight}`} id="contact">
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

"use client";
import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import React, { useEffect, useState, useRef } from "react";
import { initFlowbite } from "flowbite";
import styles from "./contactus.module.css";
import { addEnquiry } from "@/api-functions/enquiry/addEnquiry";
import { ToastContainer, toast } from "react-toastify";


const ContactUs = () => {
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


    useEffect(() => {
        initFlowbite();
    }, []);

    return (
        <>
        <Navbar />
        <div className={`${styles.contactMain}`}>
            <div className={`${styles.contactImg} h-screen bg-cover bg-center text-white border-b-1 border-b-solid border-x-neutral-50`}>
                <div className={`${styles.contactHeadMain}`}>
                    <p className={`${styles.contactHeadTextp}`}>STAY IN TOUCH</p>
                    <h1 className={`${styles.contactHeadTextMain}`}>Contact Us</h1>
                    <p className={`${styles.contactHeadTextpp}`}>For Enquiries, Do Write To Us.</p>
                </div>
            </div>
            <div className={`${styles.contactSectionForm}`} >
                <div className={`${styles.contactLeftForm}`}>
                    <p className={`${styles.contactBoxText} mt-4`}>HAVE ANY QUESTIONS?</p>
                    <h1 className={`${styles.contactBoxHead} mt-4 mb-4`}>Let's start a conversation</h1>
                    <div className={`${styles.contactLeftFormData}`}>
                        <div className="mb-6 mt-3">
                        <label>Your Name</label>
                        <input
                            type="text"
                            value={Name}
                            onChange={handleNameChange}
                            id="Name"
                            className="bg-gray-50 border border-blue-700 text-gray-900 text-sm focus:ring-blue-700 focus:border-blue-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                        />
                        </div>
                        <div className="mb-6">
                            <label>Your Email</label>
                            <input
                                type="email"
                                value={Email}
                                onChange={handleEmailChange}
                                id="email"
                                className="bg-gray-50 border border-blue-700 text-gray-900 text-sm focus:ring-blue-700 focus:border-blue-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label>Your Phone</label>
                            <input
                                type="text"
                                value={MolileNumber}
                                onChange={handlePhoneChange}
                                id="Phone"
                                className="bg-gray-50 border border-blue-700 text-gray-900 text-sm  focus:ring-blue-700 focus:border-blue-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label>Your Message</label>
                            <textarea
                                type="text"
                                value={Message}
                                onChange={handleMessageChange}
                                id="Message"
                                className="bg-gray-50 border border-blue-700 text-gray-900 text-sm focus:ring-blue-700 focus:border-blue-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                <div className={`${styles.contactLeftImg}`}>
                    <img 
                        src="../../../img/contactusImg1.jpg"
                    />
                </div>
            </div>
            <div className={`${styles.contactSectionMap}`} >
                <div className={`${styles.contactLeftMap}`}>
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227749.05321034128!2d75.62574624184872!3d26.885115144905566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4adf4c57e281%3A0xce1c63a0cf22e09!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1714546518432!5m2!1sen!2sin" 
                    className={`${styles.contactMap}`}
                    allowfullscreen="" 
                    loading="lazy" 
                    referrerpolicy="no-referrer-when-downgrade"
                >
                </iframe>
                </div>
                <div className={`${styles.contactLeftAddress}`}>
                    <p className={`${styles.contactBoxText} mt-24`}>HAVE ANY QUESTIONS?</p>
                    <h1 className={`${styles.contactBoxHead} mt-4 mb-4`}>Let's start a conversation</h1>
                    <p className={`${styles.contactBoxText} mt-24`}>Address</p>
                    <h1 className={`${styles.contactBoxHead} mt-4 mb-4`}>Let's start a conversation</h1>
                </div>
            </div>
        </div>
        <Footer />
        </>
    )
}

export default ContactUs;

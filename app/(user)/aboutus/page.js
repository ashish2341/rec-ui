"use client";
import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import React, { useEffect, useState, useRef } from "react";
import { initFlowbite } from "flowbite";
import styles from "./aboutus.module.css";
import { addEnquiry } from "@/api-functions/enquiry/addEnquiry";
import { ToastContainer, toast } from "react-toastify";
import Timeline from "@/components/common/timeline";
// export const metadata = {
//     title: "About"
    
//   };

const AboutUs = () => {
    const milestones = [
        { date: '2012', title: 'Founding the Company1', description: 'REC1.com is founded with a vision to revolutionize the real estate industry.' },
        { date: '2013', title: 'Founding the Company2', description: 'REC2.com is founded with a vision to revolutionize the real estate industry.' },
        { date: '2014', title: 'Founding the Company3', description: 'REC3.com is founded with a vision to revolutionize the real estate industry.' },
        { date: '2015', title: 'Founding the Company4', description: 'REC4.com is founded with a vision to revolutionize the real estate industry.' }
      ];

    return (
        <>
            <Navbar />
            <div className={`${styles.contactMain}`}>
                <div className={`${styles.contactImg} h-screen bg-cover bg-center text-white border-b-1 border-b-solid border-x-neutral-50`}>
                    <div className={`${styles.contactHeadMain}`}>
                        <h1 className={`${styles.contactHeadTextMain}`}>About Us</h1>
                    </div>
                </div>
                <div className={`${styles.aboutWelcome}`}>
                    <div className={`${styles.aboutWelcomeText}`}>
                        <h1 className={`${styles.aboutHeading} mb-6`}>Welcome to Housing</h1>
                        <p className="mb-2 font-medium text-gray-600 dark:text-gray-600 text-sm">
                            Founded in 2012 and acquired by REA India in 2017, REC.com 
                            is India’s most innovative real estate advertising platform for homeowners, 
                            landlords, developers, and real estate brokers. The company offers listings for new 
                            homes, resale homes, rentals, plots and co-living spaces in India. Backed by strong 
                            research and analytics, the company’s experts provide comprehensive real estate services that 
                            cover advertising and marketing, sales solutions for real estate developers, personalized search, 
                            virtual viewing, AR&VR content, home loans, end-to-end transaction services, and 
                            post-transaction services to consumers for both buying and renting.
                        </p>
                    </div>
                    <div className={`${styles.aboutWelcomeImg} ml-10`}>
                        <img 
                            src="../../../img/contactusImg1.jpg"
                        />
                    </div>
                </div>

                <div className={`${styles.aboutPost}`}>
                    <div className={`${styles.aboutPostImg}`}>
                    <video
                        controls
                        className="h-50 w-90 border border-black rounded-lg"
                    >
                        <source
                            src="../../../video/aboutusvideo.mp4"
                            type="video/mp4"
                        />
                    </video>
                    </div>
                    <div className={`${styles.aboutPostText} ml-10`}>
                        <p className={`${styles.aboutSubHeading} mt-10`}>
                            Parr...se Perfect
                        </p>
                        <h1 className={`${styles.aboutHeading} mb-4`}>Post your property</h1>
                        <p className="mb-2 text-gray-600 dark:text-gray-600 text-sm">
                            Buying, Selling, Renting, or moving into a house can be a trial 
                            by fire, especially in India where we often 
                            take the hassles involved in the process as an integral part of the 
                            home purchase process. Our new idea for Housing.com questions that behaviour, and motivates 
                            them to switch to a hassle-free experience.
                        </p>
                    </div>
                </div>

                <div className={`${styles.aboutusTimeline} pt-8 mt-8`}>
                    <div className={`${styles.aboutusTimelineInner}`}>
                        <Timeline milestones={milestones} />
                    </div>
                </div>

                <div className={`${styles.aboutusVision} mt-10`}>
                    <div className={`${styles.aboutWelcomeImg} mr-10`}>
                        <img 
                            src="../../../img/contactusImg1.jpg"
                        />
                    </div>
                    <div className={`${styles.aboutusVisionRight}`}>
                        <div className={`${styles.agentRightMainContentMain}`}>
                            <h1 className={`${styles.aboutHeading} blueText`}>Vision</h1>
                            <div className="flex mt-4">
                            <i className="bi bi-arrow-right mr-1"></i>
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
                            <i className="bi bi-arrow-right mr-1"></i>
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
                            <i className="bi bi-arrow-right mr-1"></i>
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
                    </div>
                </div>

                <div className={`${styles.aboutusVision} mt-10 mb-10`}>
                <div className={`${styles.aboutusVisionRight}`}>
                        <div className={`${styles.agentRightMainContentMain}`}>
                            <h1 className={`${styles.aboutHeading} blueText`}>Mission</h1>
                            <div className="flex mt-4">
                            <i className="bi bi-arrow-right mr-1"></i>
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
                            <i className="bi bi-arrow-right mr-1"></i>
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
                            <i className="bi bi-arrow-right mr-1"></i>
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
                    </div>
                    <div className={`${styles.aboutWelcomeImg} ml-10`}>
                        <img 
                            src="../../../img/contactusImg1.jpg"
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default AboutUs;
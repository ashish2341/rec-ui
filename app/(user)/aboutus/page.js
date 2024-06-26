"use client";
import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import React, { useEffect, useState, useRef } from "react";
import { initFlowbite } from "flowbite";
import styles from "./aboutus.module.css";
import { addEnquiry } from "@/api-functions/enquiry/addEnquiry";
import { ToastContainer, toast } from "react-toastify";
import Timeline from "@/components/common/timeline";
import CommonLoader from "@/components/common/commonLoader/commonLoader";
// export const metadata = {
//     title: "About"

//   };

const AboutUs = () => {
  const [loaderIsLoading, setLoaderIsLoading] = useState(false);
  useEffect(() => {
    setLoaderIsLoading(true);
    setTimeout(() => {
      setLoaderIsLoading(false);
    }, 1000);
  }, []);
  const milestones = [
    {
      date: "2012",
      title: "Founding the Company1",
      description:
        "REC1.com is founded with a vision to revolutionize the real estate industry.",
    },
    {
      date: "2013",
      title: "Founding the Company2",
      description:
        "REC2.com is founded with a vision to revolutionize the real estate industry.",
    },
    {
      date: "2014",
      title: "Founding the Company3",
      description:
        "REC3.com is founded with a vision to revolutionize the real estate industry.",
    },
    {
      date: "2015",
      title: "Founding the Company4",
      description:
        "REC4.com is founded with a vision to revolutionize the real estate industry.",
    },
  ];
  useEffect(() => {
    initFlowbite();
}, []);
  return (
    <>
      {loaderIsLoading && <CommonLoader />}
      <Navbar />
      <div className={`${styles.contactMain}`}>
        <div
          className={`${styles.contactImg} h-screen bg-cover bg-center text-white border-b-1 border-b-solid border-x-neutral-50`}
        >
          <div className={`${styles.contactHeadMain}`}>
            <h1 className={`${styles.contactHeadTextMain}`}>About Us</h1>
          </div>
        </div>
        <div className={`${styles.aboutWelcome}`}>
          <div className={`${styles.aboutWelcomeText}`}>
            <h1 className={`${styles.aboutHeading} mb-6`}>Welcome to REC</h1>
            <p className="mb-2 font-medium text-gray-600 dark:text-gray-600 text-sm">
              Founded in 2012 and acquired by REA India in 2017, REC.com is
              India’s most innovative real estate advertising platform for
              homeowners, landlords, developers, and real estate brokers. The
              company offers listings for new homes, resale homes, rentals,
              plots and co-living spaces in India. Backed by strong research and
              analytics, the company’s experts provide comprehensive real estate
              services that cover advertising and marketing, sales solutions for
              real estate developers, personalized search, virtual viewing,
              AR&VR content, home loans, end-to-end transaction services, and
              post-transaction services to consumers for both buying and
              renting.
            </p>
          </div>
          <div className={`${styles.aboutWelcomeImg}`}>
            <img src="../../../img/contactusImg1.jpg" />
          </div>
        </div>

        <div className={`${styles.aboutPost}`}>
          <div className={`${styles.aboutPostImg}`}>
            <video
              controls
              className="h-50 w-90 border border-black rounded-lg"
            >
              <source src="../../../video/aboutusvideo.mp4" type="video/mp4" />
            </video>
          </div>
          <div className={`${styles.aboutPostText}`}>
            <p className={`${styles.aboutSubHeading} mt-10`}>
              Parr...se Perfect
            </p>
            <h1 className={`${styles.aboutHeading} mb-4`}>
              Post your property
            </h1>
            <p className="mb-2 text-gray-600 dark:text-gray-600 text-sm">
              Buying, Selling, Renting, or moving into a house can be a trial by
              fire, especially in India where we often take the hassles involved
              in the process as an integral part of the home purchase process.
              Our new idea for REC.com questions that behaviour, and motivates
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
            <img src="../../../img/contactusImg1.jpg" />
          </div>
          <div className={`${styles.aboutusVisionRight}`}>
            <div className={`${styles.agentRightMainContentMain}`}>
              <h1 className={`${styles.aboutHeading} blueText`}>Mission</h1>
              <div className="flex mt-2">
                <i className="bi bi-arrow-right mr-1"></i>
                <div className={`${styles.agentRightMainContent}`}>
                  <h2
                    className={`${styles.agentRightMainContentHead} font-semibold`}
                  >
                    Community Engagement :
                  </h2>
                  <p className={`${styles.agentRightMainContentText}`}>
                    We are committed to contributing positively to the
                    communities we serve, ensuring sustainable and inclusive
                    growth.
                  </p>
                </div>
              </div>
              <div className="flex mt-2">
                <i className="bi bi-arrow-right mr-1"></i>
                <div className={`${styles.agentRightMainContent}`}>
                  <h2
                    className={`${styles.agentRightMainContentHead} font-semibold`}
                  >
                    Transparency :{" "}
                  </h2>
                  <p className={`${styles.agentRightMainContentText}`}>
                    We foster trust by maintaining the highest standards of
                    honesty and openness in all our transactions and
                    interactions.
                  </p>
                </div>
              </div>
              <div className="flex mt-2">
                <i className="bi bi-arrow-right mr-1"></i>
                <div className={`${styles.agentRightMainContent}`}>
                  <h2
                    className={`${styles.agentRightMainContentHead} font-semibold`}
                  >
                    Customer-Centric Approach :
                  </h2>
                  <p className={`${styles.agentRightMainContentText}`}>
                    We put our customers at the heart of everything we do,
                    ensuring their needs and preferences guide our innovations
                    and services.
                  </p>
                </div>
              </div>
              <div className="flex mt-2">
                <i className="bi bi-arrow-right mr-1"></i>
                <div className={`${styles.agentRightMainContent}`}>
                  <h2
                    className={`${styles.agentRightMainContentHead} font-semibold`}
                  >
                    Integrity :
                  </h2>
                  <p className={`${styles.agentRightMainContentText}`}>
                    We uphold the highest ethical standards, ensuring our
                    actions always reflect our commitment to fairness and
                    honesty.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styles.aboutusMission} mt-10 mb-10`}>
          <div className={`${styles.aboutusVisionRight}`}>
            <div className={`${styles.agentRightMainContentMain}`}>
              <h1 className={`${styles.aboutHeading} blueText`}>Promise</h1>
              <div className="flex mt-4">
                <i className="bi bi-arrow-right mr-1"></i>
                <div className={`${styles.agentRightMainContent}`}>
                  <h2
                    className={`${styles.agentRightMainContentHead} font-semibold`}
                  >
                    Expert Support :
                  </h2>
                  <p className={`${styles.agentRightMainContentText}`}>
                    Our team of real estate professionals is always ready to
                    provide personalized guidance and support.
                  </p>
                </div>
              </div>
              <div className="flex mt-4">
                <i className="bi bi-arrow-right mr-1"></i>
                <div className={`${styles.agentRightMainContent}`}>
                  <h2
                    className={`${styles.agentRightMainContentHead} font-semibold`}
                  >
                    Comprehensive Listings :
                  </h2>
                  <p className={`${styles.agentRightMainContentText}`}>
                    Access a wide range of verified listings that cater to
                    diverse needs and budgets.
                  </p>
                </div>
              </div>
              <div className="flex mt-4">
                <i className="bi bi-arrow-right mr-1"></i>
                <div className={`${styles.agentRightMainContent}`}>
                  <h2
                    className={`${styles.agentRightMainContentHead} font-semibold`}
                  >
                    Simplified Processes :
                  </h2>
                  <p className={`${styles.agentRightMainContentText}`}>
                    Whether you’re a first-time homebuyer or a seasoned
                    investor, our platform is designed to provide a hassle-free
                    experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={`${styles.aboutWelcomeImg} ml-10`}>
            <img src="../../../img/contactusImg1.jpg" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;

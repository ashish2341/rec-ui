"use client";
import { BreadCrumbs } from "@/components/common/breadcrumb";
import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import React, { useEffect, useState, useRef } from "react";
import styles from "./byilderFE.module.css"
import { Dropdown } from "flowbite-react";
import { API_BASE_URL, API_BASE_URL_FOR_MASTER } from "@/utils/constants";
import useFetch from "@/customHooks/useFetch";
import { Avatar } from "flowbite-react";
import { Card } from "flowbite-react";
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";


const BuilderPage = () => {
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
                <div className={` ${styles.builderTop} mb-10`}>
                    <BreadCrumbs />
                    <h1 className={`${styles.propertiesByAreaMainHead}`}>Top Developers In Jaipur</h1>
                </div>
            </div>
            <div className={` ${styles.builderDetailPage}`}>
                <div className={` ${styles.builderDetailPageLeft} mb-10`}>
                    <div className={` ${styles.builderBox} mb-4`} >
                        <div className={` ${styles.builderInputField}`}>
                            <input
                                type="search"
                                //value={search}
                                ///onChange={handleSearch}
                                id="search-dropdown"
                                className={` ${styles.crousalItemSearchInput}`}
                                placeholder="Search for property"
                                required
                            />
                        </div>
                        <div className={` ${styles.builderline}`}></div>
                        <Accordion collapseAll className="border-none">
                            <AccordionPanel>
                                <AccordionTitle>All Categories</AccordionTitle>
                                <AccordionContent className={`${styles.AccordionContent}`}>
                                    <div className="mr-6 p-4">
                                        <span className="mb-2 text-gray-500 dark:text-gray-400 text-sm">Dining</span>
                                        <p className="">testimonialcontent</p>
                                    </div>
                                    <div className="mr-6 p-4">
                                        <span className="mb-2 text-gray-500 dark:text-gray-400 text-sm">Master Bedroom</span>
                                        <p className="">test</p>
                                    </div>
                                </AccordionContent>
                            </AccordionPanel>
                            <AccordionPanel>
                                <AccordionTitle>Location</AccordionTitle>
                                <AccordionContent className={`${styles.AccordionContent}`}>
                                    <div className="mr-6 p-4">
                                        <span className="mb-2 text-gray-500 dark:text-gray-400 text-sm">Dining</span>
                                        <p className="">testimonialcontent</p>
                                    </div>
                                    <div className="mr-6 p-4">
                                        <span className="mb-2 text-gray-500 dark:text-gray-400 text-sm">Master Bedroom</span>
                                        <p className="">test</p>
                                    </div>
                                </AccordionContent>
                            </AccordionPanel>
                        </Accordion>
                        <div className="p-4">
                            <button
                                className=" text-white bg-blue-700 rounded-md h-12 w-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm w-full  px-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Search
                            </button>
                        </div>
                    </div>
                    <div className={` ${styles.builderBox}`} >
                        <h1 className="m-4 ml-6 font-semibold">Recent Builder</h1>
                        <div className={` ${styles.builderHunter}`}>
                            <Avatar img="../../../img/contactusImg1.jpg" size="md" className="mr-2 p-4" rounded>
                                <div className="dark:text-white">
                                    <div className="text-xs font-semibold blueText text-nowrap">Signature Global Builder Pvt. Ltd.</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">Joined in August 2014</div>
                                </div>
                            </Avatar>
                            <Avatar img="../../../img/contactusImg1.jpg" size="md" className="mr-2 p-4" rounded>
                                <div className="dark:text-white">
                                    <div className="text-xs font-semibold blueText text-nowrap">Signature Global Builder Pvt. Ltd.</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">Joined in August 2014</div>
                                </div>
                            </Avatar>
                            <Avatar img="../../../img/contactusImg1.jpg" size="md" className="mr-2 p-4" rounded>
                                <div className="dark:text-white">
                                    <div className="text-xs font-semibold blueText text-nowrap">Signature Global Builder Pvt. Ltd.</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">Joined in August 2014</div>
                                </div>
                            </Avatar>
                            <Avatar img="../../../img/contactusImg1.jpg" size="md" className="mr-2 p-4" rounded>
                                <div className="dark:text-white">
                                    <div className="text-xs font-semibold blueText text-nowrap">Signature Global Builder Pvt. Ltd.</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">Joined in August 2014</div>
                                </div>
                            </Avatar>
                        </div>
                    </div>
                </div>
                <div className={` ${styles.builderDetailPageRight}`}>
                    <div className={` ${styles.builderTopRight} mb-4 flex justify-between mt-2`}>
                        <div>
                            <h1>Showing 1-3 of 130</h1>
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
                    <div className={` ${styles.builderDetailBuilderRight}`}>
                        <img 
                            src="../../../img/contactusImg1.jpg"
                            className={` ${styles.builderImgBuilder} mr-4`}
                        />
                        <div>
                            <h5 className="text-lg font-bold  text-gray-900 dark:text-white blueText">
                                Noteworthy technology acquisitions 2021
                            </h5>
                            <p className="text-sm text-gray-500 dark:text-white mb-4">Year estd. 2019</p>
                            <p className="text-sm text-gray-700 dark:text-black-400">
                                Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                            </p>
                        </div>
                    </div>
                    <div className={` ${styles.builderDetailPageDown}`}>
                        <div className={` ${styles.builderSocialLine}`} >
                            <div className={` ${styles.builderSocialIcon} text-gray-700`}>
                                <i class="bi bi-facebook"></i>
                                <i class="bi bi-instagram ml-3"></i>
                                <i class="bi bi-linkedin ml-3"></i>
                                <i class="bi bi-twitter ml-3"></i>
                                <i class="bi bi-pinterest ml-3"></i>
                            </div>
                            <div>
                                <p>100 properties listed</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <Footer />
        </>
    )
}

export default BuilderPage;
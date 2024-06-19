"use client"
import { BreadCrumbs } from "@/components/common/breadcrumb";
import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import React, { useEffect, useState, useRef } from "react";
import styles from "./byilderFE.module.css"
import { Dropdown } from "flowbite-react";
import { API_BASE_URL, API_BASE_URL_FOR_MASTER,imgApiUrl } from "@/utils/constants";
import useFetch from "@/customHooks/useFetch";
import { Avatar } from "flowbite-react";
import { Card } from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";
import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from "flowbite-react";
import { GetBuilderApi } from "@/api-functions/builder/getBuilder";
import Link from "next/link";
import LoadingSideImg from "@/components/common/sideImgLoader";
import LoadingSideSmallImg from "@/components/common/sideSmallImgLoader";

const BuilderPage = () => {
    const [search, setSearch] = useState("");
    const { data: areaData } = useFetch(`${API_BASE_URL_FOR_MASTER}/areas`);
    const {
        data: developData,
        loading: developLoading,
        error: developError,
    } = useFetch(`${API_BASE_URL}/developer/allDeveloper?page=1&pageSize=10&search=${search}`);

    const [builderData,setBuilderData]=useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllBuilder();
    }, []);

    useEffect(() => {
        setLoading(developLoading);
    }, [developLoading]);

    const getAllBuilder = async () => {
        let builder = await GetBuilderApi(search);
        if (builder?.resData?.success == true) {
            setBuilderData(builder?.resData);
            toast.success(builder?.resData?.message);
            setLoading(false);
        } else {
            toast.error(builder?.errMessage);
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

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
                                value={search}
                                onChange={handleSearch}
                                id="search-dropdown"
                                className={` ${styles.crousalItemSearchInput} rounded`}
                                placeholder="Search for Builder"
                                required
                            />
                        </div>
                        <div className={` ${styles.builderline}`}></div>
                        {/*
                        <Accordion collapseAll className="border-none">
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
                        */}
                    </div>
                    <div className={` ${styles.builderBox}`} >
                        <h1 className="m-4 ml-6 font-semibold">Recent Builder</h1>
                        <div className={` ${styles.builderHunter}`}>
                        {builderData ? (
                            builderData.data
                                .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                                .slice(0, 4)
                                .map((item, index) => (
                            <Link href={`/builderFE/${item._id}`}>
                            <Avatar key={index} img={`${imgApiUrl}/${item.Logo}`} size="md" className="mr-2 ml-1 justify-start p-4" rounded>
                                <div className="dark:text-white">
                                    <div className="text-xs font-semibold blueText text-nowrap">{item.Name}</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">Joined in {(item.EstablishDate ? String(item.EstablishDate).substring(0, 4) : 'N/A')}</div>
                                </div>
                            </Avatar>
                            </Link>
                            ))
                        ) : <LoadingSideSmallImg />}
                        </div>
                    </div>
                </div>
                <div className={` ${styles.builderDetailPageRight}`}>
                    <div className={` ${styles.builderTopRight} mb-4 flex justify-between mt-2`}>
                        <div>
                            {
                                developData?.count > 0 ? <h1>Showing {developData?.count} of {builderData.totalCount}</h1> : null
                            }
                        </div>
                    </div>
                    {developLoading ? (
                        <LoadingSideImg />
                    ) : developData?.count > 0 ?
                    (developData?.data?.map((item,index) => (
                    <div className={` ${styles.hoverEffect} mb-4 hover:bg-white`}>
                        <Link href={`/builderFE/${item._id}`}>
                        <div key={index} className={` ${styles.builderDetailBuilderRight} `}>
                            <img
                            src={`${imgApiUrl}/${item.Logo}`}
                                className={` ${styles.builderImgBuilder} mr-4`}
                            />
                            <div>
                                <h5 className="text-lg font-bold  text-gray-900 dark:text-white blueText">
                                    {item.Name}
                                </h5>
                                <p className="text-sm text-gray-500 dark:text-white mb-4">Year estd. {(item.EstablishDate ? String(item.EstablishDate).substring(0, 4) : 'N/A')}</p>
                                <p className="text-sm text-gray-700 dark:text-black-400">
                                    {item.Description}
                                </p>
                            </div>
                        </div>
                        </Link>

                        <div className={` ${styles.builderDetailPageDown}`}>
                            <div className={` ${styles.builderSocialLine}`} >
                                <div className={` ${styles.builderSocialIcon} text-gray-700`}>
                                    <Link href={item.SocialMediaProfileLinks.Facebook} target="_blank" rel="noopener noreferrer"><i className="bi bi-facebook"></i></Link>
                                    <Link href={item.SocialMediaProfileLinks.Instagram} target="_blank" rel="noopener noreferrer"><i className="bi bi-instagram ml-3"></i></Link>
                                    <Link href={item.SocialMediaProfileLinks.LinkedIn} target="_blank" rel="noopener noreferrer"><i className="bi bi-linkedin ml-3"></i></Link>
                                    <Link href={item.SocialMediaProfileLinks.Twitter} target="_blank" rel="noopener noreferrer"><i className="bi bi-twitter ml-3"></i></Link>
                                </div>
                                <div>
                                    <p>{item.PropertiesLength} properties listed</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))) : <h1 className="text-2xl font-semibold text-gray-300 text-center">No data Found </h1>}
                </div>
            </div>
        <Footer />
        </>
    )
}

export default BuilderPage;

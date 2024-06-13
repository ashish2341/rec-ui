"use client";
import styles from "./dashboard.module.css";
import { Card } from "flowbite-react";
import {
    GetAdminDashboardApi,
    GetBuilderDashboardApi,
} from "@/api-functions/dashboard/dashboardApi";
import { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import Chart from 'chart.js/auto';
import { ToastContainer, toast } from "react-toastify";
import LoadingImg from "@/components/common/loadingImg";
import { GetAdminGraphApi, GetBuilderGraphApi } from "@/api-functions/dashboard/graphApi";
import { Accordion } from "flowbite-react";


export default function Dashboard() {
    const roleData = Cookies.get("roles") ?? "";
    const name = Cookies.get("name");
    const roles = roleData && JSON.parse(roleData);
    const [adminDashboardData, setAdminDashboardData] = useState("");
    const [adminGraphData, setAdminGraphData] = useState("");
    const [builderDashboardData, setBuilderDashboardData] = useState("");
    const [builderGraphData, setBuilderGraphData] = useState("");


    useEffect(() => {
        console.log("useEffect roles", roles);
        if (roles.includes("Admin")) {
            console.log("admin function called");
            getPropertiesAdminDashboard();
            getPropertiesAdminGraph();
        } else {
            console.log("buillder function called");
            getPropertiesBuilderDashboard();
            getPropertiesBuilderGraph();
        }
    }, []);

    const getPropertiesAdminDashboard = async () => {
        let adminData = await GetAdminDashboardApi();
        if (adminData?.resData?.success == true) {
            setAdminDashboardData(adminData?.resData);
            return false;
        } else {
            toast.error(adminData?.errMessage);
            return false;
        }
    };

    const getPropertiesAdminGraph = async () => {
        let adminGraphData = await GetAdminGraphApi();
        if (adminGraphData?.resData?.success == true) {
            setAdminGraphData(adminGraphData?.resData);
            return false;
        } else {
            toast.error(adminGraphData?.errMessage);
            return false;
        }
    };

    const getPropertiesBuilderDashboard = async () => {
        let builderData = await GetBuilderDashboardApi();
        if (builderData?.resData?.success == true) {
            setBuilderDashboardData(builderData?.resData);

            return false;
        } else {
            toast.error(builderData?.errMessage);
            return false;
        }
    };

    const getPropertiesBuilderGraph = async () => {
        let builderGraphData = await GetBuilderGraphApi();
        if (builderGraphData?.resData?.success == true) {
            setBuilderGraphData(builderGraphData?.resData);

            return false;
        } else {
            toast.error(builderGraphData?.errMessage);
            return false;
        }
    };

    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        const createChart = () => {
            if (!chartRef.current || !adminGraphData) {
                return null;
            }

            const ctx = chartRef.current.getContext('2d');

            const builData = adminGraphData.builder || [];
            const userData = adminGraphData.user || [];
            const EnquiryData = adminGraphData.enquiry || [];
            const propertyData = adminGraphData.properties || [];

            const EnquiryBuilderData = builderGraphData.enquiry || [];
            const propertyBuilderData = builderGraphData.properties || [];

            const chartData = {
                labels: [
                    "Jan", "Feb", "March", "April", "May", "June"
                ],
                datasets: [{
                    label: 'Builder',
                    // data: builData.map(item => item.count),
                    data: [2, 4 , 6, 8, 100],
                    fill: false,
                    borderColor: 'rgba(10, 160, 237, 1)',
                    tension: 0.1
                },
                {
                    label: 'Property',
                    // data: propertyData.map(item => item.count),
                    data: [10, 14 , 16, 18],
                    fill: false,
                    borderColor: 'rgba(4, 153, 54, 1)',
                    tension: 0.1
                },
                {
                    label: 'User',
                    //data: userData.map(item => item.count),
                    data: [5, 12 , 17, 20],
                    fill: false,
                    borderColor: 'rgba(232, 175, 9, 1)',
                    tension: 0.1
                },
                {
                    label: 'Enquiry',
                    // data: EnquiryData.map(item => item.count),
                    data: [15, 13 , 19, 22, 500],
                    fill: false,
                    borderColor: 'rgba(34, 112, 190, 1)',
                    tension: 0.1
                }]
            };

            //   const chartBuilderData = {
            //     labels: builderGraphData.properties.length > 0 ? builderGraphData?.properties.map(item => item.month) : 1,
            //     datasets: [
            //      {
            //         label: 'Property',
            //         data: propertyBuilderData.map(item => item.count),
            //         fill: false,
            //         borderColor: 'rgba(4, 153, 54, 1)', 
            //         tension: 0.1
            //       },
            //       {
            //         label: 'Enquiry',
            //         data: EnquiryBuilderData.map(item => item.count),
            //         fill: false,
            //         borderColor: 'rgba(34, 112, 190, 1)',
            //         tension: 0.1
            //       }]
            //   };

            return new Chart(ctx, {
                type: 'line',
                data: roles.includes("Admin") ? chartData : null,
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        };

        chartInstance.current = createChart();

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [adminGraphData]);

    console.log("adminGraphData", adminGraphData);
    console.log("builderGraphData", builderGraphData);

    return (
        <>
            <div className={`${styles.dashboardContainer}`}>
                <div className={`${styles.dashboardContainerCards}`}>
                    {roles.includes("Admin") && (
                        <>
                            {/* User card */}
                            {adminDashboardData ? (
                                <div>
                                    <Card
                                        href="/users"
                                        className={`max-w-sm mb-2 mr-2 cursor-pointer ${styles.showCard1}`}
                                    >
                                        <div className="text-center">
                                            <h2 className={`text-xl font-bold mb-4 tracking-wide ${styles.dataSection1} `}>
                                                <div className={`${styles.IconOutline}`} >
                                                    <i className={`bi bi-file-earmark-person text-4xl ${styles.IconsColor}`} aria-hidden="true"></i>
                                                </div>

                                                <p className="text-5xl font-bold mt-2">
                                                    {adminDashboardData?.totalUser}
                                                </p>
                                                <p className="text-sm font-semibold mt-2">Total User</p>
                                            </h2>
                                        </div>
                                    </Card>
                                    <p className={`text-2xl font-bold mt-4 ${styles.UserColor} `}>

                                        {adminDashboardData?.todayUsers}{" "}
                                        <span className={`font-normal `}>Today Joined User </span>

                                    </p>
                                </div>
                            ) : (
                                <LoadingImg />
                            )}
                            {/* Builder card */}
                            {adminDashboardData ? (
                                <div>
                                    <Card
                                        href="/builder"
                                        className={`max-w-sm mb-2 mr-2 cursor-pointer ${styles.showCard2}`}
                                    >
                                        <div className="text-center">
                                            <h2 className={`text-xl font-bold mb-4 tracking-wide ${styles.dataSection1}  `}>
                                                <div className={`${styles.Icon2Outline}`} >
                                                    <i className={`bi bi-file-earmark-person text-4xl ${styles.Icons2Color}`} aria-hidden="true"></i>
                                                </div>
                                                <p className="text-5xl font-bold mt-2">
                                                    {adminDashboardData?.totalBuilder}
                                                </p>
                                                <p className="text-sm font-semibold mt-2">Total Builder</p>
                                            </h2>
                                        </div>
                                    </Card>
                                    <Accordion collapseAll className="border-none">
                                        <Accordion.Panel className={`${styles.faqItemMainBox}`}>
                                            <Accordion.Title
                                                className={`${styles.AccordiaonBuilderColor} focus:no-outline`}
                                            >
                                                <p className={`text-2xl font-bold ${styles.builderColor} `}>
                                                    {adminDashboardData?.todayAddBuilder}{" "}
                                                    <span className={`font-normal `}>Today Joined Builder </span>
                                                </p>
                                            </Accordion.Title>
                                            <Accordion.Content className={` ${styles.builderColor}  text-white`}>
                                                <p className={`text-2xl font-bold ${styles.builderColor} `}>
                                                    {adminDashboardData?.totalBuilderProperty}{" "}
                                                    <span className={`font-normal `}>Total Builder Property</span>

                                                </p>
                                            </Accordion.Content>
                                        </Accordion.Panel>
                                    </Accordion>
                                </div>
                            ) : (
                                <LoadingImg />
                            )}
                        </>
                    )}

                    {/* Property Card */}
                    {adminDashboardData || builderDashboardData ? (
                        <div>
                            <Card
                                href="/property"
                                className={`max-w-sm mb-2 mr-2 cursor-pointer ${styles.showCard3}`}
                            >
                                <div className="text-center">
                                    <h2 className={`text-xl font-bold mb-4 tracking-wide ${styles.dataSection1}  `}>
                                        <div className={`${styles.Icon3Outline}`} >
                                            <i className={`bi bi-house text-4xl ${styles.Icons3Color}`} aria-hidden="true"></i>
                                        </div>
                                        <p className="text-5xl font-bold mt-2">
                                            {roles.includes("Admin")
                                                ? adminDashboardData?.totalProperty
                                                : builderDashboardData?.totalProperty}
                                        </p>
                                        <p className="text-sm font-semibold mt-2">Total Property</p>
                                    </h2>
                                </div>
                                {/* <div className={`grid gap-2 mb-4 md:grid-cols-2`}>
                {" "}
                <div className="flex flex-col items-center mb-2">
                  <h3 className="text-xl font-bold tracking-wide ">
                    Total Property
                  </h3>
                  <p className="text-3xl font-bold mt-2">
                    {roles.includes("Admin")
                      ? adminDashboardData?.totalProperty
                      : builderDashboardData?.totalProperty}
                  </p>
                </div>
                <div className="flex flex-col  items-center mb-2">
                  <h3 className="text-xl font-bold tracking-wide ">
                    Under Review
                  </h3>
                  <p className="text-3xl font-bold mt-2">
                    {roles.includes("Admin")
                      ? adminDashboardData?.underReviewProperty
                      : builderDashboardData?.underReviewProperty}
                  </p>
                </div>
                <div className="flex flex-col  items-center mb-2">
                  <h3 className="text-xl font-bold tracking-wide ">
                    Today Added
                  </h3>
                  <p className="text-3xl font-bold mt-2">
                    {roles.includes("Admin")
                      ? adminDashboardData?.todayAddProperty
                      : builderDashboardData?.todayAddProperty}
                  </p>
                </div>
                <div className="flex flex-col  items-center mb-2">
                  <h3 className="text-xl font-bold tracking-wide ">Approved</h3>
                  <p className="text-3xl font-bold mt-2">
                    {roles.includes("Admin")
                      ? adminDashboardData?.approvedProperty
                      : builderDashboardData?.approvedProperty}
                  </p>
                </div>
                <div className="flex flex-col items-center mb-2 opacity-0 pointer-events-none">
                  <h3 className="text-xl font-bold tracking-wide">not show</h3>
                  <p className="text-3xl font-bold mt-2"> not show</p>
                </div>
              </div> */}
                            </Card>
                            <Accordion collapseAll className="border-none">
                                <Accordion.Panel className={`${styles.faqItemMainBox}`}>
                                    <Accordion.Title
                                        className={`${styles.AccordiaonPropColor} focus:no-outline`}
                                    >
                                        <p className={`text-2xl font-bold ${styles.PropColor} `}>

                                            {roles.includes("Admin")
                                                ? adminDashboardData?.todayAddProperty
                                                : builderDashboardData?.todayAddProperty}{" "}
                                            <span className={`font-normal `}>Today Added Property </span>

                                        </p>
                                    </Accordion.Title>
                                    <Accordion.Content className={` ${styles.PropColor} mt-2  text-white`}>
                                        <p className={`text-2xl font-bold ${styles.PropColor} `}>

                                            {roles.includes("Admin")
                                                ? adminDashboardData?.underReviewProperty
                                                : builderDashboardData?.underReviewProperty}{" "}
                                            <span className={`font-normal `}>Under Review Property </span>

                                        </p>
                                    </Accordion.Content>
                                    <Accordion.Content className={` ${styles.PropColor} mt-2  text-white`}>
                                        <p className={`text-2xl font-bold ${styles.PropColor} `}>

                                            {roles.includes("Admin")
                                                ? adminDashboardData?.approvedProperty
                                                : builderDashboardData?.approvedProperty}{" "}
                                            <span className={`font-normal `}>Approved Property </span>

                                        </p>
                                    </Accordion.Content>
                                </Accordion.Panel>
                            </Accordion>



                        </div>
                    ) : (
                        <LoadingImg />
                    )}
                    {/* Enquiry Card */}
                    {adminDashboardData || builderDashboardData ? (
                        <div>
                            <Card
                                href="/projectInquiry"
                                className={`max-w-sm mb-2 cursor-pointer ${styles.showCard4}`}
                            >
                                <div className="text-center">
                                    <h2 className={`text-xl font-bold mb-4  tracking-wide ${styles.dataSection1} `}>
                                        <div className={`${styles.IconOutline}`} >
                                            <i className={`bi bi-chat-square-text text-4xl ${styles.Icons4Color}`} aria-hidden="true"></i>
                                        </div>
                                        <p className="text-5xl font-bold mt-2">
                                            {roles.includes("Admin")
                                                ? adminDashboardData?.totalEnquiry
                                                : builderDashboardData?.totalEnquiry}
                                        </p>
                                        <p className="text-sm font-semibold mt-2">Total Enquiry</p>
                                    </h2>
                                </div>
                                {/* <div className={`grid gap-2 mb-4 md:grid-cols-2`}>
                {" "}
                <div className="flex flex-col items-center mb-2">
                  <h3 className="text-xl font-bold tracking-wide ">
                    Total Enquiry
                  </h3>
                  <p className="text-3xl font-bold mt-2">
                    {roles.includes("Admin")
                      ? adminDashboardData?.totalEnquiry
                      : builderDashboardData?.totalEnquiry}
                  </p>
                </div>
                <div className="flex flex-col  items-center mb-2">
                  <h3 className="text-xl font-bold tracking-wide ">Today</h3>
                  <p className="text-3xl font-bold mt-2">
                    {roles.includes("Admin")
                      ? adminDashboardData?.todayEnquiry
                      : builderDashboardData?.todayEnquiry}
                  </p>
                </div>
                <div className="flex flex-col  items-center mb-2">
                  <h3 className="text-xl font-bold tracking-wide ">Property</h3>
                  <p className="text-3xl font-bold mt-2">
                    {roles.includes("Admin")
                      ? adminDashboardData?.totalEnquiryContactUs
                      : builderDashboardData?.totalEnquiryContactUs}
                  </p>
                </div>
                <div className="flex flex-col  items-center mb-2">
                  <h3 className="text-xl font-bold tracking-wide ">
                    Contactus
                  </h3>
                  <p className="text-3xl font-bold mt-2">
                    {roles.includes("Admin")
                      ? adminDashboardData?.totalEnquiryProperty
                      : builderDashboardData?.totalEnquiryProperty}
                  </p>
                </div>
                <div className="flex flex-col  items-center mb-2">
                  <h3 className="text-xl font-bold tracking-wide ">
                    Astrology
                  </h3>
                  <p className="text-3xl font-bold mt-2">
                    {roles.includes("Admin")
                      ? adminDashboardData?.totalEnquiryAstrology
                      : builderDashboardData?.totalEnquiryAstrology}
                  </p>
                </div>
              </div> */}
                            </Card>
                            <Accordion collapseAll className="border-none">
                                <Accordion.Panel className={`${styles.faqItemMainBox}`}>
                                    <Accordion.Title
                                        className={`${styles.AccordiaonEnqColor} focus:no-outline`}
                                    >
                                        <p className={`text-2xl font-bold ${styles.EnqColor} `}>

                                            {roles.includes("Admin")
                                                ? adminDashboardData?.todayEnquiry
                                                : builderDashboardData?.todayEnquiry}{" "}
                                            <span className={`font-normal `}>Today's Enquiry </span>
                                        </p>
                                    </Accordion.Title>
                                    <Accordion.Content className={` ${styles.EnqColor} mt-2  text-white`}>
                                        <p className={`text-2xl font-bold mt-2 ${styles.EnqColor} `}>

                                            {roles.includes("Admin")
                                                ? adminDashboardData?.totalEnquiryAstrology
                                                : builderDashboardData?.totalEnquiryAstrology}{" "}
                                            <span className={`font-normal `}>Astrology Enquiry </span>
                                        </p>
                                    </Accordion.Content>
                                    <Accordion.Content className={` ${styles.EnqColor} mt-2  text-white`}>
                                        <p className={`text-2xl font-bold mt-2 ${styles.EnqColor} `}>

                                            {roles.includes("Admin")
                                                ? adminDashboardData?.totalEnquiryContactUs
                                                : builderDashboardData?.totalEnquiryContactUs}{" "}
                                            <span className={`font-normal `}>Contact Us Enquiry </span>
                                        </p>
                                    </Accordion.Content>
                                    <Accordion.Content className={` ${styles.EnqColor} mt-2  text-white`}>
                                        <p className={`text-2xl font-bold mt-2 ${styles.EnqColor} `}>

                                            {roles.includes("Admin")
                                                ? adminDashboardData?.totalEnquiryProperty
                                                : builderDashboardData?.totalEnquiryProperty}{" "}
                                            <span className={`font-normal `}>Property Enquiry </span>
                                        </p>
                                    </Accordion.Content>
                                </Accordion.Panel>
                            </Accordion>
                        </div>
                    ) : (
                        <LoadingImg />
                    )}
                </div>
                <div className={`${styles.SecondContainer}`}>
                    {/* <h1 className="text-3xl font-bold pt-4 pl-4">User Property Growth Report </h1>
                    <div className={`${styles.SecondContainerItems}`}>
                        <div className="w-full">
                            <h1 className="text-2xl font-bold">{adminDashboardData?.approvedProperty ? adminDashboardData?.approvedProperty : "0"}% <span className="text-lg font-semibold text-gray-400">User</span></h1>
                            <div className="w-full bg-gray-300 rounded-full dark:bg-gray-300 mt-2">
                                <div
                                    className="bg-yellow-400 text-xs font-medium text-blue-100 text-center p-1 leading-none rounded-full"
                                    style={adminDashboardData?.approvedProperty ? { width: `${adminDashboardData?.approvedProperty}%` } : { width: "0%" }}
                                >
                                </div>
                            </div>
                        </div>
                        <div className="w-full">
                            <h1 className="text-2xl font-bold">{adminDashboardData?.approvedProperty ? adminDashboardData?.approvedProperty : "0"}% <span className="text-lg font-semibold text-gray-400">Builder</span></h1>
                            <div className="w-full bg-gray-300 rounded-full dark:bg-gray-300 mt-2 ">
                                <div
                                    className="bg-blue-400 text-xs font-medium text-blue-100 text-center p-1 leading-none rounded-full"
                                    style={adminDashboardData?.approvedProperty ? { width: `${adminDashboardData?.approvedProperty}%` } : { width: "0%" }}
                                >
                                </div>
                            </div>
                        </div>
                        <div className="w-full">
                            <h1 className="text-2xl font-bold">{adminDashboardData?.approvedProperty ? adminDashboardData?.approvedProperty : "0"}% <span className="text-lg font-semibold text-gray-400">Property</span></h1>
                            <div className="w-full bg-gray-300 rounded-full dark:bg-gray-300 mt-2">
                                <div
                                    className="bg-green-400 text-xs font-medium text-blue-100 text-center p-1 leading-none rounded-full"
                                    style={adminDashboardData?.approvedProperty ? { width: `${adminDashboardData?.approvedProperty}%` } : { width: "0%" }}
                                >
                                </div>
                            </div>
                        </div>
                        <div className="w-full">
                            <h1 className="text-2xl font-bold">{adminDashboardData?.approvedProperty ? adminDashboardData?.approvedProperty : "0"}% <span className="text-lg font-semibold text-gray-400">Enquiry</span></h1>
                            <div className="w-full bg-gray-300 rounded-full dark:bg-gray-300 mt-2">
                                <div
                                    className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-1 leading-none rounded-full"
                                    style={adminDashboardData?.approvedProperty ? { width: `${adminDashboardData?.approvedProperty}%` } : { width: "0%" }}
                                >
                                </div>
                            </div>
                        </div>

                    </div> */}
                    <div className={`${styles.graphSize}`} >
                        <canvas ref={chartRef} />
                    </div>
                </div>
            </div>
        </>
    );
}

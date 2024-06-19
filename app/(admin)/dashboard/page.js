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
import { getPrevious12Months } from "@/utils/commonHelperFn";
import Link from "next/link";
import { GetEnquiryByBuilderApi } from "@/api-functions/enquiry/getEnquiryByBuilder";


export default function Dashboard() {
    const roleData = Cookies.get("roles") ?? "";
    const name = Cookies.get("name");
    const roles = roleData && JSON.parse(roleData);
    const [adminDashboardData, setAdminDashboardData] = useState("");
    const [adminGraphData, setAdminGraphData] = useState("");
    const [builderDashboardData, setBuilderDashboardData] = useState("");
    const [builderGraphData, setBuilderGraphData] = useState("");
    const [page, setPage] = useState(1);
    const [searchData, setSearchData] = useState("");
    const [filterData, setFilterData] = useState("");


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
            if (!chartRef.current) {
                return null;
            }

            const ctx = chartRef.current.getContext('2d');


            const builData = adminGraphData.builder || [];
            const userData = adminGraphData.user || [];
            const EnquiryData = adminGraphData.enquiry || [];
            const propertyData = adminGraphData.properties || [];
            // const EnquiryData = adminGraphData ? adminGraphData.enquiry : builderGraphData.enquiry ;
            // const propertyData = adminGraphData ? adminGraphData.properties : builderGraphData.properties ;

            const EnquiryBuilderData = builderGraphData.enquiry || [];
            const propertyBuilderData = builderGraphData.properties || [];
            let chartData = {}

            console.log("roles", roles);

            if (roles.includes("Admin")) {
                chartData = {
                    labels: getPrevious12Months(),
                    datasets: [{
                        label: 'Builder',
                        data: getPrevious12Months().map(prevMonth => builData.find(mObj => mObj.month == prevMonth)?.count ?? 0),
                        fill: false,
                        borderColor: 'rgba(10, 160, 237, 1)',
                        tension: 0.1
                    },
                    {
                        label: 'Property',
                        data: getPrevious12Months().map(prevMonth => propertyData.find(mObj => mObj.month == prevMonth)?.count ?? 0),
                        fill: false,
                        borderColor: '#7526ec',
                        tension: 0.1
                    },
                    {
                        label: 'User',
                        data: getPrevious12Months().map(prevMonth => userData.find(mObj => mObj.month == prevMonth)?.count ?? 0),
                        fill: false,
                         borderColor: '#e8af09',
                        tension: 0.1
                    },
                    {
                        label: 'Enquiry',
                        data: getPrevious12Months().map(prevMonth => EnquiryData.find(mObj => mObj.month == prevMonth)?.count ?? 0),
                        fill: false,
                        borderColor: '#f07b27',
                        tension: 0.1
                    }]
                };
            } else {
                chartData = {
                    labels: getPrevious12Months(),
                    datasets: [
                        {
                            label: 'Property',
                            // data: [1, 2, 3, 4],
                            data:  getPrevious12Months().map( prevMonth => propertyBuilderData.find( mObj => mObj.month==prevMonth)?.count ?? 0 ),
                            fill: false,
                            borderColor: '#7526ec',
                            tension: 0.1
                        },
                        {
                            label: 'Enquiry',
                            data: getPrevious12Months().map(prevMonth => EnquiryBuilderData.find(mObj => mObj.month == prevMonth)?.count ?? 0),
                            fill: false,
                            borderColor: '#f07b27',
                            tension: 0.1
                        }]
                };
            }


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
                data: chartData,
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

    const getAllEnquiryByBuilder = async (filterType) => {
        let enquiries = await GetEnquiryByBuilderApi(page, searchData, filterType);
        if (enquiries?.resData?.success == true) {
            toast.success(enquiries?.resData?.message);
            return false;
        } else {
            toast.error(enquiries?.errMessage);
            return false;
        }
    };

    console.log("adminGraphData", adminGraphData);
    console.log("builderGraphData", builderGraphData);

    return (
        <>
            <div className={`${styles.dashboardContainer}`}>
                <div className={`grid grid-cols-2 gap-4 `}>
                    {roles.includes("Admin") && (
                        <>
                            {/* User card */}
                            {adminDashboardData ? (
                                <div>
                                    <Card
                                        className={`col-span-2  text-nowrap ${styles.showCard1}`}
                                    >
                                        <div className="flex">
                                            <Link href="/users" className="focus:outline ">
                                                <div className="text-center">
                                                    <h2 className={`text-xl font-bold mb-4 tracking-wide ${styles.dataSection1} `}>
                                                        <div className={`${styles.IconOutline}`} >
                                                            <i className={`bi bi-file-earmark-person text-4xl ${styles.IconsColor}`} aria-hidden="true"></i>
                                                        </div>
                                                        <div className={`${styles.firstCard}`}>
                                                        <p className="text-5xl font-bold mt-2">
                                                            {adminDashboardData?.totalUser - 1}
                                                        </p>
                                                        <p className="text-sm font-semibold mt-2">Total User</p>
                                                        </div>
                                                     
                                                    </h2>
                                                </div>
                                            </Link>
                                            <div className="text-nowrap" >
                                                <Link href={`/users?todayUser=yes`} className={`${styles.InvertedUserColor} `}>
                                                    <p className={`text-2xl font-bold mt-4  ${styles.UserColor} hover:underline `}>

                                                        {adminDashboardData?.todayUsers}{" "}
                                                        <span className={`font-normal nowrap `}>Today Joined User </span>

                                                    </p>
                                                </Link>
                                                <Link href={`/users?type=builder`} className={`${styles.InvertedUserColor} hover:underline`}>
                                                    <p className={`text-2xl font-bold mt-4  ${styles.UserColor} hover:underline`}>

                                                        {adminDashboardData?.totalBuilder}{" "}
                                                        <span className={`font-normal nowrap `}> Builder</span>

                                                    </p>
                                                </Link>
                                            </div>
                                        </div>
                                    </Card>

                                </div>
                            ) : (
                                <LoadingImg />
                            )}
                            {/* Builder card */}
                            {adminDashboardData ? (
                                <div>
                                    <Card
                                        className={`col-span-2  text-nowrap ${styles.showCard2}`}
                                    >

                                        <div className="flex">
                                            <Link href="/builder">
                                                <div className="text-center">
                                                    <h2 className={`text-xl font-bold mb-4 tracking-wide ${styles.dataSection1}  `}>
                                                        <div className={`${styles.Icon2Outline}`} >
                                                            <i className={`bi bi-file-earmark-person text-4xl ${styles.Icons2Color}`} aria-hidden="true"></i>
                                                        </div>
                                                        <div className={`${styles.secondCard}`}>
                                                        <p className="text-5xl font-bold mt-2">
                                                            {adminDashboardData?.totalBuilder}
                                                        </p>
                                                        <p className="text-sm font-semibold mt-2">Total Builder</p>
                                                        </div>
                                                     
                                                    </h2>
                                                </div>
                                            </Link>
                                            <div>
                                                <Link href={`/builder?todayBuilder=yes`}>
                                                    <p className={`text-2xl font-bold mt-4 ${styles.builderColor} hover:underline`}>
                                                        {adminDashboardData?.todayAddBuilder}{" "}
                                                        <span className={`font-normal `}>Today Joined Builder </span>
                                                    </p>
                                                </Link>
                                                <Link href={`/property?type=builder`}>
                                                    <p className={`text-2xl font-bold mt-4 ${styles.builderColor} hover:underline`}>
                                                        {adminDashboardData?.totalBuilderProperty}{" "}
                                                        <span className={`font-normal `}>Total Builder Property</span>

                                                    </p>
                                                </Link>
                                            </div>
                                        </div>
                                    </Card>
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
                                className={`col-span-2 text-nowrap ${styles.showCard3}`}
                            >
                                <div className="flex">
                                    <Link href="/property">
                                        <div className="text-center">
                                            <h2 className={`text-xl font-bold mb-4 tracking-wide ${styles.dataSection1}  `}>
                                                <div className={`${styles.Icon3Outline}`} >
                                                    <i className={`bi bi-house text-4xl ${styles.Icons3Color}`} aria-hidden="true"></i>
                                                </div>
                                                <div className={`${styles.propertyCard}`}>
                                                <p className="text-5xl font-bold mt-2">
                                                    {roles.includes("Admin")
                                                        ? adminDashboardData?.totalProperty
                                                        : builderDashboardData?.totalProperty}
                                                </p>
                                                <p className="text-sm font-semibold mt-2">Total Property</p>
                                                </div >
                                               
                                            </h2>
                                        </div>
                                    </Link>
                                    <div>
                                        <Link href={`/property?todayProperty=yes`}>
                                            <p className={`text-2xl font-bold ${styles.PropColor} hover:underline`}>

                                                {roles.includes("Admin")
                                                    ? adminDashboardData?.todayAddProperty
                                                    : builderDashboardData?.todayAddProperty}{" "}
                                                <span className={`font-normal `}>Today Added Property </span>

                                            </p>
                                        </Link>
                                        {roles.includes("Admin") ?
                                            <Link href="/reviewProperty">
                                                <p className={`text-2xl font-bold ${styles.PropColor} hover:underline`}>

                                                        {adminDashboardData?.underReviewProperty}{" "}
                                                    <span className={`font-normal `}>Under Review Property </span>

                                                </p>
                                            </Link>
                                            :
                                            <Link href="/property?showValue=false">
                                                <p className={`text-2xl font-bold ${styles.PropColor} hover:underline`}>

                                                    {builderDashboardData?.underReviewProperty}{" "}
                                                    <span className={`font-normal `}>Under Review Property </span>

                                                </p>
                                            </Link>
                                        }
                                        {roles.includes("Admin") ?
                                            <Link href="/property">
                                            <p className={`text-2xl font-bold ${styles.PropColor} hover:underline`}>

                                                {adminDashboardData?.approvedProperty}
                                                <span className={`font-normal `}> Approved Property </span>

                                            </p>
                                        </Link>
                                            :
                                            <Link href="/property?showValue=true">
                                                <p className={`text-2xl font-bold ${styles.PropColor} hover:underline`}>

                                                    {builderDashboardData?.approvedProperty}{" "}
                                                    <span className={`font-normal `}> Approved Property </span>

                                                </p>
                                            </Link>
                                        }
                                        
                                    </div>
                                </div>
                            </Card>

                        </div>
                    ) : (
                        <LoadingImg />
                    )}
                    {/* Enquiry Card */}
                    {adminDashboardData || builderDashboardData ? (
                        <div>
                            <Card
                                className={`col-span-2  text-nowrap ${styles.showCard4}`}
                            >
                                <div className="flex">
                                    <Link href="/projectInquiry">

                                        <div className="text-center">
                                            <h2 className={`text-xl font-bold mb-4  tracking-wide ${styles.dataSection1} `}>
                                                <div className={`${styles.IconOutline}`} >
                                                    <i className={`bi bi-chat-square-text text-4xl ${styles.Icons4Color}`} aria-hidden="true"></i>
                                                </div>
                                                <div className={`${styles.enquiryCard}`}>
                                                <p className="text-5xl font-bold mt-2">
                                                    {roles.includes("Admin")
                                                        ? adminDashboardData?.totalEnquiry
                                                        : builderDashboardData?.totalEnquiry}
                                                </p>
                                                <p className="text-sm font-semibold mt-2">Total Enquiry</p>
                                                </div >
                                                
                                            </h2>
                                        </div>
                                    </Link>
                                    <div>
                                        <Link href={`/projectInquiry?todayEnquiry=yes`} >

                                            <p className={`text-2xl font-bold ${styles.EnqColor} hover:underline `}>

                                                {roles.includes("Admin")
                                                    ? adminDashboardData?.todayEnquiry
                                                    : builderDashboardData?.todayEnquiry}{" "}
                                                <span className={`font-normal `}>Today's Enquiry </span>
                                            </p>
                                        </Link>
                                        <Link href={`/projectInquiry?type=Astrology`}>

                                            <p className={`text-2xl font-bold mt-2 ${styles.EnqColor} hover:underline `}>

                                                {roles.includes("Admin")
                                                    ? adminDashboardData?.totalEnquiryAstrology
                                                    : builderDashboardData?.totalEnquiryAstrology}{" "}
                                                <span className={`font-normal `}>Astrology Enquiry </span>
                                            </p>
                                        </Link>
                                        <Link href={`/projectInquiry?type=ContactUs`}>

                                            <p className={`text-2xl font-bold mt-2 ${styles.EnqColor} hover:underline`}>

                                                {roles.includes("Admin")
                                                    ? adminDashboardData?.totalEnquiryContactUs
                                                    : builderDashboardData?.totalEnquiryContactUs}{" "}
                                                <span className={`font-normal `}>Contact Us Enquiry </span>
                                            </p>
                                        </Link>
                                        <Link href={`/projectInquiry?type=Property`}>

                                            <p className={`text-2xl font-bold mt-2 ${styles.EnqColor} hover:underline`}>

                                                {roles.includes("Admin")
                                                    ? adminDashboardData?.totalEnquiryProperty
                                                    : builderDashboardData?.totalEnquiryProperty}{" "}
                                                <span className={`font-normal `}>Property Enquiry </span>
                                            </p>
                                        </Link>
                                    </div>
                                </div>
                            </Card>
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

"use client";
import styles from "./dashboard.module.css";
import { Card } from "flowbite-react";
import {
  GetAdminDashboardApi,
  GetBuilderDashboardApi,
} from "@/api-functions/dashboard/dashboardApi";
import { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import Chart from "chart.js/auto";
import { ToastContainer, toast } from "react-toastify";
import LoadingImg from "@/components/common/loadingImg";
import {
  GetAdminGraphApi,
  GetBuilderGraphApi,
} from "@/api-functions/dashboard/graphApi";
import { getPrevious12Months } from "@/utils/commonHelperFn";
import Link from "next/link";
import CommonLoader from "@/components/common/commonLoader/commonLoader";

export default function Dashboard() {
  const roleData = Cookies.get("roles") ?? "";
  const name = Cookies.get("name");
  const roles = roleData && JSON.parse(roleData);
  const [adminDashboardData, setAdminDashboardData] = useState("");
  const [adminGraphData, setAdminGraphData] = useState("");
  const [builderDashboardData, setBuilderDashboardData] = useState("");
  const [builderGraphData, setBuilderGraphData] = useState("");
  const [loaderIsLoading, setLoaderIsLoading] = useState(false);


  useEffect(() => {

    if (roles.includes("Admin")) {

      getPropertiesAdminDashboard();
      getPropertiesAdminGraph();
    } else {

      getPropertiesBuilderDashboard();
      getPropertiesBuilderGraph();
    }
  }, []);

  const getPropertiesAdminDashboard = async () => {
    setLoaderIsLoading(true)
    let adminData = await GetAdminDashboardApi();
    if (adminData?.resData?.success == true) {
      setAdminDashboardData(adminData?.resData);
      setLoaderIsLoading(false)
      return false;
    } else {
      toast.error(adminData?.errMessage);
      setLoaderIsLoading(false)
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
    setLoaderIsLoading(true)
    let builderData = await GetBuilderDashboardApi();
    if (builderData?.resData?.success == true) {
      setBuilderDashboardData(builderData?.resData);
      setLoaderIsLoading(false)
      return false;
    } else {
      toast.error(builderData?.errMessage);
      setLoaderIsLoading(false)
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

      const ctx = chartRef.current.getContext("2d");

      const builData = adminGraphData.builder || [];
      const userData = adminGraphData.user || [];
      const EnquiryData = adminGraphData.enquiry || [];
      const propertyData = adminGraphData.properties || [];

      const EnquiryBuilderData = builderGraphData.enquiry || [];
      const propertyBuilderData = builderGraphData.properties || [];
      let chartData = {};



      if (roles.includes("Admin")) {
        chartData = {
          labels: getPrevious12Months(),
          datasets: [
            {
              label: "Builder",
              data: getPrevious12Months().map(
                (prevMonth) =>
                  builData.find((mObj) => mObj.month == prevMonth)?.count ?? 0
              ),
              fill: false,
              borderColor: "rgba(10, 160, 237, 1)",
              tension: 0.1,
            },
            {
              label: "Property",
              data: getPrevious12Months().map(
                (prevMonth) =>
                  propertyData.find((mObj) => mObj.month == prevMonth)?.count ??
                  0
              ),
              fill: false,
              borderColor: "#7526ec",
              tension: 0.1,
            },
            {
              label: "User",
              data: getPrevious12Months().map(
                (prevMonth) =>
                  userData.find((mObj) => mObj.month == prevMonth)?.count ?? 0
              ),
              fill: false,
              borderColor: "#e8af09",
              tension: 0.1,
            },
            {
              label: "Enquiry",
              data: getPrevious12Months().map(
                (prevMonth) =>
                  EnquiryData.find((mObj) => mObj.month == prevMonth)?.count ??
                  0
              ),
              fill: false,
              borderColor: "#f07b27",
              tension: 0.1,
            },
          ],
        };
      } else {
        chartData = {
          labels: getPrevious12Months(),
          datasets: [
            {
              label: "Property",
              // data: [1, 2, 3, 4],
              data: getPrevious12Months().map(
                (prevMonth) =>
                  propertyBuilderData.find((mObj) => mObj.month == prevMonth)
                    ?.count ?? 0
              ),
              fill: false,
              borderColor: "#7526ec",
              tension: 0.1,
            },
            {
              label: "Enquiry",
              data: getPrevious12Months().map(
                (prevMonth) =>
                  EnquiryBuilderData.find((mObj) => mObj.month == prevMonth)
                    ?.count ?? 0
              ),
              fill: false,
              borderColor: "#f07b27",
              tension: 0.1,
            },
          ],
        };
      }

      return new Chart(ctx, {
        type: "line",
        data: chartData,
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    };

    chartInstance.current = createChart();

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [adminGraphData]);



  return (
    <>
    {loaderIsLoading && <CommonLoader />}
      <div className={`${styles.dashboardContainer}`}>
        <div className="flex justify-center mb-4 w-full">
        <div className={`grid  gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2  item-center justify-center ${styles.ALLConatiner}`}>
          {roles.includes("Admin") && (
            <>
              {/* User card */}
              {adminDashboardData ? (
                <div className={`w-full flex ${styles.showResponsive1}`}>
                  <Card className={` text-nowrap rounded-xl p-0 ${styles.showCard1} mr-1 mb-6`}>
                    <Link href="/users">
                      <div className="text-start">
                        <h2
                          className={`text-xl font-bold tracking-wide ${styles.dataSection1}  `}
                        >
                          <div>
                            <img
                              src="../../../img/questionnaire.png"
                              width="50"
                              height="50"
                            />
                          </div>
                          <div className={`${styles.firstCard}`}>
                            <p className="text-5xl font-bold mt-2">
                              {adminDashboardData?.totalUser - 1}{" "}
                            </p>
                            <p className="text-sm font-semibold mt-2">
                              Total Users
                            </p>
                          </div>
                        </h2>
                      </div>
                    </Link>
                  </Card>

                  <div className="flex w-full">
                    <Card href={`/users?todayUser=yes`} className={`w-full text-nowrap rounded-xl mr-1 mb-1 pr-4 ${styles.showBuilderCardInner1}`}>
                      <div>
                        <img
                          src="../../../img/town.png"
                          width="30"
                          height="30"
                        />
                      </div>
                      <div className={`${styles.firstCard}`}>
                        <p className="text-xl font-bold">
                          {adminDashboardData?.todayUsers}
                        </p>
                        <p className="text-sm font-semibold mt-2">
                          Today Joined User
                        </p>
                      </div>
                    </Card>
                    <Card href={`/users?type=builder`} className={` w-full text-nowrap rounded-xl mr-1 mb-1 ${styles.showBuilderCardInnerNEXT} pr-24`}>
                      <div>
                        <img
                          src="../../../img/town.png"
                          width="30"
                          height="30"
                        />
                      </div>
                      <div className={`${styles.firstCard}`}>
                        <p className="text-xl font-bold">
                          {adminDashboardData?.totalBuilder}
                        </p>
                        <p className="text-sm font-semibold mt-2">
                          Builder
                        </p>
                      </div>
                    </Card>
                  </div>
                </div>
              ) : (
                <LoadingImg />
              )}
              {/* Builder card */}
              {adminDashboardData ? (
                <div className={`w-full flex ${styles.showResponsive2}`}>
                  <Card className={`w-full text-nowrap rounded-xl col-span-1 ${styles.showCard2} mr-1 mb-3`}>
                    <Link href="/builder">
                      <div className="text-start">
                        <h2
                          className={`text-xl font-bold tracking-wide ${styles.dataSectionBuilder2}  `}
                        >
                          <div>
                            <img
                              src="../../../img/town.png"
                              width="50"
                              height="50"
                            />
                          </div>
                          <div className={`${styles.secondCard}`}>
                            <p className="text-5xl font-bold mt-2">
                              {adminDashboardData?.totalBuilder}
                            </p>
                            <p className="text-sm font-semibold mt-2">
                              Total Builder
                            </p>
                          </div>
                        </h2>
                      </div>
                    </Link>
                  </Card>
                  <div className="flex">
                    <Card href={`/builder?todayBuilder=yes`} className={`w-full text-nowrap rounded-xl p-0 mb-2 mr-1 ${styles.showBuilderCardinner2}`}>
                      <div>
                        <img
                          src="../../../img/technician.png"
                          width="30"
                          height="30"
                        />
                      </div>
                      <div className={`${styles.secondCard}`}>
                        <p className="text-xl font-bold">
                          {adminDashboardData?.todayAddBuilder}
                        </p>
                        <p className="text-sm font-semibold mt-2">
                          Today Joined Builder
                        </p>
                      </div>
                    </Card>
                    <Card href={`/property?type=builder`} className={`w-full text-nowrap rounded-xl p-0 ${styles.showBuilderCardinner2}`}>
                      <div>
                        <img
                          src="../../../img/technician.png"
                          width="30"
                          height="30"
                        />
                      </div>
                      <div className={`${styles.secondCard}`}>
                        <p className="text-xl font-bold ">
                          {adminDashboardData?.totalBuilderProperty}
                        </p>
                        <p className="text-sm font-semibold mt-2">
                          Total Builder Property
                        </p>
                      </div>
                    </Card>
                  </div>
                </div>

              ) : (
                <LoadingImg />
              )}
            </>
          )}

          {/* Property Card */}
          {adminDashboardData || builderDashboardData ? (
            <div className={`w-full ${styles.showResponsive3}`}>
              {roles.includes("Admin") ?
                <div className="flex h-full">
                    <Card className={` text-nowrap rounded-xl ${styles.showAdminCard3} mr-1`}>
                      <Link href="/property">
                        <div className="text-start">
                          <div>
                            <img src="../../../img/town.png" width="50" height="50" />
                          </div>
                          <div className={`${styles.propertyCard}`}>
                            <p className="text-5xl font-bold mt-2">
                              {adminDashboardData?.totalProperty}
                            </p>
                            <p className="text-sm font-semibold mt-2">
                              Total Property
                            </p>
                          </div>
                          <Link href={`/property?todayProperty=yes`}>
                            <p className={`text-lg mb-2 font-bold ${styles.PropColor} hover:underline`}>
                              {adminDashboardData?.todayAddProperty}
                              <span className={`font-normal`}> added today</span>
                            </p>
                          </Link>
                        </div>
                      </Link>
                    </Card>
                  <div className={`grid grid-cols-2 gap-x-1 ${styles.showResponsiveInner3}`}>

                    <div className={`${styles.propertyCardInner}`}>
                      <Card href="/property" className={`w-full text-nowrap rounded-xl ${styles.showAdminCardinner3}`}>
                        <div className="text-start">
                          <div>
                            <img src="../../../img/technician.png" width="30" height="30" />
                          </div>
                          <div className={`${styles.propertyCard}`}>
                            <p className="text-xl font-bold">
                              {adminDashboardData?.approvedProperty}
                            </p>
                            <p className="text-sm font-semibold mt-2">
                              Approved Property
                            </p>
                          </div>
                        </div>
                      </Card>
                    </div>

                    <div className={`${styles.propertyCardInner}`}>
                      <Card href="/property?type=Admin" className={`w-full text-nowrap rounded-xl ${styles.showAdminCardinner3}`}>
                        <div className="text-start">
                          <div>
                            <img src="../../../img/technician.png" width="30" height="30" />
                          </div>
                          <div className={`${styles.propertyCard}`}>
                            <p className="text-xl font-bold">
                              {adminDashboardData?.TotalAdminProperty}
                            </p>
                            <p className="text-sm font-semibold mt-2">
                              Total Admin Property
                            </p>
                          </div>
                        </div>
                      </Card>
                    </div>

                    <div className={`${styles.propertyCardInner}`}>
                      <Card href="/reviewProperty" className={`w-full text-nowrap rounded-xl ${styles.showAdminCardinner3} `}>
                        <div className="text-start">
                          <div>
                            <img src="../../../img/technician.png" width="30" height="30" />
                          </div>
                          <div className={`${styles.propertyCard}`}>
                            <p className="text-xl font-bold">
                              {adminDashboardData?.underReviewProperty}
                            </p>
                            <p className="text-sm font-semibold mt-2 pr-2">
                              Under Review Property
                            </p>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
                :
                <>
                  <div className={`flex ${styles.showResponsive3}`}>
                    <Card className={`text-nowrap rounded-xl col-span-1 ${styles.showBuilderCard3} mr-2 mb-5`}>
                      <Link href="/property">
                        <div className="text-start">
                          <h2
                            className={`text-xl font-bold tracking-wide ${styles.dataSectionBuilder1}  `}
                          >
                            <div>
                              <img
                                src="../../../img/town.png"
                                width="50"
                                height="50"
                              />
                            </div>
                            <div className={`${styles.propertyCard}`}>
                              <p className="text-5xl font-bold mt-2">
                                {builderDashboardData?.totalProperty}
                              </p>
                              <p className="text-sm font-semibold mt-2">
                                Total Property
                              </p>
                            </div>
                            <Link href={`/property?todayProperty=yes`}>
                              <p
                                className={`text-lg mb-2 font-bold ${styles.PropColor} hover:underline`}
                              >
                                {builderDashboardData?.todayAddProperty}
                                <span className={`font-normal `}>{" "} added today</span>
                              </p>
                            </Link>
                          </h2>
                        </div>
                      </Link>
                    </Card>
                    <div className={`${styles.showResponsiveInner3}`}>
                      <Card href="/property?showValue=false" className={`text-nowrap rounded-xl p-0 mb-2 ${styles.showBuilderCardinner3} mr-1`}>
                        <div>
                          <img
                            src="../../../img/technician.png"
                            width="30"
                            height="30"
                          />
                        </div>
                        <div className={`${styles.propertyCard}`}>
                          <p className="text-xl font-bold">
                            {builderDashboardData?.underReviewProperty}
                          </p>
                          <p className="text-sm font-semibold mt-2">
                            Under Review Property
                          </p>
                        </div>
                      </Card>
                      <Card href="/property?showValue=true" className={`text-nowrap rounded-xl p-0 mb-2 ${styles.showBuilderCardinner3}`}>
                        <div>
                          <img
                            src="../../../img/technician.png"
                            width="30"
                            height="30"
                          />
                        </div>
                        <div className={`${styles.propertyCard}`}>
                          <p className="text-xl font-bold ">
                            {builderDashboardData?.approvedProperty}
                          </p>
                          <p className="text-sm font-semibold mt-2">
                            Approved Property
                          </p>
                        </div>
                      </Card>
                    </div>
                  </div>
                </>
              }
            </div>
          ) : (
            <LoadingImg />
          )}
          {/* Enquiry Card */}
          {adminDashboardData || builderDashboardData ? (
            <div className={`w-full ${styles.showResponsive4}`}>
              {roles.includes("Admin") ?
                <div className={`flex`}>
                  <Card className={`w-0 text-nowrap rounded-xl p-0 ${styles.showBuilderCard4} mr-1`}>
                    <Link href="/projectInquiry">
                      <div className="text-start">
                        <h2
                          className={`text-xl font-bold tracking-wide ${styles.dataSectionBuilder1}  `}
                        >
                          <div>
                            <img
                              src="../../../img/questionnaire.png"
                              width="50"
                              height="50"
                            />
                          </div>
                          <div className={`${styles.enquiryCard}`}>
                            <p className="text-5xl font-bold mt-2">
                              {adminDashboardData?.totalEnquiry}{" "}
                            </p>
                            <p className="text-sm font-semibold mt-2">
                              Total Enquiry
                            </p>
                          </div>
                          <Link href={`/projectInquiry?todayEnquiry=yes`}>
                            <p
                              className={`text-lg font-bold ${styles.EnqColor} hover:underline `}
                            >
                              {adminDashboardData?.todayEnquiry}{" "}
                              <span className={`font-normal `}>Today's Enquiry </span>
                            </p>
                          </Link>

                        </h2>

                      </div>
                    </Link>
                  </Card>

                  <div className={`grid grid-cols-2 gap-1 ${styles.showResponsiveInner3}`}>
                    <Card href={`/projectInquiry?type=Astrology`} className={`w-full text-nowrap rounded-xl p-0 mr-1 ${styles.showAdminCardInner4}`}>
                      <div>
                        <img
                          src="../../../img/astrology.png"
                          width="30"
                          height="30"
                        />
                      </div>
                      <div className={`${styles.enquiryCard}`}>
                        <p className="text-xl font-bold">
                          {adminDashboardData?.totalEnquiryAstrology}
                        </p>
                        <p className="text-sm font-semibold mt-2">
                          Astrology Enquiry
                        </p>
                      </div>
                    </Card>
                    <Card href={`/projectInquiry?type=ContactUs`} className={`w-full text-nowrap rounded-xl p-0 mr-1 ${styles.showAdminCardInner4}`}>
                      <div>
                        <img
                          src="../../../img/operator.png"
                          width="30"
                          height="30"
                        />
                      </div>
                      <div className={`${styles.enquiryCard}`}>
                        <p className="text-xl font-bold">
                          {adminDashboardData?.totalEnquiryContactUs}
                        </p>
                        <p className="text-sm font-semibold mt-2">
                          Contact Us Enquiry
                        </p>
                      </div>
                    </Card>
                    <Card href={`/projectInquiry?type=Property`} className={`text-nowrap rounded-xl mb-1 p-0 ${styles.showAdminCardInner4}`}>
                      <div>
                        <img
                          src="../../../img/town.png"
                          width="30"
                          height="30"
                        />
                      </div>
                      <div className={`${styles.enquiryCard}`}>
                        <p className="text-xl font-bold">
                          {adminDashboardData?.totalEnquiryProperty}
                        </p>
                        <p className="text-sm font-semibold mt-2">
                          Property Enquiry
                        </p>
                      </div>
                    </Card>
                    <Card href={`/projectInquiry?type=Project`} className={`w-full text-nowrap rounded-xl p-0 mr-1 mb-1 ${styles.showAdminCardInner4}`}>
                      <div>
                        <img
                          src="../../../img/town.png"
                          width="30"
                          height="30"
                        />
                      </div>
                      <div className={`${styles.enquiryCard}`}>
                        <p className="text-xl font-bold">
                          {adminDashboardData?.totalEnquiryProject}
                        </p>
                        <p className="text-sm font-semibold mt-2">
                          Project Enquiry
                        </p>
                      </div>
                    </Card>
                  </div>
                </div>
                :
                <>
                  <div className={`w-full flex ${styles.showResponsive4}`}>
                    <Card className={` text-nowrap rounded-xl p-0 ${styles.showBuilderCard4} mr-1 mb-3`}>
                      <Link href="/projectInquiry">
                        <div className="text-start">
                          <h2
                            className={`text-xl font-bold tracking-wide ${styles.dataSectionBuilder1}  `}
                          >
                            <div>
                              <img
                                src="../../../img/questionnaire.png"
                                width="50"
                                height="50"
                              />
                            </div>
                            <div className={`${styles.enquiryCard}`}>
                              <p className="text-5xl font-bold mt-2">
                                {builderDashboardData?.totalEnquiry}{" "}
                              </p>
                              <p className="text-sm font-semibold mt-2">
                                Total Enquiry
                              </p>
                            </div>
                            <Link href={`/projectInquiry?todayEnquiry=yes`}>
                              <p
                                className={`text-lg font-bold ${styles.EnqColor} hover:underline `}
                              >
                                {builderDashboardData?.todayEnquiry}{" "}
                                <span className={`font-normal `}>Today's Enquiry </span>
                              </p>
                            </Link>

                          </h2>

                        </div>
                      </Link>
                    </Card>

                    <div className={`w-full grid grid-cols-2  ${styles.showResponsiveInner3}`}>
                      <Card href={`/projectInquiry?type=Astrology`} className={`text-nowrap rounded-xl pr-2 mr-1 ${styles.showBuilderCardInner4}`}>
                        <div>
                          <img
                            src="../../../img/astrology.png"
                            width="30"
                            height="30"
                          />
                        </div>
                        <div className={`${styles.enquiryCard}`}>
                          <p className="text-xl font-bold">
                            {builderDashboardData?.totalEnquiryAstrology}
                          </p>
                          <p className="text-sm font-semibold mt-2">
                            Astrology Enquiry
                          </p>
                        </div>
                      </Card>
                      <Card href={`/projectInquiry?type=ContactUs`} className={`text-nowrap rounded-xl pr-2 mr-1 ${styles.showBuilderCardInner4}`}>
                        <div>
                          <img
                            src="../../../img/operator.png"
                            width="30"
                            height="30"
                          />
                        </div>
                        <div className={`${styles.enquiryCard}`}>
                          <p className="text-xl font-bold">
                            {builderDashboardData?.totalEnquiryContactUs}
                          </p>
                          <p className="text-sm font-semibold mt-2">
                            Contact Us Enquiry
                          </p>
                        </div>
                      </Card>
                      <Card href={`/projectInquiry?type=Property`} className={`text-nowrap rounded-xl mr-1 mb-1 pr-2 ${styles.showBuilderCardInner4}`}>
                        <div>
                          <img
                            src="../../../img/town.png"
                            width="30"
                            height="30"
                          />
                        </div>
                        <div className={`${styles.enquiryCard}`}>
                          <p className="text-xl font-bold">
                            {builderDashboardData?.totalEnquiryProperty}
                          </p>
                          <p className="text-sm font-semibold mt-2">
                            Property Enquiry
                          </p>
                        </div>
                      </Card>
                      <Card href={`/projectInquiry?type=Project`} className={`text-nowrap rounded-xl pr-2 mr-1 mb-1 ${styles.showBuilderCardInner4}`}>
                        <div>
                          <img
                            src="../../../img/town.png"
                            width="30"
                            height="30"
                          />
                        </div>
                        <div className={`${styles.enquiryCard}`}>
                          <p className="text-xl font-bold">
                            {builderDashboardData?.totalEnquiryProject}
                          </p>
                          <p className="text-sm font-semibold mt-2">
                            Project Enquiry
                          </p>
                        </div>
                      </Card>
                    </div>
                  </div>
                </>
              }
            </div>
          ) : (
            <LoadingImg />
          )}
        </div >
        </div>
        
        <div className={`${styles.SecondContainer}`}>
          <div className={`${styles.graphSize}`}>
            <canvas ref={chartRef} />
          </div>
        </div>
      </div >
    </>
  );
}

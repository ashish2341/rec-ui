"use client";
import styles from "./dashboard.module.css";
import { Card } from "flowbite-react";
import {
  GetAdminDashboardApi,
  GetBuilderDashboardApi,
} from "@/api-functions/dashboard/dashboardApi";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import { ToastContainer, toast } from "react-toastify";
import LoadingImg from "@/components/common/loadingImg";
export default function Dashboard() {
  const roleData = Cookies.get("roles") ?? "";
  const name = Cookies.get("name");
  const roles = roleData && JSON.parse(roleData);
  const [adminDashboardData, setAdminDashboardData] = useState("");
  const [builderDashboardData, setBuilderDashboardData] = useState("");
  useEffect(() => {
    console.log("useEffect roles", roles);
    if (roles.includes("Admin")) {
      console.log("admin function called");
      getPropertiesAdminDashboard();
    } else {
      console.log("buillder function called");
      getPropertiesBuilderDashboard();
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
  console.log("adminDashboardData", adminDashboardData);
  console.log("builderDashboardData", builderDashboardData);
  return (
    <>
      <div className={`${styles.dashboardContainer}`}>
        <div className={`grid gap-20 mb-4 md:grid-cols-2 `}>
          {roles.includes("Admin") && (
            <>
              {/* User card */}
              {adminDashboardData ? (
                <Card
                  href="/users"
                  className={`max-w-sm mb-2 cursor-pointer ${styles.showCard1}`}
                >
                  <div className="text-center">
                    <h2 className={`text-xl font-bold mb-4 tracking-wide `}>
                      <i className="bi bi-file-earmark-person-fill mr-2"></i>{" "}
                      User Statistics
                    </h2>
                  </div>
                  <div className={`grid gap-2 mb-4 md:grid-cols-2 `}>
                    {" "}
                    <div className="flex flex-col items-center mb-2">
                      <h3 className="text-xl font-bold tracking-wide">
                        Total User
                      </h3>
                      <p className="text-3xl font-bold mt-2">
                        {adminDashboardData?.totalUser}
                      </p>
                    </div>
                    <div className="flex flex-col  items-center mb-2">
                      <h3 className="text-xl font-bold tracking-wide">
                        Today Joined
                      </h3>
                      <p className="text-3xl font-bold mt-2">
                        {adminDashboardData?.todayUsers}
                      </p>
                    </div>
                    <div className="flex flex-col items-center mb-2 opacity-0 pointer-events-none">
                      <h3 className="text-xl font-bold tracking-wide">
                        not show
                      </h3>
                      <p className="text-3xl font-bold mt-2">not show</p>
                    </div>
                  </div>
                </Card>
              ) : (
                <LoadingImg />
              )}
              {/* Builder card */}
              {adminDashboardData ? (
                <Card
                  href="/builder"
                  className={`max-w-sm mb-2 cursor-pointer ${styles.showCard2}`}
                >
                  <div className="text-center">
                    <h2 className="text-xl font-bold mb-4 tracking-wide  ">
                      <i className="bi bi-file-earmark-person-fill mr-2"></i>
                      Builder Statistics
                    </h2>
                  </div>
                  <div className={`grid gap-2 mb-4 md:grid-cols-2`}>
                    {" "}
                    <div className="flex flex-col items-center mb-2">
                      <h3 className="text-xl font-bold tracking-wide ">
                        Total Builder
                      </h3>
                      <p className="text-3xl font-bold mt-2">
                        {adminDashboardData?.totalBuilder}
                      </p>
                    </div>
                    <div className="flex flex-col  items-center mb-2">
                      <h3 className="text-xl font-bold tracking-wide ">
                        Today Joined
                      </h3>
                      <p className="text-3xl font-bold mt-2">
                        {adminDashboardData?.todayAddBuilder}
                      </p>
                    </div>
                    <div className="flex flex-col  items-center mb-2">
                      <h3 className="text-xl font-bold tracking-wide ">
                        Total Property
                      </h3>
                      <p className="text-3xl font-bold mt-2">
                        {adminDashboardData?.totalBuilderProperty}
                      </p>
                    </div>
                  </div>
                </Card>
              ) : (
                <LoadingImg />
              )}
            </>
          )}

          {/* Property Card */}
          {adminDashboardData || builderDashboardData ? (
            <Card
              href="/property"
              className={`max-w-sm mb-2 cursor-pointer ${styles.showCard3}`}
            >
              <div className="text-center">
                <h2 className="text-xl font-bold mb-4 tracking-wide  ">
                  <i class="bi bi-house-fill mr-2"></i>
                  Property Statistics
                </h2>
              </div>
              <div className={`grid gap-2 mb-4 md:grid-cols-2`}>
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
              </div>
            </Card>
          ) : (
            <LoadingImg />
          )}
          {/* Enquiry Card */}
          {adminDashboardData || builderDashboardData ? (
            <Card
              href="/projectInquiry"
              className={`max-w-sm mb-2 cursor-pointer ${styles.showCard4}`}
            >
              <div className="text-center">
                <h2 className="text-xl font-bold mb-4 tracking-wide  ">
                  <i className="bi bi-search mr-2 "></i>
                  Enquiry Statistics
                </h2>
              </div>
              <div className={`grid gap-2 mb-4 md:grid-cols-2`}>
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
              </div>
            </Card>
          ) : (
            <LoadingImg />
          )}
        </div>
      </div>
    </>
  );
}

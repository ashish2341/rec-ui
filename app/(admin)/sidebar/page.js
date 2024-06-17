"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Styles from "./sidebar.module.css";
import { usePathname } from "next/navigation";
import Popup from "@/components/common/popup";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { initFlowbite } from "flowbite";
export default function Sidebar({ children }) {
  const pathname = usePathname();
  const roleData = Cookies.get("roles") ?? "";
  const name = Cookies.get("name");
  const profilePhoto = Cookies.get("profilePhoto");
  const roles = roleData && JSON.parse(roleData);

  const [activeTab, setActiveTab] = useState(pathname.replace("/", ""));
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const router = useRouter();

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const logout = () => {
    setIsPopupOpen(true);
  };
  const handleCancel = () => {
    setIsPopupOpen(false);
  };
  const handleDelete = () => {
    if (typeof window !== "undefined") {
      const sessionStoragePropertyData = JSON.parse(
        sessionStorage.getItem("propertyData")
      );
      if(sessionStoragePropertyData){
        sessionStorage.removeItem("propertyData")
      }
      localStorage.removeItem("token");
      Cookies.remove("token");
      Cookies.remove("name");
      Cookies.remove("userId");
      Cookies.remove("roles");
      router.push("/login");
    }
  };
  useEffect(() => {
    initFlowbite(); // Call initCarousels() when component mounts
  }, []);
  return (
    <>
      <Popup
        isOpen={isPopupOpen}
        title="Are you sure you want to Sign Out?"
        confirmLabel="Yes, I'm sure"
        cancelLabel="No, cancel"
        onConfirm={handleDelete}
        onCancel={handleCancel}
      />
      <button
        data-drawer-target="sidebar-multi-level-sidebar"
        data-drawer-toggle="sidebar-multi-level-sidebar"
        aria-controls="sidebar-multi-level-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="sidebar-multi-level-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div
          className={` ${Styles.sidebarMain} h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800`}
        >
          <div
            className={`flex flex-col items-center mb-4 text-center ${Styles.logobox}`}
          >
            <span className={`ms-3 mb-4 mt-4 ${Styles.admintext}`}>
              {roles.includes("Admin") ? "Admin" : "Builder"}
            </span>
            {roles.includes("Admin") ? (
              <div className="flex flex-col items-center">
                <img
                  src={profilePhoto }
                  alt="Admin Image"
                  className="w-14 h-14 rounded-full mb-4"
                />
                <span className={`ms-3 mb-4 ${Styles.admintext}`}>Hi {name}</span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <img
                  src={profilePhoto}
                  alt="Builder Image"
                  className="w-14 h-14  rounded-full mb-4"
                />
                <span className={`ms-3 mb-4 ${Styles.admintext}`}>Hi {name}</span>
              </div>
            )}
          </div>
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href="/dashboard"
                to="/dashboard"
                onClick={() => handleTabClick("dashboard")}
                className={` ${
                  activeTab === "dashboard"
                    ? Styles.activeTab
                    : Styles.inactiveTab
                } flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}
              >
                <svg
                  className={`${
                    activeTab === "dashboard" ? "" : Styles.inactiveTab
                  }  ${
                    Styles.tabSvg
                  }  flex-shrink-0 w-5 h-5 text-gray-900 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-black`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">My REC</span>
              </Link>
            </li>
            {roles.includes("Developer") && (
              <>
                <li>
                  <Link
                    href="/property"
                    onClick={() => handleTabClick("property")}
                    className={` ${
                      activeTab === "property"
                        ? Styles.activeTab
                        : Styles.inactiveTab
                    } flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}
                  >
                    <svg
                      className={`${
                        activeTab === "property" ? "" : Styles.inactiveTab
                      }  ${
                        Styles.tabSvg
                      }  flex-shrink-0 w-5 h-5 text-gray-900 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-black`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 21"
                    >
                      <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                    </svg>
                    <span className={` flex-1 ms-3 whitespace-nowrap`}>
                      Property
                    </span>
                  </Link>
                </li>
              </>
            )}

            {roles.includes("Admin") && (
              <>
                <li>
                  <Link
                    href="/users"
                    onClick={() => handleTabClick("users")}
                    className={` ${
                      activeTab === "users"
                        ? Styles.activeTab
                        : Styles.inactiveTab
                    } flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}
                  >
                    <svg
                      className={`${
                        activeTab === "users" ? "" : Styles.inactiveTab
                      }  ${
                        Styles.tabSvg
                      }  flex-shrink-0 w-5 h-5 text-gray-900 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-black`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 18"
                    >
                      <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                    </svg>
                    <span className={` flex-1 ms-3 whitespace-nowrap`}>
                      Users
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/reviewProperty"
                    onClick={() => handleTabClick("reviewProperty")}
                    className={` ${
                      activeTab === "reviewProperty"
                        ? Styles.activeTab
                        : Styles.inactiveTab
                    } flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}
                  >
                    <svg
                      className={`${
                        activeTab === "reviewProperty" ? "" : Styles.inactiveTab
                      }  ${
                        Styles.tabSvg
                      }  flex-shrink-0 w-5 h-5 text-gray-900 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-black`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 21"
                    >
                      <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                    </svg>
                    <span className={` flex-1 ms-3 whitespace-nowrap`}>
                      Review Property
                    </span>
                  </Link>
                </li>

                <li>
                  <button
                    type="button"
                    className={`${Styles.tabText} flex items-center w-full p-2 text-base hover:text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
                    aria-controls="propertyProjectDropdown"
                    data-collapse-toggle="propertyProjectDropdown"
                  >
                    <svg
                      className={`${Styles.tabText} flex-shrink-0 w-5 h-5  transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 21"
                    >
                      <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                    </svg>
                    <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                      Property/Project
                    </span>
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>
                  <ul
                    id="propertyProjectDropdown"
                    className="hidden py-2 space-y-2"
                  >
                    <li>
                      <Link
                        href="/property"
                        onClick={() => handleTabClick("property")}
                        className={` ${
                          activeTab === "property"
                            ? Styles.activeTab
                            : Styles.inactiveTab
                        } flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
                      >
                        Property
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/project"
                        onClick={() => handleTabClick("project")}
                        className={` ${
                          activeTab === "project"
                            ? Styles.activeTab
                            : Styles.inactiveTab
                        } flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
                      >
                        Project
                      </Link>{" "}
                    </li>
                  </ul>
                </li>
                <li>
                  <button
                    type="button"
                    className={`${Styles.tabText} flex items-center w-full p-2 text-base hover:text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
                    aria-controls="dropdown-example"
                    data-collapse-toggle="dropdown-example"
                  >
                    <svg
                      className={`${Styles.tabText} flex-shrink-0 w-5 h-5  transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 21"
                    >
                      <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                    </svg>
                    <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                      Master
                    </span>
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>
                  <ul id="dropdown-example" className="hidden py-2 space-y-2">
                    <li>
                      <Link
                        href="/amenity"
                        onClick={() => handleTabClick("amenity")}
                        className={` ${
                          activeTab === "amenity"
                            ? Styles.activeTab
                            : Styles.inactiveTab
                        } flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
                      >
                        Amenity
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/feature"
                        onClick={() => handleTabClick("feature")}
                        className={` ${
                          activeTab === "feature"
                            ? Styles.activeTab
                            : Styles.inactiveTab
                        } flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
                      >
                        Features
                      </Link>{" "}
                    </li>
                    <li>
                      <Link
                        href="/builder"
                        onClick={() => handleTabClick("builder")}
                        className={` ${
                          activeTab === "builder"
                            ? Styles.activeTab
                            : Styles.inactiveTab
                        } flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
                      >
                        Builder
                      </Link>{" "}
                    </li>
                    <li>
                      <Link
                        href="/banner"
                        onClick={() => handleTabClick("banner")}
                        className={` ${
                          activeTab === "banner"
                            ? Styles.activeTab
                            : Styles.inactiveTab
                        } flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
                      >
                        Banner
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link
                    href="/testiMonials"
                    onClick={() => handleTabClick("testiMonials")}
                    className={` ${
                      activeTab === "testiMonials"
                        ? Styles.activeTab
                        : Styles.inactiveTab
                    } flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}
                  >
                    <svg
                      className={`${
                        activeTab === "testiMonials" ? "" : Styles.inactiveTab
                      }  ${
                        Styles.tabSvg
                      }  flex-shrink-0 w-5 h-5 text-gray-900 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-black`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M17.418 3.623l-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      Testimonials
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    onClick={() => handleTabClick("faq")}
                    className={` ${
                      activeTab === "faq"
                        ? Styles.activeTab
                        : Styles.inactiveTab
                    } flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}
                  >
                    <svg
                      className={`${
                        activeTab === "faq" ? "" : Styles.inactiveTab
                      }  ${
                        Styles.tabSvg
                      }  flex-shrink-0 w-5 h-5 text-gray-900 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-black`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M12 1c-5.522 0-10 4.478-10 10s4.478 10 10 10 10-4.478 10-10-4.478-10-10-10zM12 19c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zM12 15c-0.552 0-1-0.448-1-1s0.448-1 1-1" />
                    </svg>
                    <span className="flex-1 ms-3 whitespace-nowrap">FAQ</span>
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link
                href="/projectInquiry"
                onClick={() => handleTabClick("projectInquiry")}
                className={` ${
                  activeTab === "projectInquiry"
                    ? Styles.activeTab
                    : Styles.inactiveTab
                } flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group`}
              >
                <svg
                  className={`${
                    activeTab === "projectInquiry"
                      ? Styles.activeTab
                      : Styles.inactiveTab
                  }${
                    Styles.tabText
                  } flex-shrink-0 w-5 h-5  transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 21"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.5 14.5l-4-4"
                  />
                  <circle
                    cx="7"
                    cy="7"
                    r="5"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
                <span className={` flex-1 ms-3 whitespace-nowrap`}>
                  Enquiry
                </span>
              </Link>
            </li>
          </ul>
          {/* <div>
          <img
                  src="/img/house_demo_img.jpg"
                  // className="h-8"
                  alt="Flowbite Logo"
                />
          </div> */}
        </div>
      </aside>

      <div className="p-4 sm:ml-64">
        <div className="p-2 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <nav className="border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
              <a
                href=""
                className="flex items-center space-x-3 rtl:space-x-reverse"
              >
                <img
                  src="/img/recLogoPng2.png"
                  className="h-8"
                  alt="Flowbite Logo"
                />
                {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  REC
                </span> */}
              </a>
              <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <button
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  id="user-menu-button"
                  aria-expanded="false"
                  data-dropdown-toggle="user-dropdown"
                  data-dropdown-placement="bottom"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src="https://flowbite.com/docs/images/logo.svg"
                    alt="user photo"
                  />
                </button>
                <div
                  className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                  id="user-dropdown"
                >
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">
                      {name}
                    </span>
                  </div>
                  <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                      <a
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        My Profile
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Change Password
                      </a>
                    </li>
                    <li onClick={logout}>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
        </div>
        <div className="mt-3 p-2 pb-0 h-full border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          {children}
        </div>
      </div>
    </>
  );
}

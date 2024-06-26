import MegaDropdown from "@/app/megamenu";
import Link from "next/link";
import SearchNavBar from "./searchNavBar";
import { usePathname } from "next/navigation";
import styles from "./css/navbar.module.css";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [activeTab, setActiveTab] = useState();

  const pathname = usePathname();
  console.log("pathname", pathname);
  useEffect(() => {
    setActiveTab(pathname.split("/"));
  }, [pathname]);
  const functionCHeck = () => {
    console.log("Function CLicked");
  };
  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-50 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div
        className={`max-w-screen-xl flex flex-wrap items-center justify-around mx-auto p-4 ${styles.navbarStyle}`}
      >
        <div className="flex">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="/img/recLogoPng2.png"
              className="h-12 mr-8"
              alt="Flowbite Logo"
            />
          </Link>
          <MegaDropdown />
        </div>

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {/* SearchNavBar /> */}
          <Link href={"/login"}>
            <button
              onClick={functionCHeck}
              type="button"
              className="text-white ml-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login
            </button>
          </Link>
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center navbarMainUl justify-between hidden w-full md:flex md:w-auto md:order-1 "
          id="navbar-sticky"
        >
          <ul
            className={` flex flex-col p-4 md:p-0 mt-4 align-items-baseline font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 ${styles.navbarStyleBaseLine}`}
          >
            <li>
              <Link
                href="/"
                className={`${
                  activeTab?.includes("builderFE") ||
                  activeTab?.includes("aboutus") ||
                  activeTab?.includes("contactus") ||
                  activeTab?.includes("astrologer") ||
                  activeTab?.includes("propertyList") ||
                  activeTab?.includes("featuredProperty") ||
                  activeTab?.includes("propertyDetail")
                    ? "block py-2 px-3 text-black-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    : "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/builderFE"
                className={`${
                  activeTab?.includes("builderFE")
                    ? "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                    : "block py-2 px-3 text-black-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                }`}
              >
                Builder
              </Link>
            </li>
            <li>
              <Link
                href="/aboutus"
                className={`${
                  activeTab?.includes("aboutus")
                    ? "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                    : "block py-2 px-3 text-black-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                }`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contactus"
                className={`${
                  activeTab?.includes("contactus")
                    ? "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                    : "block py-2 px-3 text-black-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                }`}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

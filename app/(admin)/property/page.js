"use client";

import Link from "next/link";
import Spinner from "@/components/common/loading";
import Pagination from "@/components/common/pagination";
import Popup from "@/components/common/popup";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { GetPropertyApi } from "@/api-functions/property/getProperty";
import { DeleteProperty } from "@/api-functions/property/deleteProperty";
import Cookies from "js-cookie";
import { GetPropertyBybuilderApi } from "@/api-functions/property/getPropertyBybuilder";
import styles from "./builder.module.css";
import LoadingSideImg from "@/components/common/sideImgLoader";
import PropertyListCard from "@/components/common/propertyListCard/listCard";
import { useRouter } from "next/navigation";
import ReadMore from "@/components/common/readMore";
import Accordion from "@/components/common/accodion";
import { Carousel } from "flowbite-react";
import { imgApiUrl } from "@/utils/constants";

export default function Property(params) {
  const roleData = Cookies.get("roles") ?? "";
  const name = Cookies.get("name");
  const roles = roleData && JSON.parse(roleData);
  const router = useRouter();
  const inquiryItem = [
    { name: "All", value: "" },
    { name: "Verified", value: true },
    { name: "Un Verified", value: false },
  ];
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [listData, setListData] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [page, setPage] = useState(1);
  const [searchData, setSearchData] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [typeOnButton, setTypeOnButton] = useState("");
  console.log("listData", listData);

  useEffect(() => {
    if (roles.includes("Admin")) {
      console.log("admin function called");
      getAllProperties();
    } else {
      console.log("buillder function called");
      getAllPropertiesByBuilder(typeOnButton);
    }
    // getAllProperties();
  }, [page, searchData]);

  console.log("params", params);
  let todayProperty = "";
  let type = "";
  if (params?.searchParams?.type) {
    console.log("todayProperty", todayProperty);
    type = params?.searchParams?.type;
  } else {
    todayProperty = params?.searchParams?.todayProperty;
  }

  const getAllProperties = async () => {
    let properties = await GetPropertyApi(
      page,
      searchData,
      type,
      todayProperty
    );
    if (properties?.resData?.success == true) {
      setListData(properties?.resData);
      toast.success(properties?.resData?.message);
      return false;
    } else {
      toast.error(properties?.errMessage);
      return false;
    }
  };
  const showValue1 = params?.searchParams?.showValue;
  const getAllPropertiesByBuilder = async (showValue) => {
    let properties = await GetPropertyBybuilderApi(
      page,
      searchData,
      showValue ? showValue : showValue1,
      type,
      todayProperty
    );
    if (properties?.resData?.success == true) {
      setListData(properties?.resData);
      toast.success(properties?.resData?.message);
      return false;
    } else {
      toast.error(properties?.errMessage);
      return false;
    }
  };
  const searchInputChange = (e) => {
    setSearchData(e.target.value);
  };
  const handlePageChange = (newPage) => {
    console.log(newPage);
    setPage(newPage);
  };
  const handleDelete = async () => {
    // Perform delete operation
    let res = await DeleteProperty(deleteId);
    console.log(" property delete res", res);
    if (res?.resData?.success == true) {
      if (roles.includes("Admin")) {
        console.log("admin function called");
        getAllProperties();
      } else {
        console.log("buillder function called");
        getAllPropertiesByBuilder();
      }
      setDeleteId("");
      setIsPopupOpen(false);
      toast.success(res?.resData?.message);
      return false;
    } else {
      toast.error(res?.errMessage);
      return false;
    }
  };

  const handleCancel = () => {
    setDeleteId("");
    setIsPopupOpen(false);
  };
  const deletePropertyModal = async (id) => {
    setDeleteId(id);
    setIsPopupOpen(true);
  };
  const goToAddProperty = () => {
    const editPropertyData = JSON.parse(
      sessionStorage.getItem("EditPropertyData")
    );
    if (editPropertyData) {
      sessionStorage.removeItem("EditPropertyData");
      router.push("/property/addProperty");
    } else {
      router.push("/property/addProperty");
    }
  };
  const enquiryType = (filterType) => {
    console.log("enquiryType", filterType);
    setTypeOnButton(filterType);
    setIsDropdownOpen(!isDropdownOpen);
    getAllPropertiesByBuilder(filterType);
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <section>
      <div className="relative  shadow-md sm:rounded-lg">
        <h1 className="text-2xl text-black-600 underline mb-3 font-bold">
          Property
        </h1>
        <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
          <div className="flex">
            <button
              className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              type="button"
              onClick={goToAddProperty}
            >
              + Add Property
            </button>
            {roles.includes("Developer") && (
              <li className="me-2 list-none relative">
                {" "}
                {/* Ensure relative positioning */}
                <button
                  id="dropdownPossessionButton"
                  onClick={toggleDropdown}
                  className="text-black bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-gray-100 focus:ring-4 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-white-600 dark:hover:bg-white-700 dark:focus:ring-white-800"
                  type="button"
                >
                  {typeOnButton && typeOnButton === true
                    ? "Verified"
                    : typeOnButton === false
                    ? "Un verified"
                    : "All"}
                  <svg
                    className="w-2.5 h-2.5 ms-3"
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
                <div
                  id="dropdownPossession"
                  className={`z-10 ${
                    isDropdownOpen ? "block" : "hidden"
                  } absolute top-full mt-2 bg-gray-200 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
                >
                  <ul
                    className="p-2 text-sm text-gray-700 dark:text-gray-200 list-none"
                    aria-labelledby="dropdownPossessionButton"
                  >
                    {inquiryItem.map((item, index) => (
                      <li key={index} onClick={() => enquiryType(item.value)}>
                        <Link
                          href="#"
                          className="block px-4 py-2 hover:bg-white hover:text-black dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          {item?.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            )}
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for property"
              onChange={searchInputChange}
            />
          </div>
        </div>
        {roles.includes("Admin") &&
          (listData ? (
            listData?.data?.length > 0 ? (
              <div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Property Title
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Property SubType
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Facing
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Total Price
                      </th>
                      {roles.includes("Admin") && (
                        <th scope="col" className="px-6 py-3">
                          Is Enabled
                        </th>
                      )}
                      {roles.includes("Admin") && (
                        <th scope="col" className="px-6 py-3">
                          Is Featured
                        </th>
                      )}
                      {roles.includes("Developer") && (
                        <th scope="col" className="px-6 py-3">
                          Review Status
                        </th>
                      )}
                      <th scope="col" className="px-6 py-3">
                        Property Score
                      </th>
                      {roles.includes("Admin") && (
                        <th scope="col" className="px-6 py-3">
                          Action
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {listData?.data?.map((item, index) => (
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {item.Title}
                        </td>
                        <td
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {item.PropertySubtype.Name}
                        </td>
                        <td className="px-6 py-4">{item?.Facing[0]?.Facing}</td>
                        <td className="px-6 py-4">
                          {item?.TotalPrice?.DisplayValue}
                        </td>
                        {roles.includes("Admin") && (
                          <td className="px-6 py-4 text-blue-600 dark:text-blue-500">
                            <i
                              className={` ${
                                item?.IsEnabled
                                  ? "bi bi-hand-thumbs-up-fill text-green-600	"
                                  : "bi bi-hand-thumbs-down-fill text-red-500"
                              } `}
                              style={{ fontSize: "24px" }}
                            ></i>
                          </td>
                        )}
                        {roles.includes("Admin") && (
                          <td className="px-6 py-4 text-blue-600 dark:text-blue-500">
                            <i
                              className={` ${
                                item.IsFeatured
                                  ? "bi bi-hand-thumbs-up-fill text-green-600	"
                                  : "bi bi-hand-thumbs-down-fill text-red-500"
                              } `}
                              style={{ fontSize: "24px" }}
                            ></i>
                          </td>
                        )}
                        {roles.includes("Developer") && (
                          <td className="px-6 py-4 text-black-600 dark:text-black-500 ">
                            {item?.IsEnabled ? (
                              <span>Completed</span>
                            ) : (
                              <span>Pending</span>
                            )}
                          </td>
                        )}
                        <td className="px-6 py-4">
                          {item?.CompletePercentage ? (
                            <span>{item?.CompletePercentage} %</span>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            {roles.includes("Admin") && (
                              <Link
                                href={`/property/${item._id}`}
                                className="font-bold text-lg text-blue-600 dark:text-blue-500 hover:underline"
                              >
                                <i className="bi bi-pencil-square"></i>
                              </Link>
                            )}

                            {/* <Link
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      <i className="bi bi-eye-fill"></i>
                    </Link> */}
                            {roles.includes("Admin") && (
                              <Link
                                href="#"
                                className="font-medium text-lg text-red-600 dark:text-red-500 hover:underline"
                              >
                                <i
                                  onClick={() => deletePropertyModal(item._id)}
                                  className="bi bi-trash-fill"
                                ></i>
                              </Link>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Pagination
                  data={listData}
                  pageNo={handlePageChange}
                  pageVal={page}
                />
              </div>
            ) : (
              <h1 className={`bigNotFound`}>No Data Found</h1>
            )
          ) : null)}
        {roles.includes("Developer") && (
          <>
            {listData ? (
              listData?.data?.length > 0 ? (
                listData?.data?.map((item, index) => (
                  <div
                    key={item?._id}
                    className={`mb-3  ${styles.GeneralDetailsBox}`}
                  >
                    <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                      <div className={`flex w-full ${styles.cardContent}`}>
                        <div className={`w-full ${styles.leftCardContent}`}>
                          <div
                            className={`${styles.listPropertyImgOuter} grid h-30 grid-cols-1 gap-4 sm:h-30 xl:h-30 1xl:h-96`}
                          >
                            <Carousel indicators={false} slide={false}>
                              {item?.Images?.map((itemurl, index) => (
                                <Link
                                  key={index}
                                  href={`/propertyDetail/${item?._id}`}
                                >
                                  <img
                                    className={`${styles.listPropertyImg}`}
                                    key={index}
                                    src={`${imgApiUrl}/${itemurl?.URL}`}
                                    alt="..."
                                  />
                                </Link>
                              ))}
                            </Carousel>
                          </div>
                        </div>
                        <div
                          className={`flex  flex-col leading-normal ml-2 w-full mr-2 mt-4 mb-2 ${styles.middleCardContent}`}
                        >
                          {/* <Link href={`/propertyDetail/${item._id}`}> */}{" "}
                          <div className={`flex justify-between `}>
                            <h5
                              className={` text-2xl font-bold tracking-tight text-gray-900 dark:text-white ${styles.price}`}
                            >
                              ₹ <span>{item?.TotalPrice?.DisplayValue}</span>
                            </h5>

                            {/* <button
                            type="button"
                            className={`text-white-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-2 ml-2 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 ${styles.cardStarBtn}`}
                          >
                            <span>4</span>{" "}
                            <span>
                              <i className="bi bi-star-fill"></i>
                            </span>
                          </button> */}

                            <div className="flex ">
                              <div
                                className={` mr-3 ${styles.GeneralDetailsBoxIcon}`}
                              >
                                {item?.IsEnabled ? (
                                  <button
                                    type="button"
                                    className="inline-flex items-center text-blue-500 bg-transparent hover:bg-transparent focus:ring-4 focus:outline-none focus:ring-transparent shadow-none font-bold rounded-lg text-sm px-4 py-2 text-center me-2 mb-2"
                                  >
                                    <span className="inline-flex items-center justify-center w-6 h-6 mr-2 rounded-full bg-blue-500 text-white">
                                      <svg
                                        className="w-3 h-3 text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 16 12"
                                      >
                                        <path
                                          stroke="currentColor"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="3"
                                          d="M1 5.917 5.724 10.5 15 1.5"
                                        />
                                      </svg>
                                    </span>
                                    Verified
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    className="inline-flex items-center text-red-500 bg-transparent hover:bg-transparent focus:ring-4 focus:outline-none focus:ring-transparent shadow-none font-bold rounded-lg text-sm px-4 py-2 text-center me-2 mb-2"
                                  >
                                    <span className="inline-flex items-center justify-center w-6 h-6 mr-2 rounded-full bg-red-500 text-white">
                                      <svg
                                        className="w-4 h-4 text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 16 16"
                                      >
                                        <path
                                          stroke="currentColor"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="3"
                                          d="M4 4 L12 12 M12 4 L4 12"
                                        />
                                      </svg>
                                    </span>
                                    Un Verified
                                  </button>
                                )}
                              </div>
                              {/* <div
                              className={`ml-3 ${styles.GeneralDetailsBoxIcon}`}
                            >
                              {" "}
                              <i className="bi bi-heart"></i>
                            </div> */}
                            </div>
                          </div>
                          {/* <div> */}
                          <div
                            className={`flex flex-row  leading-normal ${styles.firstcontent}`}
                          >
                            <p
                              className={`font-bold text-gray-700 dark:text-gray-800 ${styles.itemTitle}`}
                            >
                              {item?.Title}
                            </p>
                            <button
                              type="button"
                              className={`text-white-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-2 ml-2 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 ${styles.cardStarBtn}`}
                            >
                              {item?.Facing[0].Facing}
                            </button>
                          </div>
                          {/* </div> */}
                          <p className=" flex font-normal text-gray-700 dark:text-gray-400">
                            <i className="bi bi-geo-alt-fill"></i>
                            <span className={`ml-1 ${styles.textCapitalized}`}>
                              <ReadMore text={item?.Address} maxLength={20} />
                            </span>{" "}
                          </p>
                          <div className="flex mb-2">
                            <p className=" mr-2 font-medium text-gray-700 dark:text-gray-400">
                              <span className=" font-bold text-gray-700 dark:text-gray-400">
                                {item?.ProeprtyType == "Commercial" ? (
                                  item?.PropertySubtype?.Name
                                ) : item?.PropertySubtype?.Name === "Plot" ? (
                                  item?.PropertySubtype?.Name
                                ) : (
                                  <span>
                                    {item?.BhkType?.Type}{" "}
                                    {item?.PropertySubtype?.Name}
                                  </span>
                                )}
                              </span>{" "}
                              in {item?.Area?.Area},{item?.State}
                            </p>
                            {item?.IsEnabled && (
                              <Link href={`/propertyDetail/${item._id}`}>
                                <div
                                  className={`${styles.previewIconContainer}`}
                                >
                                  <i
                                    className={`font-bold text-xl text-blue-600 dark:text-blue-500 bi bi-box-arrow-up-right ${styles.previewIcon} `}
                                  ></i>
                                  <div className={`${styles.hoverText}`}>
                                    Preview
                                  </div>
                                </div>
                              </Link>
                            )}
                          </div>
                          {/* </Link> */}
                          <div className="mb-4">
                            <div className={`${styles.heroSectionBottomMain}`}>
                              <div className={`${styles.heroSectionBottomBox}`}>
                                <div className={`${styles.BottomBoxcontenet}`}>
                                  <h2
                                    className={`${styles.heroSectionBottomBoxHead}`}
                                  >
                                    Property Type
                                  </h2>
                                  <p
                                    className={`${styles.heroSectionBottomBoxText}`}
                                  >
                                    {item?.ProeprtyType}
                                  </p>
                                </div>
                                <div
                                  className={`${styles.heroSectionVL}`}
                                ></div>
                                <div className={`${styles.BottomBoxcontenet}`}>
                                  <h2
                                    className={`${styles.heroSectionBottomBoxHead}`}
                                  >
                                    Property For
                                  </h2>
                                  <p
                                    className={`${styles.heroSectionBottomBoxText}`}
                                  >
                                    {item?.ProeprtyFor}
                                  </p>
                                </div>

                                <div
                                  className={`${styles.heroSectionVL}`}
                                ></div>
                                <div className={`${styles.BottomBoxcontenet}`}>
                                  <h2
                                    className={`${styles.heroSectionBottomBoxHead}`}
                                  >
                                    OwnerShip Type
                                  </h2>

                                  <p
                                    key={index}
                                    className={`${styles.heroSectionBottomBoxText}`}
                                  >
                                    {" "}
                                    {item?.OwnershipType?.Ownership}
                                  </p>
                                </div>
                                <div
                                  className={`${styles.heroSectionVL}`}
                                ></div>
                                <div className={`${styles.BottomBoxcontenet}`}>
                                  <h2
                                    className={`${styles.heroSectionBottomBoxHead}`}
                                  >
                                    Posession Status
                                  </h2>
                                  <p
                                    className={`${styles.heroSectionBottomBoxText}`}
                                  >
                                    {item?.PosessionStatus?.Possession}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* <Link href={`/propertyDetail/${item._id}`}></Link> */}
                          <div className={`flex justify-between items-center `}>
                            <div className="w-1/2">
                              <span className="text-lg font-bold leading-tight text-gray-400  ">
                                Your Property Score
                              </span>
                              <div className="w-full bg-blue-200 rounded-full dark:bg-blue-200 mt-2">
                                <div
                                  className="bg-blue-700 text-xs font-bold text-blue-100 text-center p-0.5 leading-none rounded-full"
                                  style={
                                    item?.CompletePercentage
                                      ? {
                                          width: `${item?.CompletePercentage}%`,
                                        }
                                      : { width: "0%" }
                                  }
                                >
                                  {item?.CompletePercentage
                                    ? item?.CompletePercentage
                                    : "0"}
                                  %
                                </div>
                              </div>
                            </div>

                            <div className={`flex justify-end items-center `}>
                              {item?.IsEnabled && (
                                <Link href={`/property/${item._id}`}>
                                  <button
                                    type="button"
                                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 tracking-wide leading-relaxed "
                                  >
                                    Update
                                  </button>
                                </Link>
                              )}

                              <button
                                onClick={() => deletePropertyModal(item._id)}
                                type="button"
                                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 tracking-wide leading-relaxed"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                          {/* <Link href={`/propertyDetail/${item._id}`}> */}
                          {/* </Link> */}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <h1 className={`${styles.noDataHead}`}>No Data Found</h1>
              )
            ) : (
              <div className={`mb-3 ${styles.GeneralDetailsBox}`}>
                <LoadingSideImg />
              </div>
            )}
            {listData?.data?.length > 0 ? (
              <Pagination
                data={listData}
                pageNo={handlePageChange}
                pageVal={page}
              />
            ) : null}
          </>
        )}
      </div>

      <Popup
        isOpen={isPopupOpen}
        title="Are you sure you want to delete this Property ?"
        confirmLabel="Yes, I'm sure"
        cancelLabel="No, cancel"
        onConfirm={handleDelete}
        onCancel={handleCancel}
      />
    </section>
  );
}

"use client"
import BasicDetailsForm from "@/components/admin/projectUpdateForms/basicDetails/basicDetails";
import ProjectDetailsForm from "@/components/admin/projectUpdateForms/projectDetails/projectDetails";
import ProjectImagesForm from "@/components/admin/projectUpdateForms/projectImages/projectImage";
import FeaturesDetailsForm from "@/components/admin/projectUpdateForms/featureDetails/featureDetails";
import LocationDetailsForm from "@/components/admin/projectUpdateForms/locationDetails/locationDetails";
import { useEffect, useState } from "react";
import Styles from"./editProject.module.css";
import { API_BASE_URL } from "@/utils/constants";
import Cookies from "js-cookie";
import Spinner from "@/components/common/loading";

export default function EditProject(params) {
  const [pageValue, setPageValue] = useState(1);
  const [activePage, setActivePage] = useState();
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [valueForBack,setValueForBack]=useState(0) 
  const [loading, setLoading] = useState(false);
  const [isRender, setIsRender] = useState(false);
console.log("isRender value",isRender)
  useEffect(() => {
    const token = Cookies.get("token");
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/project/${params?.params?.editProject}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        console.log("all project Data", data);
        sessionStorage.setItem("EditProjectData", JSON.stringify(data?.data));
        setLoading(false);
        setIsRender(true);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [params]);
 
  const handleAmenitiesChange = (amenities) => {
    console.log("amenities", amenities);
    setSelectedAmenities(amenities);
  };

  const handleFeaturesChange = (features) => {
    console.log("features", features);
    setSelectedFeatures(features);
  };
  const handelNextBtnValue = (value) => {
   
    setPageValue(value)
  };
  useEffect(() => {
    setActivePage(true);
  });
  
  const handelBackPage = () => {
    console.log("back value inside the main page before ste",pageValue)
    setPageValue(pageValue - 1);
    console.log("back value inside the main page after set",pageValue)
    setValueForBack(0)
  };

  const handelBackValue=(value)=>{
    console.log("back value inside the main page",value)
    setValueForBack(value)
  }
  return (
    <section>
      <h1 className="text-2xl text-black-600 underline mb-3 font-bold">
        Update Your Project Details
      </h1>

      <ol className="flex items-center w-full mb-4 sm:mb-5">
        <li className="w-full">
          <div
            className={`${
              pageValue == 2 || pageValue > 2 ? Styles.activeMain : ""
            } flex w-full items-center text-black-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-500 after:border-4 after:inline-block dark:after:border-blue-800`}
          >
            <div
              className={`flex items-center justify-center w-10 h-10 ${
                pageValue == 1
                  ? Styles.actiivetab
                  : pageValue > 1
                  ? "bg-blue-500"
                  : "bg-blue-100"
              } rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0`}
            >
              1
            </div>
          </div>
          <p>Basic details</p>
        </li>
        <li className="w-full">
          <div
            className={`${
              pageValue == 3 || pageValue > 3 ? Styles.activeMain : ""
            } flex w-full items-center text-black-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800`}
          >
            <div
              className={`flex items-center justify-center w-10 h-10 ${
                pageValue == 2
                  ? Styles.actiivetab
                  : pageValue > 2
                  ? "bg-blue-500"
                  : "bg-blue-100"
              } rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0`}
            >
              2
            </div>
          </div>
          <p>Project details</p>
        </li>
        <li className="w-full">
          <div
            className={`${
              pageValue == 4 || pageValue > 4 ? Styles.activeMain : ""
            } flex w-full items-center text-black-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800`}
          >
            <div
              className={`flex items-center justify-center w-10 h-10 ${
                pageValue == 3
                  ? Styles.actiivetab
                  : pageValue > 3
                  ? "bg-blue-500"
                  : "bg-blue-100"
              } rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0`}
            >
              3
            </div>
          </div>
          <p>Feature/Amenity</p>
        </li>
        <li className="w-full">
          <div
            className={`${
              pageValue == 5 || pageValue > 5 ? Styles.activeMain : ""
            } flex w-full items-center text-black-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800`}
          >
            <div
              className={`flex items-center justify-center w-10 h-10 ${
                pageValue == 4
                  ? Styles.actiivetab
                  : pageValue > 4
                  ? "bg-blue-500"
                  : "bg-blue-100"
              } rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0`}
            >
              4
            </div>
          </div>
          <p>Location details</p>
        </li>
        <li className="w-full">
          <div className={` flex items-center text-black-600 w-full`}>
            <div
              className={`flex items-center justify-center w-10 h-10 ${
                pageValue == 5
                  ? Styles.actiivetab
                  : pageValue > 5
                  ? "bg-blue-500"
                  : "bg-blue-100"
              } rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0`}
            >
              5
            </div>
          </div>
          <p>Project Images</p>
        </li>
        {/* <li className="flex w-full items-center text-black-600 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-700">
        <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
            2
        </div>
    </li>
    <li className="flex items-center text-black-600 w-full">
        <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
            3
        </div>
    </li> */}
      </ol>
      {pageValue > 1 ? (
        <button
          onClick={handelBackPage}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5 mb-5"
        >
          Back
        </button>
      ) : null}
{isRender?( pageValue == 1 ? (
        <BasicDetailsForm
          valueForNext={handelNextBtnValue}//here it's value comes from child component
          valueForNextPage={pageValue}//here its value pass from parent to child component
        />
      ) : pageValue == 2 ? (
        <ProjectDetailsForm
        valueForNext={handelNextBtnValue}//here it's value comes from child component
        valueForNextPage={pageValue}//here its value pass from parent to child component
        />
      ) : pageValue == 3 ? (
        <FeaturesDetailsForm
          onAmenitiesChange={handleAmenitiesChange}
          onFeaturesChange={handleFeaturesChange}
          valueForNext={handelNextBtnValue}//here it's value comes from child component
          valueForNextPage={pageValue}//here its value pass from parent to child component
        />
      ) : pageValue == 4 ? (
        <LocationDetailsForm 
        valueForNext={handelNextBtnValue}//here it's value comes from child component
        valueForNextPage={pageValue}//here its value pass from parent to child component
        />
      ) : (
        <ProjectImagesForm 
        valueForNextPage={pageValue}//here its value pass from parent to child component
        valueForBack={handelBackValue}//here it's value comes from child component
        mainBackPageValue={valueForBack}//here its value pass from parent to child component
        
        />
      )):null}
     
   
      {valueForBack == 1 ? (
        <button
          type="button"
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mt-5"
        >
          Finish
        </button>
      ) : null}
     
    </section>
  );
}

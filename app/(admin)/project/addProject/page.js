"use client";
import BasicDetailsForm from "@/components/admin/projectForms/basicDetails/basicDetails";
import ProjectDetailsForm from "@/components/admin/projectForms/projectDetails/projectDetails";
import ProjectImagesForm from "@/components/admin/projectForms/projectImages/projectImage";
import FeaturesDetailsForm from "@/components/admin/projectForms/featureDetails/featureDetails";
import LocationDetailsForm from "@/components/admin/projectForms/locationDetails/locationDetails";
import { useEffect, useState } from "react";
import Styles from "./addProject.module.css";
import { AddProjectApi } from "@/api-functions/project/addProject";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function AddProject() {
  const [pageValue, setPageValue] = useState(1);
  const [activePage, setActivePage] = useState();
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [valueForBack,setValueForBack]=useState(0)
  const router = useRouter();
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
    setPageValue(pageValue - 1);
    setValueForBack(0)
  };

  const handelBackValue=(value)=>{
 
    setValueForBack(value)
  }

  const submitProjectyData = async () => {
    const projectData = JSON.parse(sessionStorage.getItem("projectData"));
    console.log("all project Data", projectData);
    // console.log("projectyData.Aminities", projectData.Aminities);

    const finalizeProjectData = {
      Title: projectData?.Titile,
      Description: projectData?.Description,
      Highlight: projectData?.Highlight,
      Facing: [projectData?.facing?.value],
      IsEnabled: projectData?.isEnabled,
      IsExclusive: projectData?.isExclusive,
      IsFeatured: projectData?.isFeatured,
      IsNew: projectData?.isNew,
      PropertyTypes: [projectData?.propertyType?.value],
      AvailableUnits:projectData?.availableUnits,
      ReraNumber:projectData?.reraNumber,
      ProjectStatus: projectData?.projectStatus?.value,
      Features: projectData?.Features,
      Amenities: projectData?.Aminities,
      City: projectData?.City,
      State: projectData?.State,
      Country: projectData?.Country,
      Address: projectData?.Address,
      Area: projectData?.Area?.label,
      Location: projectData?.Location,
      Images: projectData?.Images?.map((URL) => ({ URL })),
      Videos: projectData?.Videos?.map((URL) => ({ URL })),
      Documents: projectData?.Documents?.map((URL) => ({ URL })),
    };
    console.log("finalizeProjectData", finalizeProjectData);
    let res = await AddProjectApi(finalizeProjectData);
    console.log(" Property res", res);
    if (res?.resData?.success == true) {
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("projectData");
        router.push("/project");
      }
      toast.success(res?.resData?.message);
    } else {
      toast.error(res.errMessage);
      return false;
    }
  };
  return (
    <section>
      <h1 className="text-2xl text-black-600 underline mb-3 font-bold">
        Add Your Project Details
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

      {pageValue == 1 ? (
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
      )}
   
      {valueForBack == 1 ? (
        <button
        onClick={submitProjectyData}
          type="button"
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mt-5"
        >
          Finish
        </button>
      ) : null}
     
    </section>
  );
}

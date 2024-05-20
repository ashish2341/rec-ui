"use client";
import BasicDetailsForm from "@/components/admin/propertyUpdateForms/basicDetails/basicDetails";
import PropertyDetailsForm from "@/components/admin/propertyUpdateForms/propertyDetails/propertyDetails";
import PropertyImagesForm from "@/components/admin/propertyUpdateForms/propertyImages/propertyImage";
import FeaturesDetailsForm from "@/components/admin/propertyUpdateForms/featureDetails/featureDetails";
import LocationDetailsForm from "@/components/admin/propertyUpdateForms/locationDetails/locationDetails";
import PropertyFaqForm from "@/components/admin/propertyUpdateForms/propertyFaq/propertyFaq";
import { useEffect, useState } from "react";
import Styles from "./reviewEditProperty.module.css";
import useFetch from "@/customHooks/useFetch";
import { API_BASE_URL } from "@/utils/constants";
import Cookies from "js-cookie";
import Spinner from "@/components/common/loading";
import { ToastContainer, toast } from "react-toastify";
import { UpdatePropertyApi } from "@/api-functions/property/updateProperty";
import { useRouter } from "next/navigation";
export default function EditProject(params) {
  console.log("params", params);
  const {
    data: listEditData,
 
    error,
  } = useFetch(
    `${API_BASE_URL}/properties/${params?.params?.reviewEditProperty}`
  );

  console.log("property listEditData of outSide",listEditData)
  const [pageValue, setPageValue] = useState(1);
  const [activePage, setActivePage] = useState();
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [valueForBack, setValueForBack] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isRender, setIsRender] = useState(false);
const router=useRouter()
  useEffect(() => {
    const token = Cookies.get("token");
    setLoading(true);
    const fetchData = async () => {
      console.log("params inside fetch Data",params)
      try {
        const response = await fetch(
          `${API_BASE_URL}/properties/property/${params?.params?.reviewEditProperty}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        // console.log("all property Data for Update", data);
        // console.log("all property Data for Update", data.success);
        const checkData=JSON.parse(sessionStorage.getItem("EditPropertyData"));
        console.log("checkData",checkData)
        if(data.success==true){
          sessionStorage.setItem("EditPropertyData", JSON.stringify(data?.data));
          setLoading(false);
          setIsRender(true);
        }else{
          toast.error(data.error)
        }
       
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [params]);

  // useEffect(()=>{
  //   console.log("property listEditData inside useEffect",listEditData?.data)
  //   if(listEditData?.data.length>0){
  //     sessionStorage.setItem("EditPropertyData",JSON.stringify(listEditData?.data))
  //     console.log("useEffect working in side Uodate")
  //     // setLocalStoragePropertyData(JSON.parse(sessionStorage.getItem('EditPropertyData')))
  //   }

  // },[listEditData])
  const handleAmenitiesChange = (amenities) => {
    console.log("amenities", amenities);
    setSelectedAmenities(amenities);
  };

  const handleFeaturesChange = (features) => {
    console.log("features", features);
    setSelectedFeatures(features);
  };
  const handelNextBtnValue = (value) => {
    setPageValue(value);
  };
  useEffect(() => {
    setActivePage(true);
  });

  const handelBackPage = () => {
    setPageValue(pageValue - 1);
    setValueForBack(0);
  };

  const handelBackValue = (value) => {
    setValueForBack(value);
  };

  const submitPropertyData = async () => {
    const propertyData = JSON.parse(sessionStorage.getItem("EditPropertyData"));
    console.log("all Property Data for update ", propertyData);
    console.log("propertyData?.Aminities", propertyData?.Images);
    if (propertyData){
      const loanDetails= {
        ByBank:propertyData?.LoanDetails?.ByBank.map((item)=>{
          return item._id
        }),
        LoanSince:propertyData?.LoanDetails?.LoanSince ,
        LoanTill:propertyData?.LoanDetails?. LoanTill
      }

      const finalizePropertyData = {
        Titile: propertyData?.Titile,
        Description: propertyData?.Description,
        Highlight: propertyData?.Highlight,
        Facing: propertyData?.Facing?.map((item)=>{
          return item._id
        }),
        IsEnabled: propertyData?.IsEnabled,
        IsExclusive: propertyData?.IsExclusive,
        IsFeatured: propertyData?.IsFeatured,
        IsNew: propertyData?.IsNew,
        ProeprtyFor: propertyData?.ProeprtyFor,
        PropertyType: propertyData?.PropertyType?._id,
        Bedrooms: propertyData?.Bedrooms,
        Bathrooms: propertyData?.Bathrooms,
        Fencing: propertyData?.Fencing?._id,
        Flooring: propertyData?.Flooring?._id,
        Furnished: propertyData?.Furnished?._id,
        BuiltAreaType: propertyData?.BuiltAreaType?._id,
        LandArea: propertyData?.LandArea,
        CoveredArea: propertyData?.CoveredArea,
        CarpetArea: propertyData?.CarpetArea,
        TotalPrice: propertyData?.TotalPrice,
        PerUnitPrice: propertyData?.PerUnitPrice,
        IsDisplayPrice: propertyData?.IsDisplayPrice,
        IsNegotiable: propertyData?.IsNegotiable,
        PosessionStatus: propertyData?.PosessionStatus._id,
        PosessionDate: propertyData?.PosessionDate,
        FloorNumber: propertyData?.FloorNumber,
        TotalFloors: propertyData?.TotalFloors,
        IsSingleProperty: propertyData?.IsSingleProperty,
        PricePerSquareFeet: propertyData?.PricePerSquareFeet,
        FloorsAllowed: propertyData?.FloorsAllowed,
        IsInterstedInJoinedVenture: propertyData?.IsInterstedInJoinedVenture,
        Balconies: propertyData?.Balconies,
        Soil: propertyData?.Soil?._id,
        IsLoanable: propertyData?.IsLoanable,
        IsAlreadyLoaned: propertyData?.IsAlreadyLoaned,
        LoanDetails: loanDetails,
        OwnershipType: propertyData?.OwnershipType?._id,
        PropertyStatus: propertyData?.PropertyStatus?._id,
        IsSold: propertyData?.IsSold,
        Preferences: propertyData?.Preferences.map((item)=>{
          return item._id
        }),
        DiscountPercentage: propertyData?.DiscountPercentage,
        DiscountForYears: propertyData?.DiscountForYears,
        Surveillance: propertyData?.Surveillance.map((item) => item),
        Features: propertyData?.Features.map((item)=>{
          return item._id
        }),
        Aminities: propertyData?.Aminities.map((item)=>{
          return item._id
        }),
        City: propertyData?.City,
        State: propertyData?.State,
        Country: propertyData?.Country,
        Address: propertyData?.Address,
        Area: propertyData?.Area?._id,
        PinCode:propertyData?.PinCode,
        Landmark:propertyData?.Landmark,
        Location: propertyData?.Location,
        Images: propertyData?.Images.map((item) => ({URL:item.URL} )),
        Videos: propertyData?.Videos.map((item) => ({URL:item.URL} )),
        Documents: propertyData?.Documents.map((item) => ({URL:item.URL} )),
        AreaUnits:propertyData?.AreaUnits?._id,
        ReraNumber:propertyData?.ReraNumber,
        BhkType:propertyData?.BhkType?._id,
        FloorAndCounter:propertyData?.FloorAndCounter,
        Fitting:propertyData?.Fitting,
        WallAndCeiling:propertyData?.WallAndCeiling,
        Faq:propertyData?.Faq.map((item)=>{
          return {Question:item.Question,
            Answer:item.Answer}
        }),
        Brochure:propertyData?.Brochure,
        Builder:propertyData?.Builder?._id
        // Builder:"66322d1f893b152a776d2095"
      };
      const propertyId=params?.params?.reviewEditProperty;
      // console.log("propertyId",propertyId)
       console.log("finalizePropertyData", finalizePropertyData);
      let res = await UpdatePropertyApi(finalizePropertyData,propertyId);
      console.log(" Property res", res);
      if (res?.resData?.success == true) {
        if (typeof window !== "undefined") {
           sessionStorage.removeItem("EditPropertyData");
           router.push("/reviewProperty");
        }
        toast.success(res?.resData?.message);
      } else {
        toast.error(res.errMessage);
        return false;
      }
      }
   
   
  };
  return (
    <section>
      {loading && <Spinner />}
      <h1 className="text-2xl text-black-600 underline mb-3 font-bold">
        Update Your Property Details
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
          <p>Property details</p>
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
          <div
            className={`${
              pageValue == 6 || pageValue > 6 ? Styles.activeMain : ""
            } flex w-full items-center text-black-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800`}
          >
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
          <p>Faq details</p>
        </li>
        <li className="w-full">
          <div className={` flex items-center text-black-600 w-full`}>
            <div
              className={`flex items-center justify-center w-10 h-10 ${
                pageValue == 6
                  ? Styles.actiivetab
                  : pageValue > 6
                  ? "bg-blue-500"
                  : "bg-blue-100"
              } rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0`}
            >
              6
            </div>
          </div>
          <p>Property Images</p>
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
      {isRender ? (
        pageValue == 1 ? (
          <BasicDetailsForm
            valueForNext={handelNextBtnValue} //here it's value comes from child component
            valueForNextPage={pageValue} //here its value pass from parent to child component
          />
        ) : pageValue == 2 ? (
          <PropertyDetailsForm
            valueForNext={handelNextBtnValue} //here it's value comes from child component
            valueForNextPage={pageValue} //here its value pass from parent to child component
          />
        ) : pageValue == 3 ? (
          <FeaturesDetailsForm
            onAmenitiesChange={handleAmenitiesChange}
            onFeaturesChange={handleFeaturesChange}
            valueForNext={handelNextBtnValue} //here it's value comes from child component
            valueForNextPage={pageValue} //here its value pass from parent to child component
          />
        ) : pageValue == 4 ? (
          <LocationDetailsForm
            valueForNext={handelNextBtnValue} //here it's value comes from child component
            valueForNextPage={pageValue} //here its value pass from parent to child component
          />
        ) : pageValue == 5 ?(
          <PropertyFaqForm
            valueForNext={handelNextBtnValue} //here it's value comes from child component
            valueForNextPage={pageValue} //here its value pass from parent to child component
          />
        ):(
          <PropertyImagesForm
            valueForNextPage={pageValue} //here its value pass from parent to child component
            valueForBack={handelBackValue} //here it's value comes from child component
            mainBackPageValue={valueForBack} //here its value pass from parent to child component
          />
        )
      ) : null}

      {valueForBack == 1 ? (
        <button
        onClick={submitPropertyData}
          type="button"
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mt-5"
        >
          Finish
        </button>
      ) : null}
    </section>
  );
}

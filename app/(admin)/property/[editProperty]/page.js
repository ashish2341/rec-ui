"use client";
import BasicDetailsForm from "@/components/admin/propertyUpdateForms/basicDetails/basicDetails";
import PropertyDetailsForm from "@/components/admin/propertyUpdateForms/propertyDetails/propertyDetails";
import PropertyImagesForm from "@/components/admin/propertyUpdateForms/propertyImages/propertyImage";
import FeaturesDetailsForm from "@/components/admin/propertyUpdateForms/featureDetails/featureDetails";
import LocationDetailsForm from "@/components/admin/propertyUpdateForms/locationDetails/locationDetails";
import PropertyFaqForm from "@/components/admin/propertyUpdateForms/propertyFaq/propertyFaq";
import { useEffect, useState } from "react";
import Styles from "./editProperty.module.css";
import useFetch from "@/customHooks/useFetch";
import { API_BASE_URL } from "@/utils/constants";
import Cookies from "js-cookie";
import Spinner from "@/components/common/loading";
import { ToastContainer, toast } from "react-toastify";
import { UpdatePropertyApi } from "@/api-functions/property/updateProperty";
import { useRouter } from "next/navigation";
import Stepper from "@/components/common/stepper/stepper";
export default function EditProject(params) {
  console.log("params", params);
  const {
    data: listEditData,

    error,
  } = useFetch(
    `${API_BASE_URL}/properties/${params?.params?.editProperty}`
  );
  const stepperArray = [
    "Basic details",
    "Property details",
    "Feature/Amenity",
    "Location details",
    "Faq details",
    "Property Images",
  ];
  console.log("property listEditData of outSide",listEditData)
  const [pageValue, setPageValue] = useState(1);
  const [activePage, setActivePage] = useState();
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [valueForBack, setValueForBack] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isRender, setIsRender] = useState(false);
  const [propertyBackvalue, setPropertyBackvalue] = useState(0);
const router=useRouter()
  useEffect(() => {
    const token = Cookies.get("token");
    setLoading(true);
    const fetchData = async () => {
      console.log("params inside fetch Data",params)
      try {
        const response = await fetch(
          `${API_BASE_URL}/properties/property/${params?.params?.editProperty}`,
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
    if (pageValue == 3 || pageValue ==4) {
      setPropertyBackvalue(0);
    }
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
        Surveillance: propertyData?.Surveillance.map((item) => item.value),
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
      };
      const propertyId=params?.params?.editProperty;
      let res = await UpdatePropertyApi(finalizePropertyData,propertyId);
      if (res?.resData?.success == true) {
        if (typeof window !== "undefined") {
           sessionStorage.removeItem("EditPropertyData");
           router.push("/property");
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
      <div className="flex">
        <h1 className="text-2xl text-black-600 underline mb-3 font-bold">
          Update Your Property Details
        </h1>
        {pageValue > 1 ? (
          pageValue == 1 ? null : (pageValue == 2 && propertyBackvalue == 0) ||
            (pageValue == 3 && propertyBackvalue == 0) ? (
            <button
              onClick={handelBackPage}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5 ml-10"
              >
              Back
            </button>
          ) : pageValue == 1 || pageValue == 2 || pageValue == 3 ? (
           null
          ) : ( <button
            onClick={handelBackPage}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5 ml-10"
          >
            Back
          </button>)
        ) : null}
      </div>

      <div className="container mx-auto p-4">
        <div className={`${Styles.propertyContainer}`}>
          <div className={`${Styles.column1}`}>
            <Stepper steppers={stepperArray} pageNumber={pageValue} />
          </div>

          <div className={`${Styles.column2}`}>
          {valueForBack === 1 && (
            <div className="flex justify-end w-1/2 mb-4 relative -top-20 ml-[25rem]">
              <button
                onClick={submitPropertyData}
                type="button"
                className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mt-5"
              >
                Finish
              </button>
              </div>
            )}
          {pageValue === 1 && isRender ? (
            <BasicDetailsForm
              valueForNext={handelNextBtnValue}
              valueForNextPage={pageValue}
            />
          ):null}
            {pageValue === 2 && (
              <PropertyDetailsForm
                setPropertyBackvalue={setPropertyBackvalue}
                valueForNext={handelNextBtnValue}
                valueForNextPage={pageValue}
              />
            )}
            {pageValue === 3 && (
              <FeaturesDetailsForm
                setPropertyBackvalue={setPropertyBackvalue}
                onAmenitiesChange={handleAmenitiesChange}
                onFeaturesChange={handleFeaturesChange}
                valueForNext={handelNextBtnValue}
                valueForNextPage={pageValue}
              />
            )}
            {pageValue === 4 && (
              <LocationDetailsForm
                valueForNext={handelNextBtnValue}
                valueForNextPage={pageValue}
              />
            )}
            {pageValue === 5 && (
              <PropertyFaqForm
                valueForNext={handelNextBtnValue}
                valueForNextPage={pageValue}
              />
            )}
            {pageValue === 6 && (
              <PropertyImagesForm
                valueForNextPage={pageValue}
                valueForBack={handelBackValue}
                mainBackPageValue={valueForBack}
              />
            )}

         
          </div>
        </div>
      </div>
    </section>
  );
}

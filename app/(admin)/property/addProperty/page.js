"use client";
import BasicDetailsForm from "@/components/admin/propertyAddForms/basicDetails/basicDetails";
import PropertyDetailsForm from "@/components/admin/propertyAddForms/propertyDetails/propertyDetails";
import PropertyImagesForm from "@/components/admin/propertyAddForms/propertyImages/propertyImage";
import FeaturesDetailsForm from "@/components/admin/propertyAddForms/featureDetails/featureDetails";
import LocationDetailsForm from "@/components/admin/propertyAddForms/locationDetails/locationDetails";
import PropertyFaqForm from "@/components/admin/propertyAddForms/propertyFaq/propertyFaq";
import { useEffect, useState } from "react";
import Styles from "./addProperty.module.css";
import { AddProperty } from "@/api-functions/property/addProperty";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function AddProject() {
  const [pageValue, setPageValue] = useState(1);
  const [activePage, setActivePage] = useState();
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [valueForBack, setValueForBack] = useState(0);

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
    const propertyData = JSON.parse(sessionStorage.getItem("propertyData"));
    console.log("all Property Data", propertyData);
    console.log("propertyData.Aminities", propertyData.Aminities);
    if (propertyData){
      const loanDetails= {
        ByBank:propertyData?.LoanDetails?.ByBank?.value,
        LoanSince:propertyData?.LoanDetails?.LoanSince ,
        LoanTill:propertyData?.LoanDetails?. LoanTill
      }
      const finalizePropertyData = {
        Titile: propertyData.Titile,
        Description: propertyData.Description,
        Highlight: propertyData.Highlight,
        Facing: [propertyData.Facing.value],
        IsEnabled: propertyData.IsEnabled,
        IsExclusive: propertyData.IsExclusive,
        isFeatured: propertyData.isFeatured,
        IsNew: propertyData.IsNew,
        ProeprtyFor: propertyData.ProeprtyFor.value,
        PropertyType: propertyData.PropertyTypeWithSubtype.value,
        Bedrooms: propertyData.Bedrooms,
        Bathrooms: propertyData.Bathrooms,
        Fencing: propertyData.Fencing.value,
        Flooring: propertyData.Flooring.value,
        Furnished: propertyData.Furnished.value,
        BuiltAreaType: propertyData.BuiltAreaType.value,
        LandArea: propertyData.LandArea,
        CoveredArea: propertyData.CoveredArea,
        CarpetArea: propertyData.CarpetArea,
        TotalPrice: propertyData.TotalPrice,
        PerUnitPrice: propertyData.PerUnitPrice,
        IsDisplayPrice: propertyData.IsDisplayPrice,
        IsNegotiable: propertyData.IsNegotiable,
        PosessionStatus: propertyData.PosessionStatus,
        PosessionDate: propertyData.PosessionDate,
        FloorNumber: propertyData.FloorNumber,
        TotalFloors: propertyData.TotalFloors,
        IsSingleProperty: propertyData.IsSingleProperty,
        PricePerSquareFeet: propertyData.PricePerSquareFeet,
        FloorsAllowed: propertyData.FloorsAllowed,
        IsInterstedInJoinedVenture: propertyData.IsInterstedInJoinedVenture,
        Balconies: propertyData.Balconies,
        Soil: propertyData.Soil.value,
        IsLoanable: propertyData.IsLoanable,
        IsAlreadyLoaned: propertyData.IsAlreadyLoaned,
        LoanDetails: loanDetails,
        OwnershipType: propertyData.OwnershipType.value,
        PropertyStatus: propertyData.PropertyStatus.value,
        IsSold: propertyData.IsSold,
        Preferences: [propertyData.Preferences.value],
        DiscountPercentage: propertyData.DiscountPercentage,
        DiscountForYears: propertyData.DiscountForYears,
        Surveillance: propertyData.Surveillance.map((item) => item.value),
        IsFeatured: propertyData.IsFeatured,
        Features: propertyData.Features,
        Aminities: propertyData.Aminities,
        City: propertyData.City,
        State: propertyData.State,
        Country: propertyData.Country,
        Address: propertyData.Address,
        Area: propertyData.Area.value,
        Location: propertyData.Location,
        Images: propertyData.Images.map((URL) => ({ URL })),
        Videos: propertyData.Videos.map((URL) => ({ URL })),
        Documents: propertyData.Documents.map((URL) => ({ URL })),
        AreaUnits:propertyData.AreaUnits.value,
        ReraNumber:propertyData.ReraNumber,
        BhkType:propertyData.BhkType.value,
        FloorAndCounter:propertyData.FloorAndCounter,
        Fitting:propertyData.Fitting,
        WallAndCeiling:propertyData.WallAndCeiling,
        Faq:propertyData.Faq
      };
      console.log("finalizePropertyData", finalizePropertyData);
      let res = await AddProperty(finalizePropertyData);
      console.log(" Property res", res);
      if (res?.resData?.success == true) {
        if (typeof window !== "undefined") {
          sessionStorage.removeItem("propertyData");
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
      <h1 className="text-2xl text-black-600 underline mb-3 font-bold">
        Add Your Property Details
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

      {pageValue == 1 ? (
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
      ) :  pageValue == 5 ?(
        <PropertyFaqForm
          valueForNext={handelNextBtnValue} //here it's value comes from child component
          valueForNextPage={pageValue} //here its value pass from parent to child component
        />
      ):<PropertyImagesForm
      valueForNextPage={pageValue} //here its value pass from parent to child component
      valueForBack={handelBackValue} //here it's value comes from child component
      mainBackPageValue={valueForBack} //here its value pass from parent to child component
    />}

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

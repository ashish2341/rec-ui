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
import Stepper from "@/components/common/stepper/stepper";
export default function AddProject() {
  const [pageValue, setPageValue] = useState(1);
  const [activePage, setActivePage] = useState();
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [valueForBack, setValueForBack] = useState(0);
  const [propertyBackvalue, setPropertyBackvalue] = useState(0);
  let [basisPagebuttonvalue,setBasisPagebuttonvalue]=useState("Residential")
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
    if (pageValue == 3 || pageValue == 4) {
      setPropertyBackvalue(0);
    }
  };

  const handelBackValue = (value) => {
    setValueForBack(value);
  };

  const submitPropertyData = async () => {
    const propertyData = JSON.parse(sessionStorage.getItem("propertyData"));
    console.log("all Property Data", propertyData);
    console.log("propertyData.Aminities", propertyData?.Aminities);
    if (propertyData) {
      const loanDetails = {
        ByBank: propertyData?.LoanDetails?.ByBank.map((item) => {
          return item._id;
        }),
        LoanSince: propertyData?.LoanDetails?.LoanSince,
        LoanTill: propertyData?.LoanDetails?.LoanTill,
      };
      const finalizePropertyData = {
        Titile: propertyData?.Titile,
        Description: propertyData?.Description,
        Highlight: propertyData?.Highlight,
        Facing: [propertyData?.Facing?._id],
        IsEnabled: propertyData?.IsEnabled,
        IsExclusive: propertyData?.IsExclusive,
        IsFeatured: propertyData?.IsFeatured,
        IsNew: propertyData?.IsNew,
        ProeprtyFor: propertyData?.ProeprtyFor,
        PropertyType: propertyData?.PropertyTypeWithSubtype?._id,
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
        PosessionStatus: propertyData?.PosessionStatus?._id,
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
        Preferences: propertyData?.Preferences.map((item) => {
          return item._id;
        }),
        DiscountPercentage: propertyData?.DiscountPercentage,
        DiscountForYears: propertyData?.DiscountForYears,
        Surveillance: propertyData?.Surveillance.map((item) => item.value),
        IsFeatured: propertyData?.IsFeatured,
        Features: propertyData?.Features,
        Aminities: propertyData?.Aminities,
        City: propertyData?.City,
        State: propertyData?.State,
        Country: propertyData?.Country,
        Address: propertyData?.Address,
        Area: propertyData?.Area?._id,
        PinCode: propertyData.PinCode,
        Landmark: propertyData.Landmark,
        Location: propertyData?.Location,
        Images: propertyData?.Images.map((URL) => ({ URL })),
        Videos: propertyData?.Videos.map((URL) => ({ URL })),
        Documents: propertyData?.Documents.map((URL) => ({ URL })),
        AreaUnits: propertyData?.AreaUnits?._id,
        ReraNumber: propertyData?.ReraNumber,
        BhkType: propertyData?.BhkType?._id,
        FloorAndCounter: propertyData?.FloorAndCounter,
        Fitting: propertyData?.Fitting,
        WallAndCeiling: propertyData?.WallAndCeiling,
        Faq: propertyData?.Faq,
        Brochure: propertyData?.Brochure,
        Builder: propertyData?.Builder?._id,
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
  let stepperArray=""
if(basisPagebuttonvalue=="Residential"){
   stepperArray = [{
    name:"Basic details",
    value:1
  },
  
  {
    name:"Location details",
    value:2
  },
  {
    name:"Property details",
    value:3
  },
  // {
  //   name: "Feature/Amenity",
  //   value:4
  // },
  // {
  //   name:"Faq details",
  //   value:5
  // },
  // {
  //   name:"Property Images",
  //   value:6
  // }
  ];
}
if(basisPagebuttonvalue=="Commercial"){
   stepperArray = [{
    name:"Basic details",
    value:1
  },
  
  {
    name:"Location details",
    value:2
  },
  {
    name:"Property details",
    value:3
  },
  {
    name: "Feature/Amenity",
    value:4
  },
  {
    name:"Faq details",
    value:5
  },
  {
    name:"Property Images",
    value:6
  }
  ];
}
  console.log("propertyBackvalue", propertyBackvalue);
  console.log("pageValue", pageValue);
  return (
    <section >
      {/* <div className="flex">
        {pageValue > 1 ? (
          pageValue == 1 ? null : (pageValue == 3 && propertyBackvalue == 0) ||
            (pageValue == 4 && propertyBackvalue == 0) ? (
            <button
              onClick={handelBackPage}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  ml-70"
            >
              Back
            </button>
          ) : pageValue == 1 || pageValue == 3 || pageValue == 4 ? null : (
            <button
              onClick={handelBackPage}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  ml-70"
            >
              Back
            </button>
          )
        ) : null}
      </div> */}

      
        <div className={`${Styles.propertyContainer}`}>
          <div className={`${Styles.column1}`}>
            {stepperArray &&  (<Stepper steppers={stepperArray} pageNumber={pageValue} setPageValue={setPageValue}/>) }
           
          </div>

          <div className={`${Styles.column2}`}>
            <div className={`${Styles.insidecolumn2}`}>
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
              {pageValue === 1 && (
                <BasicDetailsForm
                  valueForNext={handelNextBtnValue}
                  valueForNextPage={pageValue}
                  activeButton={basisPagebuttonvalue}
                  setBasisPagebuttonvalue={setBasisPagebuttonvalue}
                />
              )}
               {pageValue === 2 && (
                <LocationDetailsForm
                  valueForNext={handelNextBtnValue}
                  valueForNextPage={pageValue}
                />
              )}
              {pageValue === 3 && (
                <PropertyDetailsForm
                  setPropertyBackvalue={setPropertyBackvalue}
                  valueForNext={handelNextBtnValue}
                  valueForNextPage={pageValue}
                />
              )}
              {pageValue === 4 && (
                <FeaturesDetailsForm
                  setPropertyBackvalue={setPropertyBackvalue}
                  onAmenitiesChange={handleAmenitiesChange}
                  onFeaturesChange={handleFeaturesChange}
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

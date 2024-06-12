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
import { GetPropertyScore } from "@/utils/commonHelperFn";
export default function AddProject() {
  const [pageValue, setPageValue] = useState(1);
  const [activePage, setActivePage] = useState();
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [valueForBack, setValueForBack] = useState(0);
  const [propertyBackvalue, setPropertyBackvalue] = useState(0);
  const [propertyScoreinPercentage, setPropertyScoreinPercentage] =
    useState("");
  let [basisPagebuttonvalue, setBasisPagebuttonvalue] = useState("");
  const [pageValueInsidePropertyForm, setPageValueInsidePropertyForm] =
    useState();
  const router = useRouter();

  useEffect(() => {
    const sessionStoragePropertyData = JSON.parse(
      sessionStorage.getItem("propertyData")
    );
    if (sessionStoragePropertyData) {
      const PropertyTypeWithSubtypeValue =
        sessionStoragePropertyData?.PropertySubtype?.Name;

      const propertyScore = GetPropertyScore(
        sessionStoragePropertyData,
        PropertyTypeWithSubtypeValue
      );
      if (propertyScore != NaN) {
        const CompletePercentage = {
          CompletePercentage: propertyScore,
        };
        setPropertyScoreinPercentage(propertyScore);
        const newPropertyData = {
          ...sessionStoragePropertyData,
          ...CompletePercentage,
        };
        sessionStorage.setItem("propertyData", JSON.stringify(newPropertyData));
      }
    }
  }, [pageValue, pageValueInsidePropertyForm, propertyBackvalue, valueForBack]);
  const handleAmenitiesChange = (amenities) => {

    setSelectedAmenities(amenities);
  };

  const handleFeaturesChange = (features) => {

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

    if (propertyData) {
      const finalizePropertyData = {
        Title: propertyData?.Title,
        Description: propertyData?.Description,
        Facing: [propertyData?.Facing?._id],
        IsEnabled: propertyData?.IsEnabled,
        IsFeatured: propertyData?.IsFeatured,
        ProeprtyFor: propertyData?.ProeprtyFor,
        PropertySubtype: propertyData?.PropertySubtype?._id,
        ProeprtyType: propertyData?.ProeprtyType,
        Bedrooms: propertyData?.Bedrooms,
        Bathrooms: propertyData?.Bathrooms,
        Fencing: propertyData?.Fencing,
        Flooring: propertyData?.Flooring,
        Furnished: propertyData?.Furnished?._id,
        LandArea: propertyData?.LandArea,
        CarpetArea: propertyData?.CarpetArea,
        TotalPrice: propertyData?.TotalPrice,
        IsNegotiable: propertyData?.IsNegotiable,
        PosessionStatus: propertyData?.PosessionStatus?._id,
        PosessionDate: propertyData?.PosessionDate,
        FloorNumber: propertyData?.FloorNumber,
        TotalFloors: propertyData?.TotalFloors,
        OwnershipType: propertyData?.OwnershipType?._id,
        PropertyStatus: propertyData?.PropertyStatus?._id,
        Features: propertyData?.Features,
        Aminities: propertyData?.Aminities,
        City: propertyData?.City,
        Address: propertyData?.Address,
        Area: propertyData?.Area?._id,
        Location: {
          Latitude: "",
          Longitude: "",
        },
        Images: propertyData?.Images?.map((URL) => ({ URL })),
        Videos:
          propertyData?.Videos == ""
            ? []
            : propertyData?.Videos?.map((URL) => ({ URL })),
        AreaUnits: propertyData?.AreaUnits,
        BhkType: propertyData?.BhkType?._id,
        Fitting: propertyData?.Fitting,
        Faq: propertyData?.Faq,
        Brochure: propertyData?.Brochure,
        Builder: propertyData?.Builder?._id,
        OwnerName: propertyData?.OwnerName,
        SuitableFor: propertyData?.SuitableFor,
        ZoneType: propertyData?.ZoneType,
        LocationHub: propertyData?.LocationHub,
        CustomLocationHub: propertyData?.CustomLocationHub,
        CustomSuitable: propertyData?.CustomSuitable,
        CustomZoneType: propertyData?.CustomZoneType,
        BuiltUpArea: propertyData?.BuiltUpArea,
        PlotArea: propertyData?.PlotArea,
        PlotLength: propertyData?.PlotLength,
        Plotwidth: propertyData?.PlotWidth,
        WallType: propertyData?.WallType,
        CellingHeight: propertyData?.CellingHeight,
        EntranceWidth: propertyData?.EntranceWidth,
        TaxCharge: propertyData?.TaxCharge,
        LeasedOrRented: propertyData?.LeasedOrRented,
        CurentRent: propertyData?.CurentRent,
        LeaseYears: propertyData?.LeaseYears,
        ExpectedReturn: propertyData?.ExpectedReturn,
        DgUpsCharge: propertyData?.DgUpsCharge,
        AgeofProperty: propertyData?.AgeofProperty,
        Staircase: propertyData?.Staircase,
        passengerLifts: propertyData?.passengerLifts,
        ServiceLifts: propertyData?.ServiceLifts,
        PublicParking: propertyData?.PublicParking,
        PrivateParking: propertyData?.PrivateParking,
        PublicWashroom: propertyData?.PublicWashroom,
        PrivateWashroom: propertyData?.PrivateWashroom,
        CompletePercentage: propertyData?.CompletePercentage,
        LandAreaUnit: propertyData?.LandAreaUnit,
        CustomFencing: propertyData?.CustomFencing,
        CustomFlooring: propertyData?.CustomFlooring,
        CustomWallType: propertyData?.CustomWallType,
        FloorPlan: propertyData?.FloorPlan,
        PaymentPlan: propertyData?.PaymentPlan,
      };
      console.log("finalizePropertyData", finalizePropertyData);
      let res = await AddProperty(finalizePropertyData);
      
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
  let stepperArray = "";

  stepperArray = [
    {
      name: "Basic details",
      value: 1,
    },

    {
      name: "Location details",
      value: 2,
    },
    {
      name: "Property details",
      value: 3,
    },
    {
      name: "Amenity/Feature",
      value: 4,
    },

    {
      name: "Property Images",
      value: 5,
    },
    {
      name: "Faq details",
      value: 6,
    },
  ];
  
  
  return (
    <section>
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
          {stepperArray && (
            <Stepper
              steppers={stepperArray}
              pageNumber={pageValue}
              setPageValue={setPageValue}
              setValueForBack={setValueForBack}
              propertyScoreValue={propertyScoreinPercentage}
              returnPageValue={"/property"}
              headingValue={0}
            />
          )}
        </div>

        <div className={`${Styles.column2}`}>
          {/* <div className={`${Styles.insidecolumn2}`}> */}
            {pageValue === 1 && (
              <BasicDetailsForm
                valueForNext={handelNextBtnValue}
                valueForNextPage={pageValue}
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
                setPageValueInsidePropertyForm={setPageValueInsidePropertyForm}
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
              <PropertyImagesForm
                valueForNext={handelNextBtnValue}
                valueForNextPage={pageValue}
              />
            )}
            {pageValue === 6 && (
              <PropertyFaqForm
                valueForNextPage={pageValue}
                valueForBack={handelBackValue}
                mainBackPageValue={valueForBack}
              />
            )}
            {valueForBack === 1 && (
              <div className="grid gap-4 mb-4 sm:grid-cols-1">
                <button
                  onClick={submitPropertyData}
                  type="button"
                  className=" ml-10 mr-10 mb-5 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mt-5"
                >
                  Finish
                </button>
              </div>
            )}
          </div>
        {/* </div> */}
      </div>
    </section>
  );
}

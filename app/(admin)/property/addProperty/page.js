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

  let [basisPagebuttonvalue, setBasisPagebuttonvalue] = useState("");
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

    if (propertyData) {
      const finalizePropertyData = {
        Title: propertyData?.Titile,
        Description: propertyData?.Description,
        Facing: [propertyData?.Facing?._id],
        IsEnabled: propertyData?.IsEnabled,
        IsFeatured: propertyData?.IsFeatured,
        ProeprtyFor: propertyData?.PropertyFor,
        PropertySubtype: propertyData?.PropertyTypeWithSubtype?._id,
        ProeprtyType: propertyData?.PropertyType,
        Bedrooms: propertyData?.Bedrooms,
        Bathrooms: propertyData?.Bathrooms,
        Fencing: propertyData?.Fencing?._id,
        Flooring: propertyData?.Flooring?._id,
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
        Location: propertyData?.Location,
        Images: propertyData?.Images?.map((URL) => ({ URL })),
        Videos: propertyData?.Videos == ""?[]:propertyData?.Videos?.map((URL) => ({ URL })),
        AreaUnits: propertyData?.PlotAreaData?.AreaUnits?._id,
        BhkType: propertyData?.BhkType?._id,
        Fitting: propertyData?.Fitting,
        Faq: propertyData?.Faq,
        Brochure: propertyData?.Brochure,
        Builder: propertyData?.Builder?._id,
        OwnerName: propertyData?.OwnerName,
        SuitableFor: propertyData?.Suitable,
        ZoneType: propertyData?.ZoneType,
        LocationHub: propertyData?.LocationHub,
        CustomLocationHub: propertyData?.CustomLocationHub,
        CustomSuitable: propertyData?.CustomSuitable,
        CustomZoneType: propertyData?.CustomZoneType,
        BuiltUpArea: propertyData?.BuiltUpArea,
        PlotArea: propertyData?.PlotAreaData?.PlotArea,
        PlotLength: propertyData?.PlotAreaData?.PlotLength,
        Plotwidth: propertyData?.PlotAreaData?.PlotWidth,
        WallType: propertyData?.WallType,
        CellingHeight: propertyData?.CellingHeight,
        EntranceWidth: propertyData?.EntranceWidth,
        TaxCharge: propertyData?.TaxCharge,
        LeasedOrRented: propertyData?.PreReleasedBtn,
        CurentRent: propertyData?.CurrentRent,
        LeaseYears: propertyData?.LeaseYears,
        ExpectedReturn: propertyData?.ExpectedReturn,
        DgUpsCharge: propertyData?.DgUpsCharge,
        AgeofProperty: propertyData?.AgeOfProperty,
        Staircase: propertyData?.StairCase,
        passengerLifts: propertyData?.PassengerLifts,
        ServiceLifts: propertyData?.ServiceLifts,
        PublicParking: propertyData?.PublicParking,
        PrivateParking: propertyData?.PrivateParking,
        PublicWashroom: propertyData?.PublicWashroom,
        PrivateWashroom: propertyData?.PrivateWashroom,
        CompletePercentage: propertyData?.CompletePercentage,
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
      name: "Feature/Amenity",
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
  // }
  console.log("propertyBackvalue", propertyBackvalue);
  console.log("pageValue", pageValue);
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
            />
          )}
        </div>

        <div className={`${Styles.column2}`}>
          <div className={`${Styles.insidecolumn2}`}>
            {valueForBack === 1 && (
              <div className="flex justify-end w-full mb-4">
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
          </div>
        </div>
      </div>
    </section>
  );
}

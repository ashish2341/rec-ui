"use client";
import BasicDetailsForm from "@/components/admin/propertyUpdateForms/basicDetails/basicDetails";
import PropertyDetailsForm from "@/components/admin/propertyUpdateForms/propertyDetails/propertyDetails";
import PropertyImagesForm from "@/components/admin/propertyUpdateForms/propertyImages/propertyImage";
import FeaturesDetailsForm from "@/components/admin/propertyUpdateForms/featureDetails/featureDetails";
import LocationDetailsForm from "@/components/admin/propertyUpdateForms/locationDetails/locationDetails";
import PropertyFaqForm from "@/components/admin/propertyUpdateForms/propertyFaq/propertyFaq";
import { useEffect, useState } from "react";
import Styles from "./editProperty.module.css";
import { useRouter } from "next/navigation";
import Stepper from "@/components/common/stepper/stepper";
import { GetPropertyScore } from "@/utils/commonHelperFn";
import { API_BASE_URL } from "@/utils/constants";
import Cookies from "js-cookie";
import Spinner from "@/components/common/loading";
import { ToastContainer, toast } from "react-toastify";
import { UpdatePropertyApi } from "@/api-functions/property/updateProperty";
export default function EditProperty(params) {
  const [pageValue, setPageValue] = useState(1);
  const [activePage, setActivePage] = useState();
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [valueForBack, setValueForBack] = useState(0);
  const [propertyBackvalue, setPropertyBackvalue] = useState(0);
  const [propertyScoreinPercentage, setPropertyScoreinPercentage] = useState("");
  let [basisPagebuttonvalue, setBasisPagebuttonvalue] = useState("");
  const [pageValueInsidePropertyForm, setPageValueInsidePropertyForm] =useState();
    const [loading, setLoading] = useState(false);
  const [isRender, setIsRender] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const sessionStoragePropertyData = JSON.parse(
      sessionStorage.getItem("EditPropertyData")
    );
    if (sessionStoragePropertyData) {
      console.log(
        "EditProperty sessionStoragePropertyData",
        sessionStoragePropertyData
      );
      const PropertyTypeWithSubtypeValue =
        sessionStoragePropertyData?.PropertySubtype?.Name || "";
      console.log(
        "EditProperty PropertyTypeWithSubtypeValue",
        PropertyTypeWithSubtypeValue
      );
      const propertyScore = GetPropertyScore(
        sessionStoragePropertyData,
        PropertyTypeWithSubtypeValue
      );
      if(propertyScore != NaN){
        const CompletePercentage={
          CompletePercentage:propertyScore
        }
        setPropertyScoreinPercentage(propertyScore);
        const newPropertyData = { ...sessionStoragePropertyData, ...CompletePercentage };
      sessionStorage.setItem("EditPropertyData", JSON.stringify(newPropertyData));
        console.log("EditProperty propertyScore", propertyScore);
      }
      
    }
  }, [pageValue, pageValueInsidePropertyForm,propertyBackvalue,valueForBack]);

  useEffect(() => {
    const addPropertyData = JSON.parse(sessionStorage.getItem("propertyData"));
    if(addPropertyData){
      sessionStorage.removeItem("propertyData")
    }
    const editPropertyData = JSON.parse(sessionStorage.getItem("EditPropertyData"));
    if(editPropertyData){
      sessionStorage.removeItem("EditPropertyData")
    }
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
    if (pageValue == 3 || pageValue == 4) {
      setPropertyBackvalue(0);
    }
  };

  const handelBackValue = (value) => {
    setValueForBack(value);
  };

  const submitPropertyData = async () => {
    const EditPropertyData = JSON.parse(sessionStorage.getItem("EditPropertyData"));

    if (EditPropertyData) {
      const finalizePropertyData = {
        Title: EditPropertyData?.Title,
        Description: EditPropertyData?.Description,
        Facing: EditPropertyData?.Facing?.map((item)=>{
          return item._id
        }),
        IsEnabled: EditPropertyData?.IsEnabled,
        IsFeatured: EditPropertyData?.IsFeatured,
        ProeprtyFor: EditPropertyData?.ProeprtyFor,
        PropertySubtype: EditPropertyData?.PropertySubtype?._id,
        ProeprtyType: EditPropertyData?.ProeprtyType,
        Bedrooms: EditPropertyData?.Bedrooms,
        Bathrooms: EditPropertyData?.Bathrooms,
        Fencing: EditPropertyData?.Fencing?._id,
        Flooring: EditPropertyData?.Flooring?._id,
        Furnished: EditPropertyData?.Furnished?._id,
        LandArea: EditPropertyData?.LandArea,
        CarpetArea: EditPropertyData?.CarpetArea,
        TotalPrice: EditPropertyData?.TotalPrice,
        IsNegotiable: EditPropertyData?.IsNegotiable,
        PosessionStatus: EditPropertyData?.PosessionStatus?._id,
        PosessionDate: EditPropertyData?.PosessionDate,
        FloorNumber: EditPropertyData?.FloorNumber,
        TotalFloors: EditPropertyData?.TotalFloors,
        OwnershipType: EditPropertyData?.OwnershipType?._id,
        PropertyStatus: EditPropertyData?.PropertyStatus?._id,
        Features: EditPropertyData?.Features.map((item)=>{
          return item._id
        }),
        Aminities: EditPropertyData?.Aminities.map((item)=>{
          return item._id
        }),
        City: EditPropertyData?.City,
        Address: EditPropertyData?.Address,
        Area: EditPropertyData?.Area?._id,
        Location: {
          Latitude: "",
          Longitude: "",
        },
        Images: EditPropertyData?.Images?.map((item) => ({URL:item.URL} )),
        Videos: EditPropertyData?.Videos?.Videos == ""
        ? []
        :EditPropertyData?.Videos?.map((item) => ({URL:item.URL} )),
        AreaUnits: EditPropertyData?.AreaUnits?._id,
        BhkType: EditPropertyData?.BhkType?._id,
        Fitting: EditPropertyData?.Fitting,
        Faq:EditPropertyData?.Faq.map((item)=>{
          return {Question:item.Question,
            Answer:item.Answer}
        }),
        Brochure: EditPropertyData?.Brochure,
        Builder: EditPropertyData?.Builder?._id,
        OwnerName: EditPropertyData?.OwnerName,
        SuitableFor: EditPropertyData?.SuitableFor,
        ZoneType: EditPropertyData?.ZoneType,
        LocationHub: EditPropertyData?.LocationHub,
        CustomLocationHub: EditPropertyData?.CustomLocationHub,
        CustomSuitable: EditPropertyData?.CustomSuitable,
        CustomZoneType: EditPropertyData?.CustomZoneType,
        BuiltUpArea: EditPropertyData?.BuiltUpArea,
        PlotArea: EditPropertyData?.PlotArea,
        PlotLength: EditPropertyData?.PlotLength,
        Plotwidth: EditPropertyData?.Plotwidth,
        WallType: EditPropertyData?.WallType,
        CellingHeight: EditPropertyData?.CellingHeight,
        EntranceWidth: EditPropertyData?.EntranceWidth,
        TaxCharge: EditPropertyData?.TaxCharge,
        LeasedOrRented: EditPropertyData?.LeasedOrRented,
        CurentRent: EditPropertyData?.CurentRent,
        LeaseYears: EditPropertyData?.LeaseYears,
        ExpectedReturn: EditPropertyData?.ExpectedReturn,
        DgUpsCharge: EditPropertyData?.DgUpsCharge,
        AgeofProperty: EditPropertyData?.AgeOfProperty,
        Staircase: EditPropertyData?.StairCase,
        passengerLifts: EditPropertyData?.PassengerLifts,
        ServiceLifts: EditPropertyData?.ServiceLifts,
        PublicParking: EditPropertyData?.PublicParking,
        PrivateParking: EditPropertyData?.PrivateParking,
        PublicWashroom: EditPropertyData?.PublicWashroom,
        PrivateWashroom: EditPropertyData?.PrivateWashroom,
        CompletePercentage: EditPropertyData?.CompletePercentage,
        LandAreaUnit:EditPropertyData?.LandAreaUnit
      };
      console.log("finalizePropertyData", finalizePropertyData);
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
              propertyScoreValue={propertyScoreinPercentage}
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
            {pageValue === 1 &&  isRender && (
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
          </div>
        </div>
      </div>
    </section>
  );
}

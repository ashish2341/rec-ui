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
  const [propertyScoreinPercentage, setPropertyScoreinPercentage] =
    useState("");
  let [basisPagebuttonvalue, setBasisPagebuttonvalue] = useState("");
  const [pageValueInsidePropertyForm, setPageValueInsidePropertyForm] =
    useState();
  const [loading, setLoading] = useState(false);
  const [isRender, setIsRender] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isRender) {
      const sessionStoragePropertyData = JSON.parse(
        sessionStorage.getItem("EditPropertyData")
      );
      if (sessionStoragePropertyData) {
       
        const PropertyTypeWithSubtypeValue =
          sessionStoragePropertyData?.PropertySubtype?.Name || "";
        
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
          sessionStorage.setItem(
            "EditPropertyData",
            JSON.stringify(newPropertyData)
          );
         
        }
      }
    }
  }, [
    pageValue,
    pageValueInsidePropertyForm,
    propertyBackvalue,
    valueForBack,
    isRender,
  ]);

  useEffect(() => {
    const addPropertyData = JSON.parse(sessionStorage.getItem("propertyData"));
    // if(addPropertyData){
    //   sessionStorage.removeItem("propertyData")
    // }
    const editPropertyData = JSON.parse(
      sessionStorage.getItem("EditPropertyData")
    );
    if (editPropertyData) {
      sessionStorage.removeItem("EditPropertyData");
    }
    const token = Cookies.get("token");
    setLoading(true);
    const fetchData = async () => {
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

        const checkData = JSON.parse(
          sessionStorage.getItem("EditPropertyData")
        );

        if (data.success == true) {
          sessionStorage.setItem(
            "EditPropertyData",
            JSON.stringify(data?.data)
          );
          setLoading(false);
          setIsRender(true);
        } else {
          toast.error(data.error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [params]);

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
    const EditPropertyData = JSON.parse(
      sessionStorage.getItem("EditPropertyData")
    );

    if (EditPropertyData) {
      const finalizePropertyData = {
        Title: EditPropertyData?.Title,
        Description: EditPropertyData?.Description ,
        Facing: EditPropertyData?.Facing?.map((item) => {
          return item._id;
        }) ,
        IsEnabled: EditPropertyData?.IsEnabled,
        IsFeatured: EditPropertyData?.IsFeatured,
        ProeprtyFor: EditPropertyData?.ProeprtyFor,
        PropertySubtype: EditPropertyData?.PropertySubtype?._id,
        ProeprtyType: EditPropertyData?.ProeprtyType,
        Bedrooms: EditPropertyData?.Bedrooms ? EditPropertyData?.Bedrooms : null ,
        Bathrooms: EditPropertyData?.Bathrooms ? EditPropertyData?.Bathrooms : null ,
        Fencing: EditPropertyData?.Fencing ? EditPropertyData?.Fencing : "" ,
        Flooring: EditPropertyData?.Flooring ? EditPropertyData?.Flooring : "" ,
        Furnished: EditPropertyData?.Furnished ? EditPropertyData?.Furnished?._id : null ,
        LandArea: EditPropertyData?.LandArea ? EditPropertyData?.LandArea : null,
        CarpetArea: EditPropertyData?.CarpetArea ? EditPropertyData?.CarpetArea : null,
        TotalPrice: EditPropertyData?.TotalPrice ,
        IsNegotiable: EditPropertyData?.IsNegotiable,
        PosessionStatus: EditPropertyData?.PosessionStatus?._id,
        PosessionDate: EditPropertyData?.PosessionDate,
        FloorNumber: EditPropertyData?.FloorNumber ? EditPropertyData?.FloorNumber : null,
        TotalFloors: EditPropertyData?.TotalFloors ? EditPropertyData?.TotalFloors : null,
        OwnershipType: EditPropertyData?.OwnershipType?._id,
        PropertyStatus: EditPropertyData?.PropertyStatus ? EditPropertyData?.PropertyStatus?._id : null,
        Features: EditPropertyData?.Features|| [],
        Aminities: EditPropertyData?.Aminities|| [],
        City: EditPropertyData?.City,
        Address: EditPropertyData?.Address,
        Area: EditPropertyData?.Area?._id,
        Location: {
          Latitude: undefined,
          Longitude: undefined,
        },
        Images: EditPropertyData?.Images?.map((item) => ({ URL: item.URL })),
        Videos:
          EditPropertyData?.Videos?.Videos == ""
            ? []
            : EditPropertyData?.Videos?.map((item) => ({ URL: item.URL })),
        AreaUnits: EditPropertyData?.AreaUnits ? EditPropertyData?.AreaUnits:"",
        BhkType: EditPropertyData?.BhkType ? EditPropertyData?.BhkType?._id :null,
        Fitting: EditPropertyData?.Fitting|| {
          Electrical: undefined,
          Toilets: undefined,
          Kitchen: undefined,
          Doors: undefined,
          Windows: undefined,
        },
        Faq: EditPropertyData?.Faq.map((item) => {
          return { Question: item.Question, Answer: item.Answer };
        }),
        Brochure: EditPropertyData?.Brochure,
        Builder: EditPropertyData?.Builder?._id ?EditPropertyData?.Builder?._id :null,
        OwnerName: EditPropertyData?.OwnerName ?EditPropertyData?.OwnerName :"",
        SuitableFor: EditPropertyData?.SuitableFor ?EditPropertyData?.SuitableFor :"",
        ZoneType: EditPropertyData?.ZoneType ?EditPropertyData?.ZoneType :"",
        LocationHub: EditPropertyData?.LocationHub ?EditPropertyData?.LocationHub :"",
        CustomLocationHub: EditPropertyData?.CustomLocationHub ?EditPropertyData?.CustomLocationHub :"",
        CustomSuitable: EditPropertyData?.CustomSuitable ?EditPropertyData?.CustomSuitable :"",
        CustomZoneType: EditPropertyData?.CustomZoneType ?EditPropertyData?.CustomZoneType :"",
        BuiltUpArea: EditPropertyData?.BuiltUpArea ?EditPropertyData?.BuiltUpArea :null,
        PlotArea: EditPropertyData?.PlotArea ?EditPropertyData?.PlotArea :null,
        PlotLength: EditPropertyData?.PlotLength ?EditPropertyData?.PlotLength :null,
        Plotwidth: EditPropertyData?.Plotwidth ?EditPropertyData?.Plotwidth :null, 
        WallType: EditPropertyData?.WallType ?EditPropertyData?.WallType :"",
        CellingHeight: EditPropertyData?.CellingHeight ?EditPropertyData?.CellingHeight :null,
        EntranceWidth: EditPropertyData?.EntranceWidth ?EditPropertyData?.EntranceWidth :null,
        TaxCharge: EditPropertyData?.TaxCharge,
        LeasedOrRented: EditPropertyData?.LeasedOrRented,
        CurentRent: EditPropertyData?.CurentRent ?EditPropertyData?.CurentRent :null,
        LeaseYears: EditPropertyData?.LeaseYears ?EditPropertyData?.LeaseYears :null,
        ExpectedReturn: EditPropertyData?.ExpectedReturn ?EditPropertyData?.ExpectedReturn :null,
        DgUpsCharge: EditPropertyData?.DgUpsCharge,
        AgeofProperty: EditPropertyData?.AgeofProperty ?EditPropertyData?.AgeofProperty :null,
        Staircase: EditPropertyData?.Staircase ?EditPropertyData?.Staircase :null,
        passengerLifts: EditPropertyData?.passengerLifts ?EditPropertyData?.passengerLifts :null,
        ServiceLifts: EditPropertyData?.ServiceLifts ?EditPropertyData?.ServiceLifts :null,
        PublicParking: EditPropertyData?.PublicParking ?EditPropertyData?.PublicParking :null,
        PrivateParking: EditPropertyData?.PrivateParking ?EditPropertyData?.PrivateParking :null,
        PublicWashroom: EditPropertyData?.PublicWashroom ?EditPropertyData?.PublicWashroom :null,
        PrivateWashroom: EditPropertyData?.PrivateWashroom ?EditPropertyData?.PrivateWashroom :null,
        CompletePercentage: EditPropertyData?.CompletePercentage,
        LandAreaUnit: EditPropertyData?.LandAreaUnit ?EditPropertyData?.LandAreaUnit :"",
        CustomFencing:EditPropertyData?.CustomFencing ?EditPropertyData?.CustomFencing :"",
        CustomFlooring:EditPropertyData?.CustomFlooring ?EditPropertyData?.CustomFlooring :"",
        CustomWallType:EditPropertyData?.CustomWallType ?EditPropertyData?.CustomWallType :"",
        FloorPlan:EditPropertyData?.FloorPlan ?EditPropertyData?.FloorPlan :"",
        PaymentPlan:EditPropertyData?.PaymentPlan?EditPropertyData?.PaymentPlan :""
      };
      console.log("finalizePropertyData", finalizePropertyData);
      const propertyId = params?.params?.editProperty;
      let res = await UpdatePropertyApi(finalizePropertyData, propertyId);
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
  // }

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
              headingValue={1}
            />
          )}
        </div>

        <div className={`${Styles.column2}`}>
         
            {pageValue === 1 && isRender && (
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

      </div>
    </section>
  );
}

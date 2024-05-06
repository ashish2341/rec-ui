"use client";
import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import { API_BASE_URL_FOR_MASTER } from "@/utils/constants";
import useFetch from "@/customHooks/useFetch";

export default function PropertyDetailsForm({
  valueForNext,
  valueForNextPage,
}) {
  // fetching Data for facing
  const {
    data: facingData,
    loading,
    error,
  } = useFetch(`${API_BASE_URL_FOR_MASTER}/facing`);
  // console.log("facingData", facingData);

  // fetching Data for propertyTypeData
  const { data: propertyTypeData } = useFetch(
    `${API_BASE_URL_FOR_MASTER}/propertyWithSubTypes`
  );
  // console.log("propertyTypeData", propertyTypeData);

  // fetching Data for propertyOwnerShipData
  const { data: propertyOwnerShipData } = useFetch(
    `${API_BASE_URL_FOR_MASTER}/propertyOwnerShip`
  );
  // console.log("propertyOwnerShipData", propertyOwnerShipData);

  // fetching Data for propertyStatusData
  const { data: propertyStatusData } = useFetch(
    `${API_BASE_URL_FOR_MASTER}/propertyStatus`
  );
  // console.log("propertyStatusData", propertyStatusData);

  // fetching Data for preferencesData
  const { data: preferencesData } = useFetch(
    `${API_BASE_URL_FOR_MASTER}/preferences`
  );
  // console.log("preferencesData", preferencesData);

  // fetching Data for soilsData
  const { data: soilsData } = useFetch(`${API_BASE_URL_FOR_MASTER}/soils`);
  // console.log("soilsData", soilsData);

  // fetching Data for fencingsData
  const { data: fencingsData } = useFetch(
    `${API_BASE_URL_FOR_MASTER}/fencings`
  );
  // console.log("fencingsData", fencingsData);

  // fetching Data for flooringsData
  const { data: flooringsData } = useFetch(
    `${API_BASE_URL_FOR_MASTER}/floorings`
  );
  // console.log("flooringsData", flooringsData);

  // fetching Data for furnishedesData
  const { data: furnishedesData } = useFetch(
    `${API_BASE_URL_FOR_MASTER}/furnishedes`
  );
  // console.log("furnishedesData", furnishedesData);

  // fetching Data for builtAreaTypesData
  const { data: builtAreaTypesData } = useFetch(
    `${API_BASE_URL_FOR_MASTER}/builtAreaTypes`
  );
  // console.log("builtAreaTypesData", builtAreaTypesData);

  // fetching Data for areaUnitData
  const { data: areaUnitData } = useFetch(
    `${API_BASE_URL_FOR_MASTER}/areaunits`
  );
  // fetching Data for byBank
  const { data: byBankData } = useFetch(`${API_BASE_URL_FOR_MASTER}/banks`);
  console.log("byBankData", byBankData);

  // fetching Data for bhkTypeData
  const { data: bhkTypeData } = useFetch(`${API_BASE_URL_FOR_MASTER}/bhkType`);
  // console.log("bhkTypeData", bhkTypeData);

// fetching Data for posessionStatusData
const { data: posessionStatusData } = useFetch(
  `${API_BASE_URL_FOR_MASTER}/possession`
);
console.log("posessionStatusData", posessionStatusData);

  const defaultOption = [{ value: "", label: "no data found" }];
  const propertyForData = [
    { name: "Rent", value: "Rent" },
    { name: "Sale", value: "Sale" },
    { name: "Lease", value: "Lease" },
  ];
  const surveillanceData = [
    { name: "camera", value: "camera" },
    { name: "security", value: "security" },
    { name: "watchman", value: "watchman" },
  ];

  const [initialValueForBtn, setInitialValueForBtn] = useState(0);
  // const [propertyType, setPropertyType] = useState("");
  const [facing, setFacing] = useState("");
  const [isEnabled, setIsEnabled] = useState("");
  const [isExclusive, setIsExclusive] = useState("");
  const [isFeatured, setIsFeatured] = useState("");
  const [isNew, setIsNew] = useState("");
  // const [availableUnits, setAvailableUnits] = useState("");
  const [reraNumber, setReraNumber] = useState("");
  // const [projectStatus, setProjectStatus] = useState("");
  const [propertyFor, setPropertyFor] = useState("");
  const [propertyTypeWithSubtype, setPropertyTypeWithSubtype] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [fencing, setFencing] = useState("");
  const [flooring, setFlooring] = useState("");
  const [furnished, setFurnished] = useState("");
  const [builtAreaType, setBuiltAreaType] = useState("");
  const [landArea, setLandArea] = useState("");
  const [coveredArea, setCoveredArea] = useState("");
  const [carpetArea, setCarpetArea] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [perUnitPrice, setPerUnitPrice] = useState("");
  const [isDisplayPrice, setIsDisplayPrice] = useState("");
  const [isNegotiable, setIsNegotiable] = useState("");
  const [posessionStatus, setPosessionStatus] = useState("");
  const [posessionDate, setPosessionDate] = useState("");
  const [floorNumber, setFloorNumber] = useState("");
  const [totalFloors, setTotalFloors] = useState("");
  const [isSingleProperty, setIsSingleProperty] = useState("");
  const [pricePerSquareFeet, setPricePerSquareFeet] = useState("");
  const [floorsAllowed, setFloorsAllowed] = useState("");
  const [isInterestedInJoinedVenture, setIsInterestedInJoinedVenture] =
    useState("");
  const [balconies, setBalconies] = useState("");
  // const [approvedBy, setApprovedBy] = useState([]);
  const [soil, setSoil] = useState("");
  const [ownershipType, setOwnershipType] = useState("");
  const [propertyStatus, setPropertyStatus] = useState("");
  const [isSold, setIsSold] = useState("");
  const [preferences, setPreferences] = useState([]);
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [discountForYears, setDiscountForYears] = useState("");
  const [surveillance, setSurveillance] = useState([]);
  //Loan Details
  const [isLoanable, setIsLoanable] = useState("");
  const [isAlreadyLoaned, setIsAlreadyLoaned] = useState("");
  const [loanDetails, setLoanDetails] = useState({
    ByBank: "",
    LoanSince: "",
    LoanTill: "",
  });
  const [areaUnits, setAreaUnits] = useState("");
  const [oldSurveillanceData, setOldSurveillanceData] = useState([]);
  const [byBank, setByBank] = useState([]);
  const [loanSince, setLoanSince] = useState("");
  const [loanTill, setLoanTill] = useState("");
  const [bhkType, setBhkType] = useState("");
  const[startPrice,setStartPrice]=useState("")
  const[endPrice,setEndPrice]=useState("")
 

  useEffect(() => {
    // Retrieve data from localStorage
    const sessionStoragePropertyData = JSON.parse(
      sessionStorage.getItem("EditPropertyData")
    );
    console.log(
      "localStorageData from localstorage",
      sessionStoragePropertyData.Facing
    );
    // Update state values if data exists in localStorage
    if (sessionStoragePropertyData) {
      console.log("sessionStoragePropertyData ", sessionStoragePropertyData);
      console.log(
        "sessionStoragePropertyData?.AreaAreaUnits?._id  ",
        sessionStoragePropertyData?.AreaUnits
      );
      console.log(
        "sessionStoragePropertyData?.AreaAreaUnits?.Unit  ",
        sessionStoragePropertyData?.AreaUnits
      );

      // setPropertyType(sessionStoragePropertyData.PropertyType || "");
      setFacing(sessionStoragePropertyData?.Facing || "");

      setIsEnabled(
        sessionStoragePropertyData?.IsEnabled === true
          ? true
          : sessionStoragePropertyData?.IsEnabled === undefined
          ? null
          : false
      );
      setIsExclusive(
        sessionStoragePropertyData?.IsExclusive === true
          ? true
          : sessionStoragePropertyData?.IsExclusive === undefined
          ? null
          : false
      );
      setIsFeatured(
        sessionStoragePropertyData?.IsFeatured === true
          ? true
          : sessionStoragePropertyData?.IsFeatured === undefined
          ? null
          : false
      );
      setIsNew(
        sessionStoragePropertyData?.IsNew === true
          ? true
          : sessionStoragePropertyData?.IsNew === undefined
          ? null
          : false
      );
      // setAvailableUnits(sessionStoragePropertyData.AvailableUnits || "");
      setReraNumber(sessionStoragePropertyData?.ReraNumber || "");
      // setProjectStatus(sessionStoragePropertyData.ProjectStatus || "");
      setPropertyFor(sessionStoragePropertyData?.ProeprtyFor || "");
      setPropertyTypeWithSubtype(sessionStoragePropertyData?.PropertyType || "" );
      setBedrooms(sessionStoragePropertyData?.Bedrooms || "");
      setBathrooms(sessionStoragePropertyData?.Bathrooms || "");
      setFencing(sessionStoragePropertyData?.Fencing || "");
      setFlooring(sessionStoragePropertyData?.Flooring || "");
      setFurnished(sessionStoragePropertyData?.Furnished || "");
      setBuiltAreaType(sessionStoragePropertyData?.BuiltAreaType || "");
      setLandArea(sessionStoragePropertyData?.LandArea || "");
      setCoveredArea(sessionStoragePropertyData?.CoveredArea || "");
      setCarpetArea(sessionStoragePropertyData?.CarpetArea || "");
      setStartPrice(sessionStoragePropertyData?.TotalPrice?.MinValue || "");
      setEndPrice(sessionStoragePropertyData?.TotalPrice?.MaxValue || "");
      setPerUnitPrice(sessionStoragePropertyData?.PerUnitPrice || "");
      setIsDisplayPrice(
        sessionStoragePropertyData?.IsDisplayPrice === true
          ? true
          : sessionStoragePropertyData?.IsDisplayPrice === undefined
          ? null
          : false
      );
      setIsNegotiable(
        sessionStoragePropertyData?.IsNegotiable === true
          ? true
          : sessionStoragePropertyData.IsNegotiable === undefined
          ? null
          : false
      );
      setPosessionStatus(sessionStoragePropertyData?.PosessionStatus || "");
      setPosessionDate(
        sessionStoragePropertyData?.PosessionDate?.slice(0, 10) || ""
      );
      setFloorNumber(sessionStoragePropertyData?.FloorNumber || "");
      setTotalFloors(sessionStoragePropertyData?.TotalFloors || "");
      setIsSingleProperty(
        sessionStoragePropertyData?.IsSingleProperty === true
          ? true
          : sessionStoragePropertyData?.IsSingleProperty === undefined
          ? null
          : false
      );
      setPricePerSquareFeet(
        sessionStoragePropertyData?.PricePerSquareFeet || ""
      );
      setFloorsAllowed(sessionStoragePropertyData?.FloorsAllowed || "");
      setIsInterestedInJoinedVenture(
        sessionStoragePropertyData?.IsInterstedInJoinedVenture === true
          ? true
          : sessionStoragePropertyData?.IsInterstedInJoinedVenture === undefined
          ? null
          : false
      );
      setBalconies(sessionStoragePropertyData?.Balconies || "");
      // setApprovedBy(sessionStoragePropertyData.ApprovedBy || []);
      setSoil(sessionStoragePropertyData?.Soil || "");
      setOwnershipType(sessionStoragePropertyData?.OwnershipType|| "");
      setPropertyStatus(sessionStoragePropertyData?.PropertyStatus || "");
      setIsSold(
        sessionStoragePropertyData?.IsSold === true
          ? true
          : sessionStoragePropertyData?.IsSold === undefined
          ? null
          : false
      );
      setPreferences(sessionStoragePropertyData?.Preferences || "");
      setDiscountPercentage(
        sessionStoragePropertyData?.DiscountPercentage || 0
      );
      setDiscountForYears(sessionStoragePropertyData?.DiscountForYears || 0);
      setSurveillance(sessionStoragePropertyData?.Surveillance || "");
      setOldSurveillanceData(sessionStoragePropertyData?.Surveillance || "");
      setAreaUnits(sessionStoragePropertyData?.AreaUnits || "");
      // Loan Details
      setIsLoanable(
        sessionStoragePropertyData?.IsLoanable === true
          ? true
          : sessionStoragePropertyData?.IsLoanable === undefined
          ? null
          : false
      );
      setIsAlreadyLoaned(
        sessionStoragePropertyData?.IsAlreadyLoaned === true
          ? true
          : sessionStoragePropertyData?.IsAlreadyLoaned === undefined
          ? null
          : false
      );
      setBhkType( sessionStoragePropertyData?.BhkType || "");
      setByBank( sessionStoragePropertyData?.LoanDetails?.ByBank || "");
      setLoanSince(
        sessionStoragePropertyData?.LoanDetails?.LoanSince?.slice(0, 10) || 0
      );
      setLoanTill(
        sessionStoragePropertyData?.LoanDetails?.LoanTill?.slice(0, 10) || 0
      );
      // setPurchaseDetails({
      //   BuyerId: sessionStoragePropertyData.PurchaseRentBy.BuyerId || "",
      //   SellerId: sessionStoragePropertyData.PurchaseRentBy.SellerId || "",
      //   PurchaseDate:sessionStoragePropertyData.PurchaseRentBy.PurchaseDate || "",
      //   PurchaseAmount: sessionStoragePropertyData.PurchaseRentBy.PurchaseAmount || "",
      //   Document: sessionStoragePropertyData.PurchaseRentBy.Document || "",
      // })
    }
  }, []);

  // const handelPropertyTypes = (e) => {
  //   console.log("Property Type:", e.target.value);
  //   setPropertyType(e.target.value);
  // };

  // const handelFacingChange = (e) => {
  //   console.log("inputFacing:", e);
  //   setFacing(e);
  // };

  const handelIsEnabled = (e) => {
    console.log("Is Enabled:", e.target.value === "true");
    setIsEnabled(e.target.value === "true");
  };

  const handelIsFeatured = (e) => {
    console.log("Is Featured:", e.target.value === "true");
    setIsFeatured(e.target.value === "true");
  };

  const handelIsNew = (e) => {
    console.log("Is New:", e.target.value === "true");
    setIsNew(e.target.value === "true");
  };

  const handelIsExclusive = (e) => {
    console.log("Is Exclusive:", e.target.value === "true");
    setIsExclusive(e.target.value === "true");
  };

  // const handelAvailableUnits = (e) => {
  //   console.log("Available Units:", e.target.value);
  //   setAvailableUnits(e.target.value);
  // };

  const handelReraNumber = (e) => {
    console.log("Rera Number:", e.target.value);
    setReraNumber(e.target.value);
  };

  // const handelProjectStatus = (e) => {
  //   console.log("Project Status:", e.target.value);
  //   setProjectStatus(e.target.value);
  // };
  const handleIsDisplayPrice = (e) => {
    console.log("handleIsDisplayPrice", e.target.value);
    setIsDisplayPrice(e.target.value === "true");
  };

  const handleIsNegotiable = (e) => {
    console.log("handleIsNegotiable", e.target.value);
    setIsNegotiable(e.target.value === "true");
  };

  const handleIsSingleProperty = (e) => {
    console.log("handleIsSingleProperty", e.target.value);
    setIsSingleProperty(e.target.value === "true");
  };

  const handleIsInterestedInJoinedVenture = (e) => {
    console.log("handleIsInterestedInJoinedVenture", e.target.value);
    setIsInterestedInJoinedVenture(e.target.value === "true");
  };

  const handleIsLoanable = (e) => {
    setIsLoanable(e.target.value === "true");
  };

  const handleIsAlreadyLoaned = (e) => {
    setIsAlreadyLoaned(e.target.value === "true");
  };

  const handleIsSold = (e) => {
    setIsSold(e.target.value === "true");
  };

  const handleLoanChange = (e) => {
    const { name, value } = e.target;
    setLoanDetails({ ...loanDetails, [name]: value });
  };
  const onSurveillanceChange = (e) => {
    // console.log("onSurveillanceChange", e);
    const values = e.map((obj) => obj.value);
    setOldSurveillanceData(values);
  };
  const onFencingChange = (e) => {
    console.log("onFencingChange", e);
    // const values = e.map((obj) => obj.value);

    setFencing({ _id: e.value, Fencing: e.label });
  };
  const handleBankNameChange=(e)=>{
   
    setByBank(e.map((item)=>(
      {_id: item.value, BankName: item.label}
      
    )))
  }

  const  formatNumber = (number) => {
    console.log("number",number)
    console.log("typeof number",typeof number)
    if (typeof number !== 'number') {
        toast.error('Input must be a number');
    }
    
    if (number >= 10000000) {
        return (number / 10000000).toFixed(2) + ' Cr';
    } else if (number >= 100000) {
        return (number / 100000).toFixed(2) + ' L';
    } else if(number>=1000) {
      return (number / 1000).toFixed(2) + ' K';
       
    } else {
      return number.toString();
    }
}
const checkRequiredFields = () => {
  const requiredFields = [
    facing,
    isEnabled,
    isExclusive,
    isFeatured,
    isNew,
    reraNumber,
    propertyFor,
    propertyTypeWithSubtype,
    bedrooms,
    bathrooms,
    fencing,
    flooring,
    furnished,
    builtAreaType,
    landArea,
    coveredArea,
    carpetArea,
    startPrice,
    endPrice,
    perUnitPrice,
    isDisplayPrice,
    isNegotiable,
    posessionStatus,
    posessionDate,
    floorNumber,
    totalFloors,
    isSingleProperty,
    pricePerSquareFeet,
    floorsAllowed,
    isInterestedInJoinedVenture,
    balconies,
    soil,
    ownershipType,
    areaUnits,
    propertyStatus,
    isSold,
    preferences,
    discountPercentage,
    discountForYears,
    surveillance,
    isLoanable,
    isAlreadyLoaned,
    byBank,
    loanSince,
    loanTill,
    bhkType,
  ];

  // Check if any required field is empty
  const isEmpty = requiredFields.some(
    (field) => field === "" || field === null || field === undefined
  );

  return !isEmpty;
};

  //SUbmit form
  const SubmitForm = () => {
    const LoanDetailsData = {
      ByBank: byBank,
      LoanSince: loanSince,
      LoanTill: loanTill,
    };
     const allFieldsFilled = checkRequiredFields();
     let minPrice=formatNumber(parseInt(startPrice));
     let maxPrice=formatNumber(parseInt(endPrice));
    if (allFieldsFilled) {
      console.log("facing", facing);
      console.log("fencing", fencing);
      console.log("flooring", flooring);
      if (surveillance.length == 0) {
        toast.error("Please fill in all required fields!");
        return false;
      }
      console.log("BY BANK DATA BY INPUT ", byBank);
      console.log("loan since DATA BY INPUT ", loanSince);
      console.log("loan till DATA BY INPUT ", loanTill);

      console.log("LoanDetailsData", LoanDetailsData);
      const propertyDetailsData = {
        // propertyType: propertyType.trim(),
        Facing: facing,
        IsEnabled: isEnabled,
        IsExclusive: isExclusive,
        IsFeatured: isFeatured,
        IsNew: isNew,
        ProeprtyFor: propertyFor,
        PropertyType: propertyTypeWithSubtype,
        Bedrooms: bedrooms,
        Bathrooms: bathrooms,
        Fencing: fencing,
        Flooring: flooring,
        Furnished: furnished,
        BuiltAreaType: builtAreaType,
        LandArea: landArea,
        CoveredArea: coveredArea,
        CarpetArea: carpetArea,
        TotalPrice: {DisplayValue:`${minPrice} - ${maxPrice}`,MinValue:startPrice,MaxValue:endPrice},
        PerUnitPrice: perUnitPrice,
        IsDisplayPrice: isDisplayPrice,
        IsNegotiable: isNegotiable,
        PosessionStatus: posessionStatus,
        PosessionDate: posessionDate,
        FloorNumber: floorNumber,
        TotalFloors: totalFloors,
        IsSingleProperty: isSingleProperty,
        PricePerSquareFeet: pricePerSquareFeet,
        FloorsAllowed: floorsAllowed,
        IsInterstedInJoinedVenture: isInterestedInJoinedVenture,
        Balconies: balconies,
        // ApprovedBy: approvedBy,
        ReraNumber: reraNumber,
        Soil: soil,
        IsLoanable: isLoanable,
        IsAlreadyLoaned: isAlreadyLoaned,
        LoanDetails: LoanDetailsData,
        OwnershipType: ownershipType,
        PropertyStatus: propertyStatus,
        IsSold: isSold,
        Preferences: preferences,
        DiscountPercentage: parseInt(discountPercentage),
        DiscountForYears: discountForYears,
        Surveillance: oldSurveillanceData,
        AreaUnits: areaUnits,
        BhkType:bhkType
        // PurchaseRentBy: purchaseDetails,
      };
      console.log("propertyDetailsData before checking ", propertyDetailsData);
      const sessionStorageData = JSON.parse(sessionStorage.getItem("EditPropertyData"));
      const newPropertyData = { ...sessionStorageData, ...propertyDetailsData };
      sessionStorage.setItem("EditPropertyData", JSON.stringify(newPropertyData));
      valueForNext(valueForNextPage + 1);
    } else {
      // Display error message to prompt the user to fill in the missing fields
      toast.error("Please fill in all required fields!");
    }
  };

  const CustomOption = ({ data, ...props }) => (
    <div style={{ display: "flex", alignItems: "center", margin: "5px" }}>
      <img
        src={data.imageUrl}
        alt={data.label}
        style={{ width: "20px", marginRight: "10px" }}
      />
      {data.label}
    </div>
  );
  return (
    <>
      <div>
        <form>
          <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white">
            Property Details
          </h3>
          <div className="grid gap-4 mb-4 sm:grid-cols-2">
            {/* <div>
              <label
                htmlFor="propertyTypes"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Property Types
              </label>
              <select
                name="propertyTypes"
                id="propertyTypes"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                value={propertyType}
                onChange={handelPropertyTypes}
              >
                <option value=" ">--Select--</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
              </select>
            </div> */}
            {/*  Property For */}
            <div>
              <label
                htmlFor="propertyFor"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Property For
              </label>
              <Select
                options={propertyForData.map((element) => ({
                  value: element.value,
                  label: element.name,
                }))}
                placeholder="Select One"
                onChange={setPropertyFor}
                required={true}
                value={{ value: propertyFor, label: propertyFor }}
              />
            </div>
            {/*Facing  */}

            <div>
              <label
                htmlFor="facing"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Facing
              </label>
              {facingData ? (
                <Select
                  options={facingData.data.map((element) => ({
                    value: element._id,
                    label: element.Facing,
                  }))}
                  placeholder="Select One"
                  onChange={setFacing}
                  required={true}
                  value={
                    facing
                      ? facing.map((item) => ({
                          value: item._id,
                          label: item.Facing,
                        }))
                      : facing
                  }
                />
              ) : (
                <Select
                  options={defaultOption.map((element) => ({
                    value: element.value,
                    label: element.label,
                  }))}
                  placeholder="Select One"
                  required={true}
                />
              )}
            </div>

            {/* Is Enabled */}
            <div>
              <label
                htmlFor="isEnabled"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Is Enabled
              </label>
              <input
                type="radio"
                name="isEnabled"
                id="isEnabled"
                value="true"
                required=""
                checked={isEnabled == true}
                onChange={handelIsEnabled}
              />
              <label htmlFor="isEnabled" className="mr-3 ml-2">
                Yes
              </label>
              <input
                type="radio"
                name="isEnabled"
                id="isEnabled"
                value="false"
                required=""
                checked={isEnabled == false}
                onChange={handelIsEnabled}
                className="form-radio h-5 w-5 text-red-600"
              />
              <label htmlFor="isEnabled" className="ml-2">
                No
              </label>
            </div>
            {/*  Is Exclusive*/}
            <div>
              <label
                htmlFor="isExclusive"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Is Exclusive
              </label>
              <input
                type="radio"
                name="isExclusive"
                id="isExclusive"
                value="true"
                required=""
                checked={isExclusive == true}
                onChange={handelIsExclusive}
              />
              <label htmlFor="isExclusive" className="mr-3 ml-2">
                Yes
              </label>
              <input
                type="radio"
                name="isExclusive"
                id="isExclusive"
                value="false"
                required=""
                checked={isExclusive == false}
                onChange={handelIsExclusive}
                className="form-radio h-5 w-5 text-red-600"
              />
              <label htmlFor="isExclusive" className="ml-2">
                No
              </label>
            </div>
            {/*  Is Featured*/}
            <div>
              <label
                htmlFor="isFeatured"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Is Featured
              </label>
              <input
                type="radio"
                name="isFeatured"
                id="isFeatured"
                value="true"
                required=""
                checked={isFeatured == true}
                onChange={handelIsFeatured}
              />
              <label htmlFor="isFeatured" className="mr-3 ml-2">
                Yes
              </label>
              <input
                type="radio"
                name="isFeatured"
                id="isFeatured"
                value="false"
                required=""
                checked={isFeatured == false}
                onChange={handelIsFeatured}
                className="form-radio h-5 w-5 text-red-600"
              />
              <label htmlFor="isFeatured" className="ml-2">
                No
              </label>
            </div>
            {/*  Is New*/}
            <div>
              <label
                htmlFor="isNew"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Is New
              </label>
              <input
                type="radio"
                name="isNew"
                id="isNew"
                value="true"
                required=""
                checked={isNew == true}
                onChange={handelIsNew}
              />
              <label htmlFor="isNew" className="mr-3 ml-2">
                Yes
              </label>
              <input
                type="radio"
                name="isNew"
                id="isNew"
                value="false"
                required=""
                checked={isNew == false}
                onChange={handelIsNew}
                className="form-radio h-5 w-5 text-red-600"
              />
              <label htmlFor="isNew" className="ml-2">
                No
              </label>
            </div>

            {/* <div>

              <label
                htmlFor="availableUnits"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Available Units
              </label>
              <input
                type="number"
                name="availableUnits"
                id="availableUnits"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Number of Units"
                required=""
                value={availableUnits}
                onChange={handelAvailableUnits}
              />
            </div> */}

            {/*Rera Number  */}
            <div>
              <label
                htmlFor="reraNumber"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Rera Number
              </label>
              <input
                type="text"
                name="reraNumber"
                id="reraNumber"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="RERA Number"
                required=""
                value={reraNumber}
                onChange={handelReraNumber}
              />
            </div>

            {/* <div>
              <label
                htmlFor="projectStatus"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Project Status
              </label>
              <select
                name="projectStatus"
                id="projectStatus"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                value={projectStatus}
                onChange={handelProjectStatus}
              >
                <option value=" ">--Select--</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
            </div> */}

            {/* Property with subtypes */}

            <div>
              <label
                htmlFor="propertyTypeWithSubtype"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Property Type
              </label>
              {propertyTypeData ? (
                <Select
                  options={propertyTypeData.data.map((element) => ({
                    value: element._id,
                    label: element.Type,
                  }))}
                  placeholder="Select One"
                  onChange={(e)=>setPropertyTypeWithSubtype({ _id: e.value, Type: e.label })}
                  required={true}
                  value={{ value: propertyTypeWithSubtype._id, label: propertyTypeWithSubtype.Type }}
                />
              ) : (
                <Select
                  options={defaultOption.map((element) => ({
                    value: element.value,
                    label: element.label,
                  }))}
                  placeholder="Select One"
                  required={true}
                />
              )}
            </div>

            {/* Bedrooms */}
            <div>
              <label
                htmlFor="bedrooms"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Bedrooms
              </label>
              <input
                type="number"
                name="bedrooms"
                id="bedrooms"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Number of Bedrooms"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
              />
            </div>
            {/* Bathrooms */}
            <div>
              <label
                htmlFor="bathrooms"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Bathrooms
              </label>
              <input
                type="number"
                name="bathrooms"
                id="bathrooms"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Number of Bathrooms"
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
              />
            </div>

            {/* Fencing */}
            <div>
              <label
                htmlFor="fencing"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Fencing
              </label>
              {fencingsData ? (
                <Select
                  options={fencingsData.data.map((element) => ({
                    value: element._id,
                    label: element.Fencing,
                  }))}
                  placeholder="Select One"
                  onChange={(e)=>setFencing({ _id: e.value, Fencing: e.label })}
                  required={true}
                  value={{ value: fencing._id, label: fencing.Fencing }}
                />
              ) : (
                <Select
                  options={defaultOption.map((element) => ({
                    value: element.value,
                    label: element.label,
                  }))}
                  placeholder="Select One"
                  required={true}
                />
              )}
            </div>

            {/* Flooring */}
            <div>
              <label
                htmlFor="flooring"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Flooring
              </label>
              {flooringsData ? (
                <Select
                  options={flooringsData.data.map((element) => ({
                    value: element._id,
                    label: element.Flooring,
                  }))}
                  placeholder="Select One"
                  onChange={(e)=>setFlooring({ _id: e.value, Flooring: e.label })}
                  required={true}
                  value={{ value: flooring._id, label: flooring.Flooring }}
                />
              ) : (
                <Select
                  options={defaultOption.map((element) => ({
                    value: element.value,
                    label: element.label,
                  }))}
                  placeholder="Select One"
                  required={true}
                />
              )}
            </div>

            {/* Furnished */}
            <div>
              <label
                htmlFor="furnished"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Furnished
              </label>
              {furnishedesData ? (
                <Select
                  options={furnishedesData.data.map((element) => ({
                    value: element._id,
                    label: element.Furnished,
                  }))}
                  placeholder="Select One"
                  onChange={(e)=>setFurnished({ _id: e.value, Furnished: e.label })}
                  required={true}
                  value={{ value: furnished._id, label: furnished.Furnished }}
                />
              ) : (
                <Select
                  options={defaultOption.map((element) => ({
                    value: element.value,
                    label: element.label,
                  }))}
                  placeholder="Select One"
                  required={true}
                />
              )}
            </div>

            {/* BuiltAreaType */}
            <div>
              <label
                htmlFor="builtAreaType"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Built Area Type
              </label>
              {builtAreaTypesData ? (
                <Select
                  options={builtAreaTypesData.data.map((element) => ({
                    value: element._id,
                    label: element.Type,
                  }))}
                  placeholder="Select One"
                  onChange={(e)=>setBuiltAreaType({ _id: e.value, Type: e.label })}
                  required={true}
                  value={{ value: builtAreaType._id, label: builtAreaType.Type }}
                />
              ) : (
                <Select
                  options={defaultOption.map((element) => ({
                    value: element.value,
                    label: element.label,
                  }))}
                  placeholder="Select One"
                  required={true}
                />
              )}
            </div>
            {/* LandArea */}
            <div>
              <label
                htmlFor="landArea"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Land Area
              </label>
              <input
                type="number"
                name="landArea"
                id="landArea"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Land Area"
                value={landArea}
                onChange={(e) => setLandArea(e.target.value)}
              />
            </div>

            {/* CoveredArea */}
            <div>
              <label
                htmlFor="coveredArea"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Covered Area
              </label>
              <input
                type="number"
                name="coveredArea"
                id="coveredArea"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Covered Area"
                value={coveredArea}
                onChange={(e) => setCoveredArea(e.target.value)}
              />
            </div>

            {/* CarpetArea */}
            <div>
              <label
                htmlFor="carpetArea"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Carpet Area
              </label>
              <input
                type="number"
                name="carpetArea"
                id="carpetArea"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Carpet Area"
                value={carpetArea}
                onChange={(e) => setCarpetArea(e.target.value)}
              />
            </div>
            {/*  Area Unit */}
            <div>
              <label
                htmlFor="areaUnit"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Area Unit
              </label>
              {areaUnitData ? (
                <Select
                  options={areaUnitData.data.map((element) => ({
                    value: element._id,
                    label: element.Unit,
                  }))}
                  placeholder="Select One"
                  onChange={(e)=>setAreaUnits({ _id: e.value, Unit: e.label })}
                  required={true}
                  value={{ value: areaUnits._id, label: areaUnits.Unit }}
                />
              ) : (
                <Select
                  options={defaultOption.map((element) => ({
                    value: element.value,
                    label: element.label,
                  }))}
                  placeholder="Select One"
                  required={true}
                />
              )}
            </div>
             {/* Start Price */}
             <div>
              <label
                htmlFor="startPrice"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
               Start Price
              </label>
              <input
                type="number"
                name="startPrice"
                id="startPrice"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Start Price"
                value={startPrice}
                onChange={(e) => setStartPrice(e.target.value)}
              />
            </div>
             {/* End Price */}
             <div>
              <label
                htmlFor="endPrice"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
               End Price
              </label>
              <input
                type="number"
                name="endPrice"
                id="endPrice"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="End Price"
                value={endPrice} 
                onChange={(e) => setEndPrice(e.target.value)}
              />
            </div>

            {/* PerUnitPrice */}
            <div>
              <label
                htmlFor="perUnitPrice"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Per Unit Price
              </label>
              <input
                type="number"
                name="perUnitPrice"
                id="perUnitPrice"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Per Unit Price"
                value={perUnitPrice}
                onChange={(e) => setPerUnitPrice(e.target.value)}
              />
            </div>
            {/* is displayprice  */}
            <div>
              <label
                htmlFor="isDisplayPrice"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Is Display Price
              </label>
              <input
                type="radio"
                name="isDisplayPrice"
                id="isDisplayPrice"
                value="true"
                required=""
                onChange={handleIsDisplayPrice}
                checked={isDisplayPrice == true}
              />
              <label htmlFor="isDisplayPrice" className="mr-3 ml-2">
                Yes
              </label>
              <input
                type="radio"
                name="isDisplayPrice"
                id="isDisplayPrice"
                value="false"
                required=""
                onChange={handleIsDisplayPrice}
                checked={isDisplayPrice == false}
                className="form-radio h-5 w-5 text-red-600"
              />
              <label htmlFor="isDisplayPrice" className="ml-2">
                No
              </label>
            </div>
            {/* is negotiable */}
            <div>
              <label
                htmlFor="isNegotiable"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Is Negotiable
              </label>
              <input
                type="radio"
                name="isNegotiable"
                id="isNegotiable"
                value="true"
                required=""
                checked={isNegotiable == true}
                onChange={handleIsNegotiable}
              />
              <label htmlFor="isNegotiable" className="mr-3 ml-2">
                Yes
              </label>
              <input
                type="radio"
                name="isNegotiable"
                id="isNegotiable"
                value="false"
                required=""
                checked={isNegotiable == false}
                onChange={handleIsNegotiable}
                className="form-radio h-5 w-5 text-red-600"
              />
              <label htmlFor="isNegotiable" className="ml-2">
                No
              </label>
            </div>
            {/* Posession Status*/}
            <div>
              <label
                htmlFor="posessionStatus"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Possession Status
              </label>
              {posessionStatusData ? (
                <Select
                  options={posessionStatusData.data.map((element) => ({
                    value: element._id,
                    label: element.Possession
                    ,
                  }))}
                  placeholder="Select One"
                  // onChange={setPosessionStatus}
                  // required={true}
                  // value={posessionStatus}
                  onChange={(e)=>setPosessionStatus({ _id: e.value, Possession: e.label })}
                  required={true}
                  value={{ value: posessionStatus._id, label: posessionStatus.Possession }}
                />
              ) : (
                <Select
                  options={defaultOption.map((element) => ({
                    value: element.value,
                    label: element.label,
                  }))}
                  placeholder="Select One"
                  required={true}
                />
              )}
            </div>
            {/* <div>
              <label
                htmlFor="posessionStatus"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Posession Status
              </label>
              <input
                type="text"
                name="posessionStatus"
                id="posessionStatus"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Posession Status"
                value={posessionStatus}
                onChange={(e) => setPosessionStatus(e.target.value)}
              />
            </div> */}

            {/* PosessionDate */}
            <div>
              <label
                htmlFor="posessionDate"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Posession Date
              </label>
              <input
                type="date"
                name="posessionDate"
                id="posessionDate"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={posessionDate}
                onChange={(e) => setPosessionDate(e.target.value)}
              />
            </div>

            {/* FloorNumber */}
            <div>
              <label
                htmlFor="floorNumber"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Floor Number
              </label>
              <input
                type="number"
                name="floorNumber"
                id="floorNumber"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Floor Number"
                value={floorNumber}
                onChange={(e) => setFloorNumber(e.target.value)}
              />
            </div>

            {/* TotalFloors */}
            <div>
              <label
                htmlFor="totalFloors"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Total Floors
              </label>
              <input
                type="number"
                name="totalFloors"
                id="totalFloors"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Total Floors"
                value={totalFloors}
                onChange={(e) => setTotalFloors(e.target.value)}
              />
            </div>
            {/* is single property */}
            <div>
              <label
                htmlFor="isSingleProperty"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Is Single Property
              </label>
              <input
                type="radio"
                name="isSingleProperty"
                id="isSingleProperty"
                value="true"
                required=""
                checked={isSingleProperty == true}
                onChange={handleIsSingleProperty}
              />
              <label htmlFor="isSingleProperty" className="mr-3 ml-2">
                Yes
              </label>
              <input
                type="radio"
                name="isSingleProperty"
                id="isSingleProperty"
                value="false"
                required=""
                checked={isSingleProperty == false}
                onChange={handleIsSingleProperty}
                className="form-radio h-5 w-5 text-red-600"
              />
              <label htmlFor="isSingleProperty" className="ml-2">
                No
              </label>
            </div>
            {/* PricePerSquareFeet */}
            <div>
              <label
                htmlFor="pricePerSquareFeet"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Price Per Square Feet
              </label>
              <input
                type="number"
                name="pricePerSquareFeet"
                id="pricePerSquareFeet"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Price Per Square Feet"
                value={pricePerSquareFeet}
                onChange={(e) => setPricePerSquareFeet(e.target.value)}
              />
            </div>

            {/* FloorsAllowed */}
            <div>
              <label
                htmlFor="floorsAllowed"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Floors Allowed
              </label>
              <input
                type="number"
                name="floorsAllowed"
                id="floorsAllowed"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Floors Allowed"
                value={floorsAllowed}
                onChange={(e) => setFloorsAllowed(e.target.value)}
              />
            </div>
            {/* Is Interested In Joined Venture */}
            <div>
              <label
                htmlFor="isInterestedInJoinedVenture"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Is Interested In Joined Venture
              </label>
              <input
                type="radio"
                name="isInterestedInJoinedVenture"
                id="isInterestedInJoinedVenture"
                value="true"
                required=""
                checked={isInterestedInJoinedVenture == true}
                onChange={handleIsInterestedInJoinedVenture}
              />
              <label
                htmlFor="isInterestedInJoinedVenture"
                className="mr-3 ml-3"
              >
                Yes
              </label>
              <input
                type="radio"
                name="isInterestedInJoinedVenture"
                id="isInterestedInJoinedVenture"
                value="false"
                required=""
                checked={isInterestedInJoinedVenture == false}
                onChange={handleIsInterestedInJoinedVenture}
                className="form-radio h-5 w-5 text-red-600"
              />
              <label htmlFor="isInterestedInJoinedVenture" className=" ml-2">
                No
              </label>
            </div>
            {/* Balconies */}
            <div>
              <label
                htmlFor="balconies"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Balconies
              </label>
              <input
                type="number"
                name="balconies"
                id="balconies"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Number of Balconies"
                value={balconies}
                onChange={(e) => setBalconies(e.target.value)}
              />
            </div>

            {/* ApprovedBy */}
            {/* <div>
              <label
                htmlFor="approvedBy"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Approved By
              </label>
              <input
                type="text"
                name="approvedBy"
                id="approvedBy"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Approved By"
                value={approvedBy}
                onChange={(e) => setApprovedBy(e.target.value)}
              />
            </div> */}

            {/* Soil */}

            <div>
              <label
                htmlFor="soil"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Soil
              </label>
              {soilsData ? (
                <Select
                  options={soilsData.data.map((element) => ({
                    value: element._id,
                    label: element.Soil,
                  }))}
                  placeholder="Select One"
                  onChange={(e)=>setSoil({ _id: e.value, Soil: e.label })}
                  required={true}
                  value={{ value: soil._id, label: soil.Soil }}
                />
              ) : (
                <Select
                  options={defaultOption.map((element) => ({
                    value: element.value,
                    label: element.label,
                  }))}
                  placeholder="Select One"
                  required={true}
                />
              )}
            </div>
            {/* OwnershipType */}

            <div>
              <label
                htmlFor="ownershipType"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Ownership type
              </label>
              {propertyOwnerShipData ? (
                <Select
                  options={propertyOwnerShipData.data.map((element) => ({
                    value: element._id,
                    label: element.Ownership,
                  }))}
                  placeholder="Select One"
                  onChange={(e)=>setOwnershipType({ _id: e.value, Ownership: e.label })}
                  required={true}
                  value={{ value: ownershipType._id, label: ownershipType.Ownership }}
                />
              ) : (
                <Select
                  options={defaultOption.map((element) => ({
                    value: element.value,
                    label: element.label,
                  }))}
                  placeholder="Select One"
                  required={true}
                />
              )}
            </div>

            {/* PropertyStatus */}

            <div>
              <label
                htmlFor="propertyStatus"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Property Status
              </label>
              {propertyStatusData ? (
                <Select
                  options={propertyStatusData.data.map((element) => ({
                    value: element._id,
                    label: element.Status,
                  }))}
                  placeholder="Select One"
                  // onChange={setPropertyStatus}
                  onChange={(e)=>setPropertyStatus(
                    {_id:e.value, Status:e.label}
                    
              )}
                  required={true}
                  value={{value:propertyStatus._id,label:propertyStatus.Status}}
                />
              ) : (
                <Select
                  options={defaultOption.map((element) => ({
                    value: element.value,
                    label: element.label,
                  }))}
                  placeholder="Select One"
                  required={true}
                />
              )}
            </div>

            {/* is Sold */}
            <div>
              <label
                htmlFor="isSold"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Is Sold
              </label>
              <input
                type="radio"
                name="isSold"
                id="isSold"
                value="true"
                required=""
                checked={isSold == true}
                onChange={handleIsSold}
              />
              <label htmlFor="isSold" className="mr-3 ml-2">
                Yes
              </label>
              <input
                type="radio"
                name="isSold"
                id="isSold"
                value="false"
                required=""
                onChange={handleIsSold}
                checked={isSold == false}
                className="form-radio h-5 w-5 text-red-600"
              />
              <label htmlFor="isSold" className="ml-2">
                No
              </label>
            </div>
            {/* Preferences */}

            <div>
              <label
                htmlFor="preferences"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Preferences
              </label>
              {preferencesData ? (
                <Select
                  options={preferencesData.data.map((element) => ({
                    value: element._id,
                    label: element.Preference,
                  }))}
                  placeholder="Select One"
                  // onChange={setPreferences}
                   onChange={(e)=>setPreferences(e.map((item)=>(
                    {_id: item.value, Preference: item.label}
                    
                  )))}
                  required={true}
                  value={
                    preferences
                      ? preferences.map((item) => ({
                          value: item._id,
                          label: item.Preference,
                        }))
                      : preferences
                  }
                  isMulti
                />
              ) : (
                <Select
                  options={defaultOption.map((element) => ({
                    value: element.value,
                    label: element.label,
                  }))}
                  placeholder="Select One"
                  required={true}
                />
              )}
            </div>

            {/* DiscountPercentage */}
            <div>
              <label
                htmlFor="discountPercentage"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Discount Percentage
              </label>
              <input
                type="number"
                name="discountPercentage"
                id="discountPercentage"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Discount Percentage"
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(e.target.value)}
              />
            </div>

            {/* DiscountForYears */}
            <div>
              <label
                htmlFor="discountForYears"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Discount For Years
              </label>
              <input
                type="number"
                name="discountForYears"
                id="discountForYears"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Discount For Years"
                value={discountForYears}
                onChange={(e) => setDiscountForYears(e.target.value)}
              />
            </div>

            {/* Surveillance */}
            <div>
              <label
                htmlFor="surveillance"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Surveillance
              </label>
              <Select
                options={surveillanceData.map((element) => ({
                  value: element.value,
                  label: element.name,
                }))}
                placeholder="Select One"
                onChange={onSurveillanceChange}
                required={true}
                value={oldSurveillanceData.map((item) => ({
                  value: item,
                  label: item,
                }))}
                isMulti
              />
            </div>
            {/* BhkType */}
            <div>
              <label
                htmlFor="bhkType"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Bhk Type
              </label>
              {bhkTypeData ? (
                <Select
                  options={bhkTypeData.data.map((element) => ({
                    value: element._id,
                    label: element.Type,
                  }))}
                  placeholder="Select One"
                  onChange={(e)=>setBhkType({ _id: e.value, Type: e.label })}
                  required={true}
                  value={{ value: bhkType._id, label: bhkType.Type }}
                />
              ) : (
                <Select
                  options={defaultOption.map((element) => ({
                    value: element.value,
                    label: element.label,
                  }))}
                  placeholder="Select One"
                  required={true}
                />
              )}
            </div>
            {/* Loan details */}
<div></div>
            <h3 className="mb-4 text-lg mt-5 font-medium leading-none text-gray-900 dark:text-white font-bold underline">
              Loan Details
            </h3>
            <div></div>
            {/*   Is Loanable */}
            <div>
              <label
                htmlFor="isLoanable"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Is Loanable
              </label>
              <input
                type="radio"
                name="isLoanable"
                id="isLoanable"
                value="true"
                required=""
                checked={isLoanable == true}
                onChange={handleIsLoanable}
              />
              <label htmlFor="isLoanable" className="mr-3 ml-2">
                Yes
              </label>
              <input
                type="radio"
                name="isLoanable"
                id="isLoanable"
                value="false"
                required=""
                onChange={handleIsLoanable}
                checked={isLoanable == false}
                className="form-radio h-5 w-5 text-red-600"
              />
              <label htmlFor="isLoanable" className="ml-2">
                No
              </label>
            </div>
            {/*    Is Already Loaned */}
            <div>
              <label
                htmlFor="isAlreadyLoaned"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Is Already Loaned
              </label>
              <input
                type="radio"
                name="isAlreadyLoaned"
                id="isAlreadyLoaned"
                value="true"
                required=""
                onChange={handleIsAlreadyLoaned}
                checked={isAlreadyLoaned == true}
              />
              <label htmlFor="isAlreadyLoaned" className="mr-3 ml-2">
                Yes
              </label>
              <input
                type="radio"
                name="isAlreadyLoaned"
                id="isAlreadyLoaned"
                value="false"
                required=""
                onChange={handleIsAlreadyLoaned}
                className="form-radio h-5 w-5 text-red-600"
                checked={isAlreadyLoaned == false}
              />
              <label htmlFor="isAlreadyLoaned" className="ml-2">
                No
              </label>
            </div>
            {/*    By Bank */}
            <div>
              <label
                htmlFor="byBank"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                By Bank
              </label>
              {byBankData ? (
                <Select
                  options={byBankData.data.map((element) => ({
                    value: element._id,
                    label: element.BankName,
                    imageUrl: element.BankImage,
                  }))}
                  placeholder="Select One"
                  components={{ Option: CustomOption }}
                  // onChange={(e)=>setByBank({ _id: e.value, BankName: e.label })}
                  onChange={handleBankNameChange}
                  required={true}
                  // value={{ value: byBank._id, label: byBank.BankName }}
                  value={
                    byBank
                      ? byBank.map((item) => ({
                          value: item._id,
                          label: item.BankName,
                        }))
                      : byBank
                  }
                  isMulti
                />
              ) : (
                <Select
                  options={defaultOption.map((element) => ({
                    value: element.value,
                    label: element.label,
                  }))}
                  placeholder="Select One"
                  required={true}
                />
              )}
            </div>
            {/*    Loan Since */}
            <div>
              <label
                htmlFor="loanSince"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Loan Since
              </label>
              <input
                type="date"
                name="LoanSince"
                id="loanSince"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Loan Since Date"
                value={loanSince}
                onChange={(e) => setLoanSince(e.target.value)}
              />
            </div>
            {/*   Loan Till */}
            <div>
              <label
                htmlFor="loanTill"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Loan Till
              </label>
              <input
                type="date"
                name="LoanTill"
                id="loanTill"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Loan Till Date"
                value={loanTill}
                onChange={(e) => setLoanTill(e.target.value)}
              />
            </div>
          </div>
        </form>
        <div>
          <button
            onClick={SubmitForm}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}




"use client";
import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import { API_BASE_URL_FOR_MASTER } from "@/utils/constants";
import useFetch from "@/customHooks/useFetch";
import { ImageString } from "@/api-functions/auth/authAction";
import { GetBuilderApi } from "@/api-functions/builder/getBuilder";
import Cookies from "js-cookie";
import { FormatNumber } from "@/utils/commonHelperFn";
import Styles from "../propertypage.module.css";
import ContinueButton from "@/components/common/propertyContinueButton/continueButton";
import PropertyBigButtons from "@/components/common/admin/propertyBigButton/propertyBigButtons";
import NumberInput from "@/components/common/admin/numberInput/numberInput";
export default function FinancialDetailsPage({ setPropertyPageValue }) {
  const sessionStoragePropertyData = JSON.parse(
    sessionStorage.getItem("propertyData")
  );
  const propertTypWithSubTypeValue =
    sessionStoragePropertyData?.PropertyTypeWithSubtype.Name || "";
  const propertTypeValue = sessionStoragePropertyData?.PropertyType || "";
  const PropertyForValue = sessionStoragePropertyData?.PropertyFor || "";
  const conditionArray = [true, false];
  const monthArray = ["None", 1, 2, 3, 4, "Custom"];
  const [perUnitPrice, setPerUnitPrice] = useState("");
  const [isDisplayPrice, setIsDisplayPrice] = useState("");
  const [isNegotiable, setIsNegotiable] = useState("");
  const [startPrice, setStartPrice] = useState("");
  const [endPrice, setEndPrice] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [discountForYears, setDiscountForYears] = useState("");
  const [securityDepositMonth, setSecurityDepositMonth] = useState("");
  const [posessionDate, setPosessionDate] = useState("");
  const [monthlyRent, setMonthlyRent] = useState("");
  const [customMonth, setCustomMonth] = useState("");
  const [electricityCharge, setElectricityCharge] = useState("");
  const [waterCharge, setWaterCharge] = useState("");
  const [dgUpsCharge, setDgUpsCharge] = useState("");
  const [lockPeriod, setLockPeriod] = useState("");
  const [increaseRent, setIncreaseaRent] = useState("");
  const [taxCharge, setTaxCharge] = useState("");
  const [preReleasedBtn, setPreReleasedBtn] = useState("");
  const [curentRent, setCurrentRent] = useState("");
  const [leaseYears, setLeaseYears] = useState("");
  const [expectedReturn, setExpectedReturn] = useState("");
  console.log("propertTypWithSubTypeValue", propertTypWithSubTypeValue);
  useEffect(() => {
    // Retrieve data from localStorage
    const sessionStoragePropertyData = JSON.parse(
      sessionStorage.getItem("propertyData")
    );
    console.log(
      "sessionStoragePropertyData?.PreReleasedBtn",
      sessionStoragePropertyData?.PreReleasedBtn
    );
    // Update state values if data exists in localStorage
    if (sessionStoragePropertyData) {
      setStartPrice(sessionStoragePropertyData?.TotalPrice?.MinValue || "");
      setEndPrice(sessionStoragePropertyData?.TotalPrice?.MaxValue || "");
      setPerUnitPrice(sessionStoragePropertyData?.PerUnitPrice || "");

     setCurrentRent(sessionStoragePropertyData?.CurrentRent || "")
     setLeaseYears(sessionStoragePropertyData?.LeaseYears || "")
     setExpectedReturn(sessionStoragePropertyData?.ExpectedReturn || "")

      setDiscountPercentage(
        sessionStoragePropertyData?.DiscountPercentage || ""
      );
      setDiscountForYears(sessionStoragePropertyData?.DiscountForYears || "");
      setPreReleasedBtn(
        sessionStoragePropertyData?.PreReleasedBtn === true
          ? true
          : sessionStoragePropertyData?.PreReleasedBtn === undefined
          ? null
          : sessionStoragePropertyData?.PreReleasedBtn === ""? null:false
      );
      setTaxCharge(
        sessionStoragePropertyData?.TaxCharge === true
          ? true
          : sessionStoragePropertyData?.TaxCharge === undefined
          ? null
          : sessionStoragePropertyData?.TaxCharge === ""? null:false
      );
      setDgUpsCharge(
        sessionStoragePropertyData?.DgUpsCharge === true
        ? true
        : sessionStoragePropertyData?.DgUpsCharge === undefined
        ? null
        : sessionStoragePropertyData?.DgUpsCharge === ""? null:false
      );
      setIsNegotiable(
        sessionStoragePropertyData?.IsNegotiable === true
        ? true
        : sessionStoragePropertyData?.IsNegotiable === undefined
        ? null
        : sessionStoragePropertyData?.IsNegotiable === ""? null:false
      );
    }
  }, []);
 

  const checkRequiredFields = () => {
    if(propertTypeValue=="Residential"){
      var requiredFields = [
        startPrice,
        endPrice,
      ];
    }
   if(propertTypeValue=="Commercial" ){
    var requiredFields = [
      startPrice,
      endPrice,
      preReleasedBtn
     
    ];
   }
   if(propertTypeValue=="Commercial" && preReleasedBtn==false){
    var requiredFields = [
      startPrice,
      endPrice,
      expectedReturn
    ];
   }
   if(propertTypeValue=="Commercial" && preReleasedBtn==true){
    var requiredFields = [
      startPrice,
      endPrice,
      curentRent,
      leaseYears
    ];
   }
    
    console.log("requiredFields", requiredFields);
    // Check if any required field is empty
    const isEmpty = requiredFields.some(
      (field) => field === "" || field === null || field === undefined
    );

    return !isEmpty;
  };
  const SubmitForm = () => {
    const allFieldsFilled = checkRequiredFields();
    if (allFieldsFilled) {
      const fourthPropertyData = {
        TotalPrice: {
          DisplayValue: `${FormatNumber(parseInt(startPrice))} - ${FormatNumber(
            parseInt(endPrice)
          )}`,
          MinValue: parseInt(startPrice),
          MaxValue: parseInt(endPrice),
        },
        IsNegotiable: isNegotiable,
     
      };
     if(propertTypeValue=="Commercial"){
      
      fourthPropertyData.TaxCharge=taxCharge;
      fourthPropertyData.PreReleasedBtn=preReleasedBtn;
      if(preReleasedBtn==false){
        fourthPropertyData.ExpectedReturn=expectedReturn;
      }
      if(preReleasedBtn==true){
        fourthPropertyData.CurrentRent=curentRent;
        fourthPropertyData.LeaseYears=leaseYears;

      }
      if(propertTypWithSubTypeValue=="Office"){
        fourthPropertyData.DgUpsCharge=dgUpsCharge;
      }
       
     }
      console.log("fourthPropertyData", fourthPropertyData);
      const localStorageData = JSON.parse(
        sessionStorage.getItem("propertyData")
      );
      const newProjectData = { ...localStorageData, ...fourthPropertyData };
      sessionStorage.setItem("propertyData", JSON.stringify(newProjectData));
      setPropertyPageValue((prev) => prev + 1);
    } else {
      toast.error("Please fill in all required fields!");
    }
  };
console.log("preleasedBtn",preReleasedBtn)
  return (
    <>
      <div className={`flex justify-end ${Styles.continueBtn}`}>
        <ContinueButton modalSubmit={SubmitForm} />
      </div>
      <div className="grid gap-4 mb-4 sm:grid-cols-2">
        {/* Start Price */}
        <div>
          <label
            htmlFor="startPrice"
            className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white required"
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
            className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white required"
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
        {/* is negotiable */}
        <PropertyBigButtons
        forRequired={false}
          labelName={"Is Negotiable"}
          itemArray={conditionArray}
          activeBtnvalue={isNegotiable}
          changeState={setIsNegotiable}
        />
        {propertTypeValue == "Commercial" &&
          propertTypWithSubTypeValue == "Office" && (
            // is dg-ups charged
            <PropertyBigButtons
              labelName={"DG & UPS Charge included?"}
              forRequired={false}
              itemArray={conditionArray}
              activeBtnvalue={dgUpsCharge}
              changeState={setDgUpsCharge}
            />
          )}
        {propertTypeValue == "Commercial" && PropertyForValue == "Sell" && (
          <PropertyBigButtons
          forRequired={false}
            labelName={"Tax & Govt. charge included?"}
            itemArray={conditionArray}
            activeBtnvalue={taxCharge}
            changeState={setTaxCharge}
          />
        )}
      </div>
      {propertTypeValue == "Commercial" && (
        <>
          <h3 className="block mb-2 text-md font-lg underline font-bold text-gray-500 dark:text-white">
            OTHER DETAILS
          </h3>
          <PropertyBigButtons
            labelName={"Is it pre-leased/pre-rented?"}
            itemArray={conditionArray}
            activeBtnvalue={preReleasedBtn}
            changeState={setPreReleasedBtn}
          />

          {preReleasedBtn == true && (
            <div className="grid gap-4 mb-4 sm:grid-cols-2">
              <NumberInput
                labelName={" Current Rent per Month"}
                inputValue={curentRent}
                dynamicState={setCurrentRent}
              />
              <NumberInput
                labelName={" Lease Years"}
                inputValue={leaseYears}
                dynamicState={setLeaseYears}
              />
            </div>
          )}
          {preReleasedBtn == false && (
            <div className="grid gap-4 mb-4 sm:grid-cols-2">
              <NumberInput
                labelName={"Expected Return on Investment"}
                inputValue={expectedReturn}
                dynamicState={setExpectedReturn}
              />
             
            </div>
          )}
        </>
      )}
      {/* PerUnitPrice */}
      {/* <div>
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
        </div> */}
      {/* PricePerSquareFeet */}
      {/* <div>
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
        </div> */}
      {/* is displayprice  */}
      {/* <div>
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
        </div> */}
      {/* is negotiable */}
      {/* <div>
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
        </div> */}

      {/* DiscountPercentage */}
      {/* <div>
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
        </div> */}

      {/* DiscountForYears */}
      {/* <div>
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
        </div> */}
    </>
  );
}

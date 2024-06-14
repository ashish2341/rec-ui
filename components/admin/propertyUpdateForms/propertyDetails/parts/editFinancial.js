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
import { conditionalArray } from "@/utils/constants";
export default function FinancialDetailsPage({ setPropertyPageValue }) {
  const sessionStoragePropertyData = JSON.parse(
    sessionStorage.getItem("EditPropertyData")
  );
  const propertTypWithSubTypeValue =
    sessionStoragePropertyData?.PropertySubtype.Name || "";
  const propertTypeValue = sessionStoragePropertyData?.ProeprtyType || "";
  const PropertyForValue = sessionStoragePropertyData?.ProeprtyFor || "";

  const monthArray = ["None", 1, 2, 3, 4, "Custom"];
  const [perUnitPrice, setPerUnitPrice] = useState("");
  const [isDisplayPrice, setIsDisplayPrice] = useState("");
  const [isNegotiable, setIsNegotiable] = useState("");
  const [startPrice, setStartPrice] = useState("");
  const [endPrice, setEndPrice] = useState("");
  const [priceUnit, setPriceUnit] = useState({
    minPriceUnit: { value: "Lacs", label: "Lacs" },
    maxPriceUnit: { value: "Cr", label: "Cr" },
  });
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


  const priceUnitArray = [
    { value: "Lacs", label: "Lacs" },
    { value: "Cr", label: "Cr" },
  ];
  useEffect(() => {
    // Retrieve data from localStorage
    const sessionStoragePropertyData = JSON.parse(
      sessionStorage.getItem("EditPropertyData")
    );
   
    // Update state values if data exists in localStorage
    if (sessionStoragePropertyData) {
      setStartPrice(
        (
          sessionStoragePropertyData?.TotalPrice?.MinValue /
          (sessionStoragePropertyData?.TotalPrice?.MinPriceUnit == "Lacs"
            ? 100000
            : 10000000)
        ).toFixed(2) || ""
      );
      setEndPrice(
        (
          sessionStoragePropertyData?.TotalPrice?.MaxValue /
          (sessionStoragePropertyData?.TotalPrice?.MaxPriceUnit == "Lacs"
            ? 100000
            : 10000000)
        ).toFixed(2) || ""
      );
      setPriceUnit(
        {
          minPriceUnit: {
            value: sessionStoragePropertyData?.TotalPrice?.MinPriceUnit||"Lacs",
            label: sessionStoragePropertyData?.TotalPrice?.MinPriceUnit||"Lacs",
          },
          maxPriceUnit: {
            value: sessionStoragePropertyData?.TotalPrice?.MaxPriceUnit||"Cr",
            label: sessionStoragePropertyData?.TotalPrice?.MaxPriceUnit|| "Cr",
          },
        } || {
          minPriceUnit: { value: "Lacs", label: "Lacs" },
          maxPriceUnit: { value: "Cr", label: "Cr" },
        }
      );

      setCurrentRent(sessionStoragePropertyData?.CurentRent || null);
      setLeaseYears(sessionStoragePropertyData?.LeaseYears || null);
      setExpectedReturn(sessionStoragePropertyData?.ExpectedReturn || null);
      setPreReleasedBtn(
        sessionStoragePropertyData?.LeasedOrRented === true
          ? true
          : sessionStoragePropertyData?.LeasedOrRented === undefined
          ? ""
          : sessionStoragePropertyData?.LeasedOrRented === ""
          ? ""
          : false
      );
      setTaxCharge(
        sessionStoragePropertyData?.TaxCharge === true
          ? true
          : sessionStoragePropertyData?.TaxCharge === undefined
          ? ""
          : sessionStoragePropertyData?.TaxCharge === ""
          ? ""
          : false
      );
      setDgUpsCharge(
        sessionStoragePropertyData?.DgUpsCharge === true
          ? true
          : sessionStoragePropertyData?.DgUpsCharge === undefined
          ? ""
          : sessionStoragePropertyData?.DgUpsCharge === ""
          ? ""
          : false
      );
      setIsNegotiable(
        sessionStoragePropertyData?.IsNegotiable === true
          ? true
          : sessionStoragePropertyData?.IsNegotiable === undefined
          ? ""
          : sessionStoragePropertyData?.IsNegotiable === ""
          ? ""
          : false
      );
    }
  }, []);
console.log("preleased button value ",preReleasedBtn)
  const checkRequiredFields = () => {
    if (propertTypeValue == "Residential") {
      var requiredFields = [startPrice, endPrice];
    }
    if (propertTypeValue == "Commercial") {
      var requiredFields = [startPrice, endPrice, preReleasedBtn];
    }
    if (propertTypeValue == "Commercial" && preReleasedBtn == false) {
      var requiredFields = [startPrice, endPrice, expectedReturn];
    }
    if (propertTypeValue == "Commercial" && preReleasedBtn == true) {
      var requiredFields = [startPrice, endPrice, curentRent, leaseYears];
    }


    // Check if any required field is empty
    const isEmpty = requiredFields.some(
      (field) => field === "" || field === null || field === undefined
    );

    return !isEmpty;
  };
  const SubmitForm = () => {
    const allFieldsFilled = checkRequiredFields();
    if (allFieldsFilled) {
     const  minValue=startPrice *(priceUnit?.minPriceUnit?.value == "Lacs" ? 100000 : 10000000);
      const maxValue= endPrice *(priceUnit?.maxPriceUnit?.value == "Lacs" ? 100000 : 10000000);
   
      if(minValue>maxValue){
        toast.error("End Price Should be Greater then Start Price.")
        return false
      }
      const fourthPropertyData = {
        TotalPrice: {
          DisplayValue: `${startPrice} ${priceUnit?.minPriceUnit?.value} - ${endPrice} ${priceUnit?.maxPriceUnit?.value}`,
          MinValue:minValue, 
          MaxValue:maxValue, 
          MinPriceUnit: priceUnit?.minPriceUnit?.value,
          MaxPriceUnit: priceUnit?.maxPriceUnit?.value,
        },

        IsNegotiable: isNegotiable ? isNegotiable : false,
      };
      if (propertTypeValue == "Commercial") {
        fourthPropertyData.TaxCharge = taxCharge ? taxCharge : false;
        fourthPropertyData.LeasedOrRented = preReleasedBtn;
        if (preReleasedBtn === false) {
          fourthPropertyData.ExpectedReturn = expectedReturn ? expectedReturn :null;
          if (curentRent && leaseYears) {
            fourthPropertyData.CurentRent = null;
            fourthPropertyData.LeaseYears = null;
          }
        }
        if (preReleasedBtn === true) {
          fourthPropertyData.CurentRent = curentRent ? curentRent :null;
          fourthPropertyData.LeaseYears = leaseYears ? leaseYears :null;
          if (expectedReturn || expectedReturn==="" || expectedReturn===null ) {
            fourthPropertyData.ExpectedReturn = null;
          }
        }
        if (propertTypWithSubTypeValue == "Office") {
          fourthPropertyData.DgUpsCharge = dgUpsCharge
            ? dgUpsCharge
            : false;
        }
      }
    
      console.log("fourthPropertyData", fourthPropertyData);
      const localStorageData = JSON.parse(
        sessionStorage.getItem("EditPropertyData")
      );
      const newProjectData = { ...localStorageData, ...fourthPropertyData };
      sessionStorage.setItem(
        "EditPropertyData",
        JSON.stringify(newProjectData)
      );
      setPropertyPageValue((prev) => prev + 1);
    } else {
      toast.error("Please fill in all required fields!");
    }
  };

  return (
    <>
    
      <div className="grid gap-4 mb-4 sm:grid-cols-2">
        {/* Start Price */}
        <div class="w-full mx-auto">
          <div>
            <label
              for="search-dropdown"
              className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white required"
            >
              Start Price
            </label>
            <div class="relative w-full">
              <input
                type="number"
                name="startPrice"
                id="startPrice"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Start Price"
                value={startPrice}
                onChange={(e) => setStartPrice(e.target.value)}
              />
              <div className="absolute top-0 end-0 text-sm font-medium h-full text-black  rounded-e-lg border-none m-0.5 ">
                <Select
                  options={priceUnitArray.map((element) => ({
                    value: element.value,
                    label: element.label,
                  }))}
                  value={priceUnit.minPriceUnit}
                  onChange={(e) =>
                    setPriceUnit((prev) => {
                      return {
                        ...prev,
                        minPriceUnit: e,
                      };
                    })
                  }
                  placeholder="Select Price Unit"
                  required={true}
                />
              </div>
            </div>
          </div>
        </div>
        {/* End Price */}
        <div class="w-full mx-auto">
          <div>
            <label
              for="search-dropdown"
              className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white required"
            >
              End Price
            </label>
            <div class="relative w-full">
              <input
                type="number"
                name="endPrice"
                id="endPrice"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="End Price"
                value={endPrice}
                onChange={(e) => setEndPrice(e.target.value)}
              />
              <div className="absolute top-0 end-0 text-sm font-medium h-full text-black  rounded-e-lg border-none m-0.5 ">
                <Select
                  options={priceUnitArray.map((element) => ({
                    value: element.value,
                    label: element.label,
                  }))}
                  value={priceUnit.maxPriceUnit}
                  onChange={(e) =>
                    setPriceUnit((prev) => {
                      return {
                        ...prev,
                        maxPriceUnit: e,
                      };
                    })
                  }
                  placeholder="Select Price Unit"
                  required={true}
                />
              </div>
            </div>
          </div>
        </div>
        {/* is negotiable */}
        <PropertyBigButtons
          forRequired={false}
          labelName={"Is Negotiable?"}
          itemArray={conditionalArray}
          activeBtnvalue={isNegotiable}
          changeState={setIsNegotiable}
        />
        {propertTypeValue == "Commercial" &&
          propertTypWithSubTypeValue == "Office" && (
            // is dg-ups charged
            <PropertyBigButtons
              labelName={"DG & UPS Charge included?"}
              forRequired={false}
              itemArray={conditionalArray}
              activeBtnvalue={dgUpsCharge}
              changeState={setDgUpsCharge}
            />
          )}
        {propertTypeValue == "Commercial" && PropertyForValue == "Sell" && (
          <PropertyBigButtons
            forRequired={false}
            labelName={"Tax & Govt. charge included?"}
            itemArray={conditionalArray}
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
            itemArray={conditionalArray}
            activeBtnvalue={preReleasedBtn}
            changeState={setPreReleasedBtn}
          />

          {preReleasedBtn === true && (
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
          {preReleasedBtn === false && (
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
      
         <ContinueButton
        modalSubmit={SubmitForm}
        butonSubName={"add Possession Details"}
      />
    </>
  );
}

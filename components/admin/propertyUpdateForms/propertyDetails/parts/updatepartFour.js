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
export default function PartFour({ setPropertyPageValue }) {
  const [perUnitPrice, setPerUnitPrice] = useState("");
  const [isDisplayPrice, setIsDisplayPrice] = useState("");
  const [isNegotiable, setIsNegotiable] = useState("");
  const [startPrice, setStartPrice] = useState("");
  const [endPrice, setEndPrice] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [discountForYears, setDiscountForYears] = useState("");
  const [pricePerSquareFeet, setPricePerSquareFeet] = useState("");

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
      console.log(
        "if function called sessionStoragePropertyData.PropertyFor ",
        sessionStoragePropertyData.ProeprtyFor
      );
      console.log(
        "sessionStoragePropertyData?.Brochure",
        sessionStoragePropertyData?.Brochure
      );

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

      setPricePerSquareFeet(
        sessionStoragePropertyData?.PricePerSquareFeet || ""
      );

      setDiscountPercentage(
        sessionStoragePropertyData?.DiscountPercentage || ""
      );
      setDiscountForYears(sessionStoragePropertyData?.DiscountForYears || "");
    }
  }, []);
  const handleIsDisplayPrice = (e) => {
    console.log("handleIsDisplayPrice", e.target.value);
    setIsDisplayPrice(e.target.value === "true");
  };

  const handleIsNegotiable = (e) => {
    console.log("handleIsNegotiable", e.target.value);
    setIsNegotiable(e.target.value === "true");
  };

  const checkRequiredFields = () => {
    const requiredFields = [
      startPrice,
      endPrice,
      perUnitPrice,
      isDisplayPrice,
      isNegotiable,
      pricePerSquareFeet,
      discountPercentage,
      discountForYears,
    ];
console.log("requiredFields",requiredFields)
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
        PerUnitPrice:parseInt( perUnitPrice),
        IsDisplayPrice: isDisplayPrice,
        IsNegotiable: isNegotiable,
        PricePerSquareFeet: parseInt(pricePerSquareFeet),
        DiscountPercentage: parseInt(discountPercentage),
        DiscountForYears: parseInt(discountForYears),
      };
      console.log("fourthPropertyData", fourthPropertyData);
      const localStorageData = JSON.parse(
        sessionStorage.getItem("EditPropertyData")
      );
      const newProjectData = { ...localStorageData, ...fourthPropertyData };
      sessionStorage.setItem("EditPropertyData", JSON.stringify(newProjectData));
      setPropertyPageValue((prev) => prev + 1);
    } else {
      toast.error("Please fill in all required fields!");
    }
  };
  return (
    <>
    <div className={`flex justify-end ${Styles.continueBtn}`} >
    <ContinueButton modalSubmit={SubmitForm} />
    </div>
      <div className="grid gap-4 mb-4 sm:grid-cols-2">
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
      </div>
    </>
  );
}

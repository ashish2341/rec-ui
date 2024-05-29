"use client";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import { API_BASE_URL_FOR_MASTER } from "@/utils/constants";
import useFetch from "@/customHooks/useFetch";

export default function PropertyFaqForm({ valueForNext, valueForNextPage }) {
  const initialFieldState = {
    Question: "",
    Answer: "",
  };

  const [faqFields, setFaqFields] = useState([initialFieldState]);
  useEffect(() => {
    // Retrieve data from localStorage
    const sessionStoragePropertyData = JSON.parse(
      sessionStorage.getItem("propertyData")
    );
    console.log(
      "localStorageData from localstorage",
      sessionStoragePropertyData
    );
    // Update state values if data exists in localStorage
    if (sessionStoragePropertyData.Faq) {
     

      setFaqFields(sessionStoragePropertyData?.Faq || "");
    }
  }, []);

  const handleFieldChange = (index, fieldName, value) => {
    const updatedFields = [...faqFields];
    updatedFields[index][fieldName] = value;
    setFaqFields(updatedFields);
  };

  const handleAddMore = () => {
    let newErrors = [];
    faqFields.forEach((field, index) => {
      if (!field.Question.trim() || !field.Answer.trim()) {
        newErrors.push({ index, message: "Question and Answer are required." });
      }
    });

    if (newErrors.length > 0) {
      toast.error("Question and Answer are required");
      return false;
    }
    setFaqFields([...faqFields, initialFieldState]);
  };

  const handleDelete = (index) => {
    const updatedFields = [...faqFields];
    updatedFields.splice(index, 1);
    setFaqFields(updatedFields);
  };

  const SubmitForm = () => {
    let newErrors = [];

    // Check if any field is empty
    faqFields.forEach((field, index) => {
      if (!field.Question.trim() || !field.Answer.trim()) {
        newErrors.push({ index, message: "Question and Answer are required." });
      }
    });

    if (newErrors.length > 0) {
      toast.error("Question and Answer are required");
      return false;
    }
    const faqDetailsData = {
      Faq: faqFields,
    };
    console.log("faqDetailsData", faqDetailsData);
    const localStorageData = JSON.parse(sessionStorage.getItem("propertyData"));
    const newPropertyData = { ...localStorageData, ...faqDetailsData };
    sessionStorage.setItem("propertyData", JSON.stringify(newPropertyData));
    valueForNext(valueForNextPage + 1);
  };

  return (
    <>
      <div>
      <div className="flex justify-end w-1/2 mb-4 relative -top-20 ml-[25rem]">
            <button
              onClick={SubmitForm}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5"
            >
              Next
            </button>
          </div>
        <form>
          <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white">
            Faq Details
          </h3>
          {faqFields.length != 0
            ? faqFields.map((field, index) => (
                <div className="grid gap-4 mb-2 sm:grid-cols-3" key={index}>
                  <div>
                    <label
                      htmlFor={`question-${index}`}
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
                    >
                      Question
                    </label>
                    <textarea
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="text"
                      id={`question-${index}`}
                      value={field.Question}
                      onChange={(e) =>
                        handleFieldChange(index, "Question", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`answer-${index}`}
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
                    >
                      Answer
                    </label>
                    <textarea
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="text"
                      id={`answer-${index}`}
                      value={field.Answer}
                      onChange={(e) =>
                        handleFieldChange(index, "Answer", e.target.value)
                      }
                    />
                  </div>
                  {/* <div></div> */}
                  {index > 0 ? (
                    <div className="mt-3 ">
                      <button
                        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 mt-5"
                        type="button"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </button>
                    </div>
                  ) : null}
                </div>
              ))
            : null}

          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5"
            type="button"
            onClick={handleAddMore}
          >
            Add More
          </button>
        </form>
       
      </div>
    </>
  );
}

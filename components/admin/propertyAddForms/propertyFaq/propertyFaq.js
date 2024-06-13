"use client";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import { API_BASE_URL_FOR_MASTER } from "@/utils/constants";
import useFetch from "@/customHooks/useFetch";
import NextButton from "@/components/common/admin/nextButton/nextButton";


export default function PropertyFaqForm({
  valueForNextPage,
  mainBackPageValue,
  valueForBack,
}) {
  const initialFieldState = [{
    Question: "What is the first step in buying a property?",
    Answer: "The first step is usually to determine your budget and secure financing. This often involves getting pre-approved for a mortgage to understand how much you can afford.",
  },
  {
    Question: "What should I consider when choosing a location?",
    Answer: "Consider factors such as proximity to work, quality of schools, neighborhood safety, local amenities (shops, parks, restaurants), and future development plans.",
  },
  {
    Question: "What is staging and how important is it?",
    Answer: "Staging involves arranging and decorating your home to make it more appealing to buyers. It's important because a well-staged home can sell faster and for a higher price.",
  },
  {
    Question: "How can I improve my home's value before selling?",
    Answer: "Simple improvements like fresh paint, landscaping, minor repairs, and deep cleaning can significantly enhance your home's appeal and value.",
  }
];

  const [faqFields, setFaqFields] = useState(initialFieldState);
  const [btnShowonInputChange, setBtnShowonInputChange] = useState(false);
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
    if (sessionStoragePropertyData) {
      setFaqFields(sessionStoragePropertyData?.Faq || initialFieldState);
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
    valueForBack(mainBackPageValue + 1);
    setBtnShowonInputChange(true);
  };

  return (
    <>
      <div>
     
      
        <form>
          {faqFields.length != 0
            ? faqFields.map((field, index) => (
                <div className="grid gap-4 mb-2 sm:grid-cols-3" key={index}>
                  <div>
                    <label
                      htmlFor={`question-${index}`}
                      className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white required"
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
                      rows={4}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`answer-${index}`}
                      className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white required"
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
                      rows={4}
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
        {mainBackPageValue == 0 || btnShowonInputChange == false ? (
         <NextButton onSubmit={SubmitForm} butonSubName={"save"}/>
        ) : null}
      </div>
    </>
  );
}

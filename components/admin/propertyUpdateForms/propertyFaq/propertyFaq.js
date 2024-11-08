"use client";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import { API_BASE_URL_FOR_MASTER, currentPage } from "@/utils/constants";
import useFetch from "@/customHooks/useFetch";
import NextButton from "@/components/common/admin/nextButton/nextButton";
import Popup from "@/components/common/popup";
import { UpdateStepsStatus ,findNextStep } from "@/utils/commonHelperFn";

export default function PropertyFaqForm({
  valueForNextPage,
  mainBackPageValue,
  valueForBack,
  editedKeys,
  pageName,setFormPageNumberArray,setPageStatusArray,
  pageStatusData,setSubTypeChangedValue,
  subTypechangesValue,
}) {
  const initialFieldState = [
    {
      Question: "What is the first step in buying a property?",
      Answer:
        "The first step is usually to determine your budget and secure financing. This often involves getting pre-approved for a mortgage to understand how much you can afford.",
    },
    {
      Question: "What should I consider when choosing a location?",
      Answer:
        "Consider factors such as proximity to work, quality of schools, neighborhood safety, local amenities (shops, parks, restaurants), and future development plans.",
    },
    {
      Question: "What is staging and how important is it?",
      Answer:
        "Staging involves arranging and decorating your home to make it more appealing to buyers. It's important because a well-staged home can sell faster and for a higher price.",
    },
    {
      Question: "How can I improve my home's value before selling?",
      Answer:
        "Simple improvements like fresh paint, landscaping, minor repairs, and deep cleaning can significantly enhance your home's appeal and value.",
    },
  ];
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [faqFields, setFaqFields] = useState("");
  const [percentageValue,setPercentageValue]=useState(0)
  const [btnShowonInputChange, setBtnShowonInputChange] = useState(false);
  useEffect(() => {
    // Retrieve data from localStorage
    const sessionStoragePropertyData = JSON.parse(
      sessionStorage.getItem("EditPropertyData")
    );

    // Update state values if data exists in localStorage
    if (sessionStoragePropertyData) {
      setFaqFields(sessionStoragePropertyData?.Faq || initialFieldState);
      setPercentageValue(sessionStoragePropertyData?.CompletePercentage || 0)
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
    setFaqFields((prev) => [...prev, { Question: "", Answer: "" }]);
    if(mainBackPageValue ===  1){
      valueForBack(mainBackPageValue - 1);
    }
    
  };

  const handleDelete = (index) => {
    const updatedFields = [...faqFields];
    updatedFields.splice(index, 1);
    setFaqFields(updatedFields);
    if(mainBackPageValue ===  1){
      valueForBack(mainBackPageValue - 1);
    }
  };

  
  const SubmitForm = () => {
    if(percentageValue<100){
      setIsPopupOpen(true)
    }else(
      handlesubmitData()
    )
        
        
      };
      const handleCancel = () => {
        setIsPopupOpen(false);
      };
      const handlesubmitData = async () => {
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
        const localStorageData = JSON.parse(
          sessionStorage.getItem("EditPropertyData")
        );
        const newPropertyData = { ...localStorageData, ...faqDetailsData };
        sessionStorage.setItem("EditPropertyData", JSON.stringify(newPropertyData));
        setFormPageNumberArray((prev) => {
          // Check if the newPage already exists in the array
          if (!prev.includes("Faq details")) {
            return [...prev, "Faq details"];
          }
          return prev; // If it already exists, return the previous state
        });
        setPageStatusArray(UpdateStepsStatus(pageStatusData, valueForNextPage));
        if(subTypechangesValue){
          setSubTypeChangedValue(false)
        }
        setIsPopupOpen(false)
        valueForBack(mainBackPageValue + 1);
        setBtnShowonInputChange(true);
      };
  return (
    <>
      <div>
        <h2 className="block mb-2 text-xl font-lg underline font-bold text-gray-500 dark:text-white">
          Faq Details
        </h2>

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
                      {editedKeys?.includes("Faq.Question") &&
                        pageName === currentPage && <EditedTag />}
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
                      {editedKeys?.includes("Faq.Answer") &&
                        pageName === currentPage && <EditedTag />}
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
          <NextButton onSubmit={SubmitForm} butonSubName={"save"} />
        ) : null}
      </div>
      <Popup
        isOpen={isPopupOpen}
        title="Properties with 100% scores are prioritized in search results please fill remaining fields."
        confirmLabel="Skip"
        cancelLabel="Cancel"
        onConfirm={handlesubmitData}
        onCancel={handleCancel}
      />
    </>
  );
}

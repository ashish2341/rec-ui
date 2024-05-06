"use client";

import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";



export default function BasicDetailsForm({ valueForNext, valueForNextPage }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [highlight, setHighlight] = useState("");
  
 
  useEffect(() => {
    const localStorageProjectData=JSON.parse(sessionStorage.getItem('projectData'));
  
    console.log("localStorageData from localstorage",localStorageProjectData)
    if (localStorageProjectData){
      setTitle(localStorageProjectData?.Titile || "")
      setDescription(localStorageProjectData?.Description || "")
      setHighlight(localStorageProjectData?.Highlight || "")
    }
  },[]);

  const SubmitForm = () => {

    if (title === "") {
        toast.error("Title  is required.");
        return false;
      }
      if (description === "") {
          toast.error("Description is required.");
        return false;
      }
      if (highlight === "") {
        toast.error("Highlight is required.");
        return false;
      }
      const basicDetailsData={
        Titile:title.trim(),
        Description:description.trim(),
        Highlight:highlight.trim(),

      }
      const updatedProjectData = { ...JSON.parse(sessionStorage.getItem('projectData')), ...basicDetailsData };
      sessionStorage.setItem("projectData",JSON.stringify(updatedProjectData))
  
    valueForNext(valueForNextPage + 1);
  };

  const handelTitleChange = (event) => {
    setTitle(() => event.target.value);
  };
  const handelDescriptionChange = (event) => {
    setDescription(() => event.target.value);
  };
  const handelHighlightChange = (event) => {
    setHighlight(() => event.target.value);
  };

  return (
    <>
      <div>
        <form action="#">
          <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white">
            Basic Details{" "}
          </h3>
          <div className="grid gap-4 mb-4 sm:grid-cols-1">
            <div>
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="title.example"
                required=""
                value={title}
                onChange={handelTitleChange}
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Description
              </label>
              <textarea
                type="text"
                name="description"
                id="description"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                value={description}
                onChange={handelDescriptionChange}
              />
            </div>
            <div>
              <label
                htmlFor="highlight"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Highlight
              </label>
              <textarea
                type="text"
                name="highlight"
                id="highlight"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
                value={highlight}
                onChange={handelHighlightChange}
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

"use client";

import Link from "next/link";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { addFeatures } from "@/api-functions/feature/addFeature";

export default function AddFeature() {
  const [Feature, setFeature] = useState("");
  const [Icon, setIcon] = useState("");
  const [IsEnabled, setIsEnabled] = useState();
  const [IsForProject, setIsForProject] = useState();
  const [IsForProperty, setIsForProperty] = useState(null);
  const router = useRouter();
  const handleFeatureChange = (e) => {
    setFeature(e.target.value);
  };
  const handleiconChange = (e) => {
    setIcon(e.target.value);
  };
  const handleEnabledChange = (e) => {
    setIsEnabled(e.target.value);
  };
  const handleForProjectChange = (e) => {
    setIsForProject(e.target.value == 'true');
  };
  const handleForPropertyChange = (e) => {
    setIsForProperty(e.target.value == 'true');
  };
  const addFeatureData = async () => {
    if (Feature === "") {
      toast.error("Feature  is required");
      return false;
    }
    if (Icon === "") {
        toast.error("icon Class is required");
      return false;
    }
    // if (typeof IsForProject !== 'boolean') {
    //   toast.error("Please select an option in project");
    //   return false;
    // }
    // if (typeof IsForProperty !== 'boolean') {
    //   toast.error("Please select an option in property");
    //   return false;
    // }
   
    let payload = {Feature,Icon}
    let res = await addFeatures(payload)
    console.log('res',res)
     if(res?.resData?.success == true){

       router.push("/feature");
       toast.success(res?.resData?.message);
      }else{
        toast.error(res.errMessage);
        return false;
      }
  };
  return (
    <section>
      <h1>Add Feature</h1>
      <Link href="/feature">
        <div className="mb-5 mt-5">
          <button
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            type="button"
          >
            Back
          </button>
        </div>
      </Link>
      <form className="mb-5">
        <div className="grid gap-4 mb-4 md:grid-cols-3">
          <div>
            <label
              htmlFor="feature"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
            >
              Feature
            </label>
            <input
              type="text"
              value={Feature}
              onChange={handleFeatureChange}
              id="feature"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="feature"
              required
            />
          </div>
          <div>
            <label
              htmlFor="icon"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
            >
              Icon
            </label>
            <input
              type="text"
              value={Icon}
              onChange={handleiconChange}
              id="icon"
              className=" mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              required
            />
            <Link
              href="#"
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              Icons List
            </Link>
          </div>
          {/* <div>
            <label
              htmlFor="enabled"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
            >
              Is Enabled
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="radio"
                id="enabled"
                name="enabled"
                value="true"
                checked={IsEnabled == true}
                onChange={handleEnabledChange}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <label
                htmlFor="enabled"
                className="text-sm text-gray-900 dark:text-white"
              >
                True
              </label>
              <input
                type="radio"
                id="disabled"
                name="enabled"
                value="false"
                checked={IsEnabled == false}
                onChange={handleEnabledChange}
                className="form-radio h-5 w-5 text-red-600"
              />
              <label
                htmlFor="disabled"
                className="text-sm text-gray-900 dark:text-white"
              >
                False
              </label>
            </div>
          </div> */}
          {/* <div>
            <label
              htmlFor="forProjectenabled"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
            >
              Is For Project
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="radio"
                id="forProjectenabled"
                name="forProjectenabled"
                value="true"
                checked={IsForProject == true}
                onChange={handleForProjectChange}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <label
                htmlFor="forProjectenabled"
                className="text-sm text-gray-900 dark:text-white"
              >
               True
              </label>
              <input
                type="radio"
                id="forProjectdisabled"
                name="forProjectdisabled"
                value="false"
                checked={IsForProject == false}
                onChange={handleForProjectChange}
                className="form-radio h-5 w-5 text-red-600"
              />
              <label
                htmlFor="forProjectdisabled"
                className="text-sm text-gray-900 dark:text-white"
              >
                False
              </label>
            </div>
          </div>
          <div>
            <label
              htmlFor="forPropertyenabled"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
            >
              Is For Property
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="radio"
                id="forPropertyenabled"
                name="forPropertyenabled"
                value="true"
                checked={IsForProperty === true}
                onChange={handleForPropertyChange}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <label
                htmlFor="forPropertyenabled"
                className="text-sm text-gray-900 dark:text-white"
              >
               True
              </label>
              <input
                type="radio"
                id="forPropertydisabled"
                name="forPropertydisabled"
                value="false"
                checked={IsForProperty === false}
                onChange={handleForPropertyChange}
                className="form-radio h-5 w-5 text-red-600"
              />
              <label
                htmlFor="forPropertydisabled"
                className="text-sm text-gray-900 dark:text-white"
              >
                False
              </label>
            </div>
          </div> */}
        </div>
      </form>
      <div>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
          onClick={addFeatureData}
        >
          Submit
        </button>
      </div>
    </section>
  );
}

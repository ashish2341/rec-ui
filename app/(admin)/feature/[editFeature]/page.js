"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import useFetch from "@/customHooks/useFetch";
import { API_BASE_URL } from "@/utils/constants";
import { updateFeatures } from "@/api-functions/feature/updateFeature";
import { ImageString  } from "@/api-functions/auth/authAction";
export default function EditFeature({ params }) {
  const [Feature, setFeature] = useState("");
  const [Icon, setIcon] = useState();
  const [IsEnabled, setIsEnabled] = useState();
  const [IsForProject, setIsForProject] = useState();
  const [IsForProperty, setIsForProperty] = useState();
  const imageInputRef = useRef(null);
  const router = useRouter();
  const { data: listEditData, loading, error } = useFetch(`${API_BASE_URL}/feature/feature/${params?.editFeature}`);
 
  const handleFeatureChange = (e) => {
    setFeature(e.target.value);
  };
  const handleiconChange = (e) => {
    setIcon(e.target.value);
  };
  const handleEnabledChange = (e) => {
    setIsEnabled(e.target.value == 'true');
  };
  const handleForProjectChange = (e) => {
    setIsForProject(e.target.value == 'true');
  };
  const handleForPropertyChange = (e) => {
    setIsForProperty(e.target.value == 'true');
  };

  useEffect(() => {
    setFeature(listEditData?.data?.Feature);
    setIcon(listEditData?.data?.Icon ? listEditData?.data?.Icon : '' );
    setIsEnabled(listEditData?.data?.IsEnabled);
    setIsForProject(listEditData?.data?.IsForProject);
    setIsForProperty(listEditData?.data?.IsForProperty);
  }, [listEditData]);

  const updateFeature = async () => {
    if (Feature === "") {
      toast.error("Feature  is required");
      return false;
    }
    if (Icon === "") {
      toast.error("icon Class is required");
      return false;
    }
    if (IsEnabled === "") {
      toast.error("Please select an option");
      return false;
    }

    let payload = {Feature,Icon,IsEnabled}
    let res = await updateFeatures(payload , params?.editFeature)
     if(res?.resData?.success == true){

       toast.success(res?.resData?.message);
       router.push("/feature");
      }else{
        toast.error(res.errMessage);
        return false;
      }
  };
  const  handleImageInputChange = async (event) => {
    const acceptedFileTypes = ["image/jpeg", "image/jpg", "image/png"];

    const file = event.target.files[0]; // Get the first file only
    const formData= new FormData()
    formData.append("profilePic",file)

    // Check file type
    if (!acceptedFileTypes.includes(file.type)) {
        toast.error("Invalid image type. Please upload only JPEG or PNG or JPG files.");
        if (imageInputRef.current) {
            imageInputRef.current.value = "";
        }
    } else{
      let res = await ImageString(formData)
      if(res.successMessage){
       setIcon(res.successMessage.imageUrl);
      }else{
        toast.error(res.errMessage);
        return;
      }
     
    } 
  };
  return (
    <section>
      <h1>Update Feature</h1>
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
        <div className="grid gap-4 mb-4 md:grid-cols-2">
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
          </div>
          <div className="mb-6">
              <label
                htmlFor="imageInput"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Upload Icon
              </label>
              <input
                type="file"
                id="imageInput"
                name="imageInput"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                ref={imageInputRef}
                multiple
                accept=".jpg, .jpeg, .png"
                onChange={handleImageInputChange}
                required
              />
              </div>
          {Icon ? (
            <div className="flex flex-wrap ">
              <div className="mr-4 mb-4  ">
              <div className="ml-2  underline">
              <h3>Selected Icon</h3>
              </div>
                <img
                  src={Icon}
                  alt=""
                  className=" object-cover m-2 mt-5 border border-black rounded-lg "
                  width={200}
                  height={200}
                />
              </div>
            </div>
          ) : null}
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
                htmlFor="forProjectdisabled"
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
                htmlFor="disabled"
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
                checked={IsForProperty == true}
                onChange={handleForPropertyChange}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <label
                htmlFor="forPropertydisabled"
                className="text-sm text-gray-900 dark:text-white"
              >
               True
              </label>
              <input
                type="radio"
                id="forPropertydisabled"
                name="forPropertydisabled"
                value="false"
                checked={IsForProperty == false}
                onChange={handleForPropertyChange}
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
        </div>
      </form>
      <div>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
          onClick={updateFeature}
        >
          Submit
        </button>
      </div>
    </section>
  );
}

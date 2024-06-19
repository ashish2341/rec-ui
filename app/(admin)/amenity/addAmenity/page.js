"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ImageString } from "@/api-functions/auth/authAction";
import { addAmenity } from "@/api-functions/amenity/addAmenity";
import { imgApiUrl } from "@/utils/constants";
import LoaderForMedia from "@/components/common/admin/loaderforMedia/loaderForMedia";

export default function AddAmenity() {
  const [Aminity, setAmenity] = useState("");
  const [Icon, setIcon] = useState("");
  const [IsEnabled, setIsEnabled] = useState();
  const [IsForProject, setIsForProject] = useState();
  const [IsForProperty, setIsForProperty] = useState(null);
  const imageInputRef = useRef(null);
  const [imageLoader, setImageLoader] = useState(false);

  const router = useRouter();
  const handleAmenityChange = (e) => {
    setAmenity(e.target.value);
  };
  const handleiconChange = (e) => {
    setIcon(e.target.value);
  };
  const handleEnabledChange = (e) => {
    setIsEnabled(e.target.value);
  };
  const handleForProjectChange = (e) => {
    setIsForProject(e.target.value == "true");
  };
  const handleForPropertyChange = (e) => {
    setIsForProperty(e.target.value == "true");
  };
  const addAmenityData = async () => {
    if (Aminity === "") {
      toast.error("Amenity  is required");
      return false;
    }
    if (Icon === "") {
      toast.error("icon Class is required");
      return false;
    }
    if (typeof IsForProject !== "boolean") {
      toast.error("Please select an option in project");
      return false;
    }
    if (typeof IsForProperty !== "boolean") {
      toast.error("Please select an option in property");
      return false;
    }

    let payload = { Aminity, Icon, IsForProject, IsForProperty };
    let res = await addAmenity(payload);
    if (res?.resData?.success == true) {
      router.push("/amenity");
      toast.success(res?.resData?.message);
    } else {
      toast.error(res.errMessage);
      return false;
    }
  };
  const handleImageInputChange = async (event) => {
    const acceptedFileTypes = ["image/jpeg", "image/jpg", "image/png"];

    const file = event.target.files[0]; // Get the first file only
    const formData = new FormData();
    formData.append("profilePic", file);

    // Check file type
    if (!acceptedFileTypes.includes(file?.type)) {
      toast.error(
        "Invalid image type. Please upload only JPEG or PNG or JPG files."
      );
      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
    } else {
      setImageLoader(true);
      let res = await ImageString(formData);
      if (res?.successMessage) {
        setIcon(res?.successMessage?.imageUrl);
        setImageLoader(false);
      } else {
        toast.error(res?.errMessage);
        return;
      }
    }
  };
  return (
    <section>
      <h1>Add Amenity</h1>
      <Link href="/amenity">
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
              htmlFor="amenity"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
            >
              Amenity
            </label>
            <input
              type="text"
              value={Aminity}
              onChange={handleAmenityChange}
              id="amenity"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="amenity"
              required
            />
          </div>

          <div>
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
          <div></div>
          {imageLoader && <LoaderForMedia />}
          {Icon ? (
            <div className="flex flex-wrap ">
              <div className="mr-4 mb-4  ">
                <div className="ml-2  underline">
                  <h3>Selected Icon</h3>
                </div>
                <img
                  src={`${imgApiUrl}/${Icon}`}
                  alt=""
                  className=" object-cover m-2 mt-5 border border-black rounded-lg "
                  width={200}
                  height={200}
                />
              </div>
            </div>
          ) : null}
        </div>
      </form>

      {imageLoader === false && (
        <div>
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
            onClick={addAmenityData}
          >
            Submit
          </button>
        </div>
      )}
    </section>
  );
}

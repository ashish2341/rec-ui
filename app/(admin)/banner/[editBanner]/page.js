"use client";
import Link from "next/link";
import { useState, useRef,useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { addAmenity } from "@/api-functions/amenity/addAmenity";
import { ImageString } from "@/api-functions/auth/authAction";
import { addBannerAPi } from "@/api-functions/banner/addBanner";
import { UpdateBannerApi } from "@/api-functions/banner/updateBanner";
import useFetch from "@/customHooks/useFetch";
import { API_BASE_URL } from "@/utils/constants";
export default function UpdateBanner(params) {
  const {
    data: listEditData,
    loading,
    error,
  } = useFetch(
    `${API_BASE_URL}/banner/banner/${params?.params?.editBanner}`
  );
  const [image, setImage] = useState("");
  const [bannerName, setBannerName] = useState("");
  const imageInputRef = useRef(null);

  const router = useRouter();
useEffect(()=>{
  setBannerName(listEditData?.data?.BannerName);
  setImage(listEditData?.data?.Url);
},[listEditData])

  const submitForm = async () => {
    if (bannerName === "") {
      toast.error("Name  is required");
      return false;
    }
    if (image.length == 0) {
      toast.error("Image is required.");
      return false;
    }

    let bannerpayload = { BannerName: bannerName, Url: image };
    let res = await UpdateBannerApi(bannerpayload,params?.params?.editBanner)
     if(res?.resData?.success == true){
       router.push("/banner");
       toast.success(res?.resData?.message);
      }else{
        toast.error(res?.errMessage);
        return false;
      }
  };

  const handleImageInputChange = async (event) => {
    const acceptedFileTypes = ["image/jpeg", "image/jpg", "image/png"];

    const file = event.target.files[0]; // Get the first file only
    const formData = new FormData();
    formData.append("profilePic", file);

    // Check file type
    if (!acceptedFileTypes.includes(file.type)) {
      toast.error(
        "Invalid image type. Please upload only JPEG or PNG or JPG files."
      );
      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
    } else {
      let res = await ImageString(formData);
      if (res.successMessage.success) {
        setImage(res.successMessage.imageUrl);
      } else {
        toast.error(res.errMessage);
        return;
      }
    }
  };

  return (
    <section>
   <h1 className="text-2xl text-black-600 underline mb-3 font-bold">
        Update Your Banner Details
      </h1>
      <Link href="/banner">
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
        <div className="grid gap-4 mb-4 md:grid-cols-1">
          <div>
            <label
              htmlFor="bannerName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
            >
              Name
            </label>
            <input
              type="text"
              value={bannerName}
              onChange={(e) => setBannerName(e.target.value)}
              id="bannerName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Name"
              required
            />
          </div>
          <div>
            <label
              htmlFor="imageInput"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
            >
              Upload Image
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
            {image ? (
              <div className="flex flex-wrap ">
                <div className="mr-4 mb-4  ">
                <div className="ml-2 mt-3 underline font-bold">
                    <h3>Selected Image</h3>
                  </div>
                  <img
                    src={image}
                    alt=""
                    className=" object-cover m-2 mt-5 border border-black rounded-lg "
                    width={200}
                    height={200}
                  />
                </div>
              </div>
            ) : null}
            {/* {image.length > 0 ? (
                <div>
                  <div className="ml-2 mt-3 underline font-bold">
                    <h3>Selected Image</h3>
                  </div>
                  <div className="flex flex-wrap relative mt-3">
                    {image.map((imageUrl, index) => (
                      <div key={index} className="mr-4 mb-4 relative ">
                        <img
                          src={imageUrl}
                          alt=""
                          className="h-20 w-20 object-cover m-2 mt-5 border border-black rounded-lg "
                        />
                        <button
                          className="absolute top-0 right-0 p-1  "
                          onClick={() => removeImage(index)}
                        >
                          <i
                            className="bi bi-x-circle-fill"
                            style={{ color: "red" }}
                          ></i>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null} */}
          </div>
        </div>
      </form>

      <div>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
          onClick={submitForm}
        >
          Submit
        </button>
      </div>
    </section>
  );
}

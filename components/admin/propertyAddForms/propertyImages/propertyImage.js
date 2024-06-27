"use client";
import { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ImageString } from "@/api-functions/auth/authAction";
import LoaderForMedia from "@/components/common/admin/loaderforMedia/loaderForMedia";
import NextButton from "@/components/common/admin/nextButton/nextButton"
import { API_BASE_URL_FOR_MASTER, imgApiUrl } from "@/utils/constants";

export default function PropertyImagesForm({ valueForNext, valueForNextPage }) {
  const [image, setImage] = useState([]);
  const [video, setVideo] = useState([]);
  const imageInputRef = useRef(null);
  const VideoInputRef = useRef(null);
  const [imageLoader, setImageLoader] = useState(false);
  const [videoLoader, setVideoLoader] = useState(false);

  useEffect(() => {
    // Retrieve data from localStorage
    const sessionStoragePropertyData = JSON.parse(
      sessionStorage.getItem("propertyData")
    );
  
    // Update state values if data exists in localStorage
    if (sessionStoragePropertyData) {
      setImage(sessionStoragePropertyData?.Images || "");
      setVideo(sessionStoragePropertyData?.Videos || "");
    }
  }, []);

  const SubmitForm = async () => {
    if (image.length == 0) {
      toast.error("Image is required.");
      return false;
    }

    const mediaData = {
      Images: image,
      Videos: video,
    };

    if (mediaData) {
      const localStorageData = JSON.parse(
        sessionStorage.getItem("propertyData")
      );
      const newProjectData = { ...localStorageData, ...mediaData };
      sessionStorage.setItem("propertyData", JSON.stringify(newProjectData));
      valueForNext(valueForNextPage + 1);
    }
  };

  const handleImageInputChange = async (event) => {
   
    const acceptedFileTypes = ["image/jpeg", "image/jpg", "image/png"];

    const files = Array.from(event.target.files);

    // Check file types
    const invalidFiles = files.filter(
      (file) => !acceptedFileTypes.includes(file.type)
    );

    if (invalidFiles.length > 0) {
      toast.error(
        "Invalid image type. Please upload only JPEG or PNG or JPG files."
      );
      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
    } else {
      setImageLoader(true);
      const imageString = [];

      // Map each file to its corresponding image string asynchronously
      await Promise.all(
        files.map(async (item) => {
          const formData = new FormData();
          formData.append("profilePic", item);

          try {
            const res = await ImageString(formData);
            if (res.successMessage) {
              imageString.push(res.successMessage.imageUrl);
            } else {
              toast.error(res.errMessage);
              setImageLoader(false);
              if (imageInputRef.current) {
                imageInputRef.current.value = "";
              }
              return false;
            }
          } catch (error) {
            console.error("Error occurred while converting image:", error);
            toast.error("Error occurred while converting image.");
            setImageLoader(false);
            if (imageInputRef.current) {
              imageInputRef.current.value = "";
            }
            return false;
          }
        })
      );

      // Filter unique files based on filename
      const uniqueFiles = imageString.filter((url) => {
        const filename = url.substring(
          url.lastIndexOf("-") + 1,
          url.lastIndexOf(".")
        );
        if (image.length > 0) {
          return !image.some((existingFile) => {
            const existingFilename = existingFile.substring(
              url.lastIndexOf("-") + 1,
              existingFile.lastIndexOf(".")
            );

            return filename === existingFilename;
          });
        } else {
          return filename;
        }
      });

      // Update the image state
      if (uniqueFiles) {
        setImage([...image, ...uniqueFiles]);
        setImageLoader(false);
      }

      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
    }
  };

  const handleVideoInputChange = async (event) => {

    const acceptedFileTypes = [
      "video/mp4",
      "video/webm",
      "video/ogg",
      "video/mov",
    ];

    const files = Array.from(event.target.files);
  

    // Check file types
    const invalidFiles = files.filter(
      (file) => !acceptedFileTypes.includes(file.type)
    );

    if (invalidFiles.length > 0) {
      toast.error(
        "please Upload video in .mp4 or .webm or .ogg or mov format."
      );
      if (VideoInputRef.current) {
        VideoInputRef.current.value = "";
      }
    } else {
      setVideoLoader(true);
      const videoString = [];

      // Map each file to its corresponding image string asynchronously
      await Promise.all(
        files.map(async (item) => {
         
          const formData = new FormData();
          formData.append("profilePic", item);

          try {
            const res = await ImageString(formData);
            if (res.successMessage) {
              videoString.push(res.successMessage.imageUrl);
            } else {
              toast.error(res.errMessage);
              setVideoLoader(false);
              if (VideoInputRef.current) {
                VideoInputRef.current.value = "";
              }
              return false;
            }
          } catch (error) {
            toast.error("Error occurred while converting image.");
            setVideoLoader(false);
            if (VideoInputRef.current) {
              VideoInputRef.current.value = "";
            }
            return false;
          }
        })
      );

      // Filter unique files based on filename
      const uniqueFiles = videoString.filter((url) => {
        const filename = url.substring(
          url.lastIndexOf("-") + 1,
          url.lastIndexOf(".")
        );
        if (video.length > 0) {
          return !video.some((existingFile) => {
            const existingFilename = existingFile.substring(
              existingFile.lastIndexOf("-") + 1,
              existingFile.lastIndexOf(".")
            );
            return existingFilename === filename;
          });
        } else {
          return filename;
        }
      });

      // Update the video state
      if (uniqueFiles) {
        setVideo([...video, ...uniqueFiles]);
        setVideoLoader(false);
      }

      if (VideoInputRef.current) {
        VideoInputRef.current.value = "";
      }
    }
  };

  const removeVideo = (index) => {
    const newArray = [...video];
    newArray.splice(index, 1);
    // Step 1: Retrieve the object from local storage

    const storedData = JSON.parse(sessionStorage.getItem("propertyData"));
    if(storedData?.Videos){
      const videoArray = storedData?.Videos;
      if (video?.length == videoArray?.length) {
        if (videoArray.length > 0) {
          // // Step 2: Modify the array by removing the desired item
          videoArray.splice(index, 1);
  
          // // Step 3: Update the object in local storage with the modified array
          const updatedData = { ...storedData, Videos: videoArray };
          sessionStorage.setItem("propertyData", JSON.stringify(updatedData));
        }
      }
    }
   
    setVideo(newArray);

    if (newArray.length == 0) {
      clearVideoInput();
    }
  };
  const clearVideoInput = () => {
    if (VideoInputRef.current) {
      VideoInputRef.current.value = "";
    }
  };
  const removeImage = (index) => {
    const newArray = [...image];
    newArray.splice(index, 1);

    // Step 1: Retrieve the object from local storage

    const storedData = JSON.parse(sessionStorage.getItem("propertyData"));
    if(storedData?.Images){
      const imageArray = storedData?.Images;
      if (image?.length == imageArray?.length) {
        if (imageArray.length > 0) {
          // // Step 2: Modify the array by removing the desired item
          imageArray.splice(index, 1);
          // // Step 3: Update the object in local storage with the modified array
          const updatedData = { ...storedData, Images: imageArray };
          sessionStorage.setItem("propertyData", JSON.stringify(updatedData));
        }
      }
    }
   

    setImage(newArray);
    if (newArray.length == 0) {
      clearImageInput();
    }
  };
  const clearImageInput = () => {
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  return (
    <>
      <div>
       
        <form>
          <div className="grid gap-4 mb-4 sm:grid-cols-1">
            <div className="border border-gray-300 p-3 rounded-lg">
              <h3 className="block mb-2 text-lg font-lg underline font-bold text-gray-500 dark:text-white">
                Property Images
              </h3>
              <label
                htmlFor="imageInput"
                className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white required"
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
              {imageLoader && <LoaderForMedia />}
              {image.length > 0 ? (
                <div>
                  <div className="ml-2 mt-3 underline font-bold">
                    <h3>Selected Image</h3>
                  </div>
                  <div className="flex flex-wrap relative mt-3">
                    {image.map((imageUrl, index) => (
                      <div key={index} className="mr-4 mb-4 relative ">
                        <img
                         src={`${imgApiUrl}/${imageUrl}`}
                          alt=""
                          className="h-20 w-20 object-cover m-2 mt-5 border border-black rounded-lg "
                        />
                        <button
                          className="absolute top-0 right-0 p-1  "
                          type="button"
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
              ) : null}
            </div>

            <div className="border border-gray-300 p-3 rounded-lg">
              <h3 className="block mb-2 text-lg font-lg underline font-bold text-gray-500 dark:text-white">
                Property Videos
              </h3>
              <label
                htmlFor="videoInput"
                className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white"
              >
                Upload Video{" "}
                <span className="text-xs font-bold ml-1 pb-2 text-red-600">
                  (Optional)
                </span>
              </label>
              <input
                type="file"
                id="videoInput"
                name="videoInput"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                ref={VideoInputRef}
                multiple
                accept=".mp4, .webm, .ogg, .mov"
                onChange={handleVideoInputChange}
                required
              />
              {videoLoader && <LoaderForMedia />}
              {video.length > 0 ? (
                <div>
                  <div className="ml-2 mt-3 underline font-bold">
                    <h3>Selected Video</h3>
                  </div>
                  <div className="flex flex-wrap relative mt-3">
                    {video.map((video, index) => (
                      <div key={index} className="mr-4 mb-4 relative">
                        <video
                          controls
                          className="h-48 w-64 border border-black rounded-lg"
                        >
                          <source  src={`${imgApiUrl}/${video}`} type="video/mp4" />
                        </video>
                        <button
                          className="absolute top-0 right-0 p-1"
                          onClick={() => removeVideo(index)}
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
              ) : null}
            </div>
          </div>
        </form>
        {imageLoader === false && videoLoader === false && (
         <NextButton onSubmit={SubmitForm} butonSubName={"add Faq Details"}/>
        )}

      </div>
    </>
  );
}

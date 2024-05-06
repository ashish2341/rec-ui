"use client";
import { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function PropertyImagesForm({
  valueForNextPage,
  mainBackPageValue,
  valueForBack,
}) {
  const [image, setImage] = useState([]);
  const [video, setVideo] = useState([]);
  const [documents, setDocuments] = useState([]);
  const imageInputRef = useRef(null);
  const VideoInputRef = useRef(null);
  const documentInputRef = useRef(null);

  // useEffect(() => {
  //   // Retrieve data from localStorage
  //   const localStorageProjectData = JSON.parse(localStorage.getItem('projectData'));
  //   console.log("localStorageData from localstorage",localStorageProjectData)
  //   // Update state values if data exists in localStorage
  //   if (localStorageProjectData) {
  //     setImage(localStorageProjectData.image || "");
  //     setVideo(localStorageProjectData.video || "");
  //     setDocuments(localStorageProjectData.country || "");

  //   }
  // }, []);

  const SubmitForm = async () => {
    if (image.length == 0) {
      toast.error("Image is required.");
      return false;
    }
    if (video.length == 0) {
      toast.error("Video is required.");
      return false;
    }
    if (documents.length == 0) {
      toast.error("Document is required.");
      return false;
    }
    try {
      // Convert files to Base64
      const imageBase64 = await Promise.all(image.map(fileToBase64));
      const videoBase64 = await Promise.all(video.map(fileToBase64));
      const documentBase64 = await Promise.all(documents.map(fileToBase64));

      // Store Base64 data in local storage
      // const localStorageData =
      //   JSON.parse(localStorage.getItem("projectData")) || {};
      const newProjectData = {
        // ...localStorageData,
        image: imageBase64,
        video: videoBase64,
        documents: documentBase64,
      };
      sessionStorage.setItem("projectData", JSON.stringify(newProjectData));

      // Navigate to the next page
      valueForBack(mainBackPageValue + 1);
    } catch (error) {
      console.error("Error converting files to Base64:", error);
      toast.error("An error occurred while processing the files.");
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

   
  };
  console.log("image List", image);
  const handleImageInputChange = (event) => {
    const acceptedFileTypes = ["image/jpeg", "image/jpg", "image/png"];

    const files = Array.from(event.target.files);
    console.log("image Files", files);

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
      const uniqueFiles = files.filter(
        (file) => !image.find((existingFile) => existingFile.name === file.name)
      );

      setImage([...image, ...uniqueFiles]);
    }
  };

  const handleVideoInputChange = (event) => {
    const acceptedFileTypes = [
      "video/mp4",
      "video/webm",
      "video/ogg",
      "video/mov",
    ];

    const files = Array.from(event.target.files);
    console.log("Video Files", files);

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
      const uniqueFiles = files.filter(
        (file) => !video.find((existingFile) => existingFile.name === file.name)
      );
      setVideo([...video, ...uniqueFiles]);
    }
  };

  const handleDocumentInputChange = (event) => {
    const acceptedFileTypes = [
      "application/pdf",
      "application/doc",
      "application/docx",
    ];

    const files = Array.from(event.target.files);
    console.log("Document Files", files);

    // Check file types
    const invalidFiles = files.filter(
      (file) => !acceptedFileTypes.includes(file.type)
    );

    if (invalidFiles.length > 0) {
      toast.error("Please upload a file in PDF/DOC/DOCX format.");
      if (documentInputRef.current) {
        documentInputRef.current.value = "";
      }
    } else {
      const uniqueFiles = files.filter(
        (file) =>
          !documents.find((existingFile) => existingFile.name === file.name)
      );
      setDocuments([...documents, ...uniqueFiles]);
    }
  };

  const removeVideo = (index) => {
    const newArray = [...video];
    newArray.splice(index, 1);
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
              <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white">
                Project Images
              </h3>
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
              {image.length > 0 ? (
                <div className="flex flex-wrap relative mt-3">
                  {image.map((imageUrl, index) => (
                    <div key={index} className="mr-4 mb-4 relative ">
                      <img
                        src={URL.createObjectURL(imageUrl)}
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
              ) : null}
            </div>

            <div className="border border-gray-300 p-3 rounded-lg">
              <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white">
                Project Videos
              </h3>
              <label
                htmlFor="videoInput"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Upload Video
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
              {video.length > 0 ? (
                <div className="flex flex-wrap relative mt-3">
                  {video.map((video, index) => (
                    <div key={index} className="mr-4 mb-4 relative">
                      <video
                        controls
                        className="h-48 w-64 border border-black rounded-lg"
                      >
                        <source
                          src={URL.createObjectURL(video)}
                          type="video/mp4"
                        />
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
              ) : null}
            </div>

            <div className="border border-gray-300 p-3 rounded-lg">
              <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white">
                Project Documents
              </h3>
              <label
                htmlFor="documentInput"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Upload Document
              </label>
              <input
                type="file"
                id="documentInput"
                name="documentInput"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                ref={documentInputRef}
                multiple
                accept=".pdf,.doc,.docx"
                onChange={handleDocumentInputChange}
                required
              />
            </div>
          </div>
        </form>
        {mainBackPageValue == 0 ? (
          <div>
            <button
              onClick={SubmitForm}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5"
            >
              Save
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
}

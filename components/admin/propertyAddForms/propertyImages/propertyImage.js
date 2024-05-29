"use client";
import { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ImageString } from "@/api-functions/auth/authAction";

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
  const [mediaShowValue, setMediaShowValue] = useState(false);
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
      setImage(sessionStoragePropertyData?.Images || "");
      setVideo(sessionStoragePropertyData?.Videos || "");
      setDocuments(sessionStoragePropertyData?.Documents || "");
    }
  }, []);

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

    const mediaData = {
      Images: image,
      Documents: documents,
      Videos: video,
    };
    console.log("mediaData before set localstorge", mediaData);

    if (mediaData) {
      const localStorageData = JSON.parse(
        sessionStorage.getItem("propertyData")
      );
      const newProjectData = { ...localStorageData, ...mediaData };
      console.log("newProjectData before set localStorage", newProjectData);
      sessionStorage.setItem("propertyData", JSON.stringify(newProjectData));
      valueForBack(mainBackPageValue + 1);
      setBtnShowonInputChange(true);
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
      const imageString = [];

      // Map each file to its corresponding image string asynchronously
      await Promise.all(
        files.map(async (item) => {
          console.log("image File inside map", item);
          const formData = new FormData();
          formData.append("profilePic", item);

          try {
            const res = await ImageString(formData);
            if (res.successMessage) {
              console.log("Image Response", res.successMessage.imageUrl);
              imageString.push(res.successMessage.imageUrl);
            } else {
              toast.error(res.errMessage);
              return false;
            }
          } catch (error) {
            console.error("Error occurred while converting image:", error);
            toast.error("Error occurred while converting image.");
            return false;
          }
        })
      );

      console.log("image files data after convert string", imageString);

      // Filter unique files based on filename
      const uniqueFiles = imageString.filter((url) => {
        const filename = url.substring(
          url.lastIndexOf("-") + 1,
          url.lastIndexOf(".")
        );
        console.log("imageString filename", filename);
        if (image.length > 0) {
          return !image.some((existingFile) => {
            const existingFilename = existingFile.substring(
              url.lastIndexOf("-") + 1,
              existingFile.lastIndexOf(".")
            );
            console.log("image existingFilename", existingFilename);

            return filename === existingFilename;
          });
        } else {
          return filename;
        }
      });

      console.log("uniqueFiles data after convert string", uniqueFiles);

      // Update the image state
      setImage([...image, ...uniqueFiles]);
      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
      if (btnShowonInputChange == true) {
        setBtnShowonInputChange(false);
      }
      if (mainBackPageValue == 1) {
        valueForBack(mainBackPageValue - 1);
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
      const videoString = [];

      // Map each file to its corresponding image string asynchronously
      await Promise.all(
        files.map(async (item) => {
          console.log("image File inside map", item);
          const formData = new FormData();
          formData.append("profilePic", item);

          try {
            const res = await ImageString(formData);
            if (res.successMessage) {
              console.log("Image Response", res.successMessage.imageUrl);
              videoString.push(res.successMessage.imageUrl);
            } else {
              toast.error(res.errMessage);
              return false;
            }
          } catch (error) {
            console.error("Error occurred while converting image:", error);
            toast.error("Error occurred while converting image.");
            return false;
          }
        })
      );

      console.log("videoString files data after convert string", videoString);

      // Filter unique files based on filename
      const uniqueFiles = videoString.filter((url) => {
        const filename = url.substring(
          url.lastIndexOf("-") + 1,
          url.lastIndexOf(".")
        );
        console.log("video filename", filename);
        if (video.length > 0) {
          return !video.some((existingFile) => {
            const existingFilename = existingFile.substring(
              existingFile.lastIndexOf("-") + 1,
              existingFile.lastIndexOf(".")
            );
            console.log("video existingFilename", existingFilename);
            return existingFilename === filename;
          });
        } else {
          return filename;
        }
      });

      console.log("uniqueFiles data after convert string", uniqueFiles);

      // Update the video state

      setVideo([...video, ...uniqueFiles]);
      if (VideoInputRef.current) {
        VideoInputRef.current.value = "";
      }
      if (btnShowonInputChange == true) {
        setBtnShowonInputChange(false);
      }
      if (mainBackPageValue == 1) {
        valueForBack(mainBackPageValue - 1);
      }
    }
  };

  const handleDocumentInputChange = async (event) => {
    const acceptedFileTypes = [
      "application/pdf",
      "application/doc",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const files = Array.from(event.target.files);
    console.log("Document Files", files);
    console.log("files.type", files.type);

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
      const documentString = [];

      // Map each file to its corresponding image string asynchronously
      await Promise.all(
        files.map(async (item) => {
          console.log("image File inside map", item);
          const formData = new FormData();
          formData.append("profilePic", item);

          try {
            const res = await ImageString(formData);
            if (res.successMessage) {
              console.log("Image Response", res.successMessage.imageUrl);
              documentString.push(res.successMessage.imageUrl);
            } else {
              toast.error(res.errMessage);
              return false;
            }
          } catch (error) {
            console.error("Error occurred while converting image:", error);
            toast.error("Error occurred while converting image.");
            return false;
          }
        })
      );

      console.log(
        "documentString files data after convert string",
        documentString
      );

      // Filter unique files based on filename
      const uniqueFiles = documentString.filter((url) => {
        const filename = url.substring(
          url.lastIndexOf("-") + 1,
          url.lastIndexOf(".")
        );
        console.log("documentString filename", filename);
        if (documents.length > 0) {
          return !documents.some((existingFile) => {
            const existingFilename = existingFile.substring(
              existingFile.lastIndexOf("-") + 1,
              existingFile.lastIndexOf(".")
            );
            console.log("documents existingFilename", existingFilename);
            return existingFilename === filename;
          });
        } else {
          return filename;
        }
      });

      console.log("uniqueFiles data after convert string", uniqueFiles);

      // Update the document state
      setDocuments([...documents, ...uniqueFiles]);
      if (documentInputRef.current) {
        documentInputRef.current.value = "";
      }
      if (btnShowonInputChange == true) {
        setBtnShowonInputChange(false);
      }
      if (mainBackPageValue == 1) {
        valueForBack(mainBackPageValue - 1);
      }
    }
  };

  const removeVideo = (index) => {
    const newArray = [...video];
    newArray.splice(index, 1);
    // Step 1: Retrieve the object from local storage

    const storedData = JSON.parse(sessionStorage.getItem("propertyData"));
    const videoArray = storedData?.Videos;
    console.log("videoArray", videoArray);
    if (video.length == videoArray.length) {
      if (videoArray.length > 0) {
        // // Step 2: Modify the array by removing the desired item
        videoArray.splice(index, 1);
        console.log("videoArray after splicce", videoArray);

        // // Step 3: Update the object in local storage with the modified array
        const updatedData = { ...storedData, Videos: videoArray };
        console.log("updatedData", updatedData);
        sessionStorage.setItem("EditPropertyData", JSON.stringify(updatedData));
      }
    }
    setVideo(newArray);

    if (newArray.length == 0) {
      clearVideoInput();
    }
    if (btnShowonInputChange == true) {
      setBtnShowonInputChange(false);
    }
    if (mainBackPageValue == 1) {
      valueForBack(mainBackPageValue - 1);
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
    console.log("newArray", newArray);

    // Step 1: Retrieve the object from local storage

    const storedData = JSON.parse(sessionStorage.getItem("propertyData"));
    const imageArray = storedData?.Images;
    console.log("imageArray", imageArray);
    if (image.length == imageArray.length) {
      console.log("Image session if called");
      if (imageArray.length > 0) {
        // // Step 2: Modify the array by removing the desired item
        imageArray.splice(index, 1);
        console.log("imageArray after splicce", imageArray);
        // // Step 3: Update the object in local storage with the modified array
        const updatedData = { ...storedData, Images: imageArray };
        console.log("updatedData", updatedData);
        sessionStorage.setItem("EditPropertyData", JSON.stringify(updatedData));
      }
    }

    setImage(newArray);
    if (newArray.length == 0) {
      clearImageInput();
    }
    if (btnShowonInputChange == true) {
      setBtnShowonInputChange(false);
    }
    if (mainBackPageValue == 1) {
      valueForBack(mainBackPageValue - 1);
    }
  };
  const clearImageInput = () => {
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const removeDocument = (index) => {
    const newArray = [...documents];
    newArray.splice(index, 1);
    // Step 1: Retrieve the object from local storage

    const storedData = JSON.parse(sessionStorage.getItem("propertyData"));
    const documentsArray = storedData?.Documents;
    console.log("documentsArray", documentsArray);
    if (documents.length == documentsArray.length) {
      if (documentsArray.length > 0) {
        // // Step 2: Modify the array by removing the desired item
        documentsArray.splice(index, 1);
        console.log("documentsArray after splicce", documentsArray);

        // // Step 3: Update the object in local storage with the modified array
        const updatedData = { ...storedData, Documents: documentsArray };
        console.log("updatedData", updatedData);
        sessionStorage.setItem("EditPropertyData", JSON.stringify(updatedData));
      }
    }
    setDocuments(newArray);

    if (newArray.length == 0) {
      cleardocumentInput();
    }
  };
  const cleardocumentInput = () => {
    if (documentInputRef.current) {
      documentInputRef.current.value = "";
    }
    if (btnShowonInputChange == true) {
      setBtnShowonInputChange(false);
    }
    if (mainBackPageValue == 1) {
      valueForBack(mainBackPageValue - 1);
    }
  };

  return (
    <>
      <div>
        {mainBackPageValue == 0 || btnShowonInputChange == false ? (
          <div className="flex justify-end w-1/2 mb-4 relative -top-20 ml-[25rem]">
            <button
              onClick={SubmitForm}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5"
            >
              Save
            </button>
          </div>
        ) : null}
        <form>
          <div className="grid gap-4 mb-4 sm:grid-cols-1">
            <div className="border border-gray-300 p-3 rounded-lg">
              <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white">
                Property Images
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
              ) : null}
            </div>

            <div className="border border-gray-300 p-3 rounded-lg">
              <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white">
                Property Videos
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
                          <source src={video} type="video/mp4" />
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

            <div className="border border-gray-300 p-3 rounded-lg">
              <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white">
                Property Documents
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
              {documents.length > 0 ? (
                <div>
                  <div className="ml-2 mt-3 underline font-bold">
                    <h3>Selected Document</h3>
                  </div>
                  <div className="flex flex-wrap relative mt-3">
                    {documents.map((document, index) => (
                      <div key={index} className="mr-4 mb-4 relative">
                        <iframe
                          title={`Document ${index}`}
                          src={document}
                          className="h-48 w-64 border border-black rounded-lg"
                        />
                        <button
                          className="absolute top-0 right-0 p-1"
                          onClick={() => removeDocument(index)}
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
      </div>
    </>
  );
}

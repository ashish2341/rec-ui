"use client";
import Link from "next/link";
import { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { addAmenity } from "@/api-functions/amenity/addAmenity";
import { ImageString } from "@/api-functions/auth/authAction";

export default function AddBuilder() {
  const initialFieldState = {
    Name: "",
    URL: "",
  };
  const initialBranchState = {
    Phone: "",
    Mobile: "",
    EmailId: "",
    WhatsApp: "",
    Area: "",
    City: "",
    State: "",
    Country: "",
    PinCode: "",
    ContactPerson: [
      {
        Name: "",
        Mobile: "",
        EmailId: "",
        Phone: "",
        Designation: "",
      },
    ],
  };
  const [builderName, setBuilderName] = useState("");
  const [DetailNote, setDescription] = useState("");
  const [verifiedBy, setVerifiedBy] = useState("");
  const [verificationDate, setVerificationDate] = useState("");
  const [socialMediaProfileLinks, setSocialMediaProfileLinks] = useState([
    initialFieldState,
  ]);
  const [BranchesData, setBranchesData] = useState([initialFieldState]);
  const [image, setImage] = useState("");
  const [documents, setDocuments] = useState([]);
  const imageInputRef = useRef(null);
  const documentInputRef = useRef(null);
  const [formData, setFormData] = useState([initialBranchState]);
  const router = useRouter();

  const handleNameChange = (e) => {
    setBuilderName(e.target.value);
  };
  const handledescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // FOr Social media
  const handleSocialProfileChange = (index, fieldName, value) => {
    const updatedFields = [...socialMediaProfileLinks];
    updatedFields[index][fieldName] = value;
    setSocialMediaProfileLinks(updatedFields);
  };

  const handleAddMore = () => {
    let newErrors = [];
    socialMediaProfileLinks.forEach((field, index) => {
      if (!field.Name.trim() || !field.URL.trim()) {
        newErrors.push({ index, message: "profile Name and URL required." });
      }
    });

    if (newErrors.length > 0) {
      toast.error("profile Name and URL required.");
      return false;
    }
    setSocialMediaProfileLinks([...socialMediaProfileLinks, initialFieldState]);
  };

  const handleDelete = (index) => {
    const updatedFields = [...socialMediaProfileLinks];
    updatedFields.splice(index, 1);
    setSocialMediaProfileLinks(updatedFields);
  };

  //For branchOffice

  const addMore = () => {
    setFormData([...formData, initialBranchState]);
  };

  const addMoreContactPerson = (index) => {
    const updatedFormData = [...formData];
    updatedFormData[index].ContactPerson.push({
      Name: "",
      Mobile: "",
      EmailId: "",
      Phone: "",
      Designation: "",
    });
    setFormData(updatedFormData);
  };

  const handleChange = (e, index, field, subIndex) => {
    const { name, value } = e.target;
    const updatedFormData = [...formData];
    if (typeof subIndex === "undefined") {
      updatedFormData[index][name] = value;
    } else {
      updatedFormData[index].ContactPerson[subIndex][name] = value;
    }
    setFormData(updatedFormData);
  };

  const handleDeleteContactPerson = (index, subIndex) => {
    const updatedFormData = [...formData];
    updatedFormData[index].ContactPerson.splice(subIndex, 1);
    setFormData(updatedFormData);
  };

  const handleDeleteBranch = (index, subIndex) => {
    if (typeof subIndex === "undefined") {
      const updatedFormData = [...formData];
      updatedFormData.splice(index, 1);
      setFormData(updatedFormData);
    } else {
      const updatedFormData = [...formData];
      updatedFormData[index].ContactPerson.splice(subIndex, 1);
      setFormData(updatedFormData);
    }
  };

  const submitForm = async () => {
    // if (!builderName || !DetailNote || !verifiedBy || !image ) {
    //   toast.error('Please fill in all required fields.');
    //   return false
    // }
    console.log("handlesocialLinkChange=>", socialMediaProfileLinks);
    const builderDetails = {
      Name: builderName,
      DetailNote: DetailNote,
      verifiedBy: verifiedBy,
      Logo: image,
    };
    console.log("builderDetails", builderDetails);
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
            console.log("imageString existingFile", existingFile);
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
      setImage([...image, ...uniqueFiles]);
      console.log("uniqueFiles data after convert string", uniqueFiles);

      if (imageInputRef.current) {
        imageInputRef.current.value = "";
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
    }
  };
  const removeImage = (index) => {
    const newArray = [...image];
    newArray.splice(index, 1);
    console.log("newArray", newArray);
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

  const removeDocument = (index) => {
    const newArray = [...documents];
    newArray.splice(index, 1);
    setDocuments(newArray);
    if (newArray.length == 0) {
      cleardocumentInput();
    }
  };
  const cleardocumentInput = () => {
    if (documentInputRef.current) {
      documentInputRef.current.value = "";
    }
  };
  return (
    <section>
      <h1 className="text-2xl text-black-600 underline mb-3 font-bold">
        Add Your Builder Details
      </h1>
      <Link href="/builder">
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
          {/* Builder Name */}
          <div>
            <label
              htmlFor="builderName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
            >
              Name
            </label>
            <input
              type="text"
              value={builderName}
              onChange={handleNameChange}
              id="builderName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Builder Name"
              required
            />
          </div>
          <div>
            <label
              htmlFor="DetailNote"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
            >
              Detail Note
            </label>
            <textarea
              type="DetailNote"
              value={DetailNote}
              onChange={handledescriptionChange}
              id="DetailNote"
              className=" mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              required
              rows={4}
            />
          </div>
          <div>
            <label
              htmlFor="verifiedBy"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
            >
              verified By
            </label>
            <input
              type="text"
              value={verifiedBy}
              onChange={(e) => setVerifiedBy(e.target.value)}
              id="verifiedBy"
              className=" mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              required
            />
          </div>
          <div>
            <label
              htmlFor="VerificationDate"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
            >
              Verification Date
            </label>
            <input
              type="date"
              value={verificationDate}
              onChange={(e) => setVerificationDate(e.target.value)}
              id="VerificationDate"
              className=" mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              required
            />
          </div>
          <div className="mb-6">
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
          <div className="mb-6">
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
                  {documents.map((itemUrl, index) => (
                    <div key={index} className="mr-4 mb-4 relative">
                      <iframe
                        title={`Document ${index}`}
                        src={itemUrl}
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
        <div>
          <h2 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white underline">
            Social Profiles
          </h2>
          {socialMediaProfileLinks.length != 0
            ? socialMediaProfileLinks.map((field, index) => (
                <div className="grid gap-4 mb-2 sm:grid-cols-3">
                  <div key={index}>
                    <label
                      htmlFor={`profileName-${index}`}
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
                    >
                      Profile Name
                    </label>
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="text"
                      id={`profileName-${index}`}
                      value={field.Name}
                      onChange={(e) =>
                        handleSocialProfileChange(index, "Name", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`Url-${index}`}
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
                    >
                      Profile Url
                    </label>
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="text"
                      id={`Url-${index}`}
                      value={field.URL}
                      onChange={(e) =>
                        handleSocialProfileChange(index, "URL", e.target.value)
                      }
                    />
                  </div>

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
            Add More Profile
          </button>
        </div>
        <div>
          <div>
            {formData.map((data, index) => (
              <div className="grid gap-4 mb-2 sm:grid-cols-2" key={index}>
                {/* Main BranchOffices fields */}
                <h2 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white underline mt-10">
                  Office Details
                </h2>
                <div></div>
                <div>
                  <label
                    htmlFor={`Phone-${index}`}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
                  >
                    Phone
                  </label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    id={`Phone-${index}`}
                    value={data.Phone}
                    onChange={(e) => handleChange(e, index, "Phone")}
                  />
                </div>

                <div>
                  <label
                    htmlFor={`Mobile-${index}`}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
                  >
                    Mobile
                  </label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    id={`Mobile-${index}`}
                    value={data.Mobile}
                    onChange={(e) => handleChange(e, index, "Mobile")}
                  />
                </div>
                <div>
                  <label
                    htmlFor={`EmailId-${index}`}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
                  >
                    Email ID
                  </label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    id={`EmailId-${index}`}
                    value={data.EmailId}
                    onChange={(e) => handleChange(e, index, "EmailId")}
                  />
                </div>
                <div>
                  <label
                    htmlFor={`WhatsApp-${index}`}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
                  >
                    WhatsApp
                  </label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    id={`WhatsApp-${index}`}
                    value={data.WhatsApp}
                    onChange={(e) => handleChange(e, index, "WhatsApp")}
                  />
                </div>
                <div>
                  <label
                    htmlFor={`Area-${index}`}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
                  >
                    Area
                  </label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    id={`Area-${index}`}
                    value={data.Area}
                    onChange={(e) => handleChange(e, index, "Area")}
                  />
                </div>
                <div>
                  <label
                    htmlFor={`City-${index}`}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
                  >
                    City
                  </label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    id={`City-${index}`}
                    value={data.City}
                    onChange={(e) => handleChange(e, index, "City")}
                  />
                </div>
                <div>
                  <label
                    htmlFor={`State-${index}`}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
                  >
                    State
                  </label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    id={`State-${index}`}
                    value={data.State}
                    onChange={(e) => handleChange(e, index, "State")}
                  />
                </div>
                <div>
                  <label
                    htmlFor={`Country-${index}`}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
                  >
                    Country
                  </label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    id={`Country-${index}`}
                    value={data.Country}
                    onChange={(e) => handleChange(e, index, "Country")}
                  />
                </div>
                <div>
                  <label
                    htmlFor={`PinCode-${index}`}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
                  >
                    Pin Code
                  </label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    id={`PinCode-${index}`}
                    value={data.PinCode}
                    onChange={(e) => handleChange(e, index, "PinCode")}
                  />
                </div>
                <div></div>

                {/* ContactPerson fields */}
                {data.ContactPerson.map((person, subIndex) => (
                  <div
                    className="grid gap-4 mb-2 sm:grid-cols-2"
                    key={`${index}-${subIndex}`}
                  >
                    <div>
                      <h2 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white underline mt-10">
                       Contact Person Details <span>{subIndex >0?(<span>{subIndex}</span>):null}</span>
                      </h2>
                    </div>
                    <div></div>
                    <div>
                      <label
                        htmlFor={`Name-${index}-${subIndex}`}
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
                      >
                        Name
                      </label>
                      <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        id={`Name-${index}-${subIndex}`}
                        value={person.Name}
                        onChange={(e) =>
                          handleChange(e, index, "Name", subIndex)
                        }
                      />
                    </div>

                    <div>
                      <label
                        htmlFor={`Mobile-${index}-${subIndex}`}
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
                      >
                        Mobile
                      </label>
                      <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        id={`Mobile-${index}-${subIndex}`}
                        value={person.Mobile}
                        onChange={(e) =>
                          handleChange(e, index, "Mobile", subIndex)
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={`EmailId-${index}-${subIndex}`}
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
                      >
                        Email ID
                      </label>
                      <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        id={`EmailId-${index}-${subIndex}`}
                        value={person.EmailId}
                        onChange={(e) =>
                          handleChange(e, index, "EmailId", subIndex)
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={`Phone-${index}-${subIndex}`}
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
                      >
                        Phone
                      </label>
                      <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        id={`Phone-${index}-${subIndex}`}
                        value={person.Phone}
                        onChange={(e) =>
                          handleChange(e, index, "Phone", subIndex)
                        }
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={`Designation-${index}-${subIndex}`}
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
                      >
                        Designation
                      </label>
                      <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        id={`Designation-${index}-${subIndex}`}
                        value={person.Designation}
                        onChange={(e) =>
                          handleChange(e, index, "Designation", subIndex)
                        }
                      />
                    </div>
                    <div>
                      <button
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5"
                        onClick={() => addMoreContactPerson(index)}
                      >
                        Add More Contact Person
                      </button>
                      {subIndex > 0 ? (
                        <button
                          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 mt-5"
                          onClick={() =>
                            handleDeleteContactPerson(index, subIndex)
                          }
                        >
                          Delete Contact
                        </button>
                      ) : null}
                    </div>
                    <div>
                      {index > 0 && (
                        <button
                          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 mt-5"
                          onClick={() => handleDeleteBranch(index)}
                        >
                          Delete Branch
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5"
              onClick={addMore}
            >
              Add More Branch
            </button>
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

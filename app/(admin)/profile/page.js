"use client";
import Link from "next/link";
import { GetUserById } from "@/api-functions/user/getUserById";
import { GetBuilderByUserId } from "@/api-functions/user/getBuilderByUserId";
import { UpdateUserApi } from "@/api-functions/user/updateUser";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { addAmenity } from "@/api-functions/amenity/addAmenity";
import { ImageString } from "@/api-functions/auth/authAction";
import Select from "react-select";
import useFetch from "@/customHooks/useFetch";
import {
  API_BASE_URL,
  API_BASE_URL_FOR_MASTER,
  imgApiUrl,
} from "@/utils/constants";
import { UpdateBuilderApi } from "@/api-functions/builder/updateBuilder";
import LoaderForMedia from "@/components/common/admin/loaderforMedia/loaderForMedia";
import CommonLoader from "@/components/common/commonLoader/commonLoader";
import QRCode from "qrcode";
import QRCodeFunction from "@/components/admin/QRscan";


export default function Profile() {
  const roleData = Cookies.get("roles") ?? "";
  const name = Cookies.get("name");
  const loginUserId = Cookies.get("userId");
  const roles = roleData && JSON.parse(roleData);

  const [userData, setUserData] = useState(false);
  const [FirstUserName, setFirstUserName] = useState("");
  const [UserEmailId, setUserEmail] = useState("");
  const [UserMobile, setUserMobile] = useState("");
  const [rerenderforUser, setRerenderforUser] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const userId = Cookies.get("userId");
    
  useEffect(() => {
    getUser();
  }, [rerenderforUser]);

  const getUser = async () => {
    let user = await GetUserById(userId);
    if (user?.resData?.success == true) {
      setUserData(user?.resData?.data);
      setFirstUserName(user?.resData?.data?.FirstName);
      setUserEmail(user?.resData?.data?.EmailId);
      setUserMobile(user?.resData?.data?.Mobile);

      return false;
    } else {
      toast.error(user.errMessage);
      return false;
    }
  };

  const submitUserForm = async () => {
    // Validate Email Address
    if (UserEmailId === "") {
      toast.error("Email address is required");
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(UserEmailId)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    // Check if the field is empty
    if (UserMobile === "") {
      toast.error("Phone number cannot be empty");
      return false;
    }

    // Check if the number has exactly 10 digits
    if (!/^\d{10}$/.test(UserMobile)) {
      toast.error("Phone number must be 10 digits long");
      return false;
    }

    // Check if the number starts with 9, 8, or 7
    if (!/^[789]/.test(UserMobile)) {
      toast.error("Phone number must start with 9, 8, or 7");
      return false;
    }

    setIsLoading(true);
    const UserDetails = {
      FirstName: FirstUserName,
      Mobile: UserMobile,
      EmailId: UserEmailId,
    };
    let updateUserData = await UpdateUserApi(UserDetails, userId);
    if (updateUserData?.resData?.success == true) {
      Cookies.set("name", FirstUserName);
      toast.success(updateUserData?.resData?.message);
      setRerenderforUser((prev) => prev + 1);
      setIsLoading(false);
      return false;
    } else {
      toast.error(updateUserData?.errMessage);
      setIsLoading(false);
      return false;
    }
  };

  const handleUserNameChange = (e) => {
    setFirstUserName(e.target.value);
  };

  const handleUserEmailChange = (e) => {
    setUserEmail(e.target.value);
  };

  const { data: areaData } = useFetch(`${API_BASE_URL_FOR_MASTER}/areas`);
  const defaultOption = [{ value: "", label: "no data found" }];
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
  const [builderData, setBuilderData] = useState("");
  const [builderName, setBuilderName] = useState("");
  const [detailNote, setDetailNote] = useState("");
  const [socialMediaProfileLinks, setSocialMediaProfileLinks] = useState({
    Twitter: "",
    Facebook: "",
    LinkedIn: "",
    Instagram: "",
  });
  const [image, setImage] = useState([]);
  const [documents, setDocuments] = useState([]);
  const imageInputRef = useRef(null);
  const documentInputRef = useRef(null);
  const [BranchesData, setBranchesData] = useState("");
  const [builderMobile, setBuilderMobile] = useState("");
  const [builderEmail, setBuilderEmail] = useState("");
  const [builderWhatsapp, setBuilderWhatsapp] = useState("");
  const [builderArea, setBuilderArea] = useState("");
  const [establishDate, setEstablishDate] = useState("");
  const [description, setDescription] = useState("");
  const [builderId, setBuilderId] = useState("");
  const [builderLogo, setBuilderLogo] = useState("");
  const [imageLoader, setImageLoader] = useState(false);
  const [docLoader, setDocLoader] = useState(false);
  const [logoLoader, setLogoLoader] = useState(false);
  const logoInputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    const getAllBuilders = async () => {
      let builderData = await GetBuilderByUserId();
      if (builderData?.resData?.success == true) {
        setBuilderId(builderData?.resData?.data?._id)
        setBuilderData(builderData?.resData?.data || "");
        setBuilderName(builderData?.resData?.data?.Name || "");
        setDetailNote(builderData?.resData?.data?.DetailNote || "");
        setBuilderMobile(builderData?.resData?.data?.Mobile || "");
        setBuilderEmail(builderData?.resData?.data?.EmailId || "");
        setBuilderWhatsapp(builderData?.resData?.data?.WhatsApp || "");
        setEstablishDate(
          builderData?.resData?.data?.EstablishDate?.slice(0, 10) || ""
        );
        setDescription(builderData?.resData?.data?.Description || "");
        setBuilderLogo(builderData?.resData?.data?.Logo || "");
        setBuilderArea(builderData?.resData?.data?.Area || "");

        setImage(
          builderData?.resData?.data?.Images.map((item) => {
            return item;
          }) || []
        );
        setDocuments(
          builderData?.resData?.data?.Documents.map((item) => {
            return item.URL;
          }) || []
        );
        setBranchesData(
          builderData?.resData?.data
            ? builderData?.resData?.data?.BranchOffices.length > 0
              ? builderData?.resData?.data?.BranchOffices
              : [initialBranchState]
            : [initialBranchState]
        );
        setSocialMediaProfileLinks(
          builderData?.resData?.data?.SocialMediaProfileLinks || {
            Twitter: "",
            Facebook: "",
            LinkedIn: "",
            Instagram: "",
          }
        );
        setIsLoading(false);
        return false;
      } else {
        toast.error(builderData?.errMessage);
        setIsLoading(false);
        return false;
      }
    };
    getAllBuilders();
  }, []);

  const handleNameChange = (e) => {
    setBuilderName(e.target.value);
  };

  // FOr Social media
  const handleSocialProfileChange = (fieldName, value) => {
    setSocialMediaProfileLinks((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  //For branchOffice

  const addMore = () => {
    setBranchesData([...BranchesData, initialBranchState]);
  };

  const addMoreContactPerson = (index) => {
    // const branchValidateforAdd = validateFields();
    // if (branchValidateforAdd) {
    const updatedFormData = [...BranchesData];
    updatedFormData[index].ContactPerson.push({
      Name: "",
      Mobile: "",
      EmailId: "",
      Phone: "",
      Designation: "",
    });
    setBranchesData(updatedFormData);
    // }
  };

  const handleOfficeChange = (e, index, field, subIndex) => {
    const { name, value } = e.target;
    const updatedFormData = [...BranchesData];
    if (typeof subIndex === "undefined") {
      updatedFormData[index][field] = value;
    } else {
      // Check if ContactPerson array exists at the given index
      if (!updatedFormData[index].ContactPerson) {
        updatedFormData[index].ContactPerson = [];
      }
      // Ensure subIndex is within range
      if (
        subIndex >= 0 &&
        subIndex < updatedFormData[index].ContactPerson.length
      ) {
        updatedFormData[index].ContactPerson[subIndex][field] = value;
      }
    }
    setBranchesData(updatedFormData);
  };

  const handleDeleteContactPerson = (index, subIndex) => {
    const updatedFormData = [...BranchesData];
    updatedFormData[index].ContactPerson.splice(subIndex, 1);
    setBranchesData(updatedFormData);
  };

  const handleDeleteBranch = (index) => {
    const updatedFormData = [...BranchesData];
    updatedFormData.splice(index, 1);
    setBranchesData(updatedFormData);
  };

  const handleDocumentInputChange = async (event) => {
    const acceptedFileTypes = [
      "application/pdf",
      "application/doc",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const files = Array.from(event.target.files);

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
      setDocLoader(true);
      const documentString = [];

      // Map each file to its corresponding image string asynchronously
      await Promise.all(
        files.map(async (item) => {
          const formData = new FormData();
          formData.append("profilePic", item);

          try {
            const res = await ImageString(formData);
            if (res?.successMessage) {
              setDocLoader(false);
              documentString.push(res?.successMessage?.imageUrl);
            } else {
              toast.error(res?.errMessage);
              setDocLoader(false);
              return false;
            }
          } catch (error) {
            toast.error("Error occurred while converting image.");
            return false;
          }
        })
      );

      // Filter unique files based on filename
      const uniqueFiles = documentString.filter((url) => {
        const filename = url.substring(
          url.lastIndexOf("-") + 1,
          url.lastIndexOf(".")
        );
        if (documents.length > 0) {
          return !documents.some((existingFile) => {
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

      // Update the document state
      setDocuments([...documents, ...uniqueFiles]);
      if (documentInputRef.current) {
        documentInputRef.current.value = "";
      }
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
            if (res?.successMessage) {
              setImageLoader(false);
              imageString.push(res?.successMessage?.imageUrl);
            } else {
              toast.error(res?.errMessage);
              setImageLoader(false);
              return false;
            }
          } catch (error) {
            toast.error("Error occurred while converting image.");
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
      setImage([...image, ...uniqueFiles]);

      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
    }
  };

  const submitForm = async () => {
    if (image.length == 0) {
      toast.error("Image is required");
      return false;
    }
    if (documents.length == 0) {
      toast.error("Document is required");
      return false;
    }
    setIsLoading(true);
    const builderDetails = {
      Name: builderName,
      SocialMediaProfileLinks: socialMediaProfileLinks,
      DetailNote: detailNote,
      Logo: builderLogo,
      // Area: builderArea?._id,
      Mobile: builderMobile,
      EmailId: builderEmail,
      WhatsApp: builderWhatsapp,
      Description: description,
      EstablishDate: establishDate,
      Images: image,
      Documents: documents.map((URL) => ({ URL })),
      BranchOffices: BranchesData,
    };
    let updatebuilderData = await UpdateBuilderApi(
      builderDetails,
      builderData._id
    );
    if (updatebuilderData?.resData?.success == true) {
      router.push("/profile");
      toast.success(updatebuilderData?.resData?.message);
      setIsLoading(false);
      return false;
    } else {
      toast.error(updatebuilderData?.errMessage);
      setIsLoading(false);
      return false;
    }
    // }
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

  const handleLogoInputChange = async (event) => {
    const acceptedFileTypes = ["image/jpeg", "image/jpg", "image/png"];

    const file = event.target.files[0]; // Get the first file only
    const formData = new FormData();
    formData.append("profilePic", file);

    // Check file type
    if (!acceptedFileTypes.includes(file.type)) {
      toast.error(
        "Invalid logo type. Please upload only JPEG or PNG or JPG files."
      );
      if (logoInputRef.current) {
        logoInputRef.current.value = "";
      }
    } else {
      setLogoLoader(true);
      let res = await ImageString(formData);
      if (res?.successMessage) {
        setLogoLoader(false);
        setBuilderLogo(res?.successMessage?.imageUrl);
      } else {
        toast.error(res?.errMessage);
        setLogoLoader(false);
        return;
      }
    }
  };

  console.log("userID",userId);
  return (
    <>
      {isLoading && <CommonLoader />}
      <section>
        <h1 className="text-2xl text-black-600 underline mb-3 font-bold">
          Update User Details
        </h1>
        <form className="grid gap-4 mb-4 md:grid-cols-3">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
              Name
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={FirstUserName}
              onChange={handleUserNameChange}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
              Email
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={UserEmailId}
              onChange={handleUserEmailChange}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ">
              Mobile
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={UserMobile}
              disabled
            />
          </div>
        </form>
        <button
          onClick={submitUserForm}
          className="text-white mb-4 mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Update
        </button>
        {roles.includes("Developer") ? (
          <div className="flex justify-center">
            <QRCodeFunction id={builderId} />
          </div>
          ): null}
      </section>
      {roles.includes("Developer") && (
        <section>
          <h1 className="text-2xl text-black-600 underline mb-3 font-bold">
            Update Your Builder Details
          </h1>
          {/* <Link href="/builder">
                <div className="mb-5 mt-5">
                  <button
                    className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    type="button"
                  >
                    Back
                  </button>
                </div>
              </Link> */}
          <form className="mb-5">
            <div className="grid gap-4 mb-4 md:grid-cols-2">
              {/* Builder Name */}
              <div>
                <label
                  htmlFor="builderName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
                >
                  Builder Name
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
              {/* <div>
                <label
                  htmlFor="area"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white "
                >
                  Area
                </label>
                {areaData ? (
                  <Select
                    options={areaData.data.map((element) => ({
                      value: element._id,
                      label: element.Area,
                    }))}
                    placeholder="Select One"
                    onChange={(e) =>
                      setBuilderArea({ _id: e.value, Area: e.label })
                    }
                    value={{
                      value: builderArea?._id,
                      label: builderArea?.Area,
                    }}
                  />
                ) : (
                  <Select
                    options={defaultOption.map((element) => ({
                      value: element.value,
                      label: element.label,
                    }))}
                    placeholder="Select One"
                    required={true}
                  />
                )}
              </div> */}
              <div>
                <label
                  htmlFor="builderEmail"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
                >
                  Email
                </label>
                <input
                  type="email"
                  value={builderEmail}
                  onChange={(e) => setBuilderEmail(e.target.value)}
                  id="builderEmail"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Builder Email"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="builderMobile"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
                >
                  Mobile
                </label>
                <input
                  type="number"
                  value={builderMobile}
                  onChange={(e) => setBuilderMobile(e.target.value)}
                  id="builderMobile"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Builder Mobile"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="builderWhatsapp"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
                >
                  Whatsapp
                </label>
                <input
                  type="text"
                  value={builderWhatsapp}
                  onChange={(e) => setBuilderWhatsapp(e.target.value)}
                  id="builderWhatsapp"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Builder Whatsapp"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="establishDate"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
                >
                  Established Date
                </label>
                <input
                  type="date"
                  value={establishDate}
                  onChange={(e) => setEstablishDate(e.target.value)}
                  id="establishDate"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Establish Date"
                  required
                />
              </div>
              <div></div>
              <div>
                <label
                  htmlFor="DetailNote"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white "
                >
                  Detail Note
                </label>
                <textarea
                  type="DetailNote"
                  value={detailNote}
                  onChange={(e) => setDetailNote(e.target.value)}
                  id="DetailNote"
                  className=" mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  rows={4}
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white "
                >
                  Description
                </label>
                <textarea
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  id="description"
                  className=" mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  rows={4}
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="logo"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
                >
                  Upload Logo
                </label>
                <input
                  type="file"
                  id="logo"
                  name="logo"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  ref={logoInputRef}
                  accept=".jpg, .jpeg, .png"
                  onChange={handleLogoInputChange}
                  required
                />
                {logoLoader && <LoaderForMedia />}
                {builderLogo ? (
                  <div className="flex flex-wrap ">
                    <div className="mr-4 mb-1  ">
                      <div className="ml-2 mt-3 underline font-bold">
                        <h3>Selected Logo</h3>
                      </div>
                      <img
                        src={`${imgApiUrl}/${builderLogo}`}
                        alt=""
                        className=" object-cover m-2 mt-5 border border-black rounded-lg "
                        width={100}
                        height={100}
                      />
                    </div>
                  </div>
                ) : null}
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
                            type="button"
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
                {docLoader && <LoaderForMedia />}
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
                            src={`${imgApiUrl}/${itemUrl}`}
                            className="h-48 w-64 border border-black rounded-lg"
                          />
                          <button
                            type="button"
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

              <div></div>
              <h2 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white underline">
                Social Profiles
              </h2>
              <div></div>
              {/* Facebook Url */}
              <div>
                <label
                  htmlFor="facebook"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white "
                >
                  Facebook Url
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  id="facebook"
                  value={socialMediaProfileLinks.Facebook}
                  onChange={(e) =>
                    handleSocialProfileChange("Facebook", e.target.value)
                  }
                />
              </div>
              {/* Twitter Url */}
              <div>
                <label
                  htmlFor="Twitter"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white "
                >
                  Twitter Url
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  id="Twitter"
                  value={socialMediaProfileLinks.Twitter}
                  onChange={(e) =>
                    handleSocialProfileChange("Twitter", e.target.value)
                  }
                />
              </div>
              {/* Instagram Url */}
              <div>
                <label
                  htmlFor="Instagram"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white "
                >
                  Instagram Url
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  id="Instagram"
                  value={socialMediaProfileLinks.Instagram}
                  onChange={(e) =>
                    handleSocialProfileChange("Instagram", e.target.value)
                  }
                />
              </div>
              {/* Linkdin Url */}
              <div>
                <label
                  htmlFor="Linkdin"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white "
                >
                  Linkdin Url
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  id="facebLinkdinook"
                  value={socialMediaProfileLinks.LinkedIn}
                  onChange={(e) =>
                    handleSocialProfileChange("LinkedIn", e.target.value)
                  }
                />
              </div>
            </div>
            <div>
              {BranchesData
                ? BranchesData.map((data, index) => (
                    <div key={index}>
                      {/* Main BranchOffices fields */}
                      <h2 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white underline mt-10">
                        Office Branch Details{" "}
                        <span>
                          {index > 0 ? <span>{index + 1}</span> : null}
                        </span>
                      </h2>
                      <div className="grid gap-4 mb-2 sm:grid-cols-3">
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
                            onChange={(e) =>
                              handleOfficeChange(e, index, "Phone")
                            }
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
                            onChange={(e) =>
                              handleOfficeChange(e, index, "Mobile")
                            }
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
                            type="email"
                            id={`EmailId-${index}`}
                            value={data.EmailId}
                            onChange={(e) =>
                              handleOfficeChange(e, index, "EmailId")
                            }
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
                            onChange={(e) =>
                              handleOfficeChange(e, index, "WhatsApp")
                            }
                          />
                        </div>
                        <div>
                          <label
                            htmlFor={`Area-${index}`}
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white "
                          >
                            Area
                          </label>
                          <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            id={`Area-${index}`}
                            value={data.Area}
                            onChange={(e) =>
                              handleOfficeChange(e, index, "Area")
                            }
                          />
                        </div>
                        <div>
                          <label
                            htmlFor={`City-${index}`}
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white "
                          >
                            City
                          </label>
                          <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            id={`City-${index}`}
                            value={data.City}
                            onChange={(e) =>
                              handleOfficeChange(e, index, "City")
                            }
                          />
                        </div>
                        <div>
                          <label
                            htmlFor={`State-${index}`}
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white "
                          >
                            State
                          </label>
                          <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            id={`State-${index}`}
                            value={data.State}
                            onChange={(e) =>
                              handleOfficeChange(e, index, "State")
                            }
                          />
                        </div>
                        <div>
                          <label
                            htmlFor={`Country-${index}`}
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white "
                          >
                            Country
                          </label>
                          <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            id={`Country-${index}`}
                            value={data.Country}
                            onChange={(e) =>
                              handleOfficeChange(e, index, "Country")
                            }
                          />
                        </div>
                        <div>
                          <label
                            htmlFor={`PinCode-${index}`}
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white "
                          >
                            Pin Code
                          </label>
                          <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            id={`PinCode-${index}`}
                            value={data.PinCode}
                            onChange={(e) =>
                              handleOfficeChange(e, index, "PinCode")
                            }
                          />
                        </div>
                        <div></div>
                      </div>
                      <div className="grid gap-4 mb-2 sm:grid-cols-3">
                        {data.ContactPerson.map((person, subIndex) => (
                          <div key={subIndex}>
                            <div>
                              <h2 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white underline mt-10">
                                Contact Person Details{" "}
                                <span>
                                  {subIndex > 0 ? (
                                    <span>{subIndex + 1}</span>
                                  ) : null}
                                </span>
                              </h2>
                            </div>

                            <div
                              className="grid gap-4 mb-2 sm:grid-cols-2"
                              key={`${index}-${subIndex}`}
                            >
                              <div>
                                <label
                                  htmlFor={`Name-${index}-${subIndex}`}
                                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required "
                                >
                                  Person Name
                                </label>
                                <input
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  type="text"
                                  id={`Name-${index}-${subIndex}`}
                                  value={person.Name}
                                  onChange={(e) =>
                                    handleOfficeChange(
                                      e,
                                      index,
                                      "Name",
                                      subIndex
                                    )
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
                                    handleOfficeChange(
                                      e,
                                      index,
                                      "Mobile",
                                      subIndex
                                    )
                                  }
                                />
                              </div>
                              <div>
                                <label
                                  htmlFor={`EmailId-${index}-${subIndex}`}
                                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
                                >
                                  Email
                                </label>
                                <input
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  type="email"
                                  id={`EmailId-${index}-${subIndex}`}
                                  value={person.EmailId}
                                  onChange={(e) =>
                                    handleOfficeChange(
                                      e,
                                      index,
                                      "EmailId",
                                      subIndex
                                    )
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
                                    handleOfficeChange(
                                      e,
                                      index,
                                      "Phone",
                                      subIndex
                                    )
                                  }
                                />
                              </div>
                              <div>
                                <label
                                  htmlFor={`Designation-${index}-${subIndex}`}
                                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white "
                                >
                                  Designation
                                </label>
                                <input
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  type="text"
                                  id={`Designation-${index}-${subIndex}`}
                                  value={person.Designation}
                                  onChange={(e) =>
                                    handleOfficeChange(
                                      e,
                                      index,
                                      "Designation",
                                      subIndex
                                    )
                                  }
                                />
                              </div>

                              <div>
                                {subIndex == 0 ? (
                                  <button
                                    type="button"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5"
                                    onClick={() => addMoreContactPerson(index)}
                                  >
                                    Add More Contact
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 mt-5"
                                    onClick={() =>
                                      handleDeleteContactPerson(index, subIndex)
                                    }
                                  >
                                    Delete Contact
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      {/* ContactPerson fields */}

                      <div>
                        {index > 0 && (
                          <button
                            type="button"
                            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 mt-5"
                            onClick={() => handleDeleteBranch(index)}
                          >
                            Delete Branch
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                : null}

              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5"
                onClick={addMore}
              >
                Add More Branch
              </button>
            </div>
          </form>

          <div>
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
              onClick={submitForm}
            >
              Update
            </button>
          </div>
        </section>
      )}
    </>
  );
}

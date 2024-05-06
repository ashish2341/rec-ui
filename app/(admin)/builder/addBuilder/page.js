"use client";
import Link from "next/link";
import { useState ,useRef} from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { addAmenity } from "@/api-functions/amenity/addAmenity";
import { ImageString  } from "@/api-functions/auth/authAction";

export default function AddBuilder() {
  const [builderName, setBuilderName] = useState("");
  const [description, setDescription] = useState("");
  const [Address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const imageInputRef = useRef(null);

  const router = useRouter();

  const handleNameChange = (e) => {
    setBuilderName(e.target.value);
  };
  const handledescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const submitForm = async () => {
    if (!builderName || !description || !Address || !image ) {
      toast.error('Please fill in all required fields.');
      return false
    } 
    const builderDetails={
      Name:builderName,
      description:description,
      Address:Address,
      Logo:image

    }
    console.log("builderDetails",builderDetails)
  };
  const  handleImageInputChange = async (event) => {
    const acceptedFileTypes = ["image/jpeg", "image/jpg", "image/png"];

    const file = event.target.files[0]; // Get the first file only
    const formData= new FormData()
    formData.append("profilePic",file)
    console.log("image File", file);

    // Check file type
    if (!acceptedFileTypes.includes(file.type)) {
        toast.error("Invalid image type. Please upload only JPEG or PNG or JPG files.");
        if (imageInputRef.current) {
            imageInputRef.current.value = "";
        }
    } else{
      let res = await ImageString(formData)
      console.log("image resPonse Data=>",res)
      if(res.successMessage){
       // router.push("/dashboard");
       console.log("Image Response",res.successMessage.imageUrl)
        setImage(res.successMessage.imageUrl);
      }else{
        toast.error(res.errMessage);
        return;
      }
     
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
              placeholder="Name"
              required
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
              type="description"
              value={description}
              onChange={handledescriptionChange}
              id="description"
              className=" mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              required
              rows={4}
            />
          </div>
          <div>
            <label
              htmlFor="Address"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
            >
              Address
            </label>
            <input
              type="Address"
              value={Address}
              onChange={handleAddressChange}
              id="Address"
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

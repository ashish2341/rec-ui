"use client";
import Link from "next/link";
import { useState ,useRef} from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { addAmenity } from "@/api-functions/amenity/addAmenity";
import { ImageString  } from "@/api-functions/auth/authAction";
import { AddTestimonial } from "@/api-functions/testimonial/addTestimonial";

export default function AddTestiMonials() {
  const [memberName, setMemberName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const imageInputRef = useRef(null);
  const [designation, setDesignation] = useState("");
  const [IsEnabled, setIsEnabled] = useState(null);

  const router = useRouter();

  const handleNameChange = (e) => {
    setMemberName(e.target.value);
  };
  const handledescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleDesignationChange = (e) => {
    setDesignation(e.target.value);
  };
  const handleEnabledChange = (e) => {
    console.log("isEnabled Value",e.target.value)
    setIsEnabled(e.target.value==="true");
  };

  const submitForm = async () => {
    if (!memberName || !description || !designation || !image || IsEnabled==null ) {
      toast.error('Please fill in all required fields.');
      return false
    } 
    const testiMonialsDetails={
      MemberName:memberName,
      Description:description,
      Designation:designation,
      Image:image,
      IsEnabled:IsEnabled

    }
    console.log("testiMonialsDetails",testiMonialsDetails)
    let res = await AddTestimonial(testiMonialsDetails)
    console.log('AddTestimonialres',res)
     if(res?.resData?.success == true){

       router.push("/testiMonials");
       toast.success(res?.resData?.message);
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
        Add Your Testimonial Details
      </h1>
      <Link href="/testiMonials">
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
              htmlFor="memberName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
            >
              Member Name
            </label>
            <input
              type="text"
              value={memberName}
              onChange={handleNameChange}
              id="memberName"
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
              type="text"
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
              htmlFor="designation"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
            >
              Designation
            </label>
            <input
              type="designation"
              value={designation}
              onChange={handleDesignationChange}
              id="designation"
              className=" mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              required
              
            />
          </div>
          <div>
              <label
                htmlFor="isEnabled"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white "
              >
                Is Enabled
              </label>
              <input
                type="radio"
                name="isEnabled"
                id="isEnabled"
                value="true"
                checked={IsEnabled == true}
                onChange={handleEnabledChange}
              />
              <label htmlFor="isEnabled" className="mr-3">
                Yes
              </label>
              <input
                type="radio"
                name="isEnabled"
                id="isEnabled"
                value="false"
                checked={IsEnabled == false}
                onChange={handleEnabledChange}
                className="form-radio h-5 w-5 text-red-600"
              />
              <label htmlFor="isEnabled">No</label>
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
              <div></div>
          {image ? (
            <div className="flex flex-wrap ">
              <div className="mr-4 mb-4  ">
              <div className="ml-2  underline">
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

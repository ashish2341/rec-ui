"use client";

import { useCallback, useState,useRef } from "react";
import Styles from "./signup.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { ImageString ,SignUpUser } from "@/api-functions/auth/authAction";


export default function Signup() {
  const router = useRouter();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Age, setAge] = useState("");
  const [Gender, setGender] = useState("");
  const [Mobile, setMobile] = useState("");
  const [Area, setArea] = useState("");
  const [City, setCity] = useState("Jaipur");
  const [State, setState] = useState("Rajasthan");
  const [Country, setCountry] = useState("India");
  const [Pincode, setPincode] = useState("");
  const imageInputRef = useRef(null);
  const [image, setImage] = useState("");

  const handleEmail = useCallback((value) => {
    setEmail(() => value.target.value);
  }, []);
  const handlePassword = useCallback((value) => {
    setPassword(() => value.target.value);
  }, []);
  const handleName = useCallback((value) => {
    setName(() => value.target.value);
  }, []);
  const handleLastName = useCallback((value) => {
    setLastName(() => value.target.value);
  }, []);
 
  const handleMobile = useCallback((value) => {
    setMobile(() => value.target.value);
  }, []);
  const handleArea = useCallback((value) => {
    setArea(() => value.target.value);
  }, []);
  const handleCity = useCallback((value) => {
    setCity(() => value.target.value);
  }, []);
  const handleState = useCallback((value) => {
    setState(() => value.target.value);
  }, []);
  const handleCountry = useCallback((value) => {
    setCountry(() => value.target.value);
  }, []);
  const handlePincode = useCallback((value) => {
    setPincode(() => value.target.value);
  }, []);
  const signup = async() => {
    if (Name === "") {
      toast.error("Please enter your first name");
      return false;
    }

    // Validate Last Name
    if (LastName === "") {
      toast.error("Please enter your last name");
      return false;
    }

   
    // Check if the field is empty
    if (Mobile === "") {
      toast.error("Phone number cannot be empty");
      return false;
    }

    // Check if the number has exactly 10 digits
    if (!/^\d{10}$/.test(Mobile)) {
      toast.error("Phone number must be 10 digits long");
      return false;
    }

    // Check if the number starts with 9, 8, or 7
    if (!/^[789]/.test(Mobile)) {
      toast.error("Phone number must start with 9, 8, or 7");
      return false;
    }


    // Area
    if (Area === "") {
      toast.error("Please enter your area");
      return false;
    }

    // City
    if (City === "") {
      toast.error("Please enter your city");
      return false;
    }

    // State
    if (State === "") {
      toast.error("Please enter your state");
      return false;
    }

    // Country
    if (Country === "") {
      toast.error("Please enter your country");
      return false;
    }

    // Pincode
    if (Pincode === "") {
      toast.error("Please enter your pincode");
      return false;
    }
    // Check if the number has exactly 6 digits
    if (!/^\d{6}$/.test(Pincode)) {
      toast.error("Pincode number must be 6 digits long");
      return false;
    }
    // Validate Email Address
    if (Email === "") {
      toast.error("Email address is required");
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(Email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    // Validate Password
    if (Password.length < 5) {
      toast.error("Password must be at least 5 characters long");
      return false;
    }

    let signupData = {
      FirstName:Name,
      LastName:LastName,
      Mobile:Mobile,
      Password:Password,
      Area:Area,
      City:City,
      State:State,
      Country:Country,
      PinCode:Pincode,
      EmailId:Email,
      Role:"Client"
    };
    
    let res = await SignUpUser(signupData)
    console.log("resdata inside page ",res)
    if(res.successMessage){
       router.push("/otpVarify");
      
       toast.success(res.successMessage.message)

    }else{
      toast.error(res.errMessage);
      return;
    }
    console.log(signupData);
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
    <section
      className={` ${Styles.loginMain} bg-gray-50 dark:bg-gray-900 h-100`}
    >
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-2">
        <a
          href="#"
          className={` ${Styles.mt7} flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white`}
        >
          <img
            className="w-24 h-12 mr-2"
            src="/img/recLogoPng2.png"
            alt="logo"
          />
          {/* REC */}
        </a>
        <div
          className={`${Styles.loginBoxMain} bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700`}
        >
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 mb-4">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create your Account
            </h1>

            <form className="mb-5">
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    value={Name}
                    onChange={handleName}
                    id="first_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="John"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="last_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    value={LastName}
                    onChange={handleLastName}
                    id="last_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Doe"
                    required
                  />
                </div>
               
                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone number
                  </label>
                  <input
                    type="tel"
                    value={Mobile}
                    onChange={handleMobile}
                    id="phone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                    required
                  />
                </div>
               
                <div>
                  <label
                    htmlFor="area"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Area
                  </label>
                  <input
                    type="text"
                    value={Area}
                    onChange={handleArea}
                    id="area"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="city"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    value={City}
                    onChange={handleCity}
                    id="city"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="state"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    State
                  </label>
                  <input
                    type="text"
                    value={State}
                    onChange={handleState}
                    id="state"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="country"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    value={Country}
                    onChange={handleCountry}
                    id="country"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="pincode"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Pincode
                  </label>
                  <input
                    type="number"
                    value={Pincode}
                    onChange={handlePincode}
                    id="pincode"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
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
             
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email address
                </label>
                <input
                  type="email"
                  value={Email}
                  onChange={handleEmail}
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="john.doe@company.com"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  value={Password}
                  onChange={handlePassword}
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="•••••••••"
                  required
                />
              </div>

              <button
                onClick={signup}
                type="button"
                className={`${Styles.signInBtn} w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
              >
                Sign up
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-2">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

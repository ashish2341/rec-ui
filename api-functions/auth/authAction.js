import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { API_BASE_URL } from "@/utils/constants";

export const logoutUser = () => {
  Cookies.remove("token");

  //router.push('/login', { scroll: false })
};

export const loginUser = async (payload,setLoading=()=>{}) => {
  setLoading(true);
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const resData = await res.json();
    console.log('resData',resData)

    if (resData?.success) {
      //toast.success("SuccessFully Login");
      Cookies.set("token", resData?.message);
      Cookies.set("userId", resData?.userId);
      Cookies.set("name", resData?.firstName);
      Cookies.set("profilePhoto", resData?.profilePhoto);
      Cookies.set("roles", JSON.stringify(resData?.role));

      setLoading(false);
      return {token:resData?.message};
    } else {
      //toast.error(resData.message);
      setLoading(false);
      return {errMessage:resData.error};
    }
  } catch (error) {
    setLoading(false);
    toast.error("someting went wrong");
    console.log("error message ", error);
  }
};
//For SignUp
export const SignUpUser = async (payload,setLoading=()=>{}) => {
  setLoading(true);
console.log('API_BASE_URL',API_BASE_URL)
  try {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const resData = await res.json();
    console.log('register resData message ',resData.message)
    console.log('register resData',resData)
   

    if (resData?.success) {
      //toast.success("SuccessFully Login");
     
      Cookies.set("token", resData?.message);
      setLoading(false);
      return {successMessage:resData};
    } else {
      //toast.error(resData.message);
      setLoading(false);
      return {errMessage:resData.error};
    }
  } catch (error) {
    setLoading(false);
    toast.error("someting went wrong");
    console.log("error message ", error);
  }
};

//For OTP varify

export const UserOtpVarify = async (payload,setLoading=()=>{}) => {
  setLoading(true);
console.log('API_BASE_URL',API_BASE_URL)
  try {
    const res = await fetch(`${API_BASE_URL}/auth/verifyOtp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const resData = await res.json();
   
    console.log('register resData',resData)
   

    if (resData?.success) {
      //toast.success("SuccessFully Login");
     
      Cookies.set("token", resData?.message);
      setLoading(false);
      return {successMessage:resData};
    } else {
      //toast.error(resData.message);
      setLoading(false);
      return {errMessage:resData.error};
    }
  } catch (error) {
    setLoading(false);
    toast.error("someting went wrong");
    console.log("error message ", error);
  }
};
//FOr forget PassWord
export const UserForgoPassword = async (payload,setLoading=()=>{}) => {
  setLoading(true);
console.log('API_BASE_URL',API_BASE_URL)
  try {
    const res = await fetch(`${API_BASE_URL}/auth/emailSendForForget`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const resData = await res.json();
   
    console.log('Forgot password resData',resData)
   

    if (resData?.success) {
      //toast.success("SuccessFully Login");
     
      //Cookies.set("token", resData?.message);
      setLoading(false);
      return {successMessage:resData};
    } else {
      //toast.error(resData.message);
      setLoading(false);
      return {errMessage:resData.error};
    }
  } catch (error) {
    setLoading(false);
    toast.error("someting went wrong");
    console.log("error message ", error);
  }
};
//For user Picture
export const ImageString = async (payload,setLoading=()=>{}) => {
  setLoading(true);
console.log('API_BASE_URL',API_BASE_URL)
  try {
    const res = await fetch(`${API_BASE_URL}/auth/upload`, {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      body: payload,
    });
    const resData = await res.json();
    console.log('resData',resData)

    if (resData?.success) {
      //toast.success("SuccessFully Login");
      setLoading(false);
      return {successMessage:resData};
    } else {
      //toast.error(resData.message);
      setLoading(false);
      return {errMessage:resData.error};
    }
  } catch (error) {
    setLoading(false);
    toast.error("someting went wrong");
    console.log("error message ", error);
  }
};
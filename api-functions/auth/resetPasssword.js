import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { API_BASE_URL } from "@/utils/constants";

export const logoutUser = () => {
  Cookies.remove("token");

};

export const resetPassword = async (userId,Token,payload,setLoading=()=>{}) => {
    setLoading(true);
  console.log('API_BASE_URL',API_BASE_URL)
    try {
      const res = await fetch(`${API_BASE_URL}/auth/reset/${userId}/${Token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const resData = await res.json();
      console.log('Forgot password resData',resData)
      if (resData?.success) {
        setLoading(false);
        return {resData};
      } else {
        setLoading(false);
        return {errMessage:resData};
      }
    } catch (error) {
      setLoading(false);
      toast.error("someting went wrong");
      console.log("error message ", error);
    }
  };
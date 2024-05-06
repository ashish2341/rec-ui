import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { API_BASE_URL } from "@/utils/constants";

const token = Cookies.get("token");

export const addFeatures = async (payload,setLoading=()=>{}) => {
  setLoading(true);
  try {
    const res = await fetch(`${API_BASE_URL}/feature/addFeature`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    const resData = await res.json();
    console.log('resData',resData)

    if (resData?.success == true) {
      console.log('working')
      setLoading(false);
      return {resData};
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

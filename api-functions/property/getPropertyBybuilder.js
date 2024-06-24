import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { API_BASE_URL, PAGE_LIMIT } from "@/utils/constants";


export const GetPropertyBybuilderApi = async (page,searchData,showValue,type,todayProperty,setLoading=()=>{}) => {
  const token = Cookies.get("token");
  setLoading(true);
  try {
    const res = await fetch(`${API_BASE_URL}/properties/propertyByUserId?page=${page ?page:1}&pageSize=${PAGE_LIMIT}&search=${searchData ?searchData:""}${showValue || showValue===false ?`&isEnable=${showValue}`:""}${type ? `&type=${type}` : ""}${todayProperty ? `&todayPropertyString=${todayProperty}` : ""}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    const resData = await res.json();

    if (resData?.statusCode==200) {
      
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
  }
};

import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { API_BASE_URL, PAGE_LIMIT } from "@/utils/constants";

const token = Cookies.get("token");

export const GetPropertyApi = async (page,searchData,setLoading=()=>{}) => {
  setLoading(true);
  try {
    const res = await fetch(`${API_BASE_URL}/properties/allProperties?page=${page}&pageSize=${PAGE_LIMIT}&search=${searchData}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    const resData = await res.json();
    console.log('resData',resData)

    if (resData?.statusCode==200) {
      
      setLoading(false);
      return {resData};
    } else {
      //toast.error(resData.message);
      setLoading(false);
      return {errMessage:resData.message};
    }
  } catch (error) {
    setLoading(false);
    toast.error("someting went wrong");
    console.log("error message ", error);
  }
};

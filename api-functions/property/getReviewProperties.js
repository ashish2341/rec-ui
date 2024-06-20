import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { API_BASE_URL, PAGE_LIMIT } from "@/utils/constants";


export const GetReviewPropertyApi = async (searchData,setLoading=()=>{}) => {
  const token = Cookies.get("token");
  console.log("GetReviewPropertyApi searchData",searchData)
  setLoading(true);
  try {
    const res = await fetch(`${API_BASE_URL}/properties/reviewProperty${searchData ? `?search=${searchData}`:"" } `, {
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
      return {errMessage:resData.error};
    }
  } catch (error) {
    setLoading(false);
    toast.error("someting went wrong");
    console.log("error message ", error);
  }
};

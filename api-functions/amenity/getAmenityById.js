import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { API_BASE_URL, PAGE_LIMIT } from "@/utils/constants";



export const getAminityById = async (id,setLoading=()=>{}) => {
  const token = Cookies.get("token");
  setLoading(true);
  try {
    const res = await fetch(`${API_BASE_URL}/aminity/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    const resIdData = await res.json();

    if (resIdData?.statusCode==200) {
      
      setLoading(false);
      return {resIdData};
    } else {
      //toast.error(resData.message);
      setLoading(false);
      return {errMessage:resIdData.message};
    }
  } catch (error) {
    setLoading(false);
    toast.error("someting went wrong");
     
  }
};

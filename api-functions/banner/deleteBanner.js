import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { API_BASE_URL } from "@/utils/constants";



export const DeleteBannerApi = async (id,setLoading=()=>{}) => {
  const token = Cookies.get("token");
  setLoading(true);
  console.log(id)
  try {
    const res = await fetch(`${API_BASE_URL}/banner/deleteBanner/${id}`, {
      method: "DELETE",
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

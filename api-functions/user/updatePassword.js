import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { API_BASE_URL } from "@/utils/constants";



export const UpdatePassword = async (id,payload,setLoading=()=>{}) => {
  const token = Cookies.get("token");
  setLoading(true);
  console.log(id)
  try {
    const res = await fetch(`${API_BASE_URL}/user/updatePassword/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    const resData = await res.json();
    console.log('resData',resData)

    if (resData?.statusCode==200) {
      setLoading(false);
      return {resData};
    } else {
      setLoading(false);
      return {errMessage:resData.error};
    }
  } catch (error) {
    setLoading(false);
    toast.error("someting went wrong");
    console.log("error message ", error);
  }
};

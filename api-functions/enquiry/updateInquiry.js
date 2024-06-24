import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { API_BASE_URL } from "@/utils/constants";



export const UpdateInquiryApi = async (addedUSerList,id,setLoading=()=>{}) => {
  const token = Cookies.get("token");
  setLoading(true);
   
  try {
    const res = await fetch(`${API_BASE_URL}/enquiry/updateProjectEnquiry/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(addedUSerList),
    });
    const resData = await res.json();
     

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
     
  }
};

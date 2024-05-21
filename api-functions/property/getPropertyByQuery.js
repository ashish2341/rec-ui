import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { API_BASE_URL, PAGE_LIMIT } from "@/utils/constants";



export const GetPropertyByQueryApi = async (
  payloadData,
  setLoading = () => {}
) => {
  const token = Cookies.get("token");
  
  setLoading(true);
  try {
    const res = await fetch(
      `${API_BASE_URL}/properties/propertyByBudget?${
        payloadData.sortBy != "" ? `sortBy=${payloadData.sortBy}` : ""
      }${
        payloadData.sortBy != ""
          ? `&sortOrder=${payloadData.sortOrder}`
          : ""
      }${
        payloadData.IsFeatured != ""
          ? `IsFeatured=${payloadData.IsFeatured}`
          : ""
      }${
        payloadData.IsExclusive != ""
          ? `IsExclusive=${payloadData.IsExclusive}`
          : ""
      }`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payloadData),
      }
    );
    const resData = await res.json();
    console.log("resData", resData);

    if (resData?.statusCode == 200) {
      setLoading(false);
      return { resData };
    } else {
      //toast.error(resData.message);
      setLoading(false);
      return { errMessage: resData.error };
    }
  } catch (error) {
    setLoading(false);
    toast.error("someting went wrong");
    console.log("error message ", error);
  }
};

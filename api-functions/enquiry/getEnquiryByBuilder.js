import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { API_BASE_URL, PAGE_LIMIT } from "@/utils/constants";



export const GetEnquiryByBuilderApi = async (
  page,
  searchData,
  filterType,
  setLoading = () => {}
) => {
  const token = Cookies.get("token");
  setLoading(true);
  console.log("GetEnquiryApi filterType", filterType);
  try {
    const res = await fetch(
      `${API_BASE_URL}/enquiry/enquiryGetByDeveloperId?page=${page}&pageSize=${PAGE_LIMIT}&search=${
        searchData ? searchData : ""
      }${filterType ? `&filter=${filterType}` : ""}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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
      return { errMessage: resData.message };
    }
  } catch (error) {
    setLoading(false);
    toast.error("someting went wrong");
    console.log("error message ", error);
  }
};

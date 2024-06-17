import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { API_BASE_URL, PAGE_LIMIT } from "@/utils/constants";

export const GetUserApi = async (page, searchData, todayUser,setLoading = () => {}) => {
  const token = Cookies.get("token");
  console.log("token", token);
  setLoading(true);
  try {
    const res = await fetch(
      `${API_BASE_URL}/user/allUser?page=${
        page ? page : 1
      }&pageSize=${PAGE_LIMIT}&search=${searchData ? searchData : ""}${todayUser ? `&todayUser=${todayUser}` : ""}`,
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
      return { errMessage: resData.error };
    }
  } catch (error) {
    setLoading(false);
    toast.error("someting went wrong");
    console.log("error message ", error);
  }
};

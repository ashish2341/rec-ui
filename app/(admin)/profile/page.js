"use client";

import { GetUserById } from "@/api-functions/user/getUserById";
import { UpdateUserApi } from "@/api-functions/user/updateUser";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";

export default function Profile() {
    const [userData, setUserData] = useState(false);
    const [FirstUserName, setFirstUserName] = useState("");
    const [UserEmailId, setUserEmail] = useState("");
    const [UserMobile, setUserMobile] = useState("");

    const userId = Cookies.get("userId")
    useEffect(() => {
      getUser();
    }, []);

    const getUser = async () => {
      let user = await GetUserById(userId);
      if (user?.resData?.success == true) {
        setUserData(user?.resData?.data);
        setFirstUserName(user?.resData?.data?.FirstName);
        setUserEmail(user?.resData?.data?.EmailId);
        setUserMobile(user?.resData?.data?.Mobile);
        toast.success(user?.resData?.message);
        return false;
      } else {
        toast.error(user.errMessage);
        return false;
      }
    };

    const submitUserForm = async () => {
        const UserDetails = {
          FirstName: FirstUserName,
          Mobile: UserMobile,
          EmailId: UserEmailId,
        };
        console.log("UserDetails", UserDetails);
        let updateUserData = await UpdateUserApi(UserDetails,userId);
      if (updateUserData?.resData?.success == true) {
        console.log("updateUserData",updateUserData.resData?.data)
        toast.success(updateUserData?.resData?.message);
        return false;
      } else {
        toast.error(updateUserData?.errMessage);
        return false;
      }
    };

    const handleUserNameChange = (e) => {
      setFirstUserName(e.target.value);
    };

    const handleUserEmailChange = (e) => {
      setUserEmail(e.target.value);
    };

    return (
        <>
        <section>
            <form>
                <input value={FirstUserName} onChange={handleUserNameChange}/>
                <input value={UserEmailId} onChange={handleUserEmailChange}/>
                <input value={UserMobile} disabled/>
            </form>
            <button
                onClick={submitUserForm}
            >
             Update
            </button>
        </section>
        </>
    )
}

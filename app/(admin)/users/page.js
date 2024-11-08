"use client";
import Spinner from "@/components/common/loading";
import Pagination from "@/components/common/pagination";
import Popup from "@/components/common/popup";
import useFetch from "@/customHooks/useFetch";
import { API_BASE_URL } from "@/utils/constants";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { GetUserApi } from "@/api-functions/user/getUsers";
import { GetUserDetailsById } from "@/api-functions/user/getUserDataById";
import { DeleteUser } from "@/api-functions/user/deleteUser";
import { UpdateUserApi } from "@/api-functions/user/updateUser";
import { Button, Modal } from "flowbite-react";
import styles from "./user.module.css";
import { Table, Card } from "flowbite-react";
import { useRouter } from 'next/navigation';
import CommonLoader from "@/components/common/commonLoader/commonLoader";
import SearchInput from "@/components/admin/debounceSearchInput";

export default function Users(params) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [listData, setListData] = useState(false);
  const [listPropData, setListPropData] = useState();
  const [listUserData, setListUserData] = useState();
  const [listEnqData, setListEnqData] = useState();
  const [deleteId, setDeleteId] = useState();
  const [userId, setUserId] = useState();
  const [page, setPage] = useState(1);
  const [searchData, setSearchData] = useState("");
  const [isSubmitClicked,setIsSubmitClicked]=useState(0)
  const [openModal, setOpenModal] = useState(false);
  const [isLoading,setIsLoading]=useState(false)
  const router = useRouter();
  const todayUser = params.searchParams.todayUser;

  useEffect(() => {
    getAllUser();
    
}, [page, searchData ,isSubmitClicked,params]);


  const getAllUser = async () => {
    setIsLoading(true)
    let users = await GetUserApi(page, searchData, todayUser);
    if (users?.resData?.success == true) {
      setListData(users?.resData);
      setIsLoading(false)
      // toast.success(users?.resData?.message);
      return false;
    } else {
      toast.error(users?.errMessage);
      setIsLoading(false)
      return false;
    }
  };

  const getUserDetails = async (specificUserId) => {
    let users = await GetUserDetailsById(specificUserId);
    if (users?.resData?.success == true) {
      setListPropData(users?.resData?.data?.properties);
      setListUserData(users?.resData?.data?.user);
      setListEnqData(users?.resData?.data?.enquiries);
      return false;
    } else {
      toast.error(users?.errMessage);
      return false;
    }
  };

  const searchInputChange = (e) => {
    setSearchData(e);
  };
  const handleDelete = async () => {
    // Perform delete operation
    setIsLoading(true)
    let res = await DeleteUser(deleteId);
    if (res?.resData?.success == true) {
      setIsPopupOpen(false);
      toast.success(res?.resData?.message);
      setIsLoading(false)
      getAllUser();
      setDeleteId("");
      return false;
    } else {
      toast.error(res.errMessage);
      setIsLoading(false)
      return false;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleCancel = () => {
    setDeleteId("");
    setIsPopupOpen(false);
  };
  const deleteUserModal = async (id) => {
    setDeleteId(id);
    setIsPopupOpen(true);
  };
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleCheckboxChange =  (selectedId)  => async (event) => {
    setIsLoading(true)
    const newValue = event.target.checked;
    const payload={
        IsEnquiryVisiable: newValue
      };
      const id=selectedId;
      let res = await UpdateUserApi(
        payload,
        id
      );
      if (res?.resData?.success == true) {
        setIsSubmitClicked( prev => prev +1 )
        setIsLoading(false)
       toast.success("Successfully Done")
        
       
      } else {
        setIsLoading(false)
        toast.error(res.errMessage);
       
        return false;
      }
  };

  const buttonId = (e) => {
      setOpenModal(true);
      setListPropData(null); // Reset property data
  setListUserData(null); // Reset user data
  setListEnqData(null);
      getUserDetails(e.target.value);
  }
  return (
    <section>
      {isLoading && <CommonLoader/>}
      
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <h1 className="text-2xl text-black-600 underline mb-3 font-bold">
          Users
        </h1>
        <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
          <div>
            {/* <Link href={"/testiMonials/addTestiMonials"}>
              {" "}
              <button
                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                type="button"
              >
                + Add User
              </button>
            </Link> */}
          </div>
          
          <div>
            <SearchInput
             setSearchData={searchInputChange} 
             />
             </div>
           
        </div>
        {(listData ? (
          listData?.data?.length > 0 ? (
        <div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                User Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Mobile
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Inquiry Visible
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {listData?.data?.map((item, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <button onClick={buttonId} value={item._id} className={`${styles.nameLink}`}>{item?.FirstName}</button>
                </td>
                <td className="px-6 py-4"> {item?.EmailId}</td>
                <td className="px-6 py-4"> {item?.Mobile}</td>
                <td className="px-6 py-4">
                  {" "}
                  {item?.Roles.map((roleItem, index) => (
                    <p className="flex" key={index}>
                      <span>
                        {roleItem?.Role}
                        {index >= 1 && <span>,</span>}
                      </span>
                    </p>
                  ))}
                </td>
                <td className="px-6 py-4">
                  {" "}
                  <div
                 className="flex items-center justify-center"
                  >
                    <input
                  type="checkbox"
                  checked={item.IsEnquiryVisiable}
                  onChange={handleCheckboxChange(item._id)}
                  className="w-5 h-5 text-blue-600 bg-gray-300 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 focus:outline-none"
                />

                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                   {/* <Link
                      href={`/testiMonials/${item._id}`}
                      className="font-bold text-lg text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      <i className="bi bi-pencil-square"></i>
                    </Link> */}
                    {/* <Link
                      href=""s
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      <i className="bi bi-eye-fill"></i>
                    </Link> */}
                    <Link
                      href="#"
                      className="font-medium text-lg text-red-600 dark:text-red-500 hover:underline"
                    >
                      <i
                        onClick={() => deleteUserModal(item._id)}
                        className="bi bi-trash-fill"
                      ></i>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination data={listData} pageNo={handlePageChange} pageVal={page} />
        </div>
        ) : (
          <h1 className={`bigNotFound`}>No Data Found</h1>
        )
      ) : null)}

      </div>
     
      <Popup
        isOpen={isPopupOpen}
        title="Are you sure you want to delete this Testimonial ?"
        confirmLabel="Yes, I'm sure"
        cancelLabel="No, cancel"
        onConfirm={handleDelete}
        onCancel={handleCancel}
      />
      <Modal dismissible className={`bg-transparent/[.8] ${styles.ModalContent} `} size="7xl" show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Builder Details</Modal.Header>
        <Modal.Body className={`${styles.ModalContent}`}  >
        {listUserData ?
          <div className="flex">
          <div>
           <h1 className="text-md mb-3 ml-2">Builder Info : </h1>
              <div  className="max-w-sm h-80 mr-6 border rounded-md">
                  <div className="overflow-x-auto p-4">
                    <Table className="p-2">
                      <Table.Body className="divide-y">
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {'Email'}
                          </Table.Cell>
                          <Table.Cell>{listUserData ? listUserData.EmailId : null}</Table.Cell>
                        </Table.Row>
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {'Mobile'}
                          </Table.Cell>
                          <Table.Cell>{listUserData ? listUserData.Mobile : null}</Table.Cell>
                        </Table.Row>
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {'Role'}
                          </Table.Cell>
                          <Table.Cell>{listUserData ? listUserData.Roles.map(item => (
                               item.Role==="Developer" ? "Builder" :item.Role
                          )) : null}</Table.Cell>
                        </Table.Row>
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {'Date'}
                          </Table.Cell>
                          <Table.Cell>{listUserData ? formatDate(listUserData.CreatedDate) : null}</Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table>
                  </div>
              </div>
          </div>
          <div className="mr-6">
          <h1 className="text-md mb-3 ml-2">Enquiry Info : </h1>
              <div className="max-w-3xl h-80 overflow-y-auto max-h-80 rounded-md border">
              {listEnqData ? <p className="text-base leading-relaxed pt-4 pl-4 text-gray-500 dark:text-gray-400"><span className="font-medium text-gray-900">Total Enquiries : {" "}</span>{listEnqData.length}</p> : null}
              <div className="overflow-x-auto p-4">
                <Table>
                <Table.Head>
                 <Table.HeadCell>S. No.</Table.HeadCell>
                 <Table.HeadCell>Name</Table.HeadCell>
                 <Table.HeadCell>Type</Table.HeadCell>
                  <Table.HeadCell>Date</Table.HeadCell>
                 </Table.Head>
                  <Table.Body className="divide-y">
                  {listEnqData ?
                    listEnqData.map((item,index) => (
                  <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                     <Table.Cell>{index + 1}</Table.Cell>
                     <Table.Cell>{item.Name}</Table.Cell>
                     <Table.Cell>{item.EnquiryType}</Table.Cell>
                     <Table.Cell>{formatDate(item.CreatedDate)}</Table.Cell>
                    </Table.Row>
                    )) : null}

                  </Table.Body>
                </Table>
              </div>
              </div>
          </div>
          <div>
          <h1 className="text-md mb-3 ml-2">Property Info : </h1>
              <div className="max-w-3xl  overflow-y-auto max-h-80 rounded-md border">
              {listPropData ? <p className="text-base leading-relaxed pt-4 pl-4 text-gray-500 dark:text-gray-400"><span className="font-medium text-gray-900">Total Properties : {" "}</span>{listPropData.length}</p> : null}
              <div className="overflow-x-auto p-4">
                <Table>
                <Table.Head>
                 <Table.HeadCell>S. No.</Table.HeadCell>
                  <Table.HeadCell>Property</Table.HeadCell>
                 </Table.Head>
                  <Table.Body className="divide-y">
                  {listPropData ?
                      listPropData.map((item,index) => (
                  <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                     <Table.Cell>{index + 1}</Table.Cell>
                      <Table.Cell>{item.Title}</Table.Cell>
                    </Table.Row>
                    )) : null}

                  </Table.Body>
                </Table>
              </div>
              </div>
          </div>
          </div>
          : <Spinner /> }

        </Modal.Body>
      </Modal>
    </section>
  );
}

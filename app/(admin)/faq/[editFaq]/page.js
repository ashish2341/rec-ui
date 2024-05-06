"use client";
import Link from "next/link";
import { useState ,useEffect} from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { UpdateFaqApi } from "@/api-functions/faq/updateFaq";
import useFetch from "@/customHooks/useFetch";
import { API_BASE_URL } from "@/utils/constants";


export default function EditFaq(params) {
  console.log("params", params);
  const {
    data: listEditData,
    loading,
    error,
  } = useFetch(
    `${API_BASE_URL}/faq/faq/${params?.params?.editFaq}`
  );
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [IsEnabled, setIsEnabled] = useState();

  const router = useRouter();
  useEffect(() => {
    setQuestion(listEditData?.data?.Subject);
    setAnswer(listEditData?.data?.Answer);
    setIsEnabled(listEditData?.data?.IsEnabled);
  }, [listEditData]);

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };
  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };
 
  const handleEnabledChange = (e) => {
    console.log("isEnabled Value",e.target.value)
    setIsEnabled(e.target.value==="true");
  };

  const submitForm = async () => {
    if (!question || !answer  || IsEnabled==null ) {
      toast.error('Please fill in all required fields.');
      return false
    } 
    const faqDetails={
      Subject:question,
      Answer:answer,
      IsEnabled:IsEnabled

    }
    console.log("faqDetails",faqDetails)
    let res = await UpdateFaqApi(
      faqDetails,
      params?.params?.editFaq
    );
    console.log("UpdateFaqApi res", res);
    if (res?.resData?.success == true) {
      toast.success(res?.resData?.message);
      router.push("/faq");
    } else {
      toast.error(res.errMessage);
      return false;
    }
  };
  
  return (
    <section>
       <h1 className="text-2xl text-black-600 underline mb-3 font-bold">
        Update Your Faq Details
      </h1>
      <Link href="/faq">
        <div className="mb-5 mt-5">
          <button
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            type="button"
          >
            Back
          </button>
        </div>
      </Link>
      <form className="mb-5">
        <div className="grid gap-4 mb-4 md:grid-cols-1">
          <div>
            <label
              htmlFor="question"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
            >
              Question
            </label>
            <input
              type="text"
              value={question}
              onChange={handleQuestionChange}
              id="question"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              required
            />
          </div>
          <div>
            <label
              htmlFor="answer"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
            >
              Answer
            </label>
            <textarea
              type="text"
              value={answer}
              onChange={handleAnswerChange}
              id="answer"
              className=" mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              required
              rows={4}
            />
          </div>
        
          <div>
              <label
                htmlFor="isEnabled"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white required"
              >
                Is Enabled
              </label>
              <input
                type="radio"
                name="isEnabled"
                id="isEnabled"
                value="true"
                required=""
                checked={IsEnabled == true}
                onChange={handleEnabledChange}
              />
              <label htmlFor="isEnabled" className="mr-3">
                Yes
              </label>
              <input
                type="radio"
                name="isEnabled"
                id="isEnabled"
                value="false"
                required=""
                checked={IsEnabled == false}
                onChange={handleEnabledChange}
                 className="form-radio h-5 w-5 text-red-600"
              />
              <label htmlFor="isEnabled">No</label>
            </div>
         
          
        </div>
      </form>

      <div>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
          onClick={submitForm}
        >
          Submit
        </button>
      </div>
    </section>
  );
}

import { Link } from "react-scroll";
import Styles from "./stepper.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
const Stepper = ({ steppers, pageNumber, setPageValue }) => {
  const [activePage, setActivePage] = useState(pageNumber);
  const router = useRouter();
  const returnPreviousPage = (previousPagevalue) => {
    setPageValue(previousPagevalue);
  };
  const returnPage = () => {
    router.push("/property");
  };
  return (
    <>
      <div className={`container mb-3 ${Styles.progressBar} `}>
        <div
          className={`rounded-lg p-4 shadow-lg ${Styles.insideprogressBar}  `}
        >
          <button
            className="text-sm font-medium leading-tight text-grey-600 mb-2 block "
            onClick={returnPage}
          >
            <span>
              <i className="bi bi-arrow-left"></i>
            </span>
            <span>Return to Property</span>
          </button>
          {/* <div className="text-sm font-medium leading-tight text-black-600 mb-2 " >
           
          </div> */}

          <span className="text-2xl font-bold leading-tight text-black-600  ">
            Post Your Property
          </span>
          <div className="w-full bg-blue-400 rounded-full dark:bg-blue-700 mt-2">
            <div
              className="bg-yellow-400 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
              style={{ width: "45%" }}
            >
              45%
            </div>
          </div>
        </div>
      </div>
      <div className={`container mb-3 ${Styles.progressBar} `}>
        <div className={`rounded-lg p-4 shadow-lg `}>
          <ol
            className={`relative text-gray-500 border-l-2  border-blue-500 dark:border-blue-500  dark:text-gray-400 ml-5 mt-3 `}
          >
            {steppers.map((item, index) => (
              <li key={index} className="mb-10 ms-8">
                <span
                  className={`absolute flex items-center justify-center w-8 h-8 bg-#2a4acb-200 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900 ${
                    pageNumber == index + 1
                      ? Styles.actiivetab
                      : pageNumber > index + 1
                      ? Styles.completeTab
                      : "bg-blue-400"
                  } `}
                >
                  {pageNumber == index + 1 ? (
                    <svg
                      width="23"
                      height="100"
                      viewBox="0 0 100 100"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="48"
                        stroke="blue"
                        strokeWidth="4"
                        fill="green"
                      />
                    </svg>
                  ) : pageNumber > index + 1 ? (
                    <svg
                      className={`"w-2 h-2 text-white-500 dark:text-white-400" ${Styles.rightMark}`}
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 16 12"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="3"
                        d="M1 5.917 5.724 10.5 15 1.5"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="23"
                      height="100"
                      viewBox="0 0 100 100"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="48"
                        stroke="blue"
                        strokeWidth="4"
                        fill="grey"
                      />
                    </svg>
                  )}
                </span>
                {pageNumber == index + 1 ? (
                  <h3 className="text-sm italic font-bold leading-tight text-green-600 cursor-pointer">
                    {item.name}{" "}
                    <button className="inline-flex items-center px-1.5 py-0.5 ml-2 border border-transparent text-xs font-medium rounded-full text-white bg-green-600 hover:bg-green-700 focus:outline-none cursor-pointer opacity-75 hover:opacity-100">
                      In Progress
                    </button>
                  </h3>
                ) : item.value < pageNumber ? (
                  <h3
                    onClick={() => returnPreviousPage(item.value)}
                    className="text-sm font-bold leading-tight text-blue-600 cursor-pointer"
                  >
                    {item.name}
                    <button className="inline-flex items-center px-1.5 py-0.5 ml-2 border border-transparent text-xs font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none  cursor-pointer opacity-75 hover:opacity-100">
                      Completed
                    </button>
                  </h3>
                ) : (
                  <h3 className="text-sm font-bold leading-tight text-grey-600 cursor-pointer">
                    {item.name}{" "}
                    <button className="inline-flex items-center px-1.5 py-0.5 ml-2 border border-transparent text-xs font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 focus:outline-none cursor-pointer opacity-75 hover:opacity-100">
                      Pending
                    </button>
                  </h3>
                )}

                {/* <p className="text-sm">Step details here</p> */}
              </li>
            ))}
          </ol>
          <p className="text-sm font-medium leading-tight  ml-4 text-centre ">
            <span className="mr-2 text-grey-600">Need Help?</span>
            <i class="bi bi-telephone-forward-fill mr-2 text-blue-600"></i>
            <span className="underline text-blue-600"> Call 7785548975</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Stepper;

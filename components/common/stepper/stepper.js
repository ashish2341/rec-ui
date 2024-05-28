import Styles from "./stepper.module.css";
const Stepper = ({ steppers, pageNumber }) => {
  return (
    <>
      <ol
        className={`relative text-gray-500 border-l-2  border-blue-500 dark:border-blue-500  dark:text-gray-400 ml-5`}
      >
        {steppers.map((item, index) => (
          <li key={index} className="mb-16 ms-12">
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
                    fill="#2a4acb"
                  />
                </svg>
              ) : pageNumber > index + 1 ? (
                <svg
                  className={`"w-3.5 h-3.5 text-white-500 dark:text-white-400" ${Styles.rightMark}`}
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
                    fill="#e4e5e0"
                  />
                </svg>
              )}
            </span>
            {pageNumber == index + 1 ? (
              <h3 className="text-1xl font-bold leading-tight">{item}</h3>
            ) : (
              <h3 className="font-medium leading-tight">{item}</h3>
            )}

            {/* <p className="text-sm">Step details here</p> */}
          </li>
        ))}
      </ol>
    </>
  );
};

export default Stepper;

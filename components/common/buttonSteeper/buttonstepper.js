export default function ButtonStepper({ forStepper, forpageValue,setPropertyPageValue }) {

  const returnPreviousPage=(currentPage)=>{
    setPropertyPageValue(currentPage)
  }

  return (
    <>
      <ol className="items-center flex justify-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse">
        {forStepper.map((item, index) =>
          forpageValue > item.number ? (
            <li
            onClick={()=>returnPreviousPage(item.number)}
              key={index}
              className={`flex items-center  space-x-2.5 rtl:space-x-reverse text-blue-600 dark:text-blue-500 font-bold cursor-pointer`}
            >
              <span
                className={`flex items-center justify-center w-8 h-8 border-4 rounded-full bg-blue-600 shrink-0 dark:border-blue-500  border-blue-600`}
              >
                <svg
                  className={`w-3 h-3 text-white dark:text-white font-bold text-xl`}
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
              </span>
              <span className="">{item.name}</span>
            </li>
          ) : forpageValue == item.number ? (
            <li
              key={index}
              className={`flex items-center space-x-2.5 rtl:space-x-reverse text-lg font-bold cursor-pointer`}
              style={{ color: "#6592d3" }}
            >
              <span
                className={`flex items-center justify-center w-8 h-8 border-4 rounded-full shrink-0`}
                style={{ borderColor: "#6592d3" }}
              >
                {item.number}
              </span>
              <span>{item.name}</span>
            </li>
          ) : (
            <li
              key={index}
              className={`flex items-center  space-x-2.5 rtl:space-x-reverse text-gray-500 dark:text-gray-400 cursor-pointer`}
            >
              <span
                className={`flex items-center justify-center w-8 h-8 border-4 rounded-full shrink-0  border-gray-500  dark:border-gray-400`}
              >
                {item.number}
              </span>
              <span className="">{item.name}</span>
            </li>
          )
        )}
      </ol>
    </>
  );
}

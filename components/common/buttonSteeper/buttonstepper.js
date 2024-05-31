export default function ButtonStepper({ forStepper, forpageValue }) {
  return (
    <>
      <ol className="items-center flex justify-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse">
        {forStepper.map((item, index) => (
          <li
            key={index}
            className={`flex items-center  space-x-2.5 rtl:space-x-reverse ${
              forpageValue == index + 1
                ? `text-blue-600 dark:text-blue-500 font-bold`
                : `text-gray-500 dark:text-gray-400`
            }`}
          >
            <span
              className={`flex items-center justify-center w-8 h-8 border-4 rounded-full shrink-0  ${
                forpageValue == index + 1
                  ? `dark:border-blue-500  border-blue-600`
                  : `border-gray-500  dark:border-gray-400`
              }`}
            >
             {item.number}
            </span>
            <span className="">
              {item.name}
            </span>
          </li>
        ))}
      </ol>
    </>
  );
}

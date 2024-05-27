export default function ButtonStepper({ forStepper, forpageValue }) {
  return (
    <>
      <ol class="items-center flex justify-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse">
        {forStepper.map((item, index) => (
          <li
            key={index}
            class={`flex items-center  space-x-2.5 rtl:space-x-reverse ${
              forpageValue == index + 1
                ? `text-blue-600 dark:text-blue-500`
                : `text-gray-500 dark:text-gray-400`
            }`}
          >
            <span
              class={`flex items-center justify-center w-12 h-12 border-2 text-2xl  rounded-full shrink-0  ${
                forpageValue == index + 1
                  ? `dark:border-blue-500 border-blue-600`
                  : `border-gray-500 dark:border-gray-400`
              }`}
            >
             {item.number}
            </span>
            <span>
              {item.name}
            </span>
          </li>
        ))}
      </ol>
    </>
  );
}

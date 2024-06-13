export default function NumberInput({labelName,inputValue, dynamicState,}) {

  return (
    <>
      <div>
        <label
          htmlFor={inputValue}
          className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white required"
        >
        {labelName}
        </label>
        <input
          type="number"
          name={inputValue}
          id={inputValue}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required=""
          value={inputValue}
          onChange={(e)=>dynamicState(e.target.value)}
        />
      </div>
    </>
  );
}

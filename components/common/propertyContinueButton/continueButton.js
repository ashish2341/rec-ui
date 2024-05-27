export default function ContinueButton({modalSubmit}){
    return (<>
     <button
        onClick={modalSubmit}
        type="button"
        className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border-2 border-black hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-black dark:hover:text-white dark:hover:bg-gray-700"
        // style={{ backgroundColor: "#6592D3", borderColor: "#6592D3" }}
      >
        Continue <span><i class="bi bi-arrow-right"></i></span>
      </button>
    </>)
}
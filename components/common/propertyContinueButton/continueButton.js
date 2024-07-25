export default function ContinueButton({modalSubmit,butonSubName}){
    return (<>
    
      <div className="grid gap-4 mb-4 sm:grid-cols-1 mt-6">
      <button
        onClick={modalSubmit}
        type="button"
        className="py-2.5 px-5 me-2 ml-10  mb-5 text-sm font-bold text-gray-900 focus:outline-none bg-white rounded-lg border-2 border-black hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-black dark:hover:text-white dark:hover:bg-gray-700"
        style={{ letterSpacing: '0.20em', marginRight: '4rem'  }}
      >
        <span><i className="bi bi-arrow-right text-lg font-bold "></i></span> Save Details
      </button>
      </div>
    </>)
}
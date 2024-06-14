export default function NextButton({onSubmit ,butonSubName}) {
  return (
    <>
      <div className="grid gap-4 mb-4 sm:grid-cols-1">
        <button
          onClick={onSubmit}
          type="button"
          className={`ml-10 mr-10 mb-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5 tracking-wide leading-relaxed `}
          style={{ letterSpacing: '0.20em' }}
        >
          {butonSubName !="save" ? (<span>Next, {butonSubName}</span> ):(<span>Save Details</span>)}
          
        </button>
      </div>
    </>
  );
}

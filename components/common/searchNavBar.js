import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();
  console.log("router",router)

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/propertyList/property?searchData=${query}`);
  };

  useEffect(() => {}, [query]);

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={`block p-1.5 w-30 text-sm text-gray-900 bg-gray-50 rounded-md border-gray-50 border-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500`}
      />
      <button 
        type="submit"                           
        className={`absolute top-0 end-0 text-white bg-blue-700 h-31 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-1.5 py-1.5  mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}
      >
        <i className="bi bi-search"></i>
      </button>
    </form>
  );
};

export default SearchBar;


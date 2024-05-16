import React, { useState } from 'react';
import { API_BASE_URL_FOR_MASTER } from "@/utils/constants";
import useFetch from "@/customHooks/useFetch";
import Link from 'next/link';
import styles from "./page.module.css"

const MegaDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: areaData } = useFetch(`${API_BASE_URL_FOR_MASTER}/areas`);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Function to handle link click
  const handleLinkClick = () => {
    setIsOpen(false); // Close the dropdown when link is clicked
  };

  return (
    <div className="mega-dropdown">
      <button 
        id="dropdownNavbarLinkLocation" 
        onClick={toggleDropdown}
        data-dropdown-toggle="dropdownNavbarLocation" 
        className="flex items-center justify-between w-full py-2 mt-3 text-sm text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
      >
        Location 
        <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
        </svg>
      </button>
      <div 
        id="dropdownNavbarLocation" 
        className={`${styles.listBoardBack} z-10 ${isOpen ? 'block' : 'hidden'} font-normal bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
      >
        <ul className={`${styles.listBoard} p-2  text-sm text-gray-700 dark:text-gray-400`} aria-labelledby="dropdownLargeButton">
          {areaData ?
            areaData?.data?.map((location, index) => (  
              <li key={index}>
                <Link 
                  href={`/propertyList/property?areaId=${location._id}&areaLabel=${location.Area}`} 
                  className="grid px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  passHref
                  onClick={handleLinkClick} // Add onClick handler to close dropdown
                >
                  {location.Area}
                </Link>
              </li>
            )) : null}
        </ul>
      </div>
    </div>
  );
}

export default MegaDropdown;

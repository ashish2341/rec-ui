import React from 'react';

const DropdownComponent = ({ id, labelAttribute, data }) => {
    console.log("Data",data)
    console.log("id",id)
    console.log("labelAttribute",labelAttribute)
  return (
    <li className="me-2 mt-3">
      <button
        id={`dropdown${id}Button`}
        data-dropdown-toggle={`dropdown${id}`}
        data-dropdown-delay="500"
        data-dropdown-trigger="hover"
        className="text-black bg-white border border-black hover:bg-white-800 focus:ring-4 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-white-600 dark:hover:bg-white-700 dark:focus:ring-white-800"
        type="button"
      >
        {labelAttribute}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <div
        id={`dropdown${id}`}
        className="z-10 hidden bg-gray-200 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby={`dropdown${id}Button`}
        >
          {data ? (
            data.map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-white dark:hover:bg-gray-200 dark:hover:text-white"
                >
                  {item[labelAttribute]}
                </a>
              </li>
            ))
          ) : (
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-white dark:hover:bg-gray-200 dark:hover:text-white"
              >
                No Data Found
              </a>
            </li>
          )}
        </ul>
      </div>
    </li>
  );
};

export default DropdownComponent;

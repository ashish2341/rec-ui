import styles from "../../../app/(user)/propertyList/[propertyListId]/propertyList.module.css";
import { GetPropertyApi } from "@/api-functions/property/getProperty";
import { useState } from "react";
import { toast } from "react-toastify";
const SortByButton = ({ arrayItem, updatePayload }) => {

  const propertiesBySort = (itemkey, sortItem1, sortitem2) => {
    const newPayload = {
      sortBy:
        itemkey === "Low to High"
          ? sortItem1
          : itemkey === "High to Low"
          ? sortItem1
          : itemkey === "Latest"
          ? sortItem1
          : "",
      sortOrder:
        itemkey === "Low to High"
          ? sortitem2
          : itemkey === "High to Low"
          ? sortitem2
          : itemkey === "Latest"
          ? sortitem2
          : "",
      IsFeatured: itemkey === "Featured" ? sortItem1 : "",
      IsExclusive: itemkey === "Popular" ? sortItem1 : "",
    };

    // Call the function passed from the parent to update the state
    updatePayload(newPayload);
  };

  return (
    <>
      <div>
        <li className="me-2 mt-2 list-none">
          <button
            id="dropdownSortByButton"
            data-dropdown-toggle="dropdownSortBy"
            data-dropdown-delay="500"
            data-dropdown-trigger="hover"
            className={`text-black bg-lightgrey border border-black hover:bg-lightgrey-800 focus:ring-4 focus:outline-none focus:ring-lightgrey-300 font-medium rounded-lg text-sm px-2 py-2 text-center inline-flex items-center dark:bg-lightgrey-600 dark:hover:bg-lightgrey-700 dark:focus:ring-lightgrey-800 ${styles.GeneralDetailsSortDropdown}`}
            type="button"
          >
            Sort By
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
            id="dropdownSortBy"
            className="z-10 hidden bg-gray-200 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownSortByButton"
            >{arrayItem.length > 0 ?(arrayItem?.map((item,index) => (
                <li key={index}>
                  <p
                    href=""
                    className="flex items-center p-2 ml-2 mr-2 rounded hover:bg-white dark:hover:bg-gray-600 cursor-pointer"
                    onClick={() =>
                      propertiesBySort(
                        item.itemName,
                        item.urlItem1,
                        item.urlItem2
                      )
                    }
                  >
                    {item.itemName}
                  </p>
                </li>
              ))):(null)}
              
            </ul>
          </div>
        </li>
      </div>
    </>
  );
};

export default SortByButton;

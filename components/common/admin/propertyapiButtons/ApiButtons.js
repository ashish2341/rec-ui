import React from "react";
import Styles from "../admin.common.module.css";

function RenderButtons({
  newid,
  apiId,
  storeNameforId,
  apiValue,
  storeNameforValue,
  setStateByDynamic,
}) {
  const handleClick = () => {
    setStateByDynamic({
      [storeNameforId]: apiId,
      [storeNameforValue]: apiValue,
    });
  };

  return (
    <>
      <button
        key={apiId}
        onClick={handleClick}
        type="button"
        className={`rounded-lg text-black font-medium px-6 py-4 bg-[#ffffff] border border-black ${
          Styles.bigInactiveButton
        }
         ${newid === apiId && Styles.bigactiveButton}`}
      >
        {apiValue}
      </button>
    </>
  );
}

export default function ApiButtons({
  itemArray,
  stateItem,
  labelName,
  ValueName,
  changeState,
}) {
  return (
    <>
      <div className="mb-2">
        <label className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white required">
          {labelName}
        </label>
        {itemArray?.data?.length > 0 ? (
          <div className={`flex flex-wrap space-x-2 mt-4`}>
            {/* <div className={`grid grid-cols-5 gap-2 `}> */}
            {itemArray?.data?.map((item , index) => (
              <div key={index}>
                <RenderButtons
                  newid={stateItem?._id}
                  apiId={item?._id}
                  storeNameforId={"_id"}
                  apiValue={item?.[ValueName]}
                  storeNameforValue={ValueName}
                  setStateByDynamic={changeState}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap space-x-2">
            <h1 className={`${Styles.noDataHead}`}>No Data Found</h1>
          </div>
        )}
      </div>
    </>
  );
}

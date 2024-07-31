import React, { useState } from "react";
import Styles from "../admin.common.module.css";
import Popup from "@/components/common/popup";
import EditedTag from "../editedTag/editedTag";
function RenderButtons({
  newid,
  apiId,
  storeNameforId,
  apiValue,
  storeNameforValue,
  setStateByDynamic,
  dataStoreState
}) {
const [isPopupOpen, setIsPopupOpen] = useState(false);
  const handleClick = () => {
 
    if(dataStoreState?.Name){
      setIsPopupOpen(true)
    }else{
      setStateByDynamic({
        [storeNameforId]: apiId,
        [storeNameforValue]: apiValue,
      });
    }
   
  };
const storeData=()=>{
  setStateByDynamic({
    [storeNameforId]: apiId,
    [storeNameforValue]: apiValue,
  });
  setIsPopupOpen(false)
}

const handleCancel=()=>{
  setIsPopupOpen(false)
}
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
      <Popup
        isOpen={isPopupOpen}
        title="Are you sure want to change the Property SubType ?"
        confirmLabel="Yes, I'm sure"
        cancelLabel="No, cancel"
        onConfirm={storeData}
        onCancel={handleCancel}
      />
    </>
  );
}

export default function ApiButtons({
  itemArray,
  stateItem,
  labelName,
  ValueName,
  changeState,
  changedKeyArray,
  showPageName,
  currentPageName,
  specifiedKey,
}) {
  return (
    <>
      <div className="mb-2">
        <label className="block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white required">
          {labelName}
          {changedKeyArray?.includes(specifiedKey) &&
            showPageName === currentPageName && <EditedTag />}
        </label>
        {itemArray?.data?.length > 0 ? (
          <div className={`flex flex-wrap  mt-4`}>
            {/* <div className={`grid grid-cols-5 gap-2 `}> */}
            {itemArray?.data?.map((item, index) => (
              <div className="mr-2 mb-2" key={index}>
                <RenderButtons
                  newid={stateItem?._id}
                  apiId={item?._id}
                  storeNameforId={"_id"}
                  apiValue={item?.[ValueName]}
                  storeNameforValue={ValueName}
                  setStateByDynamic={changeState}
                  dataStoreState={stateItem}
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

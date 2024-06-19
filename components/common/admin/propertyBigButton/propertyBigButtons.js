import Styles from "../admin.common.module.css";
import EditedTag from "../editedTag/editedTag";

function RenderBigButtons({ buttonArray, activeButtonvalue, setStateDynamic }) {
  const handelChangeValue = (value) => {
    setStateDynamic(value);
  };
  return (
    <>
      {buttonArray.length > 0 ? (
        <div className={`flex flex-wrap space-x-2 mt-4`}>
          {buttonArray.map((item, index) => (
            <button
              key={index}
              onClick={() => handelChangeValue(item)}
              type="button"
              className={`rounded-lg text-black font-medium px-6 py-4 bg-[#fffcf2] border border-black mb-4 ${
                Styles.bigInactiveButton
              }
             ${activeButtonvalue === item && Styles.bigactiveButton} `}
            >
              {item === true ? "Yes" : item === false ? "No" : item}
            </button>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap space-x-2">
          <h1 className={`${Styles.noDataHead}`}>No Data Found</h1>
        </div>
      )}
    </>
  );
}
export default function PropertyBigButtons({
  itemArray,
  activeBtnvalue,
  changeState,
  labelName,
  forRequired,
  changedKeyArray,
  showPageName,
  currentPageName,
  specifiedKey,
}) {
  return (
    <>
      <div className="mb-2">
        <label
          htmlFor="PropertyType"
          className={`block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white ${
            forRequired == false ? "" : "required"
          } `}
        >
         
          {labelName}
          {changedKeyArray?.includes(specifiedKey) &&
            showPageName === currentPageName && <EditedTag />}
        </label>
        <RenderBigButtons
          buttonArray={itemArray}
          activeButtonvalue={activeBtnvalue}
          setStateDynamic={changeState}
        />
      </div>
    </>
  );
}

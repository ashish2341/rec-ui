import Styles from "../admin.common.module.css";

function RenderBigButtons({ buttonArray, activeButtonvalue, setStateDynamic}) {
  const handelChangeValue = (value) => {
    setStateDynamic(value);
  };
  return (
    <>
      <div className={`flex flex-wrap space-x-2 mt-4`}>
        {buttonArray.map((item ,index) => (
          <button
          key={index}
            onClick={() => handelChangeValue(item)}
            type="button"
            className={`rounded-lg text-black font-medium px-6 py-4 bg-[#fffcf2] border border-black mb-4 ${
              Styles.bigInactiveButton
            }
             ${activeButtonvalue == item && Styles.bigactiveButton} `}
          >
            {item === true ? "Yes" : item === false ? "No" : item}
          </button>
        ))}
      </div>
    </>
  );
}
export default function PropertyBigButtons({itemArray, activeBtnvalue, changeState,labelName,forRequired}) {
  console.log("activeBtnvalue",activeBtnvalue)
  return (
    <>
      <div className="mb-2">
        <label
          htmlFor="PropertyType"
          className={`block mb-2 text-md font-medium font-bold text-gray-500 dark:text-white ${forRequired==false ? "":"required"} `}
        >
         {labelName}
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

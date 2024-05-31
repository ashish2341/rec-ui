import Styles from "../admin.common.module.css";

const PropertyBigButtons = ({
    buttonArray,
  activeButtonvalue,
  handelValue,
}) => {
  const handelChangeValue = (value) => {
    handelValue(value);
  };
  return (
    <>
      <div className={`flex flex-wrap space-x-2 mt-4`}>
        {buttonArray.map((item) => (
          <button
            onClick={() => handelChangeValue(item)}
            type="button"
            className={`rounded-lg text-black font-bold px-6 py-4 bg-[#ffffff] border border-black 
             ${activeButtonvalue == item && Styles.bigactiveButton} `}
          >
            {item}
          </button>
        ))}
      </div>
    </>
  );
};
export default PropertyBigButtons;

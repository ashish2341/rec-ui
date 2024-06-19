import { imgApiUrl } from "@/utils/constants";
import Styles from "../admin.common.module.css";
import EditedTag from "../editedTag/editedTag";

export default function ArrayButtons({
  itemArray,
  selectItems,
  labelName,
  buttonName,
  setValueinState,
  changedKeyArray,
  showPageName,
  currentPageName,
  specifiedKey,
}) {
  const handleValueChange = (itemId) => {
    setValueinState((prev) => {
      const isSelected = prev.some((selectedItemId) =>
        selectedItemId._id
          ? selectedItemId._id === itemId
          : selectedItemId === itemId
      );
      if (isSelected) {
        return prev.filter((selectedItemId) =>
          selectedItemId._id
            ? selectedItemId._id !== itemId
            : selectedItemId !== itemId
        );
      } else {
        return [...prev, itemId];
      }
    });
  };
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {/* Amenity Box */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="block mb-2 text-xl font-lg underline font-bold text-gray-500 dark:text-white">
            {labelName}{" "}
            {changedKeyArray?.includes(specifiedKey) &&
              showPageName === currentPageName && <EditedTag />}
          </h2>
          {itemArray && selectItems ? (
            <div>
              {itemArray?.data?.length > 0 ? (
                <div className={`grid grid-cols-5 gap-2`}>
                  {itemArray?.data.map((item) => (
                    <button
                      key={item?._id}
                      type="button"
                      onClick={() => handleValueChange(item?._id)}
                      className={`rounded-lg mt-4 text-black font-medium px-6 py-4 bg-[#ffffff] border border-black ${
                        Styles.bigInactiveButton
                      }
                       ${
                         selectItems?.some((selectedItemId) =>
                           selectedItemId._id
                             ? selectedItemId._id === item?._id
                             : selectedItemId === item?._id
                         ) && Styles.bigactiveButton
                       }`}
                    >
                      <img
                        className={`${Styles.arrayButtonIconBox}`}
                        src={
                          !item.Icon.includes("https")
                            ? `${imgApiUrl}/${item.Icon}`
                            : item.Icon
                        }
                        width="22"
                        height="22"
                      />
                      {item?.[buttonName]}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap space-x-2">
                  <h1 className={`${Styles.noDataHead}`}>No Data Found</h1>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

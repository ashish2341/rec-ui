import { useState } from "react";
import styles from "../common/css/readmore.module.css"
const TextComponent = ({ text }) => {
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const renderText = () => {
    const maxCharsPerLine = 150; // Adjust as needed
    const lines = text.match(new RegExp(`.{1,${maxCharsPerLine}}`, "g"));  
    const visibleLines = showAll ? lines : lines?.slice(0, 4);
    return (
      <>
        {visibleLines?.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
        {!showAll && lines?.length > 4 && (
          <button className="text-blue-500 hover:underline text-sm" type="button" onClick={toggleShowAll}>Read More</button>
        )}
        {showAll && <button className="text-blue-500 hover:underline text-sm" type="button"onClick={toggleShowAll}>Show Less</button>}
      </>
    );
  };

  return <div>{renderText()}</div>;
};

export default TextComponent;
import React, { useState } from 'react';
import styles from "../common/css/readmore.module.css"
const ReadMore = ({ text, maxLength }) => {
  const [isTruncated, setIsTruncated] = useState(true);

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  return (
    <div className='flex'>
      {isTruncated ? (
        <div className={`whitespace-pre-line text-sm ${styles.textCapitalized}`}>
          {text.slice(0, maxLength)}
          {text.length > maxLength && <span>...</span>}
        </div>
      ) : (
        <div className={`whitespace-pre-line text-sm ${styles.textCapitalized}`}>{text}
        </div>
      )}
      {text.length > maxLength && (
        <button
          onClick={toggleTruncate}
          className="text-blue-500 hover:underline text-sm"
          style={{ width: !isTruncated ? '8rem' : 'auto' }}
        >
          {isTruncated ? 'Read more' : 'Show less'}
        </button>
      )}
    </div>
  );
};

export default ReadMore;

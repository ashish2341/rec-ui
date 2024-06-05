import { toast } from "react-toastify";
export const AbbreviatedNumberParser = (str) => {
  const parseSegment = (segment) => {
    const lakhRegex = /(\d+)\s*L/;
    const croreRegex = /(\d+)\s*Cr/;

    let values = []; // Array to store parsed values for each segment

    segment.map((segmentItem) => {
      if (segmentItem.match(lakhRegex)) {
        values.push(parseInt(segmentItem.match(lakhRegex)[1]) * 100000);
      } else if (segmentItem.match(croreRegex)) {
        values.push(parseInt(segmentItem.match(croreRegex)[1]) * 10000000);
      }
    });

    return values; // Return array of parsed values for the segment
  };

  const parts = str.map((item) => {
    return item.split("-");
  });
  const parsedSegments = parts.map(parseSegment); // Array of arrays of parsed values

  // Flatten the array of arrays into a single array
  const result = parsedSegments.reduce((acc, curr) => acc.concat(curr), []);

  return result;
};

// Number to string
export const FormatNumber = (number) => {
  if (typeof number !== "number") {
    toast.error("Input must be a number");
  }

  if (number >= 10000000) {
    return (number / 10000000).toFixed(2) + " Cr";
  } else if (number >= 100000) {
    return (number / 100000).toFixed(2) + " L";
  } else if (number >= 1000) {
    return (number / 1000).toFixed(2) + " K";
  } else {
    return number.toString();
  }
};

//Array of number convert into array of number string
export const ArrayNumbertoString = (numberArray) => {
  // Function to format a single number
  const formatSingleNumber = (number) => {
    if (typeof number !== "number") {
      toast.error("Input must be a number");
      return null; // or handle the error in a way that fits your application logic
    }

    if (number >= 10000000) {
      return (number / 10000000).toFixed(2) + " Cr";
    } else if (number >= 100000) {
      return (number / 100000).toFixed(2) + " L";
    } else if (number >= 1000) {
      return (number / 1000).toFixed(2) + " K";
    } else {
      return number.toString();
    }
  };

  // Format each number in the array
  const formattedNumbers = numberArray.map(formatSingleNumber);

  // Combine formatted numbers into the desired string format
  const formattedStrings = [];
  for (let i = 0; i < formattedNumbers.length; i += 2) {
    if (formattedNumbers[i] && formattedNumbers[i + 1]) {
      formattedStrings.push(
        `${formattedNumbers[i]} - ${formattedNumbers[i + 1]}`
      );
    } else if (formattedNumbers[i]) {
      // Handle case where there is an odd number of elements
      formattedStrings.push(`${formattedNumbers[i]}`);
    }
  }

  return formattedStrings;
};

//TO find out Property Score

function countNonNullProperties(obj) {
  let count = 0;
  const skipObjNames = [
    "Facing",
    "PropertyTypeWithSubtype",
    "Area",
    "TotalPrice",
    "OwnershipType",
    "PropertyStatus",
    "Builder",
    "Fencing",
    "Flooring",
    "Furnished",
    "PosessionStatus",
    "BhkType",
  ];

  function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  function countProperties(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (key === "CompletePercentage") {
          continue; // Skip this key
        }
        if (Array.isArray(obj[key])) {
          // If it's an array, count the key itself if the array is not empty
          if (obj[key].length > 0) {
            count++;
          }
        } else if (typeof obj[key] !== "object" || obj[key] === null) {
          if (obj[key] !== undefined && obj[key] !== null && obj[key] !== "") {
            count++;
          }
        } else {
          if (skipObjNames.includes(key) || isObjectEmpty(obj[key])) {
            // Check if the key itself is not null or undefined or empty string
            if (
              obj[key] !== undefined &&
              obj[key] !== null &&
              obj[key] !== ""
            ) {
              count++;
            }
          } else {
            countProperties(obj[key]);
          }
        }
      }
    }
  }

  countProperties(obj);

  return count;
}

export const GetPropertyScore = (obj, type) => {
  const types = [
    { type: "Apartment", fields: 41 },
    { type: "Independent House", fields: 41 },
    { type: "Independent Floor", fields: 41 },
    { type: "Villa", fields: 41 },
    { type: "Plot", fields: 27 },
    { type: "Office", fields: 44 },
    { type: "Retail Shop", fields: 45 },
    { type: "Showroom", fields: 45 },
    { type: "Warehouse", fields: 41 },
  ];

  const allFields = types.find((f) => f.type == type)?.fields;
  const fieldValue = countNonNullProperties(obj);
  console.log("GetPropertyScore fieldValue", fieldValue);
  // const fillFields  = Object.values(obj)?.filter(type => type)?.length
  const compPerc = (fieldValue / allFields) * 100;
  return parseInt(compPerc);
};

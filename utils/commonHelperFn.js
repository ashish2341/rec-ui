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
  let countedKeys = [];
  const skipObjNames = [
    "Facing",
    "PropertySubtype",
    "Area",
    "TotalPrice",
    "OwnershipType",
    "PropertyStatus",
    "Builder",
    "Furnished",
    "PosessionStatus",
    "BhkType",
    "AreaUnits",
  ];

  const skipKeyNames = [
    "ApprovedBy",
    "CreatedBy",
    "CreatedDate",
    "Documents",
    "IsDeleted",
    "LoanDetails",
    "Location",
    "Preferences",
    "Surveillance",
    "UpdatedBy",
    "UpdatedDate",
    "__v",
    "_id",
    "CompletePercentage",
    "LeasedOrRented",
  ];
  if (
    obj?.ProeprtyType === "Residential" &&
    obj?.PropertySubtype?.Name !== "Plot"
  ) {
    skipKeyNames.push(
      "OwnerName",
      "DgUpsCharge",
      "TaxCharge",
      "PlotArea",
      "PlotLength",
      "Plotwidth",
      "WallType",
      "AreaUnits",
      "ZoneType",
      "CustomZoneType",
      "LocationHub",
      "CustomLocationHub",
      "SuitableFor",
      "CustomSuitable",
      "CustomWallType",
      "ServiceLifts",
      "passengerLifts",
      "Staircase",
      "PublicParking",
      "PrivateParking",
      "PublicWashroom",
      "PrivateWashroom",
      "CurentRent",
      "LeaseYears",
      "ExpectedReturn",
    );
    if (obj?.Fencing === "Other") {
      skipKeyNames.push("Fencing");
    }
    if (obj?.Flooring === "Other") {
      skipKeyNames.push("Flooring");
    }
    if (obj?.Fencing !== "Other" && obj?.CustomFencing) {
      skipKeyNames.push("CustomFencing");
    }
    if (obj?.Flooring !== "Other"&& obj?.CustomFlooring) {
      skipKeyNames.push("CustomFlooring");
    }
    if (obj?.PropertyStatus?.Status === "Under Contruction"&& obj?.AgeofProperty) {
      skipKeyNames.push("AgeofProperty");
    }
    countProperties(obj);
  }
  if (
    obj?.ProeprtyType === "Residential" &&
    obj?.PropertySubtype?.Name === "Plot"
  ) {
    skipKeyNames.push(
      "DgUpsCharge",
      "TaxCharge",
      "WallType",
      "ZoneType",
      "CustomZoneType",
      "LocationHub",
      "CustomLocationHub",
      "SuitableFor",
      "CustomSuitable",
      "CustomWallType",
      "ServiceLifts",
      "passengerLifts",
      "Staircase",
      "PublicParking",
      "PrivateParking",
      "PublicWashroom",
      "PrivateWashroom",
      "Builder",
      "Fitting",
      "PropertyStatus",
      "FloorNumber",
      "TotalFloors",
      "CarpetArea",
      "LandArea",
      "Furnished",
      "Flooring",
      "Fencing",
      "Bathrooms",
      "Bedrooms",
      "BhkType",
      "BuiltUpArea",
      "CellingHeight",
      "EntranceWidth",
     "CurentRent",
      "LeaseYears",
      "ExpectedReturn",
      "AgeofProperty",
      "LandAreaUnit",
      "CustomFencing",
      "CustomFlooring",
    );
    countProperties(obj);
  }
  if (obj?.ProeprtyType === "Commercial" && obj?.PropertySubtype?.Name === "Office") {
   
    skipKeyNames.push(
      "OwnerName",
      "SuitableFor",
      "CustomSuitable",
      "PublicWashroom",
      "PrivateWashroom",
      "Fitting",
      "Bathrooms",
      "Bedrooms",
      "BhkType",
      "PlotArea",
      "PlotLength",
      "Plotwidth",
      "AreaUnits",
    );
    if(obj?.LeasedOrRented===true &&obj?.ExpectedReturn){
      skipKeyNames.push("ExpectedReturn");
    }
    if(obj?.LeasedOrRented===false &&(obj?.CurentRent && obj?.LeaseYears )){
      skipKeyNames.push("CurentRent","LeaseYears");
    }

    if (obj?.Fencing === "Other") {
      skipKeyNames.push("Fencing");
    }
    if (obj?.Flooring === "Other") {
      skipKeyNames.push("Flooring");
    }
    if (obj?.ZoneType === "Others") {
      skipKeyNames.push("ZoneType");
    }
    if (obj?.WallType === "Other") {
      skipKeyNames.push("WallType");
    }
    if (obj?.LocationHub === "Others") {
      skipKeyNames.push("LocationHub");
    }
    if (obj?.Fencing !== "Other" && obj?.CustomFencing) {
      skipKeyNames.push("CustomFencing");
    }
    if (obj?.Flooring !== "Other"&& obj?.CustomFlooring) {
      skipKeyNames.push("CustomFlooring");
    }
    if (obj?.ZoneType !== "Others"&& obj?.CustomZoneType) {
      skipKeyNames.push("CustomZoneType");
    }
    if (obj?.WallType !== "Other"&& obj?.CustomWallType) {
      skipKeyNames.push("CustomWallType");
    }
    if (obj?.LocationHub !== "Others"&& obj?.CustomLocationHub) {
      skipKeyNames.push("CustomLocationHub");
    }
    if (obj?.PropertyStatus?.Status === "Under Contruction"&& obj?.AgeofProperty) {
      skipKeyNames.push("AgeofProperty");
    }
    countProperties(obj);
  }
  if (
    obj?.ProeprtyType === "Commercial" &&
    obj?.PropertySubtype?.Name !== "Office"
  ) {
    skipKeyNames.push(
      "WallType",
      "CustomWallType",
      "DgUpsCharge",
    "ServiceLifts",
      "passengerLifts",
      "Staircase",
      "Fitting",
      "Bathrooms",
      "Bedrooms",
      "BhkType",
      "PlotArea",
      "PlotLength",
      "Plotwidth",
      "AreaUnits",
    );
    if(obj?.LeasedOrRented===true &&obj?.ExpectedReturn){
      skipKeyNames.push("ExpectedReturn");
    }
    if(obj?.LeasedOrRented===false &&(obj?.CurentRent && obj?.LeaseYears )){
      skipKeyNames.push("CurentRent","LeaseYears");
    }
    if (obj?.PropertySubtype?.Name === "Warehouse") {
      skipKeyNames.push(
       "SuitableFor",
      "CustomSuitable",
      );

      if (obj?.ZoneType === "Others") {
        skipKeyNames.push("ZoneType");
      }
      if (obj?.LocationHub === "Others") {
        skipKeyNames.push("LocationHub");
      }
      if (obj?.Fencing === "Other") {
        skipKeyNames.push("Fencing");
      }
      if (obj?.Flooring === "Other") {
        skipKeyNames.push("Flooring");
      }
      if (obj?.LocationHub !== "Others"&& obj?.CustomLocationHub) {
        skipKeyNames.push("LocationHub");
      }
      if (obj?.ZoneType !== "Others" && obj?.CustomZoneType) {
        skipKeyNames.push("CustomZoneType");
      }
      if (obj?.Fencing !== "Other" && obj?.CustomFencing) {
        skipKeyNames.push("CustomFencing");
      }
      if (obj?.Flooring !== "Other"&& obj?.CustomFlooring) {
        skipKeyNames.push("CustomFlooring");
      }
      if (obj?.PropertyStatus?.Status === "Under Contruction"&& obj?.AgeofProperty) {
        skipKeyNames.push("AgeofProperty");
      }
    }
    if (obj?.PropertySubtype?.Name !== "Warehouse") {
      skipKeyNames.push(
        "ZoneType",
      "CustomZoneType",
       );
      if (obj?.SuitableFor === "Others") {
        skipKeyNames.push("SuitableFor");
      }
      if (obj?.LocationHub === "Others") {
        skipKeyNames.push("LocationHub");
      }
      if (obj?.Fencing === "Other") {
        skipKeyNames.push("Fencing");
      }
      if (obj?.Flooring === "Other") {
        skipKeyNames.push("Flooring");
      }
      if (obj?.LocationHub !== "Others"&& obj?.CustomLocationHub) {
        skipKeyNames.push("LocationHub");
      }
      if (obj?.SuitableFor !== "Others"&& obj?.CustomSuitable) {
        skipKeyNames.push("CustomSuitable");
      }
      if (obj?.Fencing !== "Other" && obj?.CustomFencing) {
        skipKeyNames.push("CustomFencing");
      }
      if (obj?.Flooring !== "Other"&& obj?.CustomFlooring) {
        skipKeyNames.push("CustomFlooring");
      }
      if (obj?.PropertyStatus?.Status === "Under Contruction"&& obj?.AgeofProperty) {
        skipKeyNames.push("AgeofProperty");
      }
    }
    countProperties(obj);
  }
  function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  function countProperties(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (skipKeyNames.includes(key)) {
          continue; // Skip this key
        }
        if (Array.isArray(obj[key])) {
          // If it's an array, count the key itself if the array is not empty
          if (obj[key].length > 0) {
            //  console.log("If it's an array, count the key itself if the array is not empty",key)
            count++;
            countedKeys.push(key);
          }
        } else if (typeof obj[key] !== "object" || obj[key] === null) {
          if (
            obj[key] !== undefined &&
            obj[key] !== null &&
            obj[key] !== "" &&
            obj[key] !== 0
          ) {
            count++;
            countedKeys.push(key);
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
              countedKeys.push(key);
            }
          } else {
            countProperties(obj[key]);
          }
        }
      }
    }
  }
  console.log("countedKeys", countedKeys);
  return count;
}

export const GetPropertyScore = (obj, type) => {
  const types = [
    {
      type: "Apartment",
      fields: obj?.PropertyStatus?.Status !== "Under Contruction" ? 46 : 45,
    },
    {
      type: "Independent House",
      fields: obj?.PropertyStatus?.Status !== "Under Contruction" ? 46 : 45,
    },
    {
      type: "Independent Floor",
      fields: obj?.PropertyStatus?.Status !== "Under Contruction" ? 46 : 45,
    },
    {
      type: "Villa",
      fields: obj?.PropertyStatus?.Status !== "Under Contruction" ? 46 : 45,
    },
    { type: "Plot", fields: 29 },
    {
      type: "Office",
      fields: obj?.PropertyStatus?.Status !== "Under Contruction" ? 50 : 49,
    },
    {
      type: "Retail Shop",
      fields: obj?.PropertyStatus?.Status !== "Under Contruction" ? 48 : 47,
    },
    {
      type: "Showroom",
      fields: obj?.PropertyStatus?.Status !== "Under Contruction" ? 48 : 47,
    },
    {
      type: "Warehouse",
      fields: obj?.PropertyStatus?.Status !== "Under Contruction" ? 48 : 47,
    },
  ];
  console.log("GetPropertyScore types", types);
  const allFields = types.find((f) => f.type == type)?.fields;
  const fieldValue = countNonNullProperties(obj);
  console.log("GetPropertyScore fieldValue", fieldValue);
  // const fillFields  = Object.values(obj)?.filter(type => type)?.length
  const compPerc = (fieldValue / allFields) * 100;
  return parseInt(compPerc);
};
 export const getPrevious12Months = ()  => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const result = [];
  
  for (let i = 0; i < 12; i++) {
      const previousMonthIndex = (currentMonth - i - 1 + 12) % 12;
      result.unshift(months[previousMonthIndex]);
  }
  
  return result;
}
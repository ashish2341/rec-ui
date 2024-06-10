export const API_BASE_URL = "https://rec-api-59g8.onrender.com/v1";
export const API_BASE_URL_FOR_MASTER = "https://rec-api-59g8.onrender.com/v1/masters";
export const UI_URL = 'http://localhost:3000'
export const PROD_URL = "https://recui.netlify.app"
export const PAGE_LIMIT = 10;
// export const API_BASE_URL = "http://localhost:8000/v1";
// export const API_BASE_URL_FOR_MASTER = "http://localhost:8000/v1/masters"
export const apiActions = {
    FETCH_DATA: "fetch-request",
    SET_DATA: "set-data",
    SET_ERROR: "set-error",
  };
  export const wallTypesArray = [
    "No walls",
    "Brick walls",
    "Cenented walls",
    "Plastered walls",
    "Other",
  ];
  export const fencingArray = [
    "Concrete wall",
    "Barbed wire",
    "Wood",
    "Other",
  ];
  export const flooringArray = [
    "Mosaic",
    "Wooden",
    "Marble",
    "Vitrified tiles",
    "Other",
  ];
  export const staticAreaUnitArray = [
    { value: "Sq-ft", label: "Sq-ft" },
    { value: "Sq-yrd", label: "Sq-yrd" },
    { value: "Sq-m", label: "Sq-m" },
    { value: "Sq-m", label: "Sq-m" },
  ];

  export const propertyTypeArray = ["Residential", "Commercial"];
  export const lookingToArray = ["Sell"];
  export  const conditionalArray = [true, false];
  export  const ZoneTypeArray = [
    "Industrial",
    "Commercial",
    "Special economic Zone",
    "Open Spaces",
    "Agricultural zone",
    "Others",
  ];
  export  const suitableArray = [
    "Jewellery",
    "Gym",
    "Grocery",
    "Clinic",
    "Footwear",
    "Electronics",
    "Clothing",
    "Others",
  ];
  export  const LocationhubArrayforOffice = ["IT park", "Business Park", "Others"];
  //Below array do not apply for plot subtype
  export  const LocationhubArrayforall = [
    "Mall",
    "Commercial Project",
    "Residential Project",
    "Retail Complex/Building",
    "Market/High Street",
    "Others",
  ];
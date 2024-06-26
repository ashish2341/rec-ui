export const API_BASE_URL = " http://recadmin-001-site1.ctempurl.com/v1";
export const API_BASE_URL_FOR_MASTER = "http://recadmin-001-site1.ctempurl.com/v1/masters";
export const UI_URL = 'http://localhost:3000'
export const PROD_URL = "http://recadmin-001-site2.etempurl.com"
export const PAGE_LIMIT = 10;
 export const imgApiUrl = "http://recadmin-001-site1.ctempurl.com/uploads"
//  export const API_BASE_URL = "http://localhost:8000/v1";
//  export const API_BASE_URL_FOR_MASTER = "http://localhost:8000/v1/masters"
 export const currentPage="Review"
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

  //Statis array for PropertyList and featured property page

  export const bathroomArray = [
    { value: 1, label: "One" },
    { value: 2, label: "Two" },
    { value: 3, label: "Three" },
    { value: 4, label: "Four" },
    { value: 5, label: "Five" },
  ];
 
  export const RangeTypeArray = [
    { value1: 1000000, value2: 3000000, label: "10 L- 30 L" },
    { value1: 3000000, value2: 6000000, label: " 30 L- 60 L" },
    { value1: 6000000, value2: 10000000, label: "60 L- 1 Cr" },
    { value1: 10000000, value2: 20000000, label: "1 Cr- 2 Cr" },
  ];
  export const sortItemArray = [
    { itemName: "Low to High", urlItem1: "TotalPrice.MinValue", urlItem2: "1" },
    {
      itemName: "High to Low",
      urlItem1: "TotalPrice.MaxValue",
      urlItem2: "-1",
    },
    { itemName: "Latest", urlItem1: "CreatedDate", urlItem2: "-1" },
    { itemName: "Featured", urlItem1: true, urlItem2: "" },
    { itemName: "Popular", urlItem1: true, urlItem2: "" },
  ];
  export const propertyCardToShow=5;
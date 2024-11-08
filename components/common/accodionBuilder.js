import React, { useState } from "react";
import styles from "../common/css/accodion.module.css";

const AccordionBuilder = ({ listData }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={` border border-gray-200 rounded ${styles.accordionStyle}`}>
      {listData.length > 0
        ? listData.map((item, index) => (
          <div key={index} className="border-b border-gray-200">
            <button
              className="w-full flex justify-between items-center px-4 py-2 text-left focus:outline-none"
              onClick={() => toggleAccordion(index)}
            >
              <div className={` ${styles.heroSectionBottomBox}`}>
                <div className={`${styles.accordionItem}`}>
                  <h2 className={`${styles.heroSectionBottomBoxHead}`}>
                    Property Type
                  </h2>
                  <p className={`${styles.heroSectionBottomBoxText}`}>
                    {" "}
                    {/* <i className="bi bi-house-door-fill"></i> */}
                    <span className="ml-1">{item.ProeprtyType}</span>
                  </p>
                </div>
                <div className={`${styles.accordionItem}`}>
                  <h2 className={`${styles.heroSectionBottomBoxHead}`}>
                    Property SubType
                  </h2>
                  <p className={`${styles.heroSectionBottomBoxText}`}>
                    {" "}
                    <span className="ml-1">{item.PropertySubtype.Name}</span>
                  </p>
                </div>
                <div className={`${styles.accordionItem}`}>
                  <h2 className={` ${styles.heroSectionBottomBoxHead}`}>
                    {item.PropertySubtype.Name !== "Plot"
                      ? "Property Status"
                      : "OwnerShip Type"}
                  </h2>
                  <p className={` ${styles.heroSectionBottomBoxText}`}>
                    {item.PropertySubtype.Name !== "Plot" ? (
                      <span>{item?.PropertyStatus?.Status}</span>
                    ) : (
                      <span>{item?.OwnershipType.Ownership}</span>
                    )}
                  </p>
                </div>
                {/* <div className={`${styles.heroSectionVL}`}></div> */}

                {/* <div className={`${styles.heroSectionVL}`}></div> */}
              </div>
              {/* <svg className={`w-4 h-full transition-transform transform ${ activeIndex === index ? "rotate-180" : "" }`} viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M0 10l10 5v-10z" clip-rule="evenodd" />
</svg> */}
              <i className={`fa fa-chevron-down w-4 h-full transition-transform transform ${activeIndex === index ? "rotate-180" : ""}`} aria-hidden="true"></i>
            </button>
            <div className={` ${activeIndex === index ? "block" : "hidden"}`}>
              <button
                className="w-full flex justify-between items-center px-4 py-2 text-left focus:outline-none"
              // onClick={() => toggleAccordion(index)}
              >
                <div className={` ${styles.heroSectionBottomBox}`}>
                  <div className={`${styles.accordionItem}`}>
                    <h2 className={`${styles.heroSectionBottomBoxHead}`}>
                      Posession Status
                    </h2>
                    <p className={`${styles.heroSectionBottomBoxText}`}>
                      <span className={`${styles.textCapitalized}`}>
                        {item?.PosessionStatus?.Possession}
                      </span>
                    </p>
                  </div>
                  {/* <div className={`${styles.heroSectionVL}`}></div> */}
                  <div className={`${styles.accordionItem}`}>
                    <h2 className={`${styles.heroSectionBottomBoxHead}`}>
                      Posession Date
                    </h2>
                    <p className={`${styles.heroSectionBottomBoxText}`}>
                      {item.PosessionDate.slice(0, 10)}
                    </p>
                  </div>
                  {/* <div className={`${styles.heroSectionVL}`}></div> */}
                  <div className={`${styles.accordionItem}`}>
                    <h2 className={`${styles.heroSectionBottomBoxHead}`}>
                      Is Negotiable
                    </h2>
                    <p className={`${styles.heroSectionBottomBoxText}`}>
                      {item?.IsNegotiable ? "yes" : "No"}
                    </p>
                  </div>
                </div>
                <svg
                  className={`w-4 h-full transition-transform transform ${activeIndex === index ? "rotate-180 " : ""
                    }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  style={{ height: "100%" }}
                >
                  {/* <path
                fillRule="evenodd"
                d="M10 2.5a.75.75 0 01.75.75v12.5a.75.75 0 01-1.5 0V3.25a.75.75 0 01.75-.75zM5.75 7.75a.75.75 0 011.5 0v1.5a.75.75 0 01-1.5 0v-1.5zM14.25 7.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5zM4.5 11.25a.75.75 0 111.5 0 .75.75 0 01-1.5 0zm10.5 0a.75.75 0 111.5 0 .75.75 0 01-1.5 0z"
                clipRule="evenodd"
              /> */}
                </svg>
              </button>
            </div>
          </div>
        ))
        : null}
    </div>
  );
};

export default AccordionBuilder;

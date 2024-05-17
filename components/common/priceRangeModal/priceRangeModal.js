"use client";
import React, { useState } from "react";
import { Modal } from "flowbite-react";
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import { SliderRail, Handle, Track, Tick } from "./priceSliderSource";
import { ArrayNumbertoString } from "@/utils/commonHelperFn";
import styles from "./priceRange.module.css"

const sliderStyle = {
  position: "relative",
  width: "100%",
};

const domain = [0, 50000000];
const defaultValues = [1000, 40000];

const PriceRangeSlider = ({ isShow, setRangeModalValue, setPayload }) => {
  const onChange = (values) => {
    const formattedNumbers = ArrayNumbertoString(values);
    setPayload((prev) => {
      return {
        ...prev,
        budget: [{ id: values, label: formattedNumbers }],
      };
    });
  };

  return (
    <>
     <div className={`${styles.centeredContainer}`}>
      <div
        dismissible
        className={`${styles.card}`}
        onClose={() => setRangeModalValue(false)}
        show={isShow}
      >
        <div className={`${styles.cardHeader}`} >What budget are you looking for?</div>
        <div className={`${styles.cardBody}`} >
          <div style={{ margin: "10%", height: 50, width: "80%" }}>
            <Slider
              mode={1}
              step={1}
              domain={domain}
              rootStyle={sliderStyle}
              onChange={onChange}
              values={defaultValues}
            >
              <Rail>
                {({ getRailProps }) => (
                  <SliderRail getRailProps={getRailProps} />
                )}
              </Rail>
              <Handles>
                {({ handles, getHandleProps }) => (
                  <div className="slider-handles">
                    {handles.map((handle) => (
                      <Handle
                        key={handle.id}
                        handle={handle}
                        domain={domain}
                        getHandleProps={getHandleProps}
                      />
                    ))}
                  </div>
                )}
              </Handles>
              <Tracks left={false} right={false}>
                {({ tracks, getTrackProps }) => (
                  <div className="slider-tracks">
                    {tracks.map(({ id, source, target }) => (
                      <Track
                        key={id}
                        source={source}
                        target={target}
                        getTrackProps={getTrackProps}
                      />
                    ))}
                  </div>
                )}
              </Tracks>
              <Ticks count={6}>
                {({ ticks }) => (
                  <div className="slider-ticks">
                    {ticks.map((tick) => (
                      <Tick key={tick.id} tick={tick} count={ticks.length} />
                    ))}
                  </div>
                )}
              </Ticks>
            </Slider>
          </div>
        </div>
      </div>
    </div>
     
    </>
  );
};

export default PriceRangeSlider;

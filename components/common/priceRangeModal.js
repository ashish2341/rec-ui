"use client"
import React, { useState } from 'react';
import { Modal } from "flowbite-react";
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import { SliderRail, Handle, Track, Tick } from "./priceSliderSource"; // example render components - source below

const sliderStyle = {
    position: "relative",
    width: "100%"
};

const domain = [0, 50000000];
const defaultValues = [1000, 40000];

const PriceRangeSlider = ({setPayload}) => {


    const onChange = values => {

        // setPayload( prev => {
        //     return {
        //         ...prev,
        //         budget:values
        //     }
        // })
        

    }

    return (
        <>
            <Modal dismissible className="bg-transparent/[.5]" show={true} >
            <Modal.Header>What budget you looking for?</Modal.Header>
                <Modal.Body>
               
                    <div style={{ margin: "10%", height: 120, width: "80%" }}>
                       
                        <Slider
                            mode={1}
                            step={1}
                            domain={domain}
                            rootStyle={sliderStyle}
                            onChange={onChange}
                            values={defaultValues}
                        >
                            <Rail>
                                {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
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
                </Modal.Body>

            </Modal>
        </>

    );
};

export default PriceRangeSlider;


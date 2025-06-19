// *********************
// Role of the component: Range with labels for price intented to be on the shop page
// Name of the component: RangeWithLabels.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <RangeWithLabels />
// Input parameters: no input parameters
// Output: range input with the labels
// *********************

"use client";

import React, { useState } from "react";

const RangeWithLabels = () => {
  const [currentRangeWLabelsValue, setCurrentRangeWLabelsValue] =
    useState<number>(0);

  // function for handling range change
  const handleRangeWLabelsValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentRangeWLabelsValue(parseInt(e.target.value));
  };

  return (
    <div>
      <span className="label-text text-lg text-black">Фильтр цен:</span>
      <input
        type="range"
        min={0}
        max="1000"
        value={currentRangeWLabelsValue}
        onChange={(e) => handleRangeWLabelsValue(e)}
        className="range range-warning"
        step="200"
      />
      <div className="w-full flex justify-between text-xs px-2">
        <span>₽0</span>
        <span>₽1000</span>
        <span>₽10000</span>
        <span>₽20000</span>
        <span>₽100000</span>
      </div>
    </div>
  );
};

export default RangeWithLabels;

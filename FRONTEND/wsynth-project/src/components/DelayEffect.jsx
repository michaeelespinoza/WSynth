import React, { useState, useContext, useEffect } from "react";
import { CTX } from "../context/Store";

const DelayEffect = () => {
  const [appState, updateState] = useContext(CTX);
  const [delayGain, setDelayGain] = useState(0);
  const [delayTime, setDelayTime] = useState(0);

  const handleDelayGainChange = (event) => {
    const newDelayGain = event.target.value;
    setDelayGain(newDelayGain);
    updateState({ type: "CHANGE_DELAY_GAIN", payload: { value: newDelayGain } });
  };

  const handleDelayTimeChange = (event) => {
    const newDelayTime = event.target.value;
    setDelayTime(newDelayTime);
    updateState({ type: "CHANGE_DELAY_TIME", payload: { value: newDelayTime } });
  };

  return (
    <div className="control">
      <h3>Delay</h3>
      <div className="params">
        <h4>Gain: {delayGain}</h4>
        <input
          type="range"
          id="delay-gain"
          min="0"
          max="1"
          step="0.05"
          value={delayGain}
          onChange={handleDelayGainChange}
        />
        <h4>Delay (ms): {delayTime * 1000}</h4>
        <input
          type="range"
          id="delay-time"
          min="0"
          max="1.6"
          step="0.010"
          value={delayTime}
          onChange={handleDelayTimeChange}
        />
      </div>
    </div>
  );
};

export default DelayEffect;

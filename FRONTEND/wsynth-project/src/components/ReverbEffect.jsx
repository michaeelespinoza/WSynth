import React, { useState, useContext } from "react";
import { CTX } from "../context/Store";

const ReverbEffect = () => {
  const [appState, updateState] = useContext(CTX);
  const [wetGain, setWetGain] = useState(0);

  const handleWetGainChange = (event) => {
    const newWetGain = event.target.value;
    setWetGain(newWetGain);
    updateState({ type: "CHANGE_REVERB_WET_GAIN", payload: { value: newWetGain } });
  };

  return (
    <div className="control">
      
      <h3>Reverb</h3>
      <div className="params">
        <h4>Wet Gain: {wetGain} </h4>
        <input
            type="range"
            id="wet-gain"
            min="0"
            max="1"
            step="0.02"
            value={wetGain}
            onChange={handleWetGainChange}
        />
      </div>
      
    </div>
  );
};

export default ReverbEffect;

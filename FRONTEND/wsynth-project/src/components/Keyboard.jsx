import React, { useContext, useEffect, useRef } from "react";
import { CTX } from "../context/Store";
import QwertyHancock from "qwerty-hancock";

const Keyboard = () => {
  const [appState, updateState] = useContext(CTX);
  const keyboard = useRef(null);

  useEffect(() => {
    if (!keyboard.current) {
      keyboard.current = new QwertyHancock({
        id: "keyboard",
        width: "449",
        height: "70",
        octaves: 2,
        startNote: "C4",
      });
    }

    keyboard.current.keyDown = function (note, frequency) {
      updateState({ type: "MAKE_OSC", payload: { note, freq: frequency } });
    };

    keyboard.current.keyUp = function (note, frequency) {
      updateState({ type: "KILL_OSC", payload: { note, freq: frequency } });
    };

    // Función para convertir el número de nota MIDI en su representación de cadena y frecuencia
    function midiNoteToFrequency(note) {
      const frequency = 440 * Math.pow(2, (note - 69) / 12);
      return frequency;
    }

    function midiNoteToNoteString(note) {
      const octave = Math.floor(note / 12) - 1;
      const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
      const noteName = noteNames[note % 12];
      return noteName + octave;
    }

    function handleMIDIControlChange(controller, value) {
      switch (controller) {
        case 1: // Attack
          updateState({ type: "CHANGE_ADSR", payload: { id: "attack", value: value / 127 } });
          break;
        case 2: // Decay
          updateState({ type: "CHANGE_ADSR", payload: { id: "decay", value: value / 127 } });
          break;
        case 3: // Sustain
          updateState({ type: "CHANGE_ADSR", payload: { id: "sustain", value: value / 127 } });
          break;
        case 4: // Release
          updateState({ type: "CHANGE_ADSR", payload: { id: "release", value: value / 127 } });
          break;
        case 5: // Frequency
          updateState({ type: "CHANGE_FILTER", payload: { id: "frequency", value: (value / 127) * 10000 } });
          break;
        case 6: // Wet Gain (Reverb)
          const wetGainValue = value / 127;
          updateState({ type: "SET_WET_GAIN", payload: wetGainValue });
          break;
        case 7: // Delay Time
          const delayTimeValue = (value / 127) * 2;
          updateState({ type: "SET_DELAY_TIME", payload: delayTimeValue });
          break;
        default:
          break;
      }
    }

    // Configurar entrada MIDI
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
    } else {
      console.warn('WebMIDI is not supported in this browser.');
    }

    function onMIDISuccess(midiAccess) {
      for (let input of midiAccess.inputs.values()) {
        input.onmidimessage = onMIDIMessage;
      }
    }

    function onMIDIFailure() {
      console.warn('No se pudo acceder a tus dispositivos MIDI.');
    }

    function onMIDIMessage(event) {
      const [status, data1, data2] = event.data;
      const messageType = status & 0xf0;
      const noteNumber = data1;
      const noteString = midiNoteToNoteString(noteNumber);
      const frequency = midiNoteToFrequency(noteNumber);

      if (messageType === 0x90 && data2 > 0) {
        // Nota encendida
        keyboard.current.keyDown(noteString, frequency);
      } else if (messageType === 0x80 || (messageType === 0x90 && data2 === 0)) {
        // Nota apagada
        keyboard.current.keyUp(noteString, frequency);
      } else if (messageType === 0xB0) {
        // Control Change
        handleMIDIControlChange(data1, data2);
      }
    }
  }, []);

  return (
    <div className='keyboard'>
      <div id="keyboard"></div>
    </div>
  );
};

export default Keyboard;


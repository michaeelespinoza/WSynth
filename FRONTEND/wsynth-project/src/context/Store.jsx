import React from "react";
import Osc from "./Osc";

let actx = new AudioContext();
let out = actx.destination;


// A la hora de asociar los osciladores con las 4 formas de onda que he programado al teclado de qwerty hancock, vamos a comentar/eliminar todos los usos de 'osc1' que es donde estan asociados estos osciladores, para asociarlos al teclado de qwerty hancock

//let osc1 = actx.createOscillator();
let gain1 = actx.createGain();

//Bajo un poco la ganancia ya que por el 'React.StrictMode' cuando estamos en modo desarrollo qwerty hancock duplica por si solo los inputs y outputs, esto hace que la ganancia sea el doble de lo normal y por consecuencia se sature el sonido. Pero hay que tener en cuenta que esto solo pasa en modo desarrollo, en produccion se soluciona por si solo.
gain1.gain.value = 0.2; 
let filter = actx.createBiquadFilter();

//osc1.connect(gain1);
gain1.connect(filter);
filter.connect(out);

// Creamos nodos de ganancia para el Reverb independientes para no afectar a la ganancia principal
let impulse = impulseResponse(3, 1);
let convolver = actx.createConvolver();
convolver.buffer = impulse;
let dryGain = actx.createGain();
let wetGain = actx.createGain();
let filterDryGain = actx.createGain();
let filterWetGain = actx.createGain();

// Creamos nodos de ganancia para el Delay
let delayNode = actx.createDelay(5.0); // 5 segundos de retraso máximo
let feedbackGainNode = actx.createGain();


filter.disconnect(out); // Desconecta la conexión existente al destino

// Conectamos los nodos de ganancia independientes de (Reverb y Delay) a la salida de las ganancias principales (Filter)
filter.connect(filterDryGain);
filter.connect(filterWetGain);
filter.connect(delayNode); // Conectar el filtro al nodo de delay
delayNode.connect(feedbackGainNode); // Conectar el nodo de delay a la ganancia de retroalimentación
feedbackGainNode.connect(delayNode); // Conectar la ganancia de retroalimentación al nodo de delay
filterDryGain.connect(dryGain);
filterWetGain.connect(convolver);
dryGain.connect(out);
convolver.connect(wetGain);
wetGain.connect(out);
delayNode.connect(out);

// Valores inciales de Reverb y Delay
dryGain.gain.value = 1;
wetGain.gain.value = 0.2;
filterDryGain.gain.value = 1;
filterWetGain.gain.value = 0.2;

feedbackGainNode.gain.value = 0; // Ganancia inicial


function impulseResponse(duration, decay) {
    let length = actx.sampleRate * duration;
    let impulse = actx.createBuffer(2, length, actx.sampleRate);
    let IR = impulse.getChannelData(0);
    for (let i = 0; i < length; i++) {
      IR[i] = (2 * Math.random() - 1) * Math.pow(1 - i / length, decay);
    }
    return impulse;
}

const CTX = React.createContext();
export{CTX};

let nodes = []; 

//let isPlaying = false;


export function reducer (state, action){
    let{id, value, /*note*/ freq} = action.payload || {};
    switch(action.type){
        /*
        case "START_OSC":
            if (!isPlaying) {
                osc1.start();
                isPlaying = true;
            }
            return { ...state };

        case "STOP_OSC":
            if (isPlaying) {
                osc1.stop();
                isPlaying = false;
                // Re-crear el oscilador después de detenerlo
                osc1 = actx.createOscillator();
                osc1.connect(gain1);
            }
            return { ...state };
        */    
        case "CHANGE_OSC1":
            // osc1[id].value = value;
            return{...state, osc1Settings: {...state.osc1Settings, [id]: value} };

        case 'CHANGE_OSC1_TYPE':
            // osc1.type = id;
            return{...state, osc1Settings: {...state.osc1Settings, type: id} };
        
        case 'CHANGE_FILTER':
            filter[id].value = value;
            return{...state, filterSettings: {...state.filterSettings, [id]: value} };

        case 'CHANGE_FILTER_TYPE':
            filter.type = id;
            return{...state, filterSettings: {...state.filterSettings, type: id} };

        case "MAKE_OSC":
            //const newOsc = new Osc(actx, "square", freq, 0, null, gain1);
            const newOsc = new Osc(actx, state.osc1Settings.type, freq, state.osc1Settings.detune, state.envelope, gain1);
            nodes.push(newOsc);
            //console.log("make osc, note and freq: ", note, freq);
            return{...state};
        
        case "KILL_OSC":
            let newNodes = [];
            nodes.forEach(node => {
                if(Math.round(node.osc.frequency.value) === Math.round(freq)){
                    node.stop();
                } else {
                    newNodes.push(node);
                }
            });
            nodes = newNodes;
            //console.log("kill osc, note and freq: ", note, freq);
            return{...state};
        
        case "CHANGE_ADSR":
            return {...state, envelope: {...state.envelope, [id]: Number(value) }};
        

        case "CHANGE_REVERB_WET_GAIN":
            wetGain.gain.value = Number(value);
            return { ...state };

        case "CHANGE_DELAY_GAIN":
            feedbackGainNode.gain.value = Number(value);
            return { ...state };
        
        case "CHANGE_DELAY_TIME":
            delayNode.delayTime.value = Number(value);
            return { ...state };

        default:
            console.log('reducer error. action: ', action);
            return{...state};
    }
}

export default function Store(props){
    const stateHook = React.useReducer(reducer, {
        osc1Settings: {
            // ya no se necesitan los valores de frequencia porque ya nos los dice qwerty hancock
            // frequency: osc1.frequency.value,
            detune: 0, //osc1.detune.value,
            type: 'sine' // osc1.type
        },

        filterSettings: {
            frequency: filter.frequency.value,
            detune: filter.detune.value,
            Q: filter.Q.value,
            gain: filter.gain.value,
            type: filter.type
        },
        envelope: {
            attack: 0.05,
            decay: 0.1,
            sustain: 0.6,
            release: 0.1
        }
    });
    return <CTX.Provider value={stateHook}>{props.children}</CTX.Provider>
}
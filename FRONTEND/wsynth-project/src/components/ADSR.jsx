import React, {useContext} from 'react' 
import {CTX} from '../context/Store'

const ADSR = () => {
    const[appState, updateState] = useContext(CTX);
    let {attack, decay, sustain, release} = appState.envelope;

    const change = e =>{
        let {id, value} = e.target;
        updateState({type: "CHANGE_ADSR", payload: {id, value} });
    }

    return (
        <div className="control">

            <h2>ADSR</h2>
            <br/>
            <div className='param'>
                <h3>Attack</h3>
                <input type='range' id='attack' onChange={change} max='2' step='0.02' value={attack} />
            </div>

            <div className='param'>
                <h3>Decay</h3>
                <input type='range' id='decay' onChange={change} max='1' step='0.01' value={decay} />
            </div>

            <div className='param'>
                <h3>Sustain</h3>
                <input type='range' id='sustain' onChange={change} max='1' step='0.01' value={sustain} />
            </div>

            <div className='param'>
                <h3>Release</h3>
                <input type='range' id='release' onChange={change} max='2' step='0.02' value={release} />
            </div>

        </div>
    )
}


export default ADSR;
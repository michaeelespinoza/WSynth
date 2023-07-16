import styled from "styled-components";
// import {useState} from 'react';
import Osc1 from "../components/osc1";
import Filter from "../components/Filter";
import Keyboard from "../components/Keyboard";
import ADSR from "../components/ADSR"
import ReverbEffect from "../components/ReverbEffect";
import DelayEffect from "../components/DelayEffect";


export function Home() {
  // Haré uso del "Hook" de react useState ya que despues de varias pruebas y errores he visto que es la manera de evitar discrepancias entre el valor inicial de los settings del oscilador y el valor actual del campo de entrada en el DOM
  /*
  const [osc1Settings, setOsc1Settings] = useState({
    frequency: osc1.frequency.value,
    detune: osc1.detune.value,
    type: osc1.type
  })
  
  // Aquí, igual que antes, hago uso del useSatate de react para evitar problemas a la hora de modificar los valores del BiquadFilter. Este es un paquete de filtros que ofrece WebAudioAPI tales como HP, LP, Notch, BP, etc... 
  const [filterSettings, setFilterSettings] = useState({
    frequency: filter.frequency.value,
    detune: filter.detune.value,
    Q: filter.Q.value,
    gain: filter.gain.value,
    type: filter.type
  })

  // Esta es una reestructuracion de código repetitivo que controlaba los sliders de de los settings del oscilador
  const changeOsc1 = (e) => {
    let {value, id} = e.target;
    setOsc1Settings({...osc1Settings, [id]: value});
    osc1[id].value = value;
  }

  // Esta funcion controla el cambio del tipo de forma de onda del oscilador mediante su id [sine, triangle, square, sawtooth]
  const changeOsc1Type = (e) => {
    let {id} = e.target;
    setOsc1Settings({...osc1Settings, type: id})
    osc1.type = id;
  }

  // Con esta funcion ajustamos los settings del BiquadFilter
  const changeFilter = (e) => {
    let {value, id} = e.target;
    setFilterSettings({...filterSettings, [id]: value});
    filter[id].value = value;
  }

  // Con esta funcion escogemos el tipo de filtro (HP, LP, etc...)
  const changeFilterType = (e) => {
    let{id} = e.target;
    setFilterSettings({...filterSettings, type: id});
    filter.type = id;
  }
  */
  return (
    <Container>
      { /*<h1 className="center">Sliders</h1>*/ }
      
      <div className="container">
        <Osc1/>

        <div className="row">
          <div className="effect-container">
            <ADSR />
            <Filter />
          </div>
        </div>

        <div className="row">
          <ReverbEffect />
          <DelayEffect />
        </div>

        <Keyboard />
      </div>
    </Container>
  );
}
const Container = styled.div`
 height:100vh;`;
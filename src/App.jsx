import { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [advice, setAdvice] = useState('');

  function getAdvice(search) {
    setAdvice('Getting advice...');
    if (search) {
      axios.get(`https://api.adviceslip.com/advice/search/${search}`)
        .then(res => {
          if (res.data.total_results && res.data.total_results > 0) { // se encontrar resultado para o termo
            setAdvice(res.data.slips[0].advice);
          } else if (res.data.message) { // se não encontrar resultado para o termo
            setAdvice(res.data.message.text);
          } else { // se chegar algum retorno inesperado
            setAdvice('Error on search');
          }
        })
    } else {
      axios.get(`https://api.adviceslip.com/advice`)
        .then(res => {
          setAdvice(res.data.slip.advice);
        })
    }
  }

  if (advice == ''){
    getAdvice('');
  }

  return (
    <>
      <div className='row'>
        <div className='col'>
          <button className='btn btn-success mx-2'onClick={()=>{getAdvice("dog")}}>Dog</button>
          <button className='btn btn-success mx-2'onClick={()=>{getAdvice("cat")}}>Cat</button>
          <button className='btn btn-success mx-2'onClick={()=>{getAdvice("study")}}>Study</button>
          <button className='btn btn-success mx-2'onClick={()=>{getAdvice("")}}>Random</button>
        </div>
      </div>
      <div className='mt-5 fs-2'>Advice</div>
      <div className='mt-3 fs-3'>{advice}</div>
    </>
  )
}

export default App

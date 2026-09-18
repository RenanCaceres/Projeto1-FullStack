import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div>
          <h1>Vamos começar neah</h1>
        </div>
        <button
          type="button"
          className="counter"
          onClick = {() =>  {
            if(count == 10){
              setCount(0);
            } else {
              setCount((count) => count + 1)
            }
          }}
        >
          Butaum
        </button>

        Você ficou clicando {count} vezesssssssss!!! Para de clicar agora, peste (desabafo!)
      </section>

      <section id="spacer"></section>
    </>
  )
}

export default App

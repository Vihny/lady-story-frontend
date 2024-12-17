import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Rotas from './routes/router'

function App() {
  return (
    <>
    <BrowserRouter>
      <Rotas />
    </BrowserRouter>
    </>
  )
}

export default App

//? React StrictMode aiuta a trovare problemi nel codice, ma può causare doppi rendering 
//? e complicare il debug durante lo sviluppo iniziale o con librerie non compatibili. 
//? Meglio attivarlo solo quando l'app è stabile.

// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <App />
  // </StrictMode> 
)


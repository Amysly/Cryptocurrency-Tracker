import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CryptoContextProvider from './Components/CryptoContext.jsx'

createRoot(document.getElementById('root')).render(
  <CryptoContextProvider>
    <StrictMode>
        <App />
    </StrictMode>,
  </CryptoContextProvider>
  
)

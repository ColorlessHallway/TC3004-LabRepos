import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Primero from './Primero.tsx'
import Segundo from './Segundo.tsx'
import Tercero from './Tercero.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Primero/>
    <Segundo/>
    <Tercero/>
  </StrictMode>,
)

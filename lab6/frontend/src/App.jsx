import { useState } from 'react'
import BusinessList from './components/BusinessList';
import './App.css'
function App() {
  const [count, setCount] = useState(0)
  return (
    <div className="App">
      <header className="App-header">
        <h1>Administrador de Auditorias</h1>
      </header>
      <main>
        <BusinessList />
      </main>
      <footer>
        <p>CRUD de Negocios © 2026</p>
      </footer>
    </div>
  )
}
export default App
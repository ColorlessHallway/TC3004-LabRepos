import { HolaMundo } from './components/HolaMundo';
import { UsoVariables } from './components/UsoVariables';
import { ListaBancos } from './components/ListaBancos';

function App() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <HolaMundo />
      <hr />
      <UsoVariables />
      <hr />
      <ListaBancos />
    </main>
  );
}

export default App;
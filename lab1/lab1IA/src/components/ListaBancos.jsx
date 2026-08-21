import { bancos } from '../bancos';

export function ListaBancos() {
  return (
    <div>
      <h2>Listado de Bancos</h2>
      <ul>
        {bancos.map((banco) => (
          <li key={banco.id}>
            <strong>{banco.nombre}</strong> — <em>{banco.pais}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}
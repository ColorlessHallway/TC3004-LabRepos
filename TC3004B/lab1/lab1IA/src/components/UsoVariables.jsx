export function UsoVariables() {
  const usuario = "Ana Martínez";
  const rol = "Desarrolladora Frontend";
  const experienciaAnos = 3;

  return (
    <div>
      <h2>Perfil de Usuario</h2>
      <p><strong>Nombre:</strong> {usuario}</p>
      <p><strong>Rol:</strong> {rol}</p>
      <p><strong>Años de experiencia:</strong> {experienciaAnos}</p>
    </div>
  );
}
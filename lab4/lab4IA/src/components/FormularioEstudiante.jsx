import React, { useState } from 'react';

// Hook personalizado para procesar y almacenar la información enviada
function useFormSubmit() {
  const [submittedData, setSubmittedData] = useState(null);

  const processSubmit = (data) => {
    setSubmittedData(data);
  };

  return { submittedData, processSubmit };
}

export default function FormularioEstudiante() {
  const [formData, setFormData] = useState({
    matricula: '',
    nombre: '',
    apellidos: '',
    edad: '',
    universidad: '',
    carrera: ''
  });

  // Instancia del hook para el proceso de envío
  const { submittedData, processSubmit } = useFormSubmit();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    processSubmit(formData);
  };

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto', fontFamily: 'sans-serif' }}>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="matricula">Matrícula: </label>
          <input
            type="text"
            id="matricula"
            name="matricula"
            value={formData.matricula}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="nombre">Nombre: </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="apellidos">Apellidos: </label>
          <input
            type="text"
            id="apellidos"
            name="apellidos"
            value={formData.apellidos}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="edad">Edad: </label>
          <input
            type="text"
            id="edad"
            name="edad"
            value={formData.edad}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="universidad">Universidad: </label>
          <input
            type="text"
            id="universidad"
            name="universidad"
            value={formData.universidad}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="carrera">Carrera: </label>
          <input
            type="text"
            id="carrera"
            name="carrera"
            value={formData.carrera}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" style={{ cursor: 'pointer', padding: '6px 12px' }}>
          Enviar
        </button>
      </form>

      {submittedData && (
        <div style={{ marginTop: '20px', borderTop: '1px solid #ccc', paddingTop: '10px' }}>
          <p><strong>Matrícula:</strong> {submittedData.matricula}</p>
          <p><strong>Nombre:</strong> {submittedData.nombre}</p>
          <p><strong>Apellidos:</strong> {submittedData.apellidos}</p>
          <p><strong>Edad:</strong> {submittedData.edad}</p>
          <p><strong>Universidad:</strong> {submittedData.universidad}</p>
          <p><strong>Carrera:</strong> {submittedData.carrera}</p>
        </div>
      )}
    </div>
  );
}
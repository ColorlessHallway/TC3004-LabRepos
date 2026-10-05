import CryptoJS from "crypto-js";
import React, { useState } from 'react';
import './Salt.css';

export default function Salt() {
  const [textoPlano, setTextoPlano] = useState('');
  const [textoCifrado, setTextoCifrado] = useState('');
  const [textoOriginal, setTextoOriginal] = useState('');
  const [error, setError] = useState('');

  // Actualiza el input y resetea resultados previos para evitar inconsistencias
  const handleInputChange = (e) => {
    setTextoPlano(e.target.value);
    setTextoCifrado('');
    setTextoOriginal('');
    setError('');
  };

  const cifrar = () => {
    setError('');
    // Validación de seguridad: no cifrar texto vacío o con solo espacios
    if (!textoPlano.trim()) {
      setError('Por favor, ingresa un texto para cifrar.');
      return;
    }

    try {
      var resultado = CryptoJS.AES.encrypt(textoPlano, '12345678').toString();
      setTextoCifrado(resultado);
      setTextoOriginal(''); // Limpia el descifrado anterior
    } catch (err) {
      setError('Ocurrió un error al cifrar el texto.');
    }
  };

  const descifrar = () => {
    setError('');
    if (!textoCifrado) return;

    try {
      var bytes = CryptoJS.AES.decrypt(textoCifrado, '12345678');
      var textoDescifrado = bytes.toString(CryptoJS.enc.Utf8);

      // Verificación de integridad: si no devuelve string válido, la clave o el texto es incorrecto
      if (!textoDescifrado) {
        setError('No se pudo descifrar el texto. Clave incorrecta o texto corrupto.');
        setTextoOriginal('');
        return;
      }

      setTextoOriginal(textoDescifrado);
    } catch (err) {
      setError('Error al intentar descifrar el mensaje.');
    }
  };

  return (
    <div className="card-container">
      <div className="card-header">
        <h2>Cifrador y Descifrador AES</h2>
        <p>Asegura y recupera tus mensajes con cifrado AES</p>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="crypto-form">
        <div className="input-group">
          <label htmlFor="textoPlano">Texto Plano:</label>
          <input
            id="textoPlano"
            type="text"
            value={textoPlano}
            onChange={handleInputChange}
            placeholder="Escribe el texto aquí..."
            autoComplete="off"
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="button-group">
          <button 
            type="button" 
            className="btn btn-primary" 
            onClick={cifrar}
            disabled={!textoPlano.trim()}
          >
            Cifrar Texto
          </button>
        </div>

        <div className="result-box">
          <span className="result-label">Texto Cifrado:</span>
          <p className="result-text ciphertext">
            {textoCifrado || <em>El texto cifrado aparecerá aquí...</em>}
          </p>
        </div>

        <div className="button-group">
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={descifrar} 
            disabled={!textoCifrado}
          >
            Descifrar Texto
          </button>
        </div>

        <div className="result-box">
          <span className="result-label">Texto Original (Descifrado):</span>
          <p className="result-text plaintext">
            {textoOriginal || <em>El texto descifrado aparecerá aquí...</em>}
          </p>
        </div>
      </form>
    </div>
  );
}
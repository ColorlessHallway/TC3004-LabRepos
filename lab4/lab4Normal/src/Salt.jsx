import CryptoJS from "crypto-js";
import React, { useState } from 'react';

export default function Salt() {
  const [textoPlano, setTextoPlano] = useState('');
  const [textoCifrado, setTextoCifrado] = useState('');
  const [textoOriginal, setTextoOriginal] = useState('');

  const cifrar = () => {
    var resultado = CryptoJS.AES.encrypt(textoPlano, '12345678').toString();
    setTextoCifrado(resultado);
  }

  const descifrar = () => {
    var bytes = CryptoJS.AES.decrypt(textoCifrado, '12345678');
    var textoDescifrado = bytes.toString(CryptoJS.enc.Utf8);
    setTextoOriginal(textoDescifrado);
  }

  return (
    <div className="App" style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Cifrador y Descifrador AES</h2>

      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="textoPlano">Texto Plano: </label>
          <input
            id="textoPlano"
            type="text"
            value={textoPlano}
            onChange={(e) => setTextoPlano(e.target.value)}
            placeholder="Escribe el texto aquí..."
          />
        </div>
        <br />
        <button type="button" onClick={cifrar}>
          Cifrar
        </button>
        <p>
          <strong>Texto Cifrado:</strong> {textoCifrado}
        </p>
        <br />
        <button type="button" onClick={descifrar} disabled={!textoCifrado}>
          Descifrar
        </button>
        <p>
          <strong>Texto Original (Descifrado):</strong> {textoOriginal}
        </p>
      </form>
    </div>
  );
}
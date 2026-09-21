import React, { useState } from 'react';

export default function App() {
  const [query, setQuery] = useState('');
  const [digimon, setDigimon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    setDigimon(null);

    try {
      const response = await fetch(
        `https://digimon-api.vercel.app/api/digimon/name/${encodeURIComponent(query.trim())}`
      );
      if (!response.ok) {
        throw new Error('Digimon not found in the digital world!');
      }
      const data = await response.json();
      setDigimon(data[0]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={styles.container}>
      <h1>Digimon Finder</h1>
      <form onSubmit={handleSearch} style={styles.form}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., Agumon"
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Search</button>
      </form>

      {loading && <p>Scanning Digital World...</p>}
      {error && <p style={styles.error}>{error}</p>}

      {digimon && (
        <div style={styles.card}>
          <img src={digimon.img} alt={digimon.name} style={styles.image} />
          <h2>{digimon.name}</h2>
          <p style={styles.level}>Level: <span>{digimon.level}</span></p>
        </div>
      )}
    </main>
  );
}

const styles = {
  container: { fontFamily: 'sans-serif', textAlign: 'center', padding: '2rem' },
  form: { marginBottom: '1.5rem' },
  input: { padding: '8px 12px', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ccc' },
  button: { padding: '8px 16px', fontSize: '1rem', marginLeft: '8px', cursor: 'pointer' },
  card: { border: '1px solid #e0e0e0', borderRadius: '8px', padding: '1rem', display: 'inline-block', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' },
  image: { width: '200px', height: '200px', objectFit: 'contain' },
  level: { fontSize: '1.1rem', color: '#555' },
  error: { color: 'red' },
};
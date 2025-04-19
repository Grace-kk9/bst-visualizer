import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!input) {
      setError('Please enter a number');
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/api/search?value=${input}`);

      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setResult(data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Error connecting to backend.');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', fontFamily: 'Arial' }}>
      <h2>Binary Search Tree Visualizer 🌳</h2>

      <input
        type="number"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter a value"
        style={{ padding: '8px', fontSize: '16px', width: '80%' }}
      />
      <button
        onClick={handleSearch}
        style={{ padding: '8px 16px', marginLeft: '10px', fontSize: '16px' }}
      >
        Search
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {result && (
        <div style={{ marginTop: '20px', padding: '15px', background: '#f9f9f9', borderRadius: '8px' }}>
          <p>
            <strong>Status:</strong>{' '}
            {result.found ? (
              <span style={{ color: 'green' }}>✅ Found</span>
            ) : (
              <span style={{ color: 'red' }}>❌ Not Found</span>
            )}
          </p>
          <p>
            <strong>Path:</strong> {result.path.join(' → ')}
          </p>
          <p>
            <strong>Time Complexity:</strong> {result.bigO}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;

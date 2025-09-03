import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get('http://localhost:4000/search', {
        params: { q: query }
      });
      setResults(res.data);
    } catch (err) {
      console.error('Gagal mencari properti', err);
    }
  };

  const containerStyle = {
    maxWidth: '700px',
    margin: '40px auto',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: '0 20px',
  };

  const titleStyle = {
    fontSize: '32px',
    color: '#1e3a8a',
    fontWeight: '600',
    marginBottom: '24px',
    textAlign: 'center',
  };

  const formStyle = {
    display: 'flex',
    gap: '12px',
    marginBottom: '32px',
  };

  const inputStyle = {
    flex: '1',
    padding: '10px 14px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  const inputFocusStyle = {
    borderColor: '#3b82f6',
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#2980b9',
    color: 'white',
    fontSize: '16px',
    fontWeight: '50',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  };

  const buttonHoverStyle = {
    backgroundColor: '#2563eb',
  };

  const [inputFocused, setInputFocused] = React.useState(false);
  const [buttonHovered, setButtonHovered] = React.useState(false);

  const listStyle = {
    listStyle: 'none',
    paddingLeft: 0,
  };

  const itemStyle = {
    backgroundColor: '#ffffff',
    padding: '16px 20px',
    marginBottom: '12px',
    borderRadius: '12px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    transition: 'box-shadow 0.2s',
  };

  const itemHoverStyle = {
    boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
  };

  const linkStyle = {
    color: '#1e3a8a',
    fontWeight: '600',
    fontSize: '18px',
    textDecoration: 'none',
  };

  const addressStyle = {
    marginLeft: '6px',
    color: '#6b7280',
    fontWeight: '400',
  };

  const [hoveredIndex, setHoveredIndex] = React.useState(null);

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Cari Properti</h2>
      <form 
        style={formStyle} 
        onSubmit={handleSearch}
        autoComplete="off"
      >
        <input
          type="text"
          value={query}
          placeholder="Masukkan kata kunci..."
          onChange={e => setQuery(e.target.value)}
          style={{ 
            ...inputStyle, 
            ...(inputFocused ? inputFocusStyle : {}) 
          }}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
        />
        <button
          type="submit"
          style={{
            ...buttonStyle,
            ...(buttonHovered ? buttonHoverStyle : {})
          }}
          onMouseEnter={() => setButtonHovered(true)}
          onMouseLeave={() => setButtonHovered(false)}
        >
          Cari
        </button>
      </form>

      <ul style={listStyle}>
        {results.map((p, index) => (
          <li
            key={p.id_properti}
            style={{
              ...itemStyle,
              ...(hoveredIndex === index ? itemHoverStyle : {}),
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <Link to={`/properties/${p.id_properti}`} style={linkStyle}>
              {p.nama_properti}
            </Link>
            <span style={addressStyle}>— {p.alamat_properti}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Search;

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function PropertyList() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/properties')
      .then(res => setProperties(res.data))
      .catch(err => console.error('Gagal fetch data:', err));
  }, []);

  const pageStyle = {
    minHeight: '100vh',
    background: '#f9fafb',
    fontFamily: 'Segoe UI, Roboto, sans-serif',
  };  

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
  };

 const titleStyle = {
  textAlign: 'center',
  fontSize: '40px',
  fontWeight: '600',
  color: '#2c3e50',
  marginBottom: '30px',
  marginTop: '0',  // jadikan 0 supaya judul naik ke atas
};


  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '32px',
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    border: '1px solid #dcdfe3',
    borderRadius: '12px',
    padding: '24px',
    textDecoration: 'none',
    color: 'inherit',
    boxShadow: '0 3px 8px rgba(0, 0, 0, 0.03)',
    transition: 'all 0.25s ease',
    cursor: 'pointer',
  };

  const cardHoverStyle = {
    boxShadow: '0 10px 18px rgba(0, 0, 0, 0.06)',
    transform: 'translateY(-3px)',
    borderColor: '#2980b9',
  };

  const nameStyle = {
    fontSize: '22px',
    fontWeight: '600',
    color: '#34495e',
    marginBottom: '10px',
  };

  const addressStyle = {
    fontSize: '15px',
    color: '#7f8c8d',
    marginBottom: '20px',
  };

  const linkStyle = {
    display: 'inline-block',
    backgroundColor: '#2980b9',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '10px',
    fontSize: '14px',
    textAlign: 'center',
  };

  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <h1 style={titleStyle}>Properti Tersedia</h1>
        <div style={gridStyle}>
          {properties.map((p) => (
            <Link
              to={`/properties/${p.id_properti}`}
              key={p.id_properti}
              style={{
                ...cardStyle,
                ...(hoveredCard === p.id_properti ? cardHoverStyle : {}),
              }}
              onMouseEnter={() => setHoveredCard(p.id_properti)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <h2 style={nameStyle}>{p.nama_properti}</h2>
              <p style={addressStyle}>{p.alamat_properti}</p>
              <span style={linkStyle}>Lihat Detail</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PropertyList;

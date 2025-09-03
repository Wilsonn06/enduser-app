import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Wishlist({ idPengguna }) {  // idPengguna harus dikirim dari parent (misal hasil login)
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (!idPengguna) return;  // Jangan fetch kalau idPengguna belum tersedia

    axios.get(`http://localhost:4000/wishlist?id_pengguna=${idPengguna}`)
      .then(res => setWishlist(res.data))
      .catch(err => console.error('Gagal fetch wishlist', err));
  }, [idPengguna]);

  const containerStyle = {
    maxWidth: '900px',
    margin: '40px auto',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#fff',
    padding: '30px 40px',
    borderRadius: '12px',
    boxShadow: '0 4px 18px rgba(0,0,0,0.1)',
    color: '#rgb(0, 0, 0)',
  };

  const titleStyle = {
    fontSize: '32px',
    fontWeight: '700',
    color: '#rgb(0, 0, 0)',
    marginBottom: '30px',
    borderBottom: '3px solid #3b82f6',
    paddingBottom: '8px',
  };

  const emptyTextStyle = {
    fontSize: '18px',
    color: '#rgb(0, 0, 0)',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: '40px',
  };

  const listStyle = {
    listStyleType: 'disc',
    paddingLeft: '20px',
    color: '##rgb(0, 0, 0)',
    fontSize: '18px',
  };

  const listItemStyle = {
    marginBottom: '14px',
  };

  const propertyNameStyle = {
    fontWeight: '600',
    color: '##rgb(0, 0, 0)',
  };

  const propertyAddressStyle = {
    color: '##rgb(0, 0, 0)',
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Wishlist Saya</h2>
      {wishlist.length === 0 ? (
        <p style={emptyTextStyle}>Wishlist kosong.</p>
      ) : (
        <ul style={listStyle}>
          {wishlist.map(item => (
            <li key={item.id_wishlist} style={listItemStyle}>
              <span style={propertyNameStyle}>
                {item.properti?.nama_properti || 'Nama properti tidak tersedia'}
              </span> —{' '}
              <span style={propertyAddressStyle}>
                {item.properti?.alamat_properti || '-'}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Wishlist;

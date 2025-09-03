import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PropertyDetail({ id, idPengguna }) {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:4000/properties/${id}`)
      .then(res => setProperty(res.data))
      .catch(err => console.error('Gagal fetch detail properti', err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p style={{textAlign: 'center', marginTop: '40px', fontSize: '18px', color: '#555'}}>Loading...</p>;
  if (!property) return <p style={{textAlign: 'center', marginTop: '40px', fontSize: '18px', color: '#555'}}>Properti tidak ditemukan</p>;

  const containerStyle = {
    maxWidth: '900px',
    margin: '40px auto',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#fff',
    padding: '30px 40px',
    borderRadius: '12px',
    boxShadow: '0 4px 18px rgba(0,0,0,0.1)',
    color: '#1e293b',
  };

  const titleStyle = {
    fontSize: '36px',
    fontWeight: '700',
    color: '#rgb(0, 0, 0)',
    marginBottom: '20px',
    // marginTop: '10px',
  };

  const labelStyle = {
    fontWeight: '600',
    color: '#rgb(0, 0, 0)',
  };

  const textStyle = {
    marginBottom: '14px',
    lineHeight: 1.5,
    fontSize: '17px',
  };

  const sectionTitleStyle = {
    fontSize: '24px',
    fontWeight: '700',
    color: '#rgb(0, 0, 0)',
    marginTop: '40px',
    marginBottom: '18px',
    borderBottom: '2px solid rgb(0, 0, 0)',
    paddingBottom: '6px',
  };

  const listStyle = {
    listStyleType: 'disc',
    paddingLeft: '20px',
    color: '#475569',
    fontSize: '16px',
  };

  const listItemStyle = {
    marginBottom: '8px',
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>{property.nama_properti}</h2>

      <p style={textStyle}>
        <span style={labelStyle}>Alamat: </span>{property.alamat_properti}
      </p>

      <p style={textStyle}>
        <span style={labelStyle}>Tipe: </span>{property.tipe_properti}
      </p>

      <p style={textStyle}>
        <span style={labelStyle}>Deskripsi: </span>{property.deskripsi_properti}
      </p>

      <p style={textStyle}>
        <span style={labelStyle}>Nomor Telepon: </span>{property.telp_properti}
      </p>

      <h3 style={sectionTitleStyle}>Fasilitas</h3>
      <ul style={listStyle}>
        {property.fasilitas && property.fasilitas.length > 0 ? (
          property.fasilitas.map(f => (
            <li key={f.id_fasilitas} style={listItemStyle}>{f.nama_fasilitas}</li>
          ))
        ) : (
          <li style={listItemStyle}>Tidak ada fasilitas yang tersedia.</li>
        )}
      </ul>

      <h3 style={sectionTitleStyle}>Ulasan</h3>
      <ul style={listStyle}>
        {property.ulasan && property.ulasan.length > 0 ? (
          property.ulasan.map(u => (
            <li key={u.id_ulasan} style={listItemStyle}>{u.isi_ulasan}</li>
          ))
        ) : (
          <li style={listItemStyle}>Belum ada ulasan.</li>
        )}
      </ul>
    </div>
  );
}

export default PropertyDetail;

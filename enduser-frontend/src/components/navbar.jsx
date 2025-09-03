import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const navStyle = {
    backgroundColor: '#ffffff',
    padding: '16px 24px',
    // borderBottom: '1px solid #e5e7eb',
    marginBottom: '10px',
    fontFamily: 'Segoe UI, Roboto, sans-serif',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '30px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.03)',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#2c3e50',
    fontSize: '16px',
    fontWeight: '500',
    // padding: '8px 20px',
    borderRadius: '8px',
    transition: 'background 0.2s, color 0.2s',
  };

  const linkHoverStyle = {
    backgroundColor: '#ecf0f1',
    color: '#1f3a93',
  };

  const [hovered, setHovered] = useState(null);

  const links = [
    { to: '/', label: '🏠 Beranda' },
    { to: '/search', label: '🔍 Cari' },
    { to: '/wishlist', label: '❤️ Wishlist' },
  ];

  return (
    <nav style={navStyle}>
      {links.map((link, index) => (
        <Link
          key={index}
          to={link.to}
          style={{
            ...linkStyle,
            ...(hovered === index ? linkHoverStyle : {}),
          }}
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

export default Navbar;

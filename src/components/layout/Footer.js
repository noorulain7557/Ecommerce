import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  // Inline styles for easy integration and zero setup
  const footerStyles = {
    backgroundColor: '#1a1a1a',
    color: '#ffffff',
    padding: '2rem 1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderTop: '1px solid #333',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  }

  const headingStyles = {
    margin: '0 0 1rem 0',
    fontSize: '1.1rem',
    fontWeight: '500',
    letterSpacing: '0.5px'
  }

  const navStyles = {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
    margin: 0,
    fontSize: '0.9rem'
  }

  const linkStyles = {
    color: '#a3a3a3',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
  }

  const dividerStyles = {
    color: '#444'
  }

  // Quick hover effect handler
  const handleMouseEnter = (e) => e.target.style.color = '#3b82f6';
  const handleMouseLeave = (e) => e.target.style.color = '#a3a3a3';

  return (
    <div style={footerStyles}>
      <h4 style={headingStyles}>All Rights Reserved &copy; AMarketing</h4>
      <p style={navStyles}>
        <Link 
          to='/about' 
          style={linkStyles} 
          onMouseEnter={handleMouseEnter} 
          onMouseLeave={handleMouseLeave}
        >About</Link>
        <span style={dividerStyles}>|</span>
        
        <Link 
          to='/contact' 
          style={linkStyles} 
          onMouseEnter={handleMouseEnter} 
          onMouseLeave={handleMouseLeave}
        >Contact</Link>        
        
      </p>
    </div>
  )
}

export default Footer
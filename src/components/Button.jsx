import React from 'react';
import { Link } from 'react-router-dom';

export default function Button({ children, variant = 'primary', to, onClick, className = '' }) {
  const baseClass = `btn btn-${variant} ${className}`;
  
  if (to) {
    return (
      <Link to={to} className={baseClass} onClick={onClick}>
        {children}
      </Link>
    );
  }
  
  return (
    <button className={baseClass} onClick={onClick}>
      {children}
    </button>
  );
}

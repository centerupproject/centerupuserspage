import React from 'react';
import { useNavigate } from 'react-router-dom';
import './mainPrograms.css';

const MainPrograms = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/junior');
  };

  return (
    <div className="main-programs-grid">
      {[...Array(9)].map((_, index) => (
        <div
          key={index}
          className="program-card"
          onMouseEnter={(e) => e.currentTarget.classList.add('hover')}
          onMouseLeave={(e) => e.currentTarget.classList.remove('hover')}
          onClick={handleClick}
        >
          <div className="text">Membership</div>
        </div>
      ))}
    </div>
  );
};

export default MainPrograms;
// Achievements.js
import React from 'react';
import './Achievements.css';

const Achievements = ({ achievements }) => {
  return (
    <div className="achievements">
      {Object.entries(achievements).map(([type, count]) => (
        <div key={type} className="achievement">
          <div className="circle">{count}</div>
          <div className="type">{type}</div>
        </div>
      ))}
    </div>
  );
};

export default Achievements;

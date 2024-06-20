import React from 'react';
import data from './data';
import './card.css';

const CardList = ({ onCardClick }) => {
  const handleCardClick = (title, type) => {
    onCardClick(title, type);
  };

  return (
    <div className="card-container">
      {data.freshIdeas.map((idea, index) => (
        <div key={index} className="card" onClick={() => handleCardClick(idea.title, idea.type)}>
          <div className="title">{idea.title}</div>
          <div className="type">{idea.type}</div>
        </div>
      ))}
    </div>
  );
};

export default CardList;

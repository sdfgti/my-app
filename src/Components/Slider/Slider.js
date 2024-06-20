import React, { useState, useEffect } from 'react';
import './Slider.css';

const Slider = ({ cards, onCardClick, onCardRemove }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsContainerRef = React.useRef(null);

  useEffect(() => {
    console.log("Cards:", cards);
  }, [cards]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex >= cards.length ? 0 : nextIndex;
    });
    scrollCardsContainer();
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex - 1;
      return nextIndex < 0 ? cards.length - 1 : nextIndex;
    });
    scrollCardsContainer();
  };

  const scrollCardsContainer = () => {
    const cardWidth = cardsContainerRef.current.children[0].offsetWidth;
    const scrollDistance = currentIndex * cardWidth;
    cardsContainerRef.current.scrollLeft = scrollDistance;
  };

  const handleCardClick = (type, title, index) => {
    onCardClick(type, title);
    onCardRemove(index); // Remove the card from the slider
  };

  return (
    <div className="slider">
      <button onClick={handlePrev} className="slider-button prev" disabled={cards.length <= 1}>🠈</button>
      <div className="cards-container" ref={cardsContainerRef}>
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card slider-card ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleCardClick(card.type, card.title, index)}
          >
            <div className="title">{card.title}</div>
            <div className="type">{card.type}</div>
          </div>
        ))}
      </div>
      <button onClick={handleNext} className="slider-button next" disabled={cards.length <= 1}>🠊</button>
      <div className="slider-info">{currentIndex + 1}/{cards.length}</div>
    </div>
  );
};

export default Slider;

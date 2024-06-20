import React, { useState, useEffect } from 'react';
import './App.css';
import CardList from './Components/Card/CardList';
import Slider from './Components/Slider/Slider';
import Achievements from './Components/Achievements/Achievements';
import Table from './Components/Table/table';
import { getCards, addCard, deleteCard } from './api.js';

const initialAchievements = {
  Music: 0,
  Sport: 0,
  Education: 0,
  Relaxation: 0,
  Busywork: 0,
};

function App() {
  const [achievements, setAchievements] = useState(
    JSON.parse(localStorage.getItem('achievements')) || initialAchievements
  );

  const [tableData, setTableData] = useState(
    JSON.parse(localStorage.getItem('tableData')) || []
  );

  const [sliderCards, setSliderCards] = useState([]);

  const fetchData = async () => {
    const cards = await getCards();
    setSliderCards(cards);
  };

  const handleLoadFromDB = () => {
    fetchData();
  };

  const handleSaveToDB = async () => {
    // Example: Save achievements and table data to database
    console.log("Saving achievements to DB:", achievements);
    console.log("Saving table data to DB:", tableData);
  };

  const addToSlider = async (title, type) => {
    const newCard = { title, type };

    if (!sliderCards.some(card => card.title === title && card.type === type)) {
      const savedCard = await addCard(newCard);
      setSliderCards([...sliderCards, savedCard]);

      setAchievements(prevAchievements => ({
        ...prevAchievements,
        [type]: prevAchievements[type] + 1,
      }));
    } else {
      console.log("Карточка уже добавлена в слайдер:", newCard);
    }
  };

  const handleCardClickInSlider = (type, title) => {
    const addedAt = new Date().toISOString();
    setAchievements(prevAchievements => ({
      ...prevAchievements,
      [type]: prevAchievements[type] + 1,
    }));
    setTableData(prevData => [...prevData, { title, type, addedAt }]);
  };

  const handleCardRemove = async (index) => {
    const cardToRemove = sliderCards[index];
    await deleteCard(cardToRemove._id);
    setSliderCards(prevCards => prevCards.filter((_, i) => i !== index));
  };

  useEffect(() => {
    localStorage.setItem('achievements', JSON.stringify(achievements));
  }, [achievements]);

  useEffect(() => {
    localStorage.setItem('tableData', JSON.stringify(tableData));
  }, [tableData]);

  return (
    <div className="App">
    <div className="button-section">
      <button onClick={handleLoadFromDB}>Load data from database</button>
    </div>
    <h1>Choose new ideas to execute</h1>
    <div className="card-section">
      <CardList onCardClick={addToSlider} />
      <h1>Ideas in my list</h1>
      <Slider cards={sliderCards} onCardClick={(type, title) => {
        handleCardClickInSlider(type, title);
      }} onCardRemove={handleCardRemove} />
    </div>
    <h1>Achievements</h1>
    <Achievements achievements={achievements} />
    <h1>Completed tasks</h1>
    <hr className="dotted-line" />
    <Table tableData={tableData} />
  </div>
  
  );
}

export default App;

// Home.jsx
import React, { useEffect, useState } from "react";
import './home.css';
import { CardBordered } from '../../layouts/cardborded/cardbordered.js';
import { CardPrimary } from '../../layouts/cardprimary/cardprimary.js';

const Home = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
 const text = 'Center Up • ';
  const repeatedText = text.repeat(20)
  useEffect(() => {
    fetch("https://centerupui-default-rtdb.firebaseio.com/Home.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (!data) {
          setCards([]);
          setLoading(false);
          return;
        }
        // Convert Firebase object to array and include keys
        const cardsArray = Object.entries(data).map(([key, value]) => ({ key, ...value }));
        // Sort by Order ascending
        cardsArray.sort((a, b) => a.Order - b.Order);
        setCards(cardsArray);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading home page...</div>;

  return (
    <div className="home-page">
      <div className="home-page__background">
        <h1>Welcome to our big family</h1>
      </div>
      <div className="home-page__banner">
      <div className="home-page__banner-text">
        <span>{repeatedText}</span>
        <span>{repeatedText}</span> 
      </div>
    </div>
      <div className="home-page__cards">
        {cards.map((card, index) => {
          // Dynamically render component based on CardType
          switch (card.CardType) {
            case "CardBordered":
              return (
                <CardBordered
                  key={card.key}
                  title={card.title}
                  description={card.description}
                  image={card.image}
                  redirect={card.redirect}
                />
              );
            case "CardPrimary":
              return (
                <CardPrimary
                  key={card.key}
                  title={card.title}
                  description={card.description}
                  image={card.image}
                  redirect={card.redirect}
                />
              );
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default Home;
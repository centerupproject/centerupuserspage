import React, { useEffect, useState } from "react";
import './universities.css';

import { CardSplitRightImage } from '../../layouts/cardsplitright/cardsplitright.js';
import { CardSplitLeftImage } from '../../layouts/cardsplitleft/cardsplitleft.js';
import { HeadLine } from '../../layouts/headline/headline.js';
import { TextCard } from '../../layouts/textcard/TextCard.js';
import { WhiteButton } from '../../layouts/whitebutton/WhiteButton.js';

const Universities = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://centerupui-default-rtdb.firebaseio.com/Universities.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const cardsArray = Object.entries(data).map(([key, value]) => value);
        cardsArray.sort((a, b) => a.Order - b.Order);
        setCards(cardsArray);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading membership program...</div>;

  return (
    <div className="universities-page">
      <div className="universities-page__background">
        <h1 className="universities-page__title">International Universities</h1>
        <p className="universities-page__description">
        Center Up provides comprehensive guidance for students pursuing higher education abroad. From selecting the right university to securing a student visa, we support every step of the journey. Our personalized approach includes strategic planning, document preparation, application submission, interview training, and visa assistance. With expert support and a proven process, we help students gain admission to top universities in over 40 countries worldwide.
        </p>
      </div>

      <div className="universities-page__cards">
        {cards.map((card, index) => {
          switch (card.CardType) {
            case "CardSplitLeftImage":
              return (
                <CardSplitLeftImage
                  key={index}
                  title={card.title}
                  description={card.description}
                  image={card.image}
                />
              );
            case "CardSplitRightImage":
              return (
                <CardSplitRightImage
                  key={index}
                  title={card.title}
                  description={card.description}
                  image={card.image}
                />
              );
            case "HeadLine":
              return (
                <HeadLine
                  key={index}
                  title={card.title}
                  description={card.description}
                />
              );
            case "TextCard":
              return (
                <TextCard
                  key={index}
                  title={card.title}
                  description={card.description}
                />
              );
            case "WhiteButton":
              return (
                <WhiteButton
                  key={index}
                  text={card.text}
                  redirect={card.redirect}
                />
              );
              case "image":
              return (
                <img
                  src={card.image}
                  alt="img"
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

export default Universities;
import React, { useEffect, useState } from "react";
import './universities.css';

import { CardSplitRightImage } from '../../layouts/cardsplitright/cardsplitright.js';
import { CardSplitLeftImage } from '../../layouts/cardsplitleft/cardsplitleft.js';
import { HeadLine } from '../../layouts/headline/headline.js';
import { TextCard } from '../../layouts/textcard/TextCard.js';
import { WhiteButton } from '../../layouts/whitebutton/WhiteButton.js';
import { CardBordered } from '../../layouts/cardborded/cardbordered.js';

const Universities = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');

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

  if (loading) return <div>Loading universities program...</div>;

  return (
    <div className="universities-page">
      <div className="universities-page__background">
        <h1 className="universities-page__title">
          {language === 'am' ? 'Միջազգային Բուհեր' : 'International Universities'}
        </h1>
      </div>

      <div className="universities-page__cards">
        {cards.map((card, index) => {
          const title = language === 'am' && card.titleAm ? card.titleAm : card.title;
          const description = language === 'am' && card.descriptionAm ? card.descriptionAm : card.description;
          const text = language === 'am' && card.textAm ? card.textAm : card.text;

          switch (card.CardType) {
            case "CardSplitLeftImage":
              return (
                <CardSplitLeftImage
                  key={index}
                  title={title}
                  description={description}
                  image={card.image}
                />
              );
            case "CardSplitRightImage":
              return (
                <CardSplitRightImage
                  key={index}
                  title={title}
                  description={description}
                  image={card.image}
                />
              );
            case "CardBordered":
              return (
                <CardBordered
                  key={index}
                  title={title}
                  description={description}
                  image={card.image}
                />
              );
            case "HeadLine":
              return (
                <HeadLine
                  key={index}
                  title={title}
                  description={description}
                />
              );
            case "TextCard":
              return (
                <TextCard
                  key={index}
                  title={title}
                  description={description}
                />
              );
            case "WhiteButton":
              return (
                <WhiteButton
                  key={index}
                  text={text}
                  redirect={card.redirect}
                />
              );
            case "image":
              return (
                <img
                  key={index}
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
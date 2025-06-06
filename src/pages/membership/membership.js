import React, { useEffect, useState } from "react";
import './membership.css';

import { CardSplitRightImage } from '../../layouts/cardsplitright/cardsplitright.js';
import { CardSplitLeftImage } from '../../layouts/cardsplitleft/cardsplitleft.js';
import { HeadLine } from '../../layouts/headline/headline.js';
import { TextCard } from '../../layouts/textcard/TextCard.js';
import { WhiteButton } from '../../layouts/whitebutton/WhiteButton.js';
import { CardBordered } from '../../layouts/cardborded/cardbordered.js';

const Membership = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://centerupui-default-rtdb.firebaseio.com/Membership.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // data is an object with Firebase keys, convert to array
        const cardsArray = Object.entries(data).map(([key, value]) => value);
        // sort by Order ascending
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
    <div className="membership-page">
      <div className="membership-page__background">
        <h1 className="membership-page__title">Membership</h1>
        
      </div>

      <div className="membership-page__cards">
        {cards.map((card, index) => {
          // Dynamically render component based on CardType
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
              case "CardBordered":
              return (
                <CardBordered
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
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default Membership;

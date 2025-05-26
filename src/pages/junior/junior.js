import React, { useEffect, useState } from "react";
import './junior.css';
import { useLocation } from 'react-router-dom';

import { CardSplitRightImage } from '../../layouts/cardsplitright/cardsplitright.js';
import { CardSplitLeftImage } from '../../layouts/cardsplitleft/cardsplitleft.js';
import { HeadLine } from '../../layouts/headline/headline.js';
import { TextCard } from '../../layouts/textcard/TextCard.js';
import { WhiteButton } from '../../layouts/whitebutton/WhiteButton.js';

const Membership = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    
    fetch("https://centerupui-default-rtdb.firebaseio.com/Junior.json")
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
    <div className="junior-page">
      <div className="junior-page__background">
        <img src="/CUJuniorLogo.png"/>
        <p className="junior-page__description">
        Nemo enim ipsam voluptatem qmagni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro 
        </p>
      </div>

      <div className="junior-page__cards">
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
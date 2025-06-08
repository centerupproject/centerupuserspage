  import React, { useEffect, useState } from "react";
  import './aboutUs.css';

  import { CardSplitRightImage } from '../../layouts/cardsplitright/cardsplitright.js';
  import { CardSplitLeftImage } from '../../layouts/cardsplitleft/cardsplitleft.js';
  import { HeadLine } from '../../layouts/headline/headline.js';
  import { TextCard } from '../../layouts/textcard/TextCard.js';
  import { WhiteButton } from '../../layouts/whitebutton/WhiteButton.js';
  import  ProgresBar  from '../../components/progresBar/progresbar.js';
import MainPrograms from "../../components/mainPrograms/mainPrograms.js";
import MissionVission from "../../components/missionAndVision/missionAndVision.js";
import Partners from "../../components/partners/partners.js";

  const AboutUs = () => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetch("https://centerupui-default-rtdb.firebaseio.com/aboutUs.json")
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
      <div className="about-us">
        <div className="about-us__background">
          <h1 className="about-us__title">About Us</h1>
        </div>

        <div className="about-us__cards">
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
                case "ProgresBar":
                return (
                  <ProgresBar
                    data={card?.data}
                  />
                );
                case "MainPrograms":
                return (
                  <MainPrograms/>
                );
                case "MissionVission":
                  return (
                    <MissionVission/>
                  );
                  case "Partners":
                  return (
                    <Partners/>
                  );
                  
              default:
                return null;
            }
          })}
        </div>
      </div>
    );
  };

  export default AboutUs;
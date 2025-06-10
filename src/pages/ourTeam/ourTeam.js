import React, { useEffect, useState } from "react";
import './ourTeam.css';

import { CardSplitRightImage } from '../../layouts/cardsplitright/cardsplitright.js';
import { CardSplitLeftImage } from '../../layouts/cardsplitleft/cardsplitleft.js';
import { HeadLine } from '../../layouts/headline/headline.js';
import { TextCard } from '../../layouts/textcard/TextCard.js';
import { WhiteButton } from '../../layouts/whitebutton/WhiteButton.js';
import ProgresBar from '../../components/progresBar/progresbar.js';
import MainPrograms from "../../components/mainPrograms/mainPrograms.js";
import MissionVission from "../../components/missionAndVision/missionAndVision.js";
import Partners from "../../components/partners/partners.js";
import { CardsplitleftTeam } from "../../layouts/cardsplitleftTeam/cardsplitleftTeam.js";
import { CardsplitrightTeam } from "../../layouts/cardsplitrightTeam/cardsplitrightTeam.js";

const OurTeam = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');

  useEffect(() => {
    fetch("https://centerupui-default-rtdb.firebaseio.com/ourTeam.json")
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
        <h1 className="about-us__title"> {language === 'am' ? 'Մեր մասին' : 'Our Team'}</h1>
      </div>

      <div className="about-us__cards">
        {cards.map((card, index) => {
          switch (card.CardType) {
            case "CardSplitLeftImage":
              return (
                <CardSplitLeftImage
                  key={index}
                  title={language === 'am' && card.titleAm ? card.titleAm : card.title}
                  description={language === 'am' && card.descriptionAm ? card.descriptionAm : card.description}
                  image={card.image}
                />
              );
            case "CardSplitRightImage":
              return (
                <CardSplitRightImage
                  key={index}
                  title={language === 'am' && card.titleAm ? card.titleAm : card.title}
                  description={language === 'am' && card.descriptionAm ? card.descriptionAm : card.description}
                  image={card.image}
                />
              );
            case "HeadLine":
              return (
                <HeadLine
                  key={index}
                  title={language === 'am' && card.titleAm ? card.titleAm : card.title}
                  description={language === 'am' && card.descriptionAm ? card.descriptionAm : card.description}
                />
              );
            case "TextCard":
              return (
                <TextCard
                  key={index}
                  title={language === 'am' && card.titleAm ? card.titleAm : card.title}
                  description={language === 'am' && card.descriptionAm ? card.descriptionAm : card.description}
                />
              );
            case "WhiteButton":
              return (
                <WhiteButton
                  key={index}
                  text={language === 'am' && card.textAm ? card.textAm : card.text}
                  redirect={card.redirect}
                />
              );
            case "ProgresBar":
              return (
                <ProgresBar
                  key={index}
                  data={card?.data}
                />
              );
            case "MainPrograms":
              return (
                <MainPrograms
                  key={index}
                />
              );
            case "MissionVission":
              return (
                <MissionVission
                  key={index}
                />
              );
            case "Partners":
              return (
                <Partners
                  key={index}
                />
              );
            case "CardsplitleftTeam":
              return (
                <CardsplitleftTeam
                  key={index}
                  title={language === 'am' && card.titleAm ? card.titleAm : card.title}
                  description={language === 'am' && card.descriptionAm ? card.descriptionAm : card.description}
                  image={card.image}
                />
              );
            case "CardsplitrightTeam":
              return (
                <CardsplitrightTeam
                  key={index}
                  title={language === 'am' && card.titleAm ? card.titleAm : card.title}
                  description={language === 'am' && card.descriptionAm ? card.descriptionAm : card.description}
                  image={card.image}
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

export default OurTeam;
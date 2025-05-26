  import React, { useEffect, useState } from "react";
  import './membership.css';

  import { CardSplitRightImage } from '../../layouts/cardsplitright/cardsplitright.js';
  import { CardSplitLeftImage } from '../../layouts/cardsplitleft/cardsplitleft.js';
  import { HeadLine } from '../../layouts/headline/headline.js';
  import { TextCard } from '../../layouts/textcard/TextCard.js';
  import { WhiteButton } from '../../layouts/whitebutton/WhiteButton.js';

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
      <div className="membership-page">
        <div className="membership-page__background">
          <h1 className="membership-page__title">Membership</h1>
          <p className="membership-page__description">
            Nemo enim ipsam voluptatem qmagni dolores eos qui ratione voluptatem sequi nesciunt. 
            Neque porro quisquam est, qui dolorem. Nemo enim ipsam voluptatem quia voluptas sit aspernatur 
            aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. 
            Neque porro quisquam est, qui dolorem. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut 
            odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. 
            Neque porro quisquam est, qui dolorem.
          </p>
        </div>

        <div className="membership-page__cards">
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
              default:
                return null;
            }
          })}
        </div>
      </div>
    );
  };

  export default Membership;
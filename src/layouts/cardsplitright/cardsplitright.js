import './cardsplitright.css';
import { useNavigate } from 'react-router-dom';

export const CardSplitRightImage = ({ title, description, image, redirect }) => {
  const navigate = useNavigate();

  return (
    <div className="cardsplit__container">
      <div className="cardsplit__text">
        <h1>{title}</h1>
        <p dangerouslySetInnerHTML={{ __html: description }} />
      </div>
      <div className="cardsplit__image">
        <img src={image} alt={title} />
      </div>
    </div>
  );
};

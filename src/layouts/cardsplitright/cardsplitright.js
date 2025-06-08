import './cardsplitright.css';
import { useNavigate } from 'react-router-dom';

export const CardSplitRightImage = ({ title, description, image, redirect }) => {
  const navigate = useNavigate();

  return (
    <div className="CardSplitRightImage__container">
      <div className="CardSplitRightImage__text">
        <h1>{title}</h1>
        <p dangerouslySetInnerHTML={{ __html: description }} />
      </div>
      <div className="CardSplitRightImage__image">
        <img src={image} alt={title} />
      </div>
    </div>
  );
};

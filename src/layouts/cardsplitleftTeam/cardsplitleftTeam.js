import './cardsplitleftTeam.css';
import { useNavigate } from 'react-router-dom';

export const CardsplitleftTeam = ({ title, description, image, }) => {
  const navigate = useNavigate();

  return (
    <div className="cardsplitleftTeam__container cardsplitleftTeam__reverse">
      <div className="cardsplitleftTeam__image">
        <img src={image} alt={title} />
      </div>
      <div className="cardsplitleftTeam__text">
        <h1>{title}</h1>
        <p dangerouslySetInnerHTML={{ __html: description }} />
        </div>
    </div>
  );
};

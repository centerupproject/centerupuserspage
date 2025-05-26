import './cardsplitleft.css';
import { useNavigate } from 'react-router-dom';

export const CardSplitLeftImage = ({ title, description, image, }) => {
  const navigate = useNavigate();

  return (
    <div className="cardsplit__container cardsplit__reverse">
      <div className="cardsplit__image">
        <img src={image} alt={title} />
      </div>
      <div className="cardsplit__text">
        <h1>{title}</h1>
        <p dangerouslySetInnerHTML={{ __html: description }} />
        </div>
    </div>
  );
};

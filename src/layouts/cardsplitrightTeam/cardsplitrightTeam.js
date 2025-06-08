
import './cardsplitrightTeam.css';
import { useNavigate } from 'react-router-dom';

export const CardsplitrightTeam = ({ title, description, image, }) => {
  const navigate = useNavigate();

  return (
    <div className="cardsplitrightTeam__container cardsplitrightTeam__reverse">
      <div className="cardsplitrightTeam__text">
        <h1>{title}</h1>
        <p dangerouslySetInnerHTML={{ __html: description }} />
        </div>
        <div className="cardsplitrightTeam__image">
        <img src={image} alt={title} />
      </div>
    </div>
  );
};


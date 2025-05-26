import './cardbordered.css';
import { useNavigate } from 'react-router-dom';
import {WhiteButton} from '../whitebutton/WhiteButton'
export const CardBordered = ({ title, description, image, redirect }) => {
  const navigate = useNavigate();

  return (
    <div className='bordered__card'>
      <div className='bordered_card_background'>
        <img src={image} alt={title} />
      </div>
      <div className='bordered_card_info'>
        <h1 className='bordered_card_info--title'>{title}</h1>
        <p className='bordered_card_info--description'>{description}</p>
        <WhiteButton text="Learn More" redirect={redirect}/>
      </div>
    </div>
  );
};

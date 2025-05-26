import './cardprimary.css';
import { useNavigate } from 'react-router-dom';
import {BlueButton} from '../bluebutton/BlueButton'

export const CardPrimary = ({ title, description, image, redirect }) => {
  const navigate = useNavigate();

  return (
    <div className='primary__card'>
      <div className='primary_card_background'>
        <img src={image} alt={title} />
      </div>
      <div className='primary_card_info'>
        <h1 className='primary_card_info--title'>{title}</h1>
        <p className='primary_card_info--description'>{description}</p>
        <BlueButton text="Learn More" redirect={redirect}/>
      </div>
    </div>
  );
};

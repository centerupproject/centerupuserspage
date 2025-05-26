import { useNavigate } from 'react-router-dom';
import './WhiteButton.css'
export const WhiteButton = ({ text, redirect }) => {
    const navigate = useNavigate();

    return(
        <button 
          className='white__button'
          onClick={() => navigate(redirect)}
        >
          {text}
        </button>
    )
}
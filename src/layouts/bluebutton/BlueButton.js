import { useNavigate } from 'react-router-dom';
import './BlueButton.css'
export const BlueButton = ({ text, redirect }) => {
    const navigate = useNavigate();

    return(
        <button 
          className='blue__button'
          onClick={() => navigate(redirect)}
        >
          {text}
        </button>
    )
}
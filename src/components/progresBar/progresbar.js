import './progresbar.css'
const ProgresBar = ({ data }) => {
    return (
      <div className="progres-bar">
        <div className="progres-bar__cards">
          {data.map((item, index) => (
            <div key={index} className='progres-cards__card'>
              <span className='progres-bar__title'>{item.key}</span>
              <hr/>
              <span className='progres-values__value'>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default ProgresBar;
// home.js
import './home.css';
import { CardBordered } from '../../layouts/cardborded/cardbordered.js';
import { CardPrimary } from '../../layouts/cardprimary/cardprimary.js';

const Home = () => {
  return (
    <div className="home-page">
      <div className="home-page__background">
        <h1>Welcome to our big family</h1>
      </div>
      <div className="home-page__banner">
        <p>Center Up • Center Up • Center Up • Center Up • Center Up • Center Up •  Center Up • Center Up •  Center Up • Center Up •  Center Up • Center Up •</p>
      </div>
      <div className='home-page__cards'>
        <CardBordered 
          title="Membership" 
          description="Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem." 
          image="/home_card_image.png" 
          redirect="/membership" 
        />
        <CardPrimary 
          title="Center Up Junior" 
          description="Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem." 
          image="/home_card_image.png" 
          redirect="/junior" 
        />
        <CardBordered 
          title="International Universities" 
          description="Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem." 
          image="/home_card_image.png" 
          redirect="/universities" 
        />
        <CardPrimary 
          title="Upcoming Events" 
          description="Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem." 
          image="/home_card_image.png" 
          redirect="/UpComing" 
        />
      </div>
    </div>
  );
};

export default Home;

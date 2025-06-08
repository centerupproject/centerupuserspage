import './contactUs.css';

const ContactUs = () => {
  return (
    <div className='contact-us'>
      <div className='contact-us__form'>
        <div className='contact-us__form--info'>
          <h1 className='contact-us__form-title'>
            Get in <span>Touch</span>
          </h1>
          <p className='contact-us__form-desc'>
            For collaboration or other proposals,<br />
            feel free to contact us.
          </p>
        </div>

        <form className='contact-us__form--form'>
          <div className='form-group'>
            <input type="text" required placeholder="Name *" />
          </div>
          <div className='form-group'>
            <input type="email" required placeholder="Email *" />
          </div>
          <div className='form-group'>
            <input type="tel" required placeholder="Phone number *" />
          </div>
          <div className='form-group'>
            <textarea placeholder="Message"></textarea>
          </div>
          <div>
          <button type="submit" className='form-submit'>SEND</button>
          </div>
        </form>
      </div>

      <div className='contact-us__info'>
        <div>
        <h1>Social Media</h1>
        </div>
        <div className='contact-us__info--info'>
            <div className="contact-us__icons">
                <a href="https://www.instagram.com/center__up/?hl=en" target="_blank">
                <img src="/instacontact.png" />
                </a>
                <a href="https://www.instagram.com/center__up/?hl=en" target="_blank">
                <img src="/facebookcontact.png" />
                </a>
                <a href="https://www.instagram.com/center__up/?hl=en" target="_blank">
                <img src="/tgcontact.png" />
                </a>
                <a href="https://www.instagram.com/center__up/?hl=en" target="_blank">
                <img src="/licontact.png" />
                </a>
            </div>
        <div className='contact-us__info--numbers'>
            <div>
                <img src='/phonneenumber.png'/>
                <strong>Phone:</strong> +37477800031
            </div>
            <div>
                <img src='/emaiil.png'/>
                <strong>Email:</strong>info@centerup.org
            </div>
            <div>
                <img src='/mapp.png '/>
                <strong>Address: </strong>: Sayat-Nova 11/2
            </div>
        </div>
        </div>
        <div
    style={{
      width: '100%',
      height: '218px',
      borderRadius: '12px',
      overflow: 'hidden',
    }}
  >
    <iframe
      src="https://yandex.com/map-widget/v1/-/CHSqAAMg"
      frameBorder="0"
      style={{
        border: '0',
        borderRadius: '12px',
        width: '100%',
        height: '100%',
      }}
      allowFullScreen
      title="Yandex Map"
    ></iframe>
  </div>
      </div>
    </div>
  );
};

export default ContactUs;

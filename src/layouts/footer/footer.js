import './footer.css'

const Footer = () => {
  return (
    <div className="footer-block">
      <div className="footer-block__contact">
        <div>
          <img className="contact__logo" src="/phone.png" />
          <a href="tel:+37477800031" className="contact__link">
            <p className="contact__info">+37477800031</p>
          </a>
        </div>
        <div>
        <img className="contact__logo" src="/email.png" />
          <a href="mailto:info@centerup.org" className="contact__link">
            <p className="contact__info">info@centerup.org</p>
          </a>
        </div>
        <div>
        <img className="contact__logo" src="/location.png" />
          <a
            href="https://www.google.com/maps/search/?api=1&query=Sayat-Nova+11%2F2"
            target="_blank"
            rel="noopener noreferrer"
            className="contact__link"
          >
            <p className="contact__info">Sayat-Nova 11/2</p>
          </a>
        </div>
      </div>
      <div className="footer-block__logo">
        <div className="footer-block__logo__block">
          <img className="footer__logo" src="/footerlogo.png" />
          <p className="logo__info">© 2021–2025 Center Up Organization. This is my home...</p>
        </div>
      </div>
      <div className="footer-block__social">
        <a href="https://www.instagram.com/center__up/?hl=en" target="_blank">
          <img src="/insta.png" />
        </a>
        <a href="https://www.facebook.com/share/1BwYEKYwyq/?mibextid=wwXIfr" target="_blank">
          <img src="/facebook.png" />
        </a>
        <a href="https://t.me/centerup01" target="_blank">
          <img src="/tele.png" />
        </a>
        <a href="https://www.linkedin.com/company/center-up" target="_blank">
          <img src="/linkedin.png" />
        </a>
      </div>
    </div>
  )
}

export default Footer

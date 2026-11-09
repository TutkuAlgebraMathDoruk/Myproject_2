import React from "react";

const instaImages = [
  "/images/iteration-2-images/footer/insta/li-0.png",
  "/images/iteration-2-images/footer/insta/li-1.png",
  "/images/iteration-2-images/footer/insta/li-2.png",
  "/images/iteration-2-images/footer/insta/li-3.png",
  "/images/iteration-2-images/footer/insta/li-4.png",
  "/images/iteration-2-images/footer/insta/li-5.png",
];

const hotMenuItems = [
  "Terminal Pizza",
  "5 Kişilik Hackathlon Pizza",
  "useEffect Tavuklu Pizza",
  "Beyaz Console Frosty",
  "Testler Geçti Mutlu Burger",
  "Position Absolute Acı Burger",
];

export default function Footer() {
  return (
    <footer className="it2-footer">
      <div className="footer-container">
        <div className="footer-col">
          <img
            src="/images/iteration-2-images/footer/logo-footer.svg"
            alt="Teknolojik Yemekler Logo"
            className="footer-logo"
          />
          <address className="footer-contact">
            <div className="contact-item">
              <img
                src="/images/iteration-2-images/footer/icons/icon-1.png"
                alt="Adres ikonu"
              />
              <span>341 Londonderry Road, Istanbul Türkiye</span>
            </div>
            <div className="contact-item">
              <img
                src="/images/iteration-2-images/footer/icons/icon-2.png"
                alt="E-posta ikonu"
              />
              <span>aciktim@teknolojikyemekler.com</span>
            </div>
            <div className="contact-item">
              <img
                src="/images/iteration-2-images/footer/icons/icon-3.png"
                alt="Telefon ikonu"
              />
              <span>+90 216 123 45 67</span>
            </div>
          </address>
        </div>

        <nav className="footer-col" aria-label="Sıccacık Menüler">
          <h3 className="footer-title">Hot Menu</h3>
          <ul className="footer-menu-list">
            {hotMenuItems.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </nav>

        <div className="footer-col">
          <h3 className="footer-title">Instagram</h3>
          <div className="footer-insta-grid">
            {instaImages.map((src, idx) => (
              <img key={idx} src={src} alt={`Instagram paylaşımı ${idx + 1}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p>© 2023 Teknolojik Yemekler.</p>
          <span aria-label="Twitter">🐦</span>
        </div>
      </div>
    </footer>
  );
}
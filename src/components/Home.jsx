import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const navCategories = [
  { id: 1, name: "YENİ! Kore", icon: "/images/iteration-2-images/icons/1.svg" },
  { id: 2, name: "Pizza", icon: "/images/iteration-2-images/icons/2.svg" },
  { id: 3, name: "Burger", icon: "/images/iteration-2-images/icons/3.svg" },
  { id: 4, name: "Kızartmalar", icon: "/images/iteration-2-images/icons/4.svg" },
  { id: 5, name: "Fast food", icon: "/images/iteration-2-images/icons/5.svg" },
  { id: 6, name: "Gazlı İçecek", icon: "/images/iteration-2-images/icons/6.svg" },
];

const pillCategories = [
  { id: "ramen", name: "Ramen", icon: "/images/iteration-2-images/icons/1.svg" },
  { id: "pizza", name: "Pizza", icon: "/images/iteration-2-images/icons/2.svg" },
  { id: "burger", name: "Burger", icon: "/images/iteration-2-images/icons/3.svg" },
  { id: "fries", name: "French fries", icon: "/images/iteration-2-images/icons/4.svg" },
  { id: "fastfood", name: "Fast food", icon: "/images/iteration-2-images/icons/5.svg" },
  { id: "drinks", name: "Soft drinks", icon: "/images/iteration-2-images/icons/6.svg" },
];

const products = [
  {
    id: 1,
    name: "Terminal Pizza",
    rating: "4.9",
    reviews: "(200)",
    price: "60₺",
    img: "/images/iteration-2-images/pictures/food-1.png",
  },
  {
    id: 2,
    name: "Position Absolute Acı Pizza",
    rating: "4.9",
    reviews: "(928)",
    price: "85₺",
    img: "/images/iteration-2-images/pictures/food-2.png",
  },
  {
    id: 3,
    name: "useEffect Tavuklu Burger",
    rating: "4.9",
    reviews: "(462)",
    price: "75₺",
    img: "/images/iteration-2-images/pictures/food-3.png",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("pizza");

  const goToOrder = () => {
    navigate("/pizza");
  };

  return (
    <div className="it2-home-wrapper">
      {/* 1. HERO BANNER ALANI */}
      <section className="home-container">
        <header className="home-header">
          <img
            src="/images/iteration-1-images/logo.svg"
            alt="Teknolojik Yemekler"
            className="home-logo"
          />
        </header>

        <div className="home-hero">
          <p className="home-cursive">fırsatı kaçırma</p>
          <h1 className="home-title">
            KOD ACIKTIRIR <br /> PİZZA, DOYURUR
          </h1>
          <button
            type="button"
            onClick={goToOrder}
            className="home-btn"
            data-testid="aciktim-btn"
            aria-label="Sipariş sayfasına git"
          >
            ACIKTIM
          </button>
        </div>

        <div className="home-pizza-wrapper">
          <img
            src="/images/iteration-1-images/home-banner.png"
            alt="Lezzetli Pizza"
            className="home-pizza-img"
          />
        </div>
      </section>

      {/* 2. ÜST KATEGORİ ŞERİDİ */}
      <nav className="top-categories-bar" aria-label="Yemek Kategorileri">
        <ul className="top-categories-list">
          {navCategories.map((cat) => (
            <li key={cat.id} className="top-category-item">
              <img src={cat.icon} alt={cat.name} />
              <span>{cat.name}</span>
            </li>
          ))}
        </ul>
      </nav>

      {/* 3. ANA İÇERİK: KAMPANYA KARTLARI & VİTRİN */}
      <main className="home-main-section">
        <section className="cta-grid" aria-label="Kampanyalar">
          <article
            className="cta-card cta-large"
            style={{
              backgroundImage: "url('/images/iteration-2-images/cta/kart-1.png')",
            }}
          >
            <div className="cta-content">
              <h2>
                Özel <br /> Lezzetus
              </h2>
              <p>Position: Absolute Acı Burger</p>
              <button type="button" onClick={goToOrder} className="cta-order-btn">
                SİPARİŞ VER
              </button>
            </div>
          </article>

          <div className="cta-right-col">
            <article
              className="cta-card cta-small-dark"
              style={{
                backgroundImage: "url('/images/iteration-2-images/cta/kart-2.png')",
              }}
            >
              <div className="cta-content">
                <h3>
                  Hackathlon <br /> Burger Menü
                </h3>
                <button type="button" onClick={goToOrder} className="cta-order-btn">
                  SİPARİŞ VER
                </button>
              </div>
            </article>

            <article
              className="cta-card cta-small-light"
              style={{
                backgroundImage: "url('/images/iteration-2-images/cta/kart-3.png')",
              }}
            >
              <div className="cta-content">
                <h3>
                  <span className="red-text">Çoooook</span> hızlı <br /> npm gibi
                  kurye
                </h3>
                <button type="button" onClick={goToOrder} className="cta-order-btn">
                  SİPARİŞ VER
                </button>
              </div>
            </article>
          </div>
        </section>

        {/* 4. POPÜLER MENÜLER BAŞLIK & PILL BUTONLAR */}
        <section className="menu-showcase-section">
          <p className="showcase-cursive">en çok paketlenen menüler</p>
          <h2 className="showcase-title">Acıktıran Kodlara Doyuran Lezzetler</h2>

          <div className="pill-categories" role="tablist">
            {pillCategories.map((pill) => (
              <button
                key={pill.id}
                type="button"
                role="tab"
                aria-selected={activeTab === pill.id}
                className={`pill-btn ${activeTab === pill.id ? "active" : ""}`}
                onClick={() => setActiveTab(pill.id)}
              >
                <img src={pill.icon} alt={pill.name} />
                <span>{pill.name}</span>
              </button>
            ))}
          </div>

          {/* 5. ÜRÜN KARTLARI */}
          <div className="product-cards-grid">
            {products.map((item) => (
              <article
                key={item.id}
                className="product-card"
                onClick={goToOrder}
              >
                <img src={item.img} alt={item.name} className="product-img" />
                <h3 className="product-title">{item.name}</h3>
                <div className="product-meta">
                  <span>{item.rating}</span>
                  <span>{item.reviews}</span>
                  <strong className="product-price">{item.price}</strong>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
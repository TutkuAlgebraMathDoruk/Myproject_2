import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Üst Logo */}
      <header className="home-header">
        <img
          src="/images/iteration-1-images/logo.svg"
          alt="Teknolojik Yemekler"
          className="home-logo"
        />
      </header>

      {/* Başlık ve Buton */}
      <main className="home-hero">
        <h1 className="home-title">
          KOD ACIKTIRIR<br />PİZZA, DOYURUR
        </h1>
        <button
          className="home-btn"
          data-testid="order-button"
          onClick={() => navigate("/order")}
        >
          ACIKTIM
        </button>
      </main>

      {/* Alttaki Pizza Görseli */}
      <div className="home-pizza-wrapper">
        <img
          src="/images/iteration-1-images/home-banner.png"
          alt="Pizza Banner"
          className="home-pizza-img"
        />
      </div>
    </div>
  );
}
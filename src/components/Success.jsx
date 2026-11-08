import React from "react";
import { useNavigate } from "react-router-dom";

export default function Success({ lastOrder }) {
  const navigate = useNavigate();

  return (
    <div id="son_div" style={{ minHeight: "100vh", width: "100%", paddingBottom: "5rem" }}>
      <div className="sonyazi_1">
        <img
          src="/assets/iteration-1/logo.svg"
          alt="Teknolojik Yemekler Logo"
        />
      </div>

      <div id="son_paragraf">
        <span style={{ color: "#FDC913", fontSize: "1.5rem", fontFamily: "Barlow, sans-serif", marginBottom: "1rem" }}>
          lezzetin yolda
        </span>
        <h1 className="sonyazi_2" style={{ color: "#FFFFFF" }}>
          SİPARİŞ ALINDI
        </h1>
      </div>

      {lastOrder && (
        <div
          style={{
            maxWidth: "33.25rem",
            width: "90%",
            margin: "0 auto",
            backgroundColor: "#FAF7F2",
            padding: "2rem",
            borderRadius: "0.5rem",
            color: "#292929",
            fontFamily: "Barlow, sans-serif"
          }}
        >
          <h3 style={{ borderBottom: "1px solid #D9D9D9", paddingBottom: "0.5rem" }}>
            Position Absolute Acı Pizza
          </h3>
          <p><strong>Müşteri:</strong> {lastOrder.isim}</p>
          <p><strong>Boyut:</strong> {lastOrder.boyut}</p>
          <p><strong>Hamur:</strong> {lastOrder.hamur}</p>
          <p><strong>Ek Malzemeler:</strong> {lastOrder.malzemeler?.join(", ") || "Seçilmedi"}</p>
          {lastOrder.ozelNot && <p><strong>Not:</strong> {lastOrder.ozelNot}</p>}
          <p><strong>Adet:</strong> {lastOrder.adet}</p>
          <hr style={{ borderColor: "#D9D9D9", margin: "1rem 0" }} />
          <p style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#CE2829" }}>
            Toplam Tutar: {lastOrder.toplamFiyat?.toFixed(2)}₺
          </p>
        </div>
      )}

      <button
        className="btn-aciktir"
        onClick={() => navigate("/")}
        style={{ marginTop: "2rem", border: "none", padding: "0.8rem 2rem", cursor: "pointer" }}
      >
        Anasayfaya Dön
      </button>
    </div>
  );
}
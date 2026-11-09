import React from "react";
import { Link } from "react-router-dom";

export default function Success({ order }) {
  const boyut = order?.boyut || "L";
  const hamur = order?.hamur || "Süpper İnce";
  const malzemeler = order?.malzemeler || [
    "Pepperoni",
    "Sosis",
    "Mısır",
    "Ananas",
    "Jalepeno",
  ];
  const secimlerToplami = order?.secimlerToplami ?? 25.0;
  const genelToplam = order?.toplamFiyat ?? 110.5;

  return (
    <main id="son_div" className="success-page">
      <header className="sonyazi_1">
        <Link to="/" aria-label="Anasayfaya dön">
          <img
            src="/images/iteration-1-images/logo.svg"
            alt="Teknolojik Yemekler"
          />
        </Link>
      </header>

      <section id="son_paragraf" className="success-content">
        <p className="success-subtitle">lezzetin yolda</p>
        <h1 className="sonyazi_2">SİPARİŞ ALINDI</h1>

        <hr className="success-divider" />

        <h2 className="success-pizza-name">Position Absolute Acı Pizza</h2>

        <div className="success-details" data-testid="order-summary-details">
          <p>
            Boyut: <strong>{boyut}</strong>
          </p>
          <p>
            Hamur: <strong>{hamur}</strong>
          </p>
          <p>
            Ek Malzemeler: <strong>{malzemeler.join(", ")}</strong>
          </p>
          {order?.isim && (
            <p>
              Müşteri: <strong>{order.isim}</strong>
            </p>
          )}
          {order?.not && (
            <p>
              Sipariş Notu: <strong>{order.not}</strong>
            </p>
          )}
        </div>

        <aside className="success-summary-box" aria-label="Sipariş Toplam Özeti">
          <h3>Sipariş Toplamı</h3>
          <div className="summary-row">
            <span>Seçimler</span>
            <span>{Number(secimlerToplami).toFixed(2)}₺</span>
          </div>
          <div className="summary-row">
            <span>Toplam</span>
            <span>{Number(genelToplam).toFixed(2)}₺</span>
          </div>
        </aside>
      </section>
    </main>
  );
}
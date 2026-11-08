import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TOPPINGS = [
  "Pepperoni",
  "Sosis",
  "Kanada Jambonu",
  "Tavuk Izgara",
  "Soğan",
  "Domates",
  "Mısır",
  "Sucuk",
  "Jalepeno",
  "Sarımsak",
  "Biber",
  "Ananas",
  "Kabak"
];

const BASE_PRICE = 85.5;
const TOPPING_PRICE = 5;

export default function OrderPizza({ setLastOrder }) {
  const navigate = useNavigate();

  // Form State'leri
  const [size, setSize] = useState("");
  const [dough, setDough] = useState("");
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [count, setCount] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState(false);

  // Malzeme Ekleme/Çıkarma Kontrolü
  const handleToppingChange = (topping) => {
    if (selectedToppings.includes(topping)) {
      setSelectedToppings(selectedToppings.filter((t) => t !== topping));
    } else {
      if (selectedToppings.length < 10) {
        setSelectedToppings([...selectedToppings, topping]);
      }
    }
  };

  // Hesaplamalar
  const toppingsTotal = selectedToppings.length * TOPPING_PRICE;
  const grandTotal = (BASE_PRICE + toppingsTotal) * count;

  // Form Validasyonları
  const isNameValid = name.trim().length >= 3;
  const isToppingsValid = selectedToppings.length >= 4 && selectedToppings.length <= 10;
  const isSizeValid = size !== "";
  const isDoughValid = dough !== "";
  const isFormValid = isNameValid && isToppingsValid && isSizeValid && isDoughValid;

  // Submit İşlemi
  // Submit İşlemi
  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);

    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);

    const orderPayload = {
      isim: name.trim(),
      boyut: size,
      hamur: dough,
      malzemeler: selectedToppings,
      ozelNot: note.trim(),
      adet: count,
      ekMalzemeUcreti: toppingsTotal,
      toplamFiyat: grandTotal
    };

    try {
      const response = await axios.post(
        "https://reqres.in/api/pizza",
        orderPayload
      );

      if (setLastOrder) {
        setLastOrder(response.data);
      }
      navigate("/success");
    } catch (error) {
      console.warn("Reqres servisi yanıt vermedi, yerel veriyle devam ediliyor:", error);
      
      // Reqres API çökse veya hata verse bile siparişi başarılı kabul edip Success sayfasına aktarır:
      if (setLastOrder) {
        setLastOrder(orderPayload);
      }
      navigate("/success");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="ilksection">
      {/* Kırmızı Üst Banner Alanı */}
      <div className="mydiv">
        <div className="baslik_kapsayici">
          <div className="ilkbaslik">
            <img
              src="/assets/iteration-1/logo.svg"
              alt="Teknolojik Yemekler Logo"
              className="myimg_1"
            />
          </div>
          <div className="altbaslik_1">
            <span style={{ color: "#FAF7F2", fontSize: "1rem" }}>
              Anasayfa - <strong>Sipariş Oluştur</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Sipariş Form Alanı */}
      <form id="ikinci_pano" onSubmit={handleSubmit}>
        <div className="fiyat_panosu">
          <div id="baslik_3">Position Absolute Acı Pizza</div>
          <div id="fiyat_1">{BASE_PRICE.toFixed(2)}₺</div>
          <p className="paragraph_1">
            Frontent Dev olarak hala position:absolute kullanıyorsan bu pizza tam senlik. 
            Acı baharatları ve zengin malzemesiyle seni hızla kodlamaya döndürür.
          </p>
        </div>

        {/* Boyut ve Hamur Seçimi */}
        <div className="menu_1">
          <div className="radio_1">
            <div id="buttonbaslik_1">
              Boyut Seç <span className="ustyildiz">*</span>
            </div>
            <div className="dr">
              <label className="d_r">
                <input
                  type="radio"
                  name="size"
                  value="Küçük"
                  checked={size === "Küçük"}
                  onChange={(e) => setSize(e.target.value)}
                  data-testid="size-s"
                />
                S
              </label>
              <label className="d_r">
                <input
                  type="radio"
                  name="size"
                  value="Orta"
                  checked={size === "Orta"}
                  onChange={(e) => setSize(e.target.value)}
                  data-testid="size-m"
                />
                M
              </label>
              <label className="d_r">
                <input
                  type="radio"
                  name="size"
                  value="Büyük"
                  checked={size === "Büyük"}
                  onChange={(e) => setSize(e.target.value)}
                  data-testid="size-l"
                />
                L
              </label>
            </div>
          </div>

          <div className="optionbox">
            <div id="buttonbaslik_2">
              Hamur Seç <span className="ustyildiz">*</span>
            </div>
            <select
              value={dough}
              onChange={(e) => setDough(e.target.value)}
              data-testid="dough-select"
              style={{
                padding: "0.5rem",
                borderRadius: "0.375rem",
                borderColor: "#D9D9D9",
                fontFamily: "Barlow, sans-serif"
              }}
            >
              <option value="" disabled>
                -Hamur Kalınlığı Seç-
              </option>
              <option value="İnce">İnce Hamur</option>
              <option value="Normal">Normal Hamur</option>
              <option value="Kalın">Kalın Hamur</option>
            </select>
          </div>
        </div>

        {/* Ek Malzemeler */}
        <div id="icpano_1">
          <div className="ekpano">
            <div id="ekmalzeme">Ek Malzemeler</div>
            <div className="paragrafdiv">
              <span id="paragraph_2">
                En Fazla 10 malzeme seçebilirsiniz. 5₺
              </span>
            </div>
          </div>

          <div className="checkbox-formu">
            {TOPPINGS.map((topping) => (
              <div key={topping} className="checkbox_menu">
                <label className="mylabel">
                  <input
                    type="checkbox"
                    value={topping}
                    checked={selectedToppings.includes(topping)}
                    onChange={() => handleToppingChange(topping)}
                    data-testid={`topping-${topping}`}
                    style={{ marginRight: "0.5rem" }}
                  />
                  {topping}
                </label>
              </div>
            ))}
          </div>

          {touched && !isToppingsValid && (
            <span style={{ color: "#CE2829", fontSize: "0.875rem" }}>
              Lütfen en az 4, en fazla 10 malzeme seçiniz.
            </span>
          )}
        </div>

        {/* İsim ve Not Kutusu */}
        <div className="menu_5" style={{ width: "100%", marginTop: "2rem" }}>
          <div className="siparis">İsim *</div>
          <input
            type="text"
            className="not_kutusu"
            style={{ width: "100%", padding: "0.75rem", fontFamily: "Barlow, sans-serif" }}
            placeholder="En az 3 karakter giriniz"
            value={name}
            onChange={(e) => setName(e.target.value)}
            data-testid="name-input"
          />
          {touched && !isNameValid && (
            <span style={{ color: "#CE2829", fontSize: "0.875rem" }}>
              İsim en az 3 karakter olmalıdır.
            </span>
          )}

          <div className="siparis" style={{ marginTop: "1.5rem" }}>
            Sipariş Notu
          </div>
          <input
            type="text"
            className="not_kutusu"
            style={{ width: "100%", padding: "0.75rem", fontFamily: "Barlow, sans-serif" }}
            placeholder="Siparişine eklemek istediğin bir not var mı?"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            data-testid="note-input"
          />
        </div>

        {/* Sayaç ve Toplam Fiyat Panosu */}
        <div className="toplam_menusu">
          {/* Adet Sayacı */}
          <div className="arttirma_sayaci">
            <div
              id="birinci_sayac"
              onClick={() => setCount((prev) => Math.max(1, prev - 1))}
              data-testid="decrease-count"
            >
              <span className="syc">-</span>
            </div>
            <div id="ara_sayac" data-testid="order-count">
              <span className="syc">{count}</span>
            </div>
            <div
              id="ikinci_sayac"
              onClick={() => setCount((prev) => prev + 1)}
              data-testid="increase-count"
            >
              <span className="syc">+</span>
            </div>
          </div>

          {/* Sağ Toplam Kartı */}
          <div className="sag_menu">
            <div className="sag_toplam">
              <div id="siparis_toplam">Sipariş Toplamı</div>

              <div className="mykutu_3">
                <span id="secim_kutusu_2">Seçimler</span>
                <span className="secim_fiyat">{toppingsTotal.toFixed(2)}₺</span>
              </div>

              <div className="toplam_d">
                <span id="toplam_kutusu_3">Toplam</span>
                <span className="toplam_fiyati">{grandTotal.toFixed(2)}₺</span>
              </div>

              <button
                type="submit"
                id="siparis_butonu"
                disabled={!isFormValid || isSubmitting}
                data-testid="submit-button"
                style={{
                  border: "none",
                  padding: "1rem",
                  cursor: !isFormValid || isSubmitting ? "not-allowed" : "pointer",
                  fontFamily: "Barlow, sans-serif",
                  fontWeight: 600,
                  fontSize: "1.125rem",
                  color: "#292929"
                }}
              >
                {isSubmitting ? "GÖNDERİLİYOR..." : "SİPARİŞ VER"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
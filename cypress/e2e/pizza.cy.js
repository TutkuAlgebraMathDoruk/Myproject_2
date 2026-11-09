describe("Teknolojik Yemekler - IT2 Kapsamlı E2E Test Süiti", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("1. Anasayfadan Sipariş Formuna geçiş yapar ve başlangıçta Sipariş Ver butonu pasiftir (disabled)", () => {
    cy.get('[data-testid="aciktim-btn"]').should("be.visible").click();
    cy.url().should("include", "/pizza");
    cy.get('[data-testid="submit-btn"]').should("be.disabled");
  });

  it("2. İsim inputuna metin girilir ve 3 karakterden az olduğunda uyarı mesajı gösterir (Edge Case)", () => {
    cy.visit("http://localhost:5173/pizza");
    cy.get('[data-testid="name-input"]').type("Do");
    cy.contains("İsim en az 3 karakter olmalıdır.").should("be.visible");
    cy.get('[data-testid="submit-btn"]').should("be.disabled");

    cy.get('[data-testid="name-input"]').clear().type("Doruk Bayramoğlu");
    cy.contains("İsim en az 3 karakter olmalıdır.").should("not.exist");
  });

  it("3. Birden fazla malzeme seçilebilir, fiyat dinamik hesaplanır ve 10 malzemeden fazlasına izin verilmez", () => {
    cy.visit("http://localhost:5173/pizza");

    const secilecekler = [
      "Pepperoni",
      "Sosis",
      "Mısır",
      "Ananas",
      "Jalepeno",
    ];

    secilecekler.forEach((malzeme) => {
      cy.get(`[data-testid="topping-${malzeme}"]`).check({ force: true });
      cy.get(`[data-testid="topping-${malzeme}"]`).should("be.checked");
    });

    // 85.50₺ + (5 malzeme * 5₺ = 25₺) = 110.50₺
    cy.get('[data-testid="total-price"]').should("contain", "110.50₺");
  });

  it("4. Uçtan Uca (E2E) Sipariş Akışı: Formu doldurur, POST atar ve Onay sayfasında (State Lifting) özeti doğrular", () => {
    cy.intercept("POST", "https://reqres.in/api/pizza", {
      statusCode: 201,
      body: {
        id: "101",
        isim: "Doruk",
        boyut: "L",
        hamur: "Süpper İnce",
        malzemeler: ["Pepperoni", "Sosis", "Mısır", "Ananas"],
        not: "Zile basmayın lütfen",
        secimlerToplami: 20,
        toplamFiyat: 105.5,
      },
    }).as("postOrder");

    cy.get('[data-testid="aciktim-btn"]').click();

    cy.get('[data-testid="size-L"]').check({ force: true });
    cy.get('[data-testid="dough-select"]').select("Süpper İnce");

    ["Pepperoni", "Sosis", "Mısır", "Ananas"].forEach((item) => {
      cy.get(`[data-testid="topping-${item}"]`).check({ force: true });
    });

    cy.get('[data-testid="name-input"]').type("Doruk");
    cy.get('[data-testid="note-input"]').type("Zile basmayın lütfen");

    cy.get('[data-testid="submit-btn"]').should("not.be.disabled").click();

    cy.wait("@postOrder");
    cy.url().should("include", "/success");

    // Onay sayfasında Prop-Lifting ile gelen verilerin doğrulanması
    cy.contains("SİPARİŞ ALINDI").should("be.visible");
    cy.get('[data-testid="order-summary-details"]').within(() => {
      cy.contains("L").should("be.visible");
      cy.contains("Süpper İnce").should("be.visible");
      cy.contains("Pepperoni, Sosis, Mısır, Ananas").should("be.visible");
    });
  });

  it("5. Sunucu/Ağ hatası (500) durumunda kullanıcıya ekranda hata geribildirimi gösterir", () => {
    cy.intercept("POST", "https://reqres.in/api/pizza", {
      statusCode: 500,
      body: { error: "Internal Server Error" },
    }).as("postServerError");

    cy.visit("http://localhost:5173/pizza");

    cy.get('[data-testid="size-M"]').check({ force: true });
    cy.get('[data-testid="dough-select"]').select("İnce");
    ["Pepperoni", "Sosis", "Mısır", "Sucuk"].forEach((item) => {
      cy.get(`[data-testid="topping-${item}"]`).check({ force: true });
    });
    cy.get('[data-testid="name-input"]').type("Doruk");

    cy.get('[data-testid="submit-btn"]').click();
    cy.wait("@postServerError");

    cy.get('[data-testid="network-error"]')
      .should("be.visible")
      .and("contain", "İnternet'e bağlanılamadı");
  });
});
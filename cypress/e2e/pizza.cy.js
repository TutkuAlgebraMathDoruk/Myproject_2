describe("Teknolojik Yemekler - Pizza Sipariş Testleri", () => {
  beforeEach(() => {
    // Her testten önce sipariş sayfasına gidiyoruz
    cy.visit("http://localhost:5173/order");
  });

  // 1. Test: Inputa bir metin (isim) girilebilmesi
  it("İsim inputuna en az 3 karakterli geçerli bir isim yazılabilmeli", () => {
    cy.get('[data-testid="name-input"]')
      .should("be.visible")
      .type("Doruk Bayramoglu");

    cy.get('[data-testid="name-input"]').should("have.value", "Doruk Bayramoglu");
  });

  // 2. Test: Birden fazla malzeme (checkbox) seçilebilmesi
  it("En az 4, en fazla 10 adet malzeme seçilebilmeli", () => {
    cy.get('input[type="checkbox"]').check(
      ["Pepperoni", "Tavuk Izgara", "Mısır", "Ananas"],
      { force: true }
    );

    cy.get('input[type="checkbox"][value="Pepperoni"]').should("be.checked");
    cy.get('input[type="checkbox"][value="Tavuk Izgara"]').should("be.checked");
    cy.get('input[type="checkbox"][value="Mısır"]').should("be.checked");
    cy.get('input[type="checkbox"][value="Ananas"]').should("be.checked");
  });

  // 3. Test: Formun eksiksiz doldurulup başarıyla gönderilmesi (Submit)
  it("Form eksiksiz doldurulduğunda sipariş başarıyla gönderilmeli ve /success sayfasına yönlendirmeli", () => {
    // 1. Boyut seçimi (Radio)
    cy.get('[data-testid="size-s"]').check({ force: true });

    // 2. Hamur seçimi (Select)
    cy.get('[data-testid="dough-select"]').select("İnce");

    // 3. Malzeme seçimi (Checkbox - En az 4 tane)
    cy.get('input[type="checkbox"]').check(
      ["Pepperoni", "Sosis", "Mısır", "Jalepeno"],
      { force: true }
    );

    // 4. İsim girişi (En az 3 karakter)
    cy.get('[data-testid="name-input"]').type("Tutku Doruk");

    // 5. "SİPARİŞ VER" butonunun aktif olduğunu doğrula ve tıkla
    cy.get('[data-testid="submit-button"]')
      .should("not.be.disabled")
      .click();

    // 6. Başarılı gönderim sonrası /success sayfasına yönlendirildiğini doğrula
    cy.url().should("include", "/success");
  });
});
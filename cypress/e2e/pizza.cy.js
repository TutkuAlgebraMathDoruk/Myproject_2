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
  // 2. Test: Birden fazla malzeme seçilebilmesi ve maksimum 10 malzeme sınırının korunması
  it("En az 4, en fazla 10 adet malzeme seçilebilmeli (11. malzeme seçilememeli)", () => {
    const onMalzeme = [
      "Pepperoni",
      "Sosis",
      "Kanada Jambonu",
      "Tavuk Izgara",
      "Soğan",
      "Domates",
      "Mısır",
      "Sucuk",
      "Jalepeno",
      "Sarımsak"
    ];

    // 1. Önce tam 10 adet malzemeyi seçiyoruz
    cy.get('input[type="checkbox"]').check(onMalzeme, { force: true });

    // Seçilen 10 malzemenin gerçekten işaretlendiğini (toplam işaretli sayısının 10 olduğunu) doğrula
    cy.get('input[type="checkbox"]:checked').should("have.length", 10);

    // 2. Şimdi 11. malzemeyi ("Ananas") seçmeye çalışıyoruz
    // Not: Controlled input'ta React'in engellediğini görmek için .click() kullanıyoruz
    cy.get('input[type="checkbox"][value="Ananas"]').click({ force: true });

    // 3. DOĞRULAMA: 11. malzeme ("Ananas") İŞARETLENMEMİŞ olmalı!
    cy.get('input[type="checkbox"][value="Ananas"]').should("not.be.checked");

    // Ve toplam işaretli kutucuk sayısı hâlâ 10 kalmalı
    cy.get('input[type="checkbox"]:checked').should("have.length", 10);
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
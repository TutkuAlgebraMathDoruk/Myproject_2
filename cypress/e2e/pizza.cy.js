describe("Teknolojik Yemekler - Pizza Sipariş Testleri", () => {
  
  beforeEach(() => {
    // Her testten önce sipariş sayfasına direkt gidiyoruz
    cy.visit("http://localhost:5173/order"); // Port numaran farklıysa güncelleyebilirsin
  });

  // 1. Test: Inputa bir metin (isim) girilebilmesi ve hata kontrolü
  it("İsim inputuna en az 3 karakterli geçerli bir isim yazılabilmeli", () => {
    cy.get('[data-testid="name-input"]')
      .should("be.visible")
      .type("Doruk Bayramoglu");

    // İsim girildikten sonra inputun doğru değeri aldığını doğrula
    cy.get('[data-testid="name-input"]').should("have.value", "Doruk Bayramoglu");
  });

  // 2. Test: Birden fazla malzeme (checkbox) seçilebilmesi
  it("En az 4, en fazla 10 adet malzeme seçilebilmeli", () => {
    // En az 4 farklı malzeme seçelim (Örn: Pepperoni, Tavuk Izgara, Mısır, Ananas)
    cy.get('input[type="checkbox"]').check(["Pepperoni", "Tavuk Izgara", "Mısır", "Ananas"], { force: true });

    // Seçilen malzeme sayısının formda doğru yansıtıldığını veya checkbox'ların işaretlendiğini kontrol et
    cy.get('input[type="checkbox"][value="Pepperoni"]').should("be.checked");
    cy.get('input[type="checkbox"][value="Tavuk Izgara"]').should("be.checked");
    cy.get('input[type="checkbox"][value="Mısır"]').should("be.checked");
    cy.get('input[type="checkbox"][value="Ananas"]').should("be.checked");
  });

  // 3. Test: Formun eksiksiz doldurulup başarıyla gönderilmesi (Submit)
  it("Form eksiksiz doldurulduğunda sipariş başarıyla gönderilmeli ve /success sayfasına yönlendirmeli", () => {
    // 1. Boyut seçimi (Radio)
    cy.get('[data-testid="size-s"]').check();

    // 2. Hamur seçimi (Select)
    cy.get('select[name="dough"]').select("İnce");

    // 3. Malzeme seçimi (Checkbox - En az 4 tane)
    cy.get('input[type="checkbox"]').check(["Pepperoni", "Sosis", "Mısır", "Jalepeno"], { force: true });

    // 4. İsim girişi (En az 3 karakter)
    cy.get('[data-testid="name-input"]').type("Tutku Doruk");

    // 5. "SİPARİŞ VER" butonunun aktif olduğunu doğrula ve tıkla
    cy.get('button[id="order-button"]')
      .should("not.be.disabled")
      .click();

    // 6. Başarılı gönderim sonrası /success sayfasına yönlendirildiğini doğrula
    cy.url().should("include", "/success");
  });

});
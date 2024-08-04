context("Filter Hotel Search Use Case System Testing", () => {
  before(() => {
    cy.visit("http://localhost:5173/");
    //User navigate to home page
    cy.get(".react-datepicker__input-container > input")
      .first()
      .should("exist");
    cy.get(".react-datepicker__input-container > button").first().click();
    cy.get(".react-datepicker__input-container > button").last().click();

    //User select destination from dropdown
    cy.get('[data-testid="destination"]')
      .should("have.value", "Singapore")
      .click();
    cy.contains("li", "Singapore, Singapore").click();

    cy.get(".react-datepicker__input-container > input")
      .first()
      .click()
      .type("2025-08-10");
    cy.get(".react-datepicker__input-container > input")
      .last()
      .click()
      .type("2025-08-20");

    //User click on search button
    cy.get('[data-testid="submit-button"]').click();

    cy.url().should("include", "/hotels");
  });

  it("Filter Hotel Search Test Case", () => {
    cy.get("input[id='star-rating-input']").should("exist");

    //User select only five star hotels
    cy.get("input[id='star-rating-input']").first().check();
    cy.contains("button", "Apply Filters").click();
    cy.wait(2000);
    cy.get(".text-base .star")
      .should("have.length", 5)
      .each(($star) => {
        cy.wrap($star).should("have.class", "full");
      });

    //User reset the filters
    cy.contains("button", "Reset Filters").click();
    cy.get("input[id='star-rating-input']").first().should("not.be.checked");

    //User set 80 guest rating filter
    cy.get("input[id='guest-rating-input']").clear().type(80);
    cy.contains("button", "Apply Filters").click();
    cy.wait(2000);
    cy.get(".guest-rating").each(($rating) => {
      const rating = parseFloat($rating.text());
      expect(rating).to.be.at.least(80);
    });
  });
});

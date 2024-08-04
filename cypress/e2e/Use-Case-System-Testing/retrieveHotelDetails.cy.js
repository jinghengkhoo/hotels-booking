context("Retrieve Hotel Details Use Case System Testing", () => {
  before(() => {
    cy.visit("http://localhost:5173/");

    //User navigate to home page
    cy.get(".container").should("contain.text", "Travelust");
    cy.get(".react-datepicker__input-container > button").first().click();
    cy.get(".react-datepicker__input-container > button").last().click();

    //User select destination from dropdown
    cy.get('[data-testid="destination"]')
      .should("have.value", "Singapore")
      .click();
    cy.contains("li", "Singapore, Singapore").click();

    cy.get(".react-datepicker__input-container > input")
      .first()
      .type("2025-08-10");
    cy.get(".react-datepicker__input-container > input")
      .last()
      .type("2025-08-20");

    //User click on search button
    cy.get('[data-testid="submit-button"]').click();
    cy.url().should("include", "/hotels");
  });

  it("Retrieve Hotel Details System Test Case", () => {
    //User clicks on Hotel check availability
    cy.contains("button", "Check availability").should("exist");
    cy.contains("button", "Check availability").first().click();

    cy.url().should("include", "/pKtt");
  });
});

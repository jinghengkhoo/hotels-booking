context("Retrieve Hotel Results Use Case System Testing", () => {
  before(() => {
    cy.visit("http://localhost:5173/");
  });

  it("Retrieve Hotel Results System Test Case", () => {
    //User navigate to home page
    cy.get(".container").should("contain.text", "Travelust");

    cy.get('[data-testid="destination"]').should("exist");
    cy.get(".react-datepicker__input-container > input")
      .first()
      .should("exist");
    cy.get(".react-datepicker__input-container > button").first().click();
    cy.get(".react-datepicker__input-container > input").last().should("exist");
    cy.get(".react-datepicker__input-container > button").last().click();
    cy.get('[data-testid="submit-button"]').should("exist");

    //User select destination from dropdown
    cy.get('[data-testid="destination"]')
      .should("have.value", "Singapore")
      .click();
    cy.contains("li", "Singapore, Singapore").should("exist");
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
});

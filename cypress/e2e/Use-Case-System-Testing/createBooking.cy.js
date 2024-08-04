context("Create Booking Use Case System Testing", () => {
  beforeEach(() => {
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

    //User clicks on Hotel check availability
    cy.contains("button", "Check availability").first().click();
  });

  it("Create Booking System Test Case", () => {
    //User clicks on reserve button to navigate to booking page
    cy.contains("button", "Reserve").should("exist");
    cy.contains("button", "Reserve").first().click();

    cy.contains("div", "Your Booking Details").should("exist");
    cy.contains("div", "Your Price Summary").should("exist");

    //TODO: User enters guest information

    //TODO: User clicks on make booking button
  });
});

import { aboutMe, jobDescription } from "../../data/dummy";

describe("PrepareWithAi", () => {
  it("successfully loads", () => {
    cy.visit("http://localhost:3000");
  });

  it("generates data", () => {
    cy.visit("http://localhost:3000");
    cy.get('[data-testid="textarea1"]').as("textarea1");
    cy.get('[data-testid="textarea2"]').as("textarea2");

    cy.get("@textarea1").type(aboutMe);
    cy.get("@textarea1").should("have.value", aboutMe);

    cy.get("@textarea2").type(jobDescription);
    cy.get("@textarea2").should("have.value", jobDescription);

    cy.contains("span", "Fill in details about yourself and the job").should(
      "exist"
    );

    cy.get('[data-testid="submit-btn"]').click();
    cy.get('[data-testid="loading-indicator"]').should("exist");

    cy.contains("span", "Fill in details about yourself and the job").should(
      "not.exist"
    );
  });
});

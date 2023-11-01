describe('Register', () => {
  it('Register page should have a submit button', () => {
    cy.visit('/register');
    cy.get('button[type="submit"]').should('exist');
  });

  it('Register page should check user input is valid', () => {
    cy.visit('/register');
    cy.get('[data-test-id="email-input"]').type('testemail').should('have.value', 'testemail');

    cy.get('[data-test-id="password-input"]')
      .type('testpassword')
      .should('have.value', 'testpassword');
    cy.get('[data-test-id="confirm-password-input"]')
      .type('testpasswor')
      .should('have.value', 'testpasswor');

    cy.get('[data-test-id="email-error-message"]').should(
      'have.value',
      'This field must be a valid email'
    );

    cy.get('[data-test-id="confirm-error-message"]').should('have.value', 'Passwords must match.');
  });
});

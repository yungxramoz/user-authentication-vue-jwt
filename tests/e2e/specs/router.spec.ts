// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/login')
    cy.get('[data-cy="username-input"]').type('test')
    cy.get('[data-cy="password-input"]').type('test')
    cy.get('[data-cy="login-btn"]').click()
    cy.location('pathname').should('eq', '/users')
  })
})

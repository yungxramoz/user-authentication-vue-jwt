describe('Authentification', () => {
  it('successfully logs in and logs out', () => {
    cy.visit('/')
    cy.get('[data-cy="to-login-btn"]').click()
    cy.location('pathname').should('eq', '/login')

    cy.get('[data-cy="username-input"]').type('cytest')
    cy.get('[data-cy="password-input"]').type('cytest')
    cy.get('[data-cy="login-btn"]').click()
    cy.location('pathname').should('eq', '/users')

    cy.get('[data-cy="to-logout-btn"]').click()
    cy.location('pathname').should('eq', '/')
  })
})

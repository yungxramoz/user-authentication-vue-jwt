describe('Authentification', () => {
  it('successfully logs in and logs out', () => {
    cy.visit('/')
    cy.get('[data-cy="to-login-btn"]').click()
    cy.location('pathname').should('eq', '/login')

    cy.get('[data-cy="username-input"]').type('cytest')
    cy.get('[data-cy="password-input"]').type('cytest')
    cy.get('[data-cy="login-btn"]').click()

    //we have to wait because here data have to be fetched from the api
    cy.location('pathname', { timeout: 60000 }).should('eq', '/users')

    // first we cancel the confirm dialog
    cy.get('[data-cy="logout-btn"]').click()
    cy.get('[data-cy="cancel-logout-btn"]').click()

    // then we confirm the logout
    cy.get('[data-cy="logout-btn"]').click()
    cy.get('[data-cy="to-logout-btn"]').click()

    //wait for the fake loader to be completed (1500)
    cy.location('pathname', { timeout: 2000 }).should('eq', '/')
  })
})

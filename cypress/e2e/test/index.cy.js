describe('My First Test', () => {
  it('Visits Homepage', () => {
    cy.visit('/')
  })

  it('Can visit the cart', () => {
    cy.visit('/checkout/cart')

    cy.contains('You have no items in your shopping cart.').should('be.visibile');
  })
})

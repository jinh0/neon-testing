Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

describe('select: syllable', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/edit/test.jsonld')

    // SVG should be visible
    cy.get('#mei_output', { timeout: 5000 }).should('be.visible');

    cy.get('#selBySyllable')
      .click()
      .should('have.class', 'is-active')
  })

  it('Select the first syllable', () => {
    cy.get('.syllable').first().click(1, 1, { timeout: 100, force: true })
      .should('have.class', 'selected')
      .should('have.css', 'fill')
      .and('eq', 'rgb(221, 0, 0)')

    cy.get('#svg_group').find('.resizePoint').should('have.length', 0)
  })
})

describe('select: staff', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/edit/test.jsonld')

    cy.get('#selByStaff')
      .click()
      .should('have.class', 'is-active')
  })

  // it('Select the first staff', () => {
  //   cy.get('.staff')
  //     .first()
  //     .click(5, 5, { timeout: 100, force: true })
  //     .should('have.class', 'selected')
  //     .get('.syllable, .clef, .accid, .divLine')
  //     .should('have.class', 'highlighted')

  //   // Resize points should be shown
  //   cy.get('#svg_group').find('.resizePoint').should('have.length', 8)
  // })

  it('Select a random staff', () => {
    const staffId = '#m-45c80f7c-bdd9-489e-9256-15038dc32b51'

    cy.get(staffId)
      .click(5, 5, { timeout: 100, force: true })
      .should('have.class', 'selected')
      .within(() => {
        cy.get('.syllable, .clef, .accid')
          .should('have.class', 'highlighted')
          .and('have.css', 'fill')
          .and('eq', 'rgb(221, 0, 0)')
      })

    cy.get('#svg_group').find('.resizePoint').should('have.length', 8)
  })
})

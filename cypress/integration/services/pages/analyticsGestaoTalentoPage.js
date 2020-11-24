const url = '/cargosalario/historicoColaborador/painelIndicadores.action'
const cotas = '#aba2'

export class AnalyticsGestaoTalentosPage {
    navigate() {
        cy.visit(url)
    }

    validaDispensaCotasAprendiz() {
        cy.get(cotas).click()
        cy.get('.cotaAprendiz')
            .within(($cotas) => {
                cy.get('.cota-atingida')
                    .should('not.exist')
            })
    }

    validaCotasAprendiz() {
        cy.get(cotas).click()
        cy.get('.cotaAprendiz')
            .within(($cotas) => {
                cy.get('.cota-atingida')
                    .should('be.visible')
            })
    }

}

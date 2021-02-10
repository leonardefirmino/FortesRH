import * as util from '../../../support/util'

const url = '/cargosalario/historicoColaborador/painelIndicadores.action'
const cotas = '#aba2'

export class AnalyticsGestaoTalentosPage {
    navigate() {
        cy.visit(url)
        util.continuarButton()
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

    validaCotaDeficiente() {
        cy.get(cotas).click()
        cy.get('.cotaDeficiencia')
            .within(($cotas) => {
                cy.get('.cota-atingida')
                    .should('be.visible')
            })
    }

    validaCotaDeficienteNaoAtingida() {
        cy.get(cotas).click()
        cy.get('.multa')
            .within(($multa) => {
                cy.get('.valor')
                    .should('include.text', 'R$ 8.222,58')
            })
    }



}

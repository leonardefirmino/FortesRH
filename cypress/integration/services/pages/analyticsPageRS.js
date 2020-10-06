
import * as util from '../../../support/util'

export class AnalyticsPage {

    navigateAnalyticsReS() {
        cy.visit('/indicador/duracaoPreenchimentoVaga/painel.action')
    }

    acessaAbaInfoGerais() {
        cy.get('#aba1').click()
        cy.get('#labelLink').click()
        cy.get('#dataDe').clear().type('01/01/2020')
        cy.get('#btnPesquisar').click()
    }

    validaCargoSolicitacao() {
        cy.get('#faixa').within(($form) => {
            cy.contains('Cargo Teste Faixa_Nome')
        })
    }

    validaVagas(){
        this.acessaAbaInfoGerais()
        cy.get('.cell-title').should('contain', 'Vagas Disponíveis (total: 10)')
        this.validaCargoSolicitacao()
    }



}

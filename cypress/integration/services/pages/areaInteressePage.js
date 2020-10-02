import '../../../support/util'
import * as util from '../../../support/util'

export class AreaInteressePage {

    navigate() {
        cy.visit('/geral/areaInteresse/list.action')
    }

    clicaInserir() {
        cy.get('#btnInserir').click()
    }

    preencheAreaInteresse() {
        cy.get('#nome').should('be.empty')
        cy.get('#nome').focus().clear().type('Área de Interesse')
        cy.get('#mt').click()
    }

    clicaGravar() {
        cy.get('#btnGravar').click()
    }

    insereAreaInteresse() {
        this.clicaInserir()
        this.preencheAreaInteresse()
        this.clicaGravar()
    }
 
    editarAreaInteresse(acao, etapa) {
        util.acao(acao, etapa)
        this.preencheAreaInteresse()
        this.clicaGravar()
    }

    excluirAreaInteresse(acao, etapa) {
        util.acao(acao, etapa)
    }



}
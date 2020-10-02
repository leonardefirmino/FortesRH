import '../../../support/util'
import * as util from '../../../support/util'

export class AreaFormacaoPage {

    navigate() {
        cy.visit('/geral/areaFormacao/list.action')
    }

    clicaInserir() {
        cy.get('#btnInserir').click()
    }

    clicaGravar() {
        cy.get('#btnGravar').click()
    }

    preencheAreaFormacao() {
        cy.get('#nome').clear().type('Área de Formação Teste')
        this.clicaGravar()
    }

    insereAreaFormacao() {
        this.clicaInserir()
        this.preencheAreaFormacao()
    }
 
    editarAreaFormacao(acao, etapa) {
        util.acao(acao, etapa)
        this.preencheAreaFormacao()
    }

    excluirAreaFormacao(acao, etapa) {
        util.acao(acao, etapa)
    }



}
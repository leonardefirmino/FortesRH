
import * as util from '../../../support/util'

export class IndicePage {

    navigate() {
        cy.visit('/cargosalario/indice/list.action')
    }

    clicaInserir() {
        cy.get('#btnInserir').click()
    }

    clicaGravar() {
        cy.get('#btnGravar').click()
    }

    nomeIndice() {
        cy.get('#nome').clear().type('Índice Salário Família')
    }

    dataHistorico(text) {
        cy.get('#dataHist').clear().type('01/01/2020')
    }

    valorIndice() {
        cy.get('#valor').clear().type('1000')
    }

    preencheIndice(text) {
        this.clicaInserir()

        if (text == null) {
            this.nomeIndice()
            this.dataHistorico()
            this.valorIndice()
        } else {
        }
        this.clicaGravar()
    }

    preencheHistoricoIndice(text) {        
        util.acao('Editar', 'Indice Teste')
        this.clicaInserir()

        if (text == null) {
            this.dataHistorico()
            this.valorIndice()
        } else {
        }
        this.clicaGravar()
        this.clicaGravar()
    }

    editarIndice(acao, area_nome) {
        util.acao(acao, area_nome)
        this.nomeIndice()
        this.clicaGravar()
    }

    excluirIndice(acao, area_nome) {
        util.acao(acao, area_nome)
    }



}
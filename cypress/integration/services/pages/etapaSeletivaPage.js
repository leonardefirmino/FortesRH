import * as util from '../../../support/util'

export class EtapaSeletivaPage {

    navigate() {
        cy.visit('/captacao/etapaSeletiva/list.action')
    }

    clicaInserir() {
        cy.get('#btnInserir').click()
    }

    acao(acao, etapa) {
        cy.acao_new(acao, etapa)
    }

    preencheEtapaSeletiva() {
        cy.get('#ordem').should('not.be.null')
        cy.get('#nome').focus().clear().type('Etapa de Recrutamento')
    }

    clicaGravar() {
        cy.get('#btnGravar').click()
    }

    insereEtapaSeletiva() {
        this.clicaInserir()
        this.preencheEtapaSeletiva()
        this.clicaGravar()
    }

    editarEtapaSeletiva(acao, etapa) {
        util.acao(acao, etapa)
        this.preencheEtapaSeletiva()
        this.clicaGravar()
    }

    excluirEtapaSeletiva(acao, etapa) {
        util.acao(acao, etapa)
    }

    

}
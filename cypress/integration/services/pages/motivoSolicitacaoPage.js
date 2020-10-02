
import * as util from '../../../support/util'
export class MotivoSolicitacaoPage {

    navigate() {
        cy.visit('/captacao/motivoSolicitacao/list.action')
    }

    clicaInserir() {
        cy.get('#btnInserir').click()
    }

    preencheMotivo() {
        cy.get('#descricao').focus().clear().type('Aumento de Quadro')
    }

    clicaGravar() {
        cy.get('#btnGravar').click()
    }

    insereMotivoSolicitacao() {
        this.clicaInserir()
        this.preencheMotivo()
        this.clicaGravar()
    }

    editarMotivo(acao, etapa) {
        util.acao(acao, etapa)
        this.preencheMotivo()
        this.clicaGravar()
    }

    excluirMotivo(acao, etapa) {
        util.acao(acao, etapa)
    }

    

}
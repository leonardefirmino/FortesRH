
import * as util from '../../../support/util'
export class ModeloAvaliacaoCandidatoPage {

    navigate() {
        cy.visit('/avaliacao/modeloCandidato/list.action?modeloAvaliacao=S')
    }

    clicaInserir() {
        cy.get('.btnInserir').click()
    }


    preencheModeloAval() {
        cy.get('#titulo').focus().clear().type('Modelo de Avaliação de Candidato')
    }

    clicaGravar() {
        cy.get('.btnGravar').click()
    }

    clicaClonar(){
        cy.get('.btnClonar').click()
    }

    inserirPerguntas(){
        cy.get('#pergunta').focus().clear().type('Pergunta')
    }

    selecionaTipoPergunta(tipo) {
        cy.get('#tipo').select(tipo)
    }

    acao(acao, text){        
        util.acao_old(acao, text)
    }

    insereModeloAvaliacao() {
        this.clicaInserir()
        this.preencheModeloAval()
        cy.get('.btnAvancar').click()
        this.inserirPerguntas()
        this.selecionaTipoPergunta('Nota')
        this.clicaGravar()
    }

    editarMotivo(acao, text) {
        this.acao(acao, text)
        this.clicaGravar()
    }

    excluirMotivo(acao, text) {
        this.acao(acao, text)
    }

    

}
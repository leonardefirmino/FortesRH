import * as util from '../../../support/util'

const url = '/avaliacao/desempenho/avaliacaoDesempenhoQuestionarioList.action'
const avaliacao = '#select2-avaliacao-container'
const avaliador = '#avaliador'
const situacao = '#avaliacaoDesempenhoQuestionarioList_respondida'
const link = '#labelLink'
const pesquisar = '.flat'
const gravar = '#btnGravar'


export class ResponderAvaliacaoDesempenhoPage {

    navigate() {
        cy.visit(url)
        util.continuarButton()
    }

    responder() {
        cy.get(link).click()
        cy.get(avaliador).select('Helena de Troia')
        cy.get(situacao).select('Não respondidas')
        cy.get(pesquisar).click()
        util.acao('Responder', 'Helena de Troia')
        cy.get('#responderAvaliacaoDesempenho_perguntas_0__colaboradorRespostas_0__valor').select('8')
        cy.get(gravar).click()
    }

    excluirResposta() {
        cy.get(situacao).select('Respondidas')
        cy.get(pesquisar).click()
        util.acao('Excluir respostas', 'Helena de Troia')
    }
}

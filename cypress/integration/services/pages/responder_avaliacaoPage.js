import * as util from '../../../support/util'

const url = '/avaliacao/desempenho/avaliacaoDesempenhoQuestionarioList.action'
const avaliacao = 'select2-avaliacao-container'
const avaliador = 'avaliador'
const situacao = 'avaliacaoDesempenhoQuestionarioList_respondida'


export class ResponderAvaliacaoDesempenhoPage {

    navigate() {
        cy.visit(url)
    }
}

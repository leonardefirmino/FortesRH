import * as util from '../../../support/util'

//MAPEAMENTO DOS ELEMENTOS DA TELA
const url = '/captacao/etapaSeletiva/list.action'
const inserir = '#btnInserir'
const gravar = '#btnGravar'
const ordem = '#ordem'
const descricao = '#nome'
const dataHistorico = '#dataHist'
const valorIndice = '#valor'

export class EtapaSeletivaPage {

    navigate() {
        cy.visit(url)
    }

    inserir(etapaSeletiva) {
        cy.get(inserir).click()
        cy.get(ordem).should('not.be.null')
        cy.get(descricao).focus().clear().type(etapaSeletiva.Descricao2)
        cy.get('#analiseComportamental').should('be.visible').click()
        cy.get(gravar).click()
    }

    editar(etapaSeletiva) {
        util.acao('Editar', etapaSeletiva.Descricao)
        cy.get(descricao).focus().clear().type(etapaSeletiva.Descricao2)
        cy.get(gravar).click()
    }

    excluir(etapaSeletiva) {
        util.acao('Excluir', etapaSeletiva.Descricao)
    }
}
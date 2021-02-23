import * as util from '../../../support/util'

const url = '/geral/areaFormacao/list.action'
const inserir = '#btnInserir'
const gravar = '#btnGravar'
const descricao = '#nome'

export class AreaFormacaoPage {

    navigate() {
        cy.visit(url)
        util.continuarButton()
    }

    inserir(area) {
        cy.get(inserir).click()
        cy.get(descricao).clear().type(area.Nome)
        cy.get(gravar).click()
    }

    editar(area){
        util.acao('Editar', area)
        cy.get(descricao).clear().type(area)
        cy.get(gravar).click()
    }

    excluir(area) {
        util.acao('Excluir', area)
    }
}
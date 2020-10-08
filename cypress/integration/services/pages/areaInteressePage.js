import * as util from '../../../support/util'

const url = '/geral/areaInteresse/list.action'
const inserir = '#btnInserir'
const gravar = '#btnGravar'
const descricao = '#nome'
const marcaAreasOrgan = '#mt'

export class AreaInteressePage {

    navigate() {
        cy.visit(url)
    }

    inserir(areaInteresse) {
        cy.get(inserir).click()
        cy.get(descricao).focus().clear().type(areaInteresse.Area)
        cy.get(marcaAreasOrgan).click()
        cy.get(gravar).click()
    }
 
    editar(areaInteresse) {
        util.acao('Editar', areaInteresse.Nome)
        cy.get(marcaAreasOrgan).click()
        cy.get(gravar).click()
    }

    excluir(areaInteresse) {
        util.acao('Excluir', areaInteresse.Nome)
    }
}
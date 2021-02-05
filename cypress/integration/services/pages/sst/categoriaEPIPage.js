import * as util from '../../../../support/util'

const url = '/sesmt/tipoEPI/list.action'
const inserir = '#btnInserir'
const nomeCategoriaEPI = '#nome'
const gravar = '#btnGravar'

export class CategoriaEPIPage {
    navigate() {
        cy.visit(url)
    }

    inserir(categoriaEPI) {
        cy.get(inserir).click()
        cy.get(nomeCategoriaEPI).clear().type(categoriaEPI.Nome)
        cy.get(gravar).click()
    }

    editar(categoriaEPI) {
        util.acao('Editar', categoriaEPI.Nome)
        cy.get(nomeCategoriaEPI).clear().type(categoriaEPI.Nome)
        cy.get(gravar).click()
    }

    excluir(categoriaEPI) {
        util.acao('Excluir', categoriaEPI.Nome)
    }
}
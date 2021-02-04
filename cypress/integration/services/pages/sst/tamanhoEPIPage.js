import * as util from '../../../../support/util'

const url = '/sesmt/tamanhoEPI/list.action'
const inserir = '#btnInserir'
const nomeTamanhoEPI = '#descricao'
const gravar = '#btnGravar'

export class TamanhoEPIPage {
    navigate() {
        cy.visit(url)
    }

    inserir(tamanhoEPI) {
        cy.get(inserir).click()
        cy.get(nomeTamanhoEPI).clear().type(tamanhoEPI.Nome)
        cy.get(gravar).click()
    }

    editar(tamanhoEPI) {
        util.acao('Editar', tamanhoEPI.Nome)
        cy.get(nomeTamanhoEPI).clear().type(tamanhoEPI.Nome)
        cy.get(gravar).click()
    }

    excluir(tamanhoEPI) {
        util.acao('Excluir', tamanhoEPI.Nome)
    }
}
import * as util from '../../../support/util'

const url = '/captacao/nivelCompetencia/list.action'
const inserir = '#btnInserir'
const descricao = '#descricao'
const gravar = '#btnGravar'

export class NivelCompetenciaPage {

    navigate() {
        cy.visit(url)
    }

    inserir(nivel) {
        cy.get(inserir).click()
        cy.get(descricao).clear().type(nivel.Descricao)
        cy.get(gravar).click()
    }

    excluir(nivel) {
       util.acao('Excluir', nivel.Descricao)
    }

}
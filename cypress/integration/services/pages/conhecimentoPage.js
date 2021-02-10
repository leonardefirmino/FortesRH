import * as util from '../../../support/util'

const url = '/captacao/conhecimento/list.action'
const inserir = '#btnInserir'
const gravar = '#btnGravar'
const nomeConhecimento = '#nome'
const todasAreas = '#mt'

export class ConhecimentoPage {

    navigate() {
        cy.visit(url)
        util.continuarButton()
    }

    inserir(conhecimento) {
        cy.get(inserir).click()
        cy.get(nomeConhecimento).clear().type(conhecimento)
        cy.get(todasAreas).click()
        cy.get(gravar).click()
    }

    editar(conhecimento) {
        util.acao('Editar', conhecimento)        
        cy.get(nomeConhecimento).clear().type(conhecimento)
        cy.get(gravar).click()
    }  

    excluir(conhecimento) {
        util.acao('Excluir', conhecimento) 
    }
}
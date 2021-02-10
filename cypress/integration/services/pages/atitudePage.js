import * as util from '../../../support/util'

const url = '/captacao/atitude/list.action'
const inserir = '#btnInserir'
const gravar = '#btnGravar'
const nomeAtitude = '#nome'
const todasAreas = '#mt'

export class AtitudePage {

    navigate() {
        cy.visit(url)
        util.continuarButton()
    }

    inserir(atitude) {
        cy.get(inserir).click()
        cy.get(nomeAtitude).clear().type(atitude)
        cy.get(todasAreas).click()
        cy.get(gravar).click()
    }

    editar(atitude) {
        util.acao('Editar', atitude)        
        cy.get(nomeAtitude).clear().type(atitude)
        cy.get(todasAreas).click()
        cy.get(gravar).click()
    }  

    excluir(atitude) {
        util.acao('Excluir', atitude) 
    }
}
import * as util from '../../../support/util'

const url = '/captacao/habilidade/list.action'
const inserir = '#btnInserir'
const gravar = '#btnGravar'
const nomeHabilidade = '#nome'
const todasAreas = '#mt'

export class HabilidadePage {

    navigate() {
        cy.visit(url)
        util.confirmarDialogMessage('Continuar')
    }

    inserir(habilidade) {
        cy.get(inserir).click()
        cy.get(nomeHabilidade).clear().type(habilidade)
        cy.get(todasAreas).click()
        cy.get(gravar).click()
    }

    editar(habilidade) {
        util.acao('Editar', habilidade)        
        cy.get(nomeHabilidade).clear().type(habilidade)
        cy.get(todasAreas).click()
        cy.get(gravar).click()
    }  

    excluir(habilidade) {
        util.acao('Excluir', habilidade) 
    }
}
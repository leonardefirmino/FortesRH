import * as util from '../../../support/util'

const url = '/captacao/nivelCompetenciaHistorico/list.action'
const inserir = '#inserir'
const checkNivel = '#configHistoricoNivel_0'
const peso = '#peso_0'
const percentual = '#percentual_0'
const gravar = '#gravar'

export class HistoricoNivelCompetenciaPage {

    navigate() {
        cy.visit(url)
    }

    clicaInserir() {
        cy.get(inserir).click()
    }

    inserir() {
        this.clicaInserir()
        cy.get(checkNivel).should('be.checked')
        cy.get(peso).clear().type('2')
        cy.get(percentual).clear().type('80')
        cy.get(gravar).click()
    }

}
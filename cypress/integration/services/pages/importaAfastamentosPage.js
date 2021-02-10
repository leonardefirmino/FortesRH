import * as util from '../../../support/util'

const url = '/importacao/prepareImportarAfastamentos.action'
const carregar = '#btnCarregar'
const importar = '#btnImportar'
const arquivo = '#arquivo'
const afast = '#importarAfastamentos_0'

export class ImportaAfastamentoPage {

    navigate() {
        cy.visit(url)
        util.continuarButton()
    }

    importarafastamento(afastamento) {
        cy.get(arquivo).attachFile(afastamento.Arquivo, { allowEmpty: true })
        cy.get(carregar).click()
        cy.get(importar).click()
    }

    importar(afastamento) {
        cy.get(arquivo).attachFile(afastamento.Arquivo, { allowEmpty: true })
        cy.get(carregar).click()
        cy.get(afast).select('Licença por motivo de doença')
        cy.get(importar).click()
    }
}

import * as util from '../../../support/util'

const url = '/importacao/prepareImportarEPIs.action'
const importar = '.btnImportar'
const arquivo = '#arquivo'

export class ImportaEpiPage {

    navigate() {
        cy.visit(url)
        util.confirmarDialogMessage('Continuar')
    }

    importarEpi(epi) {
        cy.get(arquivo).attachFile(epi.Arquivo, { allowEmpty: true })
        cy.get(importar).click()
    }
}

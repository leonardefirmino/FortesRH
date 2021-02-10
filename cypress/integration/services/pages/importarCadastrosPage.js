import * as util from '../../../support/util'

const url = '/geral/empresa/prepareImportarCadastros.action'
const empresa_origem = '#origem'
const empresa_destino = '#destino'
const importar = '#btnImportar'

export class ImportaCadastroPage {

    navigate() {
        cy.visit(url)
        util.continuarButton()
    }

    importarCadastro(impCadastro) {
        cy.get(empresa_origem).select(impCadastro.Origem)
        cy.get(empresa_destino).select(impCadastro.Destino)
        cy.get('#checkGroupcadastrosCheck2').check()
        cy.get(importar).click()
    }

    importarCadastroMesmaEmpresa(impCadastro) {
        cy.get(empresa_origem).select(impCadastro.Destino)
        cy.get(empresa_destino).select(impCadastro.Destino)
        cy.get('#checkGroupcadastrosCheck2').check()
        cy.get(importar).click()
    }

    importar() {
        cy.get(importar).click()
    }
}
import * as util from '../../../support/util'

const url_parametrosSistema = '/geral/parametrosDoSistema/prepareUpdate.action'
const url_exporta = '/geral/parametrosDoSistema/prepareExportarElore.action'
const tokenElore = '#tokenElore'
const conecta = '#btnTestarConexao'
const gravar = '#btnGravar'

const pesquisar = '#btnPesquisar'
const status = '#statusExportacao'
const exportar = '#exportarSelecionados'
const marcarTodos = '#checkExportacao'


export class IntegraElorePage {

    navigate() {
        cy.visit(url_parametrosSistema)
    }

    integraElore(token) {

        if (token != null) {
            cy.get(tokenElore).clear().type(token)
        }
        
        cy.get(conecta).click()
    }

}

export class ExportaElorePage {

    navigate_exporta() {
        cy.visit(url_exporta)
        util.confirmarDialogMessage('Continuar')
    }

    exporta(elore) { 
        if (elore.AreaMarcada === 'Não') {
            cy.get(pesquisar).click()
        } else if (elore.AreaMarcada === 'Sim' && elore.SelecionaColaborador === 'Não') {
            cy.get('#checkGroupareaIds1').check()
            cy.get(pesquisar).click()
            cy.get(exportar).click()
        } else {
            cy.get('#checkGroupareaIds1').check()
            cy.get(status).select(elore.status)
            cy.get(pesquisar).click()
            cy.get(marcarTodos).check()
            cy.get(exportar).click()
        }
    }

}

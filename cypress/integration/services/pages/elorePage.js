import * as util from '../../../support/util'

const url = '/geral/parametrosDoSistema/prepareUpdate.action'
const tokenElore = '#tokenElore'
const conecta = '#btnTestarConexao'
const gravar = '#btnGravar'


export class IntegraElorePage {

    navigate() {
        cy.visit(url)
    }

    integraElore(token) {
        cy.get(tokenElore).clear().type(token)
        cy.get(conecta).click()
    }

}

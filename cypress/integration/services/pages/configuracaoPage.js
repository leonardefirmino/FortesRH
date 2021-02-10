import * as util from '../../../support/util'

const url = '/geral/parametrosDoSistema/prepareUpdate.action'
const urlAplicacao = '#appUrl'
const contextoAplicacao = '#appContext'
const timeout = '#sessionTimeout'
const atualizadorPath = '#atualizadorPath'
const autenticador = '#servidorRemprot'
const emailSuporte ='#emailDoSuporteTecnico'
const requerAutenticacao = '#autenticacao' //clicar pra desmarcar o check
const gravar = '#btnGravar'



export class ConfiguracaoPage {

    navigate() {
        cy.visit(url)
        util.continuarButton()
    }

    configuraParametros(param) {
        cy.get(urlAplicacao).clear().type(param.urlAplicacao)
        cy.get(contextoAplicacao).clear().type(param.contexto)
        cy.get(timeout).clear().type(param.timeout)
        cy.get(atualizadorPath).clear().type(param.Atualizador)
        cy.get(autenticador).clear().type(param.Autenticador)
        cy.get(emailSuporte).clear().type(param.email)
        cy.get(requerAutenticacao).uncheck()
        cy.get(gravar).click()
    }
}
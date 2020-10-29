import * as util from '../../../support/util'

const url = '/geral/usuarioMensagem/prepareUpdate.action'
const marcaUsuario = '#mt'
const mensagem = '#mensagem'
const enviarMensagem = '.btnEnviar'


export class MessagePage {

    navigate() {
        cy.visit(url)
        util.confirmarDialogMessage('Continuar')
    }

    enviaMensagem(message) {
        cy.get(marcaUsuario).click()
        cy.get(mensagem).clear().type(message)
        cy.get(enviarMensagem).click()
    }
}
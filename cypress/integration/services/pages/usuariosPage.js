const url = '/acesso/usuario/list.action'
const usuarioAutomatico = '#btnCriarUsuariosAuto'
const senhaPadrao = '#senhaPadrao'
const confirmaSenhaPadrao = '#confirmaSenha'
const gravaUsuarios = '#btnCriarUsuarios'

export class UsuarioPage {

    navigate() {
        cy.visit(url)
    }

    insereUsuarioAutomaticamente(){
        cy.get(usuarioAutomatico).click()
        cy.get(senhaPadrao).clear().type('1234')
        cy.get(confirmaSenhaPadrao).clear().type('1234')
        cy.get(gravaUsuarios).click()
    }

   
}



import * as util from '../../../support/util'

const url = '/acesso/usuario/list.action'
const usuarioAutomatico = '#btnCriarUsuariosAuto'
const senhaPadrao = '#senhaPadrao'
const confirmaSenhaPadrao = '#confirmaSenha'
const gravaUsuarios = '#btnCriarUsuarios'
const usu_nome = '#nome'
const usu_login = '#login'
const senha = '#senha'
const conf_senha = '#confNovaSenha'
const gravar = '#btnGravar'
const inserir = '#btnInserir'

export class UsuarioPage {

    navigate() {
        cy.visit(url)
        util.continuarButton()
    }

    insereUsuarioAutomaticamente(){
        cy.get(usuarioAutomatico).click()
        cy.get(senhaPadrao).clear().type('1234')
        cy.get(confirmaSenhaPadrao).clear().type('1234')
        cy.get(gravaUsuarios).click()
    }

    inserir(usuario){
        cy.get(inserir).click()
        cy.get(usu_nome).clear().type(usuario.Nome)
        cy.get(usu_login).clear().type(usuario.Nome)
        cy.get(senha).clear().type(usuario.Senha)
        cy.get(conf_senha).clear().type(usuario.ConfSenha)
        cy.get(gravar).click()
    }

    editar(usuario){
        util.acao('Editar', usuario)
        cy.get(usu_login).clear().type('teste')
        cy.get(gravar).click()
    }

    excluir(usuario){
        util.acao('Excluir', usuario)
    }

   
}



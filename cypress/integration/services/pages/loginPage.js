import * as util from '../../../support/util'

const url = '/login.action'                
const usuario = '#username'
const senha = '#password'                 
const entrar = '#entrar'
const alteraSenha = '#senha'               
const confirmaSenha = '#confNovaSenha'
const alteraSenhaButton = '#alterarSenha'


export class LoginPage {

  navigate() {
    cy.visit(url)
  }

  with(user, password) {
    cy.get(usuario).clear().type(user)
    cy.get(senha).clear().type(password)
    cy.get(entrar).click()   
  }

  loggedIn(user, password) {
    this.with(user, password) 
    util.entendiButton()
}

  changePassword(password) {
    cy.get(alteraSenha).clear().type(password)
    cy.get(confirmaSenha).clear().type(password)
    cy.get(alteraSenhaButton).click()
  }

  logout(){
    cy.visit('/logout.action')
  }

}

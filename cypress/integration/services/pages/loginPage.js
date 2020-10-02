import * as util from '../../../support/util'

export class LoginPage {

  navigate() {
    cy.visit('/login.action')
  }

  with(user, password) {
    cy.get('#username').clear().type(user)
    cy.get('#password').clear().type(password)
    cy.get('#entrar').click()   
  }

  loggedIn(user, password) {
    this.with(user, password) 
    util.entendiButton()
}

  loggedIn(user, password) {
    cy.get('#username').clear().type(user)
    cy.get('#password').clear().type(password)
    cy.get('#entrar').click()    
    util.entendiButton()
  }

  changePassword(password) {
    cy.get('#senha').clear().type(password)
    cy.get('#confNovaSenha').clear().type(password)
    cy.get('#alterarSenha').click()
  }

  logout(){
    cy.visit('/logout.action')
  }

}

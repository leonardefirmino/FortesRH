import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { LoginPage } from '../../pages/loginPage'
import { AlteraSenhaPage } from '../../pages/alteraSenhaPage'

describe('Alteração de Senha de Usuário', () => {
    const loginPage = new LoginPage()
    const alteraSenhaPage = new AlteraSenhaPage()
    
    beforeEach('', () => {
        cy.insereUsuarioComEmpregado('helena')
        alteraSenhaPage.navigate()
    })

    it('Alterar Senha de Usuario não associado a empregado', () => {  
        loginPage.loggedIn('homolog', '1234')
        util.warningMsg('Sua conta de usuário não está vinculada à um talento.')
    })

    it('Alterar Senha com sucesso', () => {  
        cy.login('helena', '1234')
        alteraSenhaPage.with('1234', '123456', '123456')
        util.popUpMessage('Sua senha foi alterada com sucesso.')
    })    

    it('Alterar Senha sem sucesso - Senha Atual incorreta', () => {  
        cy.login('helena', '1234')
        alteraSenhaPage.with('1235', '123456', '123456')
        util.popUpMessage('A senha informada não confere com a senha do seu login.')
    })   

    it('Alterar Senha sem sucesso - Confirmação de Senha incorreta', () => {  
        cy.login('helena', '1234')
        alteraSenhaPage.with('1234', '12346', '123456')
        util.popUpMessage('A senha não foi confirmada corretamente.')
    })   

    it('Alterar Senha de Usuári - Valida CAmpos', () => {  
        cy.login('helena', '1234')
        alteraSenhaPage.with('', '', '')
        util.popUpMessage('Preencha os campos indicados.')
    }) 
})

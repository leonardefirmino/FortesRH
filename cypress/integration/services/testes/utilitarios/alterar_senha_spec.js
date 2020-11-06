import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { LoginPage } from '../../pages/loginPage'
import { AlteraSenhaPage } from '../../pages/alteraSenhaPage'

describe('Funcionalidade Estabelecimento', () => {
    const loginPage = new LoginPage()
    const alteraSenhaPage = new AlteraSenhaPage()
    
    beforeEach('', () => {
        cy.insereUsuarioComEmpregado('helena')
        alteraSenhaPage.navigate()
        loginPage.loggedIn('homolog', '1234')
    })

    it('Alterar Senha de Usuario não associado a empregado', () => {  
        util.warningMsg('Sua conta de usuário não está vinculada à um talento.')
    })
})

import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { LoginPage } from '../../pages/loginPage'
import { IntegraElorePage } from '../../pages/elorePage'

describe('Funcionalidade Integração Elore', () => {
    const loginPage = new LoginPage()
    const elorePage = new IntegraElorePage()
    
    const token = 'eloreToken87f929d691c24a24a445a2688f3cf4ef'
    const tokeninvalido = 'eloreToken87f929d691c24a24a445a2688f3cf4ec'

    beforeEach('', () => {
        cy.reload_db()
        elorePage.navigate()
        loginPage.loggedIn('homolog', '1234')
    })

    it.only('Integra com token válido', () => {        
        elorePage.integraElore(token)
        util.popUpMessage('A conexão com Elore foi realizada com sucesso.')
    })

    it.only('Integra com token inválido', () => {        
        elorePage.integraElore(tokeninvalido)
        util.popUpMessage('Não foi possível conectar ao servidor do Elore!')
    })
})

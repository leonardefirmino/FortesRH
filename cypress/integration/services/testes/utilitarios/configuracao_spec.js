import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { LoginPage } from '../../pages/loginPage'
import { ConfiguracaoPage } from '../../pages/configuracaoPage'

describe('Configuração do Sistema', () => {
    const loginPage = new LoginPage()
    const configuracaoPage = new ConfiguracaoPage()

    const parametros = { urlAplicacao: 'http://localhost:8080/fortesrh', contexto: '/fortesrh', timeout: '600', Atualizador: 'FortesRH', Autenticador: 'FORTESAG', email: 'teste@teste.com' }


    beforeEach('', () => {
        cy.reload_db()
        configuracaoPage.navigate()
        loginPage.loggedIn('homolog', '1234')
    })

    it('Envio de Mensagem', () => {
        configuracaoPage.configuraParametros(parametros)
        util.successMsg('Configurações do sistema atualizadas com sucesso.')
    })
})
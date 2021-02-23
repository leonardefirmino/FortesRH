import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { ConfiguracaoPage } from '../../pages/configuracaoPage'

describe('Configuração do Sistema', () => {
    const configuracaoPage = new ConfiguracaoPage()

    const parametros = { urlAplicacao: 'http://localhost:8080/fortesrh', contexto: '/fortesrh', timeout: '600', Atualizador: 'FortesRH', Autenticador: 'FORTESAG', email: 'teste@teste.com' }


    beforeEach('', () => {
        configuracaoPage.navigate()
    })

    it('Envio de Mensagem', () => {
        configuracaoPage.configuraParametros(parametros)
        util.successMsg('Configurações do sistema atualizadas com sucesso.')
    })
})
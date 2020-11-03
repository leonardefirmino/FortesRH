import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { LoginPage } from '../../pages/loginPage'
import { EstabelecimentoPage } from '../../pages/estabelecimentoPage'

describe('Funcionalidade Estabelecimento', () => {
    const loginPage = new LoginPage()
    const estabelecimentoPage = new EstabelecimentoPage()
    
    beforeEach('', () => {
        cy.reload_db()
        estabelecimentoPage.navigate()
        loginPage.loggedIn('homolog', '1234')
    })

    it('Inserir Estabelecimentos', () => {        
        estabelecimentoPage.inserir()
        util.validaTitulo('Estabelecimentos')
    })

    it('Inserir Estabelecimentos Já Cadastrado', () => {        
        estabelecimentoPage.inserirEstabelecimentoJaCadastrado()
        util.popUpMessage('CNPJ já cadastrado')
    })

    it('Excluir Estabelecimentos', () => {        
        estabelecimentoPage.excluir('Estabelecimento Padrão')
        util.popUpMessage('Confirma exclusão?')
        util.infoMsg('Estabelecimento excluído com sucesso.')
    })

    it('Excluir Estabelecimentos Associado a movimentações', () => {
        cy.insereColaborador('Helena de Troia')
        estabelecimentoPage.excluir('Estabelecimento Padrão')
        util.popUpMessage('Confirma exclusão?')
        util.warningMsg('Não foi possível excluir o estabelecimento.')
    })
})

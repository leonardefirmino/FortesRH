import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { LoginPage } from '../../pages/loginPage'
import { AreaFormacaoPage } from '../../pages/areaFormacaoPage'

describe('Funcionalidade Area de Formação', () => {
    const loginPage = new LoginPage()
    const areaformacaoPage = new AreaFormacaoPage()

    beforeEach('', () => {
        cy.reload_db()
        cy.insereAreaFormacao()
        areaformacaoPage.navigate()
        loginPage.loggedIn('homolog', '1234')
    })
    
    it('Inserção de Area de Formação', () => {
        areaformacaoPage.insereAreaFormacao()
        util.validaTitulo('Áreas de Formação')
    })

    it('Edição de Area de Formação', () => {
        areaformacaoPage.editarAreaFormacao('Editar', 'Área de Formacao Teste')
        util.validaTitulo('Áreas de Formação')
    })

    it('Exclusão de Area de Formação', () => {
        areaformacaoPage.excluirAreaFormacao('Excluir', 'Área de Formacao Teste')
        util.popUpMessage('Confirma exclusão?')
        util.successMsg('Área de Formação excluída com sucesso.')
    })

})

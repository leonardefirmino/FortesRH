import '../../../../../cypress.json'
import { LoginPage } from '../../pages/loginPage'
import { MessagePage } from '../../pages/messagePage'
import { AreaFormacaoPage } from '../../pages/areaFormacaoPage'

describe('Funcionalidade Area de Formação', () => {
    const loginPage = new LoginPage()
    const messagePage = new MessagePage()
    const areaformacaoPage = new AreaFormacaoPage()

    beforeEach('', () => {
        cy.reload_db()
        cy.insereAreaFormacao()
        areaformacaoPage.navigate()
        loginPage.loggedIn('homolog', '1234')
    })
    
    it('Inserção de Area de Formação', () => {
        areaformacaoPage.insereAreaFormacao()
        messagePage.validaTitulo('Áreas de Formação')
    })

    it('Edição de Area de Formação', () => {
        areaformacaoPage.editarAreaFormacao('Editar', 'Área de Formacao Teste')
        messagePage.validaTitulo('Áreas de Formação')
    })

    it('Exclusão de Area de Formação', () => {
        areaformacaoPage.excluirAreaFormacao('Excluir', 'Área de Formacao Teste')
        messagePage.popUpMessage('Confirma exclusão?')
        messagePage.successMsg('Área de Formação excluída com sucesso.')
    })

})

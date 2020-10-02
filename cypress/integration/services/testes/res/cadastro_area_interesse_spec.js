import '../../../../../cypress.json'
import { LoginPage } from '../../pages/loginPage'
import { MessagePage } from '../../pages/messagePage'
import { AreaInteressePage } from '../../pages/areaInteressePage'




describe('Funcionalidade Area de Interesse', () => {
    const loginPage = new LoginPage()
    const messagePage = new MessagePage()
    const areaInteressePage = new AreaInteressePage()

    beforeEach('', () => {
        cy.reload_db()
        cy.insereAreaInteresse()
        cy.inserirSolicitacaoPessoal()
        areaInteressePage.navigate()
        loginPage.loggedIn('homolog', '1234')
    })
    
    it('Inserção de Area de Interesse', () => {
        areaInteressePage.insereAreaInteresse()
        messagePage.validaTitulo('Áreas de Interesse')
    })

    it('Edição de Area de Interesse', () => {
        areaInteressePage.editarAreaInteresse('Editar', 'Área de Interesse Teste')
        messagePage.validaTitulo('Áreas de Interesse')
    })

    it('Exclusão de Area de Interesse', () => {
        areaInteressePage.excluirAreaInteresse('Excluir', 'Área de Interesse Teste')
        messagePage.popUpMessage('Confirma exclusão?')
        messagePage.successMsg('Área de Interesse excluída com sucesso.')
    })

})

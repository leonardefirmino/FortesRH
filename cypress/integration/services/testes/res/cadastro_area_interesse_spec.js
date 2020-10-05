import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { LoginPage } from '../../pages/loginPage'
import { AreaInteressePage } from '../../pages/areaInteressePage'

describe('Funcionalidade Area de Interesse', () => {
    const loginPage = new LoginPage()
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
        util.validaTitulo('Áreas de Interesse')
    })

    it('Edição de Area de Interesse', () => {
        areaInteressePage.editarAreaInteresse('Editar', 'Área de Interesse Teste')
        util.validaTitulo('Áreas de Interesse')
    })

    it('Exclusão de Area de Interesse', () => {
        areaInteressePage.excluirAreaInteresse('Excluir', 'Área de Interesse Teste')
        util.popUpMessage('Confirma exclusão?')
        util.successMsg('Área de Interesse excluída com sucesso.')
    })

})

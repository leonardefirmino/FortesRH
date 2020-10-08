import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { LoginPage } from '../../pages/loginPage'
import { AreaInteressePage } from '../../pages/areaInteressePage'

describe('Funcionalidade Area de Interesse', () => {
    const loginPage = new LoginPage()
    const areaInteressePage = new AreaInteressePage()

    const areaInteresse = { Nome: "Desenvolvimento de Software", Area: 'Área Administrativa' }

    beforeEach('', () => {
        cy.reload_db()
        cy.insereAreaInteresse(areaInteresse.Nome)
        cy.inserirSolicitacaoPessoal()
        areaInteressePage.navigate()
        loginPage.loggedIn('homolog', '1234')
    })
     
    it('Inserção de Area de Interesse', () => {
        areaInteressePage.inserir(areaInteresse)
        util.validaTitulo('Áreas de Interesse')
    })

    it('Edição de Area de Interesse', () => {
        areaInteressePage.editar(areaInteresse)
        util.validaTitulo('Áreas de Interesse')
    })

    it('Exclusão de Area de Interesse', () => {
        areaInteressePage.excluir(areaInteresse)
        util.popUpMessage('Confirma exclusão?')
        util.successMsg('Área de Interesse excluída com sucesso.')
    })

})

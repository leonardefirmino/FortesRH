import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { LoginPage } from '../../pages/loginPage'
import { AreaFormacaoPage } from '../../pages/areaFormacaoPage'

describe('Funcionalidade Area de Formação', () => {
    const loginPage = new LoginPage()
    const areaformacaoPage = new AreaFormacaoPage()

    const area = { Nome: "Desenvolvimento de Software", Area: 'Área Administrativa' }

    beforeEach('', () => {
        cy.reload_db()
        cy.insereAreaFormacao(area.Area)
        areaformacaoPage.navigate()
        loginPage.loggedIn('homolog', '1234')
    })
    
    it('Inserção de Area de Formação', () => {
        areaformacaoPage.inserir(area)
        util.validaTitulo('Áreas de Formação')
    }) 

    it('Edição de Area de Formação', () => {
        areaformacaoPage.editar(area.Area)
        util.validaTitulo('Áreas de Formação')
    })

    it('Exclusão de Area de Formação', () => {
        areaformacaoPage.excluir(area.Area)
        util.popUpMessage('Confirma exclusão?')
        util.successMsg('Área de Formação excluída com sucesso.')
    })

})

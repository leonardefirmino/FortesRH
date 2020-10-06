import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { LoginPage } from '../../pages/loginPage'
import { AreaOrganizacionalPage } from '../../pages/areaOrganizacionalPage'

describe('Funcionalidade Area de Formação', () => {
    const loginPage = new LoginPage()
    const areaOrganizacionalPage = new AreaOrganizacionalPage()

    beforeEach('', () => {
        cy.reload_db()
        cy.inserirAreaOrganizacional()
        cy.inserirSolicitacaoPessoal()
        cy.insereColaborador()
        areaOrganizacionalPage.navigate()
        loginPage.loggedIn('homolog', '1234')
    })
    
    it.only('Inserção de Area Organizacional', () => {
        areaOrganizacionalPage.preencheAreaOrganizacional()
        util.successMsg('Área organizacional inserido com sucesso')
    })
    
    it('Inserção de Area Organizacional - Com Area Mãe', () => {
        areaOrganizacionalPage.preencheAreaOrganizacional('Área Teste')
        util.successMsg('Área organizacional inserido com sucesso')
    })
    
    it('Inserção de Area Organizacional - Com Area Mãe vinculada a um talento', () => {
        areaOrganizacionalPage.preencheAreaOrganizacional('Desenvolvimento')
        areaOrganizacionalPage.validaAreaMaeComVinculo()
    })

    it('Edição de Area Organizacional', () => {
        areaOrganizacionalPage.editarAreaOrganizacional('Editar', 'Desenvolvimento')
        util.successMsg('Área organizacional atualizado com sucesso')
    })

    it('Exclusão de Area Organizacional', () => {
        areaOrganizacionalPage.excluirAreaOrganizacional('Excluir', 'Desenvolvimento')
        util.popUpMessage('Confirma exclusão?')
        util.successMsg('Área organizacional excluída com sucesso.')
    })

    it('Exclusão de Area Organizacional - Associada a movimentações', () => {
        areaOrganizacionalPage.excluirAreaOrganizacional('Excluir', 'Área Teste')
        util.popUpMessage('Confirma exclusão?')
        util.warningMsg('Não foi possível excluir a Área Organizacional.')
    })

})

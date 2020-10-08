import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { LoginPage } from '../../pages/loginPage'
import { AreaOrganizacionalPage } from '../../pages/areaOrganizacionalPage'

describe('Funcionalidade Area Organizacional', () => {
    const loginPage = new LoginPage()
    const areaOrganizacionalPage = new AreaOrganizacionalPage()

    const areaOrganizacional = { NomeArea: "Desenvolvimento", AreaOrg: 'Gestao de Pessoas'}

    beforeEach('', () => {
        cy.reload_db()
        cy.inserirAreaOrganizacional(areaOrganizacional.NomeArea)
        cy.inserirSolicitacaoPessoal()
        cy.insereColaborador()
        areaOrganizacionalPage.navigate()
        loginPage.loggedIn('homolog', '1234')
    })
    
    it('Inserção de Area Organizacional', () => {
        areaOrganizacionalPage.inserir(areaOrganizacional)
        util.successMsg('inserido com sucesso')
    })
    
    it('Inserção de Area Organizacional - Com Area Mãe', () => {
        const areaOrganizacional = { NomeArea: "Desenvolvimento", AreaOrg: 'Desenvolvimento'}
        areaOrganizacionalPage.inserirComAreaMae(areaOrganizacional)
        util.successMsg('inserido com sucesso')
    })
    
    it('Inserção de Area Organizacional - Com Area Mãe vinculada a um talento', () => {
        areaOrganizacionalPage.inserirComAreaMae(areaOrganizacional)
        areaOrganizacionalPage.validaPopUpVinculoAreaMae('A área organizacional mãe selecionada, possui talentos vinculados.')
    })

    it('Edição de Area Organizacional', () => {
        areaOrganizacionalPage.editar(areaOrganizacional)
        util.successMsg('Área organizacional atualizado com sucesso')
    })

    it('Exclusão de Area Organizacional', () => {
        areaOrganizacionalPage.excluir(areaOrganizacional)
        util.popUpMessage('Confirma exclusão?')
        util.successMsg('Área organizacional excluída com sucesso.')
    })

    it('Exclusão de Area Organizacional - Associada a movimentações', () => {
        const areaOrganizacional = { NomeArea: "Área Teste"}
        areaOrganizacionalPage.excluir(areaOrganizacional)
        util.popUpMessage('Confirma exclusão?')
        util.warningMsg('Não foi possível excluir a Área Organizacional.')
    })

})

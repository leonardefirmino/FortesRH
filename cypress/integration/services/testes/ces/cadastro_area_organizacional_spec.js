import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { AreaOrganizacionalPage } from '../../pages/areaOrganizacionalPage'

describe('Funcionalidade Area Organizacional', () => {
    const areaOrganizacionalPage = new AreaOrganizacionalPage()

    const areaOrganizacional = { NomeArea: "Desenvolvimento", AreaOrg: 'Gestao de Pessoas'}

    beforeEach('', () => {
        cy.inserirAreaOrganizacional(areaOrganizacional.NomeArea)
        cy.inserirSolicitacaoPessoal()
        cy.insereColaborador('Helena de Troia')
        areaOrganizacionalPage.navigate()
    })
    
    it('Inserção de Area Organizacional', () => {
        areaOrganizacionalPage.inserir(areaOrganizacional)
        cy.validaMensagemSucesso('Área organizacional inserida com sucesso')
    })
    
    it('Inserção de Area Organizacional - Com Area Mãe', () => {
        const areaOrganizacional = { NomeArea: "Desenvolvimento", AreaOrg: 'Desenvolvimento'}
        areaOrganizacionalPage.inserirComAreaMae(areaOrganizacional)
        cy.validaMensagemSucesso('Área organizacional inserida com sucesso')
    })
    
    it('Inserção de Area Organizacional - Com Area Mãe vinculada a um talento', () => {
        areaOrganizacionalPage.inserirComAreaMae(areaOrganizacional)
        areaOrganizacionalPage.validaPopUpVinculoAreaMae('A área organizacional mãe selecionada, possui talentos vinculados.')
    })

    it('Edição de Area Organizacional', () => {
        areaOrganizacionalPage.editar(areaOrganizacional)
        cy.validaMensagemSucesso('Área organizacional atualizada com sucesso')
    })

    it('Exclusão de Area Organizacional', () => {
        areaOrganizacionalPage.excluir(areaOrganizacional)
        util.popUpMessage('Confirma exclusão?')
        cy.validaMensagemSucesso('Área organizacional excluída com sucesso.')
    })

    it('Exclusão de Area Organizacional - Associada a movimentações', () => {
        const areaOrganizacional = { NomeArea: "Área Teste"}
        areaOrganizacionalPage.excluir(areaOrganizacional)
        util.popUpMessage('Confirma exclusão?')
        util.warningMsg('Não foi possível excluir a Área Organizacional.')
    })

})

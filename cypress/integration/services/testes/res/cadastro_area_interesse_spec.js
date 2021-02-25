import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { AreaInteressePage } from '../../pages/areaInteressePage'

describe('Funcionalidade Area de Interesse', () => {
    const areaInteressePage = new AreaInteressePage()

    const areaInteresse = { Nome: "Desenvolvimento de Software", Area: 'Área Administrativa' }

    beforeEach('', () => {
        cy.insereAreaInteresse(areaInteresse.Nome)
        cy.inserirSolicitacaoPessoal()
        cy.loginByApi()
        areaInteressePage.navigate()
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
        cy.validaMensagemSucesso('Área de Interesse excluída com sucesso.')
    })

})

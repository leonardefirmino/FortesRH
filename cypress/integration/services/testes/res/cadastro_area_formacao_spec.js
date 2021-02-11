import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { AreaFormacaoPage } from '../../pages/areaFormacaoPage'

describe('Funcionalidade Area de Formação', () => {
    const areaformacaoPage = new AreaFormacaoPage()

    const area = { Nome: "Desenvolvimento de Software", Area: 'Área Administrativa' }

    beforeEach('', () => {
        cy.insereAreaFormacao(area.Area)
        areaformacaoPage.navigate()
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
        cy.validaMensagemSucesso('Área de Formação excluída com sucesso.')
    })

})

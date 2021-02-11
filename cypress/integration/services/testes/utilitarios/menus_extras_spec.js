import 'cypress-capybara/add-commands'
import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { MenuExtraPage } from '../../pages/menuExtraPage'

describe('Funcionalidade Menus Extras', () => {
    const menuExtraPage = new MenuExtraPage()


    beforeEach('', () => {
        menuExtraPage.navigate()
    })

    it('Inserir Novo Menu', () => {
        menuExtraPage.insereNovoMenu('Redes Sociais')
        cy.validaMensagemSucesso('Menu Extra adicionado com sucesso.')
        util.infoMsg('O usuário deverá sair e realizar novo login no sistema para refletir as alterações do Menu.')
    })

    it('Inserir Novo Item Menu', () => {
        menuExtraPage.insereNovoMenu('Redes Sociais')
        menuExtraPage.insereDadosMenu()
        cy.validaMensagemSucesso('Link adicionado com sucesso.')
        util.infoMsg('O usuário deverá sair e realizar novo login no sistema para refletir as alterações do Menu.')
    })
})




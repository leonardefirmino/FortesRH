import * as util from '../../../support/util'

const url = '/geral/menuExtra/list.action'
const inserir = '#btnInserir'
const menuExtra = '#menuExtraNome'
const gravar = '#btnGravar'
const novoItemMenuNome = '#menuExtraLinkNome'
const novoItemMenuLink = '#menuExtraLinkEndereco'


export class MenuExtraPage {

    navigate() {
        cy.visit(url)
        util.continuarButton()
    }

    insereNovoMenu(menu) {
        cy.get(inserir).click()
        cy.get(menuExtra).clear().type(menu)
        cy.get(gravar).click()
    }

    insereDadosMenu() {
        cy.get(inserir).click()
        cy.get(novoItemMenuNome).clear().type('Linkedin')
        cy.get(novoItemMenuLink).clear().type('www.linkedin.com')
        cy.get(gravar).click()
    }
}
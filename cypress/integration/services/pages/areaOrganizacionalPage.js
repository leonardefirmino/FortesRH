import * as util from '../../../support/util'

const url = '/geral/areaOrganizacional/list.action'
const inserir = '#btnInserir'
const gravar = '#btnGravar'
const nomeArea = '#nome'
const nomeAreaMae = '#areaMaeId'

export class AreaOrganizacionalPage {

    navigate() {
        cy.visit(url)
    }

    inserir(area) {
        cy.get(inserir).click()
        cy.get(nomeArea).clear().type(area.NomeArea)
        cy.get(gravar).click()
    }

    inserirComAreaMae(area) {
        cy.get(inserir).click()
        cy.get(nomeArea).clear().type(area.NomeArea)
        cy.get(nomeAreaMae).select(area.AreaOrg)
        cy.get(gravar).click()
    }

    editar(area) {
        util.acao('Editar', area.NomeArea)        
        cy.get(nomeArea).clear().type(area.AreaOrg)
        cy.get(gravar).click()
    }  

    excluir(area) {
        util.acao('Excluir', area.NomeArea) 
    }

    validaPopUpVinculoAreaMae(text) {
        cy.get('#areaSemColaboradores').should('contain.text', text)
    }
}
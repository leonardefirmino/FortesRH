import * as util from '../../../support/util'
const url = '/geral/configuracaoCampoExtra/prepareUpdate.action'
const habilitaCampoTalento = '#update_habilitaCampoExtraColaborador'
const habilitaAtualizaMeusDados = '#update_habilitaCampoExtraAtualizarMeusDados'
const habilitaCampoCandidato = '#update_habilitaCampoExtraCandidato'
const talento = ':nth-child(1) > #ativo0'
const candidato = ':nth-child(2) > #ativo0'
const descricao = '#titulo0'
const gravar = '#btnGravar'

export class CamposExtrasPage {

    navigate() {
        cy.visit(url)
        util.continuarButton()
    }

    configuraCampsExtras() {
        cy.get(habilitaCampoTalento).check()
        cy.get(habilitaCampoCandidato).check()
        cy.get(talento).check()
        cy.get(candidato).check()
        cy.get(descricao).clear().type('Teste')
        cy.get(gravar).click()
    }

    validaAbaExtraExibidaCandidato() {
        cy.visit('/captacao/candidato/prepareInsert.action')
        util.confirmarDialogMessage('Continuar')
        cy.get('#aba7').should('have.text', 'Extra')
    }

    validaAbaExtraExibidaTalento() {
        cy.visit('/geral/colaborador/prepareInsert.action')
        util.confirmarDialogMessage('Continuar')
        cy.get('#aba7').should('have.text', 'Extra').click()
        cy.get('#wwlbl_texto1 > .desc').should('be.visible')
        cy.get('#texto1').should('be.visible')
    }
}

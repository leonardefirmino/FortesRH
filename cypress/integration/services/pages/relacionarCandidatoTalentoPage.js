import * as util from '../../../support/util'

const url = '/geral/colaborador/prepareRelacionaColaboradorCandidato.action'
const relacionar = '#relacionaAcao0'

export class RelacionarCandidatoTalentoPage {

    navigate() {
        cy.visit(url)
        util.continuarButton()
    }   

    relacionar() {
        cy.get(relacionar).click()
    }
    
}
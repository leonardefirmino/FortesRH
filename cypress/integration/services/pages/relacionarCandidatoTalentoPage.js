const url = '/geral/colaborador/prepareRelacionaColaboradorCandidato.action'
const relacionar = '#relacionaAcao0'

export class RelacionarCandidatoTalentoPage {

    navigate() {
        cy.visit(url)
    }   

    relacionar() {
        cy.get(relacionar).click()
    }
    
}
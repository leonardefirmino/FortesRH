import * as util from '../../../../support/util'

const url = '/sesmt/motivoSolicitacaoEpi/list.action'
const inserir = '#btnInserir'
const nomeMotivoSolicitacaoEPI = '#descricao'
const gravar = '#btnGravar'

export class MotivoSolicitacaoEPIPage {
    navigate() {
        cy.visit(url)
    }

    inserir(motivoSolicitacaoEPI) {
        cy.get(inserir).click()
        cy.get(nomeMotivoSolicitacaoEPI).clear().type(motivoSolicitacaoEPI.Nome)
        cy.get(gravar).click()
    }

    editar(motivoSolicitacaoEPI) {
        util.acao('Editar', motivoSolicitacaoEPI.Nome)
        cy.get(nomeMotivoSolicitacaoEPI).clear().type(motivoSolicitacaoEPI.Nome + " 2")
        cy.get(gravar).click()
    }

    excluir(motivoSolicitacaoEPI) {
        util.acao('Excluir', motivoSolicitacaoEPI.Nome)
    }
}
import * as util from '../../../support/util'

const url = '/cargosalario/tabelaReajusteColaborador/list.action'
const url_reajusteColetivo = '/cargosalario/reajusteColaborador/prepareDissidio.action'
const url_solicitacaoRealinhamento = '/cargosalario/reajusteColaborador/prepareSolicitacaoReajuste.action'
const inserir = '#btnInserir'
const gravar = '#btnGravar'
const descricao = '#titulo'
const data = '#data'
const tipoReajuste = '#tipoReajuste'
const tabelaReajuste = '#tabelaReajuste'
const marcaArea = '#listCheckBoxareasCheck > label'
const marcaEstabelecimento = '#listCheckBoxestabelecimentosCheck > label'
const valorDissidio = '#valorDissidio'
const area = '#areaOrganizacional'
const colaborador = '#colaborador'

export class RealinhamentoPage {

    navigate() {
        cy.visit(url)
    }

    cancelarReajuste(reajuste) {
        util.acao('Cancelar Reajuste', reajuste)
    }    

    inserirReajuste(nome) {
        cy.get(inserir).click()
        cy.get(descricao).type(nome)
        cy.get(data).clear().type('01/10/2020')
        cy.get(tipoReajuste).select('Talento')
        cy.get(gravar).click()
    }

    editarReajuste(reajuste) {
        util.acao('Editar', reajuste)
    } 

    excluirReajuste(reajuste) {
        util.acao('Excluir', reajuste)
    }  

    reajusteColetivo(reajuste) {
        cy.visit(url_reajusteColetivo)
        util.confirmarDialogMessage('Continuar')
        cy.get(tabelaReajuste).select(reajuste)
        cy.get(marcaArea).click()
        cy.get(marcaEstabelecimento).click()
        cy.get(valorDissidio).clear().type('10')
        cy.get(gravar).click()
        cy.visit(url_solicitacaoRealinhamento)
        util.confirmarDialogMessage('Continuar')
        cy.get(tabelaReajuste).select(reajuste)
        cy.get(area).select('Suporte')
        cy.get(colaborador).select('Helena de Troia (Helena de Troia)')
    }
}
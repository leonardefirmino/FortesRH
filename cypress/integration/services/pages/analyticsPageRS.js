const url = '/indicador/duracaoPreenchimentoVaga/painel.action'
const abaInfoGerais = '#aba1'
const exibirFiltro = '#labelLink'
const dataInicial = '#dataDe'
const pesquisar = '#btnPesquisar'
const quadroVagasDisponiveis = '#vagasDisponiveis'
const quantidadeVagasDisponiveis = '.qtdVagaCargo'

export class AnalyticsPage {

    navigateAnalyticsReS() {
        cy.visit(url)
    }

    validaQuadroVagasDisponiveis(dados) {
        cy.get(abaInfoGerais).click()
        cy.get(exibirFiltro).click()
        cy.get(dataInicial).clear().type(dados.DataInicial)
        cy.get(pesquisar).click()
        cy.get(exibirFiltro).click()
        cy.get(quadroVagasDisponiveis).within(() => {
            cy.contains(dados.CargoNome)
            cy.get(quantidadeVagasDisponiveis).should('contain.text', dados.QtdVagas)
        })
    }
}

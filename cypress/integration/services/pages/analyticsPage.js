const url_res = '/indicador/duracaoPreenchimentoVaga/painel.action'
const url_ces = '/cargosalario/historicoColaborador/painelIndicadoresCargoSalario.action'
const abaInfoGerais = '#aba1'
const exibirFiltro = '#labelLink'
const dataInicial = '#dataDe'
const dataFinal = '#dataAte'
const pesquisar = '#btnPesquisar'
const pesquisar_old = '.btnPesquisar'
const quadroVagasDisponiveis = '#vagasDisponiveis'
const quantidadeVagasDisponiveis = '.qtdVagaCargo'

export class AnalyticsPage {


    //R&S
    navigateAnalyticsReS() {
        cy.visit(url_res)
    }

    validaQuadroVagasDisponiveis(dados) {
        cy.get(abaInfoGerais).click()
        cy.get(exibirFiltro).click()
        cy.get(dataInicial).clear().type(dados.DataInicial)
        cy.get(dataFinal).clear().type(dados.DataFinal)
        cy.get('#checkGroupsolicitacaosCheckIds1').click()
        cy.get(pesquisar).click()
        cy.get(exibirFiltro).click()
        cy.get(quadroVagasDisponiveis).within(() => {
            cy.contains(dados.CargoNome)
            cy.get(quantidadeVagasDisponiveis).should('contain.text', dados.QtdVagas)
        })
    }

    //C&S
    navigateAnalyticsCeS() {
        cy.visit(url_ces)
    }

    validaSalario(dados) {
        cy.get(exibirFiltro).click()
        cy.get('#dataBase').clear().type('25/10/2020')        
        cy.get(pesquisar).click()
        cy.get('.legendTotal').should('contain.text', dados)
    }
}

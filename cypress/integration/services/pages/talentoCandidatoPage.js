import * as util from '../../../support/util'

const url_talentos = '/geral/colaborador/list.action'              
const exibirFiltro = '#labelLink'
const situacao = '#situacao'                                       
const inserir = '.btnInserir'
const pesquisar = '#btnPesquisar'                                  
const selecionaEntrevista = '#entrevista'
const avancar = '.btnAvancar'                                      
const resposta1 = '.opcaoResposta1'
const gravar = '.btnGravar'                                       
const gravar_new = '#gravar'
const editarHistorico = '#btnEditarHistoricos'

export class TalentoCandidatoPage {

    navigate_talentoPage() {
        cy.visit(url_talentos)
    }

    pesquisaTalento() {
        cy.get(exibirFiltro).click()
        cy.get(situacao).select('Todos')
        cy.get(pesquisar).click()
    }

    respondeEntrevistaDesligamento(dados) {
        util.acao_old('Entrevista de desligamento', dados.Colaborador)
        cy.get(selecionaEntrevista).select(dados.EntrevistaDesligamento)
        cy.get(avancar).click()
        cy.get(resposta1).clear().type('Resposta 1')
        cy.get(gravar).click()
    }

    criaAcessoSistema(dados) {
        util.acao_old('Criar Acesso ao Sistema', dados.Colaborador)
    }

    editar(dados) {
        util.acao_old('Editar', dados.ColaboradorAtivo)
        cy.get(gravar_new).click()
    }

    excluir(dados) {
        util.acao_old('Excluir', dados.ColaboradorAtivo)
    }

    desligarColaborador(dados) {
        let colaborador_id = cy.task("select id from colaborador where nome = '"+ dados.ColaboradorAtivo +"'")

        console.log(colaborador_id)


        // cy.visit("/geral/colaborador/prepareDesliga.action?colaborador.id='"+ colaborador_id +"'&nomeBusca=&cpfBusc=")
        // cy.get(':nth-child(1) > .ui-button-text').click()
    }

    visualizarProgressao(dados) {
        util.acao_old('Visualizar Progressão', dados.ColaboradorAtivo)
    }

    inserirNovaSituação() {
        cy.get(editarHistorico).click()
        cy.get(inserir).click()
        cy.get(gravar).click()
    }

    
        

}

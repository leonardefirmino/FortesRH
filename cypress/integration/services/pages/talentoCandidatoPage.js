import * as util from '../../../support/util'
import '../../../support/commands'

const url_talentos = '/geral/colaborador/list.action'
const exibirFiltro = '#labelLink'
const situacao = '#situacao'
const inserir = '#btnInserir'
const nome = '#nome'
const nomecomercial = '#nomeComercial'
const nascimento = '#nascimento'
const cpf = '#cpf'
const cep = '#cep'
const endereco = '#ende'
const numero = '#num'
const email = '#email'
const ddd = '#ddd'
const fone = '#fone'
const pesquisar = '#btnPesquisar'
const escolaridade = '#escolaridade'
const selecionaEntrevista = '#entrevista'
const avancar = '#btnAvancar'
const resposta1 = '.opcaoResposta1'
const gravar = '.btnGravar'
const grava = '#gravar'
const gravar_new = '#btnGravar'
const editarHistorico = '#btnEditarHistoricos'
const dadosFuncionais = '#aba2'

export class TalentoCandidatoPage {

    navigate_talentoPage() {
        cy.visit(url_talentos)
        util.continuarButton()
    }

    insereColaborador(dados) {
        cy.get(inserir).click()        
        cy.get(nome).clear().type(dados.ColaboradorAtivo)
        cy.get(nomecomercial).clear().type(dados.ColaboradorAtivo)
        cy.get(nascimento).clear().type('07/01/1988')
        cy.get(cpf).clear().type('492.492.180-79')
        cy.get(cep).clear().type('60822285')
        cy.get(numero).clear().type('249')
        cy.get(endereco).clear().type('Rua Ciro Monteiro')
        cy.get(email).clear().type('teste@teste.com')
        cy.get(ddd).clear().type('85')
        cy.get(fone).clear().type('40051111')
        cy.get(escolaridade).select('Ensino Médio completo')
    }

    dadosFuncionais() {
        cy.get('#aba2 > a').click()
        cy.get('#dt_admissao').clear().type('08/02/2021')
        cy.get('#estabelecimento').select('Estabelecimento Padrão')
        cy.get('#areaOrganizacional').select('Gestão de Pessoas')
        cy.get('#faixa').select('Analista Dep Pessoal Senior')
        cy.get('#tipoSalario').select('Por valor')
        cy.get('#salarioProposto').clear().type('3500,00')
    }

    pesquisaTalento() {
        cy.get(exibirFiltro).click()
        cy.get(situacao).select('Todos')
        cy.get(pesquisar).click()
    }

    respondeEntrevistaDesligamento(dados) {
        util.acao('Entrevista de desligamento', dados.Colaborador)
        cy.get(selecionaEntrevista).select(dados.EntrevistaDesligamento)
        cy.get(avancar).click()
        cy.get(resposta1).clear().type('Resposta 1')
        cy.get(gravar).click()
    }

    criaAcessoSistema(dados) {
        util.acao('Criar Acesso ao Sistema', dados.Colaborador)
    }

    editar(dados) {
        util.acao('Editar', dados.ColaboradorAtivo)
        cy.get(dadosFuncionais).click()
        cy.get(grava).click()
    }

    excluir(dados) {
        util.acao('Excluir', dados.ColaboradorAtivo)
    }

    visualizarProgressao(dados) {
        util.acao('Visualizar Progressão', dados.ColaboradorAtivo)
    }

    inserirCompetencia(dados) {
        util.acao('Competências', dados.ColaboradorAtivo)
        cy.get(inserir).click()
    }

    inserirNovaSituação() {
        cy.get(editarHistorico).click()
        cy.get(inserir).click()
        cy.get(gravar_new).click()
    }


}

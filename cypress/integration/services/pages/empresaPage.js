import * as util from '../../../support/util'
const url = '/geral/empresa/list.action'
const inserir = '#btnInserir'
const gravar = '#btnGravar'
const empty = '.empty'
const nome = '#nome'
const razaoSocial = '#razao'
const uf = '#uf'
const cidade = '#cidade'
const cnpj = '#cnpj'
const emailRemetente = '#remetente'
const emailSetorPessoal = '#respSetorPessoal'
const emailRh = '#respRH'
const turnover = '#formulaTurnover'
const tipoCartao = '#tipoCartao'
const anos = '#anos'
const mensagemCartao = '#mensagem'
const tipoCartaoExibido = '.tipo-10'


export class EmpresaPage {
    navigate() {
        cy.visit(url)
    }

    inserir(empresa) {
        cy.get(inserir).click()
        cy.get(nome).clear().type(empresa.Nome)
        cy.get(razaoSocial).clear().type(empresa.Nome)
        cy.get(uf).select(empresa.Uf)
        cy.get(cidade).select(empresa.Cidade)
        cy.get(cnpj).type(empresa.Cnpj)
        cy.get(emailRemetente).clear().type(empresa.Email)
        cy.get(emailSetorPessoal).clear().type(empresa.Email)
        cy.get(emailRh).clear().type(empresa.Email)
        cy.get(turnover).select('[(Admissões + Demissões / 2) / Ativos no final do mês anterior] * 100')
        cy.get(gravar).click()
    }

    editar(empresa) {
        util.acao('Editar', empresa.Nome2)
        cy.get(razaoSocial).clear().type(empresa.Nome)
        cy.get(uf).select(empresa.Uf)
        cy.get(cidade).select(empresa.Cidade)
        cy.get(cnpj).type(empresa.Cnpj)
        cy.get(emailRemetente).clear().type(empresa.Email)
        cy.get(emailSetorPessoal).clear().type(empresa.Email)
        cy.get(emailRh).clear().type(empresa.Email)
        cy.get(turnover).select('[(Admissões + Demissões / 2) / Ativos no final do mês anterior] * 100')
        cy.get(gravar).click()
    }

    excluir(empresa) {
        util.acao('Excluir', empresa)
    }

    inserirCartao(cartao) {
        util.acao('Cartões', cartao.Nome)
        cy.get(empty).should('be.visible').and('have.text', ' Não existem cartões cadastrados.')
        cy.get(inserir).click()
        cy.get(tipoCartao).select(cartao.Tipo)

        if (cartao.Tipo === 'Reconhecimento') {
            cy.get(anos).clear().type('10')
        }

        cy.get(mensagemCartao).clear().type(cartao.Mensagem)
        cy.get(gravar).click()
    }

    excluirCartao(cartao) {
        util.acao('Cartões', cartao.Nome)
        cy.get('[style="float: right;"] > .fa').click()
    }
}

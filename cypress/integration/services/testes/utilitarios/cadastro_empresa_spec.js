import 'cypress-capybara/add-commands'
import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { EmpresaPage } from '../../pages/empresaPage'

describe('Funcionalidade Cadastros de Empresas', () => {
    const empresaPage = new EmpresaPage()

    const empresa = { Nome: 'Fortes Tecnologia em Sistemas', Cnpj: '63542443', Uf: 'CE', Cidade: 'Fortaleza', Email: 'teste@gmail.com', Nome2: 'Ente Tecnologia' }

    beforeEach('', () => {
        cy.insereEmpresa('Ente Tecnologia')
        cy.insereEmpresaSemEstabelecimento('Fortes Tecno')
        cy.insereGrupoAC('Grupo AC Teste')
        empresaPage.navigate()
    })

    it('Inserir Empresa', () => {
        empresaPage.inserir(empresa)
        cy.validaMensagemSucesso('Empresa cadastrada com sucesso.')
    })

    it('Editar Empresa', () => {
        empresaPage.editar(empresa)
        cy.validaMensagemSucesso('Empresa atualizada com sucesso')
    })

    it('Excluir Empresa Logada', () => {
        empresaPage.excluir('Empresa Padrão')
        util.popUpMessage('Confirma exclusão?')
        util.warningMsg('Não é possível excluir a empresa cujo você está logado.')
    })

    it('Excluir Empresa', () => {
        empresaPage.excluir('Fortes Tecno')
        util.popUpMessage('Confirma exclusão?')
        cy.validaMensagemSucesso('Empresa excluída com sucesso.')
    })

    it('Cadastrar Cartão de Aniversário', () => {
        const cartao = { Nome: 'Ente Tecnologia', Tipo: 'Aniversário', Mensagem: 'Feliz Aniversário' }
        empresaPage.inserirCartao(cartao)
        cy.validaMensagemSucesso('Cartão cadastrado com sucesso.')
    })

    it('Cadastrar Cartão de Reconhecimento', () => {
        const cartao = { Nome: 'Ente Tecnologia', Tipo: 'Reconhecimento', Mensagem: 'Obrigado por fazer parte do nosso time' }
        empresaPage.inserirCartao(cartao)
        cy.validaMensagemSucesso('Cartão cadastrado com sucesso.')
    })

    it('Cadastrar Cartão de Ano de empresa', () => {
        const cartao = { Nome: 'Ente Tecnologia', Tipo: 'Ano de empresa', Mensagem: 'Obrigado por fazer parte do nosso time' }
        empresaPage.inserirCartao(cartao)
        cy.validaMensagemSucesso('Cartão cadastrado com sucesso.')
    })

    it('Cadastrar Cartão de Boas-Vindas', () => {
        const cartao = { Nome: 'Ente Tecnologia', Tipo: 'Boas-Vindas', Mensagem: 'Seja bem vindo a nossa empresa' }
        empresaPage.inserirCartao(cartao)
        cy.validaMensagemSucesso('Cartão cadastrado com sucesso.')
    })

    it('Excluir Cartão', () => {
        cy.insereCartao()
        const cartao = { Nome: 'Empresa Padrão' }
        empresaPage.excluirCartao(cartao)
        util.popUpMessage('Confirma exclusão?')
        cy.validaMensagemSucesso('Cartão excluído com sucesso.')
    })
})

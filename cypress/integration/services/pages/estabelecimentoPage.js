import * as util from '../../../support/util'

//MAPEAMENTO DOS ELEMENTOS DA TELA
const url = '/geral/estabelecimento/list.action'
const inserir = '.btnInserir'
const nome = '#nome'
const complementoCnpj = '#complementoCnpj'
const cep = '#cep'
const complemento = '#insert_estabelecimento_endereco_complemento'
const num = '#num'
const gravar = '.btnGravar'

export class EstabelecimentoPage {

    navigate() {
        cy.visit(url)
        util.confirmarDialogMessage('Continuar')
    }

    inserir() {
        cy.get(inserir).click()
        cy.get(nome).clear().type('Matriz')
        cy.get(complementoCnpj).clear().type('0002')
        cy.get(cep).clear().type('60822285')
        cy.get(num).clear().type('285')
        cy.get(complemento).clear().type('Conjunto Industrial Loja 60 ALtos')
        cy.get(gravar).click()
    }

    inserirEstabelecimentoJaCadastrado() {
        cy.get(inserir).click()
        cy.get(nome).clear().type('Matriz')
        cy.get(complementoCnpj).clear().type('0000')
    }

    excluir(estabelecimento) {
        util.acao_old('Excluir', estabelecimento)
    }
}
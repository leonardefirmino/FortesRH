import * as util from '../../../support/util'

//MAPEAMENTO DOS ELEMENTOS DA TELA
const url = '/geral/grupoAC/list.action'
const inserir = '#btnInserir'
const descricao = '#descricao'
const codigo = '#codigo'
const usuarioac = '#acUsuario'
const senhaac = '#acSenha'
const soap = '#acUrlSoap'
const wdsl = '#acUrlWdsl'
const gravar = '#btnGravar'

export class GrupoAcPage {

    navigate() {
        cy.visit(url)
    }
 
    insereGrupoAC(grupoAc) {
        cy.get(inserir).click()
        cy.get(descricao).clear().type(grupoAc.Descricao)
        cy.get(codigo).clear().type(grupoAc.Codigo)
        cy.get(usuarioac).clear().type(grupoAc.Usuario)
        cy.get(senhaac).clear().type(grupoAc.Senha)
        cy.get(soap).clear().type(grupoAc.Soap)
        cy.get(wdsl).clear().type(grupoAc.Wdsl)
        cy.get(gravar).click()
    }

    editar(grupoAc) {
        util.acao('Editar', 'Grupo AC Teste')
        cy.get(usuarioac).clear().type(grupoAc.Usuario)
        cy.get(senhaac).clear().type(grupoAc.Senha)
        cy.get(soap).clear().type(grupoAc.Soap)
        cy.get(wdsl).clear().type(grupoAc.Wdsl)
        cy.get(gravar).click()
    }

    excluir(grupoAc) {
        util.acao('Excluir', grupoAc)
    }
}
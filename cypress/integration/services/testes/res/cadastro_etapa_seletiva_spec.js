import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { EtapaSeletivaPage } from '../../pages/etapaSeletivaPage'


describe('Funcionalidade Etapas Seletivas', () => {
    const etapaPage = new EtapaSeletivaPage()

    const etapaSeletiva = { Descricao: "Entrevista com Gestor", Descricao2: "Dinamica de Grupo" }

    beforeEach('', () => {
        cy.insereEtapaSeletiva(etapaSeletiva.Descricao)
        cy.loginByApi()
        etapaPage.navigate()
    })

    it('Inserção de Etapa Seletiva', () => {
        etapaPage.inserir(etapaSeletiva)
        util.validaTitulo('Etapas Seletivas')
    })

    it('Edição de Etapa Seletiva', () => {
        etapaPage.editar(etapaSeletiva)
        util.validaTitulo('Etapas Seletivas')
    })

    it('Exclusão de Etapa Seletiva', () => {
        etapaPage.excluir(etapaSeletiva)
        util.popUpMessage('Confirma exclusão?')
        cy.validaMensagemSucesso('Etapa Seletiva excluída com sucesso.')
    })

})

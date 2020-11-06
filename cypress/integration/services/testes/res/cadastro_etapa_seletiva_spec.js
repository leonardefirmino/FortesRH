import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { LoginPage } from '../../pages/loginPage'
import { EtapaSeletivaPage } from '../../pages/etapaSeletivaPage'


describe('Funcionalidade Etapas Seletivas', () => {
    const loginPage = new LoginPage()
    const etapaPage = new EtapaSeletivaPage()

    const etapaSeletiva = { Descricao: "Entrevista com Gestor", Descricao2: "Dinamica de Grupo" }

    beforeEach('', () => {
        cy.insereEtapaSeletiva(etapaSeletiva.Descricao)
        etapaPage.navigate()
        loginPage.loggedIn('homolog', '1234')
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
        util.successMsg('Etapa Seletiva excluída com sucesso.')
    })

})

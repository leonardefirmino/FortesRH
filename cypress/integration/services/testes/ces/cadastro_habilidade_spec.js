import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { LoginPage } from '../../pages/loginPage'
import { HabilidadePage } from '../../pages/habilidadePage'

describe('Funcionalidade Habilidade', () => {
    const loginPage = new LoginPage()
    const habilidadePage = new HabilidadePage()

    const habilidade = { Nome: "Programar" }

    beforeEach('', () => {
        cy.reload_db()
        cy.insereColaboradorComCompetencias('Helena de Troia')
        cy.insereHabilidade('Ruby')
        loginPage.navigate()
        loginPage.loggedIn('homolog', '1234')
        habilidadePage.navigate()
    })

    it('Inserção de Habilidade', () => {
        habilidadePage.inserir(habilidade.Nome)
        util.successMsg('Habilidade inserida com sucesso')
    })

    it('Inserção de Habilidade - Já cadastrado', () => {
        habilidadePage.inserir('Java')
        util.infoMsg('Já existe um Conhecimento, Habilidade ou Atitude com o nome "Java".')
    })

    it('Edição', () => {
        habilidadePage.editar('Ruby')
        util.successMsg('Habilidade atualizada com sucesso')
    })

    it('Exclusão', () => {
        habilidadePage.excluir('Ruby')
        util.popUpMessage('Confirma exclusão?')
        util.infoMsg('Habilidade excluída com sucesso.')
    })

})

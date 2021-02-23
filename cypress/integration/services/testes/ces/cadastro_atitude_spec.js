import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { AtitudePage } from '../../pages/atitudePage'

describe('Funcionalidade Atitude', () => {
    const atitudePage = new AtitudePage()

    const atitude = { Nome: "Programar" }

    beforeEach('', () => {
        cy.insereColaboradorComCompetencias('Helena de Troia')
        cy.insereAtitude('Ruby')
        atitudePage.navigate()
    })

    it('Inserção de Habilidade', () => {
        atitudePage.inserir(atitude.Nome)
        util.successMsg('Atitude Gravada com Sucesso!')
    })

    it('Inserção de Habilidade - Já cadastrado', () => {
        atitudePage.inserir('Java')
        util.warningMsg('Já existe um conhecimento, habilidade ou atitude com o nome "Java".')
    })

    it('Edição', () => {
        atitudePage.editar('Ruby')
        util.successMsg('Atitude atualizada com sucesso')
    })

    it('Exclusão', () => {
        atitudePage.excluir('Ruby')
        util.popUpMessage('Confirma exclusão?')
        util.successMsg('Atitude excluída com sucesso.')
    })

    it('Exclusão sem sucesso', () => {
        atitudePage.excluir('Organizado')
        util.popUpMessage('Confirma exclusão?')
        util.infoMsg('Não foi possível excluir a atitude.')
    })
})

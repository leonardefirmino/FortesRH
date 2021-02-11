import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { HabilidadePage } from '../../pages/habilidadePage'

describe('Funcionalidade Habilidade', () => {
    const habilidadePage = new HabilidadePage()

    const habilidade = { Nome: "Programar" }

    beforeEach('', () => {
        cy.insereColaboradorComCompetencias('Helena de Troia')
        cy.insereHabilidade('Ruby')
        habilidadePage.navigate()
    })

    it('Inserção de Habilidade', () => {
        habilidadePage.inserir(habilidade.Nome)
        cy.validaMensagemSucesso('Habilidade inserida com sucesso')
    })

    it('Inserção de Habilidade - Já cadastrado', () => {
        habilidadePage.inserir('Java')
        util.infoMsg('Já existe um Conhecimento, Habilidade ou Atitude com o nome "Java".')
    })

    it('Edição', () => {
        habilidadePage.editar('Ruby')
        cy.validaMensagemSucesso('Habilidade atualizada com sucesso')
    })

    it('Exclusão', () => {
        habilidadePage.excluir('Ruby')
        util.popUpMessage('Confirma exclusão?')
        util.infoMsg('Habilidade excluída com sucesso.')
    })

})

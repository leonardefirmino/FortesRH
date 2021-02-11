import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { CargoFaixaPage } from '../../pages/cargosFaixaPage'

describe('Funcionalidade Cargos e Faixas', () => {
    const cargosFaixaPage = new CargoFaixaPage()

    const cargo = { Nome: "Programador", Cargo2: "Desenvolvedor", Cargo: "Encarregado Departamento Pessoal"}

    beforeEach('', () => {
        cy.insereCargo('QA')
        cy.insereColaboradorComCompetencias('Helena de Troia')
        cargosFaixaPage.navigate()
    })

    it('Inserção de Cargos', () => {
        cargosFaixaPage.inserir(cargo.Nome)
        cy.validaMensagemSucesso('Faixa gravada com sucesso.')
    })

    it('Edição de Cargos', () => {
        cargosFaixaPage.editar(cargo)
        cy.validaMensagemSucesso('Cargo Atualizado com Sucesso!')
    })

    it('Exclusão de Cargos com Sucesso', () => {
        cargosFaixaPage.excluir('QA')
        util.popUpMessage('Confirma exclusão?')
        cy.validaMensagemSucesso('Cargo excluído com sucesso.')
    })

    it('Exclusão sem Sucesso', () => {
        cargosFaixaPage.excluir(cargo.Cargo)
        util.popUpMessage('Confirma exclusão?')
        util.warningMsg('Não foi possível excluir este cargo.')
    })

    it('Exclusão de Faixa Sem Sucesso', () => {
        cargosFaixaPage.excluirfaixa(cargo.Cargo)
        util.popUpMessage('Confirma exclusão?')
        util.warningMsg('Essa faixa salarial não pode ser removida pois possui dependências no sistema.')
    })

    it('Exclusão de Faixa com Sucesso', () => {
        cargosFaixaPage.excluirfaixa('QA')
        util.popUpMessage('Confirma exclusão?')
        cy.validaMensagemSucesso('Faixa salarial excluída com sucesso.')
    })

    it('Inclusão de Nível de COmpetencia no cargo -Sem competencia cadastrada', () => {
        cargosFaixaPage.insereNivelCompetenciaSemCompetenciaCadastrada(cargo)
        util.popUpMessage('Não existem níveis de competência cadastrados.')
    })
})

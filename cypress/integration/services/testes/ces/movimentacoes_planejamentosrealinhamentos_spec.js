import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { LoginPage } from '../../pages/loginPage'
import { RealinhamentoPage } from '../../pages/realinhamentoPage'

describe('Funcionalidade Cargos e Faixas', () => {
    const loginPage = new LoginPage()
    const realinhamentoPage = new RealinhamentoPage()

    //const cargo = { Nome: "Programador", Cargo2: "Desenvolvedor", Cargo: "Encarregado Departamento Pessoal"}

    beforeEach('', () => {
        cy.reload_db()
        cy.insereReajustePorColaborador('Reajuste Desenvolvimento', true)
        cy.insereReajustePorColaborador('Reajuste Suporte', false)
        cy.insereColaboradorComCompetencias('Helena de Troia')
        realinhamentoPage.navigate()
        loginPage.loggedIn('homolog', '1234')
    })

    it('Cancelar Realinhamentos Planejados', () => {
        realinhamentoPage.cancelarReajuste('Reajuste Desenvolvimento')
        util.popUpMessage('Tem certeza que deseja desfazer os realinhamentos?')
        util.successMsg('Cancelamento efetuado com sucesso.')
    })

    it('Inserir Planejamento de Realinhamento', () => {
        realinhamentoPage.inserirReajuste('Reajuste Fortes Tecnologia')
        util.validaTitulo('Planejamentos de Realinhamentos')
        cy.contains('3 registro(s) encontrado(s).')
    })  

    it('Editar Planejamento de Realinhamento', () => {
        realinhamentoPage.editarReajuste('Reajuste Suporte')
        util.validaTitulo('Editar Planejamento de Realinhamentos')
    })  

    it('Excluir Planejamento de Realinhamento', () => {
        realinhamentoPage.excluirReajuste('Reajuste Suporte')
        util.popUpMessage('Confirma exclusão?')
        util.infoMsg('Planejamento de Realinhamento excluído com sucesso.')
    })  

    it('Solicitar realinhamento quando já existe reajuste para o colaborador', () => {
        realinhamentoPage.reajusteColetivo('Reajuste Suporte')
        util.popUpMessage('Já existe uma solicitação de realinhamento para este talento.')
        
    }) 
})

import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { TamanhoEPIPage } from '../../pages/sst/tamanhoEPIPage'


describe('Funcionalidade Tamanho de EPI', () => {
    const tamanhoEPIPage = new TamanhoEPIPage()

    const tamanhoEPI = {Nome: "GG"}

    beforeEach('', () => {
        cy.insereColaborador('Helena de Troia')
        cy.inserirTamanhoEPI(tamanhoEPI.Nome)
        cy.loginByApi()
        tamanhoEPIPage.navigate()
    })

    it('Inserção Tamanho de EPI', () => {
        tamanhoEPIPage.inserir(tamanhoEPI)
        util.validaTitulo('Tamanhos de EPI/Fardamento')
    });

    it('Edição Tamanho de EPI', () => {
        tamanhoEPIPage.editar(tamanhoEPI)
        util.validaTitulo('Tamanhos de EPI/Fardamento')        
    });

    it('Exclusão Tamanho de EPI', () => {
        tamanhoEPIPage.excluir(tamanhoEPI)
        util.popUpMessage('Confirma exclusão?')
        util.infoMsg('Tamanho excluído com sucesso.')
    });
})
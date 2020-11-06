import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { LoginPage } from '../../pages/loginPage'
import { GrupoAcPage } from '../../pages/grupoACPAge'

describe('Funcionalidade Grupo AC', () => {
    const loginPage = new LoginPage()
    const grupoACPAge = new GrupoAcPage()
    
    const grupoAc = { Descricao: "Grupo AC", Codigo: "001", Usuario: "ADMIN", Senha: "1234", Soap: "http://localhost:1024/soap/IAcPessoal", Wdsl: "http://localhost:1024/wsdl/IAcPessoal" }

    beforeEach('', () => {
        cy.insereGrupoAC('Grupo AC Teste')
        grupoACPAge.navigate()
        loginPage.loggedIn('homolog', '1234')
    })

    it('Inserir Grupo AC - Código já cadastrado', () => {        
        grupoACPAge.insereGrupoAC(grupoAc)
        util.errorMsg("Não é permitido cadastrar Grupo com o mesmo código.")
    })

    it('Inserir Grupo AC', () => {
        const grupoAC = { Descricao: "Grupo AC", Codigo: "002", Usuario: "ADMIN", Senha: "1234", Soap: "http://localhost:1024/soap/IAcPessoal", Wdsl: "http://localhost:1024/wsdl/IAcPessoal" }
        grupoACPAge.insereGrupoAC(grupoAC)
        util.validaTitulo("Grupo AC (Utilizado no Fortes Pessoal)")
    })

    it('Editar Grupo AC', () => {
        grupoACPAge.editar(grupoAc)
        util.validaTitulo("Grupo AC (Utilizado no Fortes Pessoal)")
    })

    it('Excluir Grupo AC', () => {
        grupoACPAge.excluir(grupoAc.Descricao)
        util.popUpMessage('Confirma exclusão?')
        util.infoMsg('Grupo AC excluído com sucesso.')
    })

    it('Excluir Grupo AC - associado ao cadastroo de empresa', () => {
        cy.integraFortesPessoal()
        grupoACPAge.excluir(grupoAc.Codigo)
        util.popUpMessage('Confirma exclusão?')
        util.errorMsg('Não foi possível excluir este Grupo AC.')
    })
})

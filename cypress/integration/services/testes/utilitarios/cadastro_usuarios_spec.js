import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { LoginPage } from '../../pages/loginPage'
import { UsuarioPage } from '../../pages/usuariosPage'

describe('Funcionalidade Cadastros de Usuários', () => {
    const loginPage = new LoginPage()
    const usuariosPage = new UsuarioPage()
    
    //const grupoAc = { Descricao: "Grupo AC", Codigo: "001", Usuario: "ADMIN", Senha: "1234", Soap: "http://localhost:1024/soap/IAcPessoal", Wdsl: "http://localhost:1024/wsdl/IAcPessoal" }

    beforeEach('', () => {
        cy.reload_db()
        usuariosPage.navigate()
        loginPage.loggedIn('homolog', '1234')
    })

    it('Inserir Usuário Automaticamente - Sem Colaboradores Cadastrado', () => {    
        usuariosPage.insereUsuarioAutomaticamente()
        util.infoMsg('Não existe talento sem usuário.')
    })

    it('Inserir Usuário Automaticamente', () => {  
        cy.insereColaborador('Helena de Troia')  
        usuariosPage.insereUsuarioAutomaticamente()
        util.infoMsg('Usuários criados com sucesso.')
    })

    it('Inserir Usuário Automaticamente - Usuario Já Associado a Colaborador', () => {  
        cy.insereUsuarioComEmpregado('Helena de Troia')  
        usuariosPage.insereUsuarioAutomaticamente()
        util.infoMsg('Não existe talento sem usuário.')
    })
})



import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { LoginPage } from '../../pages/loginPage'
import { UsuarioPage } from '../../pages/usuariosPage'

describe('Funcionalidade Cadastros de Usuários', () => {
    const loginPage = new LoginPage()
    const usuariosPage = new UsuarioPage()
    
    

    beforeEach('', () => {
        cy.insereUsuario('usu_teste')
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

    it('Excluir Usuário Logado', () => {   
        usuariosPage.excluir('homolog')
        util.popUpMessage('Confirma exclusão?')
        util.errorMsg('Não foi possível excluir este Usuário. Utilize o campo "Ativo" para retirar o acesso do usuário ao sistema.')
    })

    it('Excluir Usuário', () => {   
        usuariosPage.excluir('usu_teste')
        util.popUpMessage('Confirma exclusão?')
        util.infoMsg('Usuário excluído com sucesso.')
    })

    it('Editar Usuario', () => {   
        usuariosPage.editar('usu_teste')
        util.validaTitulo('Usuários')
    })

    it('Inserir Usuário', () => {  
        const usuario = { Nome: 'usuario', Senha: '1234', ConfSenha: '1234' } 
        usuariosPage.inserir(usuario)
        util.validaTitulo('Usuários')
    })

    it('Inserir Usuário com senhas diferentes', () => {  
        const usuario = { Nome: 'usuario', Senha: '1234', ConfSenha: '1239' } 
        usuariosPage.inserir(usuario)
        util.warningMsg('Senhas não correspondem.')
    })
})



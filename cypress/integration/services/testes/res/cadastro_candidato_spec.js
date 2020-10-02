import '../../../../../cypress.json'
import { LoginPage } from '../../pages/loginPage'
import { ColaboradorCandidatoPage } from '../../pages/ColaboradorCandidatoPage'
import { MessagePage } from '../../pages/messagePage'
import { ModuloExternoPage } from '../../pages/moduloExternoPage'

describe('Gerenciamento de Candidatos', () => {
    const candidatoPage = new ColaboradorCandidatoPage()
    const loginPage = new LoginPage()
    const messagePage = new MessagePage()
    const externoPage = new ModuloExternoPage()

    describe('Cadastros de Candidato no Módulo Externo', () => {
        beforeEach('', () => {
            cy.reload_db()
            externoPage.navigate()
            cy.exec_sql("update parametrosdosistema set camposcandidatoexternovisivel = 'nome,nascimento,naturalidade,sexo,cpf,escolaridade,endereco,fone,comfirmaSenha,senha,formacao,idioma,pis'")
            externoPage.queroMeCadastrar()
        })

        it('Inserção de Candidatos Módulo Externo', () => {
            candidatoPage.inserirCandidatoColaboradorModuloExterno()
            messagePage.popUpMessage('Dados cadastrados com sucesso.')
        })

        it('Inserção de Candidatos Módulo Externo - Exige Aceite LGPD', () => {
            cy.exec_sql("update parametrosdosistema set exigiraceitepsi = true")
            cy.exec_sql("update parametrosdosistema set politicaseguranca = 'Teste'")
            cy.reload()
            candidatoPage.inserirCandidatoColaboradorModuloExterno()
            messagePage.popUpMessage('Você precisa aceitar o Termo de Privacidade e Política de Segurança.')
            candidatoPage.aceitaLGPD()
            candidatoPage.clicaAbaCurriculoGrava()
            messagePage.popUpMessage('Dados cadastrados com sucesso.')
        })
    });

    describe('Cadastro de Candidato no Fortes RH', () => {
        beforeEach('', () => {
            cy.reload_db()
            cy.insereColaborador()
            cy.inserecandidato("Candidato 01")
            candidatoPage.navigate_menu_candidatos()
            loginPage.loggedIn('homolog', '1234')
        })

        context('Cadastro de Candidatos', () => {

            it('Inserção de Candidatos', () => {
                cy.exec_sql("update parametrosdosistema set exigiraceitepsi = true")
                cy.exec_sql("update parametrosdosistema set politicaseguranca = 'Teste'")
                candidatoPage.inserirCandidatoColaborador()
                messagePage.successMsg('Operação efetuada com sucesso')
            })

            it('Valida Parentesco', () => {
                cy.exec_sql("update empresa set verificaparentesco = 'T'")
                candidatoPage.clicaInserir()
                candidatoPage.preencheNomePai()
                messagePage.dialogMessage('Verificação de Parentesco')
            });

            it('Valida Obrigatoriedade do preenchimento do Certficado Militar para sexo Masculino', () => {
                cy.exec_sql("update parametrosdosistema set camposcandidatoobrigatorio = 'nome,sexo,escolaridade,ende,num,cidade,uf,fone,ddd,certificadoMilitar,certMilTipo,certMilSerie'")
                cy.reload()

                candidatoPage.inserirCandidatoColaborador('Masculino')
                messagePage.popUpMessage('Preencha os campos indicados:')
            });

            it('Valida Não Obrigatoriedade do preenchimento do Certficado Militar para sexo Feminino', () => {
                cy.exec_sql("update parametrosdosistema set camposcandidatoobrigatorio = 'nome,sexo,escolaridade,ende,num,cidade,uf,fone,ddd,certificadoMilitar,certMilTipo,certMilSerie'")
                cy.reload()

                candidatoPage.inserirCandidatoColaborador('Feminino')
                messagePage.successMsg('Operação efetuada com sucesso')
            });

            it('Valida Homonimos', () => {
                cy.inserecandidato("Amy Winehouse")
                candidatoPage.clicaInserir()
                candidatoPage.preencheCandidatoHomonimo('Amy Winehouse')
            });

            it('Candidato Já Cadastrado', () => {
                cy.insereCandidato("Amy Winehouse")
                candidatoPage.insereColaboradorCpfExistente()
                messagePage.dialogMessage('CPF já cadastrado')
            })
        })

        context('Tentativas de Edição de Cadastro de Candidatos', () => {
            it('Edição Cadastro de Candidatos', () => {
                cy.reload()
                candidatoPage.editarCandidatoColaborador('Candidato 01')
            })
        })

        context('Tentativas de Exclusão de Cadastro de Candidatos', () => {
            it('Exclusão de Cadastro de Candidatos', () => {
                cy.reload()
                candidatoPage.excluirCandidatoColaborador('Candidato 01')
                messagePage.popUpMessage('Deseja realmente excluir o candidato Candidato 01?')
                messagePage.successMsg('Candidato excluído com sucesso.')
            });

            it('Exclusão de Cadastro de Candidatos em Lote', () => {
                cy.inserecandidato("Candidato 01")
                cy.inserecandidato("Candidato 02")
                cy.inserecandidato("Candidato 03")
                cy.inserecandidato("Candidato 04")
                cy.inserecandidato("Candidato 05")
                cy.reload()
                candidatoPage.excluirCandidatoColaboradorLote()
                messagePage.popUpMessage('Deseja realmente excluir os candidatos?')
                messagePage.infoMsg('Não existem candidatos a serem listados')
            });
        })
    })

    describe('Outras Rotinas do Candidato', () => {

        beforeEach('', () => {
            cy.reload_db()
            cy.inserirSolicitacaoPessoal()
            cy.inserecandidato("Candidato 01")
            candidatoPage.navigate_menu_candidatos()
            loginPage.loggedIn('homolog', '1234')
        })

        it('Anexar Documentos', () => {
            candidatoPage.anexaDocs("Candidato 01")
        })

        it('Contratar Candidato', () => {
            candidatoPage.contrataCandidato("Candidato 01")
            messagePage.dialogMessage('Contratar candidato')
            messagePage.confirmarDialogMessage()
            messagePage.validaTitulo('Inserir Talento')
        })

        it('Curriculo Escaneado - Usando o cadastro do candidato', () => {
            candidatoPage.insereCurriculoEscaneado("Candidato 01")
        })

        it('Curriculo Escaneado - Usando o Botão', () => {
            candidatoPage.insereCurriculoEscaneado()
        })

        it('Inserir Candidato em Solicitação de Pessoal', () => {
            candidatoPage.inserirEmSolicitacao("Candidato 01")
            messagePage.validaTitulo('Candidatos da Seleção')
        })       

        it('Triagem de Candidatos', () => {
            candidatoPage.triagemCandidato()
            messagePage.validaTitulo('Triagem de Currículos')
        })       

        it('Incluir Curriculo Digitado', () => {
            candidatoPage.inserirCurriculoDigitado()
            messagePage.infoMsg('Currículo (Curriculo Digitado) cadastrado com sucesso.')
        })


    })
})
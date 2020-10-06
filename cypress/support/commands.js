import 'cypress-capybara/add-commands'

Cypress.Commands.add("exec_sql", (sql) => {
    cy.task('query', sql)
})

//INFORMAÇÕES QUE RODAM ANTES DO INICIO DOS TESTES

Cypress.Commands.add("reload_db", () => {
    cy.exec('node reload_db.js') 
    // O script abaixo ajusta o perfil ADMINISTRADOR para ter acesso a todos os menus
    cy.exec_sql("CREATE OR REPLACE FUNCTION insert_papel_perfil_administrador() RETURNS integer AS $$ DECLARE     mviews RECORD; BEGIN     FOR mviews IN       select p.id as papelId from papel p where p.id not in (select papeis_id from perfil_papel where perfil_id = 1)     LOOP         INSERT INTO perfil_papel (perfil_id, papeis_id) VALUES (1, mviews.papelId);      END LOOP;     RETURN 1; END; $$ LANGUAGE plpgsql;")
    cy.exec_sql("select insert_papel_perfil_administrador();")
    cy.exec_sql("drop function insert_papel_perfil_administrador();") 
})

Cypress.Commands.add("insereUsuario", (param) => {
    cy.exec_sql("insert into usuario values (nextval('usuario_sequence'),'" + param + "', '" + param + "', 'MTIzNA==', true, null, false, (select caixasmensagens from usuario where nome = 'SOS'), null)")
    cy.exec_sql("insert into usuarioempresa values (nextval('usuarioempresa_sequence'), (select id from usuario where nome = '" + param + "'), 1, 1)")
})

Cypress.Commands.add("insereUsuarioComEmpregado", (usuario) => {
    cy.exec_sql("insert into usuario values (nextval('usuario_sequence'),'" + usuario + "', '" + usuario + "', 'MTIzNA==', true, null, false, (select caixasmensagens from usuario where nome = 'SOS'), null)")
    cy.exec_sql("insert into usuarioempresa values (nextval('usuarioempresa_sequence'), (select id from usuario where nome = '" + usuario + "'), 1, 1)")
    cy.exec_sql("insert into colaborador values (nextval('colaborador_sequence'), null, 'colaborador teste', 'colaborador teste', false, null, null, '01/01/2020', 'Rua A', '111', null, 'Cambeba', '60822285', '34425164555', '12345678919', null, null, null, null, null, null, null, null, false, null, 0, 'M', '01/01/1980', '03', '03', '85', '40051111', null, 'teste@teste.com.br', 'E', null, null, null, false, 1, 1, 946, (select id from usuario where nome = '" + usuario + "'), null, null, '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, false, null,null, null, null, null, null, null, '25/09/2020', null, null, null, null, null, null, null, null, null, null, null, null, false)")
})

Cypress.Commands.add("insereUsuarioSemSenhaComEmpregado", (usuario) => {
    cy.exec_sql("insert into usuario values (nextval('usuario_sequence'),'" + usuario + "', '" + usuario + "', null, true, null, false, (select caixasmensagens from usuario where nome = 'SOS'), null)")
    cy.exec_sql("insert into usuarioempresa values (nextval('usuarioempresa_sequence'), (select id from usuario where nome = '" + usuario + "'), 1, 1)")
    cy.exec_sql("insert into colaborador values (nextval('colaborador_sequence'), null, 'colaborador teste', 'colaborador teste', false, null, null, '01/01/2020', 'Rua A', '111', null, 'Cambeba', '60822285', '34425164555', '12345678919', null, null, null, null, null, null, null, null, false, null, 0, 'M', '01/01/1980', '03', '03', '85', '40051111', null, 'teste@teste.com.br', 'E', null, null, null, false, 1, 1, 946, (select id from usuario where nome = '" + usuario + "'), null, null, '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, false, null,null, null, null, null, null, null, '25/09/2020', null, null, null, null, null, null, null, null, null, null, null, null, false)")
})

Cypress.Commands.add("insereColaborador", () => {
    cy.exec_sql("insert into colaborador values (nextval('colaborador_sequence'), null, 'colaborador teste', 'colaborador teste', false, null, null, '01/01/2020', 'Rua A', '111', null, 'Cambeba', '60822285', '34425164555', '12345678919', null, null, 'João Paulo', null, null, null, null, null, false, null, 0, 'M', '01/01/1980', '03', '03', '85', '40051111', null, 'teste@teste.com.br', 'E', null, null, null, false, 1, 1, 946, null, null, null, '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, false, null,null, null, null, null, null, null, '25/09/2020', null, null, null, null, null, null, null, null, null, null, null, null, false)")
    cy.exec_sql("insert into historicocolaborador values (nextval('historicocolaborador_sequence'), 2000, '01/05/2020', 'C', null, (select id from colaborador where nome = 'colaborador teste'), (select id from areaorganizacional where id = 2), null, null, null, (select id from estabelecimento where nome = 'Estabelecimento Padrão'), 3, null, 0, null, null, 1, null, null)")
})

Cypress.Commands.add("insereEtapaSeletiva", () => {
    cy.exec_sql("insert into etapaseletiva values (nextval('etapaseletiva_sequence'), 'Entrevista Com Gestor', 1, (select id from empresa where nome = 'Empresa Padrão'))")
})

Cypress.Commands.add("insereMotivoSolicitacao", () => {
    cy.exec_sql("insert into motivosolicitacao values (nextval('motivosolicitacao_sequence'), 'Solicitação de Pessoal', false, false)")
})

Cypress.Commands.add("inserirSolicitacaoPessoal", () => {
    cy.exec_sql("insert into cargo values (nextval('cargo_sequence'), 'Cargo Teste', 'Cargo Teste', null, null, null, null, null, null, null, null, null, (select id from empresa where nome = 'Empresa Padrão'), true, true, null, null)")
    cy.exec_sql("insert into faixasalarial values (nextval('faixasalarial_sequence'), 'Faixa_Nome', null, (select id from cargo where nome = 'Cargo Teste'), null, '252510')")
    cy.exec_sql("insert into areaorganizacional values (nextval('areaorganizacional_sequence'), 'Área Teste', null, null, (select id from empresa where nome = 'Empresa Padrão'), true, null, true)")
    cy.exec_sql("insert into cargo_areaorganizacional values ((select id from cargo where nome = 'Cargo Teste'), (select id from areaorganizacional where nome = 'Área Teste'))")
    cy.exec_sql("insert into motivosolicitacao values (nextval('motivosolicitacao_sequence'), 'Aumento de Quadro', false, false)")
    cy.exec_sql("insert into solicitacao values (nextval('solicitacao_sequence'), '01/01/2020', null, 10, 'E', '02', 1000, null, null, 'I', null, false, false, null, (select id from motivosolicitacao where descricao = 'Aumento de Quadro'), (select id from areaorganizacional where nome = 'Área Teste'), 1, 1, null, (select id from empresa where nome = 'Empresa Padrão'), 1, 'Solicitação', 1, 'Horário', 'A', null, null, null, null, '01/01/2020', false, null, null)")
})
Cypress.Commands.add("inserirAreaOrganizacional", () => {
    cy.exec_sql("insert into areaorganizacional values (nextval('areaorganizacional_sequence'), 'Desenvolvimento', null, null, (select id from empresa where nome = 'Empresa Padrão'), true, null, true)")
    
})

Cypress.Commands.add("insereSolicitacaoEmAnalise", () => {
    cy.exec_sql("delete from solicitacao")
    cy.exec_sql("insert into solicitacao values (nextval('solicitacao_sequence'), '01/02/2020', null, 1, 'E', '02', 1000, null, null, 'I', null, false, false, null, (select id from motivosolicitacao where descricao = 'Aumento de Quadro'), (select id from areaorganizacional where nome = 'Área Teste'), 1, 1, null, (select id from empresa where nome = 'Empresa Padrão'), 1, 'Vaga para DEV', 1, 'Horário', 'I', null, null, null, null, '01/01/2020', false, null, null)")
})

Cypress.Commands.add("insereAreaInteresse", (areaInteresse_nome) => {
    cy.exec_sql("insert into areainteresse values (nextval('areainteresse_sequence'), '"+areaInteresse_nome+"', null, (select id from empresa where nome = 'Empresa Padrão'))")
})

Cypress.Commands.add("insereAreaFormacao", (areaFormação_nome) => {
    cy.exec_sql("insert into areaformacao values (nextval('areaformacao_sequence'), '"+areaFormação_nome+"')")
})

Cypress.Commands.add("insereCargo", () => {
    cy.exec_sql("insert into cargo values (nextval('cargo_sequence'), 'Cargo Teste', 'Cargo Teste', null, null, null, null, null, null, null, null, null, (select id from empresa where nome = 'Empresa Padrão'), true, true, null, null)")
    cy.exec_sql("insert into faixasalarial values (nextval('faixasalarial_sequence'), 'Faixa_Nome', null, (select id from cargo where nome = 'Cargo Teste'), null, '252510')")
})

Cypress.Commands.add("inserecandidato", (candidato_nome) => {
    cy.exec_sql("insert into candidato values (nextval('candidato_sequence'), '" + candidato_nome + "', 'MTIzNA==', null, null, null, null, 'Rua Ciro Monteiro', '222', null, 'Cambeba', '60822285', null, null, null, null, '39210359372', null, null, 'Fortaleza', null, null, null, null, null, null, false, null, 0, 'M', '01/01/1980', '01', '03', false, 0, 0, false, null, null, null, null, null, 'E', 1000, true, false, false, null, null, null, '01/09/2020', 'C', null, 1, 946, null, '0', null, null, null, null,null, null, null, null, null, null, null, null, null, null, 1, null, null, '01/09/2020', null, null, null, null, null, null, null, 'NAO VERIFICADO', null)")
})

Cypress.Commands.add("insereCandidato", (candidato_nome) => {
    cy.exec_sql("insert into candidato values (nextval('candidato_sequence'), '" + candidato_nome + "', 'MTIzNA==', null, null, null, null, 'Rua Ciro Monteiro', '222', null, 'Cambeba', '60822285', null, null, null, null, '92621219110', null, null, 'Fortaleza', null, null, null, null, null, null, false, null, 0, 'M', '01/01/1980', '01', '03', false, 0, 0, false, null, null, null, null, null, 'E', 1000, true, false, false, null, null, null, '01/09/2020', 'C', null, 1, 946, null, '0', null, null, null, null,null, null, null, null, null, null, null, null, null, null, 1, null, null, '01/09/2020', null, null, null, null, null, null, null, 'NAO VERIFICADO', null)")
})

Cypress.Commands.add("insereCandidatoExterno", (candidato_nome) => {
    cy.exec_sql("insert into candidato values (nextval('candidato_sequence'), '" + candidato_nome + "', 'MTIzNA==', null, null, null, null, 'Rua Ciro Monteiro', '222', null, 'Cambeba', '60822285', null, null, null, null, '92621219110', null, null, 'Fortaleza', null, null, null, null, null, null, false, null, 0, 'M', '01/01/1980', '01', '03', false, 0, 0, false, null, null, null, null, null, 'E', 1000, true, false, false, null, null, null, '01/09/2020', 'E', null, 1, 946, null, '0', null, null, null, null,null, null, null, null, null, null, null, null, null, null, 1, null, null, '01/09/2020', null, null, null, null, null, null, null, 'NAO VERIFICADO', null)")
    cy.exec_sql("insert into candidatosolicitacao values (nextval('candidatosolicitacao_sequence'), true, (select id from candidato where nome = '" + candidato_nome + "'), 1, 'I', null, null, null, null)")
})

Cypress.Commands.add("inseremodeloAvaliacaoCandidato", (avaliacao_nome) => {
    cy.exec_sql("insert into avaliacao values (nextval('avaliacao_sequence'), '" + avaliacao_nome + "', '', true, (select id from empresa where nome = 'Empresa Padrão'), 'S', null, false, false, null, false)")
    cy.exec_sql("insert into pergunta values (nextval('pergunta_sequence'), 1, 'Pergunta 01', false, 'null', 4, null, null, 1, 10, 1, (select id from avaliacao where titulo = '" + avaliacao_nome + "'), false)")
})

Cypress.Commands.add("integraFortesPessoal", () => {
    cy.exec_sql("update empresa set acintegra = true")
})

Cypress.Commands.add("insereIndices", (indice_nome) => {
    cy.exec_sql("insert into indice values (nextval('indice_sequence'), '" + indice_nome + "', null, null)")
})

Cypress.Commands.add("insereIndicesComHistorico", (indice_nome) => {
    cy.exec_sql("insert into indice values (nextval('indice_sequence'), '" + indice_nome + "', null, null)")
    cy.exec_sql("insert into indicehistorico values (nextval('indicehistorico_sequence'), '01/10/2020', 2000, (select id from indice where nome = '" + indice_nome + "'), null)")
})

Cypress.Commands.add("insereGrupoAC", (grupoAc_nome) => {
    cy.exec_sql("insert into grupoac values (nextval('grupoac_sequence'), '999', '" + grupoAc_nome + "', null, null, null, null)")
    
})

Cypress.Commands.add('excluirTodos', () => {
    cy.get('#md').check()
    cy.get('#btnExcluirSelecionados').click()

})






// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
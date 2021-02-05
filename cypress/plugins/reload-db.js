const createPool = require('./pool');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const createInterface = file => readline.createInterface({
  input: fs.createReadStream(path.resolve(file)),
  console: false
});

const selectTableNames = async (client) => {
  const { rows } = await client.query("SELECT table_name FROM information_schema.tables WHERE table_type = 'BASE TABLE' AND table_schema NOT IN ('pg_catalog', 'information_schema');");
  return rows.map(({ table_name })=> table_name);
}

const cleanDatabase = async (client, database) => {
  console.log("Limpando banco de dados, apagando todos os registros.");
  await client.query(`select alter_trigger(table_name, 'DISABLE') FROM information_schema.constraint_column_usage  where table_schema='public'  and table_catalog='${database}' group by table_name;`)
  const tables = await selectTableNames(client);
  await client.query(
    tables.map(table_name => `delete from ${table_name};`).join('')
  );
  tables.forEach(async (table) => {
    try {
      await client.query(`alter table ${table} alter column id set default nextval('${table}_sequence');`);
    }catch(ignored) {}
  });
  await client.query(
    `select alter_trigger(table_name, 'ENABLE') FROM information_schema.constraint_column_usage  where table_schema='public'  and table_catalog='${database}' group by table_name;`
  );
  console.log('Limpeza do banco de dados realizada com sucesso!');
}

const populateDatabase = async (client) => {
  console.log('Populando banco de dados');
  const interface = createInterface('create_data.sql');
  let i = 0;
  const sql = [];

  for await (const line of interface) {
    if ( !!line.match(/^(set|select)/i) ) {
        sql.push(line);
    } else if (!!line.match(/( cid | codigoCBO | cidade | areaformacao )/i) ) {
      if (!!line.match(/^insert into cidade.*Fortaleza/i)){
        sql.push(line);
      }else if (!!line.match(/^insert into/i) && i <= 6) {
        i += 1;
        sql.push(line);
      }else if (!!line.match(/^alter table/i)) {
        i = 0;
        sql.push(line);
      }
    } else if (!!line.match(/^(alter table|insert into)/i)) {
      sql.push(line);
    }
    const alterTableline = line.match(/^alter table (.*) disable trigger all/i);
    if (!!alterTableline) {
      try {
        const tableName = alterTableline[1];
        await client.query(`select pg_catalog.setval('${tableName}_sequence',10000 , false);`);
      } catch(ex) {}
    }
  }
  await client.query(sql.join(' '));
  console.log("Banco de dados populado com sucesso.");
}

const setupSOSAccess = async (client) => {
  console.log("Atualizando configurações para ambiente de desenvolvimento.");
  const proximaVersao = `${new Date().getFullYear()+10}-01-01`;
  [
    "SELECT pg_catalog.set_config('search_path', 'public', false);",
    "CREATE OR REPLACE FUNCTION insert_papel_perfil_administrador() RETURNS integer AS $$ DECLARE     mviews RECORD; BEGIN     FOR mviews IN       select p.id as papelId from papel p where p.id not in (select papeis_id from perfil_papel where perfil_id = 1)     LOOP         INSERT INTO perfil_papel (perfil_id, papeis_id) VALUES (1, mviews.papelId);      END LOOP;     RETURN 1; END; $$ LANGUAGE plpgsql;",
    "select insert_papel_perfil_administrador();",
    "drop function insert_papel_perfil_administrador();",
    "delete from cartao",
    `update parametrosdosistema set proximaversao = '${proximaVersao}'`,
    "update parametrosdosistema set servidorremprot = 'FORTESAG'",
    "update parametrosdosistema set appurl = 'http://localhost:8080/fortesrh'",
    "update parametrosdosistema set appcontext = '/fortesrh'",
    "insert into usuario values (nextval('usuario_sequence'),'homolog', 'homolog', 'MTIzNA==', true, null, false, (select caixasmensagens from usuario where nome = 'SOS'), null)",
    "insert into usuarioempresa values (nextval('usuarioempresa_sequence'), (select id from usuario where nome = 'homolog'), 1, 1)"
  ].forEach( async(query) => client.query(query) );
  console.log("Configurações atualizadas com sucesso.");
}

const reloadDB = ({ env }) => async () => {
  const client = await createPool(env.db).connect();
  try{
    await cleanDatabase(client, env.db.database);
    await populateDatabase(client);
    await setupSOSAccess(client);
  }catch(ex) {
    console.log(ex);
    throw ex;
  }finally {
    client.release();
  }
  return null;
}

module.exports = reloadDB;
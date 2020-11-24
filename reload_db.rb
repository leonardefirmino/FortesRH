require "rubygems"
require "pg"

$db_name = "fortesrh"
$db_user = "fortesrh"
$host = "localhost"
$port = 55432

def popula_db(conn)
  puts "Populando banco de dados com dados iniciais..."
  i = 0
  sql = ""
  File.readlines("create_data.sql").each do |linha|
    if linha =~ /^(set|select)/i
      sql << linha
    elsif linha =~ /( cid | codigoCBO | cidade | areaformacao )/i
      if linha =~ /^insert into cidade.*Fortaleza/i
        sql << linha
      elsif linha =~ /^insert into/i and i <= 6
        i += 1
        sql << linha
      elsif linha =~ /^alter table/i
        i = 0
        sql << linha
      end
    elsif linha =~ /^(alter table|insert into)/i
      sql << linha
    end

    if linha =~ /^alter table (.*) disable trigger all/i
      begin
        sql << conn.exec("select pg_catalog.setval('#{$1}_sequence',10000 , false);")
      rescue Exception => e
      end
    end
  end

  conn.exec(sql)

  puts "Banco de dados populado com sucesso."
end

def reload_db
  puts "Limpando banco de dados, apagando todos os registros."
  conn = nil
  begin
    conn = PG::Connection.open(:dbname => $db_name, :user => "fortesrh", :host => "localhost", :port => 55432)
    conn.exec("select alter_trigger(table_name, 'DISABLE') FROM information_schema.constraint_column_usage  where table_schema='public'  and table_catalog='#{$db_name}' group by table_name;")

    tables = conn.exec("SELECT table_name FROM information_schema.tables WHERE table_type = 'BASE TABLE' AND table_schema NOT IN ('pg_catalog', 'information_schema');")
    delete_tables = tables.map { |table| "delete from #{table["table_name"]};" }.join()

    conn.exec delete_tables

    alter_table_sequence = tables.map { |table| "alter table #{table["table_name"]} alter column id set default nextval('#{table["table_name"]}_sequence');" }
    alter_table_sequence.each do |comando|
      begin
        conn.exec comando
      rescue Exception => e
      end
    end

    conn.exec("select alter_trigger(table_name, 'ENABLE') FROM information_schema.constraint_column_usage  where table_schema='public'  and table_catalog='#{$db_name}' group by table_name;")

    puts "Limpeza do banco de dados realizada com sucesso"

    popula_db conn
    # O script abaixo ajusta o perfil ADMINISTRADOR para ter acesso a todos os menus
    exec_sql "CREATE OR REPLACE FUNCTION insert_papel_perfil_administrador() RETURNS integer AS $$ DECLARE     mviews RECORD; BEGIN     FOR mviews IN       select p.id as papelId from papel p where p.id not in (select papeis_id from perfil_papel where perfil_id = 1)     LOOP         INSERT INTO perfil_papel (perfil_id, papeis_id) VALUES (1, mviews.papelId);      END LOOP;     RETURN 1; END; $$ LANGUAGE plpgsql;"
    exec_sql "select insert_papel_perfil_administrador();"
    exec_sql "drop function insert_papel_perfil_administrador();"
    exec_sql "delete from cartao"
    exec_sql "update parametrosdosistema set proximaversao = '2030-01-01'"
    exec_sql "update parametrosdosistema set servidorremprot = 'FORTESAG'"
    exec_sql "update parametrosdosistema set appurl = 'http://localhost:8080/fortesrh'"
    exec_sql "update parametrosdosistema set appcontext = '/fortesrh'"
    exec_sql "insert into usuario values (nextval('usuario_sequence'),'homolog', 'homolog', 'MTIzNA==', true, null, false, (select caixasmensagens from usuario where nome = 'SOS'), null)"
    exec_sql "insert into usuarioempresa values (nextval('usuarioempresa_sequence'), (select id from usuario where nome = 'homolog'), 1, 1)"
  ensure
    conn.finish if conn
  end
end

def exec_sql(sql)
  begin
    conn = PG::Connection.open(:dbname => $db_name, :user => "fortesrh", :host => "localhost", :port => $port)
    conn.exec(sql)
  ensure
    conn.finish if conn
  end
end

if ARGV[0] == "--start"
  reload_db
end

const createPool = require('./pool');

const runQuery = ({ env }) => query => {
  return new Promise((resolve, reject) => {
    const pool = createPool(env.db);
    pool.query(query, (error, response) => {
      pool.end();
      if(error) {
        console.log('Error executing query.');
        reject(error);
      }
      console.log('Query executed successfully.')
      resolve(response);
    })
  });
}

module.exports = runQuery;
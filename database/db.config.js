const mysql2 = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const connection = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT || 3306,
  connectionLimit: 10,
});


module.exports = connection.promise();

//connection test
// connection.execute(`select 'test'`, (err, result) => {
//   if (err) return console.error(err.message);

//   console.log(result);
// });



//  process.env.DB_PASSWORD,

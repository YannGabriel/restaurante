const mysql = require("mysql2/promise");

const conexao = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "restaurante",
});

async function testConection() {
  try {
     await conexao.query("SELECT 1");
    console.log("Conexão feita com sucesso!");
  } catch (error) {
    console.error("O banco de dados não conseguiu se conectar!", error);
  }
}

testConection();

module.exports = conexao
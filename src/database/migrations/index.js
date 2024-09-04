import { sqlCreateTasksTable, sqlCreateUsersTable } from "./01-init.js";
import mysqlConnection from "../mysql/mysqlConnect.js";

const createTablesInit = async () => {
  let connection;
  try {
    connection = await mysqlConnection.getConnection();
    await connection.query(sqlCreateUsersTable);
    await connection.query(sqlCreateTasksTable);

    console.log("As tabelas fora criadas com sucesso!");
  } catch (error) {
    console.error("Erro ao criar as tabelas:", error);
} finally {
    if (connection) {
        connection.release(); // Liberar a conexão após o uso
    }
}
};

export default createTablesInit;

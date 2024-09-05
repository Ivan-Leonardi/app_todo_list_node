import mysqlConnection from "../../database/mysql/mysqlConnect.js";

class GetAllTasksController {
  async getAll(req, res) {
    const user_id = req.user.id;

    const database = mysqlConnection;

    try {
      const [tasks] = await database.query("SELECT * FROM tasks WHERE user_id = ?", [
        user_id,
      ]);

      if (!tasks) {
        return res.status(404).json({
          message: "Nenhum tarefa encontrada",
        });
      }

      res.status(200).json(tasks);
    } catch (error) {
      console.error("Erro ao listar tarefas:", error.message);
      return res.status(500).json({ error: "Erro ao listar tarefas" });
    }
  }
}

export default GetAllTasksController;

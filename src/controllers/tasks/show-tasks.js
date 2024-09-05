import mysqlConnection from "../../database/mysql/mysqlConnect.js";

class ShowTaskController {
  async showTask(req, res) {
    const user_id = req.user.id;
    const { id } = req.params;

    const database = mysqlConnection;

    try {
      const [task] = await database.query(
        "SELECT * FROM tasks WHERE id = ? AND user_id =?",
        [id, user_id]
      );

      if (task.length === 0) {
        return res.status(404).json({
          message: "Tarefa não encontrada ou não pertence ao usuário logado",
        });
      }

      return res.status(200).json(task[0]);
    } catch (error) {
      console.error("Erro ao buscar a tarefa:", error.message);
      return res.status(500).json({ error: "Erro ao buscar a tarefa" });
    }
  }
}

export default ShowTaskController;

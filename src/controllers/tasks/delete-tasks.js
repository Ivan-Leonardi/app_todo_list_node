import mysqlConnection from "../../database/mysql/mysqlConnect.js";

class DeleteTaskController {
  async deleteTask(req, res) {
    const user_id = req.user.id;
    const { id } = req.params;

    const database = mysqlConnection;

    try {
      const [task] = await database.query(
        "SELECT * FROM tasks WHERE id = ? AND user_id = ?",
        [id, user_id]
      );

      console.log(task)

      if (task.length === 0) {
        return res.status(404).json({
          message: "Tarefa não encontrada ou não pertence ao usuário logado",
        });
      }

      await database.query("DELETE FROM tasks WHERE id = ? AND user_id = ?", [
        id,
        user_id,
      ]);

      return res.status(200).json({
        message: "Tarefa excluída com sucesso",
      });
    } catch (error) {
      console.error("Erro ao deletar a tarefa:", error.message);
      return res.status(500).json({ error: "Erro ao deletar a tarefa" });
    }
  }
}

export default DeleteTaskController;

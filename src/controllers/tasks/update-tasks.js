import mysqlConnection from "../../database/mysql/mysqlConnect.js";
import * as yup from "yup";

class UpdateTaskController {
  async updateTask(req, res) {
    const schemaUpdateTask = yup.object().shape({
      is_completed: yup.boolean().optional(),
      status: yup
        .mixed()
        .oneOf(["pending", "in_progress", "completed"])
        .optional(),
    });

    const user_id = req.user.id;
    const { id } = req.params;
    const { is_completed, status } = req.body;

    const database = mysqlConnection;

    try {
      await schemaUpdateTask.validate(req.body);

      const [task] = await database.query(
        "SELECT * FROM tasks WHERE id = ? AND user_id = ?",
        [id, user_id]
      );

      if (task.length === 0) {
        return res.status(404).json({
          message: "Tatefa não encontrada ou não pertence ao usuário logado",
        });
      }

      if (is_completed === undefined && !status) {
        return res.status(200).json({
          message: "Não houve nenhuma atualização fornecida",
        });
      }

      let query = "UPDATE tasks SET";
      const values = [];

      if (is_completed !== undefined) {
        query += " status = ?";
        values.push(status);
      }

      query += "WHERE id = ? AND user_id = ?";
      values.push(id, user_id);

      await database.query(query, values);

      return res.status(200).json({
        message: "Tarefa atualizada com sucesso",
      });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return res.status(400).json({
          message: "Erro de validação",
          errors: error.errors,
        });
      }
      console.error("Erro ao atualizar a tarefa:", error.message);
      return res.status(500).json({ error: "Erro ao atualizar a tarefa" });
    }
  }
}

export default UpdateTaskController;
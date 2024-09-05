import mysqlConnection from "../../database/mysql/mysqlConnect.js";
import * as yup from "yup";
import { format } from "date-fns";

class CreateTaskController {
  async create(req, res) {
    const { title, description, due_date } = req.body;
    const user_id = req.user.id;

    const database = mysqlConnection;

    const schemaTaks = yup.object().shape({
      title: yup
        .string()
        .required("Insira um título")
        .min(3, "O título deve ter no mínimo 3 caracteres")
        .max(255, "O título deve ter no máximo 255 caracteres"),
      description: yup
        .string()
        .required("Insira uma descrição da sua tarefa")
        .min(3, "Deve conter no mínimo 3 caracteres"),
      due_date: yup
        .date()
        .required("A data de vencimento é obrigatória")
        .min(
          new Date(),
          "A data de vencimento não pode ser anterior a data atual"
        ),
    });

    const dueDateFormated = format(new Date(due_date), 'yyyy-MM-dd HH:mm:ss')

    try {
      await schemaTaks.validate(req.body);

      const [task] = await database.query(
        "INSERT INTO tasks (title, description, due_date, user_id) VALUES (?, ?, ?, ?)",
        [title, description, dueDateFormated, user_id]
      );

      return res.status(201).json({ message: "Tarefa criada com sucesso" });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return res.status(400).json({
          message: "Erro na validação dos dados inseridos",
          errors: error.errors,
        });
      }
      console.error("Erro ao criar a tarefa", error);
      return res.status(500).json({
        message: "Erro ao criar tarefa!",
      });
    }
  }
}

export default CreateTaskController;

import mysqlConnection from "../../database/mysql/mysqlConnect.js";
import * as yup from "yup";
import { format, addHours } from "date-fns";

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

        const dueDateFormated = format(
            addHours(new Date(due_date), -3),
            "yyyy/MM/dd HH:mm:ss"
        ); // Ajusta para o fuso horário do Brasil (UTC-3)

        try {
            await schemaTaks.validate(req.body);

            const [result] = await database.query(
                "INSERT INTO tasks (title, description, due_date, user_id) VALUES (?, ?, ?, ?)",
                [title, description, dueDateFormated, user_id]
            );

            const [task] = await database.query(
                "SELECT * FROM tasks WHERE id = ?",
                [result.insertId]
            );

            const formattedDueDate = format(
                new Date(task[0].due_date),
                "dd/MM/yyyy"
            );

            task[0].due_date = formattedDueDate;
            console.log(task[0])

            return res
                .status(201)
                .json(task[0]);
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

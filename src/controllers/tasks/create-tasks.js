import mysqlConnection from "../../database/mysql/mysqlConnect.js";
import * as yup from "yup";
import { format } from "date-fns";


class CreateTaskController {
    async create(req, res) {
        const { title, description, due_date } = req.body;
        const user_id = req.user.id;

        const database = mysqlConnection;

        // Validação dos campos com Yup
        const schemaTask = yup.object().shape({
            title: yup
                .string()
                .required("Insira um título")
                .min(3, "O título deve ter no mínimo 3 caracteres")
                .max(255, "O título deve ter no máximo 255 caracteres"),
            description: yup
                .string()
                .required("Insira uma descrição da sua tarefa")
                .min(3, "A descrição deve conter no mínimo 3 caracteres"),
            due_date: yup
                .date()
                .required("A data de vencimento é obrigatória")
                .min(
                    new Date(),
                    "A data de vencimento não pode ser anterior à data atual"
                ),
        });

        try {
            // Valida os dados inseridos
            await schemaTask.validate(req.body);      

            // Insere a tarefa no banco de dados
            const [result] = await database.query(
                "INSERT INTO tasks (title, description, due_date, user_id) VALUES (?, ?, ?, ?)",
                [
                    title,
                    description,
                   due_date,
                    user_id,
                ]
            );

            // Busca a tarefa recém-criada para retornar
            const [task] = await database.query(
                "SELECT * FROM tasks WHERE id = ?",
                [result.insertId]
            );

            // Formata a data para "dd/MM/yyyy" antes de enviar como resposta
            task[0].due_date = format(new Date(task[0].due_date), "dd/MM/yyyy");

            return res.status(201).json(task[0]);
        } catch (error) {
            // Se for erro de validação, retorna o erro detalhado
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

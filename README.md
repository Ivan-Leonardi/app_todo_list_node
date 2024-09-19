<h1 align="center" style="font-weight: bold;">Todo-Experts💻</h1>

<p align="center">
 <a href="#tech">Tecnologias</a> •
 <a href="#started">Iniciar o projeto</a> •
  <a href="#routes">Endpoints da API</a>
</p>

<p align="center">
    <b>Api do App Todo-Experts</b>
</p>

<h2 id="technologies">💻 Tecnologias</h2>

- NodeJS
- Express
- Bcrypt
- Date-fns
- JWT
- Mysql
- yup

<h2 id="started">🚀 Iniciar o projeto</h2>

<h3>Requisitos</h3>

- NodeJS v-v20.16.0

<h3>Clonar o projeto</h3>

```bash
git clone https://github.com/Ivan-Leonardi/app_todo_list_node.git
```

<h3>Config .env variáveis de ambiente</h2>

Substitua o arquivo `.env.example` pela suas credenciais no aquivo `.env`.

```yaml
DB_HOST=localhost
DB_NAME=seu_banco_dados
DB_PASSWORD=sua_senha
DB_USER=seu-usuario_banco_dados
DB_PORT=sua-porta_banco_dados
AUTH_SECRET=sua_chave-secreta
PORT=sua_porta_localhost_servidor
```

<h3>Start</h3>

Para rodar o projeto

```bash
cd api
npm install
npm run dev
```

<h2 id="routes">📍 Endpoints da API</h2>

Principais rotas
​
| rota              | descrição                                         
|----------------------|-----------------------------------------------------
| <kbd>POST /users</kbd>  | cadastrar um usuário
| <kbd>POST /sessions</kbd>  | autenticar um usuário
| <kbd>POST /tasks</kbd>  | inserir uma tarefa
| <kbd>GET /tasks</kbd>  | listar todas as tarefas
| <kbd>GET /tasks/:id</kbd>  | listar uma tarefa específica
| <kbd>DELETE /tasks/:id</kbd> | deletar uma tarefa
| <kbd>PUT/tasks/:id</kbd> | atualizar uma tarefa


<h3>POST /users</h3>

**REQUEST**
```json
{
  "name": "Jhon Doe",
  "email": jhon@email.com,
  "password": "1a2b3c"
}
```

<h3>POST /sessions</h3>

**REQUEST**
```json
{
  "email": "jhon@email.com",
  "password": "1a2b3c"
}
```

**RESPONSE**
```json
{
  "token": "OwoMRHsaQwyAgVoc3OXmL1JhMVUYXGGBbCTK0GBgiYitwQwjf0gVoBmkbuyy0pSi"
}
```


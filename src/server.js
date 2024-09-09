import express from "express";
import cors from "cors";
import routes from "./routes/routes-users/index.js";
import routesTasks from "./routes/routes-tasks/index.js";

import createTablesInit from "./database/migrations/index.js";

const app = express();

app.use(cors({
  origin: "https://todo-experts.vercel.app",
  methods: "GET, PUT, PATCH, POST, DELETE",
  allowedHeaders: "Content-Type, Authorization",
  credentials: true
}));

app.use(express.json());

await createTablesInit();

app.use(routes);
app.use(routesTasks);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is running!");
});

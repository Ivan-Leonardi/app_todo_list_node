import express from "express";
import cors from "cors";
import routes from "./routes/routes-users/index.js";

import createTablesInit from "./database/migrations/index.js";

const app = express();

app.use(cors());

app.use(express.json());

await createTablesInit();

app.use(routes);

app.listen(3333, () => {
  console.log("Server is running on PORT 3333");
});

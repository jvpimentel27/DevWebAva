import express from "express";

import UserRouter from "./routes/UserRoutes";

import PostRouter from "./routes/PostRoutes";

import CommentRouter from "./routes/CommentRoutes";


const app = express();
app.use(express.json());

app.use(UserRouter);

app.use(PostRouter);

app.use(CommentRouter);


app.listen(3000, function () {
  console.log("Servidor rodando na porta 3000");
});

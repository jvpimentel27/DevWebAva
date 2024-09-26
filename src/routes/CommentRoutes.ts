import { Router } from "express";

import CommentController from "../controllers/CommentController";

const CommentRouter = Router();


//Listar comentarios
CommentRouter.get("/comments", CommentController.listComment);

//Inserir comentarios
CommentRouter.post("/comment", CommentController.createComment);

//Atualizar comentarios
CommentRouter.put("/comment/:id", CommentController.updateComment);

//Deletar comentarios
CommentRouter.delete("/comment/:id", CommentController.deleteComment);

export default CommentRouter;
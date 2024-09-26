import { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";

import AiConversation from '../utils/AiAnalisys';

const prisma = new PrismaClient();

class CommentController {
    constructor(){

    }

    async listComment(req: Request, res: Response){
        try {
            const comments = await prisma.comment.findMany();
  
            res.json(comments)
        }catch(error){
            console.log(error);
            return res.status(500).json({
                error: error
            })
        }
    }
    async createComment(req: Request, res: Response){
        try {
            const commentdata = req.body;
        
            if (!commentdata.title) {
              return res.status(400).json({
                status: 400,
                message: "Você precisa passar o titulo no corpo da requisição",
              });
            }

            if (!commentdata.authorId) {
                return res.status(400).json({
                  status: 400,
                  message: "Você precisa passar o ID do usuario que comentou no corpo da requisição",
                });
            }

            const response = await AiConversation(commentdata.content).then();
            console.log(response);
            const evaluation = (JSON.parse(response));
            console.log(evaluation);

            console.log(commentdata);
            const newcomment = await prisma.comment.create({
                data: {
                    ...commentdata,
                    evaluation: evaluation.classificação                 
                }
            });

        
            console.log(newcomment);
        
            res.json({
              status: 200,
              newcomment: newcomment,
            });
          } catch (error) {
            console.log(error);
            res.json({
              status: 500,
              message: error,
            });
          }
    }

    async updateComment(req: Request, res: Response){
        try {
            const id = req.params.id;
            const body = req.body;
        
            const updatedComment = await prisma.comment.update({
              where: {
                id: parseInt(id),
              },
              data: body,
            });
        
            if (updatedComment) {
              return res.json({
                status: 200,
                updatedComment: updatedComment,
              });
            }
          } catch (error) {
            console.log(error);
            res.json({
              status: 500,
              message: error,
            });
          }
    }

    async deleteComment(req: Request, res: Response){
        try {
            const id = req.params.id;
        
            await prisma.user.delete({
              where: {
                id: parseInt(id),
              },
            });
        
            res.status(200).json({
              status: 200,
              message: "Comentário deletado com sucesso",
            });
          } catch (error) {
            console.log(error);
            res.status(400).json({
              message: "Falha ao deletar o registro",
            });
          }
    }

}

export default new CommentController();
import { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class PostController {
    constructor(){

    }

    async listPost(req: Request, res: Response){
        try {
            const posts = await prisma.post.findMany();
  
            res.json(posts)
        }catch(error){
            console.log(error);
            return res.status(500).json({
                error: error
            })
        }
    }
    async createPost(req: Request, res: Response){
        try {
            const postdata = req.body;
        
            if (!postdata.title) {
              return res.status(400).json({
                status: 400,
                message: "Você precisa passar o titulo no corpo da requisição",
              });
            }

            if (!postdata.content) {
                return res.status(400).json({
                  status: 400,
                  message: "Você precisa passar o conteudo no corpo da requisição",
                });
            }

            if (!postdata.authorId) {
                return res.status(400).json({
                  status: 400,
                  message: "Você precisa passar o ID do usuario que comentou no corpo da requisição",
                });
            }

            if (!postdata.postId) {
                return res.status(400).json({
                  status: 400,
                  message: "Você precisa passar o ID do comentario comentado no corpo da requisição",
                });
            }

            console.log(postdata);
            const newpost = await prisma.user.create({
              data: postdata,
            });
        
            console.log(newpost);
        
            res.json({
              status: 200,
              newpost: newpost,
            });
          } catch (error) {
            console.log(error);
            res.json({
              status: 500,
              message: error,
            });
          }
    }

    async updatePost(req: Request, res: Response){
        try {
            const id = req.params.id;
            const body = req.body;
        
            const updatedPost = await prisma.post.update({
              where: {
                id: parseInt(id),
              },
              data: body,
            });
        
            if (updatedPost) {
              return res.json({
                status: 200,
                updatedPost: updatedPost,
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

    async deletePost(req: Request, res: Response){
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

export default new PostController();
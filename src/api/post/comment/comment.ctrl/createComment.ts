import { Request, Response } from 'express';
import Joi from 'joi';
import validateBody from '../../../../lib/validateBody';
import { getRepository } from 'typeorm';
import Post from '../../../../entity/Post';
import Comment from '../../../../entity/Comment';

export default async (req: Request, res: Response) => {
  const schema = Joi.object().keys({
    content: Joi.string().required(),
    post_idx: Joi.number().integer()
  });
  if (!validateBody(req, res, schema)) return;


  type RequestType = {
    content: string;
    post_idx: number;
  }
  const data: RequestType = req.body;

  try {
    const postRepo = getRepository(Post);
    const post: Post = await postRepo.findOne({
      where: {
        idx: data.post_idx,
      }
    })

    if (!post) {
      res.status(404).json({
        message: '글 없음.',
      });
      return;
    }

    const commentRepo = getRepository(Comment);
    const comment = new Comment();
    comment.content = data.content;
    comment.fk_post_idx = data.post_idx;

    await commentRepo.save(comment);
    res.status(200).json({
      message: '댓글 작성 성공.',
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: '서버 오류.',
    });
  }
}
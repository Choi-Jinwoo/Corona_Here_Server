import { Request, Response } from 'express';
import Joi from 'joi';
import validateBody from '../../../lib/validateBody';
import { getRepository } from 'typeorm';
import Region from '../../../enum/region';
import Post from '../../../entity/Post';

export default async (req: Request, res: Response) => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
    region: Joi.number().integer(),
  });
  if (!validateBody(req, res, schema)) return;

  if (!(req.body.region in Region)) {
    res.status(400).json({
      message: '검증 오류.',
    });
    return;
  }

  type RequestType = {
    title: string;
    content: string;
    region: number;
  }
  const data: RequestType = req.body;

  try {
    const postRepo = getRepository(Post);
    const post = new Post();
    post.title = data.title;
    post.content = data.content;
    post.region = data.region;

    await postRepo.save(post);

    res.status(200).json({
      message: '글 작성 성공.',
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: '서버 오류.',
    });
  }
}
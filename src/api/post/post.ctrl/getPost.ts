import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Post from '../../../entity/Post';

export default async (req: Request, res: Response) => {
  const idx: number = Number(req.params.idx);
  if (isNaN(idx)) {
    res.status(400).json({
      message: '검증 오류',
    });
    return;
  }

  try {
    const postRepo = getRepository(Post);

    const post: Post = await postRepo.findOne({
      where: {
        idx,
      },
    });

    if (!post) {
      res.status(404).json({
        message: '글 없음.',
      });
      return;
    }

    res.status(200).json({
      message: '글 조회 성공.',
      data: {
        post,
      }
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: '서버 오류.',
    });
  }
}
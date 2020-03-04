import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Post from '../../../entity/Post';

export default async (req: Request, res: Response) => {
  type RequestQuery = {
    order: string;
    region: number;
  }
  const { order, region }: RequestQuery = req.query;

  try {
    const postRepo = getRepository(Post);
    let whereConditions = {}
    if (region) {
      whereConditions = {
        region,
      }
    }

    const posts: Post[] = await postRepo.find({
      select: [
        'title',
        'region',
        'view',
        'created_at',
      ],
      where: whereConditions,
      order: order === 'hit' ? { created_at: 'DESC' } : { view: 'DESC' },
    });

    res.status(200).json({
      message: '글 목록 조회 성공.',
      data: {
        posts,
      }
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: '서버 오류.',
    });
  }
}
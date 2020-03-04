import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Post from '../../../../entity/Post';
import Comment from '../../../../entity/Comment';

export default async (req: Request, res: Response) => {
  const postIdx: number = req.query.post;

  try {
    const postRepo = getRepository(Post);
    const post: Post = await postRepo.findOne({
      where: {
        idx: postIdx,
      }
    });

    if (!post) {
      res.status(404).json({
        message: '글 없음.',
      });
      return;
    }

    const commentRepo = await getRepository(Comment);
    const comments: Comment[] = await commentRepo.find({
      where: {
        fk_post_idx: postIdx,
      },
    });

    res.status(200).json({
      message: '댓글 목록 조회 성공.',
      data: {
        comments,
      }
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: '서버 오류.',
    });
  }
}
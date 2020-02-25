import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Infectee from '../../../entity/Infectee';

export default async (req: Request, res: Response) => {
  const type = Number(req.query.type);
  let conditions = {};

  if (type) {
    conditions = {
      where: {
        type,
      }
    };
  }

  try {
    const infecteeRepo = getRepository(Infectee);
    const infectee = await infecteeRepo.find(conditions);
    res.status(200).json({
      message: '감염자 조회 성공.',
      data: {
        infectee,
      },
    });
  } catch (err) {
    console.log('서버 오류.', err.message);
    res.status(500).json({
      message: '서버 오류.',
    });
  }
}
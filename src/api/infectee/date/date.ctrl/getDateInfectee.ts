import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import DateGraph from '../../../../entity/DateGraph';

export default async (_req: Request, res: Response) => {
  try {
    const dateGraphRepo = getRepository(DateGraph);
    const data = await dateGraphRepo.find();
    res.status(200).json({
      message: '날짜별 확진자 조회 성공.',
      data: {
        date_infectee: data,
      },
    });
  } catch (err) {
    console.log('서버 오류.', err.message);
    res.status(500).json({
      message: '서버 오류.',
    });
  }
}
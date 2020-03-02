import { Request, Response } from 'express';
import nationalTotalState from '../../../../../../data/nationalTotalState.json';

export default async (req: Request, res: Response) => {
  res.status(200).json({
    message: '전세계 현황 조회 성공.',
    data: {
      nation_total: nationalTotalState,
    },
  });
}
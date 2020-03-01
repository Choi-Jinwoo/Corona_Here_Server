import { Request, Response } from 'express';
import nationalState from '../../../../../data/nationalState.json';

export default async (req: Request, res: Response) => {
  let nationData = nationalState;

  res.status(200).json({
    message: '지역별 감염자 조회 성공.',
    data: {
      nation_infectee: nationData,
    },
  });
}
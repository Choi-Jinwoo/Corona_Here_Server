import { Request, Response } from 'express';
import nationalState from '../../../../../data/nationalState.json';

export default async (req: Request, res: Response) => {
  let nationData = nationalState;
  const result = [];
  const nationDataKey = Object.keys(nationData);
  nationDataKey.forEach((key) => {
    result.push({
      nation: key,
      number: nationData[key],
    });
  })
  res.status(200).json({
    message: '국가별 감염자 조회 성공.',
    data: {
      nation_infectee: result,
    },
  });
}
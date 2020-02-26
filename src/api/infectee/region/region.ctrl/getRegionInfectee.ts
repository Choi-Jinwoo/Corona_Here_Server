import { Request, Response } from 'express';
import regionState from '../../../../../data/regionState.json';
import Region from '../../../../enum/region';

export default async (req: Request, res: Response) => {
  const region: number = Number(req.query.region);

  let regionData = regionState;

  if (region) {
    if (!(region in Region)) {
      res.status(400).json({
        message: '검증 오류.',
      });
      return;
    }

    regionData = regionState[region];
  }

  res.status(200).json({
    message: '지역별 감염자 조회 성공.',
    data: {
      region_infectee: regionData,
    },
  });
}
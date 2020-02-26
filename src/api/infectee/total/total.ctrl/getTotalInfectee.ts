import { Response, Request } from 'express';
import totalState from '../../../../../data/totalState.json';

export default async (_req: Request, res: Response) => {
  return res.status(200).json({
    message: '전체 감염자 조회 성공.',
    data: {
      total_state: totalState,
    },
  });
}
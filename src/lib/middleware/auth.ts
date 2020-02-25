import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../token';

export default async (req: Request, res: Response, next: NextFunction) => {
  const reqToken: string | string[] = req.headers['x-access-token'];
  if (Array.isArray(reqToken)) {
    res.status(400).json({
      message: '토큰 타입 오류'
    });
    return;
  }

  const token = reqToken;
  try {
    await verifyToken(token);
    next();
  } catch (err) {
    switch (err.message) {
      case 'jwt must be provided':
        res.status(400).json({
          message: '토큰 없음.',
        });
        return;
      case 'jwt malformed':
      case 'invalid token':
      case 'invalid signature':
        res.status(401).json({
          message: '토큰 위조.'
        });
        return;
      case 'jwt expired':
        res.status(410).json({
          message: '토큰 만료.',
        });
        return;
      default:
        console.log('토큰 미들웨어 서버 오류.', err.message);
        res.status(500).json({
          message: '서버 오류.'
        });
    }
  }
}

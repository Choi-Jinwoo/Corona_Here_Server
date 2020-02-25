import { Request, Response } from 'express';
import Joi from 'joi';
import validateBody from '../../../lib/validateBody';
import adminAccounts from '../../../../config/adminAccount.json';
import { createToken } from '../../../lib/token';

export default async (req: Request, res: Response) => {
  const schema = Joi.object().keys({
    code: Joi.string().required(),
  });
  if (!validateBody(req, res, schema)) return;

  const { code } = req.body;

  try {
    const accountsCode = adminAccounts.map((account) => {
      return account.code;
    });

    if (accountsCode.indexOf(code) === -1) {
      res.status(401).json({
        message: '인증 실패.',
      });
      return;
    }

    const token = await createToken(code);
    res.status(200).json({
      message: '로그인 성공.',
      data: {
        'x-access-token': token,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: '서버 오류.',
    });
  }
}
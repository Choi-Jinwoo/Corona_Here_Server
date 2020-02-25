import { Request, Response } from 'express';
import Joi from 'joi';
import validateBody from '../../../lib/validateBody';
import { getRepository } from 'typeorm';
import Infectee from '../../../entity/Infectee';
import { Gender, Type } from '../../../enum/infectee';

export default async (req: Request, res: Response) => {
  const idx = Number(req.params.idx);

  if (isNaN(idx)) {
    res.status(400).json({
      message: '검증 오류.',
    });
    return;
  }

  try {
    const infecteeRepo = getRepository(Infectee);
    const isExist = await infecteeRepo.findOne({
      where: {
        idx,
      },
    });

    if (!isExist) {
      res.status(404).json({
        message: '감염자 없음.',
      });
      return;
    }

    await infecteeRepo.delete(idx);

    res.status(200).json({
      message: '삭제 성공.',
    });
  } catch (err) {
    console.log('서버 오류\n', err.message);
    res.status(500).json({
      message: '서버 오류.',
    });
  }
}
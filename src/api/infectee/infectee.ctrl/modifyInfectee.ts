import { Request, Response } from 'express';
import Joi from 'joi';
import validateBody from '../../../lib/validateBody';
import { getRepository } from 'typeorm';
import Infectee from '../../../entity/Infectee';
import { Gender, Type } from '../../../enum/infectee';

export default async (req: Request, res: Response) => {
  const schema = Joi.object().keys({
    age: Joi.number().integer(),
    gender: Joi.number().integer(),
    comment: Joi.string(),
    type: Joi.number().integer(),
  });
  if (!validateBody(req, res, schema)) return;

  const idx = Number(req.params.idx);

  if (isNaN(idx)) {
    res.status(400).json({
      message: '검증 오류.',
    });
    return;
  }

  type RequestType = {
    age: number;
    gender: number;
    comment: string;
    type: number;
  }
  const data: RequestType = req.body;

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

    if (data.gender) {
      if (data.gender !== Gender.MAN &&
        data.gender !== Gender.WOMAN) {
        data.gender = Gender.UNKNOWN;
      }
    }

    if (data.type) {
      if (data.type !== Type.CONFIRMED &&
        data.type !== Type.DEATH &&
        data.type !== Type.HEAL) {
        res.status(400).json({
          message: '검증 오류.',
        });
        return;
      }
    }

    await infecteeRepo.update(idx, data);

    res.status(200).json({
      message: '수정 성공.',
    });
  } catch (err) {
    console.log('서버 오류\n', err.message);
    res.status(500).json({
      message: '서버 오류.',
    });
  }
}
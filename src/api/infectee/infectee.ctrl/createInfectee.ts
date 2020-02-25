import { Request, Response } from 'express';
import Joi from 'joi';
import validateBody from '../../../lib/validateBody';
import { getRepository } from 'typeorm';
import Infectee from '../../../entity/Infectee';
import { Gender, Type } from '../../../enum/infectee';

export default async (req: Request, res: Response) => {
  const schema = Joi.object().keys({
    idx: Joi.number().integer().required(),
    age: Joi.number().integer(),
    gender: Joi.number().integer(),
    comment: Joi.string(),
  });
  if (!(validateBody(req, res, schema))) return;

  const data = req.body;

  try {
    const infecteeRepo = getRepository(Infectee);
    const isExist = await infecteeRepo.findOne({
      where: {
        idx: data.idx,
      },
    });

    if (isExist) {
      res.status(409).json({
        message: '중복된 감염자.',
      });
      return;
    }

    if (data.gender !== Gender.MAN || data.gender !== Gender.WOMAN) {
      data.gender = Gender.UNKNOW;
    }

    const infectee = new Infectee;
    infectee.idx = data.idx;
    infectee.age = data.gender;
    infectee.gender = data.gender;
    infectee.comment = data.comment;
    infectee.type = Type.CONFIRMED;
    await infecteeRepo.save(infectee);

    res.status(200).json({
      message: '추가 성공.',
    });
  } catch (err) {
    console.log('서버 오류\n', err.message);
    res.status(500).json({
      message: '서버 오류.',
    });
  }
}
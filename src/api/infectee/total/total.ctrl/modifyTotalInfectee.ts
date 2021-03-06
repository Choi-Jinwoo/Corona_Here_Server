import { Request, Response } from 'express';
import { writeFile } from 'fs'
import path from 'path';
import Joi from 'joi';
import validateBody from '../../../../lib/validateBody';
import totalState from '../../../../../data/totalState.json';

export default async (req: Request, res: Response) => {
  const schema = Joi.object().keys({
    confirmed: Joi.number().integer(),
    heal: Joi.number().integer(),
    death: Joi.number().integer(),
    check: Joi.number().integer(),
  });
  if (!validateBody(req, res, schema)) return;

  type RequestBody = {
    confirmed: number | string
    heal: number | string;
    death: number | string;
    check: number | string;
  };

  const data: RequestBody = req.body;

  if (data.confirmed) {
    totalState.last_confirmed = Number(data.confirmed) - totalState.confirmed;
    totalState.confirmed = Number(data.confirmed);
  } else {
    totalState.last_confirmed = 0;
  }

  if (data.death) {
    totalState.last_death = Number(data.death) - totalState.death;
    totalState.death = Number(data.death);
  } else {
    totalState.last_death = 0;
  }

  if (data.heal) {
    totalState.last_heal = Number(data.heal) - totalState.heal;
    totalState.heal = Number(data.heal);
  } else {
    totalState.last_heal = 0;
  }

  if (data.check) {
    totalState.last_check = Number(data.check) - totalState.check;
    totalState.check = Number(data.check);
  } else {
    totalState.last_check = 0;
  }
  totalState.last_update = new Date().toString();

  const strTotalState = JSON.stringify(totalState);
  const filePath = path.join(__dirname, '../../../../../data/totalState.json');
  writeFile(filePath, strTotalState, (err) => {
    if (err) {
      console.log('전체 감염자 수정 서버 오류.', err.message);
      res.status(500).json({
        message: '서버 오류.',
      });
      return;
    }
  });
  res.status(200).json({
    messages: '수정 성공.',
  });
}
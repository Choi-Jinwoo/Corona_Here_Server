import { Request, Response } from 'express';
import { writeFile } from 'fs'
import path from 'path';
import Joi from 'joi';
import validateBody from '../../../../../lib/validateBody';
import nationTotalState from '../../../../../../data/nationalTotalState.json';

export default (req: Request, res: Response) => {
  const schema = Joi.object().keys({
    confirmed: Joi.number().integer(),
    heal: Joi.number().integer(),
    death: Joi.number().integer(),
  });
  if (!validateBody(req, res, schema)) return;

  type RequestBody = {
    confirmed: number | string
    heal: number | string;
    death: number | string;
  }

  const data: RequestBody = req.body;

  nationTotalState.confirmed = Number(data.confirmed) || nationTotalState.confirmed;
  nationTotalState.heal = Number(data.heal) || nationTotalState.heal;
  nationTotalState.death = Number(data.death) || nationTotalState.death;

  const strNationTotalState = JSON.stringify(nationTotalState);
  const filePath = path.join(__dirname, '../../../../../../data/nationalTotalState.json');
  writeFile(filePath, strNationTotalState, (err) => {
    if (err) {
      console.log('전세계 감염자 수정 서버 오류.', err.message);
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
import { Request, Response } from 'express';
import { writeFile } from 'fs'
import path from 'path';
import Joi from 'joi';
import validateBody from '../../../../lib/validateBody';
import Nation from '../../../../enum/nation';
import nationalState from '../../../../../data/nationalState.json';

export default async (req: Request, res: Response) => {
  const schema = Joi.object().keys({
    nation: Joi.number().integer().required(),
    number: Joi.number().integer().required(),
  });
  if (!validateBody(req, res, schema)) return;

  type RequestBody = {
    nation: number;
    number: number;
  };

  const data: RequestBody = req.body;

  if (!(data.nation in Nation)) {
    res.status(400).json({
      message: '검증 오류.',
    });
    return;
  };

  nationalState[data.nation] = data.number;

  const strNationState = JSON.stringify(nationalState);
  const filePath = path.join(__dirname, '../../../../../data/nationalState.json');
  writeFile(filePath, strNationState, (err) => {
    if (err) {
      console.log('국제 감염자 수정 서버 오류.', err.message);
      res.status(500).json({
        message: '서버 오류.',
      });
      return;
    }
  });
  res.status(200).json({
    message: '수정 성공.',
  });
}
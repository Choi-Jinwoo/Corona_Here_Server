import { Request, Response } from 'express';
import { writeFile } from 'fs'
import path from 'path';
import Joi from 'joi';
import validateBody from '../../../../lib/validateBody';
import Region from '../../../../enum/region';
import regionState from '../../../../../data/regionState.json';

export default async (req: Request, res: Response) => {
  const schema = Joi.object().keys({
    region: Joi.number().integer().required(),
    number: Joi.number().integer().required(),
  });
  if (!validateBody(req, res, schema)) return;

  type RequestBody = {
    region: number;
    number: number;
  };

  const data: RequestBody = req.body;

  if (!(data.region in Region)) {
    res.status(400).json({
      message: '검증 오류.',
    });
    return;
  };

  regionState[data.region] = Number(data.number);

  const strRegionState = JSON.stringify(regionState);
  const filePath = path.join(__dirname, '../../../../../data/regionState.json');
  writeFile(filePath, strRegionState, (err) => {
    if (err) {
      console.log('지역 감염자 수정 서버 오류.', err.message);
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
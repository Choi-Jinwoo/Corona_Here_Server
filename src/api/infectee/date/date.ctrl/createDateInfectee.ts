import { Request, Response } from 'express';
import Joi from 'joi';
import { getRepository } from 'typeorm';
import validateBody from '../../../../lib/validateBody';
import DateGraph from '../../../../entity/DateGraph';

export default async (req: Request, res: Response) => {
  const schema = Joi.object().keys({
    date: Joi.string().required(),
    number: Joi.number().required()
  });
  if (!validateBody(req, res, schema)) return;

  type RequestType = {
    date: string;
    number: number;
  };

  const data: RequestType = req.body;
  try {
    const dateGraphRepo = getRepository(DateGraph);
    const dateGraph = new DateGraph();
    dateGraph.date = data.date;
    dateGraph.number = data.number;
    await dateGraphRepo.save(dateGraph);

    res.status(200).json({
      message: '날짜별 확진자 생성 성공.',
    });
  } catch (err) {
    console.log('서버 오류.', err.message);
    res.status(500).json({
      message: '서버 오류.',
    });
  }
}
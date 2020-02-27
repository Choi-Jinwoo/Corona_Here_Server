import { Request, Response } from 'express';
import Joi from 'joi';
import { getRepository } from 'typeorm';
import validateBody from '../../../../lib/validateBody';
import DateGraph from '../../../../entity/DateGraph';

export default async (req: Request, res: Response) => {
  const idx = Number(req.params.idx);
  if (isNaN(idx)) {
    res.status(400).json({
      message: '검증 오류.',
    });
    return;
  }

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
    const dateGraph = await dateGraphRepo.findOne({
      where: {
        idx,
      },
    });

    if (!dateGraph) {
      res.status(404).json({
        message: '날짜별 확진자 없음.',
      });
      return;
    }

    dateGraph.date = data.date || dateGraph.date;
    dateGraph.number = data.number || dateGraph.number;
    await dateGraphRepo.save(dateGraph);

    res.status(200).json({
      message: '날짜별 확진자 수정 성공.',
    });
  } catch (err) {
    console.log('서버 오류.', err.message);
    res.status(500).json({
      message: '서버 오류.',
    });
  }
}
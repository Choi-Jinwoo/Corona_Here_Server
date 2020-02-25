import Joi, { SchemaLike } from 'joi';
import { Request, Response } from 'express';

export default (req: Request, res: Response, schema: SchemaLike): boolean => {
  const { body } = req;
  const validation = Joi.validate(body, schema);
  if (validation.error) {
    res.status(400).json({
      message: '검증 오류.',
    });
    return false;
  }
  return true;
};
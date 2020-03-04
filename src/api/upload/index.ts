import { Router } from 'express';
import upload from './upload.ctrl/upload';
import multer, { Options } from 'multer';

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, './public/');
  },
  filename: (_req, file, cb) => {
    cb(null, `${file.fieldname}-${new Date().getMilliseconds()}-${file.originalname}`);
  },
});

const options: Options = {
  storage,
};

const uploadMid = multer(options) as any;

const router = Router();

router.post('/', uploadMid.array('files'), upload);

export default router;
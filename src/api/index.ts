import { Router } from 'express';
import infectee from './infectee';
import auth from './auth';
import post from './post';
import upload from './upload';

const router = Router();

router.use('/infectee', infectee);
router.use('/auth', auth);
router.use('/post', post);
router.use('/upload', upload);

export default router;

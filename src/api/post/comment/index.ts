import { Router } from 'express';
import getComments from './comment.ctrl/getComments';
import createComment from './comment.ctrl/createComment';

const router = Router();

router.get('/', getComments);
router.post('/', createComment);

export default router;
import { Router } from 'express';
import createPost from './post.ctrl/createPost';

const router = Router();

router.post('/', createPost);

export default router;
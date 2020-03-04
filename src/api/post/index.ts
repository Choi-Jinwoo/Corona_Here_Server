import { Router } from 'express';
import createPost from './post.ctrl/createPost';
import getPosts from './post.ctrl/getPosts';

const router = Router();

router.get('/', getPosts);
router.post('/', createPost);

export default router;
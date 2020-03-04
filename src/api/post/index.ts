import { Router } from 'express';
import createPost from './post.ctrl/createPost';
import getPosts from './post.ctrl/getPosts';
import getPost from './post.ctrl/getPost';

const router = Router();

router.get('/', getPosts);
router.get('/:idx', getPost);
router.post('/', createPost);

export default router;
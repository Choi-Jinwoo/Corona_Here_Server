import { Router } from 'express';
import infectee from './infectee';
import auth from './auth';

const router = Router();

router.use('/infectee', infectee);
router.use('/auth', auth);

export default router;

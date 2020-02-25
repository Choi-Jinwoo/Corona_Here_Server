import { Router } from 'express';
import infectee from './infectee';

const router = Router();

router.use('/infectee', infectee);

export default router;

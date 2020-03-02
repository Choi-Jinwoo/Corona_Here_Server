import { Router } from 'express';
import auth from '../../../../lib/middleware/auth';
import getTotalState from './total.ctrl/getTotalState';
import modifyTotalState from './total.ctrl/modifyTotalState';

const router = Router();

router.get('/', getTotalState);
router.put('/', modifyTotalState);

export default router;
import { Router } from 'express';
import auth from '../../../lib/middleware/auth';
import getTotalInfectee from './total.ctrl/getTotalInfectee';
import modifyTotalInfectee from './total.ctrl/modifyTotalInfectee';

const router = Router();

router.get('/', getTotalInfectee);
router.put('/', auth, modifyTotalInfectee);

export default router;
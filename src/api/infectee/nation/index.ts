import { Router } from 'express';
import auth from '../../../lib/middleware/auth';
import getNationInfectee from './nation.ctrl/getNationInfectee';
import modifyNationInfectee from './nation.ctrl/modifyNationInfectee';
import total from './total';

const router = Router();
router.use('/total', total);
router.get('/', getNationInfectee);
router.put('/', auth, modifyNationInfectee);

export default router;
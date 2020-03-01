import { Router } from 'express';
import auth from '../../../lib/middleware/auth';
import getNationInfectee from './nation.ctrl/getNationInfectee';
import modifyNationInfectee from './nation.ctrl/modifyNationInfectee';

const router = Router();

router.get('/', getNationInfectee);
router.put('/', modifyNationInfectee);

export default router;
import { Router } from 'express';
import auth from '../../../lib/middleware/auth';
import getDateInfectee from './date.ctrl/getDateInfectee';
import createDateInfectee from './date.ctrl/createDateInfectee';
import modifyDateInfectee from './date.ctrl/modifyDateInfectee';

const router = Router();

router.get('/', getDateInfectee);
router.post('/', auth, createDateInfectee);
router.put('/:idx', auth, modifyDateInfectee);

export default router;

import { Router } from 'express';
import createInfectee from './infectee.ctrl/createInfectee';
import auth from '../../lib/middleware/auth';
import getInfectee from './infectee.ctrl/getInfectee';
import modifyInfectee from './infectee.ctrl/modifyInfectee';

const router = Router();

router.post('/', auth, createInfectee);
router.get('/', getInfectee);
router.put('/:idx', auth, modifyInfectee);

export default router;

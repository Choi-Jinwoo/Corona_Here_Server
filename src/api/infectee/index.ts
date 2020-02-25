import { Router } from 'express';
import createInfectee from './infectee.ctrl/createInfectee';
import auth from '../../lib/middleware/auth';
import getInfectee from './infectee.ctrl/getInfectee';
import modifyInfectee from './infectee.ctrl/modifyInfectee';
import deleteInfectee from './infectee.ctrl/deleteInfectee';

const router = Router();

router.post('/', auth, createInfectee);
router.get('/', getInfectee);
router.put('/:idx', auth, modifyInfectee);
router.delete('/:idx', auth, deleteInfectee);

export default router;

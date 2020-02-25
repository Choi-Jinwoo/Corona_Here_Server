import { Router } from 'express';
import createInfectee from './infectee.ctrl/createInfectee';
import auth from '../../lib/middleware/auth';

const router = Router();

router.post('/', auth, createInfectee);

export default router;

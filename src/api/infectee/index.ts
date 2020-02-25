import { Router } from 'express';
import createInfectee from './infectee.ctrl/createInfectee';

const router = Router();

router.post('/', createInfectee);

export default router;


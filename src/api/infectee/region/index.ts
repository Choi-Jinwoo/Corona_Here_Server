import { Router } from 'express';
import getRegionInfectee from './region.ctrl/getRegionInfectee';
import modifyRegionInfectee from './region.ctrl/modifyRegionInfectee';
import auth from '../../../lib/middleware/auth';

const router = Router();

router.get('/', getRegionInfectee);
router.put('/', auth, modifyRegionInfectee);

export default router;

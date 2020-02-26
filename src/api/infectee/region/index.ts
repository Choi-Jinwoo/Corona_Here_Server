import { Router } from 'express';
import getRegionInfectee from './region.ctrl/getRegionInfectee';
import modifyRegionInfectee from './region.ctrl/modifyRegionInfectee';

const router = Router();

router.get('/', getRegionInfectee);
router.put('/', modifyRegionInfectee);

export default router;

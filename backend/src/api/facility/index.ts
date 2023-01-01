import Router from 'express';
import { verifyAdmin, verifyToken } from 'middlewares';
import {
	getFacilities,
	getFacility,
	deleteFacility,
	getAllFacilities,
	changeFacilityInfo,
	addFacility
} from './controller';

const router = Router();

router.get('/pagination', [verifyToken, verifyAdmin], getFacilities);
router.get('/:id', [verifyToken, verifyAdmin], getFacility);
router.get('/', [verifyToken], getAllFacilities);
router.post('/', addFacility);
router.put('/:id', [verifyToken, verifyAdmin], changeFacilityInfo);
router.delete('/:id', [verifyToken, verifyAdmin], deleteFacility);

export default router;

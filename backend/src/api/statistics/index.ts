import { time } from 'console';
import Router from 'express';
import { verifyAdmin, verifyToken } from 'middlewares';
import { getStatisticsProduce, getStatisticsDistribute, getStatisticsGuarantee, getStatisticsFacilityById} from './controller';
const router = Router();

router.get('/produce', getStatisticsProduce);
router.get('/distribute', getStatisticsDistribute);
router.get('/guarantee', getStatisticsGuarantee);
router.get('/facility', getStatisticsFacilityById);


export default router;

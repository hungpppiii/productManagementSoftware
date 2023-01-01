import Router from 'express';
import { verifyToken, verifyGuarantee } from 'middlewares';
import { getProducts, exportDistribute, exportProduce } from './controller';

const router = Router();

router.get('/all', [verifyToken, verifyGuarantee], getProducts);
router.post('/export-distribute', [verifyToken, verifyGuarantee], exportDistribute);
router.post('/export-produce', [verifyToken, verifyGuarantee], exportProduce);

export default router;

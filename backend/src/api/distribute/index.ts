import Router from 'express';
import { verifyToken, verifyDistribute } from 'middlewares';
import { getProducts, importProduct, exportOrder, exportGuarantee } from './controller';

const router = Router();

router.get('/all', [verifyToken, verifyDistribute], getProducts);
router.post('/import', [verifyToken, verifyDistribute], importProduct);
router.post('/export-order', [verifyToken, verifyDistribute], exportOrder);
router.post('/export-guarantee', [verifyToken, verifyDistribute], exportGuarantee);

export default router;

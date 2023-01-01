import Router from 'express';
import { verifyAdmin, verifyToken } from 'middlewares';
import { getProductLine, getProductLineById, addProductLine, updateProductLine } from './controller';

const router = Router();

router.get('/:id', getProductLineById);
router.get('/', getProductLine);
router.post('/', [verifyToken, verifyAdmin], addProductLine);
router.put('/:id', [verifyToken, verifyAdmin], updateProductLine);

export default router;

import express, { Router } from 'express';
import productsController from '../../controllers/products.controller';

const router = express.Router() as Router;

router.get('/', productsController.findAll)
router.get('/:id', productsController.findById)
router.post('/', productsController.create)
router.put('/:id', productsController.updateById)
router.delete('/:id', productsController.deleteById)

export default router;

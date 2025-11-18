import express, { Router } from 'express';
import orderItemsController from '../../controllers/orderItems.controller';

const router = express.Router() as Router;

router.get('/', orderItemsController.findAll)
router.get('/:id', orderItemsController.findById)
router.post('/', orderItemsController.create)
router.put('/:id', orderItemsController.updateById)
router.delete('/:id', orderItemsController.deleteById)

export default router;

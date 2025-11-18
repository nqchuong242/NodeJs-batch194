import express, { Router } from 'express';
import ordersController from '../../controllers/orders.controller';

const router = express.Router() as Router;

router.get('/', ordersController.findAll)
router.get('/:id', ordersController.findById)
router.post('/', ordersController.create)
router.put('/:id', ordersController.updateById)
router.delete('/:id', ordersController.deleteById)

export default router;

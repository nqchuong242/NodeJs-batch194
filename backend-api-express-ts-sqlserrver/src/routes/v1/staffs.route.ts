import express, { Router } from 'express';
import staffsController from '../../controllers/staffs.controller';
import { authenticateToken, authorize } from '../../middleware/auth.middleware';

const router = express.Router() as Router;

//GET api/v1/staffs ==> get all staffs
router.get('/',authenticateToken, staffsController.findAll)

//GET api/v1/staffs/:id ==> get brand by id
router.get('/:id',authenticateToken, staffsController.findById)

//POST api/v1/staffs ==> create new brand
router.post('/',authenticateToken, staffsController.create)

//User nào có role là admin mới được phép cập nhật hoặc xóa
//PUT api/v1/staffs ==> update a brand
router.put('/:id',authenticateToken,authorize(['admin']), staffsController.updateById)

//DELETE api/v1/staffs ==> delete a brand by id
router.delete('/:id',authenticateToken,authorize(['admin']), staffsController.deleteById)


export default router;
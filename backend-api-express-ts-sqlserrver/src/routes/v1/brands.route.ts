import express, { Router } from 'express';
import brandsController from '../../controllers/brands.controller';

const router = express.Router() as Router;

//GET api/v1/brands ==> get all brands
router.get('/', brandsController.findAll)

//GET api/v1/brands/:id ==> get brand by id
router.get('/:id', brandsController.findById)

//POST api/v1/brands ==> create new brand
router.post('/', brandsController.create)

//PUT api/v1/brands ==> update a brand
router.put('/:id', brandsController.updateById)

//DELETE api/v1/brands ==> delete a brand by id
router.delete('/:id', brandsController.deleteById)


export default router;
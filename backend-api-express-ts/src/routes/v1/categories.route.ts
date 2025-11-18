import express, { Router } from 'express';
import categoriesController from '../../controllers/categories.controller';
import validateSchemaYup from '../../middleware/validateSchemaYup.middleware';
import categoriesSchemaValidation from '../../validations/categoriesSchema.validation';
//import { routeExampleMiddleware } from '../../middleware/routeExample.middleware';

const router = express.Router() as Router;

//Middleware cho tất cả các route ở đây
//router.use(routeExampleMiddleware); //vd: sử dụng middleware chung cho các route ở đây

//Midddleware cho một route cụ thể
//router.get('/',routeExampleMiddleware, categoriesController.findAll)


//GET api/v1/categories ==> get all categories
router.get('/', categoriesController.findAll)

//GET api/v1/categories/:id ==> get category by id
router.get('/:id',validateSchemaYup(categoriesSchemaValidation.getByIdSchema), categoriesController.findById)

//POST api/v1/categories ==> create new category
router.post('/',validateSchemaYup(categoriesSchemaValidation.createSchema) , categoriesController.create)

//PUT api/v1/categories ==> update a category
router.put('/:id',validateSchemaYup(categoriesSchemaValidation.updateSchema), categoriesController.updateById)

//DELETE api/v1/categories ==> delete a category by id
router.delete('/:id',validateSchemaYup(categoriesSchemaValidation.deleteSchema), categoriesController.deleteById)


export default router;
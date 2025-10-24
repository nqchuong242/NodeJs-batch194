import express, { Router } from 'express';
import createError from 'http-errors'
import { fake_categories } from '../../mockup/mockData';

const router = express.Router() as Router;

//GET api/v1/categories ==> get all categories
router.get('/', (req, res) => {
    res.json({
        data: fake_categories
    })
})

//GET api/v1/categories/:id ==> get category by id
router.get('/:id', (req, res) => {
    const { id } = req.params; //id nhận được luôn là string
    const category = fake_categories.find(c => c.id === parseInt(id));
    //Phải kiểm tra xem có tồn tại thật không, nếu không thì trả về 404
    if (!category) {
        throw createError(404, 'Category Not Found')
    };
    res.json({
        data: category
    });
})

//POST api/v1/categories ==> create new category
router.post('/', (req, res) => {
    const newCategory = {
        id: fake_categories.length + 1,
        name: req.body.name
    }
    fake_categories.push(newCategory)
    //note: tạo mới thì status nên là 201
    res.status(201).json({
        data: newCategory,
        categories: fake_categories
    })
})

//PUT api/v1/categories ==> update a category
router.put('/:id', (req, res) => {
    console.log(req.params, req.body);
    const { id } = req.params

    //b1: Check xem trong database có tồn tại có id không
    let category = fake_categories.find(c => c.id === parseInt(id));
    if (!category) {
        throw createError(404, 'Category Not Found')
    }

    //b2: xử lí khi có tồn tại
    category = { ...category, name: req.body.name }
    res.json({
        data: category
    })
})

//DELETE api/v1/categories ==> delete a category by id
router.delete('/:id', (req, res) => {
    const { id } = req.params

    //b1: check xem có tồn tại không
    let category = fake_categories.find(c => c.id === parseInt(id));
    if (!category) {
        throw createError(404, 'Category Not Found')
    }

    //b2: xóa nếu có tồn tại
    const results = fake_categories.filter(c => c.id !== parseInt(id))
    res.json({
        data: results
    })
})


export default router;
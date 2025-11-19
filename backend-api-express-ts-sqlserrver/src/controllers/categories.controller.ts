import { Request, Response } from "express"
import createError from 'http-errors'
import categoriesService from "../services/categories.service"
import { sendJsonSuccess, SUCCESS } from "../helpers/responseHandler";


/**Get All Categories */
const findAll = async (req: Request, res: Response) => {
    const categories = await categoriesService.findAll();
    /* ban đầu dùng cách này, nhưng đã tạo folder helpers nên dùng cách dưới
    res.status(200).json({             //.status(200) là mặc định, không cần ghi cũng được
        data: categories
    });
    */
    sendJsonSuccess({ res, data: categories });
};

/**Find a Category by id */
const findById = async (req: Request, res: Response) => {
    const { id } = req.params; //id nhận được luôn là string
    //đảm bảo là có id nhập vào
    if (!id) {
        throw createError(400, 'ID not found');
    };
    const category = await categoriesService.findById({ id }); // cần có đầu vào nên phải có ({}) 
    /* ban đầu dùng cách này, nhưng đã tạo folder helpers nên dùng cách dưới
    res.status(200).json({
        data: category
    });
    */
    sendJsonSuccess({ res, data: category });
};

/**Create a new category */
const create = async (req: Request, res: Response) => {
    console.log('===>req.body<===',req.body);
    const newCategory = await categoriesService.create({ // cần có đầu vào nên phải có ({})
        categoryName: req.body.categoryName, // req.body.categoryName trong đó, categoryName là 1 phần từ trong obj của database Category
        description: req.body.description,
        slug: req.body.slug,

    });
    //note: tạo mới thì status nên là 201

    /*ban đầu dùng cách này, nhưng đã tạo folder helpers nên dùng cách dưới
    res.status(201).json({
        data: newCategory
    });
    */
    sendJsonSuccess({
        res,
        status: SUCCESS.CREATED,
        data: newCategory
    });
};

/**Update a Category by id*/
const updateById = async (req: Request, res: Response) => {
    console.log(req.params, req.body);
    const { id } = req.params
    //đảm bảo là có id nhập vào
    if (!id) {
        throw createError(400, 'ID not found');
    };
    const category = await categoriesService.updateById({
        id,
        payload: {
            categoryName: req.body.categoryName,
            description: req.body.description,
            slug: req.body.slug,
        }
    });
    sendJsonSuccess({
        res,
        status: SUCCESS.OK,
        data: category
    });

};

/**Delete a Category by id*/
const deleteById = async (req: Request, res: Response) => {
    const { id } = req.params;
    //đảm bảo là có id nhập vào
    if (!id) {
        throw createError(400, 'ID not found');
    };
    const category = await categoriesService.deleteById({ id })
    sendJsonSuccess({
        res,
        status: SUCCESS.OK,
        data: category
    });
};


export default {
    findAll,
    findById,
    create,
    updateById,
    deleteById
}
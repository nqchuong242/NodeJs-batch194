import { Request, Response } from "express"
import createError from 'http-errors'
import categoriesService from "../services/categories.service"
import { sendJsonSuccess, SUCCESS } from "../helpers/responseHandler";


/**Get All Categories */
const findAll = (req: Request, res: Response)=>{
    const categories = categoriesService.findAll();
    /* ban đầu dùng cách này, nhưng đã tạo folder helpers nên dùng cách dưới
    res.status(200).json({             //.status(200) là mặc định, không cần ghi cũng được
        data: categories
    });
    */ 
   sendJsonSuccess({res, data:categories});
};

/**Find a Category by id */
const findById = (req: Request, res: Response) => {
    const { id } = req.params; //id nhận được luôn là string
    //đảm bảo là có id nhập vào
    if(!id){
        throw createError(400, 'ID not found');
    };
    const category = categoriesService.findById({id}); // cần có đầu vào nên phải có ({}) 
    /* ban đầu dùng cách này, nhưng đã tạo folder helpers nên dùng cách dưới
    res.status(200).json({
        data: category
    });
    */
   sendJsonSuccess({res, data: category});
};

/**Create a new category */
const create = (req: Request, res: Response)=>{
    const newCategory = categoriesService.create({ // cần có đầu vào nên phải có ({})
        name: req.body.name // req.body.name trong đó, name là 1 phần từ trong obj của database
    });
    //note: tạo mới thì status nên là 201

    /*ban đầu dùng cách này, nhưng đã tạo folder helpers nên dùng cách dưới
    res.status(201).json({
        data: newCategory
    });
    */
   sendJsonSuccess({
    res,
    status: SUCCESS.CREATED ,
    data: newCategory
   });
};

/**Update a Category by id*/
const updateById = (req: Request, res: Response)=>{
    console.log(req.params, req.body);
    const { id } = req.params
    //đảm bảo là có id nhập vào
    if(!id){
        throw createError(400, 'ID not found');
    };
    const category = categoriesService.updateById({
        id,
        payload: {
            name: req.body.name
        }
    });
    res.json({
        data: category
    });

};

/**Delete a Category by id*/
const deleteById = (req: Request, res: Response)=>{
    const { id } = req.params;
    //đảm bảo là có id nhập vào
    if(!id){
        throw createError(400, 'ID not found');
    };
    const category =  categoriesService.deleteById({id})
    res.json({
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
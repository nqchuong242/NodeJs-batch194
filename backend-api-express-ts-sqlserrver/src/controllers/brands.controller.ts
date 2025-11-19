import { Request, Response } from "express"
import createError from 'http-errors'
import brandsService from "../services/brands.service"
import { sendJsonSuccess, SUCCESS } from "../helpers/responseHandler";


/**Get All Brands */
const findAll = async (req: Request, res: Response) => {
    const brands = await brandsService.findAll();
    /* ban đầu dùng cách này, nhưng đã tạo folder helpers nên dùng cách dưới
    res.status(200).json({             //.status(200) là mặc định, không cần ghi cũng được
        data: brands
    });
    */
    sendJsonSuccess({ res, data: brands });
};

/**Find a Brand by id */
const findById = async (req: Request, res: Response) => {
    const { id } = req.params; //id nhận được luôn là string
    //đảm bảo là có id nhập vào
    if (!id) {
        throw createError(400, 'ID not found');
    };
    const brand = await brandsService.findById({ id }); // cần có đầu vào nên phải có ({}) 
    /* ban đầu dùng cách này, nhưng đã tạo folder helpers nên dùng cách dưới
    res.status(200).json({
        data: brand
    });
    */
    sendJsonSuccess({ res, data: brand });
};

/**Create a new brand */
const create = async (req: Request, res: Response) => {
    const newBrand = await brandsService.create({ // cần có đầu vào nên phải có ({})
        brandName: req.body.brandName, // req.body.brandName trong đó, brandName là 1 phần từ trong obj của database Brand
        description: req.body.description,
        slug: req.body.slug,

    });
    //note: tạo mới thì status nên là 201

    /*ban đầu dùng cách này, nhưng đã tạo folder helpers nên dùng cách dưới
    res.status(201).json({
        data: newBrand
    });
    */
    sendJsonSuccess({
        res,
        status: SUCCESS.CREATED,
        data: newBrand
    });
};

/**Update a Brand by id*/
const updateById = async (req: Request, res: Response) => {
    console.log(req.params, req.body);
    const { id } = req.params
    //đảm bảo là có id nhập vào
    if (!id) {
        throw createError(400, 'ID not found');
    };
    const brand = await brandsService.updateById({
        id,
        payload: {
            brandName: req.body.brandName,
            description: req.body.description,
            slug: req.body.slug,
        }
    });
    sendJsonSuccess({
        res,
        status: SUCCESS.OK,
        data: brand
    });

};

/**Delete a Brand by id*/
const deleteById = async (req: Request, res: Response) => {
    const { id } = req.params;
    //đảm bảo là có id nhập vào
    if (!id) {
        throw createError(400, 'ID not found');
    };
    const brand = await brandsService.deleteById({ id })
    sendJsonSuccess({
        res,
        status: SUCCESS.OK,
        data: brand
    });
};


export default {
    findAll,
    findById,
    create,
    updateById,
    deleteById
}
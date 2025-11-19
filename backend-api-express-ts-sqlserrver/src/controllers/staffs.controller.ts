import { Request, Response } from "express"
import createError from 'http-errors'
import staffsService from "../services/staffs.service"
import { sendJsonSuccess, SUCCESS } from "../helpers/responseHandler";


/**Get All Staffs */
const findAll = async (req: Request, res: Response) => {
    const staffs = await staffsService.findAll();
    /* ban đầu dùng cách này, nhưng đã tạo folder helpers nên dùng cách dưới
    res.status(200).json({             //.status(200) là mặc định, không cần ghi cũng được
        data: staffs
    });
    */
    sendJsonSuccess({ res, data: staffs });
};

/**Find a Staff by id */
const findById = async (req: Request, res: Response) => {
    const { id } = req.params; //id nhận được luôn là string
    //đảm bảo là có id nhập vào
    if (!id) {
        throw createError(400, 'ID not found');
    };
    const staff = await staffsService.findById({ id }); // cần có đầu vào nên phải có ({}) 
    /* ban đầu dùng cách này, nhưng đã tạo folder helpers nên dùng cách dưới
    res.status(200).json({
        data: staff
    });
    */
    sendJsonSuccess({ res, data: staff });
};

/**Create a new staff */
const create = async (req: Request, res: Response) => {
    const newStaff = await staffsService.create({ // cần có đầu vào nên phải có ({})
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email,
        active: req.body.active,
        password: req.body.password,
/*         storeId: req.body.storeId,
        manageId: req.body.manageId,     */
        role: req.body.role,
    });
    //note: tạo mới thì status nên là 201

    /*ban đầu dùng cách này, nhưng đã tạo folder helpers nên dùng cách dưới
    res.status(201).json({
        data: newStaff
    });
    */
    sendJsonSuccess({
        res,
        status: SUCCESS.CREATED,
        data: newStaff
    });
};

/**Update a Staff by id*/
const updateById = async (req: Request, res: Response) => {
    console.log(req.params, req.body);
    const { id } = req.params
    //đảm bảo là có id nhập vào
    if (!id) {
        throw createError(400, 'ID not found');
    };
    const staff = await staffsService.updateById({
        id,
        payload: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            email: req.body.email,
            active: req.body.active,
            password: req.body.password,
/*             storeId: req.body.storeId,
            manageId: req.body.manageId, */
            role: req.body.role,
        }
    });
    sendJsonSuccess({
        res,
        status: SUCCESS.OK,
        data: staff
    });

};

/**Delete a Staff by id*/
const deleteById = async (req: Request, res: Response) => {
    const { id } = req.params;
    //đảm bảo là có id nhập vào
    if (!id) {
        throw createError(400, 'ID not found');
    };
    const staff = await staffsService.deleteById({ id })
    sendJsonSuccess({
        res,
        status: SUCCESS.OK,
        data: staff
    });
};


export default {
    findAll,
    findById,
    create,
    updateById,
    deleteById
}
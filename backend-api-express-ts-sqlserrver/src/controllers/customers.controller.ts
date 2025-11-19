import { Request, Response } from "express"
import createError from 'http-errors'
import { sendJsonSuccess, SUCCESS } from "../helpers/responseHandler";
import customersService from "../services/customers.service";


/**Get All Customers */
const findAll = async (req: Request, res: Response) => {
    const customers = await customersService.findAll();
    sendJsonSuccess({ res, data: customers });
};

/**Find a Customer by id */
const findById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
        throw createError(400, 'ID not found');
    };
    const customer = await customersService.findById({ id });
    sendJsonSuccess({ res, data: customer });
};

/**Create a new customer */
const create = async (req: Request, res: Response) => {
    const newCustomer = await customersService.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zipCode: req.body.zipCode,
        password: req.body.password,
        active: req.body.active,
    });

    sendJsonSuccess({
        res,
        status: SUCCESS.CREATED,
        data: newCustomer
    });
};

/**Update a Customer by id*/
const updateById = async (req: Request, res: Response) => {
    const { id } = req.params
    if (!id) {
        throw createError(400, 'ID not found');
    };
    const customer = await customersService.updateById({
        id,
        payload: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            email: req.body.email,
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            zipCode: req.body.zipCode,
            password: req.body.password,
            active: req.body.active,
        }
    });
    sendJsonSuccess({
        res,
        status: SUCCESS.OK,
        data: customer
    });

};

/**Delete a Customer by id*/
const deleteById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
        throw createError(400, 'ID not found');
    };
    const customer = await customersService.deleteById({ id })
    sendJsonSuccess({
        res,
        status: SUCCESS.OK,
        data: customer
    });
};


export default {
    findAll,
    findById,
    create,
    updateById,
    deleteById
}

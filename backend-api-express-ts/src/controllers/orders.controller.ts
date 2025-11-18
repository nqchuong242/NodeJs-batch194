import { Request, Response } from "express"
import createError from 'http-errors'
import { sendJsonSuccess, SUCCESS } from "../helpers/responseHandler";
import ordersService from "../services/orders.service";

const findAll = async (req: Request, res: Response) => {
    const orders = await ordersService.findAll();
    sendJsonSuccess({ res, data: orders });
};

const findById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
        throw createError(400, 'ID not found');
    };
    const order = await ordersService.findById({ id });
    sendJsonSuccess({ res, data: order });
};

const create = async (req: Request, res: Response) => {
    const newOrder = await ordersService.create({
        orderStatus: req.body.orderStatus,
        orderDate: req.body.orderDate,
        requireDate: req.body.requireDate,
        shippingDate: req.body.shippingDate,
        orderNote: req.body.orderNote,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        paymentType: req.body.paymentType,
        customerId: req.body.customerId,
        staffId: req.body.staffId,
    });
    sendJsonSuccess({ res, status: SUCCESS.CREATED, data: newOrder });
};

const updateById = async (req: Request, res: Response) => {
    const { id } = req.params
    if (!id) {
        throw createError(400, 'ID not found');
    };
    const order = await ordersService.updateById({
        id,
        payload: {
            orderStatus: req.body.orderStatus,
            orderDate: req.body.orderDate,
            requireDate: req.body.requireDate,
            shippingDate: req.body.shippingDate,
            orderNote: req.body.orderNote,
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            paymentType: req.body.paymentType,
            customerId: req.body.customerId,
            staffId: req.body.staffId,
        }
    });
    sendJsonSuccess({ res, status: SUCCESS.OK, data: order });
};

const deleteById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
        throw createError(400, 'ID not found');
    };
    const order = await ordersService.deleteById({ id })
    sendJsonSuccess({ res, status: SUCCESS.OK, data: order });
};

export default {
    findAll,
    findById,
    create,
    updateById,
    deleteById
}

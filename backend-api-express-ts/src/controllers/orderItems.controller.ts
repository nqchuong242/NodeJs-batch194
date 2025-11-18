import { Request, Response } from "express"
import createError from 'http-errors'
import { sendJsonSuccess, SUCCESS } from "../helpers/responseHandler";
import orderItemsService from "../services/orderItems.service";

const findAll = async (req: Request, res: Response) => {
    const items = await orderItemsService.findAll();
    sendJsonSuccess({ res, data: items });
};

const findById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
        throw createError(400, 'ID not found');
    };
    const item = await orderItemsService.findById({ id });
    sendJsonSuccess({ res, data: item });
};

const create = async (req: Request, res: Response) => {
    const newItem = await orderItemsService.create({
        quantity: req.body.quantity,
        price: req.body.price,
        discount: req.body.discount,
        orderId: req.body.orderId,
        itemId: req.body.itemId,
        productId: req.body.productId,
    });
    sendJsonSuccess({ res, status: SUCCESS.CREATED, data: newItem });
};

const updateById = async (req: Request, res: Response) => {
    const { id } = req.params
    if (!id) {
        throw createError(400, 'ID not found');
    };
    const item = await orderItemsService.updateById({
        id,
        payload: {
            quantity: req.body.quantity,
            price: req.body.price,
            discount: req.body.discount,
            orderId: req.body.orderId,
            itemId: req.body.itemId,
            productId: req.body.productId,
        }
    });
    sendJsonSuccess({ res, status: SUCCESS.OK, data: item });
};

const deleteById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
        throw createError(400, 'ID not found');
    };
    const item = await orderItemsService.deleteById({ id })
    sendJsonSuccess({ res, status: SUCCESS.OK, data: item });
};

export default {
    findAll,
    findById,
    create,
    updateById,
    deleteById
}

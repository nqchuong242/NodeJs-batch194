import createError from 'http-errors'
import Order from "../models/Order.model";
import { IOrderDTO } from '../types/orders.type';


const findAll = async () => {
    const orders = await Order.find()
    return orders
}

const findById = async ({id}:{id:string}) => {
    const order = await Order.findById(id);
    if (!order) {
        throw createError(404, "Order Not Found");
    }
    return order;
}

const create = async (orderDto: IOrderDTO) => {
    const order = new Order({
        orderStatus: orderDto.orderStatus,
        orderDate: orderDto.orderDate,
        requireDate: orderDto.requireDate,
        shippingDate: orderDto.shippingDate,
        orderNote: orderDto.orderNote,
        street: orderDto.street,
        city: orderDto.city,
        state: orderDto.state,
        paymentType: orderDto.paymentType,
        customerId: orderDto.customerId,
        staffId: orderDto.staffId,
    });
    const result = await order.save()
    return result;
}

const updateById = async ({
    id,
    payload
}: {
    id: string,
    payload: Partial<IOrderDTO>
}) => {
    const order = await Order.findById(id);
    if (!order) {
        throw createError(404, "Order Not Found");
    }
    Object.assign(order,payload);
    await order.save();
    return order;
}

const deleteById = async ({id}:{id:string}) => {
    const order = await Order.findById(id);
    if (!order) {
        throw createError(404, "Order Not Found");
    }
    await Order.findByIdAndDelete(order._id);
    return order;
}

export default {
    findAll,
    findById,
    create,
    updateById,
    deleteById
}

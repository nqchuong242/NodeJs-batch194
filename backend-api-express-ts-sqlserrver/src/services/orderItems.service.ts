import createError from 'http-errors'
import OrderItem from "../models/OrderItem.model";
import { IOrderItemDTO } from '../types/orderItems.type';


const findAll = async () => {
    const items = await OrderItem.find()
    return items
}

const findById = async ({id}:{id:string}) => {
    const item = await OrderItem.findById(id);
    if (!item) {
        throw createError(404, "OrderItem Not Found");
    }
    return item;
}

const create = async (dto: IOrderItemDTO) => {
    const item = new OrderItem({
        quantity: dto.quantity,
        price: dto.price,
        discount: dto.discount,
        orderId: dto.orderId,
        itemId: dto.itemId,
        productId: dto.productId,
    });
    const result = await item.save()
    return result;
}

const updateById = async ({
    id,
    payload
}: {
    id: string,
    payload: Partial<IOrderItemDTO>
}) => {
    const item = await OrderItem.findById(id);
    if (!item) {
        throw createError(404, "OrderItem Not Found");
    }
    Object.assign(item,payload);
    await item.save();
    return item;
}

const deleteById = async ({id}:{id:string}) => {
    const item = await OrderItem.findById(id);
    if (!item) {
        throw createError(404, "OrderItem Not Found");
    }
    await OrderItem.findByIdAndDelete(item._id);
    return item;
}

export default {
    findAll,
    findById,
    create,
    updateById,
    deleteById
}

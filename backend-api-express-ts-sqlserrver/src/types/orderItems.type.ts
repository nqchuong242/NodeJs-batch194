import { ObjectId } from "mongoose"

export interface IOrderItemDTO {
    quantity: number,
    price: number,
    discount: number,
    orderId: ObjectId | string,
    itemId: ObjectId | string,
    productId: ObjectId | string,
}

export interface IOrderItem {
    _id: ObjectId | string,
    quantity: number,
    price: number,
    discount: number,
    orderId: ObjectId | string,
    itemId: ObjectId | string,
    productId: ObjectId | string,
}

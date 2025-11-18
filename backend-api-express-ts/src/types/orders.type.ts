import { ObjectId } from "mongoose"

export interface IOrderDTO {
    orderStatus: number,
    orderDate: string,
    requireDate?: Date,
    shippingDate: Date,
    orderNote?: string,
    street: string,
    city: string,
    state: string,
    paymentType: number,
    customerId: ObjectId | string,
    staffId: ObjectId | string,
}

export interface IOrder {
    _id: ObjectId | string,
    orderStatus: number,
    orderDate: string,
    requireDate?: Date,
    shippingDate: Date,
    orderNote?: string,
    street: string,
    city: string,
    state: string,
    paymentType: number,
    customerId: ObjectId | string,
    staffId: ObjectId | string,
}

import { ObjectId } from "mongoose"

export interface ICustomerDTO {
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    street: string,
    city: string,
    state: string,
    zipCode?: string,
    password?: string,
    active?: boolean;
}

export interface ICustomer {
    _id: ObjectId | string,
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    street: string,
    city: string,
    state: string,
    zipCode?: string,
    password?: string,
    active?: boolean;
}

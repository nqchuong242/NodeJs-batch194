import { ObjectId } from "mongoose"

export interface IBrandDTO {
    brandName: string,
    description?: string,
    slug: string
}

export interface IBrand {
    _id: ObjectId | string,
    brandName: string,
    description?: string,
    slug: string
}
import { ObjectId } from "mongoose"

export interface IProductDTO {
    productName: string,
    price: number,
    discount: number,
    description?: string | null,
    modelYear: number,
    slug: string,
    thumbnail?: string | null,
    stock: number,
    categoryId: ObjectId | string,
    brandId: ObjectId | string,
}

export interface IProduct {
    _id: ObjectId | string,
    productName: string,
    price: number,
    discount: number,
    description?: string | null,
    modelYear: number,
    slug: string,
    thumbnail?: string | null,
    stock: number,
    categoryId: ObjectId | string,
    brandId: ObjectId | string,
}

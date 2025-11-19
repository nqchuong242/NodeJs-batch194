import { ObjectId } from "mongoose"

export interface ICategoryDTO {
    categoryName: string,
    description?: string,
    slug: string
}

export interface ICategory {
    _id: ObjectId | string,
    categoryName: string,
    description?: string,
    slug: string
}
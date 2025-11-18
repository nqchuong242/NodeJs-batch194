import { Request, Response } from "express"
import createError from 'http-errors'
import productsService from "../services/products.service"
import { sendJsonSuccess, SUCCESS } from "../helpers/responseHandler";

const findAll = async (req: Request, res: Response) => {
    const products = await productsService.findAll(req.query); //req.query lấy tham số truy vấn trên url
    sendJsonSuccess({ res, data: products });
};

const findById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
        throw createError(400, 'ID not found');
    };
    const product = await productsService.findById({ id });
    sendJsonSuccess({ res, data: product });
};

const create = async (req: Request, res: Response) => {
    const newProduct = await productsService.create({
        productName: req.body.productName,
        price: req.body.price,
        discount: req.body.discount,
        description: req.body.description,
        modelYear: req.body.modelYear,
        slug: req.body.slug,
        thumbnail: req.body.thumbnail,
        stock: req.body.stock,
        categoryId: req.body.categoryId,
        brandId: req.body.brandId,
    });
    sendJsonSuccess({ res, status: SUCCESS.CREATED, data: newProduct });
};

const updateById = async (req: Request, res: Response) => {
    const { id } = req.params
    if (!id) {
        throw createError(400, 'ID not found');
    };
    const product = await productsService.updateById({
        id,
        payload: {
            productName: req.body.productName,
            price: req.body.price,
            discount: req.body.discount,
            description: req.body.description,
            modelYear: req.body.modelYear,
            slug: req.body.slug,
            thumbnail: req.body.thumbnail,
            stock: req.body.stock,
            categoryId: req.body.categoryId,
            brandId: req.body.brandId,
        }
    });
    sendJsonSuccess({ res, status: SUCCESS.OK, data: product });
};

const deleteById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
        throw createError(400, 'ID not found');
    };
    const product = await productsService.deleteById({ id })
    sendJsonSuccess({ res, status: SUCCESS.OK, data: product });
};

export default {
    findAll,
    findById,
    create,
    updateById,
    deleteById
}

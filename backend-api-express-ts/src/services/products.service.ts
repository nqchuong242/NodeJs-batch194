import createError from 'http-errors'
import Product from "../models/Product.model";
import { IProductDTO } from '../types/products.type';


const findAll = async (query:any) => {

/*     const products = await Product
        .find()      //cáu hình điều kiện where
        .select('productName price discount modelYear') //cấu hình trường cần lấy hoặc loại bỏ
        //.select('-productName description') //ví dụ loại bỏ trường không cần thiết
        .populate('categoryId','categoryName description') // join colection: tên đã khai báo bên model
        .populate('brandId'); 
    return products */



/*   //ví dụ nếu code cứng bằng cách đặt const category_id
    const category_id = '6908d8f5419c616c807d8fcc'
    const products = await Product
        .find(      //cáu hình điều kiện where sẽ render ra category_id đó
            {        
            categoryId: category_id,
            price: { $lt: 1500 },  //giá nhỏ hơn 1500
            }
        ) 
        .select('productName price discount modelYear') //cấu hình trường cần lấy hoặc loại bỏ
        //.select('-productName description') //ví dụ loại bỏ trường không cần thiết
        .populate('categoryId','categoryName description') // join colection: tên đã khai báo bên model
        .populate('brandId'); 
    return products */


    //lấy tất cả sản phẩm có phân trang
/*     const page = 1; // lấy trang thứ 1
    const limit = 1; //giới hạn 1 sản phẩm mỗi trang => 2 cái này là code cứng, không nên dùng*/
    const {page = 1, limit = 1} = query;
    const products = await Product
        .find()      //cấu hình điều kiện where
        .select('productName price discount modelYear') //cấu hình trường cần lấy hoặc loại bỏ
        //.select('-productName description') //ví dụ loại bỏ trường không cần thiết
        .populate('categoryId','categoryName description') // join colection: categoryId-tên đã khai báo bên model
        .populate('brandId')
        //thuật toán phân trang, bỏ qua bao nhiêu sản phẩm
        .skip((page - 1) * limit) //bỏ qua bao nhiêu bản ghi, = 0 → không bỏ qua gì → lấy từ đầu.
        .limit(limit) //lấy tối đa bao nhiêu bản ghi
        ; 

    //lấy tổng số bản ghi của Product
    const total = await Product.countDocuments();

    return {
        items: products,
        pagination: {
            totalRecords: total, //Dùng để biết có bao nhiêu sản phẩm tất cả, chứ không chỉ trang hiện tại.
            totalPages: Math.ceil(total/limit), //Math.ceil() dùng để làm tròn lên, vì có thể số lượng không chia hết.
            currentPage: page, //Trang hiện tại mà bạn đang xem
            limit: Number(limit), //Giới hạn số sản phẩm mỗi trang
        }
    };  



}



const findById = async ({id}:{id:string}) => {
    const product = await Product.findById(id);
    if (!product) {
        throw createError(404, "Product Not Found");
    }
    return product;
}

const create = async (dto: IProductDTO) => {
    const product = new Product({
        productName: dto.productName,
        price: dto.price,
        discount: dto.discount,
        description: dto.description,
        modelYear: dto.modelYear,
        slug: dto.slug,
        thumbnail: dto.thumbnail,
        stock: dto.stock,
        categoryId: dto.categoryId,
        brandId: dto.brandId,
    });
    const result = await product.save()
    return result;
}

const updateById = async ({
    id,
    payload
}: {
    id: string,
    payload: Partial<IProductDTO>
}) => {
    const product = await Product.findById(id);
    if (!product) {
        throw createError(404, "Product Not Found");
    }
    Object.assign(product,payload);
    await product.save();
    return product;
}

const deleteById = async ({id}:{id:string}) => {
    const product = await Product.findById(id);
    if (!product) {
        throw createError(404, "Product Not Found");
    }
    await Product.findByIdAndDelete(product._id);
    return product;
}

export default {
    findAll,
    findById,
    create,
    updateById,
    deleteById
}

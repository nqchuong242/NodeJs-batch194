import { Schema, model } from 'mongoose';

const productSchema = new Schema({
    productName: {
        type: String,
        required: true, //yêu cầu điền, true-phải điền, fale-không điền
        unique: true, // trùng lặp, true-không được trùng, false-được trùng
        maxLength: 255, //độ dài tối đa
    },
    price: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
    },
    discount: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 70,
    },
    description: {
        type: String,
        required: false,
        default: null,
    },
    modelYear: {
        type: Number,
        required: true,
        min: 1900,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        maxLength: 255,
    },
    thumbnail: {
        type: String,
        required: false,
        maxLength: 255,
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
    },
    //RELATIONSHIP
    categoryId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Category', //reference - tham chiếu với bên Category
    },
    brandId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Brand',
    },
}, {
    //timestamps: true, //tự động thêm 2 trường createAt và updateAt
    versionKey: false, //loại bỏ__v
    collection: 'products' //tên collection trong database, nếu muốn đổi tên theo yêu cầu
});

//Tạo model
const Product = model('Product', productSchema);
export default Product;
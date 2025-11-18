import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
    categoryName: {
        type: String,
        required: true, //yêu cầu điền
        unique: true, //không được trùng lặp
        maxLength: 50, //độ dài tối đa
    },
    description: {
        type: String,
        required: false,
        unique: false,
        maxLength: 500,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        maxLength: 165,
    },
},{
    //timestamps: true, //tự động thêm 2 trường createAt và updateAt
    versionKey: false, //loại bỏ__v
    collection: 'categories' //tên collection trong database, nếu muốn đổi tên theo yêu cầu
});

//Tạo model
const Category = model ('Category', categorySchema);
export default Category;
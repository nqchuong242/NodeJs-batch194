import { Schema, model } from 'mongoose';

const classSchema = new Schema({
    fullName: {
        type: String, //kiểu dữ liệu
        required: true, //bắt buộc phải có
    },
},{
    timestamps: true, //tự động thêm 2 trường createAt và updateAt
    versionKey: false, //loại bỏ__v
});
//Tạo model từ schema
const Class = model("Class",classSchema); //Tên model nên viết hoa chữ đầu
export default Class;
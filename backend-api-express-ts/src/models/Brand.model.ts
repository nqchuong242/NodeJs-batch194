import {model, Schema} from 'mongoose'

const brandSchema = new Schema ({
    brandName:{
        type: String,
        required: true,
        unique: true,
        maxLength: 100,
    },
    description:{
        type: String,
        required: false,
        unique: false,
        maxLength: 500,
    },
    slug:{
        type: String,
        required: true,
        unique: true,
        maxLenght: 165,
    }
},{
    timestamps: true, //tự động thêm 2 trường createAt và updateAt
    versionKey: false, //loại bỏ__v
    collection: 'brands' //tên collection trong database, nếu muốn đổi tên theo yêu cầu
});

//tạo model
const Brand = model('Brand', brandSchema);
export default Brand;
import {model, Schema} from 'mongoose'

const customerSchema = new Schema ({
    firstName:{
        type: String,
        required: true, //yêu cầu điền, true-phải điền, fale-không điền
        unique: false, // trùng lặp, true-không được trùng, false-được trùng
        maxLength: 50,
    },
    lastName:{
        type: String,
        required: true,
        unique: false,
        maxLength: 50,
    },
    phone:{
        type: String,
        required: true,
        unique: true,
        maxLength: 50,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        maxLength: 50,
    },
    street:{
        type: String,
        required: true,
        unique: false,
        maxLength: 150,
    },
    city:{
        type: String,
        required: true,
        unique: false,
        maxLength: 50,
    },
    state:{
        type: String,
        required: true,
        unique: false,
        maxLength: 50,
    },
    zipCode:{
        type: String,
        required: false,
        unique: false,
        maxLength: 5,
    },
    password:{
        type: String,
        required: false,
        unique: false,
        maxLength: 255,
    },
},{
    timestamps: true, //tự động thêm 2 trường createAt và updateAt
    versionKey: false, //loại bỏ__v
    collection: 'customers' //tên collection trong database, nếu muốn đổi tên theo yêu cầu
});

//tạo model
const Customer = model('Customer', customerSchema);
export default Customer;
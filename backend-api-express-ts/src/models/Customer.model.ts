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
    phone: {
        type: String,
        required: true,
        unique: true,
        maxLength: 50,
        validate: {
            validator: function (v:any) {
                return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: (props:any) => `${props.value} is not a valid phone number!`,
        },
    },
    email:{
        type: String,
        required: true,
        unique: true,
        maxLength: 50,
        validate: {
            validator: function (v: string) {
              //Nếu email đã được sửa đổi hoặc là mới, thì thực hiện kiểm tra định dạng
              //Nếu không thì bỏ qua kiểm tra
              if (this.isModified('email') || this.isNew) {
                return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
              }
              return true; // Skip validation if email is unchanged
            },
            message: (props: {value: string}) => `${props.value} is not a valid email!`,
          },
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
    //Có khoá tài khoản không ?
    active: {
        type: Boolean,
        default: true,
        enum: ['true', 'false'],
    },
},{
    //timestamps: true, //tự động thêm 2 trường createAt và updateAt
    versionKey: false, //loại bỏ__v
    collection: 'customers' //tên collection trong database, nếu muốn đổi tên theo yêu cầu
});

//tạo model
const Customer = model('Customer', customerSchema);
export default Customer;
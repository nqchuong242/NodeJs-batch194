import {model, Schema} from 'mongoose'

const orderSchema = new Schema ({
    orderStatus:{
        type: Number,
        enum: [1,2,3,4],
        required: true //yêu cầu điền, true-phải điền, fale-không điền
    },
    orderDate:{
        type: String,
        required: true,
        maxLength: 50
    },
    requireDate:{
        type: Date,
        required: false
    },
    shippingDate:{
        type: Date,
        required: true
    },
    orderNote:{
        type: String,
        required: false
    },
    street:{
        type: String,
        required: true,
        maxLength: 255
    },
    city:{
        type: String,
        required: true,
        maxLength: 50
    },
    state:{
        type: String,
        required: true,
        maxLength: 50
    },
    paymentType:{
        type: Number,
        enum: [1,2,3,4],
        required: true,
    },
    //RELATIONSHIP
    customerId:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Customer', //reference - tham chiếu với bên Customer
    },
    staffId:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Staff', //reference - tham chiếu với bên Staff
    },
},{
    //timestamps: true, //tự động thêm 2 trường createAt và updateAt
    versionKey: false, //loại bỏ__v
    collection: 'staffs' //tên collection trong database, nếu muốn đổi tên theo yêu cầu
});

const Order = model ('Order', orderSchema);
export default Order
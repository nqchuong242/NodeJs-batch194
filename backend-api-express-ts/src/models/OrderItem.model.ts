import  {model, Schema} from 'mongoose'

const orderItemSchema = new Schema ({
    quantity:{
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    price:{
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    discount:{
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 70
    },
    //RELATIONSHIP
    orderId:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Order', //reference - tham chiếu với bên Order
    },
    itemId:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Item', //reference - tham chiếu với bên Item
    },
    productId:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Product', //reference - tham chiếu với bên Product
    }
},{
    //timestamps: true, //tự động thêm 2 trường createAt và updateAt
    versionKey: false, //loại bỏ__v
    collection: 'staffs' //tên collection trong database, nếu muốn đổi tên theo yêu cầu
});

const OrderItem = model('Order Item', orderItemSchema);
export default OrderItem
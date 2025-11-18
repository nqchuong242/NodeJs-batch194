import {Model, model, Schema} from 'mongoose'
import { IStaff, IStaffMethods } from '../types/staffs.type';
import bcrypt from 'bcryptjs';

const saltRounds = 10;

const staffSchema = new Schema <IStaff, Model<IStaff>, IStaffMethods > ({
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
        validate: {
            validator: function (v:string) {
                return /^(\+84|0)\d{9,10}$/.test(v);
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
    active:{
        type: Number,
        required: true,
        enum: [0,1],
        default: 0,
    },
    password:{
        type: String,
        required: true,
        unique: false,
        maxLength: 255,
        validate: {
            validator: function (this: IStaff, v: string) {
            // Only validate password if it has been modified or is new
            if (this.isModified('password') || this.isNew) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(v);
            }
            return true; // Skip validation if password is unchanged
            },
            message: (props: { value: string }) =>
            `${props.value} is not a valid password! It must contain at least one uppercase letter, one lowercase letter, one number, and one special character.`,
        },
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'manager', 'staff'],
        default: 'staff',
    },
    //Phân quyền nâng cao hơn với permissions
    // permissions: {
    //     type: [String],
    //     default: [],
    // }
    
    //RELATIONSHIP
/*     storeId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Store', //reference - tham chiếu với bên Store
    },
    manageId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Manage',
    }, */
},{
    //timestamps: true, //tự động thêm 2 trường createAt và updateAt
    versionKey: false, //loại bỏ__v
    collection: 'staffs' //tên collection trong database, nếu muốn đổi tên theo yêu cầu
});


//Middleware pre save ở lớp database
//trước khi data được lưu xuống --> mã hóa mật khẩu
staffSchema.pre('save', async function (next) {
    const staff = this;

    //Nếu staff không có password thì không cần mã hóa
    if (staff.isModified('password')) {  //isModified: kiểm tra trường password có bị thay đổi không
      const salt = bcrypt.genSaltSync(saltRounds); //tạo ra chuỗi muối, const saltRounds = 10;
      const hash = bcrypt.hashSync(staff.password, salt); //mã hóa mật khẩu với muối
      staff.password = hash; //gán mật khẩu đã mã hóa cho staff.password
    }
  
    next();
});



//Methods compare password - so sánh mật khẩu
//Thêm chức năng (hành vi) so sánh mật khẩu vào staffSchema bằng cách sử dụng methods
staffSchema.methods.comparePassword = function (rawPassword: string): boolean { //boolean trả về true hoặc false
    const staff = this ;
    //rawPassword: mật khẩu chưa mã hóa - mật khẩu người dùng nhập vào
    //staff.password: mật khẩu đã mã hóa - mật khẩu lưu trong DB
    return bcrypt.compareSync(rawPassword, staff.password); //compareSync so sánh 2 mật khẩu
};


//tạo model
const Staff = model('Staff', staffSchema);
export default Staff;
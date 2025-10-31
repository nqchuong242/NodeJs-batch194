import { Schema, model } from 'mongoose';

const studentSchema = new Schema({
    fullName: {
        type: String, //kiểu dữ liệu
        required: true, //bắt buộc phải có
    },
    age:{
        type: Number,
        required: true,
    },
    //giống như là khóa ngoại
    //đang tham chiếu tới table gốc Class
    classId:{
        type: Schema.Types.ObjectId,
        ref: 'Class', //reference - tham chiếu với bên class
    }
},{
    timestamps: true, //tự động thêm 2 trường createAt và updateAt
    versionKey: false, //loại bỏ__v
    collection: 'students' //tên collection trong database, nếu muốn đổi tên theo yêu cầu
});
//Tạo model từ schema
const Student = model("Student",studentSchema); //Tên model nên viết hoa chữ đầu
export default Student;
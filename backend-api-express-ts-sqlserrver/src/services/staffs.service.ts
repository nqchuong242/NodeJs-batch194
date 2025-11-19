import createError from 'http-errors'
import Staff from "../models/Staff.model";
import { IStaffDTO } from '../types/staffs.type';

/**Get All Staffs */
const findAll = async ()  => {
    // SELECT * FROM staffs
    const staffs = await Staff
    .find()
    //.select('-password'); //loại bỏ trường password khi truy vấn
    return staffs
};

/**Find a Staff by id */
const findById = async ({id}:{id:string}) => {
    //SELECT * FROM categoris WHERE id=?
    const staff = await Staff.findById(id);
    //Phải kiểm tra xem có tồn tại thật không, nếu không thì trả về 404
    if (!staff) {
        throw createError(404, "Staff Not Found");
    };
    return staff;
};

/**Create a new staff */
const create = async (staffDto: IStaffDTO) => {
    const staff = new Staff({
        firstName: staffDto.firstName,
        lastName: staffDto.lastName,
        phone: staffDto.phone,
        email: staffDto.email,
        active: staffDto.active,
        password: staffDto.password,
/*         storeId: staffDto.storeId,
        manageId: staffDto.manageId,    */ 
        role: staffDto.role,
    });
    const result = await staff.save()
    return result;
}

/**Update a Staff by id*/
const updateById = async ({
    id, //id là phải có, còn các phần tử kia ở sau
    payload //và các option còn lại
}: {
    id: string, 
    payload: Partial<IStaffDTO> //Partial: kiểu tùy chọn
})=> {
    //b1: Check xem trong database có tồn tại có id không
    const staff = await Staff.findById(id);
    if (!staff) {
        throw createError(404, "Staff Not Found");
    };
    //b2: xử lý update khi có thay đổi
    //Object.assign(staff,payload);//trộn dữ liệu mới và cũ--bắt buộc update đủ các trường

    
    if(payload.firstName !== undefined){ //!== undefined → Chỉ update nếu client có gửi dữ liệu
        staff.firstName = payload.firstName;
    };
    if(payload.lastName !== undefined){
        staff.lastName = payload.lastName;
    };
    if(payload.phone !== undefined){
        staff.phone = payload.phone;
    };
    if(payload.email !== undefined){
        staff.email = payload.email;
    };
    if(payload.active !== undefined){
        staff.active = payload.active;
    };
    if(payload.password !== undefined){
        staff.password = payload.password;
    };
    if(payload.role !== undefined){
        staff.role = payload.role;
    };
    

    //lưu lại database
    await staff.save();
    return staff;
};

/**Delete a Staff by id*/
const deleteById = async ({id}:{id:string}) => { //nếu 1 giá trị thì ghi vậy cho gọn
    //b1: Check xem trong database có tồn tại có id không
    const staff = await Staff.findById(id);
    if (!staff) {
        throw createError(404, "Staff Not Found");
    }
    //b2: xóa nếu có tồn tại
    //const result = fake_staffs.filter(c => c.id !== parseInt(id));
    await Staff.findByIdAndDelete(staff._id);
    return staff;
}

export default {
    findAll,
    findById,
    create,
    updateById,
    deleteById

}
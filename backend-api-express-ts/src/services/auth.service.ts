import Staff from "../models/Staff.model";
import createError from "http-errors";
import { generateTokens } from "../utils/jwt";
import { ITokenPayload } from "../types/auth.type";


/**Xác thực Login */
const verifyUser = async ({
    email,
    password
}:{
    email: string,
    password: string
})=>{
    //TODO: xác thực user với DB
    //Step1: Tìm xem trong DB có user với email này không
    const staff = await Staff.findOne({email}); //findOne tìm 1 đối tượng trong model Staff
    if(!staff){
        throw createError(404, "Staff Not Found");
    }

    //Step2: Nếu có so sánh password
    const isPasswordValid = staff.comparePassword(password); //isPasswordValid trả về true hoặc false
    if(!isPasswordValid){
        throw createError(401, "Password is incorrect");
    }

    //Step3: Nếu khớp trả về token hoặc thông tin user
    //bao gom cả accessToken và refreshToken
    const tokens = generateTokens({ //Tokens - số nhiều
        sub: staff._id.toString(), //ép chuỗi _id từ objectId sang string
        email: staff.email,
        role: staff.role,
    } as ITokenPayload);
    return tokens;
};

export default {
    verifyUser
}
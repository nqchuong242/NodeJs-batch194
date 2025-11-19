import { Request, Response, NextFunction } from "express";
import authService from "../services/auth.service";
import { sendJsonSuccess } from "../helpers/responseHandler";

//POST api/v1/auth/login ==> login user
const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
            console.log("   Email:", email);
            console.log("   Password:", password);
        const result = await authService.verifyUser({ email, password });
        sendJsonSuccess({res, data: result});

    } catch (error) {
        next(error);
    }
}

//GET api/v1/auth/profile ==> get profile user
const getProfile = async (req: Request, res: Response, next: NextFunction) => {
    //Lấy thông tin staff từ biến local đã được đăng ký trong middleware auth.middleware.ts
    const staff = res.locals.staff;

    sendJsonSuccess({
        res,
        data: staff,
    });
    console.log('Profile Staff:', staff);
}


export default {
    login,
    getProfile,
}
import createError from 'http-errors';
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import Staff from '../models/Staff.model';

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  //Get the jwt token from the head
  const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    console.log('Token:', token);
     //If token is not valid, respond with 401 (unauthorized) - kiểm tra token có hợp lệ không
    if (!token) {
      return next(createError(401, 'Unauthorized 1'));
    }
    
    try {
      //giải mã token để xác thực người dùng
      const decoded = verifyToken(token);
      console.log('Decoded Token:', decoded);

      //try verify staff exits in database - kiểm tra staff có tồn tại trong db không
      const staff = await Staff
      .findById(decoded.sub) //vì trong decoded đã đặt sub là id của staff
      .select('-password'); 
      console.log('Authenticated Staff:', staff);

      if (!staff) {
        return next(createError(401, 'Unauthorized 2'));
      }

      //Đăng ký biến staff local trong app để sử dụng ở các middleware hoặc controller sau
      res.locals.staff = staff;
      console.log('res.locals.staff set to:', res.locals.staff);

      next();
    } catch (err) {
      return next(createError(403, 'Forbidden'));
    }
};


export const authorize = (roles: string[] = []) => {
    // roles param can be a single role string (e.g. Role.Staff or 'Staff') 
    // or an array of roles (e.g. [Role.Admin, Role.Staff] or ['Admin', 'Staff'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req: Request, res: Response, next: NextFunction) => {
      if (roles.length && res.locals.staff.role && !roles.includes(res.locals.staff.role)) {
        return next(createError(403, 'KHÔNG CÓ QUYỀN TRUY CẬP'));
      }
        // authentication and authorization successful
        next();
    }
}
import { Request, Response, NextFunction } from 'express';

export const routeExampleMiddleware = (req: Request, res: Response, next: NextFunction) => {
    //xử lí logic ở đây
    console.log('==> Route Example Middleware');


    next();  //chuyển tiếp cho middleware tiếp theo
}
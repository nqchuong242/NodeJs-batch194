import { Request, Response, NextFunction } from 'express';

export const appExampleMiddleware = (req: Request, res: Response, next: NextFunction) => {
    //xử lí logic ở đây
    console.log('Request received:', req.method, req.url);


    next();  //chuyển tiếp cho middleware tiếp theo
}
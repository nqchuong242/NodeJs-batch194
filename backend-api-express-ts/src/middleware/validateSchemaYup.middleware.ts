import {AnySchema, ValidationError} from 'yup';
import { NextFunction, Request, Response } from 'express';


//KIỂM TRA REQUEST TỪ CLIENT CÓ ĐÚNG THEO SCHEMA ĐÃ ĐỊNH NGHĨA KHÔNG, NẾU KHÔNG TRẢ VỀ LỖI

const validateSchemaYup = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await schema.validate({ //các trường cần validate, tạo 1 file riêng để khai báo schema
      body: req.body,  //dữ liệu gửi qua body
      query: req.query,  //dữ liệu truy vấn trên URL, Là các cặp key=value nằm sau dấu ? trên URL.
      params: req.params,  //dữ liệu động trong URL, Là tham số nằm trong path của route
    }, 
    { 
      abortEarly: false, // abortEarly: false để lấy tất cả lỗi thay vì chỉ lấy lỗi đầu tiên
    }  
  );

  next();

  } catch (err) {
    //console.log(err);
    if (err instanceof ValidationError) {
      //console.error(err);
      res.status(400).json({
        statusCode: 400,
        message: err.errors.join(', '), // err.errors chứa tất cả các thông điệp lỗi
        typeError: 'validateSchema'
      });
      return; // đảm bảo không tiếp tục thực hiện sau khi đã gửi phản hồi
    }

    res.status(500).json({
      statusCode: 500,
      message: 'validate Yup Error',
      typeError: 'validateSchemaUnknown'
    });
  }
};

export default validateSchemaYup;

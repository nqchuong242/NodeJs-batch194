import { Response } from "express";
import { Status, SUCCESS, ERROR } from "../constants/responseConstants";

/**
 * Mặc định trả về status 200
 *
 */
export const sendJsonSuccess = ({ //đặt trong obj để có thể lựa chọn tùy ý, ko theo thứ thự mặc định
  res,
  status = SUCCESS.OK, //OK trong SUCCESS là 200, đúng với mặc định, có thể thay đổi
  data = null,
}: {
  res: Response;
  status?: Status;
  data?: any;
}): void => {
  res.status(status.statusCode).json({
    statusCode: status.statusCode,
    message: status.message,
    data,
  });
};

/**
 * Mặc định trả về status 500
 *
 */
export const sendJsonError = ({
  res,
  status = ERROR.SERVER_ERROR, // đặt là mặc định, có thể thay đổi  
}: {
  res: Response;
  status: Status;
}): void => {
  res.status(status.statusCode).json({
    statusCode: status.statusCode,
    message: status.message,
    data: null,
  });
};

export { SUCCESS, ERROR };
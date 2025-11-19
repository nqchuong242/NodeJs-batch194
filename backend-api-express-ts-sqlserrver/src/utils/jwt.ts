import jwt, { JwtPayload } from "jsonwebtoken";
import { ENV } from "../config/ENV";


// ✅ Hàm tạo token
export const generateToken = (payload: any, expiresIn: string): string => { //expiresIn: thời gian hết hạn
  return jwt.sign(
    payload, 
    ENV.JWT_SECRET_KEY, 
    {expiresIn: expiresIn,} as jwt.SignOptions
  );
};

// Tạo access token và refresh token
export const generateTokens = (payload: any) => {
  const accessToken = generateToken(payload, ENV.JWT_ACCESS_TOKEN_EXPIRES_IN);
  //Dùng để xác thực nhanh. Khi accessToken hết hạn thì dùng refreshToken để lấy accessToken mới
  const refreshToken = generateToken(payload, ENV.JWT_REFRESH_TOKEN_EXPIRES_IN);
  return { accessToken, refreshToken };
};

// ✅ Xác thực token (verify) - dùng trong middleware
export const verifyToken = (token: string): any | null => {
  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET_KEY) as JwtPayload; 
    return decoded as any; //jwt.verify trả về payload nếu token hợp lệ (giải mã từ token)
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}; 
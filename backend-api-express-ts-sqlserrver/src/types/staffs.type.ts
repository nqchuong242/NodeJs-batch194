import { Document , ObjectId } from "mongoose"

export interface IStaffMethods {
  comparePassword(rawPassword: string): boolean;
}

export interface IStaffDTO {
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    active: number,
    password: string,
/*     storeId: ObjectId | string,
    manageId: ObjectId | string, */
    role: "admin" | "manager" | "staff",

}

export interface IStaff extends Document {
    _id: ObjectId | string,
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    active: number,
    password: string,
/*     storeId: ObjectId | string,
    manageId: ObjectId | string, */
    role: "admin" | "manager" | "staff",
}
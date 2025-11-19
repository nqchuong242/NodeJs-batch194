import createError from 'http-errors'
import Customer from "../models/Customer.model";
import { ICustomerDTO } from '../types/customers.type';


/**Get All Customers */
const findAll = async ()  => {
    const customers = await Customer.find()
    return customers
};

/**Find a Customer by id */
const findById = async ({id}:{id:string}) => {
    const customer = await Customer.findById(id);
    if (!customer) {
        throw createError(404, "Customer Not Found");
    };
    return customer;
};

/**Create a new customer */
const create = async (customerDto: ICustomerDTO) => {
    const customer = new Customer({
        firstName: customerDto.firstName,
        lastName: customerDto.lastName,
        phone: customerDto.phone,
        email: customerDto.email,
        street: customerDto.street,
        city: customerDto.city,
        state: customerDto.state,
        zipCode: customerDto.zipCode,
        password: customerDto.password,
        active: customerDto.active || true,
    });
    const result = await customer.save()
    return result;
}

/**Update a Customer by id*/
const updateById = async ({
    id,
    payload
}: {
    id: string,
    payload: Partial<ICustomerDTO>
})=> {
    const customer = await Customer.findById(id);
    if (!customer) {
        throw createError(404, "Customer Not Found");
    };
    Object.assign(customer,payload);
    await customer.save();
    return customer;
};

/**Delete a Customer by id*/
const deleteById = async ({id}:{id:string}) => {
    const customer = await Customer.findById(id);
    if (!customer) {
        throw createError(404, "Customer Not Found");
    }
    await Customer.findByIdAndDelete(customer._id);
    return customer;
}

export default {
    findAll,
    findById,
    create,
    updateById,
    deleteById

}

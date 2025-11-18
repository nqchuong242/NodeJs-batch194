import createError from 'http-errors'
import Brand from "../models/Brand.model";
import { IBrandDTO } from '../types/brands.type';

/**Get All Brands */
const findAll = async ()  => {
    // SELECT * FROM brands
    const brands = await Brand
        .find()
        .select('-slug'); //loại bỏ trường không cần thiết
    return brands
};

/**Find a Brand by id */
const findById = async ({id}:{id:string}) => {
    //SELECT * FROM categoris WHERE id=?
    const brand = await Brand.findById(id);
    //Phải kiểm tra xem có tồn tại thật không, nếu không thì trả về 404
    if (!brand) {
        throw createError(404, "Brand Not Found");
    };
    return brand;
};

/**Create a new brand */
const create = async (brandDto: IBrandDTO) => {
    const brand = new Brand({
        brandName: brandDto.brandName,
        description: brandDto.description,
        slug: brandDto.slug
    });
    const result = await brand.save()
    return result;
}

/**Update a Brand by id*/
const updateById = async ({
    id, //id là phải có, còn các phần tử kia ở sau
    payload
}: {
    id: string, 
    payload: Partial<IBrandDTO> //Partial: kiểu tùy chọn
})=> {
    //b1: Check xem trong database có tồn tại có id không
    const brand = await Brand.findById(id);
    if (!brand) {
        throw createError(404, "Brand Not Found");
    };
    //b2: xử lý update khi có thay đổi
    //Object.assign(brand,payload);//trộn dữ liệu mới và cũ --bắt buộc update đủ các trường
    if(payload.brandName !== undefined){ //!== undefined → Chỉ update nếu client có gửi dữ liệu
        brand.brandName = payload.brandName
    };
    if(payload.description !== undefined){
        brand.description = payload.description
    };
    if(payload.slug !== undefined){
        brand.slug = payload.slug
    };

    //lưu lại database
    await brand.save();
    return brand;
};

/**Delete a Brand by id*/
const deleteById = async ({id}:{id:string}) => { //nếu 1 giá trị thì ghi vậy cho gọn
    //b1: Check xem trong database có tồn tại có id không
    const brand = await Brand.findById(id);
    if (!brand) {
        throw createError(404, "Brand Not Found");
    }
    //b2: xóa nếu có tồn tại
    //const result = fake_brands.filter(c => c.id !== parseInt(id));
    await Brand.findByIdAndDelete(brand._id);
    return brand;
}

export default {
    findAll,
    findById,
    create,
    updateById,
    deleteById

}
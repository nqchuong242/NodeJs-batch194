import createError from 'http-errors'
import { ICategoryDTO } from "../types/categories.type"
import Category from "../models/Category.model";

/**Get All Categories */
const findAll = async ()  => {
    // SELECT * FROM categories
    const categories = await Category.find()
    return categories
};

/**Find a Category by id */
const findById = async ({id}:{id:string}) => {
    //SELECT * FROM categoris WHERE id=?
    const category = await Category.findById(id);
    //Phải kiểm tra xem có tồn tại thật không, nếu không thì trả về 404
    if (!category) {
        throw createError(404, "Category Not Found");
    };
    return category;
};

/**Create a new category */
const create = async (categoryDto: ICategoryDTO) => {
    const category = new Category({
        categoryName: categoryDto.categoryName,
        description: categoryDto.description,
        slug: categoryDto.slug
    });
    const result = await category.save()
    return result;
}

/**Update a Category by id*/
const updateById = async ({
    id, //id là phải có, còn các phần tử kia ở sau
    payload //và các option còn lại
}: {
    id: string, 
    payload: Partial<ICategoryDTO> //Partial: kiểu tùy chọn
})=> {
    //b1: Check xem trong database có tồn tại có id không
    const category = await Category.findById(id);
    if (!category) {
        throw createError(404, "Category Not Found");
    };
    //b2: xử lý update khi có thay đổi
    //Object.assign(category,payload);//trộn dữ liệu mới và cũ--bắt buộc update đủ các trường

    if(payload.categoryName !== undefined){ //!== undefined → Chỉ update nếu client có gửi dữ liệu
        category.categoryName = payload.categoryName;
    };
    if(payload.description !== undefined){
        category.description = payload.description;
    };
    if(payload.slug !== undefined){
        category.slug = payload.slug;
    };

    //lưu lại database
    await category.save();
    return category;
};

/**Delete a Category by id*/
const deleteById = async ({id}:{id:string}) => { //nếu 1 giá trị thì ghi vậy cho gọn
    //b1: Check xem trong database có tồn tại có id không
    const category = await Category.findById(id);
    if (!category) {
        throw createError(404, "Category Not Found");
    }
    //b2: xóa nếu có tồn tại
    //const result = fake_categories.filter(c => c.id !== parseInt(id));
    await Category.findByIdAndDelete(category._id);
    return category;
}

export default {
    findAll,
    findById,
    create,
    updateById,
    deleteById

}
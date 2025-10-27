import { fake_categories } from "../mockup/mockData"
import createError from 'http-errors'
import { ICategory, ICategoryDTO } from "../types/categories.type"

/**Get All Categories */
const findAll = () : ICategory[] => {
    return fake_categories
};

/**Find a Category by id */
const findById = ({id}:{id:string}) => {
const category = fake_categories.find(c => c.id === parseInt(id));
    //Phải kiểm tra xem có tồn tại thật không, nếu không thì trả về 404
    if (!category) {
        throw createError(404, "Category Not Found");
    };
    return category;
};

/**Create a new category */
const create = ({name}: ICategoryDTO) : ICategory=> {
    const newCategory = {
        id: fake_categories.length + 1,
        name, // đúng là sẽ viết name: name, nhưng ta ghi tắt được
    }
    fake_categories.push(newCategory);
    return newCategory;
}

/**Update a Category by id*/
const updateById = ({
    id, //id là phải có, còn các phần tử kia ở sau
    payload
}: {
    id: string, 
    payload: Partial<ICategoryDTO> //Partial: kiểu tùy chọn
}) : ICategory => {
    //b1: Check xem trong database có tồn tại có id không
    let category = fake_categories.find(c => c.id === parseInt(id));
    if (!category) {
        throw createError(404, "Category Not Found");
    };
    //b2: cập nhật phần tử khi có tồn tại
    if(payload.name){ //vì payload là phần từ tùy chọn trong obj, nên phải check xem có phần tử đó không
        category = { ...category, name: payload.name };
    };
    return category;
};

/**Delete a Category by id*/
const deleteById = ({id}:{id:string}) : ICategory => { //nếu 1 giá trị thì ghi vậy cho gọn
    //b1: Check xem trong database có tồn tại có id không
    let category = fake_categories.find(c => c.id === parseInt(id));
    if (!category) {
        throw createError(404, "Category Not Found");
    }
    //b2: xóa nếu có tồn tại
    //const results = fake_categories.filter(c => c.id !== parseInt(id));
    return category;
}

export default {
    findAll,
    findById,
    create,
    updateById,
    deleteById

}
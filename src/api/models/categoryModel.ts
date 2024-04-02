import { Category, GetCategoriesResponse, PostCategoryResponse } from "mpp-api-types";
import Database from "../../core/database/Database";
import { DBCategory } from "../../types/DBTypes";

const getAllCategories = async (): Promise<GetCategoriesResponse> => {
    const categories = (await Database.get("categories")) as null | DBCategory[];
    return categories ?? [];
};

const addCategory = async (categoryData: Category): Promise<PostCategoryResponse | null> => {
    const id = await Database.insert("categories", categoryData);
    return id ? { id, title: categoryData.title } : null;
};

const deleteCategory = async (id: number): Promise<number | null> => {
    const deleted = await Database.delete("categories", id);
    return deleted ? id : null;
};

export { getAllCategories, addCategory, deleteCategory };

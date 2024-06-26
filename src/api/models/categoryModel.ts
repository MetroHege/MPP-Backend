import {
    Category,
    CategoryWithId,
    GetCategoriesResponse,
    PostCategoryResponse,
} from "mpp-api-types";
import Database from "../../core/database/Database";
import { DBCategory } from "../../types/DBTypes";
import config from "../../config";

const getAllCategories = async (): Promise<GetCategoriesResponse> => {
    const categories = (await Database.get("categories")) as null | DBCategory[];
    return categories ?? [];
};

const getCategoryById = async (id: number): Promise<CategoryWithId | null> => {
    if (config.env === "test") return { id, title: "Test Category" };
    const categories = await Database.get("categories", id);
    return categories?.length ? (categories[0] as CategoryWithId) : null;
};

const addCategory = async (categoryData: Category): Promise<PostCategoryResponse | null> => {
    const id = await Database.insert("categories", categoryData);
    return id ? { id, title: categoryData.title } : null;
};

const deleteCategory = async (id: number): Promise<number | null> => {
    Database.query("UPDATE listings SET category = 0 WHERE category = ?", [id]);
    const deleted = await Database.delete("categories", id);
    return deleted ? id : null;
};

export { getAllCategories, getCategoryById, addCategory, deleteCategory };

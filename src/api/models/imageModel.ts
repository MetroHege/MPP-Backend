import { Image } from "mpp-api-types";
import Database from "../../core/database/Database";
import { DBImage } from "../../types/DBTypes";

const addImage = async (image: Image): Promise<DBImage> => {
    const id = await Database.insert("images", image);
    if (!id) throw new Error("Failed to add image");
    return { ...image, id };
};

const getListingImages = async (listingId: number): Promise<DBImage[]> => {
    const images = (await Database.get("images")) as null | DBImage[];
    if (!images) return [];
    return images.filter(image => image.listing === listingId);
};

export { addImage, getListingImages };

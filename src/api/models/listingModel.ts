import { DeleteListingResponse, ListingWithId, PostableListing } from "mpp-api-types";
import Database from "../../core/database/Database";
import { DBListing } from "../../types/DBTypes";
import { getUser } from "./userModel";
import config from "../../config";
import { addImage, getListingImages } from "./imageModel";
import { getCategoryById } from "./categoryModel";

const getAllListings = async (
    range: { start: number; end: number } = { start: 0, end: 25 },
    sort?: string | "newest" | "oldest" | "low-high" | "high-low",
    filters?: { category?: number; query?: string }
): Promise<ListingWithId[]> => {
    let listings = (await Database.query(
        "SELECT * FROM listings" + (filters?.category ? " WHERE category = ?" : ""),
        filters?.category ? [filters.category] : undefined
    )) as DBListing[] | null;
    if (!listings) return [];
    if (filters?.query)
        listings = listings.filter(listing => {
            const query = filters.query?.toLowerCase() ?? "";
            return listing.title.toLowerCase().includes(query);
        });

    if (sort) {
        switch (sort) {
            case "newest":
                listings.sort((a, b) => (a.time > b.time ? -1 : 1));
                break;
            case "oldest":
                listings.sort((a, b) => (a.time < b.time ? -1 : 1));
                break;
            case "low-high":
                listings.sort((a, b) => a.price - b.price);
                break;
            case "high-low":
                listings.sort((a, b) => b.price - a.price);
                break;
        }
    }
    if (listings.length < range.end) range.end = listings.length;
    listings.splice(range.end);
    listings.splice(0, range.start);

    const fullListings = Promise.all(
        listings.map(async listing => {
            const user = await getUser(listing.user);
            const images = await getListingImages(listing.id);
            return {
                ...listing,
                images,
                thumbnail: images.find(image => image.thumbnail) ?? null,
                user: user ?? listing.user,
                category: (await getCategoryById(listing.category)) ?? listing.category,
            };
        })
    );
    return fullListings;
};

const getUserListings = async (userId: number): Promise<ListingWithId[]> => {
    const listings = (await Database.get("listings")) as null | DBListing[];
    if (!listings) return [];
    const userlistings = listings.filter(listing => listing.user === userId);
    const listingsWithUser = Promise.all(
        userlistings.map(async listing => {
            const user = await getUser(listing.user);
            return {
                ...listing,
                user: user ?? listing.user,
                category: (await getCategoryById(listing.category)) ?? listing.category,
            };
        })
    );
    return listingsWithUser;
};

const addListing = async (
    listingData: PostableListing & { images: string[] },
    userId: number
): Promise<ListingWithId | null> => {
    const id = await Database.insert("listings", {
        ...listingData,
        images: "",
        user: userId,
    });
    if (!id) return null;
    const listings = (await Database.get("listings", id)) as DBListing[] | null;
    if (!listings) return null;
    const images = await Promise.all(
        listingData.images.map(async (image, index) => {
            addImage({
                listing: id,
                url: `${config.uploadUrl}${image}`,
                thumbnail: index === 0,
            });
        })
    );
    const listing = await updateListing(id, { images: JSON.stringify(images) });
    if (!listing) return null;
    const user = await getUser(listings[0].user);
    return {
        ...listing,
        user: user ?? listing.user,
    };
};

const getListing = async (id: number): Promise<ListingWithId | null> => {
    const listings = (await Database.get("listings", id)) as DBListing[] | null;
    if (!listings) return null;
    const listing = listings[0];
    const user = await getUser(listing.user);
    const images = await getListingImages(id);
    return {
        ...listing,
        images,
        thumbnail: images.find(image => image.thumbnail) ?? null,
        user: user ?? listing.user,
        category: (await getCategoryById(listing.category)) ?? listing.category,
    };
};

const updateListing = async (
    id: number,
    listingData: Partial<Omit<PostableListing, "images"> & { images: string }>
): Promise<ListingWithId | null> => {
    const data = listingData as {
        [key: string]: any;
    };
    const listing = (await getListing(id)) as {
        [key: string]: any;
    } | null;
    if (!listing) return null;
    const updatedData: {
        [key: string]: any;
    } = {};
    Object.keys(listingData).forEach(key => {
        if (data[key] !== listing[key]) updatedData[key] = data[key];
    });
    const success = await Database.update("listings", id, updatedData);
    if (!success) return null;
    return await getListing(id);
};

const deleteListing = async (id: number): Promise<DeleteListingResponse | null> => {
    await Database.query("DELETE FROM images WHERE listing = ?", [id]);
    const deleted = await Database.delete("listings", id);
    return deleted && deleted > 0 ? { id: Number(id) } : null;
};

const deleteUserListings = async (userId: number): Promise<void> => {
    const listings = await getUserListings(userId);
    listings.forEach(async listing => {
        await deleteListing(listing.id);
    });
};

export {
    getAllListings,
    getUserListings,
    addListing,
    getListing,
    updateListing,
    deleteListing,
    deleteUserListings,
};

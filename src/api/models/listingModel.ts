import { DeleteListingResponse, ListingWithId, PostableListing } from "mpp-api-types";
import Database from "../../core/database/Database";
import { DBListing } from "../../types/DBTypes";
import { getUser } from "./userModel";

const getAllListings = async (): Promise<ListingWithId[]> => {
    const listings = (await Database.get("listings")) as null | DBListing[];
    if (!listings) return [];
    const listingsWithUser = Promise.all(
        listings.map(async listing => {
            const user = await getUser(listing.user);
            return {
                ...listing,
                user: user ?? listing.user,
            };
        })
    );
    return listingsWithUser;
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
            };
        })
    );
    return listingsWithUser;
};

const addListing = async (
    listingData: PostableListing,
    userId: number
): Promise<ListingWithId | null> => {
    const id = await Database.insert("listings", { ...listingData, user: userId });
    if (!id) return null;
    const listings = (await Database.get("listings", id)) as DBListing[] | null;
    if (!listings) return null;
    const listing = listings[0];
    const user = await getUser(listing.user);
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
    return {
        ...listing,
        user: user ?? listing.user,
    };
};

const updateListing = async (
    id: number,
    listingData: Partial<PostableListing>
): Promise<ListingWithId | null> => {
    const success = await Database.update("listings", id, listingData);
    if (!success) return null;
    return await getListing(id);
};

const deleteListing = async (id: number): Promise<DeleteListingResponse | null> => {
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

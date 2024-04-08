import { Response, NextFunction } from "express";
import Request from "../../types/Request";
import { validationResult } from "express-validator";
import ApiError from "../../core/classes/ApiError";
import {
    addListing,
    getAllListings,
    getListing,
    getUserListings,
    deleteListing as deleteListingById,
    updateListing,
} from "../models/listingModel";
import { PostListingsRequest, PutListingRequest } from "mpp-api-types";

const getListings = async (req: Request, res: Response, next: NextFunction) => {
    const searchQuery = req.query.query as string | undefined;
    const category = req.query.category as string | undefined;
    const listings = await getAllListings({ category: category ? +category : undefined });
    if (searchQuery) {
        const searchResults = listings.filter(listing =>
            listing.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return res.json(searchResults);
    }
    res.json(listings);
};

const getUsersListings = async (req: Request, res: Response, next: NextFunction) => {
    const listings = await getUserListings(+req.params.id);
    res.json(listings);
};

const postListing = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return next(new ApiError(401, "Unauthorized"));
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(new ApiError(400, errors.array()[0].msg));
    if (!req.files) return next(new ApiError(400, "No images uploaded"));

    const body = req.body as PostListingsRequest;
    const listing = await addListing(
        {
            ...body,
            images: req.files instanceof Array ? req.files.map(file => file.filename) : [],
        },
        +req.user.id
    );

    res.status(201).json(listing);
};

const getListingById = async (req: Request, res: Response, next: NextFunction) => {
    const listing = await getListing(+req.params.id);
    if (!listing) return next(new ApiError(404, "Listing not found"));

    res.json(listing);
};

const putListing = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return next(new ApiError(401, "Unauthorized"));
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(new ApiError(400, errors.array()[0].msg));
    const listingData = await getListing(+req.params.id);
    if (!listingData) return next(new ApiError(404, "Listing not found"));
    if (
        !req.user.admin &&
        req.user.id !==
            (typeof listingData.user === "number" ? listingData.user : listingData.user.id)
    )
        return next(new ApiError(403, "Forbidden"));

    const body = req.body as PutListingRequest & { images?: string };
    const listing = await updateListing(+req.params.id, {
        ...body,
    });

    res.json(listing);
};

const deleteListing = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return next(new ApiError(401, "Unauthorized"));
    const id = await deleteListingById(+req.params.id);

    res.json({ id });
};

export { getListings, getUsersListings, postListing, getListingById, putListing, deleteListing };

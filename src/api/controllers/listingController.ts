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
    const sort = req.query.sort as string | undefined;
    const range = (req.query.range as string | undefined)?.split("-").map(Number);
    const start = range && range[1] ? range[0] : 0;
    const end = range && range[1] ? range[1] : range ? range[0] : 25;

    const category = req.query.category as string | undefined;
    const listings = await getAllListings({ start, end }, sort, {
        category: category ? +category : undefined,
        query: searchQuery,
    });
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
    const id = await deleteListingById(+req.params.id);

    res.json({ id });
};

export { getListings, getUsersListings, postListing, getListingById, putListing, deleteListing };

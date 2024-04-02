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
import { PostListingsRequest } from "mpp-api-types";

const getListings = async (req: Request, res: Response, next: NextFunction) => {
    const listings = await getAllListings();
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

    const body = req.body as PostListingsRequest;
    const listing = await addListing(body, +req.user.id);

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
    if (!req.user) return next(new ApiError(401, "Unauthorized"));
    if (!req.user.admin && req.user.id !== +req.params.id)
        return next(new ApiError(403, "Forbidden"));

    const body = req.body as PostListingsRequest;
    const listing = await updateListing(+req.params.id, body);

    res.json(listing);
};

const deleteListing = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return next(new ApiError(401, "Unauthorized"));
    const id = await deleteListingById(+req.params.id);

    res.json({ id });
};

export { getListings, getUsersListings, postListing, getListingById, putListing, deleteListing };

import { Response, NextFunction } from "express";
import Request from "../../types/Request";
import { getAllListings, getUserListings } from "../models/listingModel";
import {
    GetListingStatisticResponse,
    GetUserListingStatisticResponse,
    GetUserStatisticResponse,
} from "mpp-api-types";
import { getMessagesByListingId } from "../models/messageModel";
import { getAllUsers } from "../models/userModel";
import ApiError from "../../core/classes/ApiError";

const getListingStatistics = async (req: Request, res: Response, next: NextFunction) => {
    const listings = await getAllListings();
    const totalMessages = (
        await Promise.all(listings.map(listing => getMessagesByListingId(listing.id.toString())))
    ).reduce((acc, messages) => acc + messages.length, 0);
    const json: GetListingStatisticResponse = {
        listings: listings.length,
        buy: listings.filter(listing => listing.type === "buy").length,
        sell: listings.filter(listing => listing.type === "sell").length,
        messages: totalMessages,
    };
    res.json(json);
};

const getUserStatistics = async (req: Request, res: Response, next: NextFunction) => {
    const users = await getAllUsers();
    const admins = users.filter(user => user.admin).length;
    const json: GetUserStatisticResponse = {
        users: users.length,
        admins,
    };
    res.json(json);
};

const getUserListingStatistics = async (req: Request, res: Response, next: NextFunction) => {
    const listings = await getUserListings(+req.params.id);
    if (!listings || !listings.length) return next(new ApiError(404, "No listings found"));
    const messages = await Promise.all(
        listings.map(listing => getMessagesByListingId(listing.id.toString()))
    );
    const totalMessages = messages.reduce((acc, messages) => acc + messages.length, 0);
    const ownMessages = messages.reduce(
        (acc, messages, i) =>
            acc + messages.filter(message => message.user === listings[i].user).length,
        0
    );
    const json: GetUserListingStatisticResponse = {
        listings: listings.length,
        buy: listings.filter(listing => listing.type === "buy").length,
        sell: listings.filter(listing => listing.type === "sell").length,
        messages: totalMessages,
        ownMessages,
    };
    res.json(json);
};

export { getListingStatistics, getUserStatistics, getUserListingStatistics };

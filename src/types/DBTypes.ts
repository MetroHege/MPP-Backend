import { Listing, User } from "mpp-api-types";

export interface DBUser extends Required<User> {
    id: number;
    password: string;
}

export interface DBListing extends Listing {
    id: number;
    user: number;
    quality: number;
    images: string;
}

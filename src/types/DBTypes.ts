import { Category, Listing, User } from "mpp-api-types";

export interface DBUser extends Required<Omit<User, "admin">> {
    id: number;
    password: string;
    admin: 0 | 1 | boolean;
}

export interface DBListing extends Listing {
    id: number;
    user: number;
    category: number;
    quality: number;
    images: string;
}

export interface DBCategory extends Category {
    id: number;
}

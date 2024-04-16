import { Category, Image, Listing, Message, User } from "mpp-api-types";

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

export interface DBImage extends Image {
    id: number;
}

export interface DBMessage extends Message {
    id: number;
    user: number;
}

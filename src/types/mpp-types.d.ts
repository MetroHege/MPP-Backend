// Version 1.0.1

type WithId<T> = T & { id: number };
type WithPassword<T> = T & { password: string };

declare module "mpp-api-types" {
    export interface User {
        username: string;
        firstName?: string;
        lastName?: string;
        phone: string | null;
        email: string;
        city: string;
        admin: boolean;
    }

    export type UserWithId = UserWithId;

    export enum Quality {
        New = 5,
        LikeNew = 4,
        Good = 3,
        Fair = 2,
        Poor = 1,
    }

    export interface Image {
        listing: number;
        url: string;
    }

    export interface Listing {
        user: User | number;
        type: "buy" | "sell";
        category: string;
        quality: Quality;
        price: number;
        time: Date;
        title: string;
        description: string;
        thumbnail: string | null;
        images: Image[] | string;
    }

    // POST auth/login
    export type PostLoginRequest = {
        username?: string;
        email?: string;
        password: string;
    };
    export type PostLoginResponse = {
        token: string;
        user: UserWithId;
    };

    // GET users
    export type GetUsersResponse = UserWithId[];

    // POST users
    export type PostUsersRequest = WithPassword<User>;
    export type PostUsersResponse = UserWithId;

    // GET users/me
    export type GetMeResponse = UserWithId;

    // PUT users/me
    export type PutMeRequest = Partial<WithPassword<User>>;
    export type PutMeResponse = UserWithId;

    // DELETE users/me
    export type DeleteMeResponse = { id: number };

    // GET users/:id
    export type GetUserResponse = UserWithId;

    // PUT users/:id
    export type PutUserRequest = Partial<WithPassword<User>>;
    export type PutUserResponse = UserWithId;

    // DELETE users/:id
    export type DeleteUserResponse = { id: number };

    // GET listings
    export type GetListingsResponse = WithId<Listing>[];

    // POST listings
    export type PostListingsRequest = Listing;
    export type PostListingsResponse = WithId<Listing>;

    // GET listings/:id
    export type GetListingResponse = WithId<Listing>;

    // PUT listings/:id
    export type PutListingRequest = Partial<Listing>;
    export type PutListingResponse = WithId<Listing>;

    // DELETE listings/:id
    export type DeleteListingResponse = WithId<Listing>;
}

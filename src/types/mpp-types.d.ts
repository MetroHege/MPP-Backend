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
    }

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
        images: Image[];
    }

    // POST auth/login
    export type postLoginRequest = {
        username?: string;
        email?: string;
        password: string;
    };
    export type postLoginResponse = {
        token: string;
        user: WithId<User>;
    };

    // GET users
    export type GetUsersResponse = WithId<User>[];

    // POST users
    export type PostUsersRequest = WithPassword<User>;
    export type PostUsersResponse = WithId<User>;

    // GET users/me
    export type GetMeResponse = WithId<User>;

    // PUT users/me
    export type PutMeRequest = Partial<WithPassword<User>>;
    export type PutMeResponse = WithId<User>;

    // DELETE users/me
    export type DeleteMeResponse = WithId<User>;

    // GET users/:id
    export type GetUserResponse = WithId<User>;

    // PUT users/:id
    export type PutUserRequest = Partial<WithPassword<User>>;
    export type PutUserResponse = WithId<User>;

    // DELETE users/:id
    export type DeleteUserResponse = WithId<User>;

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

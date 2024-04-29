// Version 1.5.1

type WithId<T> = T & { id: number };
type WithPassword<T> = T & { password: string };

declare module "mpp-api-types" {
    export interface Error {
        status: number;
        message: string;
    }

    export interface User {
        username: string;
        firstName?: string;
        lastName?: string;
        phone: string | null;
        email: string;
        city: string;
        admin: boolean;
    }

    export type UserWithId = WithId<User>;

    export type PartialUser = Pick<UserWithId, "id" | "username" | "city" | "admin" | "email">;

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
        thumbnail: boolean;
    }

    interface Category {
        title: string;
    }

    export type CategoryWithId = WithId<Category>;

    export interface Listing {
        user: PartialUser | number;
        type: "buy" | "sell";
        category: CategoryWithId | number;
        quality: Quality;
        price: number;
        time: Date;
        title: string;
        description: string;
        thumbnail: Image | null;
        images: Image[];
    }

    export type ListingWithId = WithId<Listing>;

    interface PostableListing extends Omit<Listing, "user" | "time" | "thumbnail"> {
        category: number;
        images: string[];
    }

    export interface Message {
        listing: number;
        user: PartialUser | number;
        content: string;
        time: Date;
    }

    export type MessageWithId = WithId<Message>;

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
    export type GetUsersResponse = PartialUser[];

    // POST users
    export type PostUsersRequest = WithPassword<Required<Omit<User, "admin">>>;
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

    // GET listings & GET users/:id/listings
    export type GetListingsResponse = ListingWithId[];

    // POST listings
    export type PostListingsRequest = PostableListing;
    export type PostListingsResponse = ListingWithId;

    // GET listings/:id
    export type GetListingResponse = ListingWithId;

    // PUT listings/:id
    export type PutListingRequest = Partial<PostableListing>;
    export type PutListingResponse = ListingWithId;

    // DELETE listings/:id
    export type DeleteListingResponse = { id: number };

    // GET listings/:id/messages
    export type GetMessagesResponse = MessageWithId[];

    // POST listings/:id/messages
    export type PostMessagesRequest = { content: string };
    export type PostMessagesResponse = Omit<MessageWithId, "time">;

    // DELETE messages/:id
    export type DeleteMessageResponse = { id: number };

    // GET categories
    export type GetCategoriesResponse = WithId<Category>[];

    // POST categories
    export type PostCategoryRequest = Category;
    export type PostCategoryResponse = WithId<Category>;

    // DELETE categories/:id
    export type DeleteCategoryResponse = { id: number };

    // get statistics/listings
    export type GetListingStatisticResponse = {
        listings: number;
        buy: number;
        sell: number;
        messages: number;
    };

    // get statistics/users
    export type GetUserStatisticResponse = {
        users: number;
        admins: number;
    };

    // get statistics/users/:id/listings
    export type GetUserListingStatisticResponse = {
        listings: number;
        buy: number;
        sell: number;
        messages: number;
        ownMessages: number;
    };
}

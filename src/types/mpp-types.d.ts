// Version 1.3.1

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

    export type UserWithId = WithId<User>;

    export type PartialUser = Pick<UserWithId, "id" | "username" | "city" | "admin">;

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
        images: Image[] | string;
    }

    export type ListingWithId = WithId<Listing>;

    interface PostableListing extends Omit<Listing, "user" | "time" | "thumbnail"> {
        category: number;
        images: string[];
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

    // GET categories
    export type GetCategoriesResponse = WithId<Category>[];

    // POST category
    export type PostCategoryRequest = Category;
    export type PostCategoryResponse = WithId<Category>;

    // DELETE category
    export type DeleteCategoryResponse = { id: number };
}

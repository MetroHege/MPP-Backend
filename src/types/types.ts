import { DBListing } from "./DBTypes";

export type ListingWithMatchPercentage = DBListing & { matchPercentage: number };

import { describe, expect, test } from "@jest/globals";
import searchListings from "../src/core/functions/search";
import { Listing } from "mpp-api-types";

const listing: Listing = {
    title: "Test Listing",
    description: "This is a test listing",
    category: {
        id: 1,
        title: "Test Category",
    },
    type: "buy",
    price: 100,
    user: 1,
    quality: 1,
    time: new Date(),
    thumbnail: {
        url: "",
        listing: 1,
        thumbnail: true,
    },
    images: [],
};

describe("search function", () => {
    test("searches for lisding", () => {
        expect(searchListings(listing, "lisding")).toBe(true);
    });

    test("searches for test", () => {
        expect(searchListings(listing, "test")).toBe(true);
    });

    test("searches for category", () => {
        expect(searchListings(listing, "category")).toBe(true);
    });

    test("searches xxx", () => {
        expect(searchListings(listing, "xxx")).toBe(false);
    });
});

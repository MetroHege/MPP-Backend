import { Listing } from "mpp-api-types";

export default function searchListings(listing: Listing, query: string): number {
    let listingMatchPercentage: number = 0;
    const title = toCleanString(listing.title);
    const description = toCleanString(listing.description);
    const category = toCleanString(
        typeof listing.category === "number" ? listing.category.toString() : listing.category.title
    );
    if (title === query) listingMatchPercentage += 1;
    if (title.includes(query)) listingMatchPercentage += 0.5;
    if (description.includes(query)) listingMatchPercentage += 0.3;
    if (category.includes(query)) listingMatchPercentage += 0.2;

    listingMatchPercentage += calculateMatchPercentage(title, query) * 0.5;
    listingMatchPercentage += calculateMatchPercentage(description, query) * 0.3;
    listingMatchPercentage += calculateMatchPercentage(category, query) * 0.2;

    return listingMatchPercentage;
}

function toCleanString(s: string): string {
    return s
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/ +(?= )/g, "");
}

function calculateMatchPercentage(a: string, b: string): number {
    const distance = levenshteinDistance(a, b);
    return 1 - distance / Math.max(a.length, b.length);
}

function levenshteinDistance(a: string, b: string) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matrix = [];
    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }

    return matrix[b.length][a.length];
}

import { Listing } from "mpp-api-types";

export default function searchListings(listing: Listing, query: string): boolean {
    const title = toCleanString(listing.title);
    const description = toCleanString(listing.description);
    const category = toCleanString(
        typeof listing.category === "number" ? listing.category.toString() : listing.category.title
    );

    const searchWords = toCleanString(query).split(" ");

    const isMatch = searchWords.some(
        word =>
            title.includes(word) ||
            description.includes(word) ||
            category.includes(word) ||
            title.split(" ").some(titleWord => levenshteinDistance(word, titleWord) <= 2) ||
            description.split(" ").some(descWord => levenshteinDistance(word, descWord) <= 2) ||
            category.split(" ").some(catWord => levenshteinDistance(word, catWord) <= 2)
    );

    return isMatch;
}

function toCleanString(s: string): string {
    return s
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/ +(?= )/g, "");
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

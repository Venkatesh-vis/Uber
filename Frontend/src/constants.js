export const API_BASE_URL =
    import.meta.env.VITE_BASE_URL || "deployed link here";

export const GOOGLE_MAPS_API_KEY =
    import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export const REQUEST_METHOD = {
    POST: "POST",
    GET: "GET",
    DELETE: "DELETE",
    PUT: "PUT"
};
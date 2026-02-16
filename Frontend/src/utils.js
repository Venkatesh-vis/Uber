// utils.js

// Get current city using reverse geocoding
export const getCurrentCity = async (lat, lon) => {
    const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?` +
        new URLSearchParams({
            lat,
            lon,
            format: "json",
            addressdetails: 1,
        })
    );

    const data = await res.json();

    return (
        data.address.city ||
        data.address.town ||
        data.address.village ||
        null
    );
};


// Search locations restricted to current city
export const searchLocations = async (query, city) => {
    if (!query || !city) return [];

    const res = await fetch(
        `https://nominatim.openstreetmap.org/search?` +
        new URLSearchParams({
            q: `${query}, ${city}`,
            format: "json",
            addressdetails: 1,
            limit: 5,
        }),
        {
            headers: {
                "Accept-Language": "en",
            },
        }
    );

    const data = await res.json();

    return data.map(place => ({
        id: place.place_id,
        name: place.display_name,
        coordinates: [
            parseFloat(place.lon), // [lon, lat]
            parseFloat(place.lat),
        ],
    }));
};

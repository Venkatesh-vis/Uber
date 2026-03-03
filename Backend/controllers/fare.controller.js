/**
 * Calculates the great-circle distance between two geographic coordinates
 * using the Haversine formula.
 *
 * @param {number} lat1 - Latitude of first point (in degrees)
 * @param {number} lon1 - Longitude of first point (in degrees)
 * @param {number} lat2 - Latitude of second point (in degrees)
 * @param {number} lon2 - Longitude of second point (in degrees)
 *
 * @returns {number} Distance between the two points in kilometers
 *
 * Note:
 * - This calculates straight-line (as-the-crow-flies) distance.
 * - It does NOT account for roads, traffic, or real driving routes.
 */
const calculateDistanceKm = (lat1, lon1, lat2, lon2) => {

    // Average radius of Earth in kilometers
    const R = 6371;

    // Convert degrees to radians because
    // JavaScript trigonometric functions use radians
    const toRad = (val) => (val * Math.PI) / 180;

    // Difference in latitude and longitude (converted to radians)
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    // Apply Haversine formula
    // 'a' represents the square of half the chord length between the points
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;

    // 'c' is the angular distance in radians
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Distance = Earth's radius × angular distance
    return R * c;
};

const estimateDurationMinutes = (distanceKm) => {
    const avgSpeedKmPerHour = 35;
    return (distanceKm / avgSpeedKmPerHour) * 60;
};

const getDynamicDiscount = (vehicleType, distance) => {
    let discount = 10;

    if (vehicleType === "motorcycle") discount += 10;
    if (distance > 5) discount += 5;
    if (distance > 10) discount += 5;

    return Math.min(discount, 40);
};

const fare = async (req, res) => {
    try {
        const { pickup, drop } = req.body;

        if (!pickup || !drop) {
            return res.status(400).json({
                message: "Pickup and drop locations are required",
            });
        }

        if (
            pickup.lat == null ||
            pickup.lng == null ||
            drop.lat == null ||
            drop.lng == null
        ) {
            return res.status(400).json({
                message: "Invalid pickup or drop coordinates",
            });
        }

        // Calculate distance
        const distance = calculateDistanceKm(pickup.lat, pickup.lng, drop.lat, drop.lng);

        // Estimate duration
        const duration = estimateDurationMinutes(distance);

        // Pricing structure
        const pricing = {
            motorcycle: { base: 30, perKm: 7, perMin: 1 },
            auto: { base: 50, perKm: 10, perMin: 2 },
            car: { base: 80, perKm: 15, perMin: 3 },
        };

        // Surge multiplier
        const surgeMultiplier = 1.15;

        const rideOptions = Object.keys(pricing).map((type) => {
            const rawFare =
                pricing[type].base +
                distance * pricing[type].perKm +
                duration * pricing[type].perMin;

            const originalFare = (rawFare * surgeMultiplier).toFixed(2);

            const discountPercent = getDynamicDiscount(type, distance).toFixed(2);

            const discountAmount = ((originalFare * discountPercent) / 100).toFixed(2)

            const finalFare = (originalFare - discountAmount).toFixed(2);

            return {
                vehicleType: type,
                distance: distance.toFixed(2) + " km",
                duration: Math.round(duration) + " mins",
                originalFare,
                discountPercent,
                discountAmount,
                finalFare,
            };
        });

        res.json({
            surgeMultiplier: surgeMultiplier.toFixed(2),
            rideOptions,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = { fare };
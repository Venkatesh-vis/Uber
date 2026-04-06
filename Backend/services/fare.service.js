const {calculateDistanceKm, estimateDurationMinutes, getDynamicDiscount, pricing, surgeMultiplier} = require("./utils");

const calculateFinalFare = (pickup, drop, vehicleType) => {

    const distance = calculateDistanceKm(
        pickup.lat,
        pickup.lng,
        drop.lat,
        drop.lng
    );

    const duration = estimateDurationMinutes(distance);

    const config = pricing[vehicleType];

    if (!config) throw new Error("Invalid vehicle type");

    const rawFare =
        config.base +
        distance * config.perKm +
        duration * config.perMin;

    const originalFare = rawFare * surgeMultiplier;

    const discountPercent = getDynamicDiscount(vehicleType, distance);

    const discountAmount = (originalFare * discountPercent) / 100;

    const finalFare = originalFare - discountAmount;

    return {
        distance,
        duration,
        originalFare: Number(originalFare.toFixed(2)),
        discountPercent,
        discountAmount: Number(discountAmount.toFixed(2)),
        finalFare: Number(finalFare.toFixed(2)),
    };
};

module.exports = { calculateFinalFare };
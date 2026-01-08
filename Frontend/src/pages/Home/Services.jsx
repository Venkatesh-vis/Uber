import React from "react";
import { motion, useAnimation } from "framer-motion";
import bike from "../../assets/bike_bg.jpg";
import auto from "../../assets/auto_bg.jpg";
import car from "../../assets/Uber_bg.jpg";

const Services = () => {
    const controls = useAnimation();

    return (
        <motion.section
            id="services"
            initial={{ y: 80, opacity: 0 }}
            animate={controls}
            onViewportEnter={() =>
                controls.start({ y: 0, opacity: 1 })
            }
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ amount: 0.3 }}
            className="bg-white py-20 px-6"
        >
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-16 text-neutral-900">
                Our Services
            </h2>

            <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-3">
                <div className="relative cursor-pointer h-80 rounded-2xl overflow-hidden shadow-lg group">
                    <img
                        src={car}
                        alt="Rides"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 p-6 text-white">
                        <h3 className="text-lg font-semibold mb-1">Rides</h3>
                        <p className="text-sm opacity-90">
                            Book safe and affordable rides anytime, anywhere.
                        </p>
                    </div>
                </div>

                <div className="relative cursor-pointer h-80 rounded-2xl overflow-hidden shadow-lg group">
                    <img
                        src={auto}
                        alt="Delivery"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 p-6 text-white">
                        <h3 className="text-lg font-semibold mb-1">Delivery</h3>
                        <p className="text-sm opacity-90">
                            Get food, groceries, and essentials delivered fast.
                        </p>
                    </div>
                </div>

                <div className="relative cursor-pointer h-80 rounded-2xl overflow-hidden shadow-lg group">
                    <img
                        src={bike}
                        alt="Rentals"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 p-6 text-white">
                        <h3 className="text-lg font-semibold mb-1">Rentals</h3>
                        <p className="text-sm opacity-90">
                            Flexible vehicle rentals for longer journeys.
                        </p>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default Services;

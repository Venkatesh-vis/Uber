import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import car from "../../assets/Uber_bg.jpg";
import auto from "../../assets/auto_bg.jpg";
import bike from "../../assets/bike_bg.jpg";

const servicesData = [
    {
        id: 1,
        title: "Rides",
        description: "Book safe and affordable rides anytime, anywhere.",
        image: car,
        animation: "left",
    },
    {
        id: 2,
        title: "Delivery",
        description: "Get food, groceries, and essentials delivered fast.",
        image: auto,
        animation: "bottom",
    },
    {
        id: 3,
        title: "Rentals",
        description: "Flexible vehicle rentals for longer journeys.",
        image: bike,
        animation: "right",
    },
];

const animationMap = {
    left: { x: -80 },
    right: { x: 80 },
    bottom: { y: 80 },
};

const Services = () => {
    const reduceMotion = useReducedMotion();
    const isMobile = window.innerWidth < 640;

    const ServiceCard = ({ title, description, image, animation }) => {
        const initialMotion =
            reduceMotion || isMobile
                ? { y: 40 }
                : animationMap[animation];

        return (
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-lg">
                <motion.div
                    initial={initialMotion}
                    whileInView={{ x: 0, y: 0 }}
                    viewport={{ once: false, amount: 0.4 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="h-full w-full transform-gpu will-change-transform"
                >
                    <div className="relative cursor-pointer h-full rounded-2xl overflow-hidden group">
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                        <div className="absolute bottom-0 p-6 text-white">
                            <h3 className="text-lg font-semibold mb-1">{title}</h3>
                            <p className="text-sm opacity-90">{description}</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        );
    };

    return (
        <section id="services" className="bg-white py-20 px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-16 text-neutral-900">
                Our Services
            </h2>

            <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-3">
                {servicesData.map(service => (
                    <ServiceCard key={service.id} {...service} />
                ))}
            </div>
        </section>
    );
};

export default Services;

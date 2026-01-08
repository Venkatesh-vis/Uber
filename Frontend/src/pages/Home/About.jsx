import React from "react";
import { motion, useAnimation } from "framer-motion";

const AboutSection = () => {
    const controls = useAnimation();

    return (
        <section
            id="about"
            className="w-full bg-neutral-50 py-15 px-6 sm:px-20"
        >
            <motion.div
                initial={{ y: 60, opacity: 0 }}
                animate={controls}
                onViewportEnter={() =>
                    controls.start({
                        y: 0,
                        opacity: 1,
                        transition: { duration: 0.7, ease: "easeOut" },
                    })
                }
                viewport={{ amount: 0.3 }}
                className="max-w-3xl mx-auto text-center"
            >
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-neutral-900">
                    About Uber
                </h2>

                <p className="text-sm sm:text-base leading-relaxed text-neutral-700">
                    Uber makes everyday travel simple and reliable. Whether it’s your daily commute,
                    a quick errand, or a late-night ride home, Uber helps you move with confidence.
                    With real-time tracking, transparent pricing, and flexible ride options, every
                    journey is designed around your needs. It’s a smarter, faster way to get around
                    your city—on your schedule.
                </p>
            </motion.div>
        </section>
    );
};

export default AboutSection;

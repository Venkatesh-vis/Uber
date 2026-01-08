import React, { useState } from "react";

const Navbar = () => {
    const [open, setOpen] = useState(false);

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
        setOpen(false);
    };

    return (
        <nav className="w-full absolute top-0 left-0 z-30">
            <div className="flex items-center justify-between px-6 py-4">
                <div className="text-xl sm:text-2xl md:text-[2vw] font-bold text-black z-40">
                    Uber
                </div>

                <ul className="hidden sm:flex gap-6 text-lg font-medium text-black">
                    <li
                        className="cursor-pointer hover:opacity-70"
                        onClick={() => scrollToSection("about")}
                    >
                        About
                    </li>
                    <li
                        className="cursor-pointer hover:opacity-70"
                        onClick={() => scrollToSection("services")}
                    >
                        Services
                    </li>
                    <li
                        className="cursor-pointer hover:opacity-70"
                        onClick={() => scrollToSection("contact")}
                    >
                        Contact Us
                    </li>
                </ul>

                <button
                    className="sm:hidden relative w-8 h-8 flex items-center justify-center z-40"
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle menu"
                >
                    <span
                        className={`absolute w-6 h-0.5 bg-black transition-transform duration-300 ${
                            open ? "rotate-45" : "-translate-y-2"
                        }`}
                    />
                    <span
                        className={`absolute w-6 h-0.5 bg-black transition-opacity duration-300 ${
                            open ? "opacity-0" : "opacity-100"
                        }`}
                    />
                    <span
                        className={`absolute w-6 h-0.5 bg-black transition-transform duration-300 ${
                            open ? "-rotate-45" : "translate-y-2"
                        }`}
                    />
                </button>
            </div>

            {open && (
                <div
                    className="
                        fixed inset-0 z-20
                        bg-black/60 backdrop-blur-md
                        flex flex-col items-center justify-center
                        gap-8
                        text-white text-lg font-medium
                    "
                >
                    <span onClick={() => scrollToSection("about")}>About</span>
                    <span onClick={() => scrollToSection("services")}>Services</span>
                    <span onClick={() => scrollToSection("contact")}>Contact Us</span>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

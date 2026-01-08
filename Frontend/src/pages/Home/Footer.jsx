import React from "react";
import {FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhoneAlt, FaMapMarkerAlt,} from "react-icons/fa";

const Footer = () => {
    return (
        <footer id="contact" className="w-full bg-black text-white px-6 sm:px-20 py-10">
            <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-3 text-sm">
                <div>
                    <h4 className="font-semibold mb-3">Address</h4>
                    <p className="flex items-start gap-2 text-neutral-300">
                        <FaMapMarkerAlt className="mt-1" />
                        Uber Technologies Inc.<br />
                        1515 3rd Street,<br />
                        San Francisco, CA 94158
                    </p>
                </div>
                <div>
                    <h4 className="font-semibold mb-3">Contact</h4>
                    <p className="flex items-center gap-2 text-neutral-300">
                        <FaPhoneAlt />
                        +1 (800) 593-7069
                    </p>
                </div>
                <div>
                    <h4 className="font-semibold mb-3">Follow Us</h4>
                    <div className="flex gap-4 text-lg">
                        <a href="#" aria-label="Facebook" className="hover:text-gray-400">
                            <FaFacebookF />
                        </a>
                        <a href="#" aria-label="Twitter" className="hover:text-gray-400">
                            <FaTwitter />
                        </a>
                        <a href="#" aria-label="Instagram" className="hover:text-gray-400">
                            <FaInstagram />
                        </a>
                        <a href="#" aria-label="LinkedIn" className="hover:text-gray-400">
                            <FaLinkedinIn />
                        </a>
                    </div>
                </div>
            </div>
            <div className="mt-8 border-t border-white/10 pt-4 text-center text-xs text-neutral-400">
                © {new Date().getFullYear()} Uber. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;

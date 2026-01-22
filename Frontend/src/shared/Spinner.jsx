import React from "react";

const Spinner = () => {
    return (
        <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
            <div
                className="
                    h-12 w-12
                    sm:h-14 sm:w-14
                    border-4 border-neutral-300
                    border-t-black
                    rounded-full
                    animate-spin
                "
            />
        </div>
    );
};

export default Spinner;

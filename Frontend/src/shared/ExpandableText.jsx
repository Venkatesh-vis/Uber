import { useState, useRef, useEffect } from "react";

const ExpandableText = ({ text }) => {
    const [expanded, setExpanded] = useState(false);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const textRef = useRef(null);

    useEffect(() => {
        if (textRef.current) {
            setIsOverflowing(
                textRef.current.scrollWidth > textRef.current.clientWidth
            );
        }
    }, [text]);

    return (
        <div className="text-right max-w-[60%]">
            <span
                ref={textRef}
                className={`font-medium text-gray-800 block ${
                    expanded ? "" : "truncate"
                }`}
            >
                {text}
            </span>

            {isOverflowing && (
                <button
                    onClick={() => setExpanded((prev) => !prev)}
                    className="text-xs cursor-pointer text-blue-500 mt-1 hover:underline"
                >
                    {expanded ? "Less" : "More"}
                </button>
            )}
        </div>
    );
};

export default ExpandableText;
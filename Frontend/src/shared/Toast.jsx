import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SHARED_ACTION_TYPES } from "../reducers/sharedReducer.js";

const TOAST_DURATION = 4000;
const EXIT_ANIMATION = 300;

const Toast = () => {
    const dispatch = useDispatch();
    const message = useSelector(state => state?.shared?.message);
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (!message) return;

        setShow(true);

        const hideTimer = setTimeout(() => {
            setShow(false);
        }, TOAST_DURATION - EXIT_ANIMATION);

        const clearTimer = setTimeout(() => {
            dispatch({
                type: SHARED_ACTION_TYPES.SET_MESSAGE,
                payload: null,
            });
        }, TOAST_DURATION);

        return () => {
            clearTimeout(hideTimer);
            clearTimeout(clearTimer);
        };
    }, [message]);

    if (!message) return null;

    return (
        <div className="fixed bottom-6 left-1/2 z-[9999] -translate-x-1/2 px-4 pointer-events-none">
            <div
                className={`
          inline-flex items-center justify-center
          bg-black text-white
          px-5 py-3
          rounded-full
          text-sm font-medium
          shadow-lg
          transition-all duration-300 ease-in-out
          ${show
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-3"}
        `}
            >
        <span className="whitespace-pre-wrap break-words max-w-[90vw] text-center">
          {message}
        </span>
            </div>
        </div>
    );
};

export default Toast;

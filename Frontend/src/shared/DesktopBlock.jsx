const DesktopBlock = () => {
    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center space-y-4">
                <h1 className="text-2xl font-semibold">
                    Use Mobile Device
                </h1>
                <p className="text-gray-600">
                    Captain dashboard is available only on mobile.
                    Please open this on your phone to accept rides.
                </p>
            </div>
        </div>
    );
};

export default DesktopBlock;
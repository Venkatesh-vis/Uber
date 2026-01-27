const PaymentBar = ({ ride }) => {
    return (
        <div className="sticky bottom-4 px-4">
            <div className="bg-white rounded-xl p-4 shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <button className="flex cursor-pointer items-center justify-center gap-2 text-sm font-medium w-full md:w-auto whitespace-nowrap">
                        <span className="text-xl">+</span>
                        Add payment method
                    </button>
                    <button className="bg-black cursor-pointer text-white px-6 py-3 rounded-lg font-medium w-full md:w-auto whitespace-nowrap">
                    Request {ride.name}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentBar;

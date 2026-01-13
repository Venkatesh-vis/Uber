import { useState } from "react";

const CaptainSignup = ({ onSwitch }) => {
    const [form, setForm] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        color: "",
        plate: "",
        capacity: "",
        vehicleType: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            fullname: {
                firstname: form.firstname,
                lastname: form.lastname,
            },
            email: form.email,
            password: form.password,
            vehicle: {
                color: form.color,
                plate: form.plate,
                capacity: Number(form.capacity),
                vehicleType: form.vehicleType,
            },
        };

        console.log("Captain signup payload:", payload);
    };

    return (
        <div className="w-full max-w-sm bg-white/30 backdrop-blur-lg p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-6">
                Become a Captain
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-3">
                    <input
                        name="firstname"
                        placeholder="First name"
                        value={form.firstname}
                        onChange={handleChange}
                        required
                        className="w-full p-3 bg-transparent outline-none border-b border-white/40"
                    />
                    <input
                        name="lastname"
                        placeholder="Last name"
                        value={form.lastname}
                        onChange={handleChange}
                        required
                        className="w-full p-3 bg-transparent outline-none border-b border-white/40"
                    />
                </div>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-transparent outline-none border-b border-white/40"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-transparent outline-none border-b border-white/40"
                />

                <input
                    name="vehicleType"
                    placeholder="Vehicle type (car / bike / auto)"
                    value={form.vehicleType}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-transparent outline-none border-b border-white/40"
                />

                <input
                    name="color"
                    placeholder="Vehicle color"
                    value={form.color}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-transparent outline-none border-b border-white/40"
                />

                <input
                    name="plate"
                    placeholder="Vehicle plate number"
                    value={form.plate}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-transparent outline-none border-b border-white/40"
                />

                <input
                    type="number"
                    name="capacity"
                    placeholder="Vehicle capacity"
                    value={form.capacity}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-transparent outline-none border-b border-white/40"
                />

                <button className="w-full py-3 cursor-pointer bg-black text-white rounded-lg">
                    Sign up
                </button>
            </form>

            <p className="text-sm mt-4 text-center">
                Already registered?{" "}
                <button
                    type="button"
                    onClick={onSwitch}
                    className="font-semibold cursor-pointer underline"
                >
                    Log in
                </button>
            </p>
        </div>
    );
};

export default CaptainSignup;

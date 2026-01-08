import { useState } from "react";

const UserSignupCard = () => {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Signup payload:", form);
    };

    return (
        <div className="w-full max-w-sm bg-white/30 backdrop-blur-lg p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-6">
                Create your Uber account
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* First Name */}
                <div className="relative">
                    <input
                        name="firstName"
                        placeholder="First name"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                        className="
                            w-full p-3 bg-transparent outline-none
                            border-b border-white/40
                            peer
                        "
                    />
                    <span
                        className="
                            absolute left-0 bottom-0 h-[2px] w-full
                            bg-black scale-x-0
                            peer-focus:scale-x-100
                            transition-transform duration-300 origin-left
                        "
                    />
                </div>

                {/* Last Name */}
                <div className="relative">
                    <input
                        name="lastName"
                        placeholder="Last name"
                        value={form.lastName}
                        onChange={handleChange}
                        required
                        className="
                            w-full p-3 bg-transparent outline-none
                            border-b border-white/40
                            peer
                        "
                    />
                    <span
                        className="
                            absolute left-0 bottom-0 h-[2px] w-full
                            bg-black scale-x-0
                            peer-focus:scale-x-100
                            transition-transform duration-300 origin-left
                        "
                    />
                </div>

                {/* Email */}
                <div className="relative">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="
                            w-full p-3 bg-transparent outline-none
                            border-b border-white/40
                            peer
                        "
                    />
                    <span
                        className="
                            absolute left-0 bottom-0 h-[2px] w-full
                            bg-black scale-x-0
                            peer-focus:scale-x-100
                            transition-transform duration-300 origin-left
                        "
                    />
                </div>

                {/* Password */}
                <div className="relative">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="
                            w-full p-3 bg-transparent outline-none
                            border-b border-white/40
                            peer
                        "
                    />
                    <span
                        className="
                            absolute left-0 bottom-0 h-[2px] w-full
                            bg-black scale-x-0
                            peer-focus:scale-x-100
                            transition-transform duration-300 origin-left
                        "
                    />
                </div>

                <button className="w-full py-3 bg-black text-white rounded-lg">
                    Sign up
                </button>
            </form>
        </div>
    );
};

export default UserSignupCard;

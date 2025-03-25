import React, { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Regex patterns
    const nameRegex = /^[A-Za-z ]{3,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let newErrors = {};

        // Validations :
        if (!nameRegex.test(formData.name)) newErrors.name = "Name must be at least 3 letters.";
        if (!emailRegex.test(formData.email)) newErrors.email = "Enter a valid email.";
        if (!passwordRegex.test(formData.password)) newErrors.password = "Password must be 8+ chars, 1 letter, 1 number, 1 special char.";
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match!";
        if (!phoneRegex.test(formData.phoneNumber)) newErrors.phoneNumber = "Enter a valid 10-digit phone number.";

        // Fetch users from localStorage
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        const existingUser = storedUsers.find(user => user.email === formData.email);

        if (existingUser) {
            newErrors.email = "User already exists...";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            if (existingUser) {
                // Auto login if user exists
                console.log("Login Successful!");
                console.log(`Email: ${existingUser.email}`);
                console.log(`Password: ${existingUser.password}`);
                alert("Login Successful!");
            } else {
                // Register new user
                const newUser = { ...formData };
                delete newUser.confirmPassword; // Remove confirm password before saving

                storedUsers.push(newUser);
                localStorage.setItem("users", JSON.stringify(storedUsers));

                console.log("Registration Successful!");
                console.log(`Email: ${formData.email}`);
                console.log(`Password: ${formData.password}`);

                setSuccessMessage("Successfully Registered!");
            }

            // Reset form
            setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                phoneNumber: "",
            });

            // Hide success message after 3 sec
            setTimeout(() => setSuccessMessage(""), 3000);
        }
    };

    return (
        <div className="container mt-5 py-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card shadow p-4">
                        <h3 className="text-center text-primary">Register</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mt-3">
                                <input type="text" className="form-control" placeholder="Full Name" name="name" value={formData.name} onChange={handleChange} />
                                {errors.name && <p className="text-danger small">{errors.name}</p>}
                            </div>
                            <div className="mt-3">
                                <input type="email" className="form-control" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
                                {errors.email && <p className="text-danger small">{errors.email}</p>}
                            </div>
                            <div className="mt-3 position-relative">
                                <input type={showPassword ? "text" : "password"} className="form-control" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
                                <span className="position-absolute top-50 end-0 translate-middle-y me-3" style={{ cursor: "pointer" }} onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <BsEyeSlash /> : <BsEye />}
                                </span>
                                {errors.password && <p className="text-danger small">{errors.password}</p>}
                            </div>
                            <div className="mt-3 position-relative">
                                <input type={showConfirmPassword ? "text" : "password"} className="form-control" placeholder="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                                <span className="position-absolute top-50 end-0 translate-middle-y me-3" style={{ cursor: "pointer" }} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    {showConfirmPassword ? <BsEyeSlash /> : <BsEye />}
                                </span>
                                {errors.confirmPassword && <p className="text-danger small">{errors.confirmPassword}</p>}
                            </div>
                            <div className="mt-3">
                                <input type="tel" className="form-control" placeholder="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                                {errors.phoneNumber && <p className="text-danger small">{errors.phoneNumber}</p>}
                            </div>
                            <div className="mt-4 text-center">
                                <button type="submit" className="btn btn-primary w-100">Register</button>
                            </div>
                            {successMessage && <p className="text-success text-center mt-3">{successMessage}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;

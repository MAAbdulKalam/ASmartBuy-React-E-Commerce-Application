import React, { useState } from "react";

const Login = () => {
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (!loginData.email || !loginData.password) {
            setError("All fields are required!");
            return;
        }
    
        // Get registered users from localStorage
        const registeredUsers = JSON.parse(localStorage.getItem("users")) || [];
        const user = registeredUsers.find((user) => user.email === loginData.email && user.password === loginData.password);
    
        if (!user) {
            setError("Invalid Email or Password!");
        } else {
            console.log("Login Successful!", user.email, user.password);
    
            // Clear only the logged-in user's session (if needed)
            localStorage.removeItem("users");
    
            alert("Login Successful!");
        }
    };
    

    return (
        <div className="container mt-5 py-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card shadow p-4">
                        <h3 className="text-center text-primary">Login</h3>
                        <form onSubmit={handleSubmit}>
                            <input type="email" className="form-control mt-3" placeholder="Email" name="email" value={loginData.email} onChange={handleChange} />
                            <input type="password" className="form-control mt-3" placeholder="Password" name="password" value={loginData.password} onChange={handleChange} />
                            <button type="submit" className="btn btn-primary w-100 mt-4">Login</button>
                            {error && <p className="text-danger text-center mt-3">{error}</p>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

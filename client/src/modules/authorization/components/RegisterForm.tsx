import React, { useState, ChangeEvent, FormEvent } from "react";
import "../assets/RegisterForm.css";
import { registerEndpoint } from "../../../constants/endpoints";
import axios from "axios";
import User from "../../../types/User";

const RegisterForm: React.FC = () => {
    const [formData, setFormData] = useState<User & { confirmPassword: string }>({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        profile_image: 0,
        confirmPassword: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            console.error("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post(registerEndpoint, formData);

            if( response.status === 200 ) {
                console.log("Registration successful", response.data);
                // Clear form data on successful registration
                setFormData({
                    firstname: "",
                    lastname: "",
                    username: "",
                    email: "",
                    password: "",
                    profile_image: 0,
                    confirmPassword: "",
                });
                alert("Success on Register!");
                window.location.replace( '/' )
            } else {
                alert( "Error!" );
            } 
        } catch (error) {
            console.error("Registration failed", error);
        }
    };

    return (
        <>
            <div className="register-page">
                <div className="form-box register-form">
                    <h2>Registration</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="user-box">
                            <input
                                type="text"
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleChange}
                                required
                            />
                            <label>First Name</label>
                        </div>
                        <div className="user-box">
                            <input
                                type="text"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleChange}
                                required
                            />
                            <label>Last Name</label>
                        </div>
                        <div className="user-box">
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                            <label>Username</label>
                        </div>
                        <div className="user-box">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <label>Email</label>
                        </div>
                        <div className="user-box">
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <label>Password</label>
                        </div>
                        <div className="user-box">
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                            <label>Confirm Password</label>
                        </div>
                        <button className="btn" type="submit">
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default RegisterForm;

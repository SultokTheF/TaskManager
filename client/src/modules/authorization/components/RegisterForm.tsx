import React, { useState } from "react";
import "../assets/RegisterForm.css";

const RegisterForm: React.FC = () => {
    return (
        <>
            <div className="register-page">
                <div className="form-box register-form">
                    <h2>Registration</h2>
                    <form>
                        <div className="user-box">
                            <input
                            type="text"
                            required
                            />
                            <label>First Name</label>
                        </div>
                        <div className="user-box">
                            <input
                            type="text"
                            required
                            />
                            <label>Last Name</label>
                        </div>
                        <div className="user-box">
                            <input
                            type="text"
                            required
                            />
                            <label>Username</label>
                        </div>
                        <div className="user-box">
                            <input
                            type="email"
                            required
                            />
                            <label>email</label>
                        </div>
                        <div className="user-box">
                            <input
                            type="password"
                            required
                            />
                            <label>Password</label>
                        </div>
                        <div className="user-box">
                            <input
                            type="password"
                            required
                            />
                            <label>Validate Password</label>
                        </div>
                        <button className="btn">Register</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default RegisterForm;
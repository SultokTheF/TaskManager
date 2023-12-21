import React, { useState } from "react";

import '../assets/LoginForm.css';

const LoginForm: React.FC = () => {
    return (
        <>
            <div className="login-page">
            <div className="form-box login-form">
                <form>
                    <h2>Login</h2>
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
                        <label>password</label>
                    </div>
                    <button className="btn">Login</button>
                </form>
            </div>
            </div>
        </>
    );
}

export default LoginForm;
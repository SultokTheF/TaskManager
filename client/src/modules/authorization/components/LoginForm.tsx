import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import '../assets/LoginForm.css';
import { AuthEndpoints } from "../../../constants/endpoints";
import axios from "axios";
import detectEthereumProvider from "@metamask/detect-provider";

const LoginForm: React.FC = () => {
    const [hasProvider, setHasProvider] = useState<boolean | null>(null);
    const initialState = { accounts: [] };              
    const [wallet, setWallet] = useState(initialState);

    useEffect(() => {
        const getProvider = async () => {
          const provider = await detectEthereumProvider({ silent: true })
          setHasProvider(Boolean(provider));
        }
    
        getProvider()
    }, []) 

    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
    });

    const [errMsg, setErrMsg] = useState("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post(AuthEndpoints.login, loginData);
            const accessToken = response.data.accessToken;

            if( response.status === 200 ) {
                localStorage.setItem( "accessToken", accessToken );
                window.location.replace( '/' );
            } else {
                alert( "Error!" );
                setErrMsg("Something went wrong! Please try later")
            } 
        } catch (error) {
            console.error("Login failed", error);
            setErrMsg("Invalid username or password")
        }
    };

    const handleConnect = async () => {              
        const accounts = await window.ethereum.request({ 
          method: "eth_requestAccounts",               
        });                  
    
        setWallet({ accounts });
        
        try {
          const response = await axios.post(AuthEndpoints.loginWithMetaMask, 
            {
              wallet_address: accounts[0]
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'application/json',
              },
            }  
          );
          const accessToken = response.data.accessToken;
    
          if (response.status = 200) {
            localStorage.setItem( "accessToken", accessToken );
            window.location.replace( '/' );
          } else {
            alert("Error connecting wallet!")
          }
        } catch(error) {
          console.error("Error", error);
        }
      }

    return (
        <>
            <div className="login-page">
                <div className="form-box login-form">
                    <form onSubmit={handleLogin}>
                        <h2>Login</h2>
                        <div className="user-box">
                            <input
                                type="text"
                                name="username"
                                value={loginData.username}
                                onChange={handleChange}
                                required
                            />
                            <label>Username</label>
                        </div>
                        <div className="user-box">
                            <input
                                type="password"
                                name="password"
                                value={loginData.password}
                                onChange={handleChange}
                                required
                            />
                            <label>Password</label>
                        </div>
                        <div className="errorMessage">{ errMsg }</div>
                        <button className="btn" type="submit">
                            Login
                        </button>
                        { hasProvider &&
                            <button type="button" className="login-with-metamask-btn" onClick={handleConnect}>
                                Sign Up with MetaMask
                            </button>
                        }
                    </form>
                </div>
            </div>
        </>
    );
};

export default LoginForm;

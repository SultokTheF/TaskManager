import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import detectEthereumProvider from "@metamask/detect-provider";

import "./Profile.css";

import useUserData from "../../../../hooks/useUserData";
import { UserEndpoints } from "../../../../constants/endpoints";
import avatar from "../../../../constants/profile_image";

const Profile: React.FC = () => {
  const userData = useUserData();

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

  const handleConnect = async () => {              
    const accounts = await window.ethereum.request({ 
      method: "eth_requestAccounts",               
    });                  

    setWallet({ accounts });
    
    try {
      console.log(userData?._id);
      const response = await axios.put(UserEndpoints.updateUser(userData?._id || ""), 
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

      if (response.status = 200) {
        window.location.reload();
      } else {
        alert("Error connecting wallet!")
      }
    } catch(error) {
      console.error("Error", error);
    }
  }

  return (
    <div className="profileContainer">
      <div className="card">
        <div className="image">
          {userData?.profile_image ? (
            <>
              <img src={avatar[userData?.profile_image]} width="155" />
            </>
          ) : (
            <>
              <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80" className="rounded" width="155" />
            </>
          )}
        </div>
        <div className="user-data">
          <h4>{userData?.firstname} {userData?.lastname}</h4>
          <span><i>@{userData?.username}</i></span>

          <div className="button">
            <button className="btn"><Link to="/projects">Projects</Link></button>
            <button className="btn"><Link to="/dashboard">Dashboard</Link></button>
          </div>
          <div className="skills">
            {!userData?.wallet_address && 
              <>
                { hasProvider &&
                  <button type="button" className="login-with-metamask-btn" onClick={handleConnect}>
                    Connect MetaMask
                  </button>
                } 
              </>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
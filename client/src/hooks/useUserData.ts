import { useState, useEffect } from 'react';
import axios from 'axios';

import { UserEndpoints } from '../constants/endpoints';
import User from '../types/User';

const useUserData = () => {
  const [userData, setUserData] = useState<(User & { roles: Array<any> }) | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          UserEndpoints.getUserByToken,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              'Content-Type': 'application/json',
            },
          }
        );
        setUserData(response.data.user);
      } catch (error) {
        localStorage.removeItem('accessToken');
        window.location.replace('/');
        console.error('Error fetching user data:', error);
      }
    };

    if (!localStorage.getItem('accessToken')) {
      // Handle the case when there is no access token
    } else {
      fetchUserData();
    }
  }, []);

  return userData;
};

export default useUserData;

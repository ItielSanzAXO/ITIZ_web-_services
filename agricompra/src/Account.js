import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import './Account.css';

const clientId = '429358795134-k6uvsgsr42f345ikfqv4jlip38mfngkf.apps.googleusercontent.com';

function Account() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    const initializeGapi = () => {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse,
      });
      window.google.accounts.id.renderButton(
        document.getElementById('g-signin2'),
        { theme: 'outline', size: 'large' }
      );
    };

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.onload = initializeGapi;
    document.body.appendChild(script);
  }, []);

  const handleCredentialResponse = (response) => {
    const userObject = jwtDecode(response.credential);
    const userData = {
      name: userObject.name,
      imageUrl: userObject.picture,
    };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('user');
    console.log('User signed out.');
  };

  return (
    <div className="account-page">
      {user ? (
        <div className="account-info">
          <h2>Bienvenido, {user.name}</h2>
          <img src={user.imageUrl} alt={user.name} />
          <button onClick={signOut} className="custom-google-button">Salir</button>
        </div>
      ) : (
        <div id="g-signin2"></div>
      )}
    </div>
  );
}

export default Account;
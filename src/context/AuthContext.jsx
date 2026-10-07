import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';
import { APP_CONFIG } from '../config';

const AuthContext = createContext(null);
const PREFIX = APP_CONFIG.STORAGE_PREFIX;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem(`${PREFIX}user`);
    return saved ? JSON.parse(saved) : null;
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem(`${PREFIX}admin_token`) === 'admin-authenticated-session';
  });

  const { addToast } = useToast();

  useEffect(() => {
    if (user) {
      localStorage.setItem(`${PREFIX}user`, JSON.stringify(user));
    } else {
      localStorage.removeItem(`${PREFIX}user`);
    }
  }, [user]);

  const loginUser = (email, password) => {
    // Mock user login
    const dummyUser = {
      id: 'usr-1',
      name: email.split('@')[0].replace('.', ' '),
      email,
      phone: '+91 98765 43210',
      addresses: [
        { id: 'addr-1', title: 'Home', addressLine: '42 Altamount Road, Malabar Hill', city: 'Mumbai', state: 'Maharashtra', pincode: '400026', default: true }
      ]
    };
    setUser(dummyUser);
    addToast(`Welcome back, ${dummyUser.name}!`, 'success');
    return true;
  };

  const registerUser = (userData) => {
    const newUser = {
      id: `usr-${Date.now()}`,
      ...userData,
      addresses: []
    };
    setUser(newUser);
    addToast('Account created successfully. Welcome to Aurelia Venezia!', 'success');
    return true;
  };

  const logoutUser = () => {
    setUser(null);
    addToast('You have been logged out.', 'info');
  };

  const loginAdmin = (email, password) => {
    if (email === 'admin@aurelia.com' && password === 'Admin@123') {
      localStorage.setItem(`${PREFIX}admin_token`, 'admin-authenticated-session');
      setIsAdminLoggedIn(true);
      addToast('Admin authentication successful.', 'success');
      return true;
    } else {
      addToast('Invalid admin credentials. Use demo credentials shown below.', 'error');
      return false;
    }
  };

  const logoutAdmin = () => {
    localStorage.removeItem(`${PREFIX}admin_token`);
    setIsAdminLoggedIn(false);
    addToast('Admin logged out.', 'info');
  };

  const updateUserAddresses = (newAddresses) => {
    if (!user) return;
    setUser({ ...user, addresses: newAddresses });
  };

  return (
    <AuthContext.Provider value={{
      user,
      loginUser,
      registerUser,
      logoutUser,
      updateUserAddresses,
      isAdminLoggedIn,
      loginAdmin,
      logoutAdmin
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

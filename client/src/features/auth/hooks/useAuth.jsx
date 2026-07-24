import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { login, getMe } from '../api/auth.api.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const { data: userResponse, isLoading, isError } = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    enabled: !!token,
    retry: false,
  });

  // Since api.get returns { success: true, data: user }
  const user = userResponse?.data;

  useEffect(() => {
    if (isError) {
      setToken(null);
    }
  }, [isError]);

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      setToken(res.data.token);
      queryClient.setQueryData(['me'], res.data.user);
    },
  });

  const logout = () => {
    setToken(null);
    queryClient.clear();
  };

  const value = {
    user,
    token,
    isLoading,
    login: loginMutation.mutateAsync,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

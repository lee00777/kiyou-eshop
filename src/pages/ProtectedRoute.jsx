import React from 'react';
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';

export default function ProtectedRoute({ children, requiredAdmin }) {
  const { user, loading } = useAuthContext();
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }
  console.log('USER:',user)
  if (!user || (requiredAdmin && !user.isAdmin)) {
    alert('You have no access to the page. Redirecting to the home page.');
    navigate('/');
  }
  return children;
}

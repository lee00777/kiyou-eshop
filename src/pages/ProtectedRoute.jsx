import React, { useEffect } from 'react';
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';

export default function ProtectedRoute({ children, requiredAdmin }) {
  const { user, loading } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || (requiredAdmin && !user.isAdmin)) {
      // 사용자가 권한이 없는 경우 또는 관리자 권한이 필요하지만 관리자가 아닌 경우
      alert('권한이 없습니다. 홈페이지로 이동합니다.');
      navigate('/');
    }
  }, [user, requiredAdmin, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // 권한이 있으면 children을 그대로 반환
  return children;
}

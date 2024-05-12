import React from 'react';
import { useAuthContext } from "../contexts/AuthContext";
import {Navigate} from 'react-router-dom'
// [1] 로그인한 사용자가 있는지 확인
// [2] 로그인한 사용자가 어드민 권한이 있는지 확인
// [3] 어드민 권한이 있다면, 로그인이 되어있어야 하고 + 어드민 권한도 가지고 있어야 함
// [4] 조건이 맞지 않으면 /home으로 리다이렉트하기
// [5] 조건에 맞으면, 전달된 children을 보여주기
export default function ProtectedRoute({children, requiredAdmin}) {
  const { user } = useAuthContext();
  if(!user || (requiredAdmin && !user.isAdmin)){
    // usenavigate써도 됨. 여기서 replace의미는 잘못된 경로니까 history에 넣지 않겠다고 하는것임
    return <Navigate to="/" replace/>
  } 
  return children;
}

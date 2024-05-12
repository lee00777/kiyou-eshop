// import { useContext } from "react";
// import { createContext } from "react";
// import { login, logout, onUserStateChange } from "../api/firebase";
// import { useState, useEffect } from 'react';

// const AuthContext = createContext();

// export function AuthContextProvider({children}){
//   const [user, setUser] = useState();
  
//   useEffect(() => {
//     // 아래 함수는 firebase에서 제공하는 함수로, 한번 맨처음에 등록만 해주면, 사용자 정보가 업뎃 될때마다 (로그인,로그아웃 등등) 해당 사용자 정보를 setUser에 넣어준다!
//     // 그래서 []를 empty로 두는 것임. 좀 일반 함수랑 다른 개념임!
//     // onUserStateChange(setUser);
//     onUserStateChange((user) => {console.log(user);setUser(user)});
//   }, []);


//   return (
//     <AuthContext.Provider
//       value={{ user, uid: user && user.uid, login, logout }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuthContext() {
//   return useContext(AuthContext);
// }

import { createContext, useContext, useEffect, useState } from 'react';
import { login, logout, onUserStateChange } from '../api/firebase';

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    onUserStateChange((user) => {
      console.log(user);
      setUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, uid: user && user.uid, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
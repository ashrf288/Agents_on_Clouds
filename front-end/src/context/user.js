import jwt from 'jsonwebtoken';
import { createContext, useEffect, useState } from 'react';
import React from 'react'
import { CookiesProvider, useCookies } from 'react-cookie';

export const  AuthContext = createContext();



export default function Auth(props) {
  const [cookies, setCookie] = useCookies(['user']);
  useEffect(()=>{
    if (cookies){
      setUser(cookies.user)
    }
  },[cookies])

  const [user, setUser] = useState({
    token: null,
    basicInfo: {
      id: null,
      userName: null,
    },
  });
  const changeUser = (newUser) => {
   
      let user={
        token: newUser.token,
        basicInfo: {
          id: jwt.decode(newUser.token).userId,
          userName: jwt.decode(newUser.token).userName,
      }
    }

    
    setUser(user);
    setCookie('user', user );
    
    
  }

  const logout=()=>{
    setCookie('user',null)
    setUser({
      token: null,
      basicInfo: {
        id: null,
        userName: null,
      },
    })
  
  }
      const state ={changeUser,user,logout};
  return (
    <AuthContext.Provider value={state}>
      <CookiesProvider>

      {props.children}
      </CookiesProvider>
    </AuthContext.Provider>
  )
}

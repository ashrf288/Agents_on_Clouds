import React, { useContext } from 'react'
import Login from './Forms.js/Login'
import {AuthContext} from "../context/user";
import Products from './Products/Products';
export default function Main() {
  const authContext=useContext(AuthContext);

  return (
    

    <div>
      {authContext.user&&authContext.user['token']?<Products/> : <Login/>}

    </div>
  )
}

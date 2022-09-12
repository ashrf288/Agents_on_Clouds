import React from "react";
import { createContext, useContext } from "react";
import { AuthContext } from "./user";

export const ProductsContext = createContext();

export default function Product(props) {
  const authContext = useContext(AuthContext);



  const isOwner = (product) => {
    return product.ownerId === authContext.user.basicInfo.id;
  };

  const CommentOwner = (comment) => {
    return comment.userId._id === authContext.user.basicInfo.id;
  };
  const state = {   isOwner, CommentOwner };

  return (
    <ProductsContext.Provider value={state}>
      {props.children}
    </ProductsContext.Provider>
  );
}

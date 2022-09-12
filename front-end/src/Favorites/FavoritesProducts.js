import React, { useEffect, useContext, useState } from "react";
import FavoriteCard from "./FavoriteCard";
import axios from "axios";
import { AuthContext } from "../context/user";
import { ProductsContext } from "../context/product";
import AddProduct from "../components/Products/AddProduct";
import { Container,Col, Row } from "react-bootstrap";

export default function FavoritesProducts() {
  const authContext = useContext(AuthContext);
  const productsContext=useContext(ProductsContext)

  const [showAddModal, setShowAddModal] = useState(false);

  const [products, setProducts] = useState(productsContext.products);
  
  const getFavories=()=>{
    axios.get(process.env.REACT_APP_API_URL+'/favorites', {headers:{
      Authorization: `Bearer ${authContext.user.token}`,
    },}).then(response=>{
      let newProducts=response.data.map(product=>{
            return {
              id:product._id,
              productID:product.productId._id,
              name:product.productId.name,
              description:product.productId.description,
              price:product.productId.price,
              image:product.productId.image,

            }
      })
      setProducts(newProducts)
    }
      ).catch(err=>console.log(err))
  }
  useEffect(() => {
    getFavories()
  }, [authContext,productsContext,products]);
  return (
    <Container  style={{marginTop:'2%'}}>
      <h1>My Favorites</h1>
      <Row style={{marginBlock:'5%'}}>

      {products &&
        products.map((product,idx) => {
          return (<Col md={6} lg={4} key={idx} > <FavoriteCard product={product}  /> </Col>)
        })}
      </Row>
    </Container>
  );
}

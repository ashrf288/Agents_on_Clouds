import React, { useEffect, useContext, useState } from "react";
import ProductCard from "./ProductCard";
import { AuthContext } from "../../context/user";
import AddProduct from "./AddProduct";
import { Button,Col, Container, Row } from "react-bootstrap";
import axios from "axios";
export default function Products() {
  const authContext = useContext(AuthContext);

  const [showAddModal, setShowAddModal] = useState(false);

  const [products, setProducts] = useState([]);

  const getData=()=>{
    axios
    .get(process.env.REACT_APP_API_URL + "/products", {
      headers: {
        Authorization: `Bearer ${authContext.user.token}`,
      },
    })
    .then((res) => {
      setProducts(res.data)
    }).catch(err=>{
      authContext.logout();
    })
  }
  useEffect(() => {
    getData()
  }, [authContext.user.token,products,getData]);
  return (
    <Container >
      <Button onClick={()=>setShowAddModal(true)} style={{margin:'2% 50%',cursor:'pointer'}}> add product </Button>
      {showAddModal&&<AddProduct showAddModal={showAddModal} setShowAddModal={setShowAddModal} getData={getData} />}
      <Row style={{marginBlock:'5%'}}>

      {products &&
        products.map((product,idx) => {
          return (<Col md={6} lg={4} key={idx}  > <ProductCard product={product} getData={getData}  /> </Col>)
        })}
      </Row>
    </Container>
  );
}

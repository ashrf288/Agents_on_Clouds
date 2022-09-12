import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ProductDetails from './ProductDetails';
import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';

export default function ProductCard({product,getData}) {
    
    const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
    <Card style={{width:'18rem' ,cursor:'pointer'}}>
      <Link to={`/${product._id}`} state={{ data: product }} style={LinkStyle}  > 
    <Card.Img variant="top" src={product.image} />
    <Card.Body style={cardStyle} >
      <Card.Title>{product.name}</Card.Title>
      <Card.Text style={{textOverflow:'ellipsis' , whiteSpace:'nowrap', maxWidth:'10px'}}>
        {product.description}
      </Card.Text>
      <Row > <Card.Text style={{}}> 
        <span style={{fontSize:"30px"}}>Price : {product.price}</span> 
      </Card.Text></Row>
<Button variant="primary">add to cart</Button>

      
    </Card.Body>
 
      </Link>
      <hr/>

  </Card>
    {modalShow&& <ProductDetails product={product} setModalShow={setModalShow} modalShow={modalShow} getData={getData}/>}
    </>
  )
}


const cardStyle={
    maxHight:'18rem',
    whiteSpace:'nowrap',
    textAlign:'center',
    width:'calc(90%)',
    overFlow:"hidden"
}

const LinkStyle={
    textDecoration: 'none',
    color:'black',
    whiteSpace:'nowrap',
    overflow: 'hidden',
    textOverflow:'ellipsis' ,

    

}


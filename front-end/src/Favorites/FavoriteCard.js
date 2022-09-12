import React,{useContext} from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { AuthContext } from '../context/user';

export default function ProductCard({product}) {
    const authContext = useContext(AuthContext);
    
    const removeFromFav=()=>{
        axios.delete(process.env.REACT_APP_API_URL+'/favorites/'+product.id,{headers:{
            Authorization: `Bearer ${authContext.user.token}`,
          },}).then(response=>{

          }
            ).catch(err=>console.log(err))

    }
  return (
    <>
    <Card style={{width:'18rem'}}>
      <div  style={LinkStyle}  > 
    <Card.Img variant="top" src={product.image} />
    <Card.Body style={cardStyle} >
      <Card.Title>{product.name}</Card.Title>
      <Card.Text style={{textOverflow:'ellipsis' , whiteSpace:'nowrap', maxWidth:'10px'}}>
        {product.description}
      </Card.Text>
      <Row > <Card.Text style={{}}> 
        <span style={{fontSize:"30px"}}>Price : {product.price}</span> 
      </Card.Text></Row>
<Button variant="primary" onClick={()=>removeFromFav()}>remove from favorites</Button>

      
    </Card.Body>
 
      </div>
      <hr/>

  </Card>
    
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


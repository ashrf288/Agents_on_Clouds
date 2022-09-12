import React, { useEffect,useContext } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { Icon } from '@iconify/react';
import { AuthContext } from "../../context/user";
import { ProductsContext } from "../../context/product";
import CommentsList from '../comments/CommentsList';
import axios from 'axios';
import EditProduct from './EditProduct';
import { useParams } from 'react-router-dom';

import { useCookies } from 'react-cookie';
export default function ProductDetails({getData }) {
  const token=useCookies(['user'])[0].user.token
  const [product, setProduct] = React.useState({});
  const [owner,setOwner]=React.useState()
  const [showAddModal, setShowAddModal] = React.useState(false);
  const productsContext=useContext(ProductsContext)
  const authContext=useContext(AuthContext)
    const id=useParams().name
    const getProduct=()=>{
      axios.get(process.env.REACT_APP_API_URL+'/product/'+id , {headers:{
        Authorization: `Bearer ${token}`,
      },}).then(response=>{
        setProduct(response.data) 
        setOwner(productsContext.isOwner(product))
       }
        ).catch(err=>console.log(err))
    }

    const removeHandler=async()=>{
        await axios.delete(process.env.REACT_APP_API_URL+'/product/'+id , {headers:{
         Authorization: `Bearer ${authContext.user.token}`,
       },}).then(response=>{
         getData()
          
       }
         ).catch(err=>console.log(err,authContext.user.token))
    }

    const addToFav=async()=>{
      await axios.post(process.env.REACT_APP_API_URL+'/favorites',{productId:product._id}, {headers:{
        Authorization: `Bearer ${authContext.user.token}`,
      },}).then(response=>{
         getData()

      }
        ).catch(err=>console.log(err))
   

    }

    const editHandler=()=>{
        setShowAddModal(true)
    }
    useEffect(()=>{
      product&&getProduct()
      
        

    },[product])
  return (
    <Container  className=' mt-5'>
      < Row className='text-center' >
      <Col>
        <h1>{product.name}</h1>
      </Col>
      <Col>
      {owner&& <><Link to='/'>
       <Icon onClick={()=>removeHandler()} icon="fluent:delete-24-filled" color="black" height="46" />
      </Link>
      <Icon onClick={()=>editHandler()} style={{marginInline:'5%' , cursor:'pointer'}}  icon="el:edit" color="black" height="46" />
      </>
    
  }
  <Icon style={{cursor:'pointer'}} onClick={()=>addToFav()} icon="clarity:favorite-solid" color="black" height="46" />
      
      
      
      </Col>
      </Row >
        <Modal.Body className='text-center'>
            <Card.Img src={product.image} variant="top" style={{width:'50%'}}/>
        <p>
            {product.description}
        </p>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
      <CommentsList product={product}/>
      <EditProduct showAddModal={showAddModal} setShowAddModal={setShowAddModal} getData={getData} id={id}/>
    </Container>
  )
}

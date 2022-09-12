import axios from 'axios';
import React, { useEffect, useContext, useState } from "react";
import { Row,InputGroup,Form, Button } from 'react-bootstrap'
import Comment from './Comment'
import { AuthContext } from "../../context/user";

import { ProductsContext } from "../../context/product";

export default function CommentsList({product}) {
  const [comments,setComments]=React.useState([]);
  const authContext = useContext(AuthContext);
  const productsContext=useContext(ProductsContext)


  const getComments=()=>{
    axios.get(process.env.REACT_APP_API_URL+'/comment/'+product._id, {headers:{
      Authorization: `Bearer ${authContext.user.token}`,
    },}).then(response=>{
      
      setComments(response.data)
    }
      ).catch(err=>console.log(err))
  }


  const submitHandler=async(e)=>{
    e.preventDefault();
    let comment={
      comment:e.target.comment.value,
      productId:product._id
    }
    await axios.post(process.env.REACT_APP_API_URL+'/comment',comment,{headers:{Authorization:`Bearer ${authContext.user.token}`}})
    e.target.comment.value=''

  }
  useEffect(()=>{
    getComments()

  },[comments,product])

  return (
    <div style={{marginBottom:'15%'}}>
      
      <Row  >
        <Form onSubmit={(e)=>submitHandler(e)}>
      <InputGroup className="mb-3" >

        <Form.Control
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          name='comment'
        />
        <Button type='submit' id="basic-addon2">add comment</Button>
      </InputGroup>
        </Form>
      </Row>
      <Row >
      <h1 style={{textAlign:'center'}}>comments</h1>
      </Row>
      {comments&&comments.map((comment,idx)=>{
        return (<Row key={idx} >
          <Comment  comment={comment} />
        </Row>)
      
      })
      }
    </div >
  )
}

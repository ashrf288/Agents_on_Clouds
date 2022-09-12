import { Icon } from "@iconify/react";
import React, { useEffect,useContext } from "react";
import { Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { AuthContext } from "../../context/user";
import { ProductsContext } from "../../context/product";
import moment from "moment";

import axios from "axios";
export default function Comment(comment) {
  const productsContext=useContext(ProductsContext)
  const authContext = useContext(AuthContext);
  const [owner,setOwner]=React.useState(false);

  const removeHandler = async () => {
    await axios.delete(process.env.REACT_APP_API_URL+'/comment/'+comment.comment._id , {headers:{
      Authorization: `Bearer ${authContext.user.token}`,
    },}).then(response=>{
        productsContext.getData()
      }
        ).catch(err=>console.log(err))
  };
  useEffect(() => {
    setOwner(productsContext.CommentOwner(comment.comment))
  }, [comment.author,productsContext,comment,owner]);
  
  return (
    <Card style={{ textAlign: "None" }}>
      {comment.comment.userId && (
        <Card.Header>
            <Row>
            <Col sm={11}>
              {" "}
              {comment.comment.userId.name}
              
            </Col>
            <Col> 
            {owner&&<Icon
                onClick={() => removeHandler()}
                icon="fluent:delete-24-filled"
                color="black"
                height="20"
                style={{ cursor: "pointer" }}
              />  }
              </Col>
        </Row>
          </Card.Header>
      )}

      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p>{comment.comment.comment}</p>
          <footer className="blockquote-footer">{moment(comment.comment.createdAt).format("MMMM Do YYYY, h:mm:ss a") } </footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

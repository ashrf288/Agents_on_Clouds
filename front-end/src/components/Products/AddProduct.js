import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { AuthContext } from "../../context/user";
import { ProductsContext } from "../../context/product";

import axios from "axios";
export default function AddProduct({ showAddModal, setShowAddModal,getData }) {
  const authContext = useContext(AuthContext);

  const submitHnadler = (e) => {
    e.preventDefault();
    let product = {
      name: e.target.name.value,
      price: parseInt(e.target.price.value),
      description: e.target.description.value,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbTX0mvWV40iwuM5P_deNJfg16J-MmUTMQCyVl2KEIkQ&s",
    };
    axios
      .post(process.env.REACT_APP_API_URL + "/product", product, {
        headers: {
          Authorization: `Bearer ${authContext.user.token}`,
        },
      })
      .then((res) => {
        setShowAddModal(false);
        getData()
      });
  };
  return (
    <Modal
      show={showAddModal}
      onHide={() => {
        setShowAddModal(false);
      }}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(e) => submitHnadler(e)}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="name of product"
              name="name"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              placeholder="description of product"
              name="description"
            />
          </Form.Group>
          {/* <Form.Group className="mb-3" >
        <Form.Label>Image</Form.Label>
        <Form.Control type="file" placeholder="image of product" name='image' />
      </Form.Group> */}
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              placeholder="price of product"
              name="price"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            setShowAddModal(false);
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

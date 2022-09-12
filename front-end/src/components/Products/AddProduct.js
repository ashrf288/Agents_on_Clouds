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
        "https://media.istockphoto.com/vectors/the-banner-with-new-product-is-depicted-on-a-white-background-vector-id1178279813?k=20&m=1178279813&s=612x612&w=0&h=OGAYE2PD0Mhoog2kVYxGvuccbPh5gKMwgiLwmI_3LhM=",
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

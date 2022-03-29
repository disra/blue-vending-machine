import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";

const AdjustProduct = ({ products = [], restructure, setProducts }) => {
  const [show, setShow] = useState({ show: false, mode: "" });
  const [req, setReq] = useState({});
  const setting = {
    create: {
      url: "/api/create-product",
      method: "POST",
      text: "Create Product",
    },
    update: {
      url: "/api/update-product",
      method: "PUT",
      text: "Update Product",
    },
    delete: {
      url: "/api/delete-product",
      method: "DELETE",
      text: "Delete Product",
    },
  };

  const submit = (e) => {
    e.preventDefault();
    let option = {
      method: setting[show.mode].method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    };
    fetch(`${setting[show.mode].url}/${req.id}`, option)
      .then((res) => res.json())
      .then((data) => {
        if (data.Error !== undefined) {
          throw data.Error;
        }
        data = restructure(data);
        setProducts(data);
        Swal.fire({
          icon: "success",
          title: "Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        setReq({});
        setShow({ show: false, mode: "" });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  const cancel = () => {
    setReq({});
    setShow({ show: false, mode: "" });
  };

  return (
    <div className="adjust-product">
      <Form
        onSubmit={submit}
        className={`adjust-product__form ${show.mode} ${
          show.show ? "show" : ""
        }`}
      >
        <div className="from-title">
          {show.mode !== "" ? setting[show.mode].text : ""}
        </div>
        <Form.Group controlId="id">
          <Form.Label>Id</Form.Label>
          <Form.Control
            value={req.id ? req.id : ""}
            onChange={(e) => setReq({ ...req, id: e.target.value })}
            placeholder={products.length + 1}
            type="number"
          ></Form.Control>
        </Form.Group>
        {show.mode === "delete" ? (
          ""
        ) : (
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={req.name ? req.name : ""}
              onChange={(e) => setReq({ ...req, name: e.target.value })}
              type="text"
            ></Form.Control>
          </Form.Group>
        )}
        {show.mode === "delete" ? (
          ""
        ) : (
          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              value={req.price ? req.price : ""}
              onChange={(e) => setReq({ ...req, price: e.target.value })}
              type="number"
            ></Form.Control>
          </Form.Group>
        )}
        {show.mode === "delete" ? (
          ""
        ) : (
          <Form.Group controlId="quantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              value={req.quantity ? req.quantity : ""}
              onChange={(e) => setReq({ ...req, quantity: e.target.value })}
              type="number"
            ></Form.Control>
          </Form.Group>
        )}

        <Form.Group className="form-button-group">
          <Button
            disabled={
              req.id &&
              ((req.id && req.name && req.price && req.quantity) ||
                show.mode === "delete" ||
                show.mode === "update")
                ? false
                : true
            }
            className="form-button btn btn-primary"
            type="submit"
          >
            Submit
          </Button>
          <Button className="form-button btn btn-danger" onClick={cancel}>
            Cancel
          </Button>
        </Form.Group>
      </Form>
      <Button
        className="adjust-product__button btn btn-primary"
        onClick={() => setShow({ show: true, mode: "update" })}
      >
        Update product
      </Button>
      <Button
        className="adjust-product__button btn btn-primary"
        onClick={() => setShow({ show: true, mode: "create" })}
      >
        Create product
      </Button>
      <Button
        className="adjust-product__button btn btn-danger"
        onClick={() => setShow({ show: true, mode: "delete" })}
      >
        Delete product
      </Button>
    </div>
  );
};

export default AdjustProduct;

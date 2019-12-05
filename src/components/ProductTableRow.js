import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";

export default class ProductTableRow extends Component {
  constructor(props) {
    super(props);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  deleteProduct() {
    axios
      .delete(
        "http://localhost:4000/Products/delete-product/" + this.props.obj._id
      )
      .then(res => {
        console.log("Product successfully deleted!");
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <tr>
        <td>{this.props.obj.name}</td>
        <td>{this.props.obj.email}</td>
        <td>{this.props.obj.rollno}</td>
        <td>
          <Link
            className="edit-link"
            to={"/edit-product/" + this.props.obj._id}
          >
            Edit
          </Link>
          <Button onClick={this.deleteProduct} size="sm" variant="danger">
            Delete
          </Button>
        </td>
      </tr>
    );
  }
}

import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default class EditProduct extends Component {
  constructor(props) {
    super(props);

    this.onChangeProductName = this.onChangeProductName.bind(this);
    this.onChangeProductEmail = this.onChangeProductEmail.bind(this);
    this.onChangeProductRollno = this.onChangeProductRollno.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // State
    this.state = {
      name: "",
      email: "",
      rollno: ""
    };
  }

  componentDidMount() {
    axios
      .get(
        "http://localhost:4000/products/edit-product/" +
          this.props.match.params.id
      )
      .then(res => {
        this.setState({
          name: res.data.name,
          email: res.data.email,
          rollno: res.data.rollno
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  onChangeProductName(e) {
    this.setState({ name: e.target.value });
  }

  onChangeProductEmail(e) {
    this.setState({ email: e.target.value });
  }

  onChangeProductRollno(e) {
    this.setState({ rollno: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const ProductObject = {
      name: this.state.name,
      email: this.state.email,
      rollno: this.state.rollno
    };

    axios
      .put(
        "http://localhost:4000/products/update-product/" +
          this.props.match.params.id,
        ProductObject
      )
      .then(res => {
        console.log(res.data);
        console.log("Product successfully updated");
      })
      .catch(error => {
        console.log(error);
      });

    // Redirect to Product List
    this.props.history.push("/product-list");
  }

  render() {
    return (
      <div className="form-wrapper">
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="Name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={this.state.name}
              onChange={this.onChangeProductName}
            />
          </Form.Group>

          <Form.Group controlId="Email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={this.state.email}
              onChange={this.onChangeProductEmail}
            />
          </Form.Group>

          <Form.Group controlId="Name">
            <Form.Label>Roll No</Form.Label>
            <Form.Control
              type="text"
              value={this.state.rollno}
              onChange={this.onChangeProductRollno}
            />
          </Form.Group>

          <Button variant="danger" size="lg" block="block" type="submit">
            Update Product
          </Button>
        </Form>
      </div>
    );
  }
}
